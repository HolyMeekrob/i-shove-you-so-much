import { GameBoard } from './gameBoard';
import { IPlayer } from './player';
import { PlayerType } from './playerType';
import { Ruleset } from './ruleset';

const DEFAULT_MOVES_PER_TURN: number = 2;

export class Game {
	constructor (public readonly playerOne: IPlayer, public readonly playerTwo: IPlayer,
		public readonly gameBoard: GameBoard,
		public readonly rules: Ruleset = new Ruleset(DEFAULT_MOVES_PER_TURN),
		public readonly playerTurn: PlayerType = PlayerType.PlayerOne,
		public readonly usedMoves: number = 0) {}

	public hasMovesRemaining = (): boolean => this.getMovesRemaining() > 0;

	public getMovesRemaining = (): number =>
		this.rules.movesPerTurn - this.usedMoves;
}
