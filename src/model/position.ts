export class Position {
	private _x: number;
	private _y: number;

	constructor(x: number, y: number) {
		this._x = x;
		this._y = y;
	}

	public get x(): number { return this._x; }
	public get y(): number { return this._y; }

	public equals = (pos: Position): boolean =>
		pos.x === this.x && pos.y === this.y;
}
