import { GameBoard } from './gameBoard';
import { Player } from './player';
import { PlayerType } from './playerType';
import { Ruleset } from './ruleset';

const DEFAULT_MOVES_PER_TURN: number = 2;

export class Game {
	constructor (private playerOne: Player, private playerTwo: Player,
		private gameBoard: GameBoard,
		private rules: Ruleset = new Ruleset(DEFAULT_MOVES_PER_TURN),
		private playerTurn: PlayerType = PlayerType.PlayerOne,
		private usedMoves: number = 0, private gameOver: boolean = false) {}

	public getPlayerOne = (): Player => this.playerOne;
	public getPlayerTwo = (): Player => this.playerTwo;
	public getGameBoard = (): GameBoard => this.gameBoard;
	public getRules = (): Ruleset => this.rules;
	public getTurn = (): PlayerType => this.playerTurn;
	public isGameOver = (): boolean => this.gameOver;

	public hasMovesRemaining = (): boolean => this.getMovesRemaining() > 0;

	public getMovesRemaining = (): number =>
		this.rules.getMovesPerTurn() - this.usedMoves;
}
