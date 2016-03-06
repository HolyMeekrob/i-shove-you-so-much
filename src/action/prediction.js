import {
	__, apply, chain, compose, curry, flatten,
	identical, identity, ifElse, prop, props
} from 'ramda';

import { getNextPosition, getTokenPositionsForPlayer, iterateWhile } from './util';

import * as direction from '../model/direction';
import tokenPosition from '../model/tokenPosition';

import validateShove from './shove/validation';
import getShoveResults from './shove/action';

import validateMove from './move/validation';

const getValidShoves = (game, playerTurn) => {
	const playerTokenPositions = getTokenPositionsForPlayer(game, playerTurn);

	const createPosDir = (tp) => (dir) => {
		return { position: tp.position, direction: dir };
	};

	const getAllPositionDirections = (tp) =>
		direction.getAllDirections().map(createPosDir(tp));

	return flatten(playerTokenPositions.map(getAllPositionDirections))
		.filter(compose(apply(validateShove(__, __, game)),
			props(['direction', 'position'])));
};

const getAllPossibleMovePositionsForDirection = curry((game, tp, dir) =>
	iterateWhile(getNextPosition(dir), validateMove(game, dir, __, 1), tp.position));

const getAllPossibleMovePositionsForTokenPosition = curry((game, tp) =>
	chain(getAllPossibleMovePositionsForDirection(game, tp),
		direction.getAllDirections()));

const getUpdatedTokenPositions = curry((game, tp, pos) =>
	game.getTokenPositions().map(ifElse(
		identical(tp), compose(tokenPosition(__, pos), prop('token')), identity)));

// Near-term: Use move positions to create array of move outcomes (sets of token positions)
// Improvement: Change getAllPossibleMovePositionsForDirection to instead
// return move outcomes. Will require building a custom object to iterate on
const getAllPossibleMoveOutcomesForTokenPosition = curry((game, tp) =>
	getAllPossibleMovePositionsForTokenPosition(game, tp)
		.map(getUpdatedTokenPositions(game, tp)));

const getAllSingleMoveOutcomes = (game, playerTurn) =>
	chain(getAllPossibleMoveOutcomesForTokenPosition(game),
		getTokenPositionsForPlayer(game, playerTurn));

export const getAllPossibleTurnOutcomesForPlayer = (game, playerTurn) => {
	const validShoves = getValidShoves(game, playerTurn);

	const getTokenPositionsAfterShove = (posDir) => {
		return getShoveResults(
			game, posDir.direction, posDir.position);
	};

	const shoveOutcomes = validShoves.map(
		getTokenPositionsAfterShove);

	// TODO: Need to iterate on outcomes for as many moves as the game allows
	const allMoveOutcomes = getAllSingleMoveOutcomes(game);
};
