import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Account() {
  const [message, setMessage] = useState({
    msg: "",
    type: "",
  });
  const [error, setError] = useState({});

  const [data, setData] = useState({
    name: "",
    email: "",
    account_no: "",
    phone_number: "",
    type: "",
    dob: "",
    city: "",
  });

  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const [login, setlogin] = useState(false);

  // console.log(data);

  const checkerrors = () => {
    setError({});
    let errors = {};

    if (data.name.trim() === "") errors.name = "Please Enter Name";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (data.email.trim() === "") errors.email = "Please Enter Email";
    else if (!emailRegex.test(data.email))
      errors.email = "Please Enter Valid Email Address";

    if (data.phone_number === "")
      errors.phone_number = "Please Enter Phone Number";
    else if (data.phone_number.length !== 10)
      errors.phone_number = "Please Enter Valid Phone number";

    if (data.type.trim() === "") errors.type = "Please Select Type";

    if (data.dob.trim() === "") errors.dob = "Please Select DOB";

    if (data.city.trim() === "") errors.city = "Please Enter City Name";

    setError(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isChecked = checkerrors();
    if (!isChecked) return;

    const newData = {
      ...data,
      account_no: Math.ceil(Math.random() * 10000000000 + 1),
      phone_number: Number(data.phone_number),
    };
    try {
      setloading(true);
      setMessage({
        msg:"",
        type:""
      });
      const res = await axios.post(
        "http://localhost:5000/api/bank/create",
        newData
      );
      // console.log(res);
      setlogin(true);
      setData(newData);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          setMessage({
            msg: "User Already Exist",
            type: "warning",
          });
        } else {
          setMessage({
            msg: "Server Error",
            type: "danger",
          });
        }
      } else {
        setMessage({
          msg: err.message,
          type: "danger",
        });
      }
    } finally {
      setloading(false);
    }
  };

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
          <p className="mb-0">{message.msg}</p>
        </div>
      )}

      <div className="d-flex align-items-center flex-column gap-3 w-25 shadow p-4 rounded-5">
        <h1>Create Account</h1>
        <form
          method="post"
          onSubmit={handleSubmit}
          className="d-flex align-items-center flex-column gap-3 w-100"
        >
          <div className="d-flex gap-3 w-100 justify-content-between">
            <label htmlFor="name" className="mt-1 w-25">
              Name
            </label>
            <div className="d-flex w-75 flex-column">
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={data.name}
                className="border border-secondary p-1 rounded-3"
                onChange={handleChange}
              />
              {error.name && (
                <small className="text-danger text-break">{error.name}</small>
              )}
            </div>
          </div>

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
            <label htmlFor="phone_number" className="mt-1 w-25">
              Number
            </label>
            <div className="d-flex w-75 flex-column">
              <input
                type="number"
                name="phone_number"
                placeholder="Enter Phone Number"
                value={data.phone_number}
                className="border border-secondary p-1 rounded-3"
                onChange={handleChange}
              />
              {error.phone_number && (
                <small className="text-danger text-break">
                  {error.phone_number}
                </small>
              )}
            </div>
          </div>

          <div className="d-flex gap-3 w-100 justify-content-between">
            <label htmlFor="city" className="mt-1 w-25">
              Type
            </label>
            <div className="d-flex w-75 flex-column">
              <select
                name="type"
                value={data.type}
                className="border border-secondary p-1 rounded-3"
                onChange={handleChange}
              >
                <option value="">--Select Type--</option>
                <option value="savings">Savings</option>
                <option value="current">Current</option>
              </select>
              {error.type && (
                <small className="text-danger text-break">{error.type}</small>
              )}
            </div>
          </div>

          <div className="d-flex gap-3 w-100 justify-content-between">
            <label htmlFor="dob" className="mt-1 w-25">
              DOB
            </label>
            <div className="d-flex w-75 flex-column">
              <input
                type="date"
                name="dob"
                value={data.dob}
                className="border border-secondary p-1 rounded-3"
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
              />
              {error.dob && (
                <small className="text-danger text-break">{error.dob}</small>
              )}
            </div>
          </div>

          <div className="d-flex gap-3 w-100 justify-content-between">
            <label htmlFor="city" className="mt-1 w-25">
              City
            </label>
            <div className="d-flex w-75 flex-column">
              <input
                type="text"
                name="city"
                placeholder="Enter City"
                value={data.city}
                className="border border-secondary p-1 rounded-3"
                onChange={handleChange}
              />
              {error.city && (
                <small className="text-danger text-break">{error.city}</small>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-info d-flex gap-2 align-items-center justify-content-center"
          >
            {loading && (
              <div
                className="spinner-border text-light mt-1"
                style={{ width: "1.2rem", height: "1.2rem" }}
                role="status"
              ></div>
            )}
            Create
          </button>
        </form>
      </div>
      {login && (
        <Modal show={login} onHide={() => navigate("/bank/admin/dashboard")}>
          <Modal.Header closeButton>
            <Modal.Title>Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>Account Created SuccessFully!...</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => navigate("/bank/admin/dashboard")}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
