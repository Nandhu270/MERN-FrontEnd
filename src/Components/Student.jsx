import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

export default function Student() {
  const [name, setName] = useState("");
  const [rollNo, setrollNo] = useState("");
  const [dept, setdept] = useState("");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  //   useEffect(() => {
  //     setData([]);
  //     getData();
  //   }, []);

  const getData = async () => {
    setData([]);
    try {
      const res = await axios.get("http://localhost:5000/api/kce/");
      // console.log(res.data.data);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const searchdata = async () => {
      setData([]);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/kce/filter?name=${search}`
        );
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    searchdata();
  }, [search]);

  const saveData = async (e) => {
    e.preventDefault();
    try {
      const student = {
        rollNo: rollNo,
        name: name,
        dept: dept,
      };
      const res = await axios.post(
        "http://localhost:5000/api/kce/save",
        student
      );
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  const deleteData = async (rollNo) => {
    try {
      await axios.delete(`http://localhost:5000/api/kce/delete/${rollNo}`);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-100">
      <form
        className="d-flex gap-2 w-50 mb-2"
        method="post"
        onSubmit={saveData}
      >
        <input
          type="text"
          placeholder="Enter Name..."
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter RollNo..."
          onChange={(e) => setrollNo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Department..."
          onChange={(e) => setdept(e.target.value)}
        />
        <button type="submit" className="w-50 btn btn-info">
          Save
        </button>
      </form>
      <div>
        <input
          className="ms-2"
          type="text"
          placeholder="Search Name..."
          onChange={(e) => setSearch(e.target.value)}
        />

        {Array.isArray(data) && (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>RollNo</th>
                <th>Name</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, index) => (
                <tr key={index}>
                  <td>{data.rollNo}</td>
                  <td>{data.name}</td>
                  <td>{data.dept}</td>
                  <td className="d-flex gap-2">
                    <button
                      className="btn btn-info"
                    >
                      <Link to={`/edit/?rollNo=${data.rollNo}&name=${data.name}&dept=${data.dept}`} style={{textDecoration:'none',color:"white"}} >Update</Link>
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteData(data.rollNo)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
