import axios from "axios";
import React, { useState,useEffect } from "react";

export default function NatureDashboard() {
  const [data, setData] = useState();
  useEffect(() => {

    const fetchdata = async()=>{
      try{
        const res = await axios.get("http://localhost:5000/api/nature/data",{
        withCredentials:true
      });
      setData(res.data);
      }catch(err){
        setData(err.message);
      }
    }

    fetchdata();
  }, []);
  return <div>{data}</div>;
}
