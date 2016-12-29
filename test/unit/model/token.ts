import * as test from 'tape';
import { PlayerType } from '../../../src/model/playerType';
import { Token } from '../../../src/model/token';
import { TokenType } from '../../../src/model/tokenType';

test('token.playerType', (assert: test.Test): void => {
	const player = PlayerType.PlayerTwo;
	const tokenType = TokenType.Bully;
	const gameToken = new Token(player, tokenType);

	assert.equal(gameToken.playerType, player, 'returns the player type');
	assert.end();
});

test('token.tokenType', (assert: test.Test): void => {
	const player = PlayerType.PlayerOne;
	const tokenType = TokenType.Victim;
	const gameToken = new Token(player, tokenType);

	assert.equal(gameToken.tokenType, tokenType, 'returns the token type');
	assert.end();
});
