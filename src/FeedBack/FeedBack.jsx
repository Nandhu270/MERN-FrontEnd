import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";

const FeedBack = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    city: "",
    date: "",
    feedback: "",
    imageUrl: "",
  });

  const fileRef = useRef(null);

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!data.imageUrl) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(data.imageUrl);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [data.imageUrl]);

  const [message, setMessage] = useState({
    msg: "",
    type: "",
  });

  // console.log(data);

  const [login, setlogin] = useState(false);

  const navigate = useNavigate();

  const [error, setError] = useState({});

  const [expiry, setExpiry] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleRemoveImage = () => {
    setData({ ...data, imageUrl: "" });
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleError = () => {
    setError({});
    let err = {};

    if (data.name.trim() === "") err.name = "Please Enter Name";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (data.email.trim() === "") err.email = "Please Enter Email";
    else if (!emailRegex.test(data.email))
      err.email = "Please Enter Valid Email Address";

    if (data.city.trim() === "") err.city = "Please Enter City";

    if (data.date.trim() === "") err.date = "Please Select Date";

    if (data.feedback.trim() === "")
      err.feedback = "Please Enter some Feedback";

    if (!data.imageUrl) {
      err.imageUrl = "Please upload an image";
    }

    setError(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkerror = handleError();
    if (!checkerror) return;

    try {
      const formdata = new FormData();
      formdata.append("name", data.name);
      formdata.append("email", data.email);
      formdata.append("city", data.city);
      formdata.append("date", data.date);
      formdata.append("feedback", data.feedback);
      formdata.append("imageUrl", data.imageUrl);
      const res = await axios.post("/api/feedback/savefeedback", formdata, {
        withCredentials: true,
      });
      // console.log(res);

      setlogin(true);
    } catch (err) {
      if (err.response) {
        if (err.response.data.msg === "jwt expired") setExpiry(true);
        else {
          setMessage({
            msg: err.message,
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
      setData({
        name: "",
        email: "",
        city: "",
        date: "",
        feedback: "",
        imageUrl: "",
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
            style={{ marginLeft: "17%", marginTop: "110px" }}
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
                <label htmlFor="city" className="fw-semibold mb-1">
                  City
                </label>
                <input
                  type="text"
                  className="form-control border border-secondary"
                  placeholder="Enter city"
                  name="city"
                  value={data.city}
                  onChange={handleChange}
                />
                {error.city && (
                  <small className="text-danger">{error.city}</small>
                )}
              </div>

              <div>
                <label htmlFor="date" className="fw-semibold mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control border border-secondary"
                  name="date"
                  value={data.date}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                />
                {error.date && (
                  <small className="text-danger">{error.date}</small>
                )}
              </div>

              <div>
                <label htmlFor="feedback" className="fw-semibold mb-1">
                  feedback
                </label>
                <textarea
                  className="form-control border border-secondary"
                  name="feedback"
                  placeholder="Leave a Feedback here"
                  value={data.feedback}
                  onChange={handleChange}
                  rows={3}
                />
                {error.feedback && (
                  <small className="text-danger">{error.feedback}</small>
                )}
              </div>

              <div style={{ position: "relative" }}>
                {preview && (
                  <div style={{ marginTop: "80px" }}>
                    <span
                      style={{
                        position: "absolute",
                        top: "-17px",
                        left: "94px",
                        cursor: "pointer",
                      }}
                      onClick={handleRemoveImage}
                    >
                      <IoMdClose />
                    </span>
                    <img
                      src={preview}
                      alt="Preview"
                      className="rounded-3"
                      style={{
                        position: "absolute",
                        top: 0,
                        width: "100px",
                      }}
                    />
                  </div>
                )}
                <label htmlFor="file" className="fw-semibold mb-1">
                  Image
                </label>
                <input
                  type="file"
                  className="form-control border border-secondary"
                  name="imageUrl"
                  onChange={(e) =>
                    setData({ ...data, imageUrl: e.target.files[0] })
                  }
                  ref={fileRef}
                />

                {error.imageUrl && (
                  <small className="text-danger">{error.imageUrl}</small>
                )}
              </div>

              <div className="d-flex align-items-center justify-content-center">
                <Button
                  type="submit"
                  className="mt-2 w-30 mb-1"
                  style={{
                    backgroundColor: "#654321e1",
                    borderColor: "#654321e1",
                  }}
                >
                  Submit Feedback
                </Button>
              </div>
            </form>
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
        <Modal.Body>FeedBack Submitted SuccessFully!..</Modal.Body>
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
      <Modal
        show={expiry}
        onHide={() => {
          navigate("/app/feedback/");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>Session TimeOut.. Please Login to Continue</Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              navigate("/app/feedback");
            }}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FeedBack;
