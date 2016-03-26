import * as test from 'tape';

import { getSimpleGame } from '../../gameFactory';
import { move } from '../../../../src/action/move/action';

import { Direction } from '../../../../src/model/direction';
import { Position } from '../../../../src/model/position';

test('move()', (assert: test.Test): void => {
	const game = getSimpleGame();
	const pos = new Position(1, 1);
	const result = move(game, pos, Direction.North, 1);

	const expectedDestination = new Position(1, 2);
	const otherTokenPosition = new Position(2, 2);

	assert.equal(result.getMovesRemaining(), game.getMovesRemaining() - 1,
		'decrements the moves remaining');
	assert.equal(result.getTurn(), game.getTurn(),
		'does not change the game\'s turn');
	assert.equal(result.getPlayerOne(), game.getPlayerOne(),
		'does not change the first player');
	assert.equal(result.getPlayerTwo(), game.getPlayerTwo(),
		'does not change the second player');
	assert.equal(result.getRules(), game.getRules(), 'does not change the rules');
	assert.equal(result.getGameBoard().hasTokenAt(expectedDestination), true,
		'moves the token to the expected position');
	assert.equal(result.getGameBoard().hasTokenAt(otherTokenPosition), true,
		'does not move the other tokens');
	assert.equal(result.getGameBoard().getTokenPositions().length, 2,
		'does not add or remove any tokens');
	assert.end();
});
