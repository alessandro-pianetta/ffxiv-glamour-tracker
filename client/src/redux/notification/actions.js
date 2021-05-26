import * as types from "./types";

export function setSuccessMessage(message) {
	return { type: types.SET_SUCCESS, payload: message };
}

export function setErrorMessage(message) {
	return { type: types.SET_ERROR, payload: message };
}

export function removeNotification(id) {
	console.log(id);
	return { type: types.REMOVE_NOTIFICATION, payload: id };
}
