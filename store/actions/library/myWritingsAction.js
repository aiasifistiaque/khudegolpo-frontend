import axios from 'axios';
import { api } from '../../../constants';
import {
	myWritingsRequest,
	myWritingsSuccess,
	myWritingsFail,
} from '../../storeConstants';

const myWritingsAction = string => async (dispatch, getState) => {
	try {
		const { token } = getState().auth;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};
		dispatch({ type: myWritingsRequest });
		const { data } = await axios.get(`${api.writings}?${string}`, config);

		dispatch({ type: myWritingsSuccess, payload: data });
	} catch (error) {
		dispatch({
			type: myWritingsFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};

export default myWritingsAction;
