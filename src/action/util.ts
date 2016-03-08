import { compose, curry, prop, unfold } from 'ramda';

import { Border } from '../model/border';
import { Direction } from '../model/direction';
import { Floor } from '../model/floor';
import { Game } from '../model/game';
import { Square } from '../model/square';
import { PlayerType } from '../model/playerType';
import { Position } from '../model/position';
import { Token } from '../model/token';
import { TokenPosition } from '../model/tokenPosition';

const getSquareAt = (game: Game, pos: Position): Square =>
	game.getGameBoard().getBoard().getSquareAt(pos);

const isTokenForPlayer = curry((player: PlayerType, token: Token): boolean =>
	token.getPlayerType() === player);

export const getBorderAt =
	curry((game: Game, pos: Position, dir: Direction): Border =>
		getSquareAt(game, pos).getBorder(dir));

export const getFloorAt = curry((game: Game, pos: Position): Floor =>
	getSquareAt(game, pos).getFloorType());

export const getNextPosition = curry((dir: Direction, pos: Position): Position => {
	switch (dir) {
		case Direction.North:
			return new Position(pos.x, pos.y + 1);
		case Direction.East:
			return new Position(pos.x + 1, pos.y);

		case Direction.South:
			return new Position(pos.x, pos.y - 1);

		case Direction.West:
			return new Position(pos.x - 1, pos.y);

		default:
			throw new Error('Invalid direction');
	}
});

export const getNextPlayerTurn = (currentTurn: PlayerType): PlayerType =>
	currentTurn === PlayerType.PlayerOne
		? PlayerType.PlayerTwo
		: PlayerType.PlayerOne;

export const getTokenPositionsForPlayer =
	curry((game: Game, playerTurn: PlayerType): TokenPosition[] =>
		game.getGameBoard().getTokenPositions().filter(
			compose(isTokenForPlayer(playerTurn), prop('token'))));

export const iterateWhile = <T>(fI: (a: T) => T, fV: (b: T) => boolean, seed: T): T[] =>
	unfold((val) => fV(val) ? [val, fI(val)] : false, seed);

export const iterateN = <T>(f: (a: T) => T, n: number, seed: T): T[] =>
	unfold((x) =>
		x.count < n ? [x.val, { count: x.count + 1, val: f(x.val) }] : false,
		{ count: 0, val: seed });
