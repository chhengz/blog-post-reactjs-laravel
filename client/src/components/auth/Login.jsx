import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AppContext } from "../../contexts/AppContext";

const Login = () => {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
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
          Welcome Back
        </h1>

        <div className="space-y-6">
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

          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-indigo-600 text-white p-3 rounded-lg cursor-pointer hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 transition-all duration-200 font-medium tracking-wide"
          >
            Sign In
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to={"/auth/register"}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
          >Sign up</Link>
          
        </p>
      </div>
    </div>
  );
};

export default Login;

// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router";
// import { AppContext } from "../../contexts/AppContext";

// const Login = () => {
//   const { setToken } = useContext(AppContext);
//   const navegate = useNavigate();
//   const [error, setError] = useState({});
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   async function handleLogin(e) {
//     e.preventDefault();

//     const res = await fetch("/api/auth/login", {
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
//     }
//   }

//   return (
//     <div className="w-1/2 mx-auto flex flex-col mt-6 space-y-4">
//       <h1 className="text-3xl font-medium">Login</h1>

//       <form className="mt-4 space-y-4" onSubmit={handleLogin}>
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

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 mt-2 rounded-md hover:bg-blue-600 border cursor-pointer"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
