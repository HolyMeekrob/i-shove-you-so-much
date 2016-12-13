import { complement, curry, last } from 'ramda';

import { getTokenAt, getTokenPositions } from '../../util/game';
import { iterateN } from '../../util/iterate';
import { getNextPosition } from '../../util/position';
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

const arePositionsDifferent =	curry(complement(arePositionsEqual));

const allOtherPositions = (pos: Position, tokenPositions: TokenPosition[]) =>
	tokenPositions.filter(arePositionsDifferent(pos));

const getMoveResults = (game: Game, pos: Position, dir: Direction, spaces: number) =>
	allOtherPositions(pos, getTokenPositions(game)).concat(
		new TokenPosition(getTokenAt(game, pos), getFinalPosition(pos, dir, spaces)));

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
