import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/Restaurants", // <--- change port if needed
  headers: {
    "Content-Type": "application/json",
  },
});
