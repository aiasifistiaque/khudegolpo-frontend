import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { tokenName } from './storeConstants';

export const ISSERVER = typeof window === 'undefined';

const tokenFromStorage =
	!ISSERVER && localStorage.getItem(tokenName)
		? JSON.parse(localStorage.getItem(tokenName))
		: null;

const loginState = {
	isLogged: false,
};

const initialState = {
	authState: {
		token: tokenFromStorage,
	},

	logInfo: loginState,
};

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
