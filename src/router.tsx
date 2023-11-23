import { AnimatePresence, motion } from "framer-motion";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Chip } from "./pages/Chip";
import { eWindow as EWindow } from "./pages/eWindow";
import "./frame.css";

export const Router = () => {
  const tabs = ["Chip", "eWindow"];
  return (
    <>
      <motion.nav>
        {tabs.map((i) => (
          <a href={i}>
            <motion.a
              style={{
                display: "block",
                color: "#fff",
                textDecoration: "none",
                fontSize: "1.5rem",
                fontFamily: "sans-serif",
                fontWeight: "bold",
                backdropFilter: "none",
                height: "2rem",
                width: "4rem",
                textAlign: "center",
              }}
              whileHover={{
                scale: 1.2,
              }}
              whileTap={{
                scale: 0.8,
              }}
            >
              {i}
            </motion.a>
          </a>
        ))}
      </motion.nav>
      <AnimatePresence mode="wait">
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Chip />} />
            <Route path={"/chip"} element={<Chip />} />
            <Route path={"/eWindow"} element={<EWindow />} />
          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </>
  );
};
