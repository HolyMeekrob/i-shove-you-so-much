import { any, append, contains, curry, defaultTo, isEmpty } from 'ramda';

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

const getNextPosition = (dir, pos) => {
	switch (dir) {
		case direction.NORTH:
			return position(pos.x, pos.y + 1);

		case direction.EAST:
			return position(pos.x + 1, pos.y);

		case direction.SOUTH:
			return position(pos.x, pos.y - 1);

		case direction.WEST:
			return position(pos.x - 1, pos.y);

		default:
			throw new Error('Invalid direction');
	}
};

const canShove = (dir, pos, game) => {
	if (getTokenAt(pos, game).getTokenType() === tokenType.ANCHOR) {
		return false;
	}

	if (getSquareAt(pos, game).getBorder(dir) === border.WALL_BORDER) {
		return false;
	}

	if (!hasTokenAt(pos, game)) {
		return true;
	}

	return canShove(dir, getNextPosition(dir, pos), game);
};

const validateShove = (dir, pos, game) => {
	// Can not shove an empty space
	if (!hasTokenAt(pos, game)) {
		return false;
	}

	// If the next space is empty, it's a move not a shove
	const nextPosition = getNextPosition(dir, pos);
	if (!hasTokenAt(nextPosition)) {
		return false;
	}

	const startingToken = getTokenAt(pos, game);

	// Can only shove a bully
	if (startingToken.getTokenType() !== tokenType.BULLY
			// TODO: How to equate these two different types?
		|| startingToken.getPlayerType() !== game.getTurn()) {
		return false;
	}

	return canShove(dir, pos);
};

const getShovedTokens = (dir, pos, game, tokens) => {
	const shoved = defaultTo([], tokens);
	if (!hasTokenAt(pos, game)) {
		return shoved;
	}

	return getShovedTokens(dir, getNextPosition(dir, pos), game,
		append(getTokenAt(pos, game), shoved));
};

const getTokenPositionsAfterShove = (dir, pos, game) => {
	const shovedTokens = getShovedTokens(dir, pos, game);
	return game.getGameBoard().getTokenPositions().map((tp) => {
		if (contains(tp.token, shovedTokens)) {
			return tokenPosition(tp.token, getNextPosition(dir, tp.position));
		}
		return tp;
	});
};

const isTokenPositionInPit = (game, tp) => {
	return getSquareAt(tp.position, game).getFloorType() === floor.PIT;
};

const hasTokenInPit = (game) => any(curry(isTokenPositionInPit)(game),
	game.getGameBoard().getTokenPositions());

const getAllPossibleTurnOutcomesForPlayer = (playerTurn, game) => {

};

const isPlayerStuck = (playerTurn, game) => {
	return isEmpty(getAllPossibleTurnOutcomesForPlayer(playerTurn, game));
};

const isGameOver = (playerTurn, game) => {
	return hasTokenInPit(game)
		|| isPlayerStuck(playerTurn, game);
};

const getNextPlayerTurn = (currentTurn) => {
	return currentTurn === turn.PLAYER_ONE_TURN
		? turn.PLAYER_TWO_TURN
		: turn.PLAYER_ONE_TURN;
};

export default (game, dir, pos) => {
	if (!validateShove(dir, pos, game)) {
		throw new Error('Invalid move');
	}

	const newBoard = gameBoard(
		game.getGameBoard().getBoard(),
		getTokenPositionsAfterShove(dir, pos, game));

	const nextPlayerTurn = getNextPlayerTurn(game.getTurn());

	const nextTurn = isGameOver(nextPlayerTurn, game)
		? turn.GAME_OVER
		: nextPlayerTurn;

	return game(game.getPlayerOne(), game.getPlayerTwo(), newBoard, nextTurn);
};
