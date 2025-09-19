import React from "react";
import { useNavigate } from "react-router-dom";

const FeedBackDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="w-100 vh-100 d-flex align-items-center flex-column gap-3 mt-5">
      <h1>FeedBack DashBoard</h1>
      <button
        className="w-25 p-2 d-flex align-items-center justify-content-center btn btn-outline-primary"
        onClick={() => navigate("/app/feedback/add")}
      >
        {" "}
        Add FeedBack{" "}
      </button>
      <button
        className="w-25 p-2 d-flex align-items-center justify-content-center btn btn-outline-primary"
        onClick={() => navigate("/app/feedback/view")}
      >
        {" "}
        View FeedBack{" "}
      </button>
    </div>
  );
};

export default FeedBackDashboard;
