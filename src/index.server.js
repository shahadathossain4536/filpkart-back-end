const express = require("express");
const env = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

env.config();

//routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");

// mongodb+srv://admin:<password>@cluster0.yam67.mongodb.net/?retryWrites=true&w=majority
// serverApi: ServerApiVersion.v1,
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yam67.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("database connected");
  });
app.use(bodyParser());
app.use("/api", authRoutes);
app.use("/api", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
