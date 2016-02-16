import { isNil } from 'ramda';

export default (board, ...tokenPositions) => {
	(() => {
		if (isNil(board) || tokenPositions.length === 0) {
			throw new Error('Board and token positions are required');
		}
	})();

	const getKey = (pos) => {
		const multiplier = 1000;
		return pos.x * multiplier + pos.y;
	};

	const positionMap = new Map(tokenPositions.map((pair) => {
		return [getKey(pair.position), pair.token];
	}));

	const getBoard = () => board;

	const hasTokenAt = (position) => {
		return positionMap.has(getKey(position));
	};

	const getTokenAt = (position) => {
		return positionMap.get(getKey(position));
	};

	const getTokenPositions = () => tokenPositions.slice(0);

	return Object.freeze({
		getBoard,
		hasTokenAt,
		getTokenAt,
		getTokenPositions
	});
};
