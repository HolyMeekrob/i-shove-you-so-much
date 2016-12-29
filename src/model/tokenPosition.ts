import { Position } from './position';
import { Token } from './token';

export class TokenPosition {
	constructor(public readonly token: Token, public readonly position: Position) {
	}
}
