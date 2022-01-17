import { logIn, logOut, tokenName } from '../storeConstants';

export const ISSERVER = typeof window === 'undefined';

const tokenFromStorage =
	!ISSERVER && localStorage.getItem(tokenName)
		? JSON.parse(localStorage.getItem(tokenName))
		: null;

const initialState =
	tokenFromStorage != null
		? { token: tokenFromStorage, loggedIn: true }
		: { token: null, loggedIn: false };

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case logIn:
			state.token = action.payload.token;
			state.loggedIn = true;
			return state;
		case logOut:
			state.token = null;
			state.loggedIn = false;
			return state;
		default:
			return state;
	}
};

export default authReducer;
