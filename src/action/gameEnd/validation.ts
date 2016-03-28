import { any, chain, compose, curry, either, identical, inc, isEmpty, prop, tail, unnest } from 'ramda';
import { iterateN, iterateWhile } from '../../util/iterate';
import { getTokenPositionsForCurrentPlayer } from '../../util/game';
import { getFloorAt, getTokenPositions } from '../../util/game';

import { validateMove } from '../move/validation';
import { validateShove } from '../shove/validation';
import { shove } from '../shove/action';
import { move } from '../move/action';

import { Direction, getAllDirections } from '../../model/direction';
import { Floor } from '../../model/floor';
import { Game } from '../../model/game';
import { Position } from '../../model/position';
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

const getAllValidShoveOutcomes = (game: Game): Game[] =>
	chain(getAllValidShoveOutcomesForTokenPosition(game),
		getTokenPositionsForCurrentPlayer(game));

const getAllPossibleMoveOutcomesForCurrentPlayer = (game: Game): Game[] =>
	unnest(iterateN(chain(getAllSingleMoveOutcomes), game.getMovesRemaining(), [game]));

const getAllPossibleTurnOutcomesForCurrentPlayer = (game: Game): Game[] =>
	unnest(getAllPossibleMoveOutcomesForCurrentPlayer(game).map(getAllValidShoveOutcomes));

const isPit = identical(Floor.Pit);
const isPositionInPit = curry(compose(isPit, getFloorAt));
const getPosition: (tp: TokenPosition) => Position = prop<Position>('position');

const hasTokenInPit = (game: Game): boolean =>
	any(compose(isPositionInPit(game), getPosition), getTokenPositions(game));

const isPlayerStuck =
	compose(isEmpty, getAllPossibleTurnOutcomesForCurrentPlayer);

export const isGameOver: (game: Game) => boolean =
	either(hasTokenInPit, isPlayerStuck);
