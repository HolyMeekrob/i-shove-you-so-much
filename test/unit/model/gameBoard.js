import test from 'tape';
import gameBoard from '../../../src/model/gameBoard';
import position from '../../../src/model/position';
import tokenPosition from '../../../src/model/tokenPosition';

test('gameBoard() with no arguments', (assert) => {
	assert.throws(() => gameBoard(), 'throws an error');
	assert.end();
});

test('gameBoard() without a board', (assert) => {
	assert.throws(() => gameBoard(null, tokenPosition(1, 0)), 'throws an error');
	assert.end();
});

test('gameBoard() without token positions', (assert) => {
	assert.throws(() => gameBoard({}), 'throws an error');
	assert.end();
});

test('gameBoard.getBoard()', (assert) => {
	const board = { squares: [] };
	const gb = gameBoard(board, tokenPosition(0, 1));

	assert.equal(gb.getBoard(), board, 'returns the board');
	assert.end();
});

test('gameBoard.hasTokenAt() for a position without a token', (assert) => {
	const board = { squares: [] };
	const x = 5;
	const y = 3;
	const tp = tokenPosition({}, position(x, y));
	const gb = gameBoard(board, tp);

	assert.equal(gb.hasTokenAt(x + 1, y), false, 'return false');
	assert.end();
});

test('gameBoard.hasTokenAt() for a position with a token', (assert) => {
	const board = { squares: [] };
	const x1 = 5;
	const y1 = 3;
	const x2 = 2;
	const y2 = 2;
	const tp1 = tokenPosition({}, position(x1, y1));
	const tp2 = tokenPosition({}, position(x2, y2));

	const gb = gameBoard(board, tp1, tp2);

	assert.equal(gb.hasTokenAt(position(x1, y1)), true, 'returns true');
	assert.end();
});

test('gameBoard.getTokenAt() for a position without a token', (assert) => {
	const board = { squares: [] };
	const x = 5;
	const y = 3;
	const tp = tokenPosition({}, position(x, y));
	const gb = gameBoard(board, tp);

	assert.equal(gb.getTokenAt(x + 1, y), undefined, 'returns undefined');
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
	const tp1 = tokenPosition(token1, position(x1, y1));
	const tp2 = tokenPosition(token2, position(x2, y2));

	const gb = gameBoard(board, tp1, tp2);

	assert.equal(gb.getTokenAt(position(x1, y1)), token1,
		'returns the token at the given position');
	assert.end();
});
