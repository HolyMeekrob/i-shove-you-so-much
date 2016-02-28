import { any, curry, flip, isEmpty, lift, or, prepend } from 'ramda';

import { getFloorAt, getNextPlayerTurn } from './util';

import * as floor from '../model/floor';

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

const isPlayerStuck = curry((game, playerTurn) => {
	return isEmpty(getAllPossibleTurnOutcomesForPlayer(game, playerTurn));
});

const isGameOver = (playerTurn, game) =>
	lift(or)(hasTokenInPit, flip(isPlayerStuck)(playerTurn))(game);

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

	return game(game.getPlayerOne(), game.getPlayerTwo(), newBoard,
		getNextPlayerTurn(game.getTurn()));
};
