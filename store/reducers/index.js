import { combineReducers } from 'redux';
import authReducer from './authReducer';
import {
	signupReducer,
	loginReducer,
	userReducer,
	refillReducer,
	withdrawReducer,
	followersReducer,
} from './userReducer';
import {
	bookReducer,
	createBookReducer,
	chapterReducer,
	createChapterReducer,
	commentsReducer,
	searchReducer,
	booksReducer,
	publishChapterReducer,
	publishBookReducer,
	editChapterReducer,
	editBookReducer,
} from './bookReducer';
import {
	myWritingsReducer,
	myLibraryReducer,
	isInLibraryReducer,
	addToLibraryReducer,
} from './libraryReducer';
import { alertReducer } from './alertReducer';
import { unlockReducer } from './unlockReducer';
import { profileReducer, friendReducer } from '../mix/userStore';
import { followReducer } from '../mix/followStore';
import { editProfileReducer } from '../actions/auth/updateProfileStore';
import { notificationReducer } from '../mix/notificationStore';
import { forgotPasswordReducer } from '../mix/passwordResetStore';
import { reportReducer } from '../mix/reportStore';
import { changePasswordReducer } from '../mix/passwordChangeStore';

const rootReducer = combineReducers({
	alert: alertReducer,

	/**auth */
	auth: authReducer,
	signup: signupReducer,
	login: loginReducer,
	updateUser: editProfileReducer,
	forgotPassword: forgotPasswordReducer,
	changePassword: changePasswordReducer,

	notifications: notificationReducer,

	user: userReducer,
	book: bookReducer,
	books: booksReducer,
	newBook: createBookReducer,
	chapter: chapterReducer,
	newChapter: createChapterReducer,
	publishChapter: publishChapterReducer,
	publishBook: publishBookReducer,
	editChapter: editChapterReducer,
	editBook: editBookReducer,
	comments: commentsReducer,
	refill: refillReducer,
	withdraw: withdrawReducer,
	search: searchReducer,
	followers: followersReducer,
	writings: myWritingsReducer,
	library: myLibraryReducer,
	inLibrary: isInLibraryReducer,
	addToLibrary: addToLibraryReducer,
	unlock: unlockReducer,

	friend: friendReducer,
	follow: followReducer,

	report: reportReducer,
});

export default rootReducer;
