import { clone, defaultTo } from 'ramda';
import t from './turn';

export default ((playerOne, playerTwo, board, playerTurn) => {
	const turn = defaultTo(t.PLAYER_ONE, playerTurn);

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
