const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/authDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connection established');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

__esModule.exports = connectDB;