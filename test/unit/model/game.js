import game from '../../../src/model/game';
import * as t from '../../../src/model/turn';
import chai from 'chai';
const should = chai.should();

describe('game', () => {
	describe('getPlayerOne()', () => {
		it('should return player one', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const gameBoard = { };
			const turn = t.PLAYER_ONE_TURN;

			const gameObj = game(playerOne, playerTwo, gameBoard, turn);
			gameObj.getPlayerOne().should.equal(playerOne);
		});
	});

	describe('getPlayerTwo()', () => {
		it('should return player two', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const gameBoard = { };
			const turn = t.GAME_OVER;

			const gameObj = game(playerOne, playerTwo, gameBoard, turn);
			gameObj.getPlayerTwo().should.equal(playerTwo);
		});
	});

	describe('getGameBoard()', () => {
		it('should return the game board', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const gameBoard = { board: {} };
			const turn = t.GAME_OVER;

			const gameObj = game(playerOne, playerTwo, gameBoard, turn);
			gameObj.getGameBoard().should.equal(gameBoard);
		});
	});

	describe('getTurn()', () => {
		it('should return the current turn', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const gameBoard = { board: {} };
			const turn = t.PLAYER_TWO_TURN;

			const gameObj = game(playerOne, playerTwo, gameBoard, turn);
			gameObj.getTurn().should.equal(turn);
		});

		it('should default to player one', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const gameBoard = { board: {} };

			const gameObj = game(playerOne, playerTwo, gameBoard);
			gameObj.getTurn().should.equal(t.PLAYER_ONE_TURN);
		});
	});
});
