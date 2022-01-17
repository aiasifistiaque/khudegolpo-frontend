import { api } from '../../../constants';
import axios from 'axios';
import {
	tokenName,
	createBookRequest,
	createBookSuccess,
	createBookFail,
} from '../../storeConstants';

const createBookAction = book => async (dispatch, getState) => {
	try {
		dispatch({
			type: createBookRequest,
		});

		console.log('this is the book', book);

		const token = JSON.parse(localStorage.getItem(tokenName));
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};

		const { data } = await axios.post(api.book, book, config);

		dispatch({
			type: createBookSuccess,
			payload: data.doc,
		});

		document.location.href = `/book?id=${data.doc._id}`;
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

export default createBookAction;
