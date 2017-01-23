export class Game {
	public id: number;

	// tslint:disable-next-line: no-any
	public activate(params: any) {
		this.id = params.id;
	}

	public get modelString(): string {
		return `id: ${this.id}`;
	}
}
