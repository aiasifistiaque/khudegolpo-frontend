import axios from 'axios';
import { api } from '../../../constants';
import {
	publishChapterRequest,
	publishChapterSuccess,
	publishChapterFail,
} from '../../storeConstants';
import getChapterAction from './getChapterAction';

const publishChapterAction = update => async (dispatch, getState) => {
	try {
		const { token } = getState().auth;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};
		dispatch({ type: publishChapterRequest });
		const { data } = await axios.put(`${api.chapter}/publish`, update, config);

		dispatch({ type: publishChapterSuccess, payload: data });
		dispatch(getChapterAction(data.doc._id));
	} catch (error) {
		dispatch({
			type: publishChapterFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};

export default publishChapterAction;
