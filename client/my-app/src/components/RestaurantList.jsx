// import React, { useEffect, useContext } from "react";
// import RestaurantFinder from "../api/RestaurantFinder";
// import { RestaurantsContext } from "../context/RestaurantContext";
// import { useNavigate } from "react-router-dom";
// import StarRating from "./StarRating";

// const RestaurantList = () => {
//   const { restaurants, setRestaurants } = useContext(RestaurantsContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await RestaurantFinder.get("/");
//         setRestaurants(response.data.data.resta);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, [setRestaurants]);

//   const handleDelete = async (e, id) => {
//     e.stopPropagation();
//     try {
//       await RestaurantFinder.delete(`/${id}`);
//       setRestaurants(restaurants.filter((r) => r.id !== id));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleUpdate = (e, id) => {
//     e.stopPropagation();
//     navigate(`/Restaurants/${id}/update`);
//   };

//   const handleRestaurantSelect = (id) => {
//     navigate(`/Restaurants/${id}`);
//   };

//   const renderRating = (restaurant) => {
//     if (!restaurant.count) {
//       return <span className="text-gray-400 text-sm">(0 reviews)</span>;
//     }
//     return (
//       <div className="flex items-center space-x-1">
//         <StarRating rating={restaurant.average_rating} />
//         <span className="text-yellow-400 text-xs">({restaurant.count})</span>
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-6 mt-12">
//       <h2 className="text-3xl font-extrabold text-purple-800 mb-8">
//         🍴 BiteBook Restaurants
//       </h2>

//       {/* Card Grid */}
//       <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {restaurants &&
//           restaurants.map((restaurant) => (
//             <div
//               key={restaurant.id}
//               onClick={() => handleRestaurantSelect(restaurant.id)}
//               className="bg-gradient-to-br from-purple-700 to-pink-600 rounded-2xl shadow-lg hover:scale-105 transition transform cursor-pointer text-white p-6 relative"
//             >
//               <h3 className="text-2xl font-bold mb-2">{restaurant.name}</h3>
//               <p className="text-purple-100 text-sm">{restaurant.location}</p>

//               <div className="mt-3 text-pink-100 font-semibold">
//                 {"$".repeat(restaurant.price_range)}
//               </div>

//               <div className="mt-3">{renderRating(restaurant)}</div>

//               <div className="flex justify-between mt-6 space-x-3">
//                 <button
//                   onClick={(e) => handleUpdate(e, restaurant.id)}
//                   className="flex-1 px-3 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold transition"
//                 >
//                   Update
//                 </button>
//                 <button
//                   onClick={(e) => handleDelete(e, restaurant.id)}
//                   className="flex-1 px-3 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default RestaurantList;
import React, { useEffect, useContext } from "react";
import RestaurantFinder from "../api/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantContext";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.resta);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [setRestaurants]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await RestaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter((r) => r.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/Restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    navigate(`/Restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-gray-400 text-sm">(0 reviews)</span>;
    }
    return (
      <div className="flex items-center space-x-1">
        <StarRating rating={restaurant.average_rating} />
        <span className="text-yellow-400 text-xs">({restaurant.count})</span>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 mt-12">
      <h2 className="text-3xl font-extrabold text-purple-800 mb-8">
        🍴 BiteBook Restaurants
      </h2>

      {/* Card Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {restaurants &&
          restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() => handleRestaurantSelect(restaurant.id)}
              className="bg-gradient-to-br from-purple-700 to-pink-600 rounded-2xl shadow-lg hover:scale-105 transition transform cursor-pointer text-white p-6 relative"
            >
              <h3 className="text-2xl font-bold mb-2">{restaurant.name}</h3>
              <p className="text-purple-100 text-sm">{restaurant.location}</p>

              <div className="mt-3 text-pink-100 font-semibold">
                {"$".repeat(restaurant.price_range)}
              </div>

              <div className="mt-3">{renderRating(restaurant)}</div>

              <div className="flex justify-between mt-6 space-x-3">
                <button
                  onClick={(e) => handleUpdate(e, restaurant.id)}
                  className="flex-1 px-3 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold transition"
                >
                  Update
                </button>
                <button
                  onClick={(e) => handleDelete(e, restaurant.id)}
                  className="flex-1 px-3 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RestaurantList;
