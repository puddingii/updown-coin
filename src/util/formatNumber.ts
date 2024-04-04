export const formatKRNumber = (number: number) => {
	return new Intl.NumberFormat('ko-KR', {
		minimumSignificantDigits: 3,
	}).format(number);
};
