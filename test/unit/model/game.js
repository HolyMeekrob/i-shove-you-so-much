import test from 'tape';
import { Game } from '../../../src/model/game';
import { PlayerType } from '../../../src/model/playerType';

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

test('game.getPlayerOne()', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();
	const game = new Game(playerOne, playerTwo, gameBoard);

	assert.equal(game.getPlayerOne(), playerOne,
		'returns the first player');
	assert.end();
});

test('game.getPlayerTwo()', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();
	const game = new Game(playerOne, playerTwo, gameBoard);

	assert.equal(game.getPlayerTwo(), playerTwo,
		'returns the second player');
	assert.end();
});

test('game.getGameBoard()', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();

	const game = new Game(playerOne, playerTwo, gameBoard);
	assert.equal(game.getGameBoard(), gameBoard,
		'returns the given game board');
	assert.end();
});

test('game.getRules()', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();
	const turn = PlayerType.PlayerOne;

	const movesPerTurn = 3;
	const rules = { getMovesPerTurn: () => movesPerTurn };

	const game = new Game(playerOne, playerTwo, gameBoard, rules, turn);

	assert.equal(game.getRules(), rules, 'returns the given ruleset');
	assert.end();
});

test('game.getRules() with no given ruleset', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();

	const defaultMovesPerTurn = 2;

	const game = new Game(playerOne, playerTwo, gameBoard);

	assert.equal(game.getRules() !== undefined && game.getRules() !== null,
		true, 'defaults to a ruleset object');
	assert.equal(game.getRules().getMovesPerTurn(), defaultMovesPerTurn,
		'defaults to two moves per turn');
	assert.end();
});

test('game.getPlayerTurn()', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();
	const turn = PlayerType.PlayerTwo;

	const movesPerTurn = 3;
	const rules = { getMovesPerTurn: () => movesPerTurn };

	const game = new Game(playerOne, playerTwo, gameBoard, rules, turn);

	assert.equal(game.getTurn(), turn, 'returns the given turn');
	assert.end();
});

test('game.getPlayerTurn() with no given player turn', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();

	const game = new Game(playerOne, playerTwo, gameBoard);

	assert.equal(game.getTurn(), PlayerType.PlayerOne,
		'defaults to the first player');
	assert.end();
});

test('game.hasMovesRemaining() with no moves remaining', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();
	const turn = PlayerType.PlayerTwo;

	const movesPerTurn = 3;
	const rules = { getMovesPerTurn: () => movesPerTurn };
	const usedMoves = movesPerTurn;

	const game = new Game(playerOne, playerTwo, gameBoard, rules, turn, usedMoves);

	assert.equal(game.hasMovesRemaining(), false, 'returns false');
	assert.end();
});

test('game.hasMovesRemaining() with moves remaining', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();
	const turn = PlayerType.PlayerTwo;

	const movesPerTurn = 3;
	const rules = { getMovesPerTurn: () => movesPerTurn };
	const usedMoves = 2;

	const game = new Game(playerOne, playerTwo, gameBoard, rules, turn, usedMoves);

	assert.equal(game.hasMovesRemaining(), true, 'returns true');
	assert.end();
});

test('game.hasMovesRemaining() with all default values', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();

	const game = new Game(playerOne, playerTwo, gameBoard);

	assert.equal(game.hasMovesRemaining(), true, 'returns true');
	assert.end();
});

test('game.getMovesRemaining() with a given number of used moves', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();
	const turn = PlayerType.PlayerTwo;

	const movesPerTurn = 3;
	const rules = { getMovesPerTurn: () => movesPerTurn };
	const usedMoves = 2;

	const game = new Game(playerOne, playerTwo, gameBoard, rules, turn, usedMoves);

	assert.equal(game.getMovesRemaining(), movesPerTurn - usedMoves,
		'returns the correct number of moves');
	assert.end();
});

test('game.getMovesRemaining() without a given number of used moves', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();
	const defaultNumberOfTurnsRemaining = 2;

	const game = new Game(playerOne, playerTwo, gameBoard);
	assert.equal(game.getMovesRemaining(), defaultNumberOfTurnsRemaining,
		'defaults to two');
	assert.end();
});
