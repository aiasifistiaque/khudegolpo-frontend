import axios from 'axios';
import { api } from '../../constants';

const getNotificationRequest = 'GET_NOTIFICATION_REQUEST';
const getNotificatioSuccess = 'GET_NOTIFICATION_SUCCESS';
const getNotificatioFail = 'GET_NOTIFICATION_FAIL';

export const notificationReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case getNotificationRequest:
			return {
				loading: true,
			};
		case getNotificatioSuccess:
			return {
				loading: false,
				success: true,
				notifications: action.payload.doc,
				count: action.payload.count,
				page: action.payload.page,
				pages: action.payload.pages,
			};
		case getNotificatioFail:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export const getNotificationsAction = query => async (dispatch, getState) => {
	try {
		const { token } = getState().auth;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};
		dispatch({ type: getNotificationRequest });
		const { data } = await axios.get(
			`${api.server}/notifications?${query}`,
			config
		);

		dispatch({ type: getNotificatioSuccess, payload: data });
	} catch (error) {
		dispatch({
			type: getNotificatioFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};
