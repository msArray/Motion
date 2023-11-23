import { useRef, useState } from "preact/hooks";
import { motion } from "framer-motion";
import { JSX } from "preact/jsx-runtime";

export const eWindow = () => {
  const constraintsRef = useRef(null);
  const [aWindow, setWindowData] = useState<
    {
      index: any | null;
      key: string;
      fullwindow: boolean;
      src: string;
      children: JSX.Element;
      hidden: boolean;
    }[]
  >([
    {
      index: 0,
      key: "tab1",
      fullwindow: false,
      src: "https://google.com/?igu=1",
      children: <></>,
      hidden: false,
    },
  ]);

  const Links = [
    { class: "fa-google", url: "https://google.com/?igu=1", children: <></> },
    {
      class: "fa-youtube",
      url: "https://www.youtube.com/embed/o1jAMSQyVPc?si=0HB1C0KYr5HYfRe5",
      children: <></>,
    },
    {
      class: "fa-twitter",
      url: "",
      children: (
        <>
          <blockquote class="twitter-tweet">
            <p lang="qme" dir="ltr">
              <a href="https://twitter.com/hashtag/%E3%83%96%E3%83%AB%E3%82%A2%E3%82%AB?src=hash&amp;ref_src=twsrc%5Etfw">
                #ブルアカ
              </a>{" "}
              <a href="https://t.co/U2d34O0dq4">pic.twitter.com/U2d34O0dq4</a>
            </p>
            &mdash; Jiankun Yu (@NOWORD_from1996){" "}
            <a href="https://twitter.com/NOWORD_from1996/status/1687671033569173504?ref_src=twsrc%5Etfw">
              August 5, 2023
            </a>
          </blockquote>{" "}
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charset="utf-8"
          ></script>
        </>
      ),
    },
  ];

  const onClickDelete = (index: number) => {
    const deletedWindowList = [...aWindow];
    deletedWindowList.splice(index, 1);
    setWindowData(deletedWindowList);
  };

  const onClickFullWindow = (type: boolean, index: number) => {
    const normalWindowList = [...aWindow];
    normalWindowList[index].fullwindow = !type;
    setWindowData(normalWindowList);
  };

  const onClickHidden = (index: number) => {
    const normalWindowList = [...aWindow];
    normalWindowList[index].hidden = true;
    normalWindowList[index]["index"] = index;
    setWindowData(normalWindowList);
  };

  const showTab = (index: number) => {
    const normalWindowList = [...aWindow];
    normalWindowList[index].hidden = false;
    setWindowData(normalWindowList);
  };

  return (
    <>
      <motion.main ref={constraintsRef}>
        {aWindow.map((item, index) => (
          <motion.div
            style={{
              position: "absolute",
              display: "block",
              height: "20rem",
              width: "30rem",
            }}
            drag
            dragConstraints={constraintsRef}
            animate={
              item.hidden
                ? {
                    scale: 0,
                    opacity: 0,
                  }
                : item.fullwindow
                ? {
                    x: "50%",
                    y: "50%",
                    translateX: "-50%",
                    translateY: "-50%",
                    width: "100%",
                    height: "100%",
                  }
                : {
                    scale: 1,
                    opacity: 1,
                  }
            }
            key={item.key}
          >
            <motion.span
              style={{
                display: "flex",
                justifyContent: "right",
                alignItems: "start",
                width: "100%",
                height: "2rem",
                background: "#dee1e6",
              }}
              onPan={() =>
                item.fullwindow ? onClickFullWindow(item.fullwindow, index) : ""
              }
            >
              <a
                style={{
                  width: "100%",
                  border: 0,
                  outline: 0,
                  textAlign: "center",
                  background: "inherit",
                }}
                disabled
                children={item.key}
              />
              <span
                className="material-symbols-outlined"
                style={{ cursor: "pointer" }}
                onClick={() => onClickHidden(index)}
              >
                remove
              </span>
              <span
                class="material-symbols-outlined"
                style={{ cursor: "pointer" }}
                onClick={() => onClickFullWindow(item.fullwindow, index)}
              >
                {item.fullwindow ? "tab_group" : "tab"}
              </span>
              <span
                className="material-symbols-outlined"
                style={{ cursor: "pointer" }}
                onClick={() => onClickDelete(index)}
              >
                close
              </span>
            </motion.span>
            <motion.div
              drag={false}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                background: "#fff",
              }}
            >
              {item.src == "" ? (
                item.children
              ) : (
                <iframe
                  src={item.src}
                  frameborder="0"
                  style={{ display: "block", width: "100%", height: "100%" }}
                />
              )}
            </motion.div>
          </motion.div>
        ))}
      </motion.main>
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: "1rem",
          height: "2rem",
          width: "100vw",
          backgroundColor: "#40404044",
          backdropFilter: "blur(1rem)",
        }}
      >
        <span className="material-symbols-outlined">add</span>
        {Links.map((t, index) => (
          <motion.button
            whileHover={{
              scale: 1.3,
            }}
            whileTap={{
              scale: 0.8,
              borderRadius: "100%",
            }}
            style={{
              border: 0,
              outline: 0,
              height: "1.5rem",
              width: "1.5rem",
              boxShadow: "#404040 0 0 5px",
              background: `hsl(${index * (360 / 4)}, 80%, 60%)`,
              borderRadius: "0.2rem",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "200ms",
            }}
            onTap={() =>
              setWindowData([
                ...aWindow,
                {
                  index: aWindow.length + 1,
                  key: `tab${aWindow.length + 1}`,
                  fullwindow: false,
                  src: t.url,
                  children: t.children,
                  hidden: false,
                },
              ])
            }
          >
            <i className={`fa-brands ${t.class}`}></i>
          </motion.button>
        ))}
        <span className="material-symbols-outlined">tab_unselected</span>
        {aWindow.map((t, index) =>
          t.hidden ? (
            <motion.button
              whileHover={{
                scale: 1.3,
              }}
              whileTap={{
                scale: 0.8,
                borderRadius: "100%",
              }}
              style={{
                border: 0,
                outline: 0,
                height: "1.5rem",
                width: "1.5rem",
                boxShadow: "#404040 0 0 5px",
                background: `hsl(${index * (360 / 4)}, 80%, 60%)`,
                borderRadius: "0.2rem",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "200ms",
              }}
              onTap={() => showTab(index)}
            >
              <img
                src={
                  t.src == ""
                    ? ""
                    : `http://www.google.com/s2/favicons?domain=${t.src}`
                }
                alt=""
                srcset=""
              />
            </motion.button>
          ) : (
            <></>
          )
        )}
      </motion.div>
    </>
  );
};
