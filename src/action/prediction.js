import {
	__, apply, chain, compose, curry, flatten, props, tail, unnest
} from 'ramda';

import { getTokenPositionsForPlayer, iterateN, iterateWhile } from './util';
import { move } from './game';

import * as direction from '../model/direction';

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

const plusOne = (num) => num + 1;

const getAllPossibleMoveAmountsForPositionDirection = curry((game, tp, dir) =>
	tail(iterateWhile(plusOne, validateMove(game, dir, tp.position), 0)));

const getAllPossibleMoveOutcomesForPositionDirection = curry((game, tp, dir) =>
	getAllPossibleMoveAmountsForPositionDirection(game, tp, dir)
		.map(move(game, dir, tp.position)));

const getAllPossibleMoveOutcomesForTokenPosition = (game, tp) =>
	chain(getAllPossibleMoveOutcomesForPositionDirection(game, tp),
		direction.getAllDirections());

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

	// TODO: Take all of these game states and return all possible shove outcomes
	// from each of them
	const allMoveOutcomes = unnest(iterateN(
		chain(getAllSingleMoveOutcomes), game.getMovesPerTurn, [game]));
};
