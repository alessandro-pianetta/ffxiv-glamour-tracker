const mongoose = require("mongoose");
const User = require("./user.js");
const Dungeon = require("./dungeon.js");
const Item = require("./item.js");

const connectDb = () => {
	try {
		return mongoose.connect("mongodb://localhost:27017/ffxiv-glamour-tracker", {
			useNewUrlParser: true,
		});
	} catch (error) {
		console.warn(error);
	}
};

const models = { User, Dungeon, Item };

module.exports = { db: models, connectDb };
