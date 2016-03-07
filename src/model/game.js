import { defaultTo } from 'ramda';

import * as playerType from './playerType';
import ruleset from './ruleset';

const DEFAULT_MOVES_PER_TURN = 2;

export default (playerOne, playerTwo, gameBoard, rules, playerTurn, usedMoves, gameOver) => {
	const turn = defaultTo(playerType.PLAYER_ONE, playerTurn);
	const moveCount = defaultTo(0, usedMoves);
	const gameRules = defaultTo(ruleset(DEFAULT_MOVES_PER_TURN), rules);
	const gameIsOver = defaultTo(false, gameOver);

	const getPlayerOne = () => playerOne;
	const getPlayerTwo = () => playerTwo;
	const getGameBoard = () => gameBoard;
	const getRules = () => gameRules;
	const getTurn = () => turn;
	const hasMovesRemaining = () => moveCount < gameRules.getMovesPerTurn();
	const getMovesRemaining = () => gameRules.getMovesPerTurn() - moveCount;
	const isGameOver = () => gameIsOver;

	return Object.freeze({
		getPlayerOne,
		getPlayerTwo,
		getGameBoard,
		getRules,
		getTurn,
		hasMovesRemaining,
		getMovesRemaining,
		isGameOver,
		hasTokenAt: gameBoard.hasTokenAt,
		getTokenAt: gameBoard.getTokenAt,
		getTokenPositions: gameBoard.getTokenPositions,
		getSquareAt: gameBoard.getBoard().getSquareAt,
		getMovesPerTurn: gameRules.getMovesPerTurn
	});
};
