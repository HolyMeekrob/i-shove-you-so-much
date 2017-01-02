import { all, any, curry, find, isNil, prop } from 'ramda';

import { Board } from './board';
import { Position } from './position';
import { Token } from './token';
import { TokenPosition } from './tokenPosition';

export class GameBoard {
	private static validateGameBoard = (board: Board, tp: TokenPosition[]): string => {
		if (!all(board.hasSquareAt, tp.map(prop('position')))) {
			return 'tokens must be in valid positions for board';
		}

		return '';
	}

	private readonly _tokenPositions: TokenPosition[];

	constructor (public readonly board: Board, ...tokenPositions: TokenPosition[]) {
			this._tokenPositions = tokenPositions;
			const message = GameBoard.validateGameBoard(board, tokenPositions);
			if (message.length > 0) {
				throw new Error(`Invalid game board: ${message}`);
			}
	}

	private arePositionsEqual = curry((position: Position, tokenPosition: TokenPosition): boolean =>
		position.equals(tokenPosition.position));

	public hasTokenAt = (position: Position): boolean =>
		any(this.arePositionsEqual(position), this._tokenPositions);

	public getTokenAt = (position: Position): Token => {
		const tokenPosition = find(this.arePositionsEqual(position), this._tokenPositions);
		if (tokenPosition === undefined) {
			throw new Error('No token at the given position');
		}
		return tokenPosition.token;
	}

	public getTokenPositions = (): TokenPosition[] => this._tokenPositions.slice(0);
}
