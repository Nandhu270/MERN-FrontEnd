import React from "react";
import { useNavigate } from "react-router-dom";

export default function Food() {
  const navigate = useNavigate();
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <div className="w-50 p-5 d-flex flex-column">
        <div className="d-flex w-100 align-items-center justify-content-between">
          <div className="w-50">
            <h4
              style={{ cursor: "pointer",color:'#640000ff' }}
              onClick={() => navigate("/")}
            >
              Go Back
            </h4>
          </div>
          <div className="d-flex w-50 justify-content-between">
            <h1>Top Best Selling</h1>
          </div>
        </div>

        <div className="container mt-4">
          <div className="row gap-2" style={{ height: "420px", width: "130%", marginLeft:'-55px' }}>
            <div
              className="col bg-secondary"
              style={{
                background:
                  "url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGl6emF8ZW58MHx8MHx8fDA%3D')",
                backgroundSize: "cover",
                position: "relative",
              }}
            >
              <div
                className="text-light d-flex align-items-center justify-content-center"
                style={{
                  width: "150px",
                  backgroundColor: "#640000ff",
                  position: "absolute",
                  right: "0px",
                }}
              >
                <h5 className="mt-1">30% offer</h5>
              </div>

              <div
                className="text-light p-2"
                style={{
                  position: "absolute",
                  bottom: "0px",
                  left: "0px",
                  right: "0px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                }}
              >
                <h3>Margaretta</h3>
                <hr style={{ marginTop: "-1px" }} />
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ marginTop: "-10px" }}
                >
                  <div>
                    <h5 style={{ marginTop: "-2px" }}>Rs. 600</h5>
                    <h6 style={{ marginTop: "-5px" }}>Medium</h6>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn d-flex justify-content-center align-items-center rounded-4"
                      style={{
                        backgroundColor: "#640000ff",
                        color: "white",
                        width: "100px",
                      }}
                    >
                      Add +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col bg-secondary"
              style={{
                background:
                  "url('https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2VyfGVufDB8fDB8fHww')",
                backgroundSize: "cover",
                position: "relative",
              }}
            >
              <div
                className="text-light d-flex align-items-center justify-content-center"
                style={{
                  width: "150px",
                  backgroundColor: "#640000ff",
                  position: "absolute",
                  right: "0px",
                }}
              >
                <h5 className="mt-1">30% offer</h5>
              </div>

              <div
                className="text-light p-2"
                style={{
                  position: "absolute",
                  bottom: "0px",
                  left: "0px",
                  right: "0px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                }}
              >
                <h3>Burger</h3>
                <hr style={{ marginTop: "-1px" }} />
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ marginTop: "-10px" }}
                >
                  <div>
                    <h5 style={{ marginTop: "-2px" }}>Rs. 600</h5>
                    <h6 style={{ marginTop: "-5px" }}>Medium</h6>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn d-flex justify-content-center align-items-center rounded-4"
                      style={{
                        backgroundColor: "#640000ff",
                        color: "white",
                        width: "100px",
                      }}
                    >
                      Add +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col bg-secondary"
              style={{
                background:
                  "url('https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZnJlbmNoJTIwZnJpZXN8ZW58MHx8MHx8fDA%3D')",
                backgroundSize: "cover",
                position: "relative",
              }}
            >
              <div
                className="text-light d-flex align-items-center justify-content-center"
                style={{
                  width: "150px",
                  backgroundColor: "#640000ff",
                  position: "absolute",
                  right: "0px",
                }}
              >
                <h5 className="mt-1">30% offer</h5>
              </div>

              <div
                className="text-light p-2"
                style={{
                  position: "absolute",
                  bottom: "0px",
                  left: "0px",
                  right: "0px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                }}
              >
                <h3>French Fries</h3>
                <hr style={{ marginTop: "-1px" }} />
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ marginTop: "-10px" }}
                >
                  <div>
                    <h5 style={{ marginTop: "-2px" }}>Rs. 600</h5>
                    <h6 style={{ marginTop: "-5px" }}>Medium</h6>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn d-flex justify-content-center align-items-center rounded-4"
                      style={{
                        backgroundColor: "#640000ff",
                        color: "white",
                        width: "100px",
                      }}
                    >
                      Add +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
