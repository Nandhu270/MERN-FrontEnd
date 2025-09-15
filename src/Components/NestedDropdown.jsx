import React, { useState } from "react";

export default function NestedDropdown() {
  const data = {
    TamilNadu: ["Chennai", "Coimbatore", "Madurai", "Salem", "Erode"],
    Karnataka: ["Bengaluru", "Mysuru", "Mangalore", "Hubli"],
    Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
  };

  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  return (
    <div>
      <select
        onChange={(e) => {
          setState(e.target.value);
          setCity("");
        }}
      >
        <option value="">--Select State---</option>
        {Object.keys(data).map((data, index) => (
          <option key={index} value={data}>
            {data}
          </option>
        ))}
      </select>

      {state && (
        <select
          disabled = {!state}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        >
          <option value="">--Select City---</option>
          {data[state].map((data, index) => (
            <option key={index} value={data}>
              {data}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}