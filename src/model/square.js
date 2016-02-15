import { defaultTo, isNil } from 'ramda';

import * as f from './floor';
import * as s from './start';
import * as b from './border';
import * as d from './direction';

export default (floorType, startType, northBorder, eastBorder, southBorder, westBorder) => {
	const floor = defaultTo(f.NORMAL_FLOOR, floorType);
	const start = defaultTo(s.NEITHER_START, startType);
	const borders = new Map([
		[d.NORTH, defaultTo(b.OPEN_BORDER, northBorder)],
		[d.EAST, defaultTo(b.OPEN_BORDER, eastBorder)],
		[d.SOUTH, defaultTo(b.OPEN_BORDER, southBorder)],
		[d.WEST, defaultTo(b.OPEN_BORDER, westBorder)]
	]);

	const getFloorType = () => floor;
	const getStartType = () => start;
	const getBorder = (direction) => {
		if (isNil(direction)) {
			throw new Error('Direction is required');
		}
		return borders.get(direction);
	};

	return Object.freeze({
		getFloorType,
		getStartType,
		getBorder
	});
};
