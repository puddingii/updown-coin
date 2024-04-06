export const formatURLParams = (
	obj: Record<string, number | string | boolean>
) => {
	for (const key in obj) {
		if (typeof obj[key] !== 'string') {
			obj[key] = `${obj[key]}`;
		}
	}
	return new URLSearchParams(obj as Record<string, string>).toString();
};
