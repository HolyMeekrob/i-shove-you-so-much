export class App {
	private message: string;

	constructor() {
		this.message = '';
	}

	public activate() {
		this.message = 'hello world';
	}
}
