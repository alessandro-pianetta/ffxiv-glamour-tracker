const mongoose = require("mongoose");
const Dungeon = require("./dungeon.js");
const { Schema } = mongoose;

// const userSchema = new Schema({
//   email: String,
//   password: String,
//   dungeons: [Dungeon.schema],
// });

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	dungeons: [Dungeon.schema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
