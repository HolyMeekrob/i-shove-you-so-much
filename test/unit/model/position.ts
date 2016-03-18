import * as test from 'tape';
import { Position } from '../../../src/model/position';

test('new Position() with non-integers', (assert: test.Test): void => {
	assert.throws(() => new Position(1.5, 2.1), 'throws an error');
	assert.end();
});

test('new Position() with negative numbers', (assert: test.Test): void => {
	assert.throws(() => new Position(4, -1), 'throws an error');
	assert.end();
});

test('position.equals() without a matching x or y', (assert: test.Test): void => {
	const x1 = 1;
	const y1 = 2;
	const x2 = 11;
	const y2 = 22;

	const pos1 = new Position(x1, y1);
	const pos2 = new Position(x2, y2);

	assert.equal(pos1.equals(pos2), false, 'returns false');
	assert.end();
});

test('position.equals() without a matching x', (assert: test.Test): void => {
	const x1 = 1;
	const y = 2;
	const x2 = 11;

	const pos1 = new Position(x1, y);
	const pos2 = new Position(x2, y);

	assert.equal(pos1.equals(pos2), false, 'returns false');
	assert.end();
});

test('position.equals() without a matching y', (assert: test.Test): void => {
	const x = 1;
	const y1 = 2;
	const y2 = 22;

	const pos1 = new Position(x, y1);
	const pos2 = new Position(x, y2);

	assert.equal(pos1.equals(pos2), false, 'returns false');
	assert.end();
});

test('position.equals() with a matching x and y', (assert: test.Test): void => {
	const x = 1;
	const y = 2;

	const pos1 = new Position(x, y);
	const pos2 = new Position(x, y);

	assert.equal(pos1.equals(pos2), true, 'returns true');
	assert.end();
});
