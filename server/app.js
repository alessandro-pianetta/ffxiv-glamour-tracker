const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const apiRouter = require("./routes/api");
const authRouter = require("./routes/auth");

const app = express();
const corsOptions = {
	origin: "http://localhost:3000",
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

// mount our api router here
app.use("/api", apiRouter);
app.use("/auth", authRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
	console.log("req.path", req.path);
	res.sendFile(path.join(__dirname + "../client/build/index.html"));
});

module.exports = app;
