import { Board } from '../../src/game/model/board';
import { Border } from '../../src/game/model/border';
import { Floor } from '../../src/game/model/floor';
import { Game } from '../../src/game/model/game';
import { GameBoard } from '../../src/game/model/gameBoard';
import { Player } from '../../src/game/model/player';
import { PlayerType } from '../../src/game/model/playerType';
import { Position } from '../../src/game/model/position';
import { Square } from '../../src/game/model/square';
import { Start } from '../../src/game/model/start';
import { Token } from '../../src/game/model/token';
import { TokenPosition } from '../../src/game/model/tokenPosition';
import { TokenType } from '../../src/game/model/tokenType';

const getPlayerOne = (): Player => new Player('Player One', 0xff);
const getPlayerTwo = (): Player => new Player('Player Two', 0xffffff);

const getNorthWallSquare = () =>
	new Square(Floor.Normal, Start.Neither, Border.Wall);
const getSouthWallSquare = () =>
	new Square(Floor.Normal, Start.Neither, Border.Open, Border.Open, Border.Wall);

const getSimpleBoard = (): Board =>
	new Board([
		[new Square(Floor.Pit), new Square(Floor.Pit), new Square(Floor.Pit), new Square(Floor.Pit)],
		[new Square(Floor.Pit), new Square(),          new Square(),          new Square(Floor.Pit)],
		[new Square(Floor.Pit), new Square(),          new Square(),          new Square(Floor.Pit)],
		[new Square(Floor.Pit), new Square(Floor.Pit), new Square(Floor.Pit), new Square(Floor.Pit)]
	]);

const getSimpleGameBoard = (): GameBoard => {
	const tokenPositions: [TokenPosition] = [
		new TokenPosition(
			new Token(PlayerType.PlayerOne, TokenType.Bully),
			new Position(1, 1)),
		new TokenPosition(
			new Token(PlayerType.PlayerTwo, TokenType.Bully),
			new Position(2, 2))
	];
	return new GameBoard(getSimpleBoard(), ...tokenPositions);
};

export const getSimpleGame = (playerTurn: PlayerType = PlayerType.PlayerOne): Game =>
	new Game(getPlayerOne(), getPlayerTwo(), getSimpleGameBoard(), undefined, playerTurn);

const getThreeByThreeGameBoard = (): Board =>
	new Board([
		[new Square(Floor.Pit), new Square(Floor.Pit), new Square(Floor.Pit), new Square(Floor.Pit), new Square(Floor.Pit)],
		[new Square(Floor.Pit), new Square(),          getNorthWallSquare(),  getSouthWallSquare(),  new Square(Floor.Pit)],
		[new Square(Floor.Pit), new Square(),          new Square(),          new Square(),          new Square(Floor.Pit)],
		[new Square(Floor.Pit), new Square() ,         new Square(),          new Square(),          new Square(Floor.Pit)],
		[new Square(Floor.Pit), new Square(Floor.Pit), new Square(Floor.Pit), new Square(Floor.Pit), new Square(Floor.Pit)]
	]);

const getTwoVersusTwoGameBoard = (): GameBoard => {
	const tokenPositions: [TokenPosition] = [
		new TokenPosition(
			new Token(PlayerType.PlayerOne, TokenType.Bully),
			new Position(1, 1)),
		new TokenPosition(
			new Token(PlayerType.PlayerOne, TokenType.Victim),
			new Position(2, 1)),
		new TokenPosition(
			new Token(PlayerType.PlayerTwo, TokenType.Bully),
			new Position(3, 3)),
		new TokenPosition(
			new Token(PlayerType.PlayerTwo, TokenType.Anchor),
			new Position(2, 3))
	];
	return new GameBoard(getThreeByThreeGameBoard(), ...tokenPositions);
};

export const getTwoVersusTwoGame = (): Game =>
	new Game(getPlayerOne(), getPlayerTwo(), getTwoVersusTwoGameBoard());

const getThreeVersusThreeGameBoard = (): GameBoard => {
	const tokenPositions: [TokenPosition] = [
		new TokenPosition(
			new Token(PlayerType.PlayerOne, TokenType.Bully),
			new Position(4, 4)),
		new TokenPosition(
			new Token(PlayerType.PlayerOne, TokenType.Bully),
			new Position(2, 4)),
		new TokenPosition(
			new Token(PlayerType.PlayerOne, TokenType.Victim),
			new Position(1, 4)),
		new TokenPosition(
			new Token(PlayerType.PlayerTwo, TokenType.Anchor),
			new Position(2, 5)),
		new TokenPosition(
			new Token(PlayerType.PlayerTwo, TokenType.Bully),
			new Position(4, 5)),
		new TokenPosition(
			new Token(PlayerType.PlayerTwo, TokenType.Victim),
			new Position(4, 6))
	];
	return new GameBoard(new Board(), ...tokenPositions);
};

export const getThreeVersusThreeGame = (): Game =>
	new Game(getPlayerOne(), getPlayerTwo(), getThreeVersusThreeGameBoard());
