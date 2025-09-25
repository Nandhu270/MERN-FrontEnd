import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";

export default function UpdateFeedBack() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState({
    _id: "",
    name: "",
    city: "",
    email: "",
    date: "",
    feedback: "",
    imageUrl: "",
  });

  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState({ msg: "", type: "" });
  const [error, setError] = useState({});
  const [login, setLogin] = useState(false);
  const [expiry, setExpiry] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/feedback/${id}`, { withCredentials: true })
      .then((res) => {
        setData(res.data);
        setPreview(res.data.imageUrl ? `http://localhost:5000${res.data.imageUrl}` : null);
      })
      .catch((err) => {
        setMessage({ msg: err.message, type: "danger" });
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData({ ...data, imageUrl: file });
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleRemoveImage = () => {
    setData({ ...data, imageUrl: "" });
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleError = () => {
    let err = {};
    if (data.name.trim() === "") err.name = "Please Enter Name";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (data.email.trim() === "") err.email = "Please Enter Email";
    else if (!emailRegex.test(data.email))
      err.email = "Please Enter Valid Email";
    if (data.city.trim() === "") err.city = "Please Enter City";
    if (data.date.trim() === "") err.date = "Please Select Date";
    if (data.feedback.trim() === "") err.feedback = "Please Enter Feedback";
    setError(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleError()) return;

    try {
      const formdata = new FormData();
      formdata.append("id",data._id);
      formdata.append("name", data.name);
      formdata.append("email", data.email);
      formdata.append("city", data.city);
      formdata.append("date", data.date);
      formdata.append("feedback", data.feedback);
      if (data.imageUrl instanceof File) {
        formdata.append("imageUrl", data.imageUrl);
      }

      await axios.put("/api/feedback/updatefeedback", formdata, {
        withCredentials: true,
      });

      setLogin(true);
    } catch (err) {
      if (err.response?.data.msg === "jwt expired") {
        setExpiry(true);
      } else {
        setMessage({ msg: err.message, type: "danger" });
      }
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
        <div className="w-75 d-flex flex-column gap-4" style={{ marginLeft: "25%" }}>
          <h1>Update Feedback</h1>
          <form onSubmit={handleSubmit} className="w-100 d-flex flex-column gap-3">
            <input
              type="text"
              className="form-control border border-secondary"
              placeholder="Enter Name"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
            {error.name && <small className="text-danger">{error.name}</small>}

            <input
              type="email"
              className="form-control border border-secondary"
              placeholder="Enter Email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
            {error.email && <small className="text-danger">{error.email}</small>}

            <input
              type="text"
              className="form-control border border-secondary"
              placeholder="Enter City"
              name="city"
              value={data.city}
              onChange={handleChange}
            />
            {error.city && <small className="text-danger">{error.city}</small>}

            <input
              type="date"
              className="form-control border border-secondary"
              name="date"
              value={data.date}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
            />
            {error.date && <small className="text-danger">{error.date}</small>}

            <textarea
              className="form-control border border-secondary"
              name="feedback"
              placeholder="Leave Feedback"
              value={data.feedback}
              onChange={handleChange}
              rows={3}
            />
            {error.feedback && <small className="text-danger">{error.feedback}</small>}

            {preview && (
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "100px",
                    cursor: "pointer",
                  }}
                  onClick={handleRemoveImage}
                >
                  <IoMdClose />
                </span>
                <img src={preview} alt="Preview" width="100" />
              </div>
            )}

            <input
              type="file"
              className="form-control border border-secondary"
              name="imageUrl"
              onChange={handleFileChange}
              ref={fileRef}
            />

            <Button type="submit" className="mt-2" variant="dark">
              Save Feedback
            </Button>
          </form>
        </div>
      </div>

      <Modal show={login} onHide={() => navigate('/app/feedback/view')}>
        <Modal.Header closeButton>
          <Modal.Title>Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>Feedback Updated Successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={() => navigate('/app/feedback/view')}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={expiry} onHide={() => navigate("/app/feedback/")}>
        <Modal.Header closeButton>
          <Modal.Title>Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>Session Timeout. Please Login again.</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => navigate("/app/feedback")}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
