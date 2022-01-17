import axios from 'axios';
import { api } from '../../../constants';
import {
	myLibraryRequest,
	myLibrarySuccess,
	myLibraryFail,
} from '../../storeConstants';

const myLibraryAction = string => async (dispatch, getState) => {
	try {
		const { token } = getState().auth;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};
		dispatch({ type: myLibraryRequest });
		const { data } = await axios.get(`${api.library}?${string}`, config);

		dispatch({ type: myLibrarySuccess, payload: data });
	} catch (error) {
		dispatch({
			type: myLibraryFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};

export default myLibraryAction;
