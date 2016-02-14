import square from '../../../src/model/square';
import * as floorType from '../../../src/model/floor';
import * as startType from '../../../src/model/start';
import * as borderType from '../../../src/model/border';
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

	describe('getNorthBorder', () => {
		it('should return the north border', () => {
			const floor = floorType.PIT;
			const start = startType.PLAYER_ONE_START;
			const north = borderType.WALL_BORDER;
			const east = borderType.OPEN_BORDER;
			const south = borderType.OPEN_BORDER;
			const west = borderType.OPEN_BORDER;
			const boardSquare = square(floor, start, north, east, south, west);

			boardSquare.getNorthBorder().should.equal(north);
		});

		it('should default to open', () => {
			const boardSquare = square();

			boardSquare.getNorthBorder().should.equal(borderType.OPEN_BORDER);
		});
	});

	describe('getEastBorder', () => {
		it('should return the east border', () => {
			const floor = floorType.PIT;
			const start = startType.PLAYER_ONE_START;
			const north = borderType.OPEN_BORDER;
			const east = borderType.WALL_BORDER;
			const south = borderType.OPEN_BORDER;
			const west = borderType.OPEN_BORDER;
			const boardSquare = square(floor, start, north, east, south, west);

			boardSquare.getEastBorder().should.equal(east);
		});

		it('should default to open', () => {
			const boardSquare = square();

			boardSquare.getEastBorder().should.equal(borderType.OPEN_BORDER);
		});
	});

	describe('getSouthBorder', () => {
		it('should return the south border', () => {
			const floor = floorType.PIT;
			const start = startType.PLAYER_ONE_START;
			const north = borderType.OPEN_BORDER;
			const east = borderType.OPEN_BORDER;
			const south = borderType.WALL_BORDER;
			const west = borderType.OPEN_BORDER;
			const boardSquare = square(floor, start, north, east, south, west);

			boardSquare.getSouthBorder().should.equal(south);
		});

		it('should default to open', () => {
			const boardSquare = square();

			boardSquare.getSouthBorder().should.equal(borderType.OPEN_BORDER);
		});
	});

	describe('getWestBorder', () => {
		it('should return the west border', () => {
			const floor = floorType.PIT;
			const start = startType.PLAYER_ONE_START;
			const north = borderType.OPEN_BORDER;
			const east = borderType.OPEN_BORDER;
			const south = borderType.OPEN_BORDER;
			const west = borderType.WALL_BORDER;
			const boardSquare = square(floor, start, north, east, south, west);

			boardSquare.getWestBorder().should.equal(west);
		});

		it('should default to open', () => {
			const boardSquare = square();

			boardSquare.getWestBorder().should.equal(borderType.OPEN_BORDER);
		});
	});
});
