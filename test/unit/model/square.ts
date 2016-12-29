import * as test from 'tape';
import { Border } from '../../../src/model/border';
import { Direction } from '../../../src/model/direction';
import { Floor } from '../../../src/model/floor';
import { Square } from '../../../src/model/square';
import { Start } from '../../../src/model/start';

test('square.floorType', (assert: test.Test): void => {
	const floor = Floor.Pit;
	const start = Start.PlayerOne;
	const north = Border.Wall;
	const east = Border.Wall;
	const south = Border.Wall;
	const west = Border.Wall;
	const boardSquare = new Square(floor, start, north, east, south, west);

	assert.equal(boardSquare.floorType, floor, 'returns the floor type');
	assert.end();
});

test('square.floorType with no given floor type', (assert: test.Test): void => {
	assert.equal(new Square().floorType, Floor.Normal,
		'defaults to a normal floor');
	assert.end();
});

test('square.startType', (assert: test.Test): void => {
	const floor = Floor.Pit;
	const start = Start.PlayerTwo;
	const north = Border.Wall;
	const east = Border.Wall;
	const south = Border.Wall;
	const west = Border.Wall;
	const boardSquare = new Square(floor, start, north, east, south, west);

	assert.equal(boardSquare.startType, start, 'returns the start type');
	assert.end();
});

test('square.startType with no given start type', (assert: test.Test): void => {
	assert.equal(new Square().startType, Start.Neither,
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
