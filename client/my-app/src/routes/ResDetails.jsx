// import React, { useContext, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { RestaurantsContext } from "../context/RestaurantContext";
// import RestaurantFinder from "../api/RestaurantFinder";
// import StarRating from "../components/StarRating";
// import Reviews from "../components/Reviews";
// import AddReview from "../components/AddReview";

// const ResDetails = () => {
//   const { id } = useParams();
//   const { selectedRestaurant, setSelectedRestaurant } =
//     useContext(RestaurantsContext);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await RestaurantFinder.get(`/${id}`);
//         console.log("API Response:", response.data);
//         setSelectedRestaurant(response.data.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [id, setSelectedRestaurant]);

//   // ✅ wait for backend data
//   if (!selectedRestaurant || !selectedRestaurant.restaurant) {
//     return <h2 className="text-center mt-5">Loading...</h2>;
//   }

//   return (
//     <div>
//       <h1 className="text-center display-1">
//         {selectedRestaurant.restaurant.name}
//       </h1>

//       <div className="text-center">
//         <StarRating rating={selectedRestaurant.restaurant.average_rating} />
//         <span className="text-warning ml-1">
//           {selectedRestaurant.restaurant.review_count
//             ? `(${selectedRestaurant.restaurant.review_count})`
//             : "(0)"}
//         </span>
//       </div>

//       <div className="mt-3">
//         <Reviews reviews={selectedRestaurant.reviews} />
//       </div>

//       <AddReview />
//     </div>
//   );
// };

// export default ResDetails;
import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../api/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantContext";
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

const ResDetails = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await RestaurantFinder.get(`/${id}`);
        // your backend returns { restaurant, reviews } on this route
        const payload = res?.data?.data ?? {};
        setSelectedRestaurant(payload);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id, setSelectedRestaurant]);

  if (!selectedRestaurant || !selectedRestaurant.restaurant) {
    return <div className="text-center py-12">Loading...</div>;
  }

  const r = selectedRestaurant.restaurant;
  const reviews = selectedRestaurant.reviews ?? [];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold">{r.name}</h2>
          <p className="text-sm text-gray-500">{r.location}</p>
          <div className="mt-3 flex items-center gap-4">
            <StarRating rating={Number(r.average_rating ?? 0)} />
            <span className="text-sm text-gray-500">
              ({r.review_count ?? 0})
            </span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-400">
              Price: {"$".repeat(r.price_range)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium">Reviews</h3>
        <Reviews reviews={reviews} />
      </div>

      <div className="mt-6">
        <AddReview />
      </div>
    </div>
  );
};

export default ResDetails;
