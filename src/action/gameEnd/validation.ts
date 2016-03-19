import { any, chain, curry, either, inc, isEmpty, tail, unnest } from 'ramda';
import {
	getFloorAt, getTokenPositionsForCurrentPlayer, iterateN, iterateWhile
} from '../util';

import { validateMove } from '../move/validation';
import { validateShove } from '../shove/validation';
import { shove } from '../shove/action';
import { move } from '../move/action';

import { Direction, getAllDirections } from '../../model/direction';
import { Floor } from '../../model/floor';
import { Game } from '../../model/game';
import { TokenPosition } from '../../model/tokenPosition';

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
curry((game: Game, tp: TokenPosition): Game[] =>
	unnest(getAllDirections().filter(validateShove(game, tp.position))
		.map(shove(game, tp.position))));

const getAllValidShoveOutcomes = curry((game: Game): Game[] =>
	chain(getAllValidShoveOutcomesForTokenPosition(game),
		getTokenPositionsForCurrentPlayer(game)));

const getAllPossibleMoveOutcomesForCurrentPlayer = (game: Game): Game[] =>
	unnest(iterateN(chain(getAllSingleMoveOutcomes), game.getMovesRemaining(), [game]));

const getAllPossibleTurnOutcomesForCurrentPlayer = (game: Game): Game[] =>
	unnest(getAllPossibleMoveOutcomesForCurrentPlayer(game).map(getAllValidShoveOutcomes));

const isTokenPositionInPit = curry((game: Game, tp: TokenPosition): boolean =>
	getFloorAt(game, tp.position) === Floor.Pit);

const hasTokenInPit = (game: Game): boolean =>
	any(isTokenPositionInPit(game), game.getGameBoard().getTokenPositions());

const isPlayerStuck = curry((game: Game): boolean =>
	isEmpty(getAllPossibleTurnOutcomesForCurrentPlayer(game)));

export const isGameOver: (game: Game) => boolean =
	either(hasTokenInPit, isPlayerStuck);
