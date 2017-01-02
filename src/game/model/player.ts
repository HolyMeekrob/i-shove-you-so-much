import { Color } from './color';

export class Player implements IPlayer {
	constructor(public readonly name: string, public readonly color: Color) {}
}

export interface IPlayer {
	readonly name: string;
	readonly color: Color;
}
