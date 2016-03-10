import test from 'tape';
import { Board } from '../../../src/model/board';
import { Position } from '../../../src/model/position';

test('board() with no arguments', (assert) => {
	assert.throws(() => board(), 'throws an error');
	assert.end();
});

test('board() with a null argument', (assert) => {
	assert.throws(() => board(null), 'throws an error');
	assert.end();
});

test('board() with a non-array', (assert) => {
	assert.throws(() => board(1), 'throws an error');
	assert.end();
});

test('board() with a non-two-dimensional array', (assert) => {
	assert.throws(() => board([[], 1]), 'throws an error');
	assert.end();
});

test('board.getSquares()', (assert) => {
	const squares = [
		['one', 'two', 'three'],
		['four', 'five', 'six']
	];

	const b = new Board(squares);

	assert.deepEqual(b.getSquares(), squares, 'returns the given squares');
	assert.end();
});

test('board.getSquareAt() for an invalid position', (assert) => {
	const squares = [
		['one', 'two', 'three'],
		['four', 'five', 'six']
	];
	const b = new Board(squares);
	const x = 2;
	const y = 5;
	const p = new Position(x, y);

	assert.throws(() => b.getSquareAt(p), 'throws an error');
	assert.end();
});

test('board.getSquareAt() for a valid position', (assert) => {
	const squares = [
		['one', 'two', 'three'],
		['four', 'five', 'six']
	];
	const b = new Board(squares);
	const x = 1;
	const y = 2;
	const p = new Position(x, y);

	assert.equal(b.getSquareAt(p), squares[x][y],
		'returns the square at that position');
	assert.end();
});
