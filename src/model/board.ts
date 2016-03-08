import { clone } from 'ramda';
import { Position } from './position';
import { Square } from './square';

export class Board {
	constructor(private squares: Square[][]) {}

	public getSquares = (): Square[][] => clone(this.squares);
	public getSquareAt = (position: Position): Square =>
		this.squares[position.x][position.y];
}
