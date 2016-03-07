import { any, curry, isEmpty, lift, or, prepend } from 'ramda';

import { getFloorAt, getNextPlayerTurn } from './util';

import * as floor from '../model/floor';

import gameBoard from '../model/gameBoard';
import game from '../model/game';

import { getAllPossibleTurnOutcomesForCurrentPlayer } from './prediction';

import validateShove from './shove/validation';
import validateMove from './move/validation';

import getMoveResults from './move/action';
import getShoveResults from './shove/action';

const isTokenPositionInPit = curry((gameObj, tp) => {
	return getFloorAt(gameObj, tp.position) === floor.PIT;
});

const hasTokenInPit = (gameObj) => any(isTokenPositionInPit(gameObj),
	gameObj.getTokenPositions());

const isPlayerStuck = curry((gameObj) => {
	return isEmpty(getAllPossibleTurnOutcomesForCurrentPlayer(gameObj));
});

const isGameOver = (gameObj) =>
	lift(or)(hasTokenInPit, isPlayerStuck)(gameObj);

const getGameWithGameOver = (gameObj) =>
	game(gameObj.getPlayerOne(), gameObj.getPlayerTwo(), gameObj.getGameBoard(),
		gameObj.getRules(), gameObj.getTurn(), gameObj.getMovesRemaining(),
		isGameOver(gameObj));

export const move = curry((gameObj, pos, dir, spaces) => {
	if (!validateMove(gameObj, pos, dir, spaces)) {
		throw new Error('Invalid move');
	}

	const newBoard = gameBoard(undefined, ...prepend(
		gameObj.getGameBoard().getBoard(),
		getMoveResults(gameObj, pos, dir, spaces)));

	return getGameWithGameOver(game(gameObj.getPlayerOne(), gameObj.getPlayerTwo(),
		newBoard, gameObj.getRules(), gameObj.getTurn(),
		gameObj.getMovesRemaining() - 1));
});

export const shove = (gameObj, pos, dir) => {
	if (!validateShove(gameObj, pos, dir)) {
		throw new Error('Invalid shove');
	}

	const newBoard = gameBoard(...prepend(
		gameObj.getGameBoard().getBoard(),
		getShoveResults(gameObj, pos, dir)));

	return getGameWithGameOver(game(gameObj.getPlayerOne(),
		gameObj.getPlayerTwo(), newBoard, game.getRules(),
		getNextPlayerTurn(game.getTurn())));
};
