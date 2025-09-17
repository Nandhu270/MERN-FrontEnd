import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const [food, setFood] = useState({
    name: "",
    price: "",
  });

  const [order, setOrder] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [expiry, setExpiry] = useState(false);

  useEffect(() => {
    if (!show) return;
    fetchData();
  }, [show]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const res = await axios.get("http://localhost:5000/api/food/getData", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data.data);
    } catch (err) {
      if (err.response) {
        if (err.response.data.msg === "jwt expired") setExpiry(true);
        console.log(err.response.data.msg);
      } else {
        console.log(err.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood({ ...food, [name]: value });
  };

  useEffect(() => {}, [expiry]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newData = {
        name: food.name,
        price: Number(food.price),
      };
      const token = localStorage.getItem("token") || "";
      const data = await axios.post(
        "http://localhost:5000/api/food/savefood",
        newData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(data);
      setOrder(true);
      fetchData();
    } catch (err) {
      if (err.response) {
        if (err.response.data.msg === "jwt expired") setExpiry(true);
        console.log(err.response.data.msg);
      } else {
        console.log(err.message);
      }
    } finally {
      setFood({ name: "", price: 0 });
    }
  };

  return (
    <div className="w-100 vh-100 d-flex align-items-center flex-column gap-3 mt-5">
      <h1>Customer Page</h1>
      <button
        className="w-25 p-2 d-flex align-items-center justify-content-center btn btn-outline-primary"
        onClick={() => setType("add")}
      >
        {" "}
        Add Order{" "}
      </button>
      <button
        className="w-25 p-2 d-flex align-items-center justify-content-center btn btn-outline-primary"
        onClick={() => setType("show")}
      >
        {" "}
        Show Order{" "}
      </button>
      {type === "add" ? (
        <>
          <form
            className="mt-5 d-flex align-items-center flex-column"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Enter Food Name"
              className="form-control border border-secondary"
              name="name"
              value={food.name}
              onChange={handleChange}
            />
            <br />
            <input
              type="number"
              placeholder="Enter the Price"
              className="form-control border border-secondary"
              name="price"
              value={food.price}
              onChange={handleChange}
            />
            <br />
            <button className="btn btn-info">Order</button>
          </form>
          {expiry && (
            <>
              <h3>Jwt Token Expired</h3>
              <button
                className="btn btn-danger"
                onClick={() => navigate("/app/food/")}
              >
                Logout
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <button className="btn btn-info" onClick={() => setShow(!show)}>
            Click to View Data
          </button>
          {show && (
            <>
              {expiry ? (
                <>
                  <h3>Jwt Token Expired</h3>
                  <button
                    className="btn btn-danger"
                    onClick={() => navigate("/app/food/")}
                  >
                    Logout
                  </button>
                </>
              ) : data.length > 0 ? (
                <div className="w-75">
                  {/* <input type="text" className="form-control w-25 border border-secondary" placeholder="Enter Search Data"/> */}
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <h3>No Data Found</h3>
              )}
            </>
          )}
        </>
      )}
      {order && (
        <Modal
          show={order}
          onHide={() => {
            setOrder(!order);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>Ordered SuccessFully!...</Modal.Body>
          <Modal.Footer>
            <Button
              variant="info"
              onClick={() => {
                setOrder(!order);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
