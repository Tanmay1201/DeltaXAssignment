const mongoose = require("mongoose");
url = "mongodb://127.0.0.1:27017";
mongoose.connect(url + "/AMusically");

var db = mongoose.connection;

db.on("error", console.log.bind(console, "connection error"));
db.once("open", function(callback) {
  console.log("Connection succeeded");
});

const Artists = mongoose.model(
  "Artists",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    month: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      require: true
    }
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

module.exports = { User, Artists, url };
