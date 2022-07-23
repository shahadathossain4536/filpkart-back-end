const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();

//routers
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");

// mongodb+srv://admin:<password>@cluster0.yam67.mongodb.net/?retryWrites=true&w=majority

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yam67.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  });

app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running ${process.env.PORT}`);
});
