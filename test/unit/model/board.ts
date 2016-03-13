import * as test from 'tape';
import { Board } from '../../../src/model/board';
import { Position } from '../../../src/model/position';
import { Square } from '../../../src/model/square';

const getSquares = (): Square[][] => [
		[new Square(), new Square(), new Square()],
		[new Square(), new Square(), new Square()]
	];

test('board.getSquares()', (assert: test.Test): void => {
	const squares = getSquares();
	const b = new Board(squares);

	assert.deepEqual(b.getSquares(), squares, 'returns the given squares');
	assert.end();
});

test('board.getSquareAt() for an invalid position', (assert: test.Test): void => {
	const squares = getSquares();

	const b = new Board(squares);
	const x = 2;
	const y = 5;
	const p = new Position(x, y);

	assert.throws(() => b.getSquareAt(p), 'throws an error');
	assert.end();
});

test('board.getSquareAt() for a valid position', (assert: test.Test): void => {
	const squares = getSquares();

	const b = new Board(squares);
	const x = 1;
	const y = 2;
	const p = new Position(x, y);

	assert.equal(b.getSquareAt(p), squares[x][y],
		'returns the square at that position');
	assert.end();
});
