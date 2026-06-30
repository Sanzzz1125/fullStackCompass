const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅  MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌  MongoDB connection error: ${error.message}`);
    // Don't crash the server — app works without DB (progress won't persist)
    console.warn("⚠️   Running without database. Progress will not be saved.");
  }
};

module.exports = connectDB;
