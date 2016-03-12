import { complement, compose, curry, find, last, prop } from 'ramda';
import { getNextPosition, iterateN } from '../util';
import { validateMove } from './validation';

import { Direction } from '../../model/direction';
import { Game } from '../../model/Game';
import { GameBoard } from '../../model/GameBoard';
import { Position } from '../../model/position';
import { TokenPosition } from '../../model/tokenPosition';

const getFinalPosition =
(position: Position, dir: Direction, spaces: number): Position =>
	last(iterateN(getNextPosition(dir), spaces, position));

const arePositionsEqual = (position: Position) =>
	(tokenPosition: TokenPosition): boolean =>
		position.equals(tokenPosition.position);

const getMoveResults =
(game: Game, pos: Position, dir: Direction, spaces: number): TokenPosition[] => {
	const tokenPositions = game.getGameBoard().getTokenPositions();
	const movedToken = find(compose(pos.equals, prop('position')), tokenPositions);
	const newPosition = getFinalPosition(movedToken.position, dir, spaces);

	return tokenPositions.filter(complement(arePositionsEqual(pos)))
		.concat(new TokenPosition(movedToken.token, newPosition));
};

export const move =
curry((game: Game, pos: Position, dir: Direction, spaces: number): Game => {
	if (!validateMove(game, pos, dir, spaces)) {
		throw new Error('Invalid move');
	}

	const newBoard = new GameBoard(game.getGameBoard().getBoard(),
		...getMoveResults(game, pos, dir, spaces));

	return new Game(game.getPlayerOne(), game.getPlayerTwo(),
		newBoard, game.getRules(), game.getTurn(), game.getMovesRemaining() - 1);
});
