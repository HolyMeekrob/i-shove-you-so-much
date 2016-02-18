import { any, append, contains, curry, defaultTo } from 'ramda';

import * as tokenType from './model/tokenType';
import * as border from './model/border';
import * as direction from './model/direction';
import * as floor from './model/floor';
import * as turn from './model/turn';
import position from './model/position';
import gameBoard from './model/gameBoard';
import tokenPosition from './model/tokenPosition';

const getSquareAt = (pos, game) => {
	return game.getGameBoard().getBoard().getSquareAt(pos);
};

const getTokenAt = (pos, game) => {
	return game.getGameBoard().getTokenAt(pos);
};

const hasTokenAt = (pos, game) => {
	return game.getGameBoard().hasTokenAt(pos);
};

// TODO: Figure out a way to not have to call this so many times
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

const canPush = (dir, pos, game) => {
	if (getTokenAt(pos, game).getTokenType() === tokenType.ANCHOR) {
		return false;
	}

	if (getSquareAt(pos, game).getBorder(dir) === border.WALL_BORDER) {
		return false;
	}

	if (!hasTokenAt(pos, game)) {
		return true;
	}

	return canPush(dir, getNextPositionFn(dir)(pos), game);
};

const validatePush = (dir, pos, game) => {
	// Can not push an empty space
	if (!hasTokenAt(pos, game)) {
		return false;
	}

	// If the next space is empty, it's a move not a push
	const nextPosition = getNextPositionFn(dir)(pos);
	if (!hasTokenAt(nextPosition)) {
		return false;
	}

	const startingToken = getTokenAt(pos, game);

	// Can only push a bully
	if (startingToken.getTokenType() !== tokenType.BULLY
			// TODO: How to equate these two different types?
		|| startingToken.getPlayerType() !== game.getTurn()) {
		return false;
	}

	return canPush(dir, pos);
};

const getPushedTokens = (dir, pos, game, tokens) => {
	const pushed = defaultTo([], tokens);
	if (!hasTokenAt(pos, game)) {
		return pushed;
	}

	return getPushedTokens(dir, getNextPositionFn(dir)(pos), game,
		append(getTokenAt(pos, game), pushed));
};

const getTokenPositionsAfterPush = (dir, pos, game) => {
	const pushedTokens = getPushedTokens(dir, pos, game);
	return game.getGameBoard().getTokenPositions().map((tp) => {
		if (contains(tp.token, pushedTokens)) {
			return tokenPosition(tp.token, getNextPositionFn(dir)(tp.position));
		}
		return tp;
	});
};

const isTokenPositionInPit = (game, tp) => {
	return getSquareAt(tp.position, game).getFloorType() === floor.PIT;
};

const hasTokenInPit = (game) => any(curry(isTokenPositionInPit)(game),
	game.getGameBoard().getTokenPositions());

const isCurrentPlayerStuck = (playerTurn, game) => {
	// TODO: Implement me

};

const isGameOver = (playerTurn, game) => {
	return hasTokenInPit(game)
		|| isCurrentPlayerStuck(playerTurn, game);
};

const getNextPlayerTurn = (currentTurn) => {
	return currentTurn === turn.PLAYER_ONE_TURN
		? turn.PLAYER_TWO_TURN
		: turn.PLAYER_ONE_TURN;
};

export default (game, dir, pos) => {
	if (!validatePush(dir, pos, game)) {
		throw new Error('Invalid move');
	}

	const newBoard = gameBoard(
		game.getGameBoard().getBoard(),
		getTokenPositionsAfterPush(dir, pos, game));

	const nextPlayerTurn = getNextPlayerTurn(game.getTurn());

	const nextTurn = isGameOver(nextPlayerTurn, game)
		? turn.GAME_OVER
		: nextPlayerTurn;

	return game(game.getPlayerOne(), game.getPlayerTwo(), newBoard, nextTurn);
};
