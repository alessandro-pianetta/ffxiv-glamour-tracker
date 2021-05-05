import produce from "immer";
import { dungeonAlreadyExists } from "../../utils/dungeonUtils";
import { getItemJob } from "../../utils/itemUtils";

import * as types from "./types";

const INITIAL_STATE = {
	userID: "",
	email: "",
	dungeons: [],
	loading: false,
	error: "",
	message: "",
};

export default (state = INITIAL_STATE, { type, payload }) => {
	return produce(state, (draft) => {
		switch (type) {
			case types.GET_USER_START:
				draft.error = "";
				draft.loading = true;
				break;

			case types.GET_USER_SUCCESS:
				draft.userID = payload._id;
				draft.email = payload.email;
				draft.dungeons = payload.dungeons;
				draft.loading = false;
				break;

			case types.GET_USER_FAIL:
				draft.loading = false;
				draft.error = payload;
				break;

			case types.ADD_DUNGEON_START:
				draft.error = "";
				draft.message = "";
				draft.loading = true;
				draft.dungeons.push({ loading: true });
				break;

			case types.ADD_DUNGEON_SUCCESS:
				if (!dungeonAlreadyExists(state.dungeons, payload.dungeonName)) {
					draft.dungeons[state.dungeons.length - 1] = {
						...payload,
						loading: false,
					};
					draft.message = `${payload.dungeonName} has been successfully added to your list!`;
				} else {
					draft.error = `${payload.dungeonName} has already been added to your list.`;
				}
				draft.loading = false;
				console.log(payload);

				break;

			case types.ADD_DUNGEON_FAIL:
				draft.loading = false;
				draft.dungeons.pop();
				draft.error = payload;
				break;

			case types.REMOVE_DUNGEON_START:
				draft.error = "";
				draft.message = "";
				draft.loading = true;
				break;

			case types.REMOVE_DUNGEON_SUCCESS:
				const indexToRemove = state.dungeons.findIndex(
					(gearset) => gearset._id === payload
				);
				draft.dungeons.splice(indexToRemove, 1);
				draft.loading = false;
				break;

			case types.REMOVE_DUNGEON_FAIL:
				draft.loading = false;
				draft.error = payload;
				break;

			case types.CHANGE_ITEM_STATUS_START:
				draft.error = "";
				draft.message = "";
				draft.loading = true;
				break;

			case types.CHANGE_ITEM_STATUS_SUCCESS:
				const { item, dungeonName } = payload;
				const dungeonIndex = state.dungeons.findIndex(
					(dungeon) => dungeon.dungeonName === dungeonName
				);
				const itemJob = getItemJob(item);
				const itemIndex = state.dungeons[dungeonIndex].gearsets[
					itemJob
				].findIndex(({ ID }) => ID === item.ID);
				draft.dungeons[dungeonIndex].gearsets[itemJob][itemIndex] = item;
				draft.loading = false;
				break;

			case types.CHANGE_ITEM_STATUS_FAIL:
				draft.loading = false;
				draft.error = payload;
				break;

			case types.RESET_STATE:
				draft.userID = "";
				draft.email = "";
				draft.dungeons = [];
				break;

			default:
				break;
		}
	});
};
