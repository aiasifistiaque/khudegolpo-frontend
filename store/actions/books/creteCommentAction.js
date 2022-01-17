import { api } from '../../../constants';
import axios from 'axios';
import {
	tokenName,
	createBookRequest,
	createBookSuccess,
	createBookFail,
	getCommentsRequest,
} from '../../storeConstants';

const createCommentAction = comment => async (dispatch, getState) => {
	try {
		dispatch({
			type: getCommentsRequest,
		});

		const token = JSON.parse(localStorage.getItem(tokenName));
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};

		const { data } = await axios.post(api.comments, comment, config);

		dispatch({
			type: createBookSuccess,
			payload: data.doc,
		});
	} catch (error) {
		dispatch({
			type: createBookFail,
			payload:
				error.response && error.response.data && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export default createCommentAction;
