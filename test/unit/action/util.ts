import * as test from 'tape';

import {
	isTokenForPlayer, getNextPosition,
	getNextPlayerTurn, getTokenPositionsForCurrentPlayer, iterateWhile, iterateN
} from '../../../src/action/util';

import { Board } from '../../../src/model/board';
import { Direction } from '../../../src/model/direction';
import { Game } from '../../../src/model/game';
import { GameBoard } from '../../../src/model/gameBoard';
import { PlayerType } from '../../../src/model/playerType';
import { Position } from '../../../src/model/position';
import { Ruleset } from '../../../src/model/ruleset';
import { Token } from '../../../src/model/token';
import { TokenPosition } from '../../../src/model/tokenPosition';
import { TokenType } from '../../../src/model/tokenType';

test('util.isTokenForPlayer() given the token for the given player',	(assert: test.Test): void => {
	const player = PlayerType.PlayerTwo;

	const token = new Token(player, TokenType.Bully);

	assert.equal(isTokenForPlayer(player, token), true, 'returns true');
	assert.end();
});

test('util.isTokenForPlayer() given a token for a different player', (assert: test.Test): void => {
	const token = new Token(PlayerType.PlayerTwo, TokenType.Bully);

	assert.equal(isTokenForPlayer(PlayerType.PlayerOne, token), false, 'returns false');
	assert.end();
});

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

test('util.getNextPlayerTurn() given player one', (assert: test.Test): void => {
	assert.equal(getNextPlayerTurn(PlayerType.PlayerOne), PlayerType.PlayerTwo,
		'returns player two');
	assert.end();
});

test('util.getNextPlayerTurn() given player two', (assert: test.Test): void => {
	assert.equal(getNextPlayerTurn(PlayerType.PlayerTwo), PlayerType.PlayerOne,
		'returns player one');
	assert.end();
});

test('util.getTokenPositionsForCurrentPlayer()', (assert: test.Test): void => {
	const playerOneTokenPositionOne = new TokenPosition(
		new Token(PlayerType.PlayerOne, TokenType.Bully),
		new Position(1, 2));

	const playerOneTokenPositionTwo = new TokenPosition(
		new Token(PlayerType.PlayerOne, TokenType.Bully),
		new Position(2, 3));

	const playerOneTokenPositionThree = new TokenPosition(
		new Token(PlayerType.PlayerOne, TokenType.Victim),
		new Position(3, 4));

	const playerTwoTokenPositionOne = new TokenPosition(
		new Token(PlayerType.PlayerTwo, TokenType.Bully),
		new Position(2, 1));

	const playerTwoTokenPositionTwo = new TokenPosition(
		new Token(PlayerType.PlayerTwo, TokenType.Bully),
		new Position(3, 2));

		const playerTwoTokenPositionThree = new TokenPosition(
		new Token(PlayerType.PlayerTwo, TokenType.Bully),
		new Position(4, 3));

	const tokenPositions = [
		playerOneTokenPositionOne,
		playerTwoTokenPositionOne,
		playerOneTokenPositionTwo,
		playerTwoTokenPositionTwo,
		playerOneTokenPositionThree,
		playerTwoTokenPositionThree
	];

	const game = new Game(null, null, new GameBoard(new Board(), ...tokenPositions),
	new Ruleset(2), PlayerType.PlayerOne);

	const result = getTokenPositionsForCurrentPlayer(game);
	assert.equal(result.length, 3, 'returns the correct number of player tokens');
	assert.equal(result.indexOf(playerOneTokenPositionOne) > -1, true,
		'includes every token for givenPlayer');
	assert.equal(result.indexOf(playerOneTokenPositionTwo) > -1, true,
		'includes every token for givenPlayer');
	assert.equal(result.indexOf(playerOneTokenPositionThree) > -1, true,
		'includes every token for givenPlayer');
	assert.end();
});

test('util.iterateWhile()', (assert: test.Test): void => {
	const addOne = (x: number) => x + 1;
	const isLessThanTen = (x: number) => x < 10;
	const seed: number = 5;

	assert.deepEqual(iterateWhile(addOne, isLessThanTen, seed), [5, 6, 7, 8, 9],
		'returns an array beginning with the seed and iterating on the returned value until the iterate function returns false');
	assert.end();
});

test('util.iterateN()', (assert: test.Test): void => {
	const double = (x: number) => x * 2;
	const n: number = 6;
	const seed: number = 7;

	assert.deepEqual(iterateN(double, n, seed), [7, 14, 28, 56, 112, 224],
		'returns an array beginning with the seed and iterating on the returned value n times');
	assert.end();
});
