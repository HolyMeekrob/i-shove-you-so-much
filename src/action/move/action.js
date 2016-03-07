import { complement, compose, find, identity, last, prop } from 'ramda';
import { getNextPosition, iterateN } from '../util';

import tokenPosition from '../../model/tokenPosition';

const getFinalPosition = (dir, spaces, position) => {
	return last(iterateN(getNextPosition(dir), spaces, position));
};

export default (game, dir, pos, spaces) => {
	const movedToken = find(compose(pos.equals, prop('position')),
		game.getTokenPositions());
	const newPosition = getFinalPosition(dir, spaces, movedToken.position);

	return game.getTokenPositions().filter(complement(identity))
		.concat(tokenPosition(movedToken.token, newPosition));
};
