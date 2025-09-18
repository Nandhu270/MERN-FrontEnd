import React, { useEffect, useState } from "react";
import "./imageview.css";
import axios from "axios";

const ViewImage = () => {
  const [foodData, setFood] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/image/getimages");
      console.log(res.data.data);
      setFood(res.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container1">
      {foodData.map((data,index) => (
        <div className="box1" key={index} style={{background:`url(http://localhost:5000${data.imageUrl})`,backgroundPosition:'center', backgroundSize:'cover'}}>
          <div className="order">
            <div>
              <h4>{data.foodName}</h4>
              <h4>Rs.{data.price}</h4>
              <h4></h4>
            </div>
            <button className="btn btn-info">Order</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewImage;
