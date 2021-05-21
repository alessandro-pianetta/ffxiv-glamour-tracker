import { setErrorMessage } from "./notification/actions";

export function asyncActionCreator({ types, baseType, callback }) {
	return async (dispatch) => {
		try {
			dispatch({
				type: types[`${baseType}_START`],
			});
			const payload = await callback(dispatch);
			return dispatch({
				type: types[`${baseType}_SUCCESS`],
				payload: payload,
			});
		} catch (error) {
			dispatch(setErrorMessage(error));
			return dispatch({
				type: types[`${baseType}_FAIL`],
			});
		}
	};
}

export function actionCreator({ types, baseType, callback }) {
	return (dispatch) => {
		try {
			dispatch({
				type: types[`${baseType}_START`],
			});
			const payload = callback(dispatch);
			return dispatch({
				type: types[`${baseType}_SUCCESS`],
				payload,
			});
		} catch (error) {
			dispatch(setErrorMessage(error));
			return dispatch({
				type: types[`${baseType}_FAIL`],
			});
		}
	};
}
