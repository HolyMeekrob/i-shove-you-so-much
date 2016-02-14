import board from '../../src/board.js';
import chai from 'chai';
const should = chai.should();

describe('board', () => {
	describe('#constructor', () => {
		describe('given zero arguments', () => {
			it('should throw an error', () => {
				(() => board()).should.throw(Error);
			});
		});

		describe('given a null argument', () => {
			it('should throw an error', () => {
				(() => board(null)).should.throw(Error);
			});
		});

		describe('given a non-array', () => {
			it('should throw an error', () => {
				(() => board(1)).should.throw(Error);
			});
		});

		describe('given a non-two-dimensional array', () => {
			it('should throw an error', () => {
				(() => board([[], 1])).should.throw(Error);
			});
		});
	});

	describe('getSquares()', () => {
		it('should return the squares', () => {
			const squares = [
				[1, 2, 3],
				[4, 5, 6]
			];
			const gameBoard = board(squares);

			gameBoard.getSquares().should.deep.equal(squares);
		});
	});
});
