import { chain, curry, inc, tail, unnest } from 'ramda';

import { getTokenPositionsForPlayer, iterateN, iterateWhile } from './util';
import { move } from './game';

import * as direction from '../model/direction';

import validateShove from './shove/validation';
import getShoveResults from './shove/action';

import validateMove from './move/validation';

const getAllPossibleMoveAmountsForPositionDirection = curry((game, tp, dir) =>
	tail(iterateWhile(inc, validateMove(game, dir, tp.position), 0)));

const getAllPossibleMoveOutcomesForPositionDirection = curry((game, tp, dir) =>
	getAllPossibleMoveAmountsForPositionDirection(game, tp, dir)
		.map(move(game, dir, tp.position)));

const getAllPossibleMoveOutcomesForTokenPosition = (game, tp) =>
	chain(getAllPossibleMoveOutcomesForPositionDirection(game, tp),
		direction.getAllDirections());

const getAllSingleMoveOutcomes = curry((game) =>
	chain(getAllPossibleMoveOutcomesForTokenPosition(game),
		getTokenPositionsForPlayer(game, game.getTurn())));

const getAllValidShoveOutcomesForTokenPosition = curry((game, tp) => {
	direction.getAllDirections().filter(validateShove(game, tp.position))
		.map(getShoveResults(game, tp.position));
});

const getAllValidShoveOutcomes = curry((game) =>
	chain(getAllValidShoveOutcomesForTokenPosition(game),
		getTokenPositionsForPlayer(game, game.getTurn())));

export const getAllPossibleTurnOutcomesForCurrentPlayer = (game) => {
	const allMoveOutcomes = unnest(iterateN(
		chain(getAllSingleMoveOutcomes),
		game.getMovesRemaining(),
		[game]));

	return unnest(allMoveOutcomes.map(getAllValidShoveOutcomes));
};
