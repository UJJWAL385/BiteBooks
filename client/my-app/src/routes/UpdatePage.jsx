// // import React from "react";
// // import Header from "../components/Header";
// // import AddRestaurant from "../components/AddRestaurant";
// // import RestaurantList from "../components/RestaurantList";

// // const Home = () => {
// //   return (
// //     <div>
// //       <Header />
// //       <AddRestaurant />
// //       <RestaurantList />
// //     </div>
// //   );
// // };

// // export default Home;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import RestaurantFinder from "../api/RestaurantFinder";

// const UpdatePage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [location, setLocation] = useState("");
//   const [priceRange, setPriceRange] = useState("Price Range");

//   // Fetch existing restaurant details
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await RestaurantFinder.get(`/${id}`);
//         setName(response.data.data.restaurant.name);
//         setLocation(response.data.data.restaurant.location);
//         setPriceRange(response.data.data.restaurant.price_range);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchData();
//   }, [id]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await RestaurantFinder.put(`/${id}`, {
//         name,
//         location,
//         price_range: priceRange,
//       });
//       navigate("/"); // redirect back to home
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-center my-3">Update Restaurant</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label> Name </label>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="form-control"
//             type="text"
//           />
//         </div>

//         <div className="form-group mt-2">
//           <label> Location </label>
//           <input
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             className="form-control"
//             type="text"
//           />
//         </div>

//         <div className="form-group mt-2">
//           <label> Price Range </label>
//           <select
//             value={priceRange}
//             onChange={(e) => setPriceRange(e.target.value)}
//             className="form-control"
//           >
//             <option disabled>Price Range</option>
//             <option value="1">$</option>
//             <option value="2">$$</option>
//             <option value="3">$$$</option>
//             <option value="4">$$$$</option>
//             <option value="5">$$$$$</option>
//           </select>
//         </div>

//         <button type="submit" className="btn btn-primary mt-3">
//           Update
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdatePage;
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RestaurantFinder from "../api/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantContext";

const UpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("1");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await RestaurantFinder.get(`/${id}`);
        const r = res?.data?.data?.restaurant ?? res?.data?.data?.resta;
        if (r) {
          setName(r.name);
          setLocation(r.location);
          setPriceRange(String(r.price_range ?? r.priceRange ?? 1));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await RestaurantFinder.put(`/${id}`, {
        name,
        location,
        price_range: parseInt(priceRange, 10),
      });
      const updated = res?.data?.data?.restaurant ?? res?.data?.data?.resta;
      // update local context for instant UI update
      setRestaurants((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      navigate("/");
    } catch (err) {
      console.error("update error:", err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Update Restaurant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-gray-600 block">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 block">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 block">Price Range</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>

        <div className="text-right">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePage;
