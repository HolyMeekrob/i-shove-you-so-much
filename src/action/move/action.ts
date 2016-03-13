import { complement, curry, filter, last } from 'ramda';
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

const arePositionsEqual =
curry((position: Position,  tokenPosition: TokenPosition): boolean =>
		position.equals(tokenPosition.position));

const arePositionsDifferent = (pos: Position) => complement(arePositionsEqual(pos));

const allOtherPositions = (pos: Position) => filter(arePositionsDifferent(pos));

const getMoveResults =
(game: Game, pos: Position, dir: Direction, spaces: number): TokenPosition[] => {
	const tokenPositions = game.getGameBoard().getTokenPositions();
	const movedToken = game.getGameBoard().getTokenAt(pos);
	const newPosition = getFinalPosition(pos, dir, spaces);

	return allOtherPositions(pos)(tokenPositions)
		.concat(new TokenPosition(movedToken, newPosition));
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
