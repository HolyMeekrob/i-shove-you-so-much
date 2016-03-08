export class Player {
	constructor(private playerName: string) {}

	public getName = (): string => this.playerName;
}
