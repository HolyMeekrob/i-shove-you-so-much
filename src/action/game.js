"use strict";
const ramda_1 = require('ramda');
const util_1 = require('./util');
const prediction_1 = require('./prediction');
const action_1 = require('./move/action');
const action_2 = require('./shove/action');
const validation_1 = require('./move/validation');
const validation_2 = require('./shove/validation');
const floor_1 = require('../model/floor');
const game_1 = require('../model/game');
const gameBoard_1 = require('../model/gameBoard');
const isTokenPositionInPit = ramda_1.curry((game, tp) => util_1.getFloorAt(game, tp.position) === floor_1.Floor.Pit);
const hasTokenInPit = (game) => ramda_1.any(isTokenPositionInPit(game), game.getGameBoard().getTokenPositions());
const isPlayerStuck = ramda_1.curry((game) => {
    return ramda_1.isEmpty(prediction_1.getAllPossibleTurnOutcomesForCurrentPlayer(game));
});
const isGameOver = (game) => ramda_1.lift(ramda_1.or)(hasTokenInPit, isPlayerStuck)(game);
const getGameWithGameOver = (game) => new game_1.Game(game.getPlayerOne(), game.getPlayerTwo(), game.getGameBoard(), game.getRules(), game.getTurn(), game.getMovesRemaining(), isGameOver(game));
exports.move = ramda_1.curry((game, pos, dir, spaces) => {
    if (!validation_1.validateMove(game, pos, dir, spaces)) {
        throw new Error('Invalid move');
    }
    const newBoard = new gameBoard_1.GameBoard(game.getGameBoard().getBoard(), ...action_1.getMoveResults(game, pos, dir, spaces));
    return getGameWithGameOver(new game_1.Game(game.getPlayerOne(), game.getPlayerTwo(), newBoard, game.getRules(), game.getTurn(), game.getMovesRemaining() - 1));
});
exports.shove = (game, pos, dir) => {
    if (!validation_2.validateShove(game, pos, dir)) {
        throw new Error('Invalid shove');
    }
    const newBoard = new gameBoard_1.GameBoard(game.getGameBoard().getBoard(), ...action_2.getShoveResults(game, pos, dir));
    return getGameWithGameOver(new game_1.Game(game.getPlayerOne(), game.getPlayerTwo(), newBoard, game.getRules(), util_1.getNextPlayerTurn(game.getTurn())));
};
