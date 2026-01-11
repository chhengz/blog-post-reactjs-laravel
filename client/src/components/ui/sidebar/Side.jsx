import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`transition-all duration-300 ${isOpen ? "w-64" : "w-16"} bg-gray-800 text-white h-screen p-4`}>
      <button className="mb-4" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Collapse" : "Expand"}
      </button>
      <nav>
        <ul>
          <li className="py-2"><a href="#" className="block">Dashboard</a></li>
          <li className="py-2"><a href="#" className="block">Profile</a></li>
          <li className="py-2"><a href="#" className="block">Settings</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;