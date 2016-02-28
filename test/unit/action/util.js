import test from 'tape';

import {
	getBorderAt, getFloorAt, isTokenForPlayer, isTokenForCurrentPlayer
} from '../../../src/action/util';

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

test('util.isTokenForPlayer() given a token for the given player', (assert) => {
	const playerOne = 1;

	const token = {
		getPlayerType: () => playerOne
	}

	assert.equal(isTokenForPlayer(playerOne, token), true,
		'returns true');

	assert.end();
});

test('util.isTokenForPlayer() given a token for another player', (assert) => {
	const playerOne = 1;
	const playerTwo = 2;

	const token = {
		getPlayerType: () => playerOne
	}

	assert.equal(isTokenForPlayer(playerTwo, token), false, 'returns false');
	assert.end();
});

test('util.isTokenForCurrentPlayer() given one of the current player\'s token',
	(assert) => {
	const playerTwo = 2;

	const game = {
		getTurn: () => playerTwo
	};

	const token = {
		getPlayerType: () => playerTwo
	};

	assert.equal(isTokenForCurrentPlayer(game, token), true, 'returns true');
	assert.end();
});
test('util.isTokenForCurrentPlayer() given a token for a different player than the current player',
	(assert) => {
	const playerOne = 1;
	const playerTwo = 2;

	const game = {
		getTurn: () => playerOne
	};

	const token = {
		getPlayerType: () => playerTwo
	};

	assert.equal(isTokenForCurrentPlayer(game, token), false, 'returns false');
	assert.end();
});
