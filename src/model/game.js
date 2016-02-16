import { defaultTo } from 'ramda';

import * as t from './turn';

export default (playerOne, playerTwo, gameBoard, playerTurn) => {
	const turn = defaultTo(t.PLAYER_ONE_TURN, playerTurn);

	const getPlayerOne = () => playerOne;
	const getPlayerTwo = () => playerTwo;
	const getGameBoard = () => gameBoard;
	const getTurn = () => turn;

	return Object.freeze({
		getPlayerOne,
		getPlayerTwo,
		getGameBoard,
		getTurn
	});
};
