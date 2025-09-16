import React, { useState } from "react";

export default function Adminlogin() {
  const [message, setMessage] = useState({
    msg: "",
    type: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const [loading, setloading] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  console.log(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="w-100 vh-100 d-flex flex-column align-items-center mt-5 gap-3">
      {message.msg && (
        <div
          className={`alert alert-${message.type} w-50 d-flex align-items-center justify-content-center text-center`}
          role="alert"
        >
          <p className="mb-0">A simple primary alert—check it out!</p>
        </div>
      )}

      <div className="d-flex align-items-center flex-column gap-3 w-25 shadow p-4 rounded-5">
        <h1>Login</h1>
        <form method="post" className="d-flex align-items-center flex-column gap-3 w-100">
          <div className="d-flex gap-3 w-100 justify-content-between">
            <label htmlFor="email" className="mt-1 w-25">
              Email
            </label>
            <div className="d-flex w-75 flex-column">
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={data.email}
                className="border border-secondary p-1 rounded-3"
                onChange={handleChange}
              />
              {error.email && (
                <small className="text-danger text-break">{error.email}</small>
              )}
            </div>
          </div>
          <div className="d-flex gap-3 w-100 justify-content-between">
            <label htmlFor="password" className="mt-1 w-25">
              PassWord
            </label>
            <div className="d-flex w-75 flex-column">
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={data.password}
                className="border border-secondary p-1 rounded-3"
                onChange={handleChange}
              />
              {error.password && (
                <small className="text-danger text-break">
                  {error.password}
                </small>
              )}
            </div>
          </div>
          <button className="btn btn-info d-flex gap-2 align-items-center justify-content-center">
            {loading && (
              <div
                className="spinner-border text-light mt-1"
                style={{ width: "1.2rem", height: "1.2rem" }}
                role="status"
              ></div>
            )}
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
