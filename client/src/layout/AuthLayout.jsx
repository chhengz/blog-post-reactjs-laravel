import React from 'react'
import { Outlet } from 'react-router'

const AuthLayout = () => {
  return (
    <div>
        {/* <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            
            </div>
        </div> */}


        <Outlet />
    </div>
  )
}

export default AuthLayout