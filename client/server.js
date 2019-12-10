const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDb database connection established successfully");
});

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

if (process.env.NODE_ENV === "production") {
  app.use("/exercises", exercisesRouter);
  app.use("/users", usersRouter);

  app.use(express.static(path.join(__dirname, "/build")));

  // app.get("/", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../build", "index.html"));
  // });

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});