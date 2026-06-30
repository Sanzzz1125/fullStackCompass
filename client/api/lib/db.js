const mongoose = require('mongoose');
let cached = global._mongoose || (global._mongoose = { conn: null, promise: null });
module.exports = async function connectDB() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) cached.promise = mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
    return (cached.conn = await cached.promise);
};
