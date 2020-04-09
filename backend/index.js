var express = require("express");

var app = express();
var cookieSession = require("cookie-session");
var bodyParser = require("body-parser");
var passport = require("passport");
var MongoClient = require("mongodb").MongoClient;
var { User, Artists, url } = require("../backend/dbConnection");
var cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.use(
  cookieSession({
    name: "mySession",
    keys: ["vueauthrandomkey"],
    maxAge: 24 * 60 * 60 * 1000
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.post("/register", function(req, res) {
  var userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  };
  User.create(userData, function(error, user) {
    if (error) {
      console.log(error);
    } else {
      console.log("Success!");
      return res.redirect("/");
    }
  });
});

app.post("/getSongsWithoutUsersRated", function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("AMusically");
    dbo
      .collection("ratings")
      .aggregate([
        { $sort: { allOverRating: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            localField: "name",
            from: "songs",
            foreignField: "name",
            as: "songInfo"
          }
        },
        { $unwind: "$songInfo" },
        {
          $project: {
            "songInfo.name": 1,
            "songInfo.releaseDate": 1,
            "songInfo.artists": 1
          }
        }
      ])
      .toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
        db.close;
      });
  });
});

app.post("/getSongsWithUsersRating", function(req, res) {
  var songName = req.body.songName;
  var songRating = req.body.songRating;
  var currentAverageRating;
  var currentNumberOfUsersRated;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("AMusically");
    dbo
      .collection("ratings")
      .find({ name: songName })
      .toArray()
      .then(result => {
        currentAverageRating = result[0].avgRating;
        currentNumberOfUsersRated = result[0].numberOfUsersRated;
        currentNumberOfUsersRated += 1;
        var answer =
          (currentNumberOfUsersRated * currentAverageRating + songRating) /
          currentNumberOfUsersRated;
        var setRate = answer / currentNumberOfUsersRated;
        console.log(setRate);
        dbo.collection("ratings").update(
          { name: songName },
          {
            $set: {
              avgRating: answer,
              numberOfUsersRated: currentNumberOfUsersRated,
              allOverRating: setRate
            }
          }
        );
      });
  });
});

app.post("/getArtistName", function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("AMusically");
    dbo
      .collection("Artists")
      .find({}, { projection: { _id: 0, name: 1 } })
      .toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
        db.close;
      });
  });
});

app.post("/login", function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  var data = {
    email: email,
    password: password
  };
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
