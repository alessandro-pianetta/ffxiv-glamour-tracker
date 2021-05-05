import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./root/reducer";
import authReducer from "./auth/reducer";

const configureStore = (initialState = undefined) => {
	const middleware = [thunkMiddleware];
	const middlewareEnhancer = applyMiddleware(...middleware);
	const enhancers = [middlewareEnhancer];
	const composedEnhancers = composeWithDevTools(...enhancers);
	const reducers = combineReducers({
		root: rootReducer,
		auth: authReducer,
	});

	const store = createStore(reducers, initialState, composedEnhancers);

	return store;
};

export default configureStore;
