import * as types from "./types";

export function setSuccessMessage(payload) {
	return { type: types.SET_SUCCESS, payload };
}

export function setErrorMessage(payload) {
	return { type: types.SET_ERROR, payload };
}

export function removeNotification() {
	return { type: types.REMOVE_NOTIFICATION };
}
