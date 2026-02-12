import { motion } from "framer-motion";

export const ScrollReveal = ({ children }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 100,
        scale: 0.9,
        rotateX: 15,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        type: "spring",
        duration: 1.2,
        bounce: 0.4,
      }}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
};
