import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

export default function CustomerLogin() {

  const navigate = useNavigate();

  const [message, setMessage] = useState({
    msg: "",
    type: "",
  });

  const [loading, setloading] = useState(false);

  const [login,setlogin] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // console.log(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setloading(true);
    try{
      const res = await axios.post('http://localhost:5000/api/food/login',data);
      // console.log(res);
      if(res.status === 200){
        const token = res.data.token;
        localStorage.setItem("token",token || "");
        setlogin(true);
      }
    }catch(err){
      if(err.response){
        if(err.response.status === 401)
          setMessage({msg: err.response.data.msg, type:"warning"})
        else if(err.response.status === 404)
          setMessage({msg: err.response.data.msg, type:"danger"})
        else
          setMessage({msg: err.response.data.msg, type:"danger"})
      }else{
        setMessage({msg: err.message, type:"danger"})
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
        <h1>Login</h1>
        <form
          method="post"
          className="d-flex align-items-center flex-column gap-3 w-100"
          onSubmit={handleSubmit}
        >
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
            </div>
          </div>
          <div className="d-flex gap-3 w-100 justify-content-between">
            <label htmlFor="password" className="mt-1 w-25">
              PassWord
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
            </div>
          </div>
          <button className="btn btn-info d-flex gap-2 align-items-center justify-content-center">
            {loading && (
              <div
                className="spinner-border text-light mt-1"
                style={{ width: "1.2rem", height: "1.2rem" }}
                role="status"
              ></div>
            )}
            Login
          </button>
        </form>
        <p>Create An Account? <span style={{cursor: "pointer",textDecoration:'underline'}} onClick={()=>navigate('/app/food/register')}>SignUp</span></p>
      </div>
      {login && (
        <Modal show={login} onHide={() => navigate("/app/food/dashboard")}>
          <Modal.Header closeButton>
            <Modal.Title>Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>Login SuccessFully!...</Modal.Body>
          <Modal.Footer>
            <Button
              variant="info"
              onClick={() => navigate("/app/food/dashboard")}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
