import axios from 'axios';
import { api } from '../../../constants';
import {
	getBooksRequest,
	getBooksSuccess,
	getBooksFail,
} from '../../storeConstants';

const getBooksAction = string => async dispatch => {
	try {
		dispatch({ type: getBooksRequest });
		const { data } = await axios.get(`${api.book}?${string}&perpage=12`);

		dispatch({ type: getBooksSuccess, payload: data });
	} catch (error) {
		dispatch({
			type: getBooksFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};

export default getBooksAction;
