import test from 'tape';

import {
	getBorderAt, getFloorAt, isTokenForCurrentPlayer,
	getNextPosition, getNextPlayerTurn, getTokenPositionsForPlayer,
	iterateWhile, iterateN
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

	assert.equal(getBorderAt(game, position, direction), border,
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

test('util.iterateWhile()', (assert) => {
	const addOne = (x) => x + 1;
	const isLessThanTen = (x) => x < 10;
	const seed = 5;

	assert.deepEqual(iterateWhile(addOne, isLessThanTen, 5), [5, 6, 7, 8, 9],
		'returns an array beginning with the seed and iterating on the returned value until the iterate function returns false');
	assert.end();
});

test('util.iterateN()', (assert) => {
	const double = (x) => x * 2;
	const n = 6;
	const seed = 7;

	assert.deepEqual(iterateN(double, n, seed), [7, 14, 28, 56, 112, 224],
		'returns an array beginning with the seed and iterating on the returned value n times');
	assert.end();
});

test('util.getTokenPositionsForPlayer()', (assert) => {
	const playerOne = 1;
	const playerTwo = 2;

	const playerOneTokenPositionOne = {
		token: { getPlayerType: () => playerOne }
	};

	const playerOneTokenPositionTwo = {
		token: { getPlayerType: () => playerOne }
	};

	const playerOneTokenPositionThree = {
		token: { getPlayerType: () => playerOne }
	};

	const playerTwoTokenPositionOne = {
		token: { getPlayerType: () => playerTwo }
	};

	const playerTwoTokenPositionTwo = {
		token: { getPlayerType: () => playerTwo }
	};

	const tokenPositions = [
		playerOneTokenPositionOne,
		playerTwoTokenPositionOne,
		playerOneTokenPositionTwo,
		playerTwoTokenPositionTwo,
		playerOneTokenPositionThree
	];

	const game = {
		getTokenPositions: () => tokenPositions
	};

	const result = getTokenPositionsForPlayer(game, playerOne);
	assert.equal(result.length, 3, 'returns the correct number of player tokens');
	assert.equal(result.indexOf(playerOneTokenPositionOne) > -1, true,
		'includes every token for givenPlayer');
	assert.equal(result.indexOf(playerOneTokenPositionTwo) > -1, true,
		'includes every token for givenPlayer');
	assert.equal(result.indexOf(playerOneTokenPositionThree) > -1, true,
		'includes every token for givenPlayer');
	assert.end();
});