import test from 'tape';

import { getBorderAt, getFloorAt } from '../../../src/action/util';

test('util.getBorderAt()', (assert) => {
	const position = {};
	const border = {};
	const direction = {};

	const square = {
		getBorder: (dir) => {
			if (dir === direction) {
				return border;
			}
			throw new Error('Invalid argument');
		}
	}

	const game = {
		getSquareAt: (pos) => {
			if (pos === position) {
				return square;
			}
			throw new Error('Invalid argument');
		}
	};

	assert.equal(getBorderAt(game, direction, position), border,
		'returns the border at the square at that position and in that direction');
	assert.end();
});

test('util.getFloorAt()', (assert) => {
	const position = {};
	const floor = {};

	const square = {
		getFloorType: () => floor
	};

	const game = {
		getSquareAt: (pos) => {
			if (pos === position) {
				return square;
			}
			throw new Error('Invalid argument');
		}
	};

	assert.equal(getFloorAt(game, position), floor,
		'returns the floor at the square at that position');
	assert.end();
});