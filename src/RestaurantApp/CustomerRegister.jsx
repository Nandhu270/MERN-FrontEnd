import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function CustomerRegister() {
  const [message, setMessage] = useState({
    msg: "",
    type: "",
  });
  const [error, setError] = useState({});

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const [login, setlogin] = useState(false);

  // console.log(data);

  const checkerrors = () => {
    setError({});
    let errors = {};

    if (data.username.trim() === "") errors.username = "Please Enter UserName";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (data.email.trim() === "") errors.email = "Please Enter Email";
    else if (!emailRegex.test(data.email))
      errors.email = "Please Enter Valid Email Address";

    if (data.password === "")
      errors.password = "Please Enter Password";
    else if (data.password.length < 8)
      errors.password = "Please Enter Minimum 8 digit Password";

    setError(errors);

    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async(e)=>{
    setloading(true);
    e.preventDefault();
    const check = checkerrors();
    if(!check){
      setloading(false);
      return;
    }

    try{
      const res = await axios.post("http://localhost:5000/api/food/savedata",data);
      // console.log(res);
      if(res.status === 201){
        setlogin(true);
      }
    }catch(err){
      if(err.response){
        if(err.response.status === 409){
          setMessage({msg:err.response.data.msg, type:"warning"});
        }else{
          setMessage({msg:err.response.data.msg, type:"danger"});
        }
      }else{
        setMessage({msg:err.message, type:"danger"});
      }
    }finally{
      setloading(false);
    }
  }

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
            <label htmlFor="username" className="mt-1 w-25">
              UserName
            </label>
            <div className="d-flex w-75 flex-column">
              <input
                type="text"
                name="username"
                placeholder="Enter UserName"
                value={data.username}
                className="border border-secondary p-1 rounded-3"
                onChange={handleChange}
              />
              {error.username && (
                <small className="text-danger text-break">{error.username}</small>
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
            <label htmlFor="password" className="mt-1 w-25">
              Password
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
        <Modal show={login} onHide={() => navigate("/app/food/")}>
          <Modal.Header closeButton>
            <Modal.Title>Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>Account Created SuccessFully!...</Modal.Body>
          <Modal.Footer>
            <Button
              variant="info"
              onClick={() => navigate("/app/food/")}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
