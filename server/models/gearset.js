const mongoose = require("mongoose");
const Item = require("./item.js");
const { Schema } = mongoose;

const gearsetSchema = new Schema({
	fending: [Item.schema],
	maiming: [Item.schema],
	striking: [Item.schema],
	scouting: [Item.schema],
	aiming: [Item.schema],
	casting: [Item.schema],
	healing: [Item.schema],
	"disciples of war": [Item.schema],
	"disciples of magic": [Item.schema],
	"fending / maiming": [Item.schema],
});

const Gearset = mongoose.model("Gearset", gearsetSchema);

module.exports = Gearset;
