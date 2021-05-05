export const updateItemStatus = (item) => {
	let status = item.status;
	status >= 2 ? (status = 0) : status++;
	return { ...item, status };
};

export const getItemJob = ({ ClassJobCategoryTargetID }) => {
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
			return "fending/maiming";
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
};
