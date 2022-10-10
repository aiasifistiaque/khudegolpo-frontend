import axios from 'axios';
import { api } from '../../../constants';
import {
	searchBooksRequest,
	searchBooksSuccess,
	searchBooksFail,
} from '../../storeConstants';

const searchBooksAction = string => async dispatch => {
	try {
		dispatch({ type: searchBooksRequest });
		const { data } = await axios.get(`${api.book}?search=${string}`);

		dispatch({ type: searchBooksSuccess, payload: data });
	} catch (error) {
		dispatch({
			type: searchBooksFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};

export default searchBooksAction;
