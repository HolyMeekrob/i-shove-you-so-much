import { complement, compose, find, identity, last, prop } from 'ramda';
import { getNextPosition, iterateN } from '../util';

import { Direction } from '../../model/direction';
import { Game } from '../../model/Game';
import { Position } from '../../model/position';
import { TokenPosition } from '../../model/tokenPosition';

const getFinalPosition =
(position: Position, dir: Direction, spaces: number): Position =>
	last(iterateN(getNextPosition(dir), spaces, position));

const arePositionsEqual = (position: Position) =>
	(tokenPosition: TokenPosition): boolean =>
		position.equals(tokenPosition.position);

export const getMoveResults =
(game: Game, pos: Position, dir: Direction, spaces: number): TokenPosition[] => {
	const tokenPositions = game.getGameBoard().getTokenPositions();
	const movedToken = find(compose(pos.equals, prop('position')), tokenPositions);
	const newPosition = getFinalPosition(movedToken.position, dir, spaces);

	return tokenPositions.filter(complement(arePositionsEqual(pos)))
		.concat(new TokenPosition(movedToken.token, newPosition));
}
