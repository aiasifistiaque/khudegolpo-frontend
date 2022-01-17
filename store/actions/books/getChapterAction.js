import axios from 'axios';
import { api } from '../../../constants';
import {
	getChapterRequest,
	getChapterFail,
	getChapterSuccess,
} from '../../storeConstants';

const getChapterAction = id => async (dispatch, getState) => {
	try {
		const { token } = getState().auth;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};
		dispatch({ type: getChapterRequest });
		const { data } = await axios.get(`${api.chapter}/${id}`, config);

		dispatch({ type: getChapterSuccess, payload: data });
	} catch (error) {
		dispatch({
			type: getChapterFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};

export default getChapterAction;
