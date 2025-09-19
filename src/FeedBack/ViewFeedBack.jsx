import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ViewFeedBack() {
  const [data, setData] = useState([]);

  const [expiry, setExpiry] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/feedback/getData",
        { withCredentials: true }
      );
      setData(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      if (err.response) {
        if (err.response.data.msg === "jwt expired") setExpiry(true);
      } else {
        console.log(err.message);
      }
    }
  };

  return (
    <div>
      {[...Array(Math.ceil(data.length / 3))].map((_, rowIndex) => (
        <Row key={rowIndex} className="mb-4">
          {data.slice(rowIndex * 3, rowIndex * 3 + 3).map((item, colIndex) => (
            <Col key={colIndex} md={4} className="d-flex">
              <div className="card shadow-sm rounded-3 h-100 w-100">
                <img
                  src={`http://localhost:5000${item.imageUrl}`}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{item.name}</h5>
                  <p className="card-text mb-1">
                    <strong>City:</strong> {item.city}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Email:</strong> {item.email}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Date:</strong> {item.date}
                  </p>
                  <p className="card-text flex-grow-1">
                    <strong>Feedback:</strong> {item.feedback}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      ))}

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
              navigate("/app/feedback/");
            }}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
