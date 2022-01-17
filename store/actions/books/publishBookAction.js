import axios from 'axios';
import { api } from '../../../constants';
import { publishBookRequest, publishBookFail } from '../../storeConstants';
import getBookAction from './getBookAction';

const publishBookAction = update => async (dispatch, getState) => {
	try {
		const { token } = getState().auth;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};
		dispatch({ type: publishBookRequest });
		const { data } = await axios.put(`${api.book}/publish`, update, config);

		dispatch({ type: publishBookFail, payload: data });
		dispatch(getBookAction(data.doc._id));
	} catch (error) {
		dispatch({
			type: publishBookFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};

export default publishBookAction;
