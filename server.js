// require("dotenv").config();

// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");

// mongoose
//   .connect(process.env.DATABASE_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(function (db) {
//     console.log("db is connected");
//   })
//   .catch(function (err) {
//     console.log(err);
//   });
// app.listen(3000, () => console.log("Server Started"));

require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const subscribersRouter = require("./routes/subscribers");
app.use("/subscribers", subscribersRouter);

app.listen(3000, () => console.log("Server Started"));
