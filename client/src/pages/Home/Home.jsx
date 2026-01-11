import React from 'react'
import InfiniteTextScroll from '../../components/ui/text/InfiniteTextScroll'
import RotatingText from '../../components/ui/text/RotatingText'
import GradientText from '../../components/ui/text/GradientText'
import { Link } from 'react-router'

const Home = () => {
  return (

    <div className=" relative w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 ">
      {/* bg-gradient-to-b from-white to-gray-50 */}

      {/* Background Pattern */}
      <div class="absolute inset-0">
        <div class="absolute inset-0  h-full w-full -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>


      <div className=" max-w-3xl mx-auto text-center space-y-6 z-10">
        {/* Hero Section */}
        <div className="mb-10">
          {/* <GradientText
            colors={["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#3b82f6"]}
            animationSpeed={15}
            showBorder={false}
            className=""
          >
          </GradientText> */}
          <h1 
            className='text-5xl md:text-7xl pb-4 font-bold mb-6 bg-clip-text text-transparent'
            style={{
              backgroundImage: 'linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #3b82f6)'
            }}
          >
            Welcome to the Blog!
          </h1>
          
          <p className="text-xl text-gray-600 mb-4">
            Discover, create, and share your stories with the world
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Explore</h3>
            <p className="text-gray-600">Discover diverse content from our community</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Create</h3>
            <p className="text-gray-600">Share your thoughts and stories</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Connect</h3>
            <p className="text-gray-600">Engage with like-minded people</p>
          </div>
        </div>

        <Link
            to="/blog"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
          >
            Go to Blog
          </Link>

        {/* Animated Elements */}
        {/* <div className="space-y-8">
          <div className="py-4 border-y border-gray-200">
            <RotatingText 
              text={["Start writing today", "Join our community", "Inspire others"]} 
              className="text-xl font-medium"
            />
          </div>
          
          <InfiniteTextScroll 
            text="New posts daily • Trending topics • Featured writers • Exclusive content"
            speed={50}
            className="text-sm text-gray-500 py-2"
          />
        </div> */}
      </div>
    </div>
  )
}

export default Home