const express = require("express");
const fetch = require("node-fetch");
const { db } = require("../models/index.js");
const generateGearsetRequest = require("../utils/generateGearsetRequest.js");
const {
	categorizeByGearset,
	removeUnwantedItems,
} = require("../utils/itemUtils.js");

const router = express.Router();

/* GET users listing. */
// router.get("/users", function (req, res) {
// 	try {
// 		db.User.find({}, (err, users) => {
// 			if (err) {
// 				res.status(500).json({ error: err.message });
// 			} else {
// 				return res.json({ msg: "Sanity check!", users });
// 			}
// 		});
// 	} catch (error) {
// 		console.warn(error);
// 	}
// });

router.get("/user", async function (req, res) {
	try {
		const { userID } = req.query;

		// Check if user exists
		const user = await db.User.findById(userID);
		if (!user) {
			res.statusMessage =
				"Sorry, that user doesn't exist. Please try signing up.";

			return res.status(404).end();
		}
		return res.status(200).send(user);
	} catch (error) {
		console.warn(error);
	}
});

/***********************/
/* Add DUNGEON to USER */
/***********************/

router.post("/dungeon", async function (req, res) {
	try {
		const { userID, dungeonName, gearsetInfo } = req.body;
		// creates API request for XIVAPI Elastic Search and sends request
		const response = await fetch("https://xivapi.com/search", {
			method: "POST",
			body: generateGearsetRequest(gearsetInfo),
		});
		const content = await response.json();
		if (!content || !content.Results.length) {
			res.statusMessage = "Sorry, did not receive any results.";
			return res.status(204).end();
		}
		// removes unwanted items that make it through params set in XIVAPI query and categorizes based on gearset names
		const dungeon = {
			dungeonName,
			gearsets: categorizeByGearset(
				removeUnwantedItems(gearsetInfo, content.Results)
			),
		};

		// Returns item without saving if not logged in
		if (!userID) {
			return res.status(200).send(dungeon);
		}

		// Check if user exists
		const user = await db.User.findById(userID);
		if (!user) {
			res.statusMessage =
				"Sorry, that user doesn't exist. Please try signing up.";
			return res.status(404).end();
		}

		// Check if user already has target dungeon, and if not save dungeon to user
		const newDungeon = new db.Dungeon(dungeon);
		newDungeon;
		const dungeonDoesExist = user.dungeons.find(
			(existingDungeon) => existingDungeon.dungeonName === dungeonName
		);
		if (dungeonDoesExist) {
			res.statusMessage = `${dungeonName} has already been added to your list!`;
			return res.status(304).end();
		}
		user.dungeons.push(newDungeon);
		user.save();

		return res.status(200).json(newDungeon);
	} catch (error) {
		console.warn(error);
	}
});

/****************************/
/* Delete DUNGEON from USER */
/****************************/

router.delete("/dungeon", async function (req, res) {
	try {
		const { userID, dungeonID } = req.query;

		// Check if user exists
		const user = await db.User.findById(userID);
		if (!user) {
			res.statusMessage =
				"Sorry, that user doesn't exist. Please try signing up.";
			return res.status(404).end();
		}

		// Check if dungeon exists in user object
		const dungeonDoesExist = user.dungeons.find(
			(existingDungeon) => existingDungeon.id === dungeonID
		);
		if (!dungeonDoesExist) {
			res.statusMessage =
				"Sorry, that dungeon could not be found. Please try again, or contact the administrator if you are still having problems.";

			return res.status(304).end();
		}

		// Find and remove dungeon from user
		const dungeon = user.dungeons.id(dungeonID);
		dungeon.remove();
		user.save();

		return res.status(200).send("Dungeon removed.");
	} catch (error) {
		console.warn(error);
	}
});

/*************************/
/* Change status of ITEM */
/*************************/

router.patch("/item", async function (req, res) {
	try {
		const { userID, dungeonID, gearsetType, itemID, item } = req.body;
		// Check if user exists
		const user = await db.User.findById(userID);
		if (!user) {
			res.statusMessage =
				"Sorry, that user doesn't exist. Please try signing up.";
			return res.status(404).end();
		}

		// Check if dungeon exists in user object
		const dungeonDoesExist = user.dungeons.find(
			(existingDungeon) => existingDungeon.id === dungeonID
		);
		if (!dungeonDoesExist) {
			res.statusMessage =
				"Sorry, that dungeon could not be found. Please try again, or contact the administrator if you are still having problems.";

			return res.status(304).end();
		}

		let targetItem = user.dungeons
			.id(dungeonID)
			.gearsets[gearsetType].id(item._id);
		targetItem.status = item.status;
		user.save();

		return res
			.status(200)
			.send(`Status of ${item.Name_en} successfully updated.`);
	} catch (error) {
		console.warn(error);
	}
});

/****************************/
/* Change status of GEARSET */
/****************************/

// router.patch("/gearset", async function (req, res) {
// 	try {
// 		const { userID, dungeonID, gearsetType } = req.body;

// 		// Check if user exists
// 		const user = await db.User.findById(userID);
// 		if (!user) {
// 			return res.status(400).send("User cannot be found.");
// 		}

// 		// Check if dungeon exists in user object
// 		const dungeonDoesExist = user.dungeons.find(
// 			(existingDungeon) => existingDungeon.id === dungeonID
// 		);
// 		if (!dungeonDoesExist) {
// 			return res.status(400).send("Dungeon does not exist on user.");
// 		}

// 		// Iterate through each item in gearset to change status between do not have, want, and have
// 		let items = user.dungeons.id(dungeonID).gearsets[gearsetType];
// 		items.forEach((item) => {
// 			if (!item.status) {
// 				item.status = 1;
// 			} else if (item.status === 1) {
// 				item.status = 0;
// 			}
// 		});
// 		user.save();

// 		return res
// 			.status(200)
// 			.send(`Status of ${gearsetType} gearset items successfully updated.`);
// 	} catch (error) {
// 		console.warn(error);
// 	}
// });

module.exports = router;
