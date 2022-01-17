import axios from 'axios';
import { api } from '../../../constants';
import {
	getCommentsRequest,
	getCommentsSuccess,
	getCommentsFail,
} from '../../storeConstants';

const getCommentsAction = (type, id, page) => async dispatch => {
	try {
		dispatch({ type: getCommentsRequest });
		const { data } = await axios.get(
			`${api.comments}?id=${id}&type=${type}&perpage=4&page=${page}`
		);

		dispatch({ type: getCommentsSuccess, payload: data });
	} catch (error) {
		dispatch({
			type: getCommentsFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};

export default getCommentsAction;
