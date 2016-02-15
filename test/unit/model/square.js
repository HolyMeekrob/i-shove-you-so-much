import square from '../../../src/model/square';
import * as floorType from '../../../src/model/floor';
import * as startType from '../../../src/model/start';
import * as borderType from '../../../src/model/border';
import * as direction from '../../../src/model/direction';
import chai from 'chai';
const should = chai.should();

describe('square', () => {
	describe('getFloorType()', () => {
		it('should return the floor type', () => {
			const floor = floorType.PIT;
			const start = startType.PLAYER_ONE_START;
			const north = borderType.WALL_BORDER;
			const east = borderType.WALL_BORDER;
			const south = borderType.WALL_BORDER;
			const west = borderType.WALL_BORDER;
			const boardSquare = square(floor, start, north, east, south, west);

			boardSquare.getFloorType().should.equal(floor);
		});

		it('should default to normal', () => {
			const boardSquare = square();

			boardSquare.getFloorType().should.equal(floorType.NORMAL_FLOOR);
		});
	});

	describe('getStartType()', () => {
		it('should return the start type', () => {
			const floor = floorType.PIT;
			const start = startType.PLAYER_TWO_START;
			const north = borderType.WALL_BORDER;
			const east = borderType.WALL_BORDER;
			const south = borderType.WALL_BORDER;
			const west = borderType.WALL_BORDER;
			const boardSquare = square(floor, start, north, east, south, west);

			boardSquare.getStartType().should.equal(start);
		});

		it('should default to neither', () => {
			const boardSquare = square();

			boardSquare.getStartType().should.equal(startType.NEITHER_START);
		});
	});

	describe('getBorder()', () => {
		describe('when given no arguments', () => {
			it('should throw an error', () => {
				(() => {
					const boardSquare = square();
					boardSquare.getBorder();
				}).should.throw(Error);
			});
		});

		describe('when given north', () => {
			it('should return the north border', () => {
				const floor = floorType.PIT;
				const start = startType.PLAYER_ONE_START;
				const north = borderType.WALL_BORDER;
				const east = borderType.OPEN_BORDER;
				const south = borderType.OPEN_BORDER;
				const west = borderType.OPEN_BORDER;
				const boardSquare = square(floor, start, north, east, south, west);

				boardSquare.getBorder(direction.NORTH).should.equal(north);
			});

			it('should default to open', () => {
				const boardSquare = square();

				boardSquare.getBorder(direction.NORTH).should.equal(borderType.OPEN_BORDER);
			});
		});

		describe('when given east', () => {
			it('should return the east border', () => {
				const floor = floorType.PIT;
				const start = startType.PLAYER_ONE_START;
				const north = borderType.OPEN_BORDER;
				const east = borderType.WALL_BORDER;
				const south = borderType.OPEN_BORDER;
				const west = borderType.OPEN_BORDER;
				const boardSquare = square(floor, start, north, east, south, west);

				boardSquare.getBorder(direction.EAST).should.equal(east);
			});

			it('should default to open', () => {
				const boardSquare = square();

				boardSquare.getBorder(direction.EAST).should.equal(borderType.OPEN_BORDER);
			});
		});

		describe('when given south', () => {
			it('should return the south border', () => {
				const floor = floorType.PIT;
				const start = startType.PLAYER_ONE_START;
				const north = borderType.OPEN_BORDER;
				const east = borderType.OPEN_BORDER;
				const south = borderType.WALL_BORDER;
				const west = borderType.OPEN_BORDER;
				const boardSquare = square(floor, start, north, east, south, west);

				boardSquare.getBorder(direction.SOUTH).should.equal(south);
			});

			it('should default to open', () => {
				const boardSquare = square();

				boardSquare.getBorder(direction.SOUTH).should.equal(borderType.OPEN_BORDER);
			});
		});

		describe('when given west', () => {
			it('should return the west border', () => {
				const floor = floorType.PIT;
				const start = startType.PLAYER_ONE_START;
				const north = borderType.OPEN_BORDER;
				const east = borderType.OPEN_BORDER;
				const south = borderType.OPEN_BORDER;
				const west = borderType.WALL_BORDER;
				const boardSquare = square(floor, start, north, east, south, west);

				boardSquare.getBorder(direction.WEST).should.equal(west);
			});

			it('should default to open', () => {
				const boardSquare = square();

				boardSquare.getBorder(direction.WEST).should.equal(borderType.OPEN_BORDER);
			});
		});
	});
});
