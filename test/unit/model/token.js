import test from 'tape';
import { Token } from '../../../src/model/token';
import { PlayerType } from '../../../src/model/playerType';
import { TokenType } from '../../../src/model/tokenType';

test('token.getPlayerType()', (assert) => {
	const player = PlayerType.PlayerTwo;;
	const tokenType = TokenType.Bully;
	const gameToken = new Token(player, tokenType);

	assert.equal(gameToken.getPlayerType(), player, 'returns the player type');
	assert.end();
});

test('token.getTokenType()', (assert) => {
	const player = PlayerType.PlayerOne;
	const tokenType = TokenType.Victim;
	const gameToken = new Token(player, tokenType);

	assert.equal(gameToken.getTokenType(), tokenType, 'returns the token type');
	assert.end();
});
