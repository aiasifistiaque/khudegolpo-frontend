import axios from 'axios';
import { api } from '../../constants';

const getFriendRequest = 'GET_FRIEND_REQUEST';
const getFriendSuccess = 'GET_FRIEND_SUCCESS';
const getFriendFail = 'GET_FRIEND_FAIL';

export const friendReducer = (state = { loading: true, status: 9 }, action) => {
	switch (action.type) {
		case getFriendRequest:
			return {
				status: 6,
				loading: true,
				...state,
				follow: 3,
				success: false,
			};
		case getFriendSuccess:
			return {
				loading: false,
				user: action.payload.doc,
				books: action.payload.books,
				follow: action.payload.follow,
				status: 1,
				success: true,
			};
		case getFriendFail:
			return {
				loading: false,
				error: action.payload,
				status: 0,
			};

		default:
			return state;
	}
};

export const getFriendAction = id => async (dispatch, getState) => {
	try {
		const { token } = getState().auth;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};
		dispatch({ type: getFriendRequest });
		const { data } = await axios.get(`${api.server}/user/${id}`, config);

		dispatch({ type: getFriendSuccess, payload: data });
	} catch (error) {
		dispatch({
			type: getFriendFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};
