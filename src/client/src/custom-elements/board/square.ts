import { EventAggregator } from 'aurelia-event-aggregator';
import { autoinject, bindable, computedFrom } from 'aurelia-framework';
import { Border } from '../../../../game/model/border';
import { Color, getBlue, getGreen, getRed } from '../../../../game/model/color';
import { Direction } from '../../../../game/model/direction';
import { Floor } from '../../../../game/model/floor';
import { TokenType } from '../../../../game/model/tokenType';
import { playerColorsUpdated, tokenPositionsUpdated } from '../../events';
import { ensureDefined } from '../../lib/typeUtils';
import { ISquareDisplay } from './square-display';

@autoinject
export class SquareCustomElement {
	@bindable
	public square: ISquareDisplay;

	@bindable
	public tokenType: () => TokenType | undefined;

	public container: HTMLElement;
	public token: HTMLElement;

	constructor(private messageBus: EventAggregator) {
		messageBus.subscribe(tokenPositionsUpdated, this.updateTokenClass);
		messageBus.subscribe(playerColorsUpdated, this.updateColor);
	}

	private readonly updateTokenClass = () => {
		this.token.className = this.tokenClass;
	}

	private readonly updateColor = () => {
		this.token.style.cssText = this.tokenStyles;
		this.container.style.cssText = this.squareStyles;
	}

	private readonly directionClassMap = new Map<Direction, string>([
		[Direction.North, 'north'],
		[Direction.East, 'east'],
		[Direction.South, 'south'],
		[Direction.West, 'west']
	]);

	private readonly getBorderDirectionClass = (dir: Direction): string => {
		return this.square.square.getBorder(dir) === Border.Wall
			? ensureDefined(this.directionClassMap.get(dir), '')
			: '';
	}

	public get borderClasses(): string {
		return Array.from(this.directionClassMap.keys())
			.reduce((classes, dir) => `${classes} ${this.getBorderDirectionClass(dir)}`, '')
			.trim();
	}

	public get bgClass(): string {
		return this.square.square.floorType === Floor.Pit ? 'pit' : '';
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
		const color: Color = this.square.color;

		return `background-color: rgba(${getRed(color)}, ${getGreen(color)}, `
			+ `${getBlue(color)}, ${opacity});`;
	}

	@computedFrom('square')
	public get tokenStyles(): string {
		const color: Color = this.square.color;

		return `background-color: rgb(${getRed(color)}, ${getGreen(color)}, ${getBlue(color)}`;
	}
}
