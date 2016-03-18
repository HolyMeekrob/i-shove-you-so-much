import { Board } from '../../src/model/board';
import { Game } from '../../src/model/game';
import { GameBoard } from '../../src/model/gameBoard';
import { Player } from '../../src/model/player';
import { PlayerType } from '../../src/model/playerType';
import { Position } from '../../src/model/position';
import { Square } from '../../src/model/square';
import { Token } from '../../src/model/token';
import { TokenPosition } from '../../src/model/tokenPosition';
import { TokenType } from '../../src/model/tokenType';

const getPlayerOne = (): Player => new Player('Player One');
const getPlayerTwo = (): Player => new Player('Player Two');

const getSimpleBoard = (): Board =>
	new Board([
		[new Square(), new Square()],
		[new Square(), new Square()]
	]);

const getSimpleGameBoard = (): GameBoard => {
	const tokenPositions: [TokenPosition] = [
		new TokenPosition(
			new Token(PlayerType.PlayerOne, TokenType.Bully),
			new Position(0, 0)),
		new TokenPosition(
			new Token(PlayerType.PlayerTwo, TokenType.Bully),
			new Position(1, 1))
	];
	return new GameBoard(getSimpleBoard(), ...tokenPositions);
};

export const getSimpleGame = (): Game =>
	new Game(getPlayerOne(), getPlayerTwo(), getSimpleGameBoard());
