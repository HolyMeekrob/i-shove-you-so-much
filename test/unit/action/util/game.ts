import * as test from 'tape';
import * as sinon from 'sinon';

import {
	getTokenPositions, getTokenPositionsForCurrentPlayer, isTokenForCurrentPlayer
} from '../../../../src/util/game';

import { Board } from '../../../../src/model/board';
import { Game } from '../../../../src/model/game';
import { GameBoard } from '../../../../src/model/gameBoard';
import { Player } from '../../../../src/model/Player';
import { PlayerType } from '../../../../src/model/playerType';
import { Position } from '../../../../src/model/position';
import { Ruleset } from '../../../../src/model/ruleset';
import { Token } from '../../../../src/model/token';
import { TokenPosition } from '../../../../src/model/tokenPosition';
import { TokenType } from '../../../../src/model/tokenType';

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

	const playerOne = new Player('Player One');
	const playerTwo = new Player('Player Two');
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
	const game: Game = getSimpleGame();
	const token: Token = new Token(PlayerType.PlayerOne, TokenType.Bully);
	sinon.stub(game, 'getTurn', () => PlayerType.PlayerTwo);

	assert.equal(isTokenForCurrentPlayer(game, token), false, 'returns false');
	assert.end();
});

test('isTokenForCurrentPlayer() given the same player\'s token', (assert: test.Test): void => {
	const game = getSimpleGame();
	const token = new Token(PlayerType.PlayerTwo, TokenType.Bully);
	sinon.stub(game, 'getTurn', () => PlayerType.PlayerTwo);

	assert.equal(isTokenForCurrentPlayer(game, token), true, 'returns true');
	assert.end();
});
