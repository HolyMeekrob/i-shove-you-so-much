import game from '../../src/game';
import t from '../../src/turn';
import chai from 'chai';
const should = chai.should();

describe('game', () => {
	describe('getPlayerOne()', () => {
		it('should return player one', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const board = { };
			const turn = t.PLAYER_ONE;

			const gameObj = game(playerOne, playerTwo, board, turn);
			gameObj.getPlayerOne().should.deep.equal(playerOne);
		});
	});

	describe('getPlayerTwo()', () => {
		it('should return player two', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const board = { };
			const turn = t.GAME_OVER;

			const gameObj = game(playerOne, playerTwo, board, turn);
			gameObj.getPlayerTwo().should.deep.equal(playerTwo);
		});
	});

	describe('getBoard()', () => {
		it('should return the game board', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const board = { squares: [] };
			const turn = t.GAME_OVER;

			const gameObj = game(playerOne, playerTwo, board, turn);
			gameObj.getBoard().should.deep.equal(board);
		});
	});

	describe('getTurn()', () => {
		it('should return the current turn', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const board = { squares: [] };
			const turn = t.PLAYER_TWO;

			const gameObj = game(playerOne, playerTwo, board, turn);
			gameObj.getTurn().should.equal(turn);
		});

		it('should default to player one', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const board = { squares: [] };

			const gameObj = game(playerOne, playerTwo, board);
			gameObj.getTurn().should.equal(t.PLAYER_ONE);
		});
	});
});
