import { unfold } from 'ramda';

export const iterateWhile = <T>(fI: (a: T) => T, fV: (b: T) => boolean, seed: T): T[] =>
	unfold((val: T) => fV(val) ? [val, fI(val)] : false, seed);

export const iterateN = <T>(f: (a: T) => T, n: number, seed: T): T[] => {
	interface IHelper {
		count: number;
		val: T;
	}

	return unfold((x: IHelper) =>
		x.count < n ? [x.val, { count: x.count + 1, val: f(x.val) }] : false,
		{ count: 0, val: seed });
};
