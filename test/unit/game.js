import game from '../../src/game';
import chai from 'chai';
const should = chai.should();

describe('game', () => {
	describe('getPlayerOne()', () => {
		it('should return player one', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const board = { };

			const gameObj = game(playerOne, playerTwo, board);
			gameObj.getPlayerOne().should.deep.equal(playerOne);
		});
	});

	describe('getPlayerTwo()', () => {
		it('should return player two', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const board = { };

			const gameObj = game(playerOne, playerTwo, board);
			gameObj.getPlayerTwo().should.deep.equal(playerTwo);
		});
	});

	describe('getBoard()', () => {
		it('should return the game board', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const board = { squares: [] };

			const gameObj = game(playerOne, playerTwo, board);
			gameObj.getBoard().should.deep.equal(board);
		});
	});
});
