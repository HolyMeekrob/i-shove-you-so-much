import * as test from 'tape';
import { Board } from '../../../src/game/model/board';
import { Position } from '../../../src/game/model/position';
import { Square } from '../../../src/game/model/square';

const getSquares = (): Square[][] => [
		[new Square(), new Square(), new Square()],
		[new Square(), new Square(), new Square()]
	];

test('new Board() given an empty board', (assert: test.Test): void => {
	assert.throws(() => new Board([]), 'throws an error');
	assert.end();
});

test('new Board() given a non-rectangle', (assert: test.Test): void => {
	const squares = [[new Square(), new Square()], [new Square()]];
	assert.throws(() => new Board(squares), 'throws an error');
	assert.end();
});

test('board.squares', (assert: test.Test): void => {
	const squares = getSquares();
	const board = new Board(squares);

	assert.deepEqual(board.squares, squares, 'returns the given squares');
	assert.end();
});

test('board.hasSquareAt() for an invalid position', (assert: test.Test): void => {
	const squares = getSquares();
	const board = new Board(squares);
	const pos = new Position(5, 3);
	assert.equal(board.hasSquareAt(pos), false, 'returns false');
	assert.end();
});

test('board.hasSquareAt() for a valid position', (assert: test.Test): void => {
	const squares = getSquares();
	const board = new Board(squares);
	const pos = new Position(0, 0);
	assert.equal(board.hasSquareAt(pos), true, 'returns true');
	assert.end();
});

test('board.getSquareAt() for an invalid position', (assert: test.Test): void => {
	const squares = getSquares();

	const board = new Board(squares);
	const x = 2;
	const y = 5;
	const p = new Position(x, y);

	assert.throws(() => board.getSquareAt(p), 'throws an error');
	assert.end();
});

test('board.getSquareAt() for a valid position', (assert: test.Test): void => {
	const squares = getSquares();

	const board = new Board(squares);
	const x = 1;
	const y = 2;
	const p = new Position(x, y);

	assert.equal(board.getSquareAt(p), squares[x][y],
		'returns the square at that position');
	assert.end();
});
