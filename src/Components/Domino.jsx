import React from "react";
import { useNavigate } from "react-router-dom";

export default function Domino() {

    const navigate = useNavigate();

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <div className="w-50 p-5 d-flex flex-column">
        <div className="d-flex w-100 align-items-center justify-content-between">
          <div className="w-50">
            <h1 className="text-danger" style={{fontSize:'35px',letterSpacing:'3px'}}>Domino's</h1>
          </div>
          <div className="d-flex w-50 justify-content-between">
            <h5 className="text-danger">Home</h5>
            <h5>Why Food?</h5>
            <h5>Menu</h5>
            <h5>Contact</h5>
          </div>
        </div>

        <div className="d-flex w-100 justify-content-between align-items-center mt-1">
          <div className="w-30 d-flex align-items-center justify-content-center">
            <h1 style={{fontSize:'40px'}}>
              The Tastiest & <br />
              <span className="text-danger">Best Pizza</span> in the <br />
              world
            </h1>
          </div>
          <div className="w-50">
            <img
               src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Pizza"
              width={370}
              height={250}
            />
          </div>
        </div>

        <div className="d-flex w-100 justify-content-between align-items-center m-1">
          <div className="w-75 d-flex gap-4 p-2">
            <div
              className="d-flex align-items-center justify-content-center flex-column rounded-5 p-3"
              style={{ width: "200px", backgroundColor: "#a55b5bff" }}
            >
              <img
                src="https://cdn.jflimages.co.in/nextgen-catalog/media/prod/Dominos/WebHomeProductV1/845058d7-1f2a-4bfb-b4d2-a153fd83622c_PM_ppr_bbq_side.webp?ver=V0.0.1"
                alt="Chicken Pizza"
                width={120}
                height={120}
                className="rounded-circle mt-3"
              />
              <h5 className="mt-3">Chicken Pizza</h5>
              <h5>Rs. 500</h5>
            </div>
            <div
              className="d-flex align-items-center justify-content-center flex-column rounded-5 p-3"
              style={{ width: "200px", backgroundColor: "#bc61bcff" }}
            >
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/FOOD_CATALOG/IMAGES/CMS/2025/4/2/dd6612b2-16e2-4184-9598-5248ad305dcf_7d08c76a-18b4-497a-8206-562ef44ae963.jpg"
                alt="Burger"
                width={120}
                height={120}
                className="rounded-circle mt-3"
              />
              <h5 className="mt-3">Burger</h5>
              <h5>Rs. 400</h5>
            </div>
            <div
              className="d-flex align-items-center justify-content-center flex-column rounded-5 p-3"
              style={{ width: "200px", backgroundColor: "#63d4baff" }}
            >
              <img
                src="https://cdn.jflimages.co.in/nextgen-catalog/media/prod/Dominos/WebHomeProductV1/a542d031-5fc8-4902-bbb3-25eebd3ace7e_veggie_paradise_side.webp?ver=V0.0.1"
                alt="Veg Pizza"
                width={120}
                height={120}
                className="rounded-circle mt-3"
              />
              <h5 className="mt-3">Veg Pizza</h5>
              <h5>Rs. 450</h5>
            </div>
          </div>

          <div>
            <button type="button" className="btn btn-dark rounded-2" onClick={()=>navigate('/food')}>
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
