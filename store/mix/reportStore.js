import axios from 'axios';
import { api } from '../../constants';

const getReportInitialize = 'GET_REPORT_INITIALIZE';
const getReportRequest = 'GET_REPORT_REQUEST';
const getReportSuccess = 'GET_REPORT_SUCCESS';
const getReportFail = 'GET_REPORT_FAIL';

export const reportReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case getReportRequest:
			return {
				loading: true,
			};
		case getReportSuccess:
			return {
				loading: false,
				success: true,
			};
		case getReportInitialize:
			return {
				loading: false,
				success: false,
				error: false,
			};
		case getReportFail:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export const reportAction = report => async (dispatch, getState) => {
	try {
		const { token } = getState().auth;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};
		dispatch({ type: getReportRequest });
		const { data } = await axios.post(`${api.server}/report`, report, config);

		dispatch({ type: getReportSuccess, payload: data });
	} catch (error) {
		dispatch({
			type: getReportFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};

export const reportInitializeAction = () => async (dispatch, getState) => {
	dispatch({ type: getReportInitialize });
};
