var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      body: {
        type: String,
        default: ""
      },
      date: Date,
      userName: {
        type: String,
        default: ""
      }
    }
  ],
  userName: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("users", UserSchema);
