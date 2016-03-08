import { Floor } from './floor';
import { Start } from './start';
import { Border } from './border';
import { Direction } from './direction';

export class Square {
	private borders: Border[] = new Array(4);

	constructor(private floorType: Floor = Floor.Normal,
		private startType: Start = Start.Neither,
		private northBorder: Border = Border.Open,
		private eastBorder: Border = Border.Open,
		private southBorder: Border = Border.Open,
		private westBorder: Border = Border.Open) {
			this.borders[Direction.North] = northBorder;
			this.borders[Direction.East] = eastBorder;
			this.borders[Direction.South] = southBorder;
			this.borders[Direction.West] = westBorder;
	}

	public getFloorType = (): Floor => this.floorType;
	public getStartType = (): Start => this.startType;
	public getBorder = (dir: Direction): Border => this.borders[dir];
}
