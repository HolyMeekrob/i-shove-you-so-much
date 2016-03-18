import { clone, isNil, length, uniq } from 'ramda';
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
	constructor(private squares: Square[][] = defaultBoard) {
		const message = Board.validateBoard(this.squares);
		if (!isNil(message)) {
			throw new Error(`Invalid board: ${message}`);
		}
	}

	private static allSameLength = (arr: any[][]): boolean =>
		uniq(arr.map(length)).length === 1;

	private static validateBoard = (squares: Square[][]): string => {
		if (squares.length === 0) {
			return 'cannot be empty';
		}

		if (!Board.allSameLength(squares)) {
			return 'must be a rectangle';
		}

		return undefined;
	};

	public getSquares = (): Square[][] => clone(this.squares);
	public hasSquareAt = (pos: Position): boolean =>
		this.squares.length > pos.x && this.squares[pos.x].length > pos.y;

	public getSquareAt = (pos: Position): Square =>
		this.squares[pos.x][pos.y];
}
