import React from "react";
import configureStore from "./redux/store";
import { Provider } from "react-redux";
import "./App.css";
import Main from "./pages/main";

const store = configureStore();

function App() {
	return (
		<Provider store={store}>
			<Main />
		</Provider>
	);
}

export default App;
