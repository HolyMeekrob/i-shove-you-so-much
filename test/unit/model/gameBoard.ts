import * as test from 'tape';
import { Board } from '../../../src/model/board';
import { GameBoard } from '../../../src/model/gameBoard';
import { PlayerType } from '../../../src/model/playerType';
import { Position } from '../../../src/model/position';
import { Token } from '../../../src/model/token';
import { TokenPosition } from '../../../src/model/tokenPosition';
import { TokenType } from '../../../src/model/tokenType';

test('new GameBoard() with invalid token positions', (assert: test.Test): void => {
	const board = new Board();
	const tokenPositions = [
		new TokenPosition(
			new Token(PlayerType.PlayerOne, TokenType.Bully),
			new Position(100, 100)),
		new TokenPosition(
			new Token(PlayerType.PlayerTwo, TokenType.Bully),
			new Position(0, 0))
	];
	assert.throws(() => new GameBoard(board, ...tokenPositions), 'throws an error');
	assert.end();
});

test('gameBoard.board', (assert: test.Test): void => {
	const board = new Board();
	const gb = new GameBoard(board);

	assert.equal(gb.board, board, 'returns the board');
	assert.end();
});

test('gameBoard.hasTokenAt() for a position without a token', (assert: test.Test): void => {
	const board = new Board();
	const x = 5;
	const y = 3;
	const tp = new TokenPosition(
		new Token(PlayerType.PlayerOne, TokenType.Bully), new Position(x, y));
	const gb = new GameBoard(board, tp);

	assert.equal(gb.hasTokenAt(new Position(x + 1, y)), false, 'return false');
	assert.end();
});

test('gameBoard.hasTokenAt() for a position with a token', (assert: test.Test): void => {
	const board = new Board();
	const x1 = 5;
	const y1 = 3;
	const x2 = 2;
	const y2 = 2;
	const tp1 = new TokenPosition(
		new Token(PlayerType.PlayerOne, TokenType.Bully), new Position(x1, y1));
	const tp2 = new TokenPosition(
		new Token(PlayerType.PlayerTwo, TokenType.Bully), new Position(x2, y2));

	const gb = new GameBoard(board, tp1, tp2);

	assert.equal(gb.hasTokenAt(new Position(x1, y1)), true, 'returns true');
	assert.end();
});

test('gameBoard.getTokenAt() for a position without a token', (assert: test.Test): void => {
	const board = new Board();
	const x = 5;
	const y = 3;
	const tp = new TokenPosition(
		new Token(PlayerType.PlayerOne, TokenType.Bully), new Position(x, y));
	const gb = new GameBoard(board, tp);

	assert.throws(() => gb.getTokenAt(new Position(x + 1, y)), 'throws an error');
	assert.end();
});

test('gameBoard.getTokenAt() for a position with a token', (assert: test.Test): void => {
	const board = new Board();
	const x1 = 5;
	const y1 = 3;
	const x2 = 2;
	const y2 = 2;
	const token1 = new Token(PlayerType.PlayerOne, TokenType.Bully);
	const token2 = new Token(PlayerType.PlayerTwo, TokenType.Bully);
	const tp1 = new TokenPosition(token1, new Position(x1, y1));
	const tp2 = new TokenPosition(token2, new Position(x2, y2));

	const gb = new GameBoard(board, tp1, tp2);

	assert.equal(gb.getTokenAt(new Position(x1, y1)), token1,
		'returns the token at the given position');
	assert.end();
});
