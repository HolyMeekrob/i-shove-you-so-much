import { any, curry, isEmpty, prepend } from 'ramda';

import { getFloorAt, getNextPlayerTurn } from './util';

import * as floor from '../model/floor';
import * as turn from '../model/turn';

import gameBoard from '../model/gameBoard';

import { getAllPossibleTurnOutcomesForPlayer } from './prediction';

import validateShove from './shove/validation';
import validateMove from './move/validation';

import getMoveResults from './move/action';
import getShoveResults from './shove/action';

const isTokenPositionInPit = curry((game, tp) => {
	return getFloorAt(game, tp.position) === floor.PIT;
});

const hasTokenInPit = (game) => any(isTokenPositionInPit(game),
	game.get.getTokenPositions());

const isPlayerStuck = (playerTurn, game) => {
	return isEmpty(getAllPossibleTurnOutcomesForPlayer(game, playerTurn));
};

const isGameOver = (playerTurn, game) => {
	return hasTokenInPit(game)
		|| isPlayerStuck(playerTurn, game);
};

export const move = (game, dir, pos, spaces) => {
	if (!validateMove(game, dir, pos, spaces)) {
		throw new Error('Invalid move');
	}

	const newBoard = gameBoard(undefined, ...prepend(
		game.getGameBoard().getBoard(),
		getMoveResults(dir, pos, spaces, game)));

	return game(game.getPlayerOne(), game.getPlayerTwo(),
		newBoard, game.getTurn(), game.getMovesRemaining() - 1);
};

export const shove = (game, dir, pos) => {
	if (!validateShove(game, dir, pos)) {
		throw new Error('Invalid shove');
	}

	const newBoard = gameBoard(...prepend(
		game.getGameBoard().getBoard(),
		getShoveResults(game, dir, pos)));

	const nextPlayerTurn = getNextPlayerTurn(game.getTurn());

	const nextTurn = isGameOver(nextPlayerTurn, game)
		? turn.GAME_OVER
		: nextPlayerTurn;

	return game(game.getPlayerOne(), game.getPlayerTwo(), newBoard, nextTurn);
};
