import {
	unlockChapterRequest,
	unlockChapterSuccess,
	unlockChapterFail,
	isUnlockedRequest,
	isUnlockedSuccess,
	isUnlockedFail,
} from '../storeConstants';

export const unlockReducer = (
	state = { loading: false, status: 9, process: 9 },
	action
) => {
	switch (action.type) {
		case unlockChapterRequest:
			return { loading: true, status: 6, process: 6 };
		case unlockChapterSuccess:
			return {
				loading: false,
				doc: action.payload,
				message: 'Chapter Unlocked Successfully',
				process: 1,
			};
		case unlockChapterFail:
			return { loading: false, error: action.payload, process: 0 };
		case isUnlockedRequest:
			return { status: 9 };
		case isUnlockedSuccess:
			return {
				status: action.payload,
			};
		case isUnlockedFail:
			return { error: action.payload, status: 2 };

		default:
			return state;
	}
};
