import { curry } from 'ramda';
import { getNextPlayerTurn } from './util';
import { getMoveResults } from './move/action';
import { getShoveResults } from './shove/action';
import { validateMove } from './move/validation';
import { validateShove } from './shove/validation';

import { Direction } from '../model/direction';
import { Game } from '../model/game';
import { GameBoard } from '../model/gameBoard';
import { Position } from '../model/position';

export const move =
curry((game: Game, pos: Position, dir: Direction, spaces: number): Game => {
	if (!validateMove(game, pos, dir, spaces)) {
		throw new Error('Invalid move');
	}

	const newBoard = new GameBoard(game.getGameBoard().getBoard(),
		...getMoveResults(game, pos, dir, spaces));

	return new Game(game.getPlayerOne(), game.getPlayerTwo(),
		newBoard, game.getRules(), game.getTurn(), game.getMovesRemaining() - 1);
});

export const shove = (game: Game, pos: Position, dir: Direction): Game => {
	if (!validateShove(game, pos, dir)) {
		throw new Error('Invalid shove');
	}

	const newBoard = new GameBoard(game.getGameBoard().getBoard(),
		...getShoveResults(game, pos, dir));

	return new Game(game.getPlayerOne(),
		game.getPlayerTwo(), newBoard, game.getRules(),
		getNextPlayerTurn(game.getTurn()));
};
