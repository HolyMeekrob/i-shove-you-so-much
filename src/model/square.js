import ft from './floorType';
import st from './startType';
import bt from './borderType';

import { defaultTo } from 'ramda';

export default (floorType, startType, northBorder, eastBorder, southBorder, westBorder) => {
	const floor = defaultTo(ft.NORMAL, floorType);
	const start = defaultTo(st.NONE, startType);
	const north = defaultTo(bt.OPEN, northBorder);
	const east = defaultTo(bt.OPEN, eastBorder);
	const south = defaultTo(bt.OPEN, southBorder);
	const west = defaultTo(bt.OPEN, westBorder);

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
