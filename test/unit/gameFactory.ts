import { Board } from '../../src/model/board';
import { Border } from '../../src/model/border';
import { Floor } from '../../src/model/floor';
import { Game } from '../../src/model/game';
import { GameBoard } from '../../src/model/gameBoard';
import { Player } from '../../src/model/player';
import { PlayerType } from '../../src/model/playerType';
import { Position } from '../../src/model/position';
import { Square } from '../../src/model/square';
import { Start } from '../../src/model/start';
import { Token } from '../../src/model/token';
import { TokenPosition } from '../../src/model/tokenPosition';
import { TokenType } from '../../src/model/tokenType';

const getPlayerOne = (): Player => new Player('Player One');
const getPlayerTwo = (): Player => new Player('Player Two');

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
