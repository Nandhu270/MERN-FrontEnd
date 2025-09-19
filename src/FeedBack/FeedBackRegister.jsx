import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Col, Image, Modal, Row } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

function FeedBackRegister() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({
    msg: "",
    type: "",
  });

  const [login, setlogin] = useState(false);

  const navigate = useNavigate();

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleError = () => {
    setError({});
    let err = {};

    if (data.name.trim() === "") err.name = "Please Enter Name";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (data.email.trim() === "") err.email = "Please Enter Email";
    else if (!emailRegex.test(data.email))
      err.email = "Please Enter Valid Email Address";

    if (data.password === "") err.password = "Please Enter Password";
    else if (data.password.length < 4)
      err.password = "Please Enter Minimum 4 digit Password";

    setError(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkerror = handleError();
    if (!checkerror) return;

    try {
      const res = await axios.post(
        "/api/feedback/signin",
        data
      );
    //   console.log(res);
      if (res.status === 201) {
        setlogin(true);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409)
          setMessage({ msg: err.response.data.msg, type: "warning" });
        else setMessage({ msg: err.response.data.msg, type: "danger" });
      } else {
        setMessage({
          msg: err.message,
          type: "danger",
        });
      }
    } finally {
      setData({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="w-100 vh-100 d-flex align-items-center justify-content-center">
      <div className="w-50 h-100 d-flex flex-column align-items-center justify-content-center">
        {message.msg && (
          <div
            className={`alert alert-${message.type} w-100 d-flex align-items-center justify-content-center text-center`}
            role="alert"
            style={{ marginLeft: "17%" }}
          >
            <p className="mb-0">{message.msg}</p>
          </div>
        )}
        <div
          className="w-75 d-flex flex-column gap-4"
          style={{ marginLeft: "25%" }}
        >
          <h1>Get Started Now</h1>
          <div className="w-75">
            <form
              method="post"
              onSubmit={handleSubmit}
              className="w-100 d-flex flex-column gap-3"
            >
              <div>
                <label htmlFor="name" className="fw-semibold mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control border border-secondary"
                  placeholder="Enter Name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                />
                {error.name && (
                  <small className="text-danger">{error.name}</small>
                )}
              </div>

              <div>
                <label htmlFor="email" className="fw-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control border border-secondary"
                  placeholder="Enter Email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                />
                {error.email && (
                  <small className="text-danger">{error.email}</small>
                )}
              </div>

              <div>
                <label htmlFor="password" className="fw-semibold mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control border border-secondary"
                  placeholder="Enter Password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                />
                {error.password && (
                  <small className="text-danger">{error.password}</small>
                )}
              </div>

              <Button
                type="submit"
                className="mt-2"
                style={{
                  backgroundColor: "#654321e1",
                  borderColor: "#654321e1",
                }}
              >
                Register
              </Button>
            </form>
            <div className="mt-4 d-flex justify-content-center">
              <hr className="flex-grow-1 border border-dark" />
              <h5 className="mx-3 mb-0">or</h5>
              <hr className="flex-grow-1 border border-dark" />
            </div>
            <Row className="mt-3 d-flex justify-content-center align-items-center">
              <Col xs="auto">
                <div
                  className="p-1 border rounded d-flex justify-content-center align-items-center gap-1"
                  style={{ fontSize: "13px", cursor: "pointer" }}
                >
                  <span>
                    {" "}
                    <FcGoogle size={20} color="#000000ff" />
                  </span>
                  Sign in with Google
                </div>
              </Col>
              <Col xs="auto">
                <div
                  className="p-1 border rounded d-flex justify-content-center align-items-center gap-1"
                  style={{ fontSize: "13px", cursor: "pointer" }}
                >
                  <span>
                    <FaApple size={20} color="#000000" />
                  </span>
                  Sign in with Apple
                </div>
              </Col>
            </Row>
            <Row className="mt-4 d-flex justify-content-center align-items-center">
              <div className="d-flex justify-content-center align-items-center">
                <p>
                  Already Have Account?{" "}
                  <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => navigate("/app/feedback/")}
                  >
                    Sign In
                  </span>
                </p>
              </div>
            </Row>
          </div>
        </div>
      </div>
      <div className="w-50 h-100 d-flex justify-content-end">
        <div className="h-100" style={{ width: "80%" }}>
          <Image
            src="https://images.unsplash.com/photo-1676042349618-9f8c85d76b7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGZlZWRiYWNrJTIwc3VydmV5fGVufDB8fDB8fHww"
            className="w-100 h-100"
            fluid
            style={{
              borderTopLeftRadius: "50px",
              borderBottomLeftRadius: "50px",
            }}
          />
        </div>
      </div>
      <Modal
        show={login}
        onHide={() => {
          navigate("/app/feedback/");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Registered SuccessFully... Please Login To Continue!...
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="info"
            onClick={() => {
              navigate("/app/feedback/");
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FeedBackRegister;
