import axios from "axios";
import * as types from "./types";
import { asyncActionCreator } from "../actionCreatorBase";
import { updateItemStatus } from "../../utils/itemUtils";
import { getCookie } from "../../utils/cookieUtils";

const DB_URL = "http://localhost:4000/api";
const userID = getCookie("userID");
const config = {
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
	},
};

export function getUser(id = userID) {
	return asyncActionCreator({
		types,
		baseType: "GET_USER",
		callback: async () => {
			const response = await axios.get(`${DB_URL}/user/?userID=${id}`, config);
			return response.data;
		},
	});
}

export function addDungeon(dungeonName, gearsetInfo, expansion) {
	return asyncActionCreator({
		types,
		baseType: "ADD_DUNGEON",
		callback: async () => {
			const response = await axios.post(
				`${DB_URL}/dungeon`,
				{
					dungeonName,
					gearsetInfo,
					userID,
				},
				config
			);
			console.log(response);
			return { ...response.data, expansion };
		},
	});
}

export function removeDungeon(dungeonID) {
	return asyncActionCreator({
		types,
		baseType: "REMOVE_DUNGEON",
		callback: async () => {
			const response = await axios.delete(
				`${DB_URL}/dungeon?userID=${userID}&dungeonID=${dungeonID}`,
				{
					dungeonID,
					userID,
				},
				config
			);
			if ((response.status = 200)) {
				return dungeonID;
			} else {
				throw response.data;
			}
		},
	});
}

export function changeItemStatus(item, dungeonName, gearsetType, dungeonID) {
	return asyncActionCreator({
		types,
		baseType: "CHANGE_ITEM_STATUS",
		callback: async () => {
			const updatedItem = updateItemStatus(item);
			const response = await axios.patch(`${DB_URL}/item`, {
				item: updatedItem,
				dungeonName,
				dungeonID,
				gearsetType,
				userID,
			});
			if ((response.status = 200)) {
				return { item: updatedItem, dungeonName };
			} else {
				throw response.data;
			}
		},
	});
}

export function reset() {
	return { type: types.RESET_STATE };
}
