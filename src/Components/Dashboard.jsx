import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const navigate = useNavigate()
  return (
    <div className='w-100 vh-100 d-flex align-items-center flex-column gap-3'>
        <div>
        <h1 className='text-center mt-5'>Admin Feature</h1>
        </div>
        <div className='w-100 d-flex align-items-center justify-content-center flex-column gap-3'>
            <button className='w-25 p-2 d-flex align-items-center justify-content-center btn btn-outline-primary' onClick={()=>navigate('/bank/admin/account')}> Open Account </button>
            <button className='w-25 p-2 d-flex align-items-center justify-content-center btn btn-outline-primary' onClick={()=>navigate('/bank/admin/details')}> Show Account </button>
        </div>
    </div>
  )
}
