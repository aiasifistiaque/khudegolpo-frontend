import { api } from '../../../constants';
import axios from 'axios';
import {
	getFollowersRequest,
	getFollowersSuccess,
	getFollowersFail,
} from '../../storeConstants';

const getFollowersAction = () => async (dispatch, getState) => {
	const { token } = getState().auth;

	console.log(token);

	try {
		dispatch({ type: getFollowersRequest });

		const config = {
			headers: { 'Content-Type': 'application/json', authorization: token },
		};

		const { data } = await axios.get(`${api.follow}?sort=newest`, config);

		console.log(data);

		dispatch({ type: getFollowersSuccess, payload: data });
	} catch (error) {
		console.log(error.response.data);
		dispatch({
			type: getFollowersFail,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export default getFollowersAction;
