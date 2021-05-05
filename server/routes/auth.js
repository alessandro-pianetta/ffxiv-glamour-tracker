const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { db } = require("../models/index.js");

/* Register user */
router.post("/signup", async function (req, res) {
	try {
		const { email, password, passwordConfirm } = req.body;

		if (!email || !password || !passwordConfirm) {
			return res.status(400).json({ msg: "Not all fields have been entered." });
		}
		if (password.length < 5) {
			return res
				.status(400)
				.json({ msg: "The password needs to be at least 5 characters long." });
		}
		if (password !== passwordConfirm) {
			return res
				.status(400)
				.json({ msg: "Enter the same password twice for verification." });
		}
		const existingUser = await db.User.findOne({ email: email });
		if (existingUser) {
			return res
				.status(400)
				.json({ msg: "An account with this email already exists." });
		}

		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);
		const newUser = new db.User({
			email,
			password: passwordHash,
			dungeons: [],
		});
		const savedUser = await newUser.save();
		res.json(savedUser);
	} catch (error) {
		console.warn(error);
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password)
			return res.status(400).json({ msg: "Not all fields have been entered." });

		const user = await db.User.findOne({ email: email });
		if (!user)
			return res
				.status(400)
				.json({ msg: "No account with this email has been registered." });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

		const token = jwt.sign({ id: user._id }, "JWTSECRET");
		res.json({
			token,
			user,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;

// dev-0kgmm7mo.us.auth0.com
