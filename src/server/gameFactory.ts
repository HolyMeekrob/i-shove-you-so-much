import { Board } from '../game/model/board';
import { Game } from '../game/model/game';
import { GameBoard } from '../game/model/gameBoard';
import { Player } from '../game/model/player';
import { TokenPosition } from '../game/model/tokenPosition';
import { INewGameInput } from './newGameInput';

export class GameFactory {
	public createGame(input: INewGameInput): Game {
		const gameBoard = new GameBoard(new Board(), ...input.tokenPositions);

		return new Game(input.playerOne, input.playerTwo, gameBoard);
	}
}
