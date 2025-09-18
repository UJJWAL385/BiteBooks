// import React from "react";

// const StarRating = ({ rating }) => {
//   // rating =4
//   const stars = [];
//   for (let i = 1; i <= 5; i++) {
//     if (i <= rating) {
//       stars.push(<i key={i} className="fa-solid fa-star"></i>);
//     } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
//       stars.push(<i key={i} className="fa-regular fa-star-half-stroke"></i>);
//     } else {
//       stars.push(<i key={i} className="fa-regular fa-star"></i>);
//     }
//   }

//   return <>{stars}</>;
// };

// export default StarRating;
import React from "react";

/* Simple star rendering (supports fractional rating e.g. 3.5)
   Uses inline SVG (no external icon lib required).
*/
const Star = ({ filled }) => (
  <svg
    className="w-4 h-4 inline-block"
    viewBox="0 0 20 20"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 1.5l2.6 5.3 5.8.8-4.2 4 1 5.7L10 14.8 4.8 17.3l1-5.7-4.2-4 5.8-.8L10 1.5z" />
  </svg>
);

const StarRating = ({ rating = 0, max = 5 }) => {
  // rating may be float: 3.6
  const rounded = Math.round((rating + Number.EPSILON) * 10) / 10; // e.g. 3.6
  const stars = [];
  for (let i = 1; i <= max; i++) {
    // show full star when i <= floor(rounded)
    const full = i <= Math.floor(rounded);
    // for half star we could render differently; we'll show partially filled look by CSS color
    stars.push(
      <span
        key={i}
        className={full ? "text-yellow-400" : "text-gray-300"}
        aria-hidden
      >
        <Star filled={full} />
      </span>
    );
  }

  return <div className="flex items-center space-x-1">{stars}</div>;
};

export default StarRating;
