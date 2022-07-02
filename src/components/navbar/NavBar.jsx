import React from "react";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NavBar = () => {
  return (
    <nav className="bg-black h-20 flex items-center justify-between ">
      <Link to="/">
        <h1 className="text-white ml-6 font-bold text-2xl">Crypto Awards</h1>
      </Link>

      <ul className="flex items-center mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium mr-5 text-gray-200">
        <li>
          <Link to="/explore">
            <div className="block py-2 pr-4 pl-3 text-lg md:p-0 hover:underline">
              Explore
            </div>
          </Link>
        </li>
        <li>
          <Link to="/myprofile">
            <div
              className="block py-2 pr-4 pl-3 text-lg  md:p-0 hover:underline"
              aria-current="page"
            >
              Resume
            </div>
          </Link>
        </li>
        {/* <li>
          <Link to="/admin-panel">
            <div className="block py-2 pr-4 pl-3 text-lg md:p-0 hover:underline">
              Admin Panel
            </div>
          </Link>
        </li> */}
        <li>
          <Link to="/create-program">
            <div className="block py-2 pr-4 pl-3 text-lg md:p-0 hover:underline">
              Dashboard
            </div>
          </Link>
        </li>
        <ConnectButton />
      </ul>
    </nav>
  );
};

export default NavBar;
