import * as test from 'tape';

import { iterateWhile, iterateN } from '../../../../src/util/iterate';

test('util.iterateWhile()', (assert: test.Test): void => {
	const addOne = (x: number) => x + 1;
	const isLessThanTen = (x: number) => x < 10;
	const seed: number = 5;

	assert.deepEqual(iterateWhile(addOne, isLessThanTen, seed), [5, 6, 7, 8, 9],
		'returns an array beginning with the seed and iterating on the returned value until the iterate function returns false');
	assert.end();
});

test('util.iterateN()', (assert: test.Test): void => {
	const double = (x: number) => x * 2;
	const n: number = 6;
	const seed: number = 7;

	assert.deepEqual(iterateN(double, n, seed), [7, 14, 28, 56, 112, 224],
		'returns an array beginning with the seed and iterating on the returned value n times');
	assert.end();
});
