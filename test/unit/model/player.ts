import * as test from 'tape';

import { Player } from '../../../src/game/model/player';

test('player.name', (assert: test.Test): void => {
	const playerName = 'Player Name';
	const color = 0xff;
	const playerObj = new Player(playerName, color);

	assert.equal(playerObj.name, playerName, 'returns the given name');
	assert.equal(playerObj.color, color, 'returns the given color');
	assert.end();
});
