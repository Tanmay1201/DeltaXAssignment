const mongoose = require("mongoose");
url = "mongodb://127.0.0.1:27017";
mongoose.connect(url + "/AMusically");

var db = mongoose.connection;

db.on("error", console.log.bind(console, "connection error"));
db.once("open", function(callback) {
  console.log("Connection succeeded");
});

const Ratings = mongoose.model(
  "ratings",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    avgRating: {
      type: Number,
      required: true
    },
    numberOfUsersRated: {
      type: Number,
      required: true
    },
    allOverRating: {
      type: Number,
      required: true
    }
  })
);

const Artists = mongoose.model(
  "Artists",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    date: {
      type: Date,
      required: true
    },
    bio: {
      type: String,
      require: true
    }
  })
);

const Songs = mongoose.model(
  "song",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50
    },

    releaseDate: {
      type: Date,
      required: true
    },

    Artists: Array
  })
);
const User = mongoose.model(
  "user",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    confirmPassword: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    }
  })
);

module.exports = { User, Artists, url, Songs, Ratings };
