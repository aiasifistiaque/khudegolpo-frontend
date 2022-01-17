import { api } from '../../../constants';
import axios from 'axios';
import {
	unlockChapterRequest,
	unlockChapterSuccess,
	unlockChapterFail,
} from '../../storeConstants';

const unlockChapterAction = id => async (dispatch, getState) => {
	try {
		dispatch({
			type: unlockChapterRequest,
		});

		const { token } = getState().auth;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};

		const { data } = await axios.post(api.unlock, { id }, config);

		dispatch({
			type: unlockChapterSuccess,
			payload: data.doc,
		});

		document.location.href = `/chapter?id=${data.doc.chapter}`;
	} catch (error) {
		dispatch({
			type: unlockChapterFail,
			payload:
				error.response && error.response.data && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export default unlockChapterAction;
