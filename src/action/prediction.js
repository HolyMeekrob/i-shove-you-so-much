"use strict";
const ramda_1 = require('ramda');
const util_1 = require('./util');
const validation_1 = require('./move/validation');
const validation_2 = require('./shove/validation');
const action_1 = require('./shove/action');
const game_1 = require('./game');
const direction_1 = require('../model/direction');
const getAllPossibleMoveAmountsForPositionDirection = ramda_1.curry((game, tp, dir) => ramda_1.tail(util_1.iterateWhile(ramda_1.inc, validation_1.validateMove(game, tp.position, dir), 0)));
const getAllPossibleMoveOutcomesForPositionDirection = ramda_1.curry((game, tp, dir) => getAllPossibleMoveAmountsForPositionDirection(game, tp, dir)
    .map(game_1.move(game, tp.position, dir)));
const getAllPossibleMoveOutcomesForTokenPosition = ramda_1.curry((game, tp) => ramda_1.chain(getAllPossibleMoveOutcomesForPositionDirection(game, tp), direction_1.getAllDirections()));
const getAllSingleMoveOutcomes = (game) => ramda_1.chain(getAllPossibleMoveOutcomesForTokenPosition(game), util_1.getTokenPositionsForCurrentPlayer(game));
const getAllValidShoveOutcomesForTokenPosition = ramda_1.curry((game, tp) => ramda_1.unnest(direction_1.getAllDirections().filter(validation_2.validateShove(game, tp.position))
    .map(action_1.getShoveResults(game, tp.position))));
const getAllValidShoveOutcomes = ramda_1.curry((game) => ramda_1.chain(getAllValidShoveOutcomesForTokenPosition(game), util_1.getTokenPositionsForCurrentPlayer(game)));
exports.getAllPossibleTurnOutcomesForCurrentPlayer = (game) => {
    const allMoveOutcomes = ramda_1.unnest(util_1.iterateN(ramda_1.chain(getAllSingleMoveOutcomes), game.getMovesRemaining(), [game]));
    return ramda_1.unnest(allMoveOutcomes.map(getAllValidShoveOutcomes));
};
