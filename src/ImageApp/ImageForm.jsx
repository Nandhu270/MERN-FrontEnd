import axios from 'axios';
import React, { useState } from 'react'

const ImageForm = () => {

    const [data, setData] = useState({
        foodName:"",
        price:"",
        imageUrl:"" 
    })

    console.log(data);
    
    const handleSubmit = async(e)=>{
            e.preventDefault();
            const formData = new FormData();
            formData.append("foodName",data.foodName);
            formData.append("price",data.price);
            formData.append("imageUrl",data.imageUrl);

            try{
                const res = await axios.post("http://localhost:5000/api/image/upload",formData);
                console.log(res);
            }catch(err){
                console.log(err.message);
            }

    }

  return (
    <div className='w-100 vh-100 d-flex align-items-center justify-content-center'>
      <div className='w-50 d-flex align-items-center justify-content-center'>
        <form className='w-75 d-flex flex-column gap-4 shadow p-4 rounded-5' onSubmit={handleSubmit}>
            <div className='d-flex gap-5'>
                <label htmlFor="name">Food Name</label>
                <input type='text' placeholder='Enter Food Name' className='w-75 form-control border-secondary'  onChange={(e)=>setData({...data, foodName:e.target.value})}/>
            </div>
            <div className='d-flex gap-5'>
                <label htmlFor="price">Food Price</label>
                <input type='number' placeholder='Enter Price' min="0" className='w-75 form-control border-secondary' onChange={(e)=>setData({...data, price:e.target.value})}/>
            </div>
            <div className='d-flex gap-5'>
                <label htmlFor="image">Food Image</label>
                <input type='file' className='w-50 form-control border-secondary'  onChange={(e)=>setData({...data, imageUrl:e.target.files[0]})}/>
            </div>
            <div className='d-flex justify-content-center'>
                <button type="submit" className='btn btn-info w-25'>Submit</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default ImageForm
