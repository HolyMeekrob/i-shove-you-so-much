import test from 'tape';
import { Player } from '../../../src/model/player';

test('player.getName()', (assert) => {
	const playerName = 'Player Name';
	const playerObj = new Player(playerName);

	assert.equal(playerObj.getName(), playerName, 'returns the given name');
	assert.end();
});
