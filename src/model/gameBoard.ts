import { all, any, curry, find, isNil, prop } from 'ramda';

import { Board } from './board';
import { Position } from './position';
import { Token } from './token';
import { TokenPosition } from './tokenPosition';

export class GameBoard {
	private _tokenPositions: TokenPosition[];

	constructor (private board: Board, ...tokenPositions: TokenPosition[]) {
			this._tokenPositions = tokenPositions;
			const message = GameBoard.validateGameBoard(board, tokenPositions);
			if (!isNil(message)) {
				throw new Error(`Invalid game board: ${message}`);
			}
	}

	private static validateGameBoard = (board: Board, tp: TokenPosition[]): string => {
		if (!all(board.hasSquareAt, tp.map(prop('position')))) {
			return 'tokens must be in valid positions for board';
		}

		return undefined;
	};

	private arePositionsEqual =
	curry((position: Position, tokenPosition: TokenPosition): boolean =>
		position.equals(tokenPosition.position));

	public getBoard = (): Board => this.board;

	public hasTokenAt = (position: Position): boolean =>
		any(this.arePositionsEqual(position), this._tokenPositions);

	public getTokenAt = (position: Position): Token => {
		const tokenPosition = find(this.arePositionsEqual(position), this._tokenPositions);
		return tokenPosition === undefined ? undefined : tokenPosition.token;
	};

	public getTokenPositions = (): TokenPosition[] => this._tokenPositions.slice(0);
}
