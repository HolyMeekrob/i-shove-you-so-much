import test from 'tape';
import token from '../../../src/model/token';
import * as pt from '../../../src/model/playerType';
import * as tt from '../../../src/model/tokenType';

test('token() without any arguments', (assert) => {
	assert.throws(() => token(), 'throws an error');
	assert.end();
});

test('token() without a player type', (assert) => {
	assert.throws(() => token(null, tt.BULLY), 'throws an error');
	assert.end();
});

test('token() without a token type', (assert) => {
	assert.throws(() => token(pt.PLAYER_ONE), 'throws an error');
	assert.end();
});

test('token.getPlayerType()', (assert) => {
	const player = pt.PLAYER_TWO;
	const tokenType = tt.BULLY;
	const gameToken = token(player, tokenType);

	assert.equal(gameToken.getPlayerType(), player, 'returns the player type');
	assert.end();
});

test('token.getTokenType()', (assert) => {
	const player = pt.PLAYER_ONE;
	const tokenType = tt.VICTIM;
	const gameToken = token(player, tokenType);

	assert.equal(gameToken.getTokenType(), tokenType, 'returns the token type');
	assert.end();
});
