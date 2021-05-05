const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
	ClassJobCategoryTargetID: Number,
	EquipSlotCategoryTargetID: Number,
	ID: Number,
	Icon: String,
	Name_en: String,
	status: Number,
	LevelItem: Number,
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
