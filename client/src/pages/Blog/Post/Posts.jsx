import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AppContext } from "../../../contexts/AppContext";
import ShinyText from "../../../components/ui/text/ShinyText";
import {SkeletonLoader, PostCardSkeleton} from "../../../components/ui/loading/SkeletonLoader";

export const Posts = () => {
  const { user } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/posts");
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <ShinyText 
          text="Latest Posts" 
          disabled={false} 
          speed={3} 
          className="text-3xl font-bold text-gray-800" 
        />
        {user && (
          <Link
            to="/blog/create"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Create Post
          </Link>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <p className="text-red-700">{error}</p>
          <button 
            onClick={getPosts}
            className="mt-2 text-sm text-red-700 underline hover:text-red-800 cursor-pointer"
          >
            Try again
          </button>
        </div>
      )}

      <div className="space-y-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <SkeletonLoader key={index} className="h-32 rounded-xl" />
          ))
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <article 
              key={post.id}
              className="group relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200"
            >
              <Link
                to={`post/${post.id}`}
                className="block p-6 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                    <span className="text-xs font-medium text-indigo-600">
                      {post.user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-600">@{post.user.name}</p>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full border border-gray-200">
                    {formatDate(post.updated_at)}
                  </span>
                  </div>
                </div>

                <p className="text-gray-600 line-clamp-3">{post.content}</p>
                
                <div className="mt-4 flex justify-between items-center">
                  <span className="inline-flex items-center text-sm text-gray-500">
                    <svg className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    {post.comments_count || 0} comments
                  </span>
                  <span className="text-sm text-indigo-600 hover:underline">
                    Read more →
                  </span>
                </div>
              </Link>
            </article>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No posts yet</h3>
            <p className="mt-1 text-gray-500">Be the first to create one!</p>
            {user && (
              <div className="mt-6">
                <Link
                  to="/blog/create"
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Create your first post
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router";
// import { AppContext } from "../../../contexts/AppContext";
// import ShinyText from "../../../components/ui/text/ShinyText";

// export const Posts = () => {
//   const {user} = useContext(AppContext);
//   const [posts, setPosts] = useState([]);

//   const getPost = async () => {
//     const res = await fetch("/api/posts");
//     const data = await res.json();

//     if (res.ok) {
//       setPosts(data);
//     }
//     // console.log(data);
//   };

//   useEffect(() => {
//     getPost();
//   }, []);

//   return (
//     <div>
//       {/* <h1 className="text-3xl font-medium">Latest Posts</h1> */}
//       <ShinyText 
//       text="Latest Posts" 
//       disabled={false} 
//       speed={3} 
//       className=' text-3xl font-medium' />

//       <div className="mt-6">
//         <ul className="space-y-4">
//           {posts.length > 0 ? (
//             posts.map((post) => (
//               <li
//                 key={post.id}
//                 className=" relative overflow-hidden rounded-xl border border-gray-600 hover:border-gray-400"
//               >
                
//                 <Link
//                   to={`post/${post.id}`}
//                   className="block px-2 py-2 hover:bg-green-100 rounded-md"
//                 >
//                   <div className="mb-2">
//                     <h2 className="text-md hover:underline">{post.title}</h2>
//                     <p className="w-fit text-sm text-gray-600 ">@{post.user.name} • {new Date(post.updated_at).toDateString()}</p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600 border-l border-gray-600 pl-2 line-clamp-3">{post.content}</p>
//                   </div>
//                   {/* <p className="text-sm text-gray-400">Created by {post.user.name} on {new Date(post.updated_at).toDateString()}</p> */}
//                 </Link>
//               </li>
//             ))
//           ) : (
//             <li className="text-gray-500">No posts available</li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };
