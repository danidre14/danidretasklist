const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const Tasks = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

module.exports = Mongoose.model("Tasks", Tasks);
