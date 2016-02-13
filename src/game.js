import { isNil } from 'ramda';

export default ((playerOne, playerTwo, gameBoard) => {
	const getPlayerOne = () => playerOne;
	const getPlayerTwo = () => playerTwo;
	const getBoard = () => gameBoard;

	return Object.freeze({
		getPlayerOne,
		getPlayerTwo,
		getBoard
	});
});
