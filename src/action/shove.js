import {
	and, any, append, converge, contains, curry, defaultTo, isEmpty, prepend
}	from 'ramda';

import {
	getBorderAt, getFloorAt, getNextPosition, isTokenForCurrentPlayer
} from './util';

import * as tokenType from '../model/tokenType';
import * as border from '../model/border';
import * as floor from '../model/floor';
import * as turn from '../model/turn';
import gameBoard from '../model/gameBoard';
import tokenPosition from '../model/tokenPosition';

const canShove = (dir, pos, game) => {
	if (game.getTokenAt(game).getTokenType() === tokenType.ANCHOR) {
		return false;
	}

	if (getBorderAt(pos, game, dir) === border.WALL_BORDER) {
		return false;
	}

	if (!game.hasTokenAt(pos)) {
		return true;
	}

	return canShove(dir, getNextPosition(dir, pos), game);
};

const validateShove = (dir, pos, game) => {
	// Can not shove an empty space
	if (!game.hasTokenAt(pos)) {
		return false;
	}

	// If the next space is empty, it's a move not a shove
	const nextPosition = getNextPosition(dir, pos);
	if (!game.hasTokenAt(nextPosition)) {
		return false;
	}

	const tokenToShove = game.getTokenAt(pos);
	const isBully = (token) => token.getTokenType() === tokenType.BULLY;
	const isShoveableToken = converge(and, [isBully, isTokenForCurrentPlayer(game)]);

	return isShoveableToken(tokenToShove) && canShove(dir, pos);
};

const getShovedTokens = (dir, pos, game, tokens) => {
	const shoved = defaultTo([], tokens);
	if (!game.hasTokenAt(pos)) {
		return shoved;
	}

	return getShovedTokens(dir, getNextPosition(dir, pos), game,
		append(game.getTokenAt(pos), shoved));
};

const getTokenPositionsAfterShove = (dir, pos, game) => {
	const shovedTokens = getShovedTokens(dir, pos, game);
	return game.getTokenPositions().map((tp) => {
		if (contains(tp.token, shovedTokens)) {
			return tokenPosition(tp.token, getNextPosition(dir, tp.position));
		}
		return tp;
	});
};

const isTokenPositionInPit = (game, tp) => {
	return getFloorAt(tp.position, game) === floor.PIT;
};

const hasTokenInPit = (game) => any(curry(isTokenPositionInPit)(game),
	game.get.getTokenPositions());

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

	const newBoard = gameBoard(undefined, ...prepend(
		game.getGameBoard().getBoard(),
		getTokenPositionsAfterShove(dir, pos, game)));

	const nextPlayerTurn = getNextPlayerTurn(game.getTurn());

	const nextTurn = isGameOver(nextPlayerTurn, game)
		? turn.GAME_OVER
		: nextPlayerTurn;

	return game(game.getPlayerOne(), game.getPlayerTwo(), newBoard, nextTurn);
};
