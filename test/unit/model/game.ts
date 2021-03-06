import * as test from 'tape';
import { Board } from '../../../src/model/board';
import { Game } from '../../../src/model/game';
import { GameBoard } from '../../../src/model/gameBoard';
import { Player } from '../../../src/model/player';
import { PlayerType } from '../../../src/model/playerType';
import { Ruleset } from '../../../src/model/ruleset';

const getGameBoard = (): GameBoard =>
	new GameBoard(new Board());

test('game.getPlayerOne()', (assert: test.Test): void => {
	const playerOne = new Player('Player One');
	const playerTwo = new Player('Player Two');
	const gameBoard = getGameBoard();
	const game = new Game(playerOne, playerTwo, gameBoard);

	assert.equal(game.getPlayerOne(), playerOne,
		'returns the first player');
	assert.end();
});

test('game.getPlayerTwo()', (assert: test.Test): void => {
	const playerOne = new Player('Player One');
	const playerTwo = new Player('Player Two');
	const gameBoard = getGameBoard();
	const game = new Game(playerOne, playerTwo, gameBoard);

	assert.equal(game.getPlayerTwo(), playerTwo,
		'returns the second player');
	assert.end();
});

test('game.getGameBoard()', (assert: test.Test): void => {
	const playerOne = new Player('Player One');
	const playerTwo = new Player('Player Two');
	const gameBoard = getGameBoard();

	const game = new Game(playerOne, playerTwo, gameBoard);
	assert.equal(game.getGameBoard(), gameBoard,
		'returns the given game board');
	assert.end();
});

test('game.getRules()', (assert: test.Test): void => {
	const playerOne = new Player('Player One');
	const playerTwo = new Player('Player Two');
	const gameBoard = getGameBoard();
	const turn = PlayerType.PlayerOne;

	const movesPerTurn = 3;
	const rules = new Ruleset(movesPerTurn);

	const game = new Game(playerOne, playerTwo, gameBoard, rules, turn);

	assert.equal(game.getRules(), rules, 'returns the given ruleset');
	assert.end();
});

test('game.getRules() with no given ruleset', (assert: test.Test): void => {
	const playerOne = new Player('Player One');
	const playerTwo = new Player('Player Two');
	const gameBoard = getGameBoard();

	const defaultMovesPerTurn = 2;

	const game = new Game(playerOne, playerTwo, gameBoard);

	assert.equal(game.getRules().getMovesPerTurn(), defaultMovesPerTurn,
		'defaults to two moves per turn');
	assert.end();
});

test('game.getPlayerTurn()', (assert: test.Test): void => {
	const playerOne = new Player('Player One');
	const playerTwo = new Player('Player Two');
	const gameBoard = getGameBoard();
	const turn = PlayerType.PlayerTwo;

	const movesPerTurn = 3;
	const rules = new Ruleset(movesPerTurn);

	const game = new Game(playerOne, playerTwo, gameBoard, rules, turn);

	assert.equal(game.getTurn(), turn, 'returns the given turn');
	assert.end();
});

test('game.getPlayerTurn() with no given player turn', (assert: test.Test): void => {
	const playerOne = new Player('Player One');
	const playerTwo = new Player('Player Two');
	const gameBoard = getGameBoard();

	const game = new Game(playerOne, playerTwo, gameBoard);

	assert.equal(game.getTurn(), PlayerType.PlayerOne,
		'defaults to the first player');
	assert.end();
});

test('game.hasMovesRemaining() with no moves remaining', (assert: test.Test): void => {
	const playerOne = new Player('Player One');
	const playerTwo = new Player('Player Two');
	const gameBoard = getGameBoard();
	const turn = PlayerType.PlayerTwo;

	const movesPerTurn = 3;
	const rules = new Ruleset(movesPerTurn);
	const usedMoves = movesPerTurn;

	const game = new Game(playerOne, playerTwo, gameBoard, rules, turn, usedMoves);

	assert.equal(game.hasMovesRemaining(), false, 'returns false');
	assert.end();
});

test('game.hasMovesRemaining() with moves remaining', (assert: test.Test): void => {
	const playerOne = new Player('Player One');
	const playerTwo = new Player('Player Two');
	const gameBoard = getGameBoard();
	const turn = PlayerType.PlayerTwo;

	const movesPerTurn = 3;
	const rules = new Ruleset(movesPerTurn);
	const usedMoves = 2;

	const game = new Game(playerOne, playerTwo, gameBoard, rules, turn, usedMoves);

	assert.equal(game.hasMovesRemaining(), true, 'returns true');
	assert.end();
});

test('game.hasMovesRemaining() with all default values', (assert: test.Test): void => {
	const playerOne = new Player('Player One');
	const playerTwo = new Player('Player Two');
	const gameBoard = getGameBoard();

	const game = new Game(playerOne, playerTwo, gameBoard);

	assert.equal(game.hasMovesRemaining(), true, 'returns true');
	assert.end();
});

test('game.getMovesRemaining() with a given number of used moves', (assert: test.Test): void => {
	const playerOne = new Player('Player One');
	const playerTwo = new Player('Player Two');
	const gameBoard = getGameBoard();
	const turn = PlayerType.PlayerTwo;

	const movesPerTurn = 3;
	const rules = new Ruleset(movesPerTurn);
	const usedMoves = 2;

	const game = new Game(playerOne, playerTwo, gameBoard, rules, turn, usedMoves);

	assert.equal(game.getMovesRemaining(), movesPerTurn - usedMoves,
		'returns the correct number of moves');
	assert.end();
});

test('game.getMovesRemaining() without a given number of used moves', (assert: test.Test): void => {
	const playerOne = new Player('Player One');
	const playerTwo = new Player('Player Two');
	const gameBoard = getGameBoard();
	const defaultNumberOfTurnsRemaining = 2;

	const game = new Game(playerOne, playerTwo, gameBoard);
	assert.equal(game.getMovesRemaining(), defaultNumberOfTurnsRemaining,
		'defaults to two');
	assert.end();
});
