import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function AccountDetails() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);

  const getData = async () => {
    try {
      setloading(true);
      const res = await axios.get("http://localhost:5000/api/bank/get");
      console.log(res.data.data);
      
      setData(res.data.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-100 d-flex justify-content-center align-items-center mt-5">
    {
      !loading ? <>
      <table className="w-75 table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Account No</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Type</th>
            <th>DOB</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((data,index)=>(
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.account_no}</td>
                <td>{data.email}</td>
                <td>{data.phone_number}</td>
                <td>{data.type}</td>
                <td>{data.dob.split("T")[0]}</td>
                <td>{data.city}</td>
              </tr>
            ))
          }
        </tbody>
      </table>

      </> : <p>Please Wait Loading!...</p>
    }
    
    </div>
  );
}
