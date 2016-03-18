import { isNil } from 'ramda';

export class Position {
	private _x: number;
	private _y: number;

	constructor(x: number, y: number) {
		this._x = x;
		this._y = y;
		const message = Position.validatePosition(x, y);
		if (!isNil(message)) {
			throw new Error(`Invalid position: ${message}`);
		}
	}

	private static validatePosition = (x: number, y: number): string => {
		if (x < 0 || y < 0) {
			return 'positions must be non-negative';
		}

		if (!Number.isInteger(x) || !Number.isInteger(y)) {
			return 'positions must be integers';
		}

		return undefined;
	};

	public get x(): number { return this._x; }
	public get y(): number { return this._y; }

	public equals = (pos: Position): boolean =>
		pos.x === this.x && pos.y === this.y;
}
