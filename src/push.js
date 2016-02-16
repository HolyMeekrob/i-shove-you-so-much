import { all, any, append, curry, defaultTo } from 'ramda';

import * as tokenType from './model/tokenType';
import * as border from './model/border';
import * as direction from './model/direction';
import * as floor from './model/floor';
import * as turn from './model/turn';
import position from './model/position';
import gameBoard from './model/gameBoard';

const getSquareAt = (game, pos) => {
	return game.getGameBoard().getBoard().getSquareAt(pos);
};

const getTokenAt = (game, pos) => {
	return game.getGameBoard().getTokenAt(pos);
};

const hasTokenAt = (game, pos) => {
	return game.getGameBoard().hasTokenAt(pos);
};

const canPush = (game, dir, pos) => {
	const isNotAnchor = getTokenAt(game, pos).getTokenType() !== tokenType.ANCHOR;
	const hasOpenBorder = getSquareAt(game, pos).getBorder(dir) === border.OPEN_BORDER;

	return isNotAnchor && hasOpenBorder;
};

const getNextPositionFn = (dir) => {
	switch (dir) {
	case direction.NORTH:
		return (pos) => position(pos.x, pos.y + 1);

	case direction.EAST:
		return (pos) => position(pos.x + 1, pos.y);

	case direction.SOUTH:
		return (pos) => position(pos.x, pos.y - 1);

	case direction.WEST:
		return (pos) => position(pos.x - 1, pos.y);

	default:
		throw new Error('Invalid direction');
	}
};

const getLine = (game, nextPositionFn, pos, prepend) => {
	const line = defaultTo([], prepend);

	if (getSquareAt(game, pos).getFloorType() === floor.PIT) {
		return line;
	}

	if (!hasTokenAt(game, pos)) {
		return line;
	}

	return getLine(game, nextPositionFn(pos), nextPositionFn, append(pos, line));
};

const validatePush = (game, dir, pos) => {
	if (getTokenAt(game, pos).getTokenType() !== tokenType.BULLY) {
		return false;
	}

	const canPushInDirection = curry(canPush)(game, dir);
	const nextPositionFn = getNextPositionFn(dir);
	const line = getLine(game, nextPositionFn, pos);
	return line.length > 1 && all(canPushInDirection, line);
};

const getTokenPositionsAfterPush = (game, dir, pos) => {
	// TODO: Implement me
};

const isTokenPositionInPit = (gb, tokenPosition) => {
	return gb.getBoard().getSquareAt(tokenPosition.position).getFloorType() === floor.PIT;
};

const hasTokenInPit = (gb) => any(curry(isTokenPositionInPit), gb.getTokenPositions());

const isCurrentPlayerStuck = (gb, playerTurn) => {
	// TODO: Implement me
};

const isGameOver = (gb, playerTurn) => {
	return hasTokenInPit(gb)
		|| isCurrentPlayerStuck(gb, playerTurn);
};

const getNextPlayerTurn = (currentTurn) => {
	return currentTurn === turn.PLAYER_ONE_TURN
		? turn.PLAYER_TWO_TURN
		: turn.PLAYER_ONE_TURN;
};

export default (game, dir, pos) => {
	if (!validatePush(game, dir, pos)) {
		throw new Error('Invalid move');
	}

	const newBoard = gameBoard(
		game.getGameBoard().getBoard(),
		getTokenPositionsAfterPush(game, dir, pos));

	const nextPlayerTurn = getNextPlayerTurn(game.getTurn());

	const nextTurn = isGameOver(newBoard, nextPlayerTurn)
		? turn.GAME_OVER
		: nextPlayerTurn;

	return game(game.getPlayerOne(), game.getPlayerTwo(), newBoard, nextTurn);
};
