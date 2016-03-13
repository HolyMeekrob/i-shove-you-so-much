import * as test from 'tape';
import { Square } from '../../../src/model/square';
import { Floor } from '../../../src/model/floor';
import { Start } from '../../../src/model/start';
import { Border } from '../../../src/model/border';
import { Direction } from '../../../src/model/direction';

test('square.getFloorType()', (assert: test.Test): void => {
	const floor = Floor.Pit;
	const start = Start.PlayerOne;
	const north = Border.Wall;
	const east = Border.Wall;
	const south = Border.Wall;
	const west = Border.Wall;
	const boardSquare = new Square(floor, start, north, east, south, west);

	assert.equal(boardSquare.getFloorType(), floor, 'returns the floor type');
	assert.end();
});

test('square.getFloorType() with no given floor type', (assert: test.Test): void => {
	assert.equal(new Square().getFloorType(), Floor.Normal,
		'defaults to a normal floor');
	assert.end();
});

test('square.getStartType()', (assert: test.Test): void => {
	const floor = Floor.Pit;
	const start = Start.PlayerTwo;
	const north = Border.Wall;
	const east = Border.Wall;
	const south = Border.Wall;
	const west = Border.Wall;
	const boardSquare = new Square(floor, start, north, east, south, west);

	assert.equal(boardSquare.getStartType(), start, 'returns the start type');
	assert.end();
});

test('square.getStartType() with no given start type', (assert: test.Test): void => {
	assert.equal(new Square().getStartType(), Start.Neither,
		'defaults to a start type of neither player');
	assert.end();
});

test('square.getBorder() given north', (assert: test.Test): void => {
	const floor = Floor.Pit;
	const start = Start.PlayerOne;
	const north = Border.Wall;
	const east = Border.Open;
	const south = Border.Open;
	const west = Border.Open;
	const boardSquare = new Square(floor, start, north, east, south, west);

	assert.equal(boardSquare.getBorder(Direction.North), north,
		'returns the north border');
	assert.end();
});

test('square.getBorder() given east', (assert: test.Test): void => {
	const floor = Floor.Pit;
	const start = Start.PlayerOne;
	const north = Border.Open;
	const east = Border.Wall;
	const south = Border.Open;
	const west = Border.Open;
	const boardSquare = new Square(floor, start, north, east, south, west);

	assert.equal(boardSquare.getBorder(Direction.East), east,
		'returns the east border');
	assert.end();
});

test('square.getBorder() given south', (assert: test.Test): void => {
	const floor = Floor.Pit;
	const start = Start.PlayerOne;
	const north = Border.Open;
	const east = Border.Open;
	const south = Border.Wall;
	const west = Border.Open;
	const boardSquare = new Square(floor, start, north, east, south, west);

	assert.equal(boardSquare.getBorder(Direction.South), south,
		'returns the south border');
	assert.end();
});

test('square.getBorder() given west', (assert: test.Test): void => {
	const floor = Floor.Pit;
	const start = Start.PlayerOne;
	const north = Border.Open;
	const east = Border.Open;
	const south = Border.Open;
	const west = Border.Wall;
	const boardSquare = new Square(floor, start, north, east, south, west);

	assert.equal(boardSquare.getBorder(Direction.West), west,
		'returns the west border');
	assert.end();
});
