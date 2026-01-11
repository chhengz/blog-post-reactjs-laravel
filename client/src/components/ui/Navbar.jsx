import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router";
import { AppContext } from "../../contexts/AppContext";

const links = [
  { path: "/home", label: "Home" },
  { path: "/blog", label: "Blog" },
  { path: "/about", label: "About" }
];

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, token, setUser, setToken } = useContext(AppContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="w-full bg-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Left side - Navigation links */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-semibold text-indigo-600">
              BlogApp
            </Link>
            <div className="hidden md:flex space-x-6">
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-gray-700 active:text-indigo-600 hover:text-indigo-600 px-1 py-2 text-md font-medium transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
              {user && (
                <Link
                  to="/blog/create"
                  className="text-gray-700 active:text-indigo-600 hover:text-indigo-600 px-1 py-2 text-md font-medium transition-colors duration-200"
                >
                  Create
                </Link>
              )}
            </div>
          </div>

          {/* Right side - Auth/user section */}
          <div className="flex items-center space-x-4  ">
            {user ? (
              <div className="relative " ref={dropdownRef}>
                <div className="flex items-center space-x-2 ">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 focus:outline-none cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-indigo-600">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden md:inline text-sm font-medium text-gray-700">
                      {user.name}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        isDropdownOpen ? "transform rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to={`/profile/` + user.name}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600 px-3 py-1.5 rounded-md hover:bg-indigo-50 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md transition-colors duration-200 shadow-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router";
// import { AppContext } from "../../contexts/AppContext";

// const links = [
//   { path: "/", label: "Home" },
//   { path: "/blog", label: "Blog" }
// ];

// export const Navbar = () => {
//   const navigate = useNavigate();
//   const { user, token, setUser, setToken } = useContext(AppContext);

//   const handleLogout = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/auth/logout", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res.ok) {
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem("token");
//         navigate("/");
//       } else {
//         console.error("Logout failed");
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Left side - Navigation links */}
//           <div className="flex items-center space-x-8">
//             <Link to="/" className="text-2xl font-semibold text-indigo-600">
//               BlogApp
//             </Link>
//             <div className="hidden md:flex space-x-6">
//               {links.map((link, index) => (
//                 <Link
//                   key={index}
//                   to={link.path}
//                   className="text-gray-700 hover:text-indigo-600 px-1 py-2 text-md font-medium transition-colors duration-200"
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//               {user && (
//                 <Link
//                   to="/blog/create"
//                   className="text-gray-700 hover:text-indigo-600 px-1 py-2 text-md font-medium transition-colors duration-200"
//                 >
//                   Create
//                 </Link>
//               )}
//             </div>
//           </div>

//           {/* Right side - Auth/user section */}
//           <div className="flex items-center space-x-4">
//             {user ? (
//               <>
//                 <div className="hidden md:flex items-center space-x-2">
//                   <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
//                     <span className="text-xs font-medium text-indigo-600">
//                       {user.name.charAt(0).toUpperCase()}
//                     </span>
//                   </div>
//                   <span className="text-sm font-medium text-gray-700">
//                     {user.name}
//                   </span>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="corsor-pointer text-sm font-medium text-gray-700 hover:text-red-600 px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors duration-200 "
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="text-sm font-medium text-gray-700 hover:text-indigo-600 px-3 py-1.5 rounded-md hover:bg-indigo-50 transition-colors duration-200"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md transition-colors duration-200 shadow-sm"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };


// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router";
// import { AppContext } from "../../contexts/AppContext";

// const links = [
//   { path: "/", label: "Home" },
//   { label: "Blog", path: "/blog" }
// ];

// export const Navbar = () => {
//   const navigate = useNavigate();
//   const { user, token, setUser, setToken } = useContext(AppContext);

//   const handleLogout = async (e) => {
//     e.preventDefault();
//     const res = await fetch("/api/auth/logout", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (res.ok) {
//       setUser(null);
//       setToken(null);
//       localStorage.removeItem("token");
//       window.location.reload();
//       navigate("/");
//     } else {
//       console.error("Logout failed");
//     }
//   };

//   return (
//     <nav className="p-4">
//       <ul className="flex space-x-4">
//         {links.map((link, index) => (
//           <li key={index} className="inline-block mr-4">
//             <Link to={link.path} className="text-blue-500 hover:text-blue-700 hover:underline">
//               {link.label}
//             </Link>
//           </li>
//         ))}

        

//         { user ? (
//           <li  className="inline-block mr-4">
//             <Link to={"/blog/create"} className="text-blue-500 hover:text-blue-700 hover:underline">
//               Create
//             </Link>
//           </li>
//         ) : null}

//         { user && (
//             <li>{user.name}</li>
//         ) }

//         {user ? (
//           <li>
//             <button
//               onClick={handleLogout}
//               className="border hover:border-red-400 hover:text-red-400 px-1 rounded-md text-blue-500  cursor-pointer"
//             >
//               Logout
//             </button>
//           </li>
//         ) : (
//           <div className="flex space-x-4">
//             <li>
//               <Link to="/login" className="text-blue-500 hover:text-blue-700 hover:underline">
//                 Login
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/register"
//                 className="text-blue-500 hover:text-blue-700 hover:underline"
//               >
//                 Register
//               </Link>
//             </li>
//           </div>
//         )}
//       </ul>
//     </nav>
//   );
// };
