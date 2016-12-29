import * as test from 'tape';
import { Player } from '../../../src/model/player';

test('player.name', (assert: test.Test): void => {
	const playerName = 'Player Name';
	const playerObj = new Player(playerName);

	assert.equal(playerObj.name, playerName, 'returns the given name');
	assert.end();
});
