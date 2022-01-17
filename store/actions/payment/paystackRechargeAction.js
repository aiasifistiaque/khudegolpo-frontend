import { api } from '../../../constants';
import axios from 'axios';
import {
	tokenName,
	paystackRechargeRequest,
	paystackRechargeSuccess,
	paystackRechargeFail,
} from '../../storeConstants';
import getProfileAction from '../auth/getProfileAction';

const paystackRechargeAction = refill => async (dispatch, getState) => {
	try {
		dispatch({
			type: paystackRechargeRequest,
		});

		const token = JSON.parse(localStorage.getItem(tokenName));
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};

		const { data } = await axios.post(api.refill, refill, config);

		dispatch({
			type: paystackRechargeSuccess,
			payload: data.doc,
		});
		dispatch(getProfileAction());
	} catch (error) {
		dispatch({
			type: paystackRechargeFail,
			payload:
				error.response && error.response.data && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export default paystackRechargeAction;
