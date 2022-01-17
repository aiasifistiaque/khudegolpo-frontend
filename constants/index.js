//

const backendUrl = process.env.NEXT_PUBLIC_BACKEND;

export const backend = `${backendUrl}/api`;

//export const production = 'https://api-vincentsphere.herokuapp.com/api';

export const dev = 'http://localhost:5000/api';

const environmentDev = 'http://localhost:5000';
const environmentProd = backendUrl;

const frontDev = 'https://khudegolpo.vercel.app/login';

export const frontend = frontDev;
export const url = 'https://khudegolpo.vercel.app';

const isBackend = false;

const adminServerDev = 'http://localhost:5000/admin-api';
const adminServerBacked = `${backendUrl}/admin-api`;

const domain = environmentProd;
const server = backend;
export const adminServer = adminServerBacked;

export const api = {
	domain: domain,
	server: server,
	/**auth */
	login: `${server}/auth/login`,
	register: `${server}/auth/register`,
	sendOtp: `${server}/profile/sendotp`,
	verifyOtp: `${server}/profile/verifyotp`,
	resetPassword: `${server}/profile/resetpassword`,
	changePassword: `${server}/profile/changePassword`,

	/**user */
	profile: `${server}/auth`,
	editUser: `${server}/profile/edituser`,
	follow: `${server}/follow`,

	refill: `${server}/refill`,
	withdraw: `${server}/withdraw`,

	/**book */
	book: `${server}/books`,
	chapter: `${server}/chapters`,
	comments: `${server}/comments`,

	upload: `${server}/upload`,
	unlock: `${server}/unlock`,

	/**library */
	library: `${server}/library`,
	writings: `${server}/library/writings`,

	// /**admin */
	// allusers: `${server}/profile/getallusers`,
	// anUser: `${server}/profile/getanuser`,
	// userByMail: `${server}/profile/getuserbymail`,
	// editRole: `${server}/profile/editrole`,
	// getAllUsers: `${server}/profile/getallusers`,
	// createProduct: `${server}/products/createproduct`,
	// getAllOrders: `${server}/order/getallorders`,
	// changeSeen: `${server}/order/changeSeen`,
	// payment: `${server}/payment`,
	// dashboard: `${server}/dashboard`,

	config: {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	},
};

export const config = {
	file: {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	},
};

export const general = {
	takaSymbol: '৳',
	vat: 0,
	shipping: 0,
};

export const shopData = {
	name: 'Grocery',
};

export const editor = {
	formats: [
		'header',
		'font',
		'size',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
	],
	modules: {
		toolbar: [
			['bold', 'italic', 'underline'],
			[{ indent: '-1' }, { indent: '+1' }],
			['clean'],
		],
		clipboard: {
			// toggle to add extra line breaks when pasting HTML:
			matchVisual: false,
		},
	},
};
