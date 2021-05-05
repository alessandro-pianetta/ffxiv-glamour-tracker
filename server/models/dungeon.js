const mongoose = require("mongoose");
const Gearset = require("./gearset.js");
const { Schema } = mongoose;

const dungeonSchema = new Schema({
	dungeonName: String,
	gearsets: Gearset.schema,
});

const Dungeon = mongoose.model("Dungeon", dungeonSchema);

module.exports = Dungeon;
