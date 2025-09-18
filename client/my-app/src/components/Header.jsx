// import React from "react";

// const Header = () => {
//   return (
//     <div>
//       <h1 className=" m-1  display-1 fw-bold text-center ">Restaurants</h1>
//     </div>
//   );
// };

// export default Header;
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container-max px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
            Y
          </div>
          <div>
            <h1 className="text-xl font-semibold">Yelp Clone</h1>
            <p className="text-xs text-gray-500">PERN — Tailwind UI</p>
          </div>
        </Link>
        <nav>
          <Link
            to="/"
            className="text-sm text-gray-700 hover:text-indigo-600 transition"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
