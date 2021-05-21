import axios from "axios";
import * as types from "./types";
import { actionCreator, asyncActionCreator } from "../actionCreatorBase";
import { getCookie, setCookie, eraseCookie } from "../../utils/cookieUtils";
import { setDungeons, reset } from "../dungeon/actions";
const DB_URL = "http://localhost:4000";
const config = {
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
	},
};
const userID = getCookie("userID");

export function getUser(id = userID) {
	return asyncActionCreator({
		types,
		baseType: "GET_USER",
		callback: async (dispatch) => {
			const response = await axios.get(
				`${DB_URL}/api/user/?userID=${id}`,
				config
			);
			const { data } = response;
			dispatch(setDungeons(data.dungeons));
			return { email: data.email, userID: data._id };
		},
	});
}

export function registerOrAuthenticateUser(path, userInfo) {
	return asyncActionCreator({
		types,
		baseType: "USER_AUTH",
		callback: async (dispatch) => {
			const response = await axios.post(
				`${DB_URL}/auth/${path}`,
				userInfo,
				config
			);
			const { status, data } = response;
			if (status === 200) {
				setCookie("userID", data.user._id, 7);
				setCookie("userSession", data.token, 7);
				dispatch(getUser(data.user._id));
			}
			return data;
		},
	});
}

export function logUserOut() {
	return actionCreator({
		types,
		baseType: "LOGOUT",
		callback: (dispatch) => {
			eraseCookie("userID");
			dispatch(reset());
			return;
		},
	});
}
