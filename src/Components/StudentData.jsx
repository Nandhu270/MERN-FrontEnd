import React from "react";
import City from "./City";
import NestedDropdown from "./NestedDropdown";

export default function StudentData() {
  const student = [
    { id: 1, roll: "F101", name: "Abishek", dept: "IT" },
    { id: 2, roll: "F102", name: "Barath", dept: "IT" },
    { id: 3, roll: "F103", name: "Chinayan", dept: "IT" },
    { id: 4, roll: "F104", name: "Divakar", dept: "IT" },
    { id: 5, roll: "F105", name: "Elango", dept: "IT" },
    { id: 6, roll: "F106", name: "Fahad", dept: "IT" },
    { id: 7, roll: "F107", name: "Gokul", dept: "IT" },
    { id: 8, roll: "F108", name: "Harish", dept: "IT" },
    { id: 9, roll: "F109", name: "Ishanth", dept: "IT" },
    { id: 10, roll: "F110", name: "Jagan", dept: "IT" },
  ];

  return (
    <div className="p-5 w-100 vh-100 d-flex flex-column align-items-center justify-content-center">
      <table
        style={{
          width: "500px",
          borderCollapse: "collapse",
          border: "2px solid black",  
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "lightgreen" }}>
            <th style={{ border: "1px solid black", padding: "8px" }}>#</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Roll Number</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Department</th>
          </tr>
        </thead>
        <tbody>
          {student.map((data, index) => (
            <tr
              key={data.id}
              style={{
                backgroundColor: index % 2 === 0 ? "lightblue" : "lightpink",
              }}
            >
              <td style={{ border: "1px solid black", padding: "8px" }}>{data.id}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{data.roll}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{data.name}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{data.dept}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <City />
      <NestedDropdown />
    </div>
  );
}
