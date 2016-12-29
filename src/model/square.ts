import { Border } from './border';
import { Direction } from './direction';
import { Floor } from './floor';
import { Start } from './start';

export class Square {
	private borders: Map<Direction, Border> = new Map<Direction, Border>();

	constructor(public readonly floorType: Floor = Floor.Normal,
		public readonly startType: Start = Start.Neither,
		northBorder: Border = Border.Open,
		eastBorder: Border = Border.Open,
		southBorder: Border = Border.Open,
		westBorder: Border = Border.Open) {
			this.borders.set(Direction.North, northBorder);
			this.borders.set(Direction.East, eastBorder);
			this.borders.set(Direction.South, southBorder);
			this.borders.set(Direction.West, westBorder);
	}

	public getBorder = (dir: Direction): Border => {
		const border = this.borders.get(dir);
		if (border === undefined) {
			throw new Error(`Missing border for ${dir}`);
		}
		return border;
	}
}
