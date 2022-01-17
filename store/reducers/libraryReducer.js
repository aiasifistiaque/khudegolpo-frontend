import {
	myWritingsRequest,
	myWritingsSuccess,
	myWritingsFail,
	myLibraryRequest,
	myLibrarySuccess,
	myLibraryFail,
	isInLibraryRequest,
	isInToLibrarySuccess,
	isInToLibraryFail,
	addToLibraryRequest,
	addToLibrarySuccess,
	addToLibraryFail,
} from '../storeConstants';

export const myWritingsReducer = (state = { loading: true }, action) => {
	switch (action.type) {
		case myWritingsRequest:
			return { loading: true, chapter: {} };
		case myWritingsSuccess:
			return {
				loading: false,
				books: action.payload.doc,
				page: action.payload.page,
				pages: action.payload.pages,
				count: action.payload.count,
			};
		case myWritingsFail:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const myLibraryReducer = (state = { loading: true }, action) => {
	switch (action.type) {
		case myLibraryRequest:
			return { loading: true, chapter: {} };
		case myLibrarySuccess:
			return {
				loading: false,
				books: action.payload.doc,
				page: action.payload.page,
				pages: action.payload.pages,
				count: action.payload.count,
			};
		case myLibraryFail:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const addToLibraryReducer = (state = { loading: true }, action) => {
	switch (action.type) {
		case addToLibraryRequest:
			return { loading: true };
		case addToLibrarySuccess:
			return {
				loading: false,
				doc: action.payload.doc,
			};
		case addToLibraryFail:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const isInLibraryReducer = (state = { loading: true }, action) => {
	switch (action.type) {
		case isInLibraryRequest:
			return { loading: true };
		case isInToLibrarySuccess:
			return {
				loading: false,
				doc: action.payload.doc,
				found: action.payload.found,
			};
		case isInToLibraryFail:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
