import * as sinon from 'sinon';
import * as test from 'tape';

import {
	getTokenPositions, getTokenPositionsForCurrentPlayer, isTokenForCurrentPlayer
} from '../../../../src/game/util/game';

import { Board } from '../../../../src/game/model/board';
import { Game } from '../../../../src/game/model/game';
import { GameBoard } from '../../../../src/game/model/gameBoard';
import { Player } from '../../../../src/game/model/Player';
import { PlayerType } from '../../../../src/game/model/playerType';
import { Position } from '../../../../src/game/model/position';
import { Ruleset } from '../../../../src/game/model/ruleset';
import { Token } from '../../../../src/game/model/token';
import { TokenPosition } from '../../../../src/game/model/tokenPosition';
import { TokenType } from '../../../../src/game/model/tokenType';

import { getSimpleGame } from '../../gameFactory';

test('getTokenPositions()', (assert: test.Test): void => {
	const tokenPositions = getTokenPositions(getSimpleGame());
	assert.equal(tokenPositions.length, 2, 'returns all token positions');
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

	const playerOne = new Player('Player One', 0x0);
	const playerTwo = new Player('Player Two', 0xff);
	const game = new Game(playerOne, playerTwo, new GameBoard(new Board(), ...tokenPositions),
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

test('isTokenForCurrentPlayer() given a different player\'s token', (assert: test.Test): void => {
	const game: Game = getSimpleGame(PlayerType.PlayerTwo);
	const token: Token = new Token(PlayerType.PlayerOne, TokenType.Bully);

	assert.equal(isTokenForCurrentPlayer(game, token), false, 'returns false');
	assert.end();
});

test('isTokenForCurrentPlayer() given the same player\'s token', (assert: test.Test): void => {
	const game = getSimpleGame(PlayerType.PlayerTwo);
	const token = new Token(PlayerType.PlayerTwo, TokenType.Bully);

	assert.equal(isTokenForCurrentPlayer(game, token), true, 'returns true');
	assert.end();
});
