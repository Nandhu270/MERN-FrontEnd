import React from "react";

export default function City() {
  const city = [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Nagapattinam",
    "Namakkal",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
  ];

  return (
    <div style={{ padding: "20px" , overflow: "visible" }}>
      <select>
        <option value="">-- Select City --</option>
        {city.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
