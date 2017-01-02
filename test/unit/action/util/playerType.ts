import * as test from 'tape';

import { getNextPlayerTurn, isTokenForPlayer }
	from '../../../../src/game/util/playertype';

import { PlayerType } from '../../../../src/game/model/playerType';
import { Token } from '../../../../src/game/model/token';
import { TokenType } from '../../../../src/game/model/tokenType';

test('util.isTokenForPlayer() given the token for the given player', (assert: test.Test): void => {
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
