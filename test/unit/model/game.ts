import * as test from 'tape';
import { Board } from '../../../src/game/model/board';
import { Game } from '../../../src/game/model/game';
import { GameBoard } from '../../../src/game/model/gameBoard';
import { Player } from '../../../src/game/model/player';
import { PlayerType } from '../../../src/game/model/playerType';
import { Ruleset } from '../../../src/game/model/ruleset';

const getGameBoard = (): GameBoard =>
	new GameBoard(new Board());

test('game.playerOne', (assert: test.Test): void => {
	const playerOne = new Player('Player One', 0x0);
	const playerTwo = new Player('Player Two', 0xff);
	const gameBoard = getGameBoard();
	const game = new Game(playerOne, playerTwo, gameBoard);

	assert.equal(game.playerOne, playerOne,
		'returns the first player');
	assert.end();
});

test('game.playerTwo', (assert: test.Test): void => {
	const playerOne = new Player('Player One', 0x0);
	const playerTwo = new Player('Player Two', 0xff);
	const gameBoard = getGameBoard();
	const game = new Game(playerOne, playerTwo, gameBoard);

	assert.equal(game.playerTwo, playerTwo,
		'returns the second player');
	assert.end();
});

test('game.gameBoard', (assert: test.Test): void => {
	const playerOne = new Player('Player One', 0x0);
	const playerTwo = new Player('Player Two', 0xff);
	const gameBoard = getGameBoard();

	const game = new Game(playerOne, playerTwo, gameBoard);
	assert.equal(game.gameBoard, gameBoard,
		'returns the given game board');
	assert.end();
});

test('game.rules', (assert: test.Test): void => {
	const playerOne = new Player('Player One', 0x0);
	const playerTwo = new Player('Player Two', 0xff);
	const gameBoard = getGameBoard();
	const turn = PlayerType.PlayerOne;

	const movesPerTurn = 3;
	const rules = new Ruleset(movesPerTurn);

	const game = new Game(playerOne, playerTwo, gameBoard, rules, turn);

	assert.equal(game.rules, rules, 'returns the given ruleset');
	assert.end();
});

test('game.rules with no given ruleset', (assert: test.Test): void => {
	const playerOne = new Player('Player One', 0x0);
	const playerTwo = new Player('Player Two', 0xff);
	const gameBoard = getGameBoard();

	const defaultMovesPerTurn = 2;

	const game = new Game(playerOne, playerTwo, gameBoard);

	assert.equal(game.rules.movesPerTurn, defaultMovesPerTurn,
		'defaults to two moves per turn');
	assert.end();
});

test('game.getPlayerTurn()', (assert: test.Test): void => {
	const playerOne = new Player('Player One', 0x0);
	const playerTwo = new Player('Player Two', 0xff);
	const gameBoard = getGameBoard();
	const turn = PlayerType.PlayerTwo;

	const movesPerTurn = 3;
	const rules = new Ruleset(movesPerTurn);

	const game = new Game(playerOne, playerTwo, gameBoard, rules, turn);

	assert.equal(game.playerTurn, turn, 'returns the given turn');
	assert.end();
});

test('game.getPlayerTurn() with no given player turn', (assert: test.Test): void => {
	const playerOne = new Player('Player One', 0x0);
	const playerTwo = new Player('Player Two', 0xff);
	const gameBoard = getGameBoard();

	const game = new Game(playerOne, playerTwo, gameBoard);

	assert.equal(game.playerTurn, PlayerType.PlayerOne,
		'defaults to the first player');
	assert.end();
});

test('game.hasMovesRemaining() with no moves remaining', (assert: test.Test): void => {
	const playerOne = new Player('Player One', 0x0);
	const playerTwo = new Player('Player Two', 0xff);
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
	const playerOne = new Player('Player One', 0x0);
	const playerTwo = new Player('Player Two', 0xff);
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
	const playerOne = new Player('Player One', 0x0);
	const playerTwo = new Player('Player Two', 0xff);
	const gameBoard = getGameBoard();

	const game = new Game(playerOne, playerTwo, gameBoard);

	assert.equal(game.hasMovesRemaining(), true, 'returns true');
	assert.end();
});

test('game.getMovesRemaining() with a given number of used moves', (assert: test.Test): void => {
	const playerOne = new Player('Player One', 0x0);
	const playerTwo = new Player('Player Two', 0xff);
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
	const playerOne = new Player('Player One', 0x0);
	const playerTwo = new Player('Player Two', 0xff);
	const gameBoard = getGameBoard();
	const defaultNumberOfTurnsRemaining = 2;

	const game = new Game(playerOne, playerTwo, gameBoard);
	assert.equal(game.getMovesRemaining(), defaultNumberOfTurnsRemaining,
		'defaults to two');
	assert.end();
});
