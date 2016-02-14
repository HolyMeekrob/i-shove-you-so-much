import ft from './floorType';
import bt from './borderType';

import { defaultTo } from 'ramda';

export default (floorType, northBorder, eastBorder, southBorder, westBorder) => {
	const floor = defaultTo(ft.NORMAL, floorType);
	const north = defaultTo(bt.OPEN, northBorder);
	const east = defaultTo(bt.OPEN, eastBorder);
	const south = defaultTo(bt.OPEN, southBorder);
	const west = defaultTo(bt.OPEN, westBorder);

	const getFloorType = () => floor;
	const getNorthBorder = () => north;
	const getEastBorder = () => east;
	const getSouthBorder = () => south;
	const getWestBorder = () => west;


	return Object.freeze({
		getFloorType,
		getNorthBorder,
		getEastBorder,
		getSouthBorder,
		getWestBorder
	});
};
