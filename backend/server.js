const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = process.env.SERVER_PORT || 3000;
const app = express();
const userRoute = require("./routes/user.js");
const bookRoute = require("./routes/book.js");

// middlewares
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

// routes
app.use("/user", userRoute);
app.use("/book", bookRoute);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
