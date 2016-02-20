import { and, complement, converge, curry, find, isNil, prepend } from 'ramda';
import {
	getBorderAt, getFloorAt, getNextPosition, isTokenForCurrentPlayer, iterate
} from './util';

import * as floor from '../model/floor';
import * as border from '../model/border';
import gameBoard from '../model/gameBoard';
import tokenPosition from '../model/tokenPosition';

const getFinalPosition = (dir, spaces, position) => {
	return iterate(curry(getNextPosition)(dir), spaces, position);
};

const hasEmptyPath = (game, dir, pos, spacesRemaining) => {
	if (game.hasTokenAt(pos)) {
		return false;
	}

	if (getFloorAt(pos, game) === floor.PIT) {
		return false;
	}

	if (spacesRemaining === 0) {
		return true;
	}

	if (getBorderAt(pos, game, dir) === border.WALL_BORDER) {
		return false;
	}

	return hasEmptyPath(game, dir, getNextPosition(dir, pos), spacesRemaining - 1);
};

const validateMove = (game, dir, pos, spaces) => {
	if (spaces < 1) {
		return false;
	}

	if (!game.hasTokenAt(pos)) {
		return false;
	}

	const tokenToMove = game.getTokenAt(pos);
	const isMoveableToken = converge(and,
		[complement(isNil), isTokenForCurrentPlayer(game)]);

	return isMoveableToken(tokenToMove) && hasEmptyPath(game, dir, pos, spaces - 1);
};

const getTokenPositionsAfterMove = (dir, pos, spaces, game) => {
	const hasPosition = (tp) =>
		tp.position.x === pos.x && tp.position.y === pos.y;

	const movedToken = find(hasPosition, game.getTokenPositions());
	const newPosition = getFinalPosition(dir, spaces, movedToken.position);

	return game.getTokenPositions().filter(complement(hasPosition))
		.concat(tokenPosition(movedToken.token, newPosition));
};

export default(dir, pos, spaces, game) => {
	if (!validateMove(dir, pos, spaces, game)) {
		throw new Error('Invalid move');
	}

	const newBoard = gameBoard(undefined, ...prepend(
		game.getGameBoard().getBoard(),
		getTokenPositionsAfterMove(dir, pos, spaces, game)));

	return game(game.getPlayerOne(), game.getPlayerTwo(),
		newBoard, game.getTurn(), game.getMovesRemaining() - 1);
};
