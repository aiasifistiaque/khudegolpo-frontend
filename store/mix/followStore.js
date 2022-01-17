import axios from 'axios';
import { api } from '../../constants';
import { getFriendAction } from './userStore';

const getFollowRequest = 'GET_FOLLOW_REQUEST';
const getFollowSuccess = 'GET_FOLLOW_SUCCESS';
const getFollowFail = 'GET_FOLLOW_FAIL';

export const followReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case getFollowRequest:
			return {
				loading: true,
			};
		case getFollowSuccess:
			return {
				loading: false,
				success: true,
			};
		case getFollowFail:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export const followAction = ({ id, username }) => async (
	dispatch,
	getState
) => {
	try {
		const { token } = getState().auth;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};
		dispatch({ type: getFollowRequest });
		const { data } = await axios.put(`${api.server}/follow/${id}`, {}, config);

		dispatch({ type: getFollowSuccess, payload: data });
		dispatch(getFriendAction(username));
	} catch (error) {
		dispatch({
			type: getFollowFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};

export const unFollowAction = ({ id, username }) => async (
	dispatch,
	getState
) => {
	try {
		const { token } = getState().auth;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};
		dispatch({ type: getFollowRequest });
		const { data } = await axios.delete(`${api.server}/follow/${id}`, config);

		dispatch({ type: getFollowSuccess, payload: data });
		dispatch(getFriendAction(username));
	} catch (error) {
		dispatch({
			type: getFollowFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};
