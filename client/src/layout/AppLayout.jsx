import React from 'react'
import { Outlet } from 'react-router'
import { Navbar } from '../components/ui/Navbar'
import { SimpleScrollText } from '../components/ui/text/SimpleScrollText'
import Aurora from '../components/ui/anim/Aurora'
import Marquee from 'react-fast-marquee'
import Squares from '../components/ui/bg/Squares'

const AppLayout = () => {
  return (
    <div className='w-full bg-gradient-to-b from-gray-100 to-white'>

      

      {/* <div className='fixed top-0 left-0 w-full h-full z-[-1]'>
        <Squares
        speed={0.5} 
        squareSize={40}
        direction='diagonal' // up, down, left, right, diagonal
        borderColor='#fff'
        hoverFillColor='#222'
        />
      </div> */}

      <header className='w-full sticky top-0 z-50 flex border-b border-gray-400 justify-end'>
        <Navbar />
      </header>

      <div className='w-full bg-gray-800 py-1'>
        <Marquee autoFill>
          <span className="text-white text-sm px-2">Welcome to the Blog! Explore, Create, and Share! - ✨ Make by VANG SOKCHHENG ✨ ///</span>
        </Marquee>
      </div>

        <div className=''>
            <Outlet />
        </div>

    </div>
  )
}

export default AppLayout