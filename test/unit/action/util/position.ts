import * as test from 'tape';

import { getNextPosition } from '../../../../src/util/position';

import { Direction } from '../../../../src/model/direction';
import { Position } from '../../../../src/model/position';

test('util.getNextPosition for north', (assert: test.Test): void => {
	const x = 5;
	const y = 3;
	const pos = new Position(x, y);
	const expected = new Position(x, y + 1);

	assert.equal(getNextPosition(Direction.North, pos).equals(expected), true,
		'returns a point one place to the north');
	assert.end();
});

test('util.getNextPosition for east', (assert: test.Test): void => {
	const x = 5;
	const y = 3;
	const pos = new Position(x, y);
	const expected = new Position(x + 1, y);

	assert.equal(getNextPosition(Direction.East, pos).equals(expected), true,
		'returns a point one place to the east');
	assert.end();
});

test('util.getNextPosition for south', (assert: test.Test): void => {
	const x = 5;
	const y = 3;
	const pos = new Position(x, y);
	const expected = new Position(x, y - 1);

	assert.equal(getNextPosition(Direction.South, pos).equals(expected), true,
		'returns a point one place to the south');
	assert.end();
});

test('util.getNextPosition for west', (assert: test.Test): void => {
	const x = 5;
	const y = 3;
	const pos = new Position(x, y);
	const expected = new Position(x - 1, y);

	assert.equal(getNextPosition(Direction.West, pos).equals(expected), true,
		'returns a point one place to the west');
	assert.end();
});
