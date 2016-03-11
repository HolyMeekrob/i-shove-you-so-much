import { any, curry, isEmpty, lift, or } from 'ramda';
import { getFloorAt, getNextPlayerTurn } from './util';
import { getAllPossibleTurnOutcomesForCurrentPlayer } from './prediction';
import { getMoveResults } from './move/action';
import { getShoveResults } from './shove/action';
import { validateMove } from './move/validation';
import { validateShove } from './shove/validation';

import { Direction } from '../model/direction';
import { Floor } from '../model/floor';
import { Game } from '../model/game';
import { GameBoard } from '../model/gameBoard';
import { Position } from '../model/position';
import { TokenPosition } from '../model/tokenPosition';

const isTokenPositionInPit = curry((game: Game, tp: TokenPosition): boolean =>
	getFloorAt(game, tp.position) === Floor.Pit);

const hasTokenInPit = (game: Game): boolean =>
	any(isTokenPositionInPit(game), game.getGameBoard().getTokenPositions());

const isPlayerStuck = curry((game: Game): boolean => {
	return isEmpty(getAllPossibleTurnOutcomesForCurrentPlayer(game));
});

const isGameOver = (game: Game): boolean =>
	lift(or)(hasTokenInPit, isPlayerStuck)(game);

const getGameWithGameOver = (game: Game) =>
	new Game(game.getPlayerOne(), game.getPlayerTwo(), game.getGameBoard(),
		game.getRules(), game.getTurn(), game.getMovesRemaining(),
		isGameOver(game));

export const move =
curry((game: Game, pos: Position, dir: Direction, spaces: number): Game => {
	if (!validateMove(game, pos, dir, spaces)) {
		throw new Error('Invalid move');
	}

	const newBoard = new GameBoard(game.getGameBoard().getBoard(),
		...getMoveResults(game, pos, dir, spaces));

	return getGameWithGameOver(new Game(game.getPlayerOne(), game.getPlayerTwo(),
		newBoard, game.getRules(), game.getTurn(), game.getMovesRemaining() - 1));
});

export const shove = (game: Game, pos: Position, dir: Direction): Game => {
	if (!validateShove(game, pos, dir)) {
		throw new Error('Invalid shove');
	}

	const newBoard = new GameBoard(game.getGameBoard().getBoard(),
		...getShoveResults(game, pos, dir));

	return getGameWithGameOver(new Game(game.getPlayerOne(),
		game.getPlayerTwo(), newBoard, game.getRules(),
		getNextPlayerTurn(game.getTurn())));
};
