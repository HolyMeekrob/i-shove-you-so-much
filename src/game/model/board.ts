import { clone, isNil, length, uniq } from 'ramda';
import { Border } from './border';
import { Floor } from './floor';
import { Position } from './position';
import { Square } from './square';
import { Start } from './start';

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
		new Square(pit, neither, open, wall),
		new Square(pit, neither, open, wall),
		new Square(pit, neither, open, wall),
		new Square(pit, neither, open, wall),
		new Square(pit, neither, open, wall),
		new Square(pit),
		new Square(pit)
	],
	[
		new Square(pit),
		new Square(pit),
		new Square(pit),
		new Square(normal, one, open, open, open, wall),
		new Square(normal, one, open, open, open, wall),
		new Square(normal, two, open, open, open, wall),
		new Square(normal, two, open, open, open, wall),
		new Square(normal, two, open, open, open, wall),
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
		new Square(normal, one, open, wall),
		new Square(normal, one, open, wall),
		new Square(normal, one, open, wall),
		new Square(normal, two, open, wall),
		new Square(normal, two, open, wall),
		new Square(pit),
		new Square(pit),
		new Square(pit)
	],
	[
		new Square(pit),
		new Square(pit),
		new Square(pit, neither, open, open, open, wall),
		new Square(pit, neither, open, open, open, wall),
		new Square(pit, neither, open, open, open, wall),
		new Square(pit, neither, open, open, open, wall),
		new Square(pit, neither, open, open, open, wall),
		new Square(pit),
		new Square(pit),
		new Square(pit)
	]
];

export class Board {
	private static allSameLength = (arr: Square[][]): boolean =>
		uniq(arr.map(length)).length === 1;

	private static validateBoard = (squares: Square[][]): string => {
		if (squares.length === 0) {
			return 'cannot be empty';
		}

		if (!Board.allSameLength(squares)) {
			return 'must be a rectangle';
		}

		return '';
	}

	constructor(public readonly squares: Square[][] = defaultBoard) {
		const message = Board.validateBoard(squares);
		if (message.length > 0) {
			throw new Error(`Invalid board: ${message}`);
		}
	}

	public hasSquareAt = (pos: Position): boolean =>
		this.squares.length > pos.x && this.squares[pos.x].length > pos.y;

	public getSquareAt = (pos: Position): Square =>
		this.squares[pos.x][pos.y];
}
