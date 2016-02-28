import test from 'tape';

import {
	getBorderAt, getFloorAt, isTokenForPlayer, isTokenForCurrentPlayer,
	getNextPosition, getNextPlayerTurn
} from '../../../src/action/util';

import * as direction from '../../../src/model/direction';
import * as playerType from '../../../src/model/playerType';

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

test('util.getNextPosition for north', (assert) => {
	const x = 5;
	const y = 3;
	const pos = { x, y };
	const expected = { x: 5, y: 4 };

	assert.equal(getNextPosition(direction.NORTH, pos).equals(expected), true,
		'returns a point one place to the north');
	assert.end();
});

test('util.getNextPosition for east', (assert) => {
	const x = 5;
	const y = 3;
	const pos = { x, y };
	const expected = { x: 6, y: 3 };

	assert.equal(getNextPosition(direction.EAST, pos).equals(expected), true,
		'returns a point one place to the east');
	assert.end();
});

test('util.getNextPosition for south', (assert) => {
	const x = 5;
	const y = 3;
	const pos = { x, y };
	const expected = { x: 5, y: 2 };

	assert.equal(getNextPosition(direction.SOUTH, pos).equals(expected), true,
		'returns a point one place to the south');
	assert.end();
});

test('util.getNextPosition for west', (assert) => {
	const x = 5;
	const y = 3;
	const pos = { x, y };
	const expected = { x: 4, y: 3 };

	assert.equal(getNextPosition(direction.WEST, pos).equals(expected), true,
		'returns a point one place to the west');
	assert.end();
});

test('util.getNextPlayerTurn() given player one', (assert) => {
	assert.equal(getNextPlayerTurn(playerType.PLAYER_ONE), playerType.PLAYER_TWO,
		'returns player two');
	assert.end();
});

test('util.getNextPlayerTurn() given player two', (assert) => {
	assert.equal(getNextPlayerTurn(playerType.PLAYER_TWO), playerType.PLAYER_ONE,
		'returns player one');
	assert.end();
});
