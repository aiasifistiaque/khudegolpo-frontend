import axios from 'axios';
import { api } from '../../../constants';
import {
	editBookRequest,
	editBookSuccess,
	editBookFail,
} from '../../storeConstants';

const editBookAction = update => async (dispatch, getState) => {
	try {
		const { token } = getState().auth;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};
		dispatch({ type: editBookRequest });
		const { data } = await axios.put(`${api.book}`, update, config);

		dispatch({ type: editBookSuccess, payload: data });
		document.location.href = `/book?id=${data.doc._id}`;
	} catch (error) {
		dispatch({
			type: editBookFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};

export default editBookAction;
