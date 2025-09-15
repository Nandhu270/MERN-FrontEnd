import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Edit() {
  const [key] = useSearchParams();
    const navigate = useNavigate();
  const [data, setData] = useState({
    rollNo: key.get("rollNo") || "",
    name: key.get("name") || "",
    dept: key.get("dept") || "",
  });

  const changeData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

//   console.log(data);

const updateData = async(e)=>{
    e.preventDefault();
    try{
        const res = await axios.put(`http://localhost:5000/api/kce/update/${data.rollNo}`,data);
        // console.log(res);
        navigate('/');
    }catch(err){
        console.log(err);
    }
}

  return (
    <div>
      <form className="d-flex flex-column  gap-3 align-items-center mt-3" onSubmit={updateData}>
        <h1>Edit the Student</h1>
        <input
          type="text"
          value={data.rollNo}
          name="rollNo"
          disabled
        />
        <input
          type="text"
          value={data.name}
          name="name"
          onChange={changeData}
        />
        <input
          type="text"
          value={data.dept}
          name="dept"
          onChange={changeData}
        />
        <button
          type="submit"
          className="btn btn-info w-20 d-flex align-items-center"
        >
          Update
        </button>
      </form>
    </div>
  );
}
