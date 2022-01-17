import { alertOn, alertOff } from '../storeConstants';

export const alertReducer = (state = { alert: false }, action) => {
	switch (action.type) {
		case alertOn:
			return { alert: true };
		case alertOff:
			return {
				alert: false,
			};
		default:
			return state;
	}
};
