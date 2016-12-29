import { curry } from 'ramda';

import { Board } from '../model/board';
import { Border } from '../model/border';
import { Direction } from '../model/direction';
import { Game } from '../model/game';
import { GameBoard } from '../model/gameBoard';
import { Position } from '../model/position';
import { Square } from '../model/square';
import { Token } from '../model/token';
import { TokenPosition } from '../model/tokenPosition';

export const getGameBoard = (game: Game): GameBoard =>
	game.gameBoard;

export const getBoard = (game: Game): Board =>
	getGameBoard(game).board;

export const getTokenPositions = (game: Game): TokenPosition[] =>
	getGameBoard(game).getTokenPositions();

export const hasTokenAt = curry((game: Game, pos: Position): boolean =>
	getGameBoard(game).hasTokenAt(pos));

export const getTokenAt = curry((game: Game, pos: Position): Token =>
	getGameBoard(game).getTokenAt(pos));

export const getSquareAt = curry((game: Game, pos: Position): Square =>
	getBoard(game).getSquareAt(pos));

export const getFloorAt = curry((game: Game, pos: Position) =>
	getSquareAt(game, pos).floorType);

export const getBorderAt = curry((game: Game, pos: Position, dir: Direction): Border =>
	getSquareAt(game, pos).getBorder(dir));

export const isTokenForCurrentPlayer = curry((game: Game, token: Token) =>
	game.playerTurn === token.playerType);

export const isTokenPositionForCurrentPlayer = curry((game: Game, tp: TokenPosition) =>
	isTokenForCurrentPlayer(game, tp.token));

export const getTokenPositionsForCurrentPlayer = (game: Game): TokenPosition[] =>
	getTokenPositions(game).filter(isTokenPositionForCurrentPlayer(game));
