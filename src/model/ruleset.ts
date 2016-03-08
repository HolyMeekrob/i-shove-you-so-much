export class Ruleset {
	constructor(private movesPerTurn: number) {}

	public getMovesPerTurn = (): number => this.movesPerTurn;
}
