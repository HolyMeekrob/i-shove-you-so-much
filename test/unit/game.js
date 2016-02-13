import game from '../../src/game.js';
import chai from 'chai';
const should = chai.should();

describe('game', () => {
	describe('#constructor', () => {
		describe('given all valid arguments', () => {
			it('should create a new game with two players', () => {
				const playerOne = {};
				const playerTwo = {};
				const board = {};
				const newGame = game(playerOne, playerTwo, board);

				newGame.should.exist;
				newGame.getPlayerOne().should.equal(playerOne);
				newGame.getPlayerTwo().should.equal(playerTwo);
				newGame.getBoard().should.equal(board);
			});
		});
	});
});
