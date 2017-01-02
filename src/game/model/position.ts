import { isNil } from 'ramda';

export class Position {
	private static validatePosition = (x: number, y: number): string => {
		if (x < 0 || y < 0) {
			return 'positions must be non-negative';
		}

		if (!Number.isInteger(x) || !Number.isInteger(y)) {
			return 'positions must be integers';
		}

		return '';
	}

	constructor(public readonly x: number, public readonly y: number) {
		const message = Position.validatePosition(x, y);
		if (message.length > 0) {
			throw new Error(`Invalid position: ${message}`);
		}
	}

	public equals = (pos: Position): boolean =>
		pos.x === this.x && pos.y === this.y;
}
