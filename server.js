const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgon = require("morgan");
const cors = require("cors");
const bodyParser = require('body-parser')
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoute");
const errorHandler = require("./middleware/errorHandlerMiddleware");

dotenv.config();
//==============database=================================================
connectDB();
const app = express();
//=======middleware======================================================
app.use(cors());
app.use(express.static("./image"));
app.use(express.json());
app.use(morgon("dev"));


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(errorHandler);
//=============routes=============
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

const port = process.env.PORT || 8080;

app.get("/rohit", (req, res) => {
  res.send("welcome to ecommerce app");
});

app.listen(port, () => {
  console.log(`Server Running on ${port}`.bgCyan.white);
});
