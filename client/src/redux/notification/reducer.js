import * as types from "./types";
import produce from "immer";

const INITIAL_STATE = {
	successMsg: "",
	errorMsg: "",
};

export default (state = INITIAL_STATE, { type, payload }) =>
	produce(state, (draft) => {
		switch (type) {
			case types.SET_SUCCESS:
				draft.successMsg = payload;
				break;

			case types.SET_ERROR:
				draft.errorMsg = payload;
				break;

			case types.REMOVE_NOTIFICATION:
				draft.successMsg = "";
				draft.errorMsg = "";
				break;

			default:
				break;
		}
	});
