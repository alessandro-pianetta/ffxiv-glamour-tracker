import * as types from "./types";
import produce from "immer";

const INITIAL_STATE = {
	alerts: [],
};

export default (state = INITIAL_STATE, { type, payload }) =>
	produce(state, (draft) => {
		switch (type) {
			case types.SET_SUCCESS:
				if (typeof payload === "string") {
					draft.alerts.push({
						type: "success",
						message: payload,
						id: Date.now(),
					});
				}
				break;

			case types.SET_ERROR:
				if (typeof payload === "string") {
					draft.alerts.push({
						type: "danger",
						message: payload,
						id: Date.now(),
					});
				}
				break;

			case types.REMOVE_NOTIFICATION:
				const alertIndex = state.alerts.findIndex(
					(alert) => alert.id === payload
				);
				draft.alerts.splice(alertIndex, 1);
				break;

			default:
				break;
		}
	});
