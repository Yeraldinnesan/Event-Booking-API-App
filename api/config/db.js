const mongoose = require("mongoose");
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB = process.env.MONGO_DB;

mongoose.set("strictQuery", false);
const connectDB = async () => {
  const conn = await mongoose.connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.gr7rjlm.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`
  );
};

module.exports = connectDB;
