import React from 'react'

export const SimpleScrollText = ({text}) => {
  return (
    <div className=" w-full overflow-hidden text-white bg-gray-800 border-b border-gray-400">
        {/* <div className="flex whitespace-nowrap animate-marquee"> */}
        <div className="flex  whitespace-nowrap space-x-6">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-2xl animate-marquee">{text}</span>
          ))}
        </div>
    </div>
  )
}
