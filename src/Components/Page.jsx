import React from "react";
import axios from "axios";

export default function Page(){

    const token = localStorage.getItem("token");

    const verifyToken = async()=>{
        try{
            const res = await axios.get("http://localhost:5000/api/kce/verifytoken",{
                headers: {
                    Authorization:`Bearer ${token}`
                }
            })
            console.log(res);
        }catch(err){
            console.log(err);
        }
    }

    return <div>
        <p>Page DashBoard</p>
        <p>{token}</p>

        <button type="submit" className='btn btn-info' onClick={verifyToken}>Verify</button>
    </div>
}