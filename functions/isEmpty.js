//

const isEmpty = obj => {
	if (obj == null) {
		return true;
	} else if (obj == undefined) {
		return true;
	} else {
		return Object.keys(obj).length === 0;
	}
};

export default isEmpty;
