import axios from "axios";
import * as types from "./types";
import { asyncActionCreator } from "../actionCreatorBase";
import { updateItemStatus } from "../../utils/itemUtils";
import { getCookie } from "../../utils/cookieUtils";
import { setSuccessMessage } from "../notification/actions";

const DB_URL = "http://localhost:4000/api";
const userID = getCookie("userID");
const config = {
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
	},
};

export function setDungeons(dungeons) {
	return {
		type: types.SET_DUNGEONS,
		payload: dungeons,
	};
}

export function addDungeon(dungeonName, gearsetInfo, expansion) {
	return asyncActionCreator({
		types,
		baseType: "ADD_DUNGEON",
		callback: async (dispatch) => {
			const response = await axios.post(
				`${DB_URL}/dungeon`,
				{
					dungeonName,
					gearsetInfo,
					userID,
				},
				config
			);

			if (response.status !== 200) {
				throw response.statusText;
			}

			dispatch(
				setSuccessMessage(`Success! Added ${dungeonName} to your list!`)
			);
			return { ...response.data, expansion };
		},
	});
}

export function removeDungeon(dungeonID) {
	return asyncActionCreator({
		types,
		baseType: "REMOVE_DUNGEON",
		callback: async (dispatch) => {
			const response = await axios.delete(
				`${DB_URL}/dungeon?userID=${userID}&dungeonID=${dungeonID}`,
				{
					dungeonID,
					userID,
				},
				config
			);

			if (response.status !== 200) {
				throw response.statusText;
			}

			dispatch(setSuccessMessage(`Dungeon Removed!`));
			return dungeonID;
		},
	});
}

export function changeItemStatus(item, dungeonName, gearsetType, dungeonID) {
	return asyncActionCreator({
		types,
		baseType: "CHANGE_ITEM_STATUS",
		callback: async (dispatch) => {
			const updatedItem = updateItemStatus(item);
			const response = await axios.patch(`${DB_URL}/item`, {
				item: updatedItem,
				dungeonName,
				dungeonID,
				gearsetType,
				userID,
			});

			console.log(item);

			if (response.status !== 200) {
				throw response.statusText;
			}

			dispatch(setSuccessMessage(`${item.Name_en} status updated!`));
			return { item: updatedItem, dungeonName };
		},
	});
}

export function reset() {
	return { type: types.RESET_STATE };
}
