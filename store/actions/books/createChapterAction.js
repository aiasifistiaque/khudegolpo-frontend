import { api } from '../../../constants';
import axios from 'axios';
import {
	tokenName,
	createChapterRequest,
	createChapterSuccess,
	createChapterFail,
} from '../../storeConstants';

const createChapterAction = chapter => async (dispatch, getState) => {
	try {
		dispatch({
			type: createChapterRequest,
		});

		const token = JSON.parse(localStorage.getItem(tokenName));
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};

		const { data } = await axios.post(api.chapter, chapter, config);

		dispatch({
			type: createChapterSuccess,
			payload: data.doc,
		});

		document.location.href = `/chapter?id=${data.doc._id}`;
	} catch (error) {
		dispatch({
			type: createChapterFail,
			payload:
				error.response && error.response.data && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export default createChapterAction;
