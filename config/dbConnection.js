const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const db = process.env.MONGO_URI;
        await mongoose.connect(db);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;