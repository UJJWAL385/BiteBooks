import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import db from "./db/index.js";
import cors from "cors";

const port = process.env.PORT || 6000;
const app = express();
app.use(cors());
app.use(express.json());

// -------------------- ROUTES -------------------- //

// Get all restaurants with aggregated reviews
app.get("/Restaurants", async (req, res) => {
  try {
    const response = await db.query(`
      SELECT r.*, 
             COALESCE(rv.review_count, 0) AS review_count, 
             COALESCE(rv.average_rating, 0) AS average_rating
      FROM restaurants r
      LEFT JOIN (
        SELECT restaurant_id, COUNT(*) AS review_count, TRUNC(AVG(rating), 1) AS average_rating
        FROM reviews
        GROUP BY restaurant_id
      ) rv ON r.id = rv.restaurant_id;
    `);

    res.json({
      status: "success",
      data: { resta: response.rows },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


// Get single restaurant with reviews
// Get single restaurant with reviews
app.get("/Restaurants/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const resta = await db.query(
      `
      SELECT r.id, r.name, r.location, r.price_range,
             COALESCE(rv.review_count, 0) AS review_count, 
             COALESCE(rv.average_rating, 0) AS average_rating
      FROM restaurants r
      LEFT JOIN (
        SELECT restaurant_id, COUNT(*)::int AS review_count, 
               TRUNC(AVG(rating), 1)::float AS average_rating
        FROM reviews
        GROUP BY restaurant_id
      ) rv ON r.id = rv.restaurant_id
      WHERE r.id = $1;
      `,
      [id]
    );

    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1 ORDER BY id DESC",
      [id]
    );

    res.json({
      status: "success",
      data: {
        restaurant: resta.rows[0],   // 🔴 changed "resta" → "restaurant"
        reviews: reviews.rows,       // 🔴 changed "review" → "reviews"
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


// Create a Restaurant
app.post("/Restaurants", async (req, res) => {
  try {
    const { name, location, price_range } = req.body;

    const response = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
      [name, location, price_range]
    );

    res.json({
      status: "success",
      data: { resta: response.rows[0] },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Update Restaurant
app.put("/Restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: { restaurant: results.rows[0] },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// Delete Restaurant
app.delete("/Restaurants/:id", async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // First delete all reviews for that restaurant
    await db.query("DELETE FROM reviews WHERE restaurant_id = $1", [restaurantId]);

    // Then delete the restaurant
    await db.query("DELETE FROM restaurants WHERE id = $1", [restaurantId]);

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


// Add Review for Restaurant
app.post("/Restaurants/:id/addReview", async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.id, 10);

    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *;",
      [restaurantId, req.body.name, req.body.review, req.body.rating]
    );

    res.json({
      status: "success",
      data: { review: newReview.rows[0] },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// -------------------- START SERVER -------------------- //
app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
