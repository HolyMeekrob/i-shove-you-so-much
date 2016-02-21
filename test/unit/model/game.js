import test from 'tape';
import game from '../../../src/model/game';
import * as t from '../../../src/model/turn';

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
	const gameObj = game(playerOne, playerTwo, gameBoard);

	assert.equal(gameObj.getPlayerOne(), playerOne,
		'returns the first player');
	assert.end();
});

test('game.getPlayerTwo()', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();
	const gameObj = game(playerOne, playerTwo, gameBoard);

	assert.equal(gameObj.getPlayerTwo(), playerTwo,
		'returns the second player');
	assert.end();
});

test('game.getGameBoard()', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();

	const gameObj = game(playerOne, playerTwo, gameBoard);
	assert.equal(gameObj.getGameBoard(), gameBoard,
		'returns the given game board');
	assert.end();
});

test('game.getRules()', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();
	const turn = t.GAME_OVER;

	const movesPerTurn = 3;
	const rules = { getMovesPerTurn: () => movesPerTurn };

	const gameObj = game(playerOne, playerTwo, gameBoard, rules, turn);

	assert.equal(gameObj.getRules(), rules, 'returns the given ruleset');
	assert.end();
});

test('game.getRules() with no given ruleset', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();

	const defaultMovesPerTurn = 2;

	const gameObj = game(playerOne, playerTwo, gameBoard);

	assert.equal(gameObj.getRules() !== undefined && gameObj.getRules() !== null,
		true, 'defaults to a ruleset object');
	assert.equal(gameObj.getRules().getMovesPerTurn(), defaultMovesPerTurn,
		'defaults to two moves per turn');
	assert.end();
});

test('game.getPlayerTurn()', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();
	const turn = t.PLAYER_TWO_TURN;

	const movesPerTurn = 3;
	const rules = { getMovesPerTurn: () => movesPerTurn };

	const gameObj = game(playerOne, playerTwo, gameBoard, rules, turn);

	assert.equal(gameObj.getTurn(), turn, 'returns the given turn');
	assert.end();
});

test('game.getPlayerTurn() with no given player turn', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();

	const gameObj = game(playerOne, playerTwo, gameBoard);

	assert.equal(gameObj.getTurn(), t.PLAYER_ONE_TURN,
		'defaults to the first player');
	assert.end();
});

test('game.hasMovesRemaining() with no moves remaining', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();
	const turn = t.PLAYER_TWO_TURN;

	const movesPerTurn = 3;
	const rules = { getMovesPerTurn: () => movesPerTurn };
	const usedMoves = movesPerTurn;

	const gameObj = game(playerOne, playerTwo, gameBoard, rules, turn, usedMoves);

	assert.equal(gameObj.hasMovesRemaining(), false, 'returns false');
	assert.end();
});

test('game.hasMovesRemaining() with moves remaining', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();
	const turn = t.PLAYER_TWO_TURN;

	const movesPerTurn = 3;
	const rules = { getMovesPerTurn: () => movesPerTurn };
	const usedMoves = 2;

	const gameObj = game(playerOne, playerTwo, gameBoard, rules, turn, usedMoves);

	assert.equal(gameObj.hasMovesRemaining(), true, 'returns true');
	assert.end();
});

test('game.hasMovesRemaining() with all default values', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();

	const gameObj = game(playerOne, playerTwo, gameBoard);

	assert.equal(gameObj.hasMovesRemaining(), true, 'returns true');
	assert.end();
});

test('game.getMovesRemaining() with a given number of used moves', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();
	const turn = t.PLAYER_TWO_TURN;

	const movesPerTurn = 3;
	const rules = { getMovesPerTurn: () => movesPerTurn };
	const usedMoves = 2;

	const gameObj = game(playerOne, playerTwo, gameBoard, rules, turn, usedMoves);

	assert.equal(gameObj.getMovesRemaining(), movesPerTurn - usedMoves,
		'returns the correct number of moves');
	assert.end();
});

test('game.getMovesRemaining() without a given number of used moves', (assert) => {
	const playerOne = { name: 'Player One' };
	const playerTwo = { name: 'Player Two' };
	const gameBoard = getGameBoard();
	const defaultNumberOfTurnsRemaining = 2;

	const gameObj = game(playerOne, playerTwo, gameBoard);
	assert.equal(gameObj.getMovesRemaining(), defaultNumberOfTurnsRemaining,
		'defaults to two');
	assert.end();
});
