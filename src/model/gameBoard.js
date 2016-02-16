import { any, isNil } from 'ramda';

export default (board, tokenPositions) => {
	(() => {
		if (any(isNil, [board, tokenPositions])) {
			throw new Error('Board and token positions are required');
		}
	})();

	const getKey = (pos) => pos.x * 1000 + pos.y;

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

	return Object.freeze({
		getBoard,
		hasTokenAt,
		getTokenAt
	});
};
