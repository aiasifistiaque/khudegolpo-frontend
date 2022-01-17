import { api } from '../../../constants';
import axios from 'axios';
import {
	getProfileRequest,
	getProfileSuccess,
	getProfileFail,
} from '../../storeConstants';

const getProfileAction = () => async (dispatch, getState) => {
	const { token } = getState().auth;

	try {
		dispatch({ type: getProfileRequest });

		const config = {
			headers: { 'Content-Type': 'application/json', authorization: token },
		};

		const { data } = await axios.get(api.profile, config);

		console.log(data);

		dispatch({ type: getProfileSuccess, payload: data.doc });
	} catch (error) {
		console.log(error.response.data);
		dispatch({
			type: getProfileFail,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export default getProfileAction;
