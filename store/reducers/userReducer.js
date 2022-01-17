import {
	loginRequest,
	loginSuccess,
	loginFail,
	signupRequest,
	signupSuccess,
	signupFail,
	logOut,
	getProfileRequest,
	getProfileSuccess,
	getProfileFail,
	editProfileRequest,
	editProfileFail,
	editProfileSuccess,
	paystackRechargeRequest,
	paystackRechargeSuccess,
	paystackRechargeFail,
	createWithdrawRequest,
	createWithdrawSuccess,
	createWithdrawFail,
	getFollowersRequest,
	getFollowersSuccess,
	getFollowersFail,
} from '../storeConstants';

export const loginReducer = (state = {}, action) => {
	switch (action.type) {
		case loginRequest:
			return { loading: true };
		case loginSuccess:
			return { loading: false, token: action.payload };
		case loginFail:
			return { loading: false, error: action.payload };
		case logOut:
			return {};
		default:
			return { loading: false };
	}
};

export const signupReducer = (state = {}, action) => {
	switch (action.type) {
		case signupRequest:
			return { loading: true };
		case signupSuccess:
			return { loading: false };
		case signupFail:
			return { loading: false, error: action.payload };

		default:
			return { loading: false };
	}
};

export const userReducer = (state = { user: {}, loading: false }, action) => {
	switch (action.type) {
		case getProfileRequest:
			return { ...state, loading: true };
		case getProfileSuccess:
			return { user: action.payload, loading: false };
		case getProfileFail:
			return { loading: false, error: action.payload };
		case editProfileRequest:
			return { loading: true, edit: 2 };
		case editProfileSuccess:
			return { user: action.payload, loading: false, edit: 1 };
		case editProfileFail:
			return { loading: false, error: action.payload, edit: 0 };

		default:
			return state;
	}
};

export const followersReducer = (
	state = {
		followers: 0,
		followings: 0,
		followingsList: [],
		followersList: [],
		followLoading: false,
	},
	action
) => {
	switch (action.type) {
		case getFollowersRequest:
			return { ...state, followLoading: true };
		case getFollowersSuccess:
			return {
				followers: action.payload.followersCount,
				followersList: action.payload.followers,
				followings: action.payload.followingsCount,
				followingsList: action.payload.followings,
				loading: false,
			};
		case getFollowersFail:
			return { followLoading: false, error: action.payload };
		default:
			return state;
	}
};

export const refillReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case paystackRechargeRequest:
			return { loading: true };
		case paystackRechargeSuccess:
			return { success: true, loading: false, doc: action.payload };
		case paystackRechargeFail:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const withdrawReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case createWithdrawRequest:
			return { loading: true };
		case createWithdrawSuccess:
			return { success: true, loading: false, doc: action.payload };
		case createWithdrawFail:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
