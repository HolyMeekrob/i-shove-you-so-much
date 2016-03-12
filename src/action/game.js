"use strict";
const ramda_1 = require('ramda');
const util_1 = require('./util');
const action_1 = require('./move/action');
const action_2 = require('./shove/action');
const validation_1 = require('./move/validation');
const validation_2 = require('./shove/validation');
const game_1 = require('../model/game');
const gameBoard_1 = require('../model/gameBoard');
exports.move = ramda_1.curry((game, pos, dir, spaces) => {
    if (!validation_1.validateMove(game, pos, dir, spaces)) {
        throw new Error('Invalid move');
    }
    const newBoard = new gameBoard_1.GameBoard(game.getGameBoard().getBoard(), ...action_1.getMoveResults(game, pos, dir, spaces));
    return new game_1.Game(game.getPlayerOne(), game.getPlayerTwo(), newBoard, game.getRules(), game.getTurn(), game.getMovesRemaining() - 1);
});
exports.shove = (game, pos, dir) => {
    if (!validation_2.validateShove(game, pos, dir)) {
        throw new Error('Invalid shove');
    }
    const newBoard = new gameBoard_1.GameBoard(game.getGameBoard().getBoard(), ...action_2.getShoveResults(game, pos, dir));
    return new game_1.Game(game.getPlayerOne(), game.getPlayerTwo(), newBoard, game.getRules(), util_1.getNextPlayerTurn(game.getTurn()));
};
