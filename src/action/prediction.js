import { flatten } from 'ramda';

import * as direction from '../model/direction';

import validateShove from './shove/validation';
import getShoveResults from './shove/action';

const getValidShoves = (game, playerTurn) => {
	const currentPositions = game.getTokenPositions();

	// TODO: How to equate these two different types?
	const isTokenForPlayer = (tp) => tp.token.getPlayerType() === playerTurn;
	const playerTokenPositions = currentPositions.filter(isTokenForPlayer);
	const getAllDirections = (tp) => {
		return [
			{ position: tp.position, direction: direction.NORTH },
			{ position: tp.position, direction: direction.EAST },
			{ position: tp.position, direction: direction.SOUTH },
			{ position: tp.position, direction: direction.WEST }
		];
	};

	const isValidShove = (posDir) => {
		return validateShove(posDir.direction, posDir.position, game);
	};

	return flatten(playerTokenPositions.map(getAllDirections))
		.filter(isValidShove);
};

export const getAllPossibleTurnOutcomesForPlayer = (game, playerTurn) => {
	const validShoves = getValidShoves(game, playerTurn);

	const getTokenPositionsAfterShove = (posDir) => {
		return getShoveResults(
			game, posDir.direction, posDir.position);
	};

	const shoveOutcomes = validShoves.map(
		getTokenPositionsAfterShove);

	// TODO: Incorporate move outcomes
};
