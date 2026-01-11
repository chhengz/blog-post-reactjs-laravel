import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AppContext } from "../../contexts/AppContext";

const Register = () => {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  async function handleRegister(e) {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setError(data.errors);
    } else {
      localStorage.setItem("token", data.data?.token);
      setToken(data.data?.token);
      navigate("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center tracking-tight">
          Create Your Account
        </h1>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="name"
              className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition-all duration-200 bg-gray-50 text-gray-800 placeholder-gray-400"
              placeholder="Enter your username"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              value={formData.name}
            />
            {error.name && (
              <p className="text-red-500 text-sm mt-1">{error.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition-all duration-200 bg-gray-50 text-gray-800 placeholder-gray-400"
              placeholder="Enter your email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
            />
            {error.email && (
              <p className="text-red-500 text-sm mt-1">{error.email[0]}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition-all duration-200 bg-gray-50 text-gray-800 placeholder-gray-400"
              placeholder="Enter your password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
            />
            {error.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password_confirmation"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="password_confirmation"
              className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition-all duration-200 bg-gray-50 text-gray-800 placeholder-gray-400"
              placeholder="Confirm your password"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password_confirmation: e.target.value,
                })
              }
              value={formData.password_confirmation}
            />
            {error.password_confirmation && (
              <p className="text-red-500 text-sm mt-1">
                {error.password_confirmation}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleRegister}
            className="w-full bg-indigo-600 text-white p-3 rounded-lg cursor-pointer hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 transition-all duration-200 font-medium tracking-wide"
          >
            Sign Up
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to={"/auth/login"}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router";
// import { AppContext } from "../../contexts/AppContext";

// const Register = () => {
//   const { setToken } = useContext(AppContext);
//   const navegate = useNavigate();
//   const [error, setError] = useState({});
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     password_confirmation: "",
//   });

//   async function handleRegister(e) {
//     e.preventDefault();

//     const res = await fetch("/api/auth/register", {
//       method: "POST",
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();

//     if (data.errors) {
//       setError(data.errors);
//     } else {
//       localStorage.setItem("token", data.data?.token);
//       setToken(data.data?.token);
//       navegate("/");
//     //   console.log(data);
//     }
//   }

//   //   const handleChange = (e) => {
//   //     const { id, value } = e.target;
//   //     setFormData((prevData) => ({
//   //       ...prevData,
//   //       [id]: value,
//   //     }));
//   //   }

//   return (
//     <div className="w-1/2 mx-auto flex flex-col mt-6 space-y-4">
//       <h1 className="text-3xl font-medium">Register</h1>

//       <form className="mt-4 space-y-4" onSubmit={handleRegister}>
//         <div>
//           <label htmlFor="username" className="block text-sm font-medium">
//             Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             className="w-full p-2 border border-gray-300 rounded-md"
//             // required
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             value={formData.name}
//           />
//           {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
//         </div>
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             className="w-full p-2 border border-gray-300 rounded-md"
//             // required
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//             value={formData.email}
//           />
//           {error.email && (
//             <p className="text-red-500 text-sm">{error.email[0]}</p>
//           )}
//         </div>
//         <div>
//           <label htmlFor="password" className="block text-sm font-medium">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             className="w-full p-2 border border-gray-300 rounded-md"
//             // required
//             onChange={(e) =>
//               setFormData({ ...formData, password: e.target.value })
//             }
//             value={formData.password}
//           />
//           {error.password && (
//             <p className="text-red-500 text-sm">{error.password}</p>
//           )}
//         </div>

//         <div>
//           <label
//             htmlFor="password_confirm"
//             className="block text-sm font-medium"
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             id="password_confirm"
//             className="w-full p-2 border border-gray-300 rounded-md"
//             // required
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 password_confirmation: e.target.value,
//               })
//             }
//             value={formData.password_confirmation}
//           />
//           {/* {error.password && (
//             <p className="text-red-500 text-sm">{error.password}</p>
//           )} */}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 mt-2 border rounded-md hover:bg-blue-600 cursor-pointer"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;
