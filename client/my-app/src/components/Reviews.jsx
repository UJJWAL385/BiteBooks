// import React from "react";
// import StarRating from "./StarRating";

// const Reviews = ({ reviews }) => {
//   console.log(reviews); // Check what data is being passed

//   return (
//     <div className="row row-cols-3 mb-2">
//       {reviews.map((review) => {
//         return (
//           <div
//             key={review.id}
//             className="card text-white bg-primary mb-3 mr-4"
//             style={{ maxWidth: "30%" }}
//           >
//             <div className="card-header d-flex justify-content-between">
//               <span>{review.name}</span>
//               <span>
//                 <StarRating rating={review.rating} />
//               </span>
//             </div>

//             <div className="card-body">
//               <p className="card-text"> {review.review}</p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Reviews;
import React from "react";
import StarRating from "./StarRating";

const Reviews = ({ reviews = [] }) => {
  if (reviews.length === 0) {
    return <p className="text-sm text-gray-500 mt-3">No reviews yet.</p>;
  }

  return (
    <div className="space-y-4 mt-3">
      {reviews.map((rev) => (
        <div key={rev.id} className="border rounded p-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{rev.name}</h4>
              <p className="text-sm text-gray-500">
                {new Date(
                  rev.created_at || rev.createdat || Date.now()
                ).toLocaleString()}
              </p>
            </div>
            <div>
              <StarRating rating={rev.rating} />
            </div>
          </div>
          <p className="mt-2 text-sm">{rev.review}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
