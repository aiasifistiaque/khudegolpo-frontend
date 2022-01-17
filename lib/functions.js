//

export const capitalize = string => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const textShorten = (string, len) => {
	if (string.length > len) {
		return `${string.substring(0, len)}...`;
	} else {
		return string;
	}
};

export const stripHtml = originalString => {
	const newString = originalString.replace(/(<([^>]+)>)/gi, '');
	return newString;
};
