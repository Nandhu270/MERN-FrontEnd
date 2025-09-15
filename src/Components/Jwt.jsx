import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function Jwt() {

  const navigate = useNavigate();

  const handleSubmit = async()=>{
    try{

      const res = await axios.get('http://localhost:5000/api/kce/logindata')
      console.log(res.data);
      localStorage.setItem("token",res.data.token);
      navigate('page');
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='mx-5 mt-5'>
      <button type='submit' className='btn btn-info' onClick={handleSubmit}>Submit</button>
    </div>
  )
}
