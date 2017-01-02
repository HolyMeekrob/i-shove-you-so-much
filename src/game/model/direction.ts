export enum Direction {
	North,
	East,
	South,
	West
}

export const getAllDirections = (): Direction[] => [
	Direction.North, Direction.East, Direction.South, Direction.West
];
