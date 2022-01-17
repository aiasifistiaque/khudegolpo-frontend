import axios from 'axios';
import { api } from '../../../constants';
import isInLibraryAction from './isInLibraryAction';
import {
	isInLibraryRequest,
	addToLibraryRequest,
	addToLibrarySuccess,
	addToLibraryFail,
} from '../../storeConstants';

const addToLibraryAction = options => async (dispatch, getState) => {
	try {
		const { token } = getState().auth;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};
		dispatch({ type: isInLibraryRequest });
		dispatch({ type: addToLibraryRequest });

		const { data } = await axios.post(`${api.library}`, options, config);

		dispatch({ type: addToLibrarySuccess, payload: data.doc });
		dispatch(isInLibraryAction(data.doc.book));
	} catch (error) {
		dispatch({
			type: addToLibraryFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};

export default addToLibraryAction;
