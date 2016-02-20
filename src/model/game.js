import { defaultTo } from 'ramda';

import * as t from './turn';

const MOVES_PER_TURN = 2;

export default (playerOne, playerTwo, gameBoard, playerTurn, usedMoves) => {
	const turn = defaultTo(t.PLAYER_ONE_TURN, playerTurn);
	const moveCount = defaultTo(0, usedMoves);

	const getPlayerOne = () => playerOne;
	const getPlayerTwo = () => playerTwo;
	const getGameBoard = () => gameBoard;
	const getTurn = () => turn;
	const hasMovesRemaining = () => moveCount < MOVES_PER_TURN;
	const getMovesRemaining = () => MOVES_PER_TURN - moveCount;

	return Object.freeze({
		getPlayerOne,
		getPlayerTwo,
		getGameBoard,
		getTurn,
		hasMovesRemaining,
		getMovesRemaining,
		hasTokenAt: gameBoard.hasTokenAt,
		getTokenAt: gameBoard.getTokenAt,
		getTokenPositions: gameBoard.getTokenPositions,
		getSquareAt: gameBoard.getBoard().getSquareAt
	});
};
