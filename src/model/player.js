import { isNil } from 'ramda';

export default (playerName) => {
	(() => {
		if (isNil(playerName)) {
			throw new Error('Player name is required');
		}
	})();

	const getPlayerName = () => playerName;
	return Object.freeze({
		getPlayerName
	});
};
