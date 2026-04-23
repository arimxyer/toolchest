import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// Spring animation, gesture states, exit animation, shared layoutId.
// npm install motion

export default function MotionDemo() {
  const [items, setItems] = useState([1, 2, 3]);
  const [active, setActive] = useState<number | null>(null);

  return (
    <div style={{ padding: 32, fontFamily: "sans-serif" }}>
      <ul style={{ listStyle: "none", padding: 0, display: "flex", gap: 12 }}>
        <AnimatePresence>
          {items.map((id) => (
            <motion.li key={id} layout
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              onClick={() => setActive(id === active ? null : id)}
              style={{ padding: "12px 20px", borderRadius: 8, cursor: "pointer",
                background: id === active ? "#6366f1" : "#e5e7eb" }}
            >
              Item {id}
              {id === active && (
                <motion.div layoutId="underline"
                  style={{ height: 3, background: "#fff", borderRadius: 2, marginTop: 4 }} />
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <button onClick={() => setItems((p) => p.slice(0, -1))} style={{ marginTop: 16 }}>
        Remove last
      </button>
    </div>
  );
}
