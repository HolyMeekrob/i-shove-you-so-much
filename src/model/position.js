export default (x, y) => {
	const equals = (pos) => pos.x === x && pos.y === y;
	return Object.freeze({ equals, x, y });
};
