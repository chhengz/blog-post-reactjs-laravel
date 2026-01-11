import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { Link, useNavigate } from "react-router";
import SimpleMDE from "react-simplemde-editor";

const Create = () => {
  const editorRef = useRef();

  const navegate = useNavigate();
  const { token } = useContext(AppContext);
  const [formData, setFormData] = React.useState({
    title: "",
    content: "",
  });

  const [error, setError] = useState({});

  const handleCreate = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify(formData),
      body: JSON.stringify({
        title: formData.title,
        content: formData.content,
      }),
    });

    const data = await res.json();

    // console.log(data)

    if (data.errors) {
      setError(data.errors);
    } else navegate("/blog");
  };

  return (
    <div className="w-3/4 mx-auto flex flex-col mt-6 mb-6 space-y-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Create a new Post</h1>

        <Link
          to="/blog"
          className="inline-flex items-center px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors shadow-sm"
        >
          Cancel
        </Link>
      </div>

      <form className="mt-4 space-y-4" onSubmit={handleCreate}>
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

        {/* <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            rows={6}
            placeholder="Enter Post Content"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          ></textarea>
          {error.content && (
            <p className="text-red-500 text-sm mt-1">{error.content[0]}</p>
          )}
        </div> */}

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Content
          </label>
          <SimpleMDE
            id="myEditor"
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            value={formData.content}
            getMdeInstance={(instance) => {
              editorRef.current = instance;
            }}
            options={{
              placeholder: "Write your post in markdown...",
              spellChecker: false,
              autosave: {
                enabled: false,
              },
            }}
          />
          {error.content && (
            <p className="text-red-500 text-sm mt-1">{error.content[0]}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 mt-2 rounded-md hover:bg-blue-600 border cursor-pointer"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Create;
