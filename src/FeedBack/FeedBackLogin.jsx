import axios from "axios";
import React, { useState } from "react";
import { Image, Button, Row, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FeedBackLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({
    msg: "",
    type: "",
  });



  const navigate = useNavigate();

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const [login, setlogin] = useState(false);

  const handleError = () => {
    setError({});
    let err = {};

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
        "/api/feedback/login",
        data,
        {withCredentials: true}
      );
      if (res.status == 200) setlogin(true);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401)
          setMessage({ msg: err.response.data.msg, type: "warning" });
        else if (err.response.status === 404)
          setMessage({ msg: err.response.data.msg, type: "danger" });
        else setMessage({ msg: err.response.data.msg, type: "danger" });
      } else {
        setMessage({
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
    <div className="w-100 vh-100 d-flex align-items-center justify-content-center">
      <div className="w-50 h-100 d-flex justify-content-start">
        <div className="h-100" style={{ width: "80%" }}>
          <Image
            src="https://images.unsplash.com/photo-1676042349618-9f8c85d76b7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGZlZWRiYWNrJTIwc3VydmV5fGVufDB8fDB8fHww"
            className="w-100 h-100"
            fluid
            style={{
              borderTopRightRadius: "50px",
              borderBottomRightRadius: "50px",
            }}
          />
        </div>
      </div>
      <div className="w-50 h-100 d-flex flex-column align-items-center justify-content-center">
        {message.msg && (
          <div
            className={`alert alert-${message.type} w-75 d-flex align-items-center justify-content-center text-center`}
            role="alert"
          >
            <p className="mb-0">{message.msg}</p>
          </div>
        )}
        <div className="w-75 d-flex flex-column gap-4">
          <h1>Let’s Get Started</h1>
          <div className="w-75">
            <form
              method="post"
              onSubmit={handleSubmit}
              className="w-100 d-flex flex-column gap-3"
            >
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
                login
              </Button>
            </form>
            <Row className="mt-4 d-flex justify-content-center align-items-center">
              <div className="d-flex justify-content-center align-items-center">
                <p>
                  Create Account?{" "}
                  <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => navigate("/app/feedback/register")}
                  >
                    Register
                  </span>
                </p>
              </div>
            </Row>
          </div>
        </div>
      </div>
      <Modal
        show={login}
        onHide={() => {
          navigate("/app/feedback/dashboard");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>Login SuccessFull!...</Modal.Body>
        <Modal.Footer>
          <Button
            variant="info"
            onClick={() => {
              navigate("/app/feedback/dashboard");
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FeedBackLogin;
