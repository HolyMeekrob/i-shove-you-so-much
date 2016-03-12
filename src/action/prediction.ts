import { any, chain, curry, inc, isEmpty, lift, or, tail, unnest } from 'ramda';
import {
	getFloorAt, getTokenPositionsForCurrentPlayer, iterateN, iterateWhile
} from './util';

import { validateMove } from './move/validation';
import { validateShove } from './shove/validation';
import { getShoveResults } from './shove/action';
import { move } from './game';

import { Direction, getAllDirections } from '../model/direction';
import { Floor } from '../model/floor';
import { Game } from '../model/game';
import { TokenPosition } from '../model/tokenPosition';

const getAllPossibleMoveAmountsForPositionDirection =
	curry((game: Game, tp: TokenPosition, dir: Direction): number[] =>
		tail(iterateWhile(inc, validateMove(game, tp.position, dir), 0)));

const getAllPossibleMoveOutcomesForPositionDirection =
curry((game: Game, tp: TokenPosition, dir: Direction): Game[] =>
	getAllPossibleMoveAmountsForPositionDirection(game, tp, dir)
		.map(move(game, tp.position, dir)));

const getAllPossibleMoveOutcomesForTokenPosition =
curry((game: Game, tp: TokenPosition): Game[] =>
	chain(getAllPossibleMoveOutcomesForPositionDirection(game, tp),
		getAllDirections()));

const getAllSingleMoveOutcomes = (game: Game): Game[] =>
	chain(getAllPossibleMoveOutcomesForTokenPosition(game),
		getTokenPositionsForCurrentPlayer(game));

const getAllValidShoveOutcomesForTokenPosition =
curry((game: Game, tp: TokenPosition): TokenPosition[] =>
	unnest(getAllDirections().filter(validateShove(game, tp.position))
		.map(getShoveResults(game, tp.position))));

const getAllValidShoveOutcomes = curry((game: Game): TokenPosition[] =>
	chain(getAllValidShoveOutcomesForTokenPosition(game),
		getTokenPositionsForCurrentPlayer(game)));

const getAllPossibleTurnOutcomesForCurrentPlayer = (game: Game): TokenPosition[] => {
	const allMoveOutcomes = unnest(iterateN(
		chain(getAllSingleMoveOutcomes),
		game.getMovesRemaining(),
		[game]));

	return unnest(allMoveOutcomes.map(getAllValidShoveOutcomes));
};

const isTokenPositionInPit = curry((game: Game, tp: TokenPosition): boolean =>
	getFloorAt(game, tp.position) === Floor.Pit);

const hasTokenInPit = (game: Game): boolean =>
	any(isTokenPositionInPit(game), game.getGameBoard().getTokenPositions());

const isPlayerStuck = curry((game: Game): boolean =>
	isEmpty(getAllPossibleTurnOutcomesForCurrentPlayer(game)));

const isGameOver = (game: Game): boolean =>
	lift(or)(hasTokenInPit, isPlayerStuck)(game);

