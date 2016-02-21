import test from 'tape';
import square from '../../../src/model/square';
import * as floorType from '../../../src/model/floor';
import * as startType from '../../../src/model/start';
import * as borderType from '../../../src/model/border';
import * as direction from '../../../src/model/direction';

test('square.getFloorType()', (assert) => {
	const floor = floorType.PIT;
	const start = startType.PLAYER_ONE_START;
	const north = borderType.WALL_BORDER;
	const east = borderType.WALL_BORDER;
	const south = borderType.WALL_BORDER;
	const west = borderType.WALL_BORDER;
	const boardSquare = square(floor, start, north, east, south, west);

	assert.equal(boardSquare.getFloorType(), floor, 'returns the floor type');
	assert.end();
});

test('square.getFloorType() with no given floor type', (assert) => {
	assert.equal(square().getFloorType(), floorType.NORMAL_FLOOR,
		'defaults to a normal floor');
	assert.end();
});

test('square.getStartType()', (assert) => {
	const floor = floorType.PIT;
	const start = startType.PLAYER_TWO_START;
	const north = borderType.WALL_BORDER;
	const east = borderType.WALL_BORDER;
	const south = borderType.WALL_BORDER;
	const west = borderType.WALL_BORDER;
	const boardSquare = square(floor, start, north, east, south, west);

	assert.equal(boardSquare.getStartType(), start, 'returns the start type');
	assert.end();
});

test('square.getStartType() with no given start type', (assert) => {
	assert.equal(square().getStartType(), startType.NEITHER_START,
		'defaults to a start type of neither player');
	assert.end();
});

test('square.getBorder() with no argument', (assert) => {
	assert.throws(() => square().getBorder(), 'throws an error');
	assert.end();
});

test('square.getBorder() given north', (assert) => {
	const floor = floorType.PIT;
	const start = startType.PLAYER_ONE_START;
	const north = borderType.WALL_BORDER;
	const east = borderType.OPEN_BORDER;
	const south = borderType.OPEN_BORDER;
	const west = borderType.OPEN_BORDER;
	const boardSquare = square(floor, start, north, east, south, west);

	assert.equal(boardSquare.getBorder(direction.NORTH), north,
		'returns the north border');
	assert.end();
});

test('square.getBorder() given east', (assert) => {
	const floor = floorType.PIT;
	const start = startType.PLAYER_ONE_START;
	const north = borderType.OPEN_BORDER;
	const east = borderType.WALL_BORDER;
	const south = borderType.OPEN_BORDER;
	const west = borderType.OPEN_BORDER;
	const boardSquare = square(floor, start, north, east, south, west);

	assert.equal(boardSquare.getBorder(direction.EAST), east,
		'returns the east border');
	assert.end();
});

test('square.getBorder() given south', (assert) => {
	const floor = floorType.PIT;
	const start = startType.PLAYER_ONE_START;
	const north = borderType.OPEN_BORDER;
	const east = borderType.OPEN_BORDER;
	const south = borderType.WALL_BORDER;
	const west = borderType.OPEN_BORDER;
	const boardSquare = square(floor, start, north, east, south, west);

	assert.equal(boardSquare.getBorder(direction.SOUTH), south,
		'returns the south border');
	assert.end();
});

test('square.getBorder() given west', (assert) => {
	const floor = floorType.PIT;
	const start = startType.PLAYER_ONE_START;
	const north = borderType.OPEN_BORDER;
	const east = borderType.OPEN_BORDER;
	const south = borderType.OPEN_BORDER;
	const west = borderType.WALL_BORDER;
	const boardSquare = square(floor, start, north, east, south, west);

	assert.equal(boardSquare.getBorder(direction.WEST), west,
		'returns the west border');
	assert.end();
});
