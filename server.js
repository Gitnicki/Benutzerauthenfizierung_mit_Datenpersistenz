const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./db");
const userRoutes = require("./routes/user");

connectDB();

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb+srv://nicolerichter:jSzxrvBf0KolV5LM@cluster0.q5fb26a.mongodb.net/" }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));