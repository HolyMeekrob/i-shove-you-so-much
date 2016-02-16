import { isNil } from 'ramda';

export default (playerName) => {
	(() => {
		if (isNil(playerName)) {
			throw new Error('Player name is required');
		}
	})();

	const getName = () => playerName;

	return Object.freeze({
		getName
	});
};
