export class Game {
	public model: any;

	public activate(params: any) {
		this.model = params;
	}

	public get modelString(): string {
		return JSON.stringify(this.model);
	}
}
