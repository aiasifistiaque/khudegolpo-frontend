import {
	getBookRequest,
	getBookSuccess,
	getBookFail,
	createBookRequest,
	createBookSuccess,
	createBookFail,
	getChapterRequest,
	getChapterSuccess,
	getChapterFail,
	createChapterRequest,
	createChapterSuccess,
	createChapterFail,
	getCommentsRequest,
	getCommentsSuccess,
	getCommentsFail,
	searchBooksRequest,
	searchBooksSuccess,
	searchBooksFail,
	getBooksRequest,
	getBooksSuccess,
	getBooksFail,
	publishChapterSuccess,
	publishChapterRequest,
	publishChapterFail,
	publishBookRequest,
	publishBookSuccess,
	publishBookFail,
	editProfileRequest,
	editChapterSuccess,
	editChapterFail,
	editChapterRequest,
	editBookRequest,
	editBookSuccess,
	editBookFail,
} from '../storeConstants';

export const createBookReducer = (
	state = { doc: {}, loading: true, status: 9 },
	action
) => {
	switch (action.type) {
		case createBookRequest:
			return { status: 6, loading: true, doc: {} };
		case createBookSuccess:
			return {
				loading: false,
				doc: action.payload,
				status: 1,
			};
		case createBookFail:
			return {
				loading: false,
				error: action.payload,
				status: 0,
			};

		default:
			return state;
	}
};

export const bookReducer = (state = { book: {}, loading: true }, action) => {
	switch (action.type) {
		case getBookRequest:
			return { loading: true, book: {} };
		case getBookSuccess:
			return {
				loading: false,
				book: action.payload.doc,
				viewer: action.payload.viewer,
				words: action.payload.words,
			};
		case getBookFail:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const booksReducer = (state = { books: [], loading: true }, action) => {
	switch (action.type) {
		case getBooksRequest:
			return { books: [], loading: true };
		case getBooksSuccess:
			return {
				loading: false,
				books: action.payload.books,
				total: action.payload.totalPages,
				count: action.payload.count,
				page: action.payload.page,
			};
		case getBooksFail:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const searchReducer = (
	state = { searchResult: [], loading: true },
	action
) => {
	switch (action.type) {
		case searchBooksRequest:
			return { loading: true, searchResult: [] };
		case searchBooksSuccess:
			return {
				loading: false,
				searchResult: action.payload,
			};
		case searchBooksFail:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const chapterReducer = (
	state = { chapter: {}, loading: true },
	action
) => {
	switch (action.type) {
		case getChapterRequest:
			return { loading: true, chapter: {} };
		case getChapterSuccess:
			return {
				loading: false,
				chapter: action.payload.doc,
				viewer: action.payload.viewer,
			};
		case getChapterFail:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const createChapterReducer = (
	state = { chapter: {}, loading: true, status: 9 },
	action
) => {
	switch (action.type) {
		case createChapterRequest:
			return { status: 6, loading: true, doc: {} };
		case createChapterSuccess:
			return {
				loading: false,
				doc: action.payload,
				status: 1,
			};
		case createChapterFail:
			return {
				loading: false,
				error: action.payload,
				status: 0,
			};

		default:
			return state;
	}
};

export const publishBookReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case publishBookRequest:
			return { loading: true };
		case publishBookSuccess:
			return {
				loading: false,
				success: true,
			};
		case publishBookFail:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export const publishChapterReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case publishChapterRequest:
			return { loading: true };
		case publishChapterSuccess:
			return {
				loading: false,
				success: true,
			};
		case publishChapterFail:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export const editBookReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case editBookRequest:
			return { loading: true };
		case editBookSuccess:
			return {
				loading: false,
				success: true,
			};
		case editBookFail:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export const editChapterReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case editChapterRequest:
			return { loading: true };
		case editChapterSuccess:
			return {
				loading: false,
				success: true,
			};
		case editChapterFail:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export const commentsReducer = (
	state = { comments: [], loading: true },
	action
) => {
	switch (action.type) {
		case getCommentsRequest:
			return { ...state, loading: true };
		case getCommentsSuccess:
			return {
				loading: false,
				comments: action.payload.doc,
				page: action.payload.page,
				total: action.payload.totalPages,
			};
		case getCommentsFail:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
