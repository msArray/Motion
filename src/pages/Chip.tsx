import { useRef, useState } from "preact/hooks";
import { motion } from "framer-motion";

export const Chip = () => {
  const constraintsRef = useRef(null);
  const [items, setItems] = useState(["btn"]);

  const ClickedObj = () => {
    setItems([...items, "btn"]);
  };

  return (
    <>
      <motion.main ref={constraintsRef}>
        {items.map((item, index) => (
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{
              scale: 0.8,
              borderRadius: "100%",
            }}
            drag
            dragConstraints={constraintsRef}
            onTap={ClickedObj}
            style={{
              position: "absolute",
              border: 0,
              outline: 0,
              height: "5rem",
              width: "5rem",
              boxShadow: "#404040 0 0 5px",
              background: `hsl(${index * (360 / 4)}, 80%, 60%)`,
            }}
          >
            {item}
            {index}
          </motion.button>
        ))}
      </motion.main>
    </>
  );
};
