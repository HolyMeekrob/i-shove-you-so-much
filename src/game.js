import { clone } from 'ramda';

export default ((playerOne, playerTwo, board) => {
	const getPlayerOne = () => clone(playerOne);
	const getPlayerTwo = () => clone(playerTwo);
	const getBoard = () => clone(board);

	return Object.freeze({
		getPlayerOne,
		getPlayerTwo,
		getBoard
	});
});
