import { clone } from 'ramda';
import { Border } from './border';
import { Floor } from './floor';
import { Position } from './position';
import { Start } from './start';
import { Square } from './square';

const pit = Floor.Pit;
const normal = Floor.Normal;

const neither = Start.Neither;
const one = Start.PlayerOne;
const two = Start.PlayerTwo;

const open = Border.Open;
const wall = Border.Wall;

const defaultBoard = [
	[
		new Square(pit),
		new Square(pit),
		new Square(pit),
		new Square(pit, neither, open, open, wall),
		new Square(pit, neither, open, open, wall),
		new Square(pit, neither, open, open, wall),
		new Square(pit, neither, open, open, wall),
		new Square(pit, neither, open, open, wall),
		new Square(pit),
		new Square(pit)
	],
	[
		new Square(pit),
		new Square(pit),
		new Square(pit),
		new Square(normal, one, wall),
		new Square(normal, one, wall),
		new Square(normal, two, wall),
		new Square(normal, two, wall),
		new Square(normal, two, wall),
		new Square(pit),
		new Square(pit)
	],
	[
		new Square(pit),
		new Square(normal, one),
		new Square(normal, one),
		new Square(normal, one),
		new Square(normal, one),
		new Square(normal, two),
		new Square(normal, two),
		new Square(normal, two),
		new Square(normal, two),
		new Square(pit)
	],
	[
		new Square(pit),
		new Square(normal, one),
		new Square(normal, one),
		new Square(normal, one),
		new Square(normal, one),
		new Square(normal, two),
		new Square(normal, two),
		new Square(normal, two),
		new Square(normal, two),
		new Square(pit)
	],
	[
		new Square(pit),
		new Square(pit),
		new Square(normal, one, open, open, wall),
		new Square(normal, one, open, open, wall),
		new Square(normal, one, open, open, wall),
		new Square(normal, two, open, open, wall),
		new Square(normal, two, open, open, wall),
		new Square(pit),
		new Square(pit),
		new Square(pit)
	],
	[
		new Square(pit),
		new Square(pit),
		new Square(pit),
		new Square(pit, neither, wall),
		new Square(pit, neither, wall),
		new Square(pit, neither, wall),
		new Square(pit, neither, wall),
		new Square(pit, neither, wall),
		new Square(pit),
		new Square(pit)
	]
];

export class Board {
	constructor(private squares: Square[][] = defaultBoard) {}

	public getSquares = (): Square[][] => clone(this.squares);
	public getSquareAt = (position: Position): Square =>
		this.squares[position.x][position.y];
}
