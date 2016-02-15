import { any, isNil } from 'ramda';

export default (playerType, tokenType) => {
	(() => {
		if (any(isNil, [playerType, tokenType])) {
			throw new Error('All arguments are required.');
		}
	})();

	const getPlayerType = () => playerType;
	const getTokenType = () => tokenType;

	return Object.freeze({
		getPlayerType,
		getTokenType
	});
};
