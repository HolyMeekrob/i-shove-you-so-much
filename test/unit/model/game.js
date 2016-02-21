import game from '../../../src/model/game';
import * as t from '../../../src/model/turn';
import chai from 'chai';
const should = chai.should();

const getGameBoard = () => {
	return {
		getBoard: () => {
			return {
				getSquareAt: () => {
					return {};
				}
			};
		}
	};
};

describe('game', () => {
	describe('getPlayerOne()', () => {
		it('should return player one', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const gameBoard = getGameBoard();

			const gameObj = game(playerOne, playerTwo, gameBoard);
			gameObj.getPlayerOne().should.equal(playerOne);
		});
	});

	describe('getPlayerTwo()', () => {
		it('should return player two', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const gameBoard = getGameBoard();

			const gameObj = game(playerOne, playerTwo, gameBoard);
			gameObj.getPlayerTwo().should.equal(playerTwo);
		});
	});

	describe('getGameBoard()', () => {
		it('should return the game board', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const gameBoard = getGameBoard();

			const gameObj = game(playerOne, playerTwo, gameBoard);
			gameObj.getGameBoard().should.equal(gameBoard);
		});
	});

	describe('getRules()', () => {
		it('should return the rules', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const gameBoard = getGameBoard();
			const turn = t.GAME_OVER;

			const movesPerTurn = 3;
			const rules = { getMovesPerTurn: () => movesPerTurn };

			const gameObj = game(playerOne, playerTwo, gameBoard, rules, turn);
			gameObj.getRules().should.equal(rules);
			gameObj.getRules().getMovesPerTurn().should.equal(movesPerTurn);
		});

		it('should default to two moves per turn', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const gameBoard = getGameBoard();

			const defaultMovesPerTurn = 2;

			const gameObj = game(playerOne, playerTwo, gameBoard);
			gameObj.getRules().should.exist;
			gameObj.getRules().getMovesPerTurn().should.equal(defaultMovesPerTurn);
		});
	});

	describe('getTurn()', () => {
		it('should return the current turn', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const gameBoard = getGameBoard();
			const turn = t.PLAYER_TWO_TURN;

			const movesPerTurn = 3;
			const rules = { getMovesPerTurn: () => movesPerTurn };

			const gameObj = game(playerOne, playerTwo, gameBoard, rules, turn);
			gameObj.getTurn().should.equal(turn);
		});

		it('should default to player one', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const gameBoard = getGameBoard();

			const gameObj = game(playerOne, playerTwo, gameBoard);
			gameObj.getTurn().should.equal(t.PLAYER_ONE_TURN);
		});
	});

	describe('hasMovesRemaining()', () => {
		describe('when there are not moves remaining', () => {
			it('should return false', () => {
				const playerOne = { name: 'Player One' };
				const playerTwo = { name: 'Player Two' };
				const gameBoard = getGameBoard();
				const turn = t.PLAYER_TWO_TURN;

				const movesPerTurn = 3;
				const rules = { getMovesPerTurn: () => movesPerTurn };
				const usedMoves = movesPerTurn;

				const gameObj = game(playerOne, playerTwo, gameBoard, rules, turn, usedMoves);
				gameObj.hasMovesRemaining().should.be.false;
			});
		});

		describe('when there are moves remaining', () => {
			it('should return true', () => {
				const playerOne = { name: 'Player One' };
				const playerTwo = { name: 'Player Two' };
				const gameBoard = getGameBoard();
				const turn = t.PLAYER_TWO_TURN;

				const movesPerTurn = 3;
				const rules = { getMovesPerTurn: () => movesPerTurn };
				const usedMoves = 2;

				const gameObj = game(playerOne, playerTwo, gameBoard, rules, turn, usedMoves);
				gameObj.hasMovesRemaining().should.be.true;
			});
		});

		describe('when given the default', () => {
			it('should return true', () => {
				const playerOne = { name: 'Player One' };
				const playerTwo = { name: 'Player Two' };
				const gameBoard = getGameBoard();

				const gameObj = game(playerOne, playerTwo, gameBoard);
				gameObj.hasMovesRemaining().should.be.true;
			});
		});
	});

	describe('getMovesRemaining()', () => {
		it('should return the number of moves remaining', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const gameBoard = getGameBoard();
			const turn = t.PLAYER_TWO_TURN;

			const movesPerTurn = 3;
			const rules = { getMovesPerTurn: () => movesPerTurn };
			const usedMoves = 2;

			const gameObj = game(playerOne, playerTwo, gameBoard, rules, turn, usedMoves);
			gameObj.getMovesRemaining().should.equal(movesPerTurn - usedMoves);
		});

		it('should default to two', () => {
			const playerOne = { name: 'Player One' };
			const playerTwo = { name: 'Player Two' };
			const gameBoard = getGameBoard();

			const gameObj = game(playerOne, playerTwo, gameBoard);
			gameObj.getMovesRemaining().should.equal(2);
		});
	});
});
