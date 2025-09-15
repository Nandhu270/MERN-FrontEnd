import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city: "",
  });

  const [msg, setmsg] = useState({
    msg: "",
    type: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let errors = {};

    if (details.name.trim() === "") errors.name = "Name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (details.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!emailRegex.test(details.email)) {
      errors.email = "Invalid email format";
    }

    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*@).{8,}$/;
    if (details.password.trim() === "") {
      errors.password = "Password is required";
    } else if (!passRegex.test(details.password)) {
      errors.password =
        "Password must be 8+ chars, include letters, numbers, and '@'";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (details.phone.trim() === "") {
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(details.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }

    if (details.city.trim() === "") errors.city = "Please select a city";

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setmsg({
        msg: "",
        type: "",
      });
      try {
        const res = await axios.post(
          "http://localhost:5000/api/kce/signup",
          details
        );
        if (res.status === 201) {
          setmsg({
            msg: "Registered SuccessFully,Please Login to Continue!...",
            type: "success",
          });
        }
        // console.log(res);
      } catch (err) {
        if (err.response) {
          if (err.response.status === 409) {
            setmsg({
              msg: "User Already Exists, Please Login to Continue!...",
              type: "warning",
            });
          } else if (err.response.status === 404) {
            setmsg({
              msg: "Server Error",
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
        setDetails({
          name: "",
          email: "",
          password: "",
          phone: "",
          city: "",
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  // console.log(details);

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
        <div className="d-flex flex-column mt-2">
          <div className="d-flex gap-2">
            <label style={{ width: "75px" }}> Name : </label>
            <input
              type="text"
              placeholder="Enter Your Name..."
              className="rounded-2 border border-dark w-75"
              required
              name="name"
              value={details.name}
              onChange={handleChange}
            />
          </div>
          {errors.name && (
            <p
              className="text-danger"
              style={{
                marginLeft: "85px",
                marginBottom: "-10px",
                marginTop: "2px",
              }}
            >
              {errors.name}
            </p>
          )}
        </div>

        <div className="d-flex flex-column">
          <div className="d-flex gap-2">
            <label style={{ width: "75px" }}> Email : </label>
            <input
              type="email"
              placeholder="Enter Your Email..."
              className="rounded-2 border border-dark w-75"
              required
              name="email"
              value={details.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && (
            <p
              className="text-danger"
              style={{
                marginLeft: "85px",
                marginBottom: "-10px",
                marginTop: "2px",
              }}
            >
              {errors.email}
            </p>
          )}
        </div>

        <div className="d-flex flex-column">
          <div className="d-flex gap-2">
            <label style={{ width: "75px" }}> Password : </label>
            <input
              type="password"
              placeholder="Enter Your Password..."
              className="rounded-2 border border-dark w-75"
              required
              name="password"
              value={details.password}
              onChange={handleChange}
            />
          </div>
          {errors.password && (
            <p
              className="text-danger"
              style={{
                marginLeft: "85px",
                marginBottom: "-10px",
                marginTop: "2px",
              }}
            >
              {errors.password}
            </p>
          )}
        </div>

        <div className="d-flex flex-column">
          <div className="d-flex gap-2">
            <label style={{ width: "75px" }}> Phone : </label>
            <input
              type="number"
              placeholder="Enter Your PhoneNumber..."
              className="rounded-2 border border-dark w-75"
              required
              name="phone"
              value={details.phone}
              onChange={handleChange}
            />
          </div>
          {errors.phone && (
            <p
              className="text-danger"
              style={{
                marginLeft: "85px",
                marginBottom: "-10px",
                marginTop: "2px",
              }}
            >
              {errors.phone}
            </p>
          )}
        </div>

        <div className="d-flex flex-column">
          <div className="d-flex gap-2">
            <label style={{ width: "75px" }}> City : </label>
            <select
              className="rounded-2 border border-dark w-75"
              name="city"
              value={details.city}
              onChange={handleChange}
            >
              <option value="">----------Select City----------</option>
              <option value="Chennai">Chennai</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Erode">Erode</option>
              <option value="Tirupur">Tirupur</option>
              <option value="Trichy">Trichy</option>
            </select>
          </div>
          {errors.city && (
            <p
              className="text-danger"
              style={{
                marginLeft: "85px",
                marginBottom: "-10px",
                marginTop: "2px",
              }}
            >
              {errors.city}
            </p>
          )}
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary w-50">
            Submit
          </button>
        </div>

        <div className="d-flex justify-content-center">
          <p>
            Already Have account ?{" "}
            <span
              className="text-primary text-decoration-underline"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>{" "}
          </p>
        </div>
      </form>
    </div>
  );
}
