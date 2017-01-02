import * as test from 'tape';

import { move } from '../../../../src/game/action/move/action';
import { getSimpleGame } from '../../gameFactory';

import { Direction } from '../../../../src/game/model/direction';
import { Position } from '../../../../src/game/model/position';

test('move()', (assert: test.Test): void => {
	const game = getSimpleGame();
	const pos = new Position(1, 1);
	const result = move(game, pos, Direction.North, 1);

	const expectedDestination = new Position(1, 2);
	const otherTokenPosition = new Position(2, 2);

	assert.equal(result.getMovesRemaining(), game.getMovesRemaining() - 1,
		'decrements the moves remaining');
	assert.equal(result.playerTurn, game.playerTurn,
		'does not change the game\'s turn');
	assert.equal(result.playerOne, game.playerOne,
		'does not change the first player');
	assert.equal(result.playerTwo, game.playerTwo,
		'does not change the second player');
	assert.equal(result.rules, game.rules, 'does not change the rules');
	assert.equal(result.gameBoard.hasTokenAt(expectedDestination), true,
		'moves the token to the expected position');
	assert.equal(result.gameBoard.hasTokenAt(otherTokenPosition), true,
		'does not move the other tokens');
	assert.equal(result.gameBoard.getTokenPositions().length, 2,
		'does not add or remove any tokens');
	assert.end();
});
