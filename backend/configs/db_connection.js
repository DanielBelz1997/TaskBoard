const mongoose = require("mongoose");

/**
 * this async function initializing the connection to the mongo db.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
