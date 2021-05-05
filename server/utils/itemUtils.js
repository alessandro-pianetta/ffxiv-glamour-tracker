function removeUnwantedItems(dungeon, items) {
	const cleanedData = [];
	items.forEach((item) => {
		if (typeof dungeon.gearsetName === "string") {
			cleanedData.push(item);
		} else {
			dungeon.gearsetName.forEach((name) => {
				const itemName = item.Name_en.toLowerCase();
				if (itemName.includes(name)) {
					cleanedData.push(item);
					return;
				}
			});
		}
	});
	return cleanedData;
}

// function updateItemStatus(item) {
//   if (typeof item.status !== "number" || item.status > 2) {
//     return { ...item, status: undefined };
//   }

//   let status = item.status;
//   status >= 2 ? (status = 0) : status++;
//   return { ...item, status };
// }

function getItemJob({ ClassJobCategoryTargetID }) {
	switch (ClassJobCategoryTargetID) {
		case 30: {
			return "disciples of war";
		}
		case 31: {
			return "disciples of magic";
		}
		case 47: {
			return "maiming";
		}
		case 59: {
			return "fending";
		}
		case 60: {
			return "fending / maiming";
		}
		case 63: {
			return "casting";
		}
		case 64: {
			return "healing";
		}
		case 65: {
			return "striking";
		}
		case 66: {
			return "aiming";
		}
		case 103: {
			return "scouting";
		}
		default: {
			break;
		}
	}
}

function categorizeByGearset(response) {
	const categorizedEquipment = {};
	response.forEach((item) => {
		const job = getItemJob(item);
		if (job) {
			categorizedEquipment[job]
				? categorizedEquipment[job].push({ ...item, status: 0 })
				: (categorizedEquipment[job] = [{ ...item, status: 0 }]);
		}
	});
	return categorizedEquipment;
}

module.exports = { categorizeByGearset, removeUnwantedItems };
