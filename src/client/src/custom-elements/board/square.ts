import { EventAggregator } from 'aurelia-event-aggregator';
import { autoinject, bindable, computedFrom } from 'aurelia-framework';
import { Border } from '../../../../game/model/border';
import { Color, getBlue, getGreen, getRed } from '../../../../game/model/color';
import { Direction } from '../../../../game/model/direction';
import { Floor } from '../../../../game/model/floor';
import { Square } from '../../../../game/model/square';
import { Start } from '../../../../game/model/start';
import { TokenType } from '../../../../game/model/tokenType';
import { tokenPositionsUpdated } from '../../events';
import { ensureDefined } from '../../lib/typeUtils';

@autoinject
export class SquareCustomElement {
	@bindable
	public square: Square;

	@bindable
	public playerOneColor: Color;

	@bindable
	public playerTwoColor: Color;

	@bindable
	public tokenType: () => TokenType | undefined;

	public elem: HTMLElement;

	constructor(private messageBus: EventAggregator) {
		messageBus.subscribe(tokenPositionsUpdated, this.updateTokenClass);
	}

	private readonly updateTokenClass = () => {
		this.elem.className = this.tokenClass;
	}

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

	public get tokenClass(): string {
		switch (this.tokenType()) {
			case TokenType.Anchor:
				return 'anchor';

			case TokenType.Bully:
				return 'bully';

			case TokenType.Victim:
			return 'victim';

			default:
				return '';
		}
	}

	@computedFrom('square')
	public get squareClasses(): string {
		return `board-square ${this.borderClasses} ${this.bgClass}`;
	}

	@computedFrom('square', 'playerOneColor', 'playerTwoColor')
	public get squareStyles(): string {
		const opacity: number = 0.5;
		let red: number;
		let green: number;
		let blue: number;

		let color: Color;

		switch (this.square.startType) {
			case Start.PlayerOne:
				color = this.playerOneColor;
				break;

			case Start.PlayerTwo:
				color = this.playerTwoColor;
				break;

			default:
				color = 0xffffff;
				break;
		}

		return `background-color: rgba(${getRed(color)}, ${getGreen(color)}, `
			+ `${getBlue(color)}, ${opacity});`;
	}

	@computedFrom('playerOneColor', 'playerTwoColor')
	public get tokenStyles(): string {
		let color: Color;
		switch (this.square.startType) {
			case Start.PlayerOne:
				color = this.playerOneColor;
				break;

			case Start.PlayerTwo:
				color = this.playerTwoColor;
				break;

			default:
				color = 0xffffff;
				break;
		}

		return `background-color: rgb(${getRed(color)}, ${getGreen(color)}, ${getBlue(color)}`;
	}
}
