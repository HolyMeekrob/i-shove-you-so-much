export class Game {
	public id: number;

	public activate(params: any) {
		this.id = params.id;
	}

	public get modelString(): string {
		return `id: ${this.id}`;
	}
}
