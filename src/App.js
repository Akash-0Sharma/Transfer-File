import React, { useState } from "react";
import "./styles.css";

export default function TransferList() {
  const [availableItems, setAvailableItems] = useState([
    "Item A",
    "Item B",
    "Item C",
  ]);
  const [checked, setChecked] = useState({});
  const [selectedItems, setSelectedItem] = useState([]);

  const handleCheck = (item) => {
    setChecked((prev) => ({ ...prev, [item]: !prev[item] }));
    console.log("Checked", checked);
  };
  const moveToSelected = () => {
    const toMove = availableItems.filter((item) => checked[item]);
    console.log("Available-toMove", toMove);
    setSelectedItem((prev) => [...prev, ...toMove]);
    console.log("SelectedItem", selectedItems);
    setAvailableItems((prev) => prev.filter((item) => !checked[item]));
    console.log("Available", availableItems);
    resetChecked(toMove);
  };

  const moveToAvailable = () => {
    const toMove = selectedItems.filter((item) => checked[item]);
    setAvailableItems((prev) => [...prev, ...toMove]);
    setSelectedItem((prev) => prev.filter((item) => !checked[item]));
    resetChecked(toMove);
  };

  const resetChecked = (items) => {
    setChecked((prev) => {
      const newChecked = { ...prev };
      console.log("Reset-newChecked", newChecked);
      items.forEach((item) => {
        delete newChecked[item];
      });
      console.log("return checked", newChecked);
      return newChecked;
    });
  };

  return (
    <div
      style={{ display: "flex", margin: "10px", padding: "5px", gap: "80px" }}
    >
      <div>
        <h3>Available</h3>
        {availableItems.map((item) => (
          <div key={item}>
            <label>
              <input
                type="checkbox"
                checked={checked[item] || false}
                onChange={() => handleCheck(item)}
              />
              {item}
            </label>
          </div>
        ))}
      </div>
      <div>
        <button onClick={moveToAvailable}>◀️</button>
        <br />
        <button onClick={moveToSelected}>▶️</button>
      </div>
      <div>
        <h3>Selected</h3>
        {selectedItems.map((item) => (
          <div key={item}>
            <label>
              <input
                type="checkbox"
                checked={checked[item] || false}
                onChange={() => handleCheck(item)}
              />
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
