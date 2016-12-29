import * as test from 'tape';
import { Ruleset } from '../../../src/model/ruleset';

test('ruleset.movesPerTurn', (assert: test.Test): void => {
	const movesPerTurn = 5;
	const ruleset = new Ruleset(movesPerTurn);

	assert.equal(ruleset.movesPerTurn, movesPerTurn,
		'returns the number of moves per turn');
	assert.end();
});
