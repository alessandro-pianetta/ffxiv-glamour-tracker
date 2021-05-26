import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import dungeonReducer from "./dungeon/reducer";
import authReducer from "./auth/reducer";
import notificationReducer from "./notification/reducer";

const configureStore = (initialState = undefined) => {
	const middleware = [thunkMiddleware];
	const middlewareEnhancer = applyMiddleware(...middleware);
	const enhancers = [middlewareEnhancer];
	const composedEnhancers = composeWithDevTools(...enhancers);
	const reducers = combineReducers({
		dungeon: dungeonReducer,
		auth: authReducer,
		alerts: notificationReducer,
	});

	const store = createStore(reducers, initialState, composedEnhancers);

	return store;
};

export default configureStore;
