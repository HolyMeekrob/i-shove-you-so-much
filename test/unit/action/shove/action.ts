import * as test from 'tape';

import { getTokenAt } from '../../../../src/util/game';
import { getNextPlayerTurn } from '../../../../src/util/playerType';
import { shove } from '../../../../src/action/shove/action';
import { getThreeVersusThreeGame } from '../../gameFactory';

import { Direction } from '../../../../src/model/direction';
import { Position } from '../../../../src/model/position';
import { TokenType } from '../../../../src/model/tokenType';

test('shove()', (assert: test.Test): void => {
	const game = getThreeVersusThreeGame();
	const pos = new Position(4, 4);
	const dir = Direction.North;

	const result = shove(game, pos, dir);

	assert.equal(result.getTurn(), getNextPlayerTurn(game.getTurn()),
		'changes the player\'s turn');
	assert.equal(getTokenAt(result, new Position(4, 5)).getTokenType(),
		TokenType.Anchor, 'sets the moved token to the anchor');
	assert.equal(getTokenAt(result, new Position(2, 5)).getTokenType(),
		TokenType.Bully, 'sets the previous anchor to a bully');
	assert.equal(getTokenAt(result, new Position(4, 6)).getTokenType(),
		TokenType.Bully, 'moves the shoved tokens');
	assert.equal(getTokenAt(result, new Position(4, 7)).getTokenType(),
		TokenType.Victim,  'moves the shoved tokens');
	assert.end();
});
