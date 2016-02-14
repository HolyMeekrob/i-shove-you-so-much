import { NORMAL_FLOOR } from './floor';
import { NEITHER_START } from './start';
import { OPEN_BORDER } from './border';

import { defaultTo } from 'ramda';

export default (floorType, startType, northBorder, eastBorder, southBorder, westBorder) => {
	const floor = defaultTo(NORMAL_FLOOR, floorType);
	const start = defaultTo(NEITHER_START, startType);
	const north = defaultTo(OPEN_BORDER, northBorder);
	const east = defaultTo(OPEN_BORDER, eastBorder);
	const south = defaultTo(OPEN_BORDER, southBorder);
	const west = defaultTo(OPEN_BORDER, westBorder);

	const getFloorType = () => floor;
	const getStartType = () => start;
	const getNorthBorder = () => north;
	const getEastBorder = () => east;
	const getSouthBorder = () => south;
	const getWestBorder = () => west;


	return Object.freeze({
		getFloorType,
		getStartType,
		getNorthBorder,
		getEastBorder,
		getSouthBorder,
		getWestBorder
	});
};
