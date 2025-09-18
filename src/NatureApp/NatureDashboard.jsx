import axios from "axios";
import React, { useState, useEffect } from "react";

export default function NatureDashboard() {
  const [data, setData] = useState({
    name: "",
    msg: "",
  });
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/nature/data", {
          withCredentials: true,
        });
        console.log(res);

        setData({
          name: res.data.data.name,
          msg: res.data.msg,
        });
      } catch (err) {
        setData(err.message);
      }
    };

    fetchdata();
  }, []);
  return (
    <div>
      <p>{data.msg}</p>
      <p>{data.name}</p>
    </div>
  );
}
