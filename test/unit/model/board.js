import board from '../../../src/model/board';
import position from '../../../src/model/position';
import chai from 'chai';
const should = chai.should();

describe('board', () => {
	describe('#constructor', () => {
		describe('when given zero arguments', () => {
			it('should throw an error', () => {
				(() => board()).should.throw(Error);
			});
		});

		describe('when given a null argument', () => {
			it('should throw an error', () => {
				(() => board(null)).should.throw(Error);
			});
		});

		describe('when given a non-array', () => {
			it('should throw an error', () => {
				(() => board(1)).should.throw(Error);
			});
		});

		describe('when given a non-two-dimensional array', () => {
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
			const b = board(squares);

			b.getSquares().should.deep.equal(squares);
		});
	});

	describe('getSquareAt()', () => {
		describe('when given an invalid position', () => {
			it('should throw an error', () => {
				(() => {
					const squares = [
						[1, 2, 3],
						[4, 5, 6]
					];
					const b = board(squares);
					const x = 2;
					const y = 5;
					const p = position(x, y);
					b.getSquareAt(p);
				}).should.throw(Error);
			});
		});

		describe('when given a valid position', () => {
			it('should return the squares', () => {
				const squares = [
					[1, 2, 3],
					[4, 5, 6]
				];
				const b = board(squares);
				const x = 1;
				const y = 2;
				const p = position(x, y);

				b.getSquareAt(p).should.equal(squares[x][y]);
			});
		});
	});
});
