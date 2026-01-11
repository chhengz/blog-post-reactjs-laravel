import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { Link, useNavigate, useParams } from "react-router";
import { HiXCircle } from "react-icons/hi";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const EditPost = () => {
  const { id } = useParams();
  const navegate = useNavigate();
  const { user, token } = useContext(AppContext);
  const [formData, setFormData] = React.useState({
    title: "",
    content: "",
  });

  const [error, setError] = useState({});

  const getPost = async () => {
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();

    // console.log("User ID:", user?.id);

    if (res.ok) {
      if (data.data.user_id !== user?.id) {
        navegate("/blog");
        // return;
      }

      setFormData({
        title: data.data.title,
        content: data.data.content,
      });
      // console.log(data);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      // body: JSON.stringify(formData),
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: formData.title,
        content: formData.content,
      }),
    });

    const data = await res.json();

    // console.log(data);

    if (data.errors) {
      setError(data.errors);
    } else navegate("/blog");
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="w-full px-6 sm:px-2 md:px-0 md:w-1/2 mx-auto flex flex-col mt-6 mb-6 space-y-4">
      <div className="mb-4 md:px-2 flex justify-between items-center ">
        <h1 className="text-3xl font-medium">Edit Post</h1>

        <div className="">
          <Link
            to={`/blog/post/${id}`}
            className="inline-flex items-center px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors shadow-sm"
          >
            Cancel Edit
          </Link>
        </div>
      </div>

      <form className="mt-4 space-y-4" onSubmit={handleUpdate}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter post title"
            // required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {error.title && (
            <p className="text-red-500 text-sm mt-1">{error.title[0]}</p>
          )}
        </div>

        <div>
          {/* <label className="block mb-2 text-sm font-medium text-gray-700">
            Content
          </label> */}

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Content
            </label>
            <SimpleMDE
              value={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
              options={{
                spellChecker: false,
                placeholder: "Write your post in markdown...",
                autosave: {
                  enabled: false,
                },
              }}
            />
            {error.content && (
              <p className="text-red-500 text-sm mt-1">{error.content[0]}</p>
            )}
          </div>

          {/* <textarea
            rows={6}
            placeholder="Enter Post Content"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          ></textarea> */}
          {error.content && (
            <p className="text-red-500 text-sm mt-1">{error.content[0]}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 mt-2 rounded-md hover:bg-blue-600 border cursor-pointer"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPost;
