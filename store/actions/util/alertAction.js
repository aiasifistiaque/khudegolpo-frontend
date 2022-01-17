import { alertOn, alertOff } from '../../storeConstants';

export const alertOnAction = () => async (dispatch, getState) => {
	dispatch({
		type: alertOn,
	});
};

export const alertOffAction = () => async (dispatch, getState) => {
	dispatch({
		type: alertOff,
	});
};
