export function asyncActionCreator({ types, baseType, callback }) {
	return async (dispatch) => {
		try {
			dispatch({
				type: types[`${baseType}_START`],
			});
			const payload = await callback(dispatch);
			// if (payload.status === 200) {
			return dispatch({
				type: types[`${baseType}_SUCCESS`],
				payload,
			});
			// }
		} catch (error) {
			console.log(error);
			return {
				type: types[`${baseType}_FAIL`],
				payload: error,
			};
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
			return {
				type: types[`${baseType}_FAIL`],
				payload: error,
			};
		}
	};
}
