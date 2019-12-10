const router = require("express").Router();
let User = require("../models/user.model");

//GET req
router.route("/").get((req, res) => {
  //Mongoose method to get a list of all users from MongoDB Atlas db
  //Result return in json format
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

//POST req
router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  //New user save to db
  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
