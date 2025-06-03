const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();
const authRouter = require("./routes/auth/auth-routes")
const adminProductsRouter = require("./routes/admin/product-routes")
const ShopProductsRouter = require('./routes/shop/products-routes')
const shopCartRouter = require("./routes/shop/cart-routes")
console.log("DB_URL:", process.env.DB_URL);

mongoose.connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));


const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter)
app.use("/api/shop/products", ShopProductsRouter)
app.use("/api/shop/cart", shopCartRouter)

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
