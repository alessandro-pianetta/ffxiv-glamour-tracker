import axios from "axios";
import * as types from "./types";
import { actionCreator, asyncActionCreator } from "../actionCreatorBase";
import { setCookie, eraseCookie } from "../../utils/cookieUtils";
import { getUser, reset } from "../root/actions";
const DB_URL = "http://localhost:4000/auth";
const config = {
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
	},
};

export function registerOrAuthenticateUser(path, userInfo) {
	return asyncActionCreator({
		types,
		baseType: "USER_AUTH",
		callback: async (dispatch) => {
			const response = await axios.post(`${DB_URL}/${path}`, userInfo, config);
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
