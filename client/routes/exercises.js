const router = require("express").Router();
let Exercise = require("../models/exercise.model");

//GET req
router.route("/").get((req, res) => {
  //Find all exercises from db and return as json
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json("Error:" + err));
});

//POST req
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const isOutdoor = req.body.isOutdoor;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    isOutdoor,
    duration,
    date
  });

  //New exercise save to db
  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

//GET req to display for each id
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error: " + err));
});

//Delete req for each id
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});

//POST req to update for each id
router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id).then(exercise => {
    exercise.username = req.body.username;
    exercise.description = req.body.description;
    exercise.isOutdoor = req.body.isOutdoor;
    exercise.duration = Number(req.body.duration);
    exercise.date = Date.parse(req.body.date);

    exercise
      .save()
      .then(() => res.json("Exercise updated"))
      .catch(err => res.status(400).json("Error: " + err));
  });
});

module.exports = router;
