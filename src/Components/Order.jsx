import React, { useState } from "react";


export default function Order() {

  const [message, setMessage] = useState("No Order Placed");

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column vh-100">
      <div className="mb-4">
        <h5 className="text-info">{message}</h5>
      </div>
      <div className="w-25 d-flex justify-content-between align-items-center">
        <button className="btn btn-success" onClick={()=>setMessage("Order Placed!...")}>Order</button>
        <button className="btn btn-info" onClick={()=>setMessage("Your Order is Prepared!...")}>Prepare</button>
        <button className="btn btn-warning" onClick={()=>setMessage("Your Order is Out of Delivery!...")}>Out of Delivery</button>
        <button className="btn btn-primary" onClick={()=>setMessage("Your Order is Delivered!...")}>Delivery</button>
      </div>
    </div>
  );
}
