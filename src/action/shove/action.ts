import { contains, curry } from 'ramda';
import { getNextPlayerTurn, getNextPosition } from '../util';
import { validateShove } from './validation';

import { Direction } from '../../model/direction';
import { Game } from '../../model/game';
import { GameBoard } from '../../model/gameBoard';
import { Position } from '../../model/position';
import { Token } from '../../model/token';
import { TokenPosition } from '../../model/tokenPosition';
import { TokenType } from '../../model/tokenType';

const getShovedTokens =
(game: Game, pos: Position, dir: Direction, tokens: Token[] = []): Token[] => {
	if (!game.getGameBoard().hasTokenAt(pos)) {
		return tokens;
	}

	return getShovedTokens(game, getNextPosition(dir, pos), dir,
		tokens.concat(game.getGameBoard().getTokenAt(pos)));
};

const getShoveResults =
curry((game: Game, pos: Position, dir: Direction): TokenPosition[] => {
	const shovedTokens = getShovedTokens(game, pos, dir);

	return game.getGameBoard().getTokenPositions().map((tp: TokenPosition) => {
		// The former anchor reverts to a bully
		if (tp.token.getTokenType() === TokenType.Anchor) {
			return new TokenPosition(
				new Token(tp.token.getPlayerType(), TokenType.Bully),
				tp.position);
		}

		// The initiating bully becomes an anchor
		if (tp.position.equals(pos)) {
			return new TokenPosition(
				new Token(tp.token.getPlayerType(), TokenType.Anchor),
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

	const newBoard = new GameBoard(game.getGameBoard().getBoard(),
		...getShoveResults(game, pos, dir));

	return new Game(game.getPlayerOne(),
		game.getPlayerTwo(), newBoard, game.getRules(),
		getNextPlayerTurn(game.getTurn()));
});
