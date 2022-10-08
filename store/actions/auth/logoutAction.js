//

import { tokenName, logOut } from '../../storeConstants';

const logoutAction = () => async dispatch => {
	console.log('logout');
	dispatch({
		type: logOut,
	});
	localStorage.setItem(tokenName, null);
	document.location.href = '/';
};

export default logoutAction;
