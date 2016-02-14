import square from '../../src/square';
import floorType from '../../src/floorType';
import startType from '../../src/startType';
import borderType from '../../src/borderType';
import chai from 'chai';
const should = chai.should();

describe('square', () => {
	describe('getFloorType()', () => {
		it('should return the floor type', () => {
			const floor = floorType.PIT;
			const start = startType.PLAYER_ONE;
			const north = borderType.WALL;
			const east = borderType.WALL;
			const south = borderType.WALL;
			const west = borderType.WALL;
			const boardSquare = square(floor, start, north, east, south, west);

			boardSquare.getFloorType().should.equal(floor);
		});

		it('should default to normal', () => {
			const boardSquare = square();

			boardSquare.getFloorType().should.equal(floorType.NORMAL);
		});
	});

	describe('getStartType()', () => {
		it('should return the floor type', () => {
			const floor = floorType.PIT;
			const start = startType.PLAYER_TWO;
			const north = borderType.WALL;
			const east = borderType.WALL;
			const south = borderType.WALL;
			const west = borderType.WALL;
			const boardSquare = square(floor, start, north, east, south, west);

			boardSquare.getStartType().should.equal(start);
		});

		it('should default to neither', () => {
			const boardSquare = square();

			boardSquare.getFloorType().should.equal(startType.NEITHER);
		});
	});

	describe('getNorthBorder', () => {
		it('should return the north border', () => {
			const floor = floorType.PIT;
			const start = startType.PLAYER_ONE;
			const north = borderType.WALL;
			const east = borderType.OPEN;
			const south = borderType.OPEN;
			const west = borderType.OPEN;
			const boardSquare = square(floor, start, north, east, south, west);

			boardSquare.getNorthBorder().should.equal(north);
		});

		it('should default to open', () => {
			const boardSquare = square();

			boardSquare.getNorthBorder().should.equal(borderType.OPEN);
		});
	});

	describe('getEastBorder', () => {
		it('should return the east border', () => {
			const floor = floorType.PIT;
			const start = startType.PLAYER_ONE;
			const north = borderType.OPEN;
			const east = borderType.WALL;
			const south = borderType.OPEN;
			const west = borderType.OPEN;
			const boardSquare = square(floor, start, north, east, south, west);

			boardSquare.getEastBorder().should.equal(east);
		});

		it('should default to open', () => {
			const boardSquare = square();

			boardSquare.getEastBorder().should.equal(borderType.OPEN);
		});
	});

	describe('getSouthBorder', () => {
		it('should return the south border', () => {
			const floor = floorType.PIT;
			const start = startType.PLAYER_ONE;
			const north = borderType.OPEN;
			const east = borderType.OPEN;
			const south = borderType.WALL;
			const west = borderType.OPEN;
			const boardSquare = square(floor, start, north, east, south, west);

			boardSquare.getSouthBorder().should.equal(south);
		});

		it('should default to open', () => {
			const boardSquare = square();

			boardSquare.getSouthBorder().should.equal(borderType.OPEN);
		});
	});

	describe('getWestBorder', () => {
		it('should return the west border', () => {
			const floor = floorType.PIT;
			const start = startType.PLAYER_ONE;
			const north = borderType.OPEN;
			const east = borderType.OPEN;
			const south = borderType.OPEN;
			const west = borderType.WALL;
			const boardSquare = square(floor, start, north, east, south, west);

			boardSquare.getWestBorder().should.equal(west);
		});

		it('should default to open', () => {
			const boardSquare = square();

			boardSquare.getWestBorder().should.equal(borderType.OPEN);
		});
	});
});
