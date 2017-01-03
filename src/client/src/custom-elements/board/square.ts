import { bindable, computedFrom } from 'aurelia-framework';
import { Border } from '../../../../game/model/border';
import { Direction } from '../../../../game/model/direction';
import { Floor } from '../../../../game/model/floor';
import { Square } from '../../../../game/model/square';
import { ensureDefined } from '../../lib/typeUtils';

export class SquareCustomElement {
	@bindable
	public square: Square;

	private readonly directionClassMap = new Map<Direction, string>([
		[Direction.North, 'north'],
		[Direction.East, 'east'],
		[Direction.South, 'south'],
		[Direction.West, 'west']
	]);

	private readonly getBorderDirectionClass = (dir: Direction): string => {
		return this.square.getBorder(dir) === Border.Wall
			? ensureDefined(this.directionClassMap.get(dir), '')
			: '';
	}

	public get borderClasses(): string {
		return Array.from(this.directionClassMap.keys())
			.reduce((classes, dir) => `${classes} ${this.getBorderDirectionClass(dir)}`, '')
			.trim();
	}

	public get bgClass(): string {
		return this.square.floorType === Floor.Pit ? 'pit' : '';
	}

	@computedFrom('square')
	public get classes(): string {
		return `board-square ${this.borderClasses} ${this.bgClass}`;
	}
}
