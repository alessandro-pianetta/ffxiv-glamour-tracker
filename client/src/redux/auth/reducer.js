import * as types from "./types";
import produce from "immer";

const INITIAL_STATE = {
	authenticated: false,
	loading: false,
	error: "",
};

export default (state = INITIAL_STATE, { type, payload }) =>
	produce(state, (draft) => {
		switch (type) {
			case types.USER_AUTH_START:
				draft.loading = true;
				break;

			case types.USER_AUTH_SUCCESS:
				draft.authenticated = true;
				draft.loading = false;
				break;

			case types.USER_AUTH_FAIL:
				draft.loading = false;
				draft.error = payload;
				break;

			case types.LOGOUT_START:
				draft.loading = true;
				break;

			case types.LOGOUT_SUCCESS:
				draft.authenticated = false;
				draft.loading = false;
				break;

			case types.LOGOUT_FAIL:
				draft.loading = false;
				draft.error = payload;
				break;

			default:
				break;
		}
	});
