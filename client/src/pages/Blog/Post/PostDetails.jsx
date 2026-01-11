import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { AppContext } from "../../../contexts/AppContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "../../../components/ui/Button/Button";

export const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, token } = useContext(AppContext);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  //   const [loading, setLoading] = useState(true);

  // console.log(id)

  const getPost = async () => {
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();

    // console.log(data);
    if (res.ok) {
      setPost(data);
      //   setLoading(false);
    } else {
      setError("Failed to fetch post details");
      // navigate("/login")
      //   setLoading(true);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    if (user && user?.id === post.data?.user_id) {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        

      });

      if (res.ok) {
        navigate("/blog");
      }

      // const data = await res.json();
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
  <div className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
    {post ? (
      <>
        {/* Top Bar */}
        <div className="mb-6 flex justify-between items-center text-xl ">
          
          <Button path={"/blog"}>
            ← Back to Blog
          </Button>

          {user && user.id === post.data?.user_id && (
            <div className="flex space-x-4 text-gray-500 -mb-2">
              <Link to={`/blog/post/${post.data?.id}/edit`} title="Edit"
              lassName="border border-gray-200 p-1 rounded-md bg-white"
              >
                <HiOutlinePencilAlt className="w-6 h-6 hover:text-blue-500" />
              </Link>
              <form onSubmit={handleDelete}>
                <button title="Delete">
                  <HiOutlineTrash className="w-6 h-6 hover:text-red-500  cursor-pointer " />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Post Title */}
        <h1 className="text-4xl font-bold leading-tight mb-4">
          {post.data?.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center space-x-3 mb-10">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
            {post.user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="text-sm text-gray-600">
            <p className="font-medium">@{post.user?.name}</p>
            <p className="text-xs">
              {new Date(post.data?.updated_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-indigo max-w-none">
          {/* <ReactMarkdown>{post.data?.content}</ReactMarkdown> */}
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.data?.content}
          </ReactMarkdown>
          
        </article>
      </>
    ) : (
      <>
        <Link
          to="/blog"
          className="text-blue-500 hover:underline mb-4 inline-block"
        >
          &larr; Back
        </Link>
        <div className="text-center text-red-500">Post not found</div>
      </>
    )}

    {error && (
      <div className="text-red-500 text-center mt-6">{error}</div>
    )}
  </div>
);


  // return (

    // <div className="px-4 sm:px-0 sm:w-3/4 md:w-1/2 mx-auto mb-4 flex flex-col mt-6 space-y-4">
      
      
    //   {
    //     // loading ? (
    //     //     <div className="text-center text-gray-500">Loading...</div>
    //     // ) :

    //     post ? (
    //       <div className="">
    //         <div className="mb-4 px-2 flex justify-between items-center ">
    //           <Link
    //             to="/blog"
    //             className="text-blue-500 hover:underline inline-block"
    //           >
    //             &larr; Back
    //           </Link>

    //           {user && user.id === post.data?.user_id && (
    //             <div className="flex items-center justify-between space-x-2">
    //               <Link
    //                 to={`/blog/post/${post.data?.id}/edit`}
    //                 className=" text-blue-500 hover:text-blue-400"
    //               >
    //                 <HiOutlinePencilAlt className="w-5 h-5" />
    //               </Link>

    //               <form className="-mb-1" onSubmit={handleDelete}>
    //                 <button className="cursor-pointer text-red-500 hover:text-red-400">
    //                   <HiOutlineTrash className="w-5 h-5" />
    //                 </button>
    //               </form>
    //             </div>
    //           )}
    //         </div>

    //         <div className="p-2 border border-green-400 rounded-xl">
    //           <div className="p-2 bg-green-200 mb-2 rounded-md ">
    //             <h1 className="text-2xl font-medium ">{post.data?.title}</h1>
    //           </div>
    //           <p className="text-sm p-2 bg-pink-100 rounded-md text-gray-500">
    //             Created by {post.user?.name} on{" "}
    //             {new Date(post.data?.updated_at).toLocaleDateString()}
    //           </p>
    //         </div>
    //         <div className="mt-4 p-2 border border-gray-400 rounded-xl">
    //           <div className="p-2  bg-blue-100 rounded-md">
    //             <p className="text-sm text-gray-700 mb-4">
    //             <ReactMarkdown>
    //               {post.data?.content}
    //             </ReactMarkdown>
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     ) : (
    //       <>
    //         <Link
    //           to="/blog"
    //           className="text-blue-500 hover:underline mb-4 inline-block"
    //         >
    //           &larr; Back
    //         </Link>
    //         <div className="text-center text-red-500">Post not found</div>
    //       </>
    //     )
    //   }

    //   {
    //     error && (
    //       <div className="text-red-500 text-center mb-4">
    //         {error}
    //       </div>
    //     )
    //   }
    // </div>
  // );
};
