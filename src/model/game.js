import { clone, defaultTo } from 'ramda';
import { PLAYER_ONE_TURN } from './turn';

export default ((playerOne, playerTwo, board, playerTurn) => {
	const turn = defaultTo(PLAYER_ONE_TURN, playerTurn);

	const getPlayerOne = () => clone(playerOne);
	const getPlayerTwo = () => clone(playerTwo);
	const getBoard = () => clone(board);
	const getTurn = () => turn;

	return Object.freeze({
		getPlayerOne,
		getPlayerTwo,
		getBoard,
		getTurn
	});
});
