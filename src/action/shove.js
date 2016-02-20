import {
	and, any, append, converge, contains, curry, defaultTo, isEmpty
}	from 'ramda';

import {
	getBorderAt, getSquareAt, getNextPosition, getTokenAt,
	hasTokenAt, isTokenForCurrentPlayer
} from './util';

import * as tokenType from '../model/tokenType';
import * as border from '../model/border';
import * as floor from '../model/floor';
import * as turn from '../model/turn';
import gameBoard from '../model/gameBoard';
import tokenPosition from '../model/tokenPosition';

const canShove = (dir, pos, game) => {
	if (getTokenAt(pos, game).getTokenType() === tokenType.ANCHOR) {
		return false;
	}

	if (getBorderAt(pos, game, dir) === border.WALL_BORDER) {
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

	const tokenToShove = getTokenAt(pos, game);
	const isBully = (token) => token.getTokenType() === tokenType.BULLY;
	const isShoveableToken = converge(and, [isBully, isTokenForCurrentPlayer(game)]);

	return isShoveableToken(tokenToShove) && canShove(dir, pos);
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

export default (dir, pos, game) => {
	if (!validateShove(dir, pos, game)) {
		throw new Error('Invalid shove');
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
