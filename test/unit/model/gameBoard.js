import gameBoard from '../../../src/model/gameBoard';
import position from '../../../src/model/position';
import tokenPosition from '../../../src/model/tokenPosition';

import chai from 'chai';
const should = chai.should();

describe('gameBoard', () => {
	describe('#constructor', () => {
		describe('when given no arguments', () => {
			it('should throw an error', () => {
				(() => gameBoard()).should.throw(Error);
			});
		});

		describe('when missing a board', () => {
			it('should throw an error', () => {
				(() => gameBoard(null, [])).should.throw(Error);
			});
		});

		describe('when missing token positions', () => {
			it('should throw an error', () => {
				(() => gameBoard({})).should.throw(Error);
			});
		});
	});

	describe('getBoard()', () => {
		it('should return the board', () => {
			const board = { squares: [] };
			const tokenPositions = [];
			const gb = gameBoard(board, tokenPositions);

			gb.getBoard().should.equal(board);
		});
	});

	describe('hasTokenAt()', () => {
		describe('when given a position where there is no token', () => {
			it('should return false', () => {
				const board = { squares: [] };
				const x = 5;
				const y = 3;
				const tokenPositions = [tokenPosition({}, position(x, y))];
				const gb = gameBoard(board, tokenPositions);

				gb.hasTokenAt(x + 1, y).should.be.false;
			});
		});

		describe('when given a position where there is a token', () => {
			it('should return true', () => {
				const board = { squares: [] };
				const x1 = 5;
				const y1 = 3;
				const x2 = 2;
				const y2 = 2;
				const tokenPositions = [
					tokenPosition({}, position(x1, y1)),
					tokenPosition({}, position(x2, y2))
				];

				const gb = gameBoard(board, tokenPositions);

				gb.hasTokenAt(position(x1, y1)).should.be.true;
			});
		});
	});

	describe('getTokenAt', () => {
		describe('when given a position where there is no token', () => {
			it('should return undefined', () => {
				const board = { squares: [] };
				const x = 5;
				const y = 3;
				const tokenPositions = [tokenPosition({}, position(x, y))];
				const gb = gameBoard(board, tokenPositions);

				should.not.exist(gb.getTokenAt(x + 1, y));
			});
		});

		describe('when given a position wwhere there is a token', () => {
			it('should return the token', () => {
				const board = { squares: [] };
				const x1 = 5;
				const y1 = 3;
				const x2 = 2;
				const y2 = 2;
				const token1 = { foo: 'bar' };
				const token2 = { foo: 'baz' };
				const tokenPositions = [
					tokenPosition(token1, position(x1, y1)),
					tokenPosition(token2, position(x2, y2))
				];

				const gb = gameBoard(board, tokenPositions);

				gb.getTokenAt(position(x1, y1)).should.equal(token1);
			});
		});
	});
});
