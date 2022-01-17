import { api } from '../../../constants';
import axios from 'axios';
import getProfileAction from './getProfileAction';

/**Edit profile */
export const editProfileRequest = 'EDIT_PROFILE_REQUEST';
export const editProfileSuccess = 'EDIT_PROFILE_SUCCESS';
export const editProfileFail = 'EDIT_PROFILE_FAIL';

export const editProfileReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case editProfileRequest:
			return { loading: true };
		case editProfileSuccess:
			return {
				loading: false,
				success: true,
				doc: action.payload,
			};
		case editProfileFail:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export const editProfileAction = update => async (dispatch, getState) => {
	const { token } = getState().auth;

	try {
		dispatch({ type: editProfileRequest });

		const config = {
			headers: { 'Content-Type': 'application/json', authorization: token },
		};

		console.log(update);

		const { data } = await axios.put(`${api.profile}/update`, update, config);

		dispatch({ type: editProfileSuccess, payload: data.doc });
		dispatch(getProfileAction());
	} catch (error) {
		console.log(error.response.data);
		dispatch({
			type: editProfileFail,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
