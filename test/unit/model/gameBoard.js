import test from 'tape';
import { GameBoard } from '../../../src/model/gameBoard';
import { Position } from '../../../src/model/position';
import { TokenPosition } from '../../../src/model/tokenPosition';

test('gameBoard.getBoard()', (assert) => {
	const board = { squares: [] };
	const gb = new GameBoard(board, new TokenPosition({}, {}));

	assert.equal(gb.getBoard(), board, 'returns the board');
	assert.end();
});

test('gameBoard.hasTokenAt() for a position without a token', (assert) => {
	const board = { squares: [] };
	const x = 5;
	const y = 3;
	const tp = new TokenPosition({}, new Position(x, y));
	const gb = new GameBoard(board, tp);

	assert.equal(gb.hasTokenAt(new Position(x + 1, y)), false, 'return false');
	assert.end();
});

test('gameBoard.hasTokenAt() for a position with a token', (assert) => {
	const board = { squares: [] };
	const x1 = 5;
	const y1 = 3;
	const x2 = 2;
	const y2 = 2;
	const tp1 = new TokenPosition({}, new Position(x1, y1));
	const tp2 = new TokenPosition({}, new Position(x2, y2));

	const gb = new GameBoard(board, tp1, tp2);

	assert.equal(gb.hasTokenAt(new Position(x1, y1)), true, 'returns true');
	assert.end();
});

test('gameBoard.getTokenAt() for a position without a token', (assert) => {
	const board = { squares: [] };
	const x = 5;
	const y = 3;
	const tp = new TokenPosition({}, new Position(x, y));
	const gb = new GameBoard(board, tp);

	assert.equal(gb.getTokenAt(new Position(x + 1, y)), undefined, 'returns undefined');
	assert.end();
});

test('gameBoard.getTokenAt() for a position with a token', (assert) => {
	const board = { squares: [] };
	const x1 = 5;
	const y1 = 3;
	const x2 = 2;
	const y2 = 2;
	const token1 = { foo: 'bar' };
	const token2 = { foo: 'baz' };
	const tp1 = new TokenPosition(token1, new Position(x1, y1));
	const tp2 = new TokenPosition(token2, new Position(x2, y2));

	const gb = new GameBoard(board, tp1, tp2);

	assert.equal(gb.getTokenAt(new Position(x1, y1)), token1,
		'returns the token at the given position');
	assert.end();
});
