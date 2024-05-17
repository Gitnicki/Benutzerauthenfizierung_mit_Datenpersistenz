const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const userRoutes = require('./routes/user');

const app = express();
require('./db')();


mongoose.connect('mongodb://localhost:27017/authDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

app.use(
    session({
        secret: "8eee85cc4e4d23f2155c5baae5b74e2c92a76483ce3526af94590e8ff51d8ce4",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/authDB" }),
        cookie: { maxAge: 1000 * 60 * 60 * 24} // 1 Day
    })
);

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
