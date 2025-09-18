// // import React from "react";
// // // import ReactDom from "react-dom"

// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Home from "./routes/Home";
// // import UpdatePage from "./routes/UpdatePage";
// // import { RestaurantsContextProvider } from "./context/RestaurantContext";
// // import ResDetails from "./routes/ResDetails";

// // function App() {
// //   return (
// //     <RestaurantsContextProvider>
// //       <div className="container">
// //         <Router>
// //           <Routes>
// //             <Route exact path="/" element={<Home />} />
// //             <Route
// //               exact
// //               path="/restaurants/:id/update"
// //               element={<UpdatePage />}
// //             />
// //             <Route exact path="/restaurants/:id" element={<ResDetails />} />
// //           </Routes>
// //         </Router>
// //       </div>
// //     </RestaurantsContextProvider>
// //   );
// // }

// // export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./routes/Home";
// import UpdatePage from "./routes/UpdatePage";
// import ResDetails from "./routes/ResDetails";
// import { RestaurantsContextProvider } from "./context/RestaurantContext";

// function App() {
//   return (
//     <RestaurantsContextProvider>
//       <div className="container">
//         <Router>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/restaurants/:id/update" element={<UpdatePage />} />
//             <Route path="/restaurants/:id" element={<ResDetails />} />
//           </Routes>
//         </Router>
//       </div>
//     </RestaurantsContextProvider>
//   );
// }

// export default App;
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import ResDetails from "./routes/ResDetails";
import UpdatePage from "./routes/UpdatePage";
import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container-max px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants/:id" element={<ResDetails />} />
          <Route path="/restaurants/:id/update" element={<UpdatePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
