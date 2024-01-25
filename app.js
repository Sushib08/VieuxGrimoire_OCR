const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

mongoose
  .connect(process.env.DB_USER_PASS)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

// CORS Middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Middleware pour parser le corps des requêtes en JSON et en données de formulaire URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
const userRoutes = require("./routes/user");
app.use("/api/auth", userRoutes);

const booksRoutes = require("./routes/book");
app.use("/api/books", booksRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
