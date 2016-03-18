import * as test from 'tape';
import { Ruleset } from '../../../src/model/ruleset';

test('ruleset.getMovesPerTurn()', (assert: test.Test): void => {
	const movesPerTurn = 5;
	const ruleset = new Ruleset(movesPerTurn);

	assert.equal(ruleset.getMovesPerTurn(), movesPerTurn,
		'returns the number of moves per turn');
	assert.end();
});
