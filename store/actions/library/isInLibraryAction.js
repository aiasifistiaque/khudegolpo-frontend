import axios from 'axios';
import { api } from '../../../constants';
import {
	isInLibraryRequest,
	isInToLibrarySuccess,
	isInToLibraryFail,
} from '../../storeConstants';

const isInLibraryAction = id => async (dispatch, getState) => {
	try {
		const { token } = getState().auth;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};
		dispatch({ type: isInLibraryRequest });
		const { data } = await axios.get(`${api.library}/book/${id}`, config);

		dispatch({ type: isInToLibrarySuccess, payload: data });
	} catch (error) {
		dispatch({
			type: isInToLibraryFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};

export default isInLibraryAction;
