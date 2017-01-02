import { contains, curry, map } from 'ramda';
import { getTokenAt, hasTokenAt } from '../../util/game';
import { iterateWhile } from '../../util/iterate';
import { getNextPlayerTurn } from '../../util/playerType';
import { getNextPosition } from '../../util/position';
import { validateShove } from './validation';

import { Direction } from '../../model/direction';
import { Game } from '../../model/game';
import { GameBoard } from '../../model/gameBoard';
import { Position } from '../../model/position';
import { Token } from '../../model/token';
import { TokenPosition } from '../../model/tokenPosition';
import { TokenType } from '../../model/tokenType';

const getShovedTokens = (game: Game, pos: Position, dir: Direction): Token[] =>
	map(getTokenAt(game),
		iterateWhile<Position>(getNextPosition(dir), hasTokenAt(game), pos));

const getShoveResults =
curry((game: Game, pos: Position, dir: Direction): TokenPosition[] => {
	const shovedTokens = getShovedTokens(game, pos, dir);

	return game.gameBoard.getTokenPositions().map((tp: TokenPosition) => {
		// The former anchor reverts to a bully
		if (tp.token.tokenType === TokenType.Anchor) {
			return new TokenPosition(
				new Token(tp.token.playerType, TokenType.Bully),
				tp.position);
		}

		// The initiating bully becomes an anchor
		if (tp.position.equals(pos)) {
			return new TokenPosition(
				new Token(tp.token.playerType, TokenType.Anchor),
				getNextPosition(dir, tp.position));
		}

		// Shoved tokens get moved one square
		if (contains(tp.token, shovedTokens)) {
			return new TokenPosition(tp.token, getNextPosition(dir, tp.position));
		}

		// All other tokens are unaffected
		return tp;
	});
});

export const shove = curry((game: Game, pos: Position, dir: Direction): Game => {
	if (!validateShove(game, pos, dir)) {
		throw new Error('Invalid shove');
	}

	const newBoard = new GameBoard(game.gameBoard.board,
		...getShoveResults(game, pos, dir));

	return new Game(game.playerOne,
		game.playerTwo, newBoard, game.rules,
		getNextPlayerTurn(game.playerTurn));
});
