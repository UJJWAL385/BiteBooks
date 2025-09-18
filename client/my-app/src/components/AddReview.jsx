// import React, { useState } from "react";
// import RestaurantFinder from "../api/RestaurantFinder";
// import { useLocation, useParams } from "react-router-dom";

// const AddReview = () => {
//   const { id } = useParams();
//   console.log(id);

//   const [name, setName] = useState("");
//   const [reviewText, setReviewText] = useState("");
//   const [rating, setRating] = useState("Rating");

//   const handleSubmitReview = async (e) => {
//     e.preventDefault();
//     const response = await RestaurantFinder.post(`/${id}/addReview`, {
//       name,
//       review: reviewText,
//       rating,
//     });
//     window.location.reload();
//     console.log(response);
//   };

//   return (
//     <div className="mb-2 ">
//       <form action="">
//         <div className="from-row">
//           <div className="form-group col-8">
//             <label htmlFor="name">Name</label>
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               id="name"
//               placeholder="name"
//               type="text"
//               className="form-control"
//             />
//           </div>
//           <div className="form-group col-4">
//             <label htmlFor="rating">Rating</label>
//             <select
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//               id="rating"
//               className="custom-select"
//             >
//               <option dsiabled>Rating</option>
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4">4</option>
//               <option value="5">5</option>
//             </select>
//           </div>
//         </div>

//         <div className="from-group ">
//           <label htmlFor="Review">Review</label>
//           <textarea
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//             id="Review"
//             className="from-control"
//             placeholder="Write your review here"
//           ></textarea>
//         </div>

//         <button
//           onClick={handleSubmitReview}
//           type="submit"
//           className="btn btn-primary"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddReview;

import React, { useState } from "react";
import RestaurantFinder from "../api/RestaurantFinder";
import { useParams } from "react-router-dom";

const AddReview = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating: parseInt(rating, 10),
      });
      // simple approach: reload detail page to refetch
      window.location.reload();
    } catch (err) {
      console.error("add review error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="border rounded p-2"
          required
        />
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
          className="border rounded p-2"
        >
          <option value="">Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>

      <div className="mt-3">
        <textarea
          placeholder="Write review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full border rounded p-2 min-h-[90px]"
          required
        />
      </div>
    </form>
  );
};

export default AddReview;
