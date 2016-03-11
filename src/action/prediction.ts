import { chain, curry, inc, tail, unnest } from 'ramda';
import { getTokenPositionsForCurrentPlayer, iterateN, iterateWhile } from './util';
import { validateMove } from './move/validation';
import { validateShove } from './shove/validation';
import { getShoveResults } from './shove/action';
import { move } from './game';

import { Direction, getAllDirections } from '../model/direction';
import { Game } from '../model/game';
import { TokenPosition } from '../model/tokenPosition';

const getAllPossibleMoveAmountsForPositionDirection =
	curry((game: Game, tp: TokenPosition, dir: Direction): number[] =>
		tail(iterateWhile(inc, validateMove(game, tp.position, dir), 0)));

const getAllPossibleMoveOutcomesForPositionDirection =
curry((game: Game, tp: TokenPosition, dir: Direction): Game[] =>
	getAllPossibleMoveAmountsForPositionDirection(game, tp, dir)
		.map(move(game, tp.position, dir)));

const getAllPossibleMoveOutcomesForTokenPosition =
curry((game: Game, tp: TokenPosition): Game[] =>
	chain(getAllPossibleMoveOutcomesForPositionDirection(game, tp),
		getAllDirections()));

const getAllSingleMoveOutcomes = (game: Game): Game[] =>
	chain(getAllPossibleMoveOutcomesForTokenPosition(game),
		getTokenPositionsForCurrentPlayer(game));

const getAllValidShoveOutcomesForTokenPosition =
curry((game: Game, tp: TokenPosition): TokenPosition[] =>
	unnest(getAllDirections().filter(validateShove(game, tp.position))
		.map(getShoveResults(game, tp.position))));

const getAllValidShoveOutcomes = curry((game: Game) =>
	chain(getAllValidShoveOutcomesForTokenPosition(game),
		getTokenPositionsForCurrentPlayer(game)));

export const getAllPossibleTurnOutcomesForCurrentPlayer =
(game: Game): TokenPosition[] => {
	const allMoveOutcomes = unnest(iterateN(
		chain(getAllSingleMoveOutcomes),
		game.getMovesRemaining(),
		[game]));

	return unnest(allMoveOutcomes.map(getAllValidShoveOutcomes));
};
