import axios from 'axios';
import { api } from '../../../constants';
import {
	editChapterRequest,
	editChapterSuccess,
	editChapterFail,
} from '../../storeConstants';

const editChapterAction = update => async (dispatch, getState) => {
	try {
		const { token } = getState().auth;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};
		dispatch({ type: editChapterRequest });
		const { data } = await axios.put(`${api.chapter}`, update, config);

		dispatch({ type: editChapterSuccess, payload: data });
		document.location.href = `/chapter?id=${data.doc._id}`;
	} catch (error) {
		dispatch({
			type: editChapterFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};

export default editChapterAction;
