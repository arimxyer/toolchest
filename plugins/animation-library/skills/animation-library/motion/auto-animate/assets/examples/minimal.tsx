import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const INITIAL_ITEMS = ["Apples", "Bananas", "Cherries"];

export default function ShoppingList() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [parent] = useAutoAnimate();

  const addItem = () => {
    const next = ["Dates", "Elderberries", "Figs"].find(
      (f) => !items.includes(f)
    );
    if (next) setItems((prev) => [...prev, next]);
  };

  const removeFirst = () => setItems((prev) => prev.slice(1));

  const shuffle = () =>
    setItems((prev) => [...prev].sort(() => Math.random() - 0.5));

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 320, margin: "2rem auto" }}>
      <h2>Shopping List</h2>

      {/* Attach ref to parent — add/remove/reorder children animate automatically */}
      <ul ref={parent} style={{ padding: 0, listStyle: "none" }}>
        {items.map((item) => (
          <li
            key={item}
            style={{
              padding: "0.5rem 1rem",
              marginBottom: "0.25rem",
              background: "#f0f0f0",
              borderRadius: 4,
            }}
          >
            {item}
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
        <button onClick={addItem}>Add</button>
        <button onClick={removeFirst}>Remove first</button>
        <button onClick={shuffle}>Shuffle</button>
      </div>
    </div>
  );
}
