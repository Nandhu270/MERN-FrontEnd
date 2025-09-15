import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [msg, setmsg] = useState({
    msg: "",
    type: "",
  });

  const changeData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/kce/login", data);

      console.log(res);

      if (res.status === 200) {
        setmsg({
          msg: "Login SuccessFully!...",
          type: "success",
        });
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setmsg({
            msg: "Incorrect Mail or Password!...",
            type: "warning",
          });
        } else if (err.response.status === 404) {
          setmsg({
            msg: "User Not Found!...",
            type: "danger",
          });
        } else {
          setmsg({
            msg: "Something went wrong",
            type: "danger",
          });
        }
      } else {
        setmsg({
          msg: err.message,
          type: "danger",
        });
      }
    } finally {
      setData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column w-100 vh-100">
      {msg && (
        <div
          className={`alert alert-${msg.type} w-50 d-flex justify-content-center`}
          role="alert"
        >
          {msg.msg}
        </div>
      )}
      <form
        action="#"
        className="d-flex flex-column gap-3  p-4 shadow rounded-4 bg-info-subtle"
        style={{ width: "370px" }}
        onSubmit={handleSubmit}
      >
        <div className="d-flex gap-2">
          <label style={{ width: "75px" }}> Email : </label>
          <input
            type="email"
            placeholder="Enter Your Email..."
            className="rounded-2 border border-dark w-75"
            value={data.email}
            name="email"
            onChange={changeData}
          />
        </div>
        <div className="d-flex gap-2">
          <label style={{ width: "75px" }}> Password : </label>
          <input
            type="password"
            placeholder="Enter Your Password..."
            className="rounded-2 border border-dark w-75"
            value={data.password}
            name="password"
            onChange={changeData}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary w-50">
            Login
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <p>
            Create account ?{" "}
            <span
              className="text-primary text-decoration-underline"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Sign Up
            </span>{" "}
          </p>
        </div>
      </form>
    </div>
  );
}
