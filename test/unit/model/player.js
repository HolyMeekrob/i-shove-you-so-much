import test from 'tape';
import player from '../../../src/model/player';

test('player() with no arguments', (assert) => {
	assert.throws(() => player(), 'throws an error');
	assert.end();
});

test('player.getName()', (assert) => {
	const playerName = 'Player Name';
	const playerObj = player(playerName);

	assert.equal(playerObj.getName(), playerName, 'returns the given name');
	assert.end();
});
