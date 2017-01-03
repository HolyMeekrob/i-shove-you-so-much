import * as test from 'tape';
import { hexFormat } from '../../../src/game/model/color';

test('hexFormat given white', (assert: test.Test): void => {
	assert.equal(hexFormat(0xffffff), '#ffffff', 'returns the hex code for white');
	assert.end();
});

test('hexFormat given black', (assert: test.Test): void => {
	assert.equal(hexFormat(0x0), '#000000', 'returns the hex code for black');
	assert.end();
});

test('hexFormat given a color', (assert: test.Test): void => {
	assert.equal(hexFormat(0xa0b1), '#00a0b1', 'returns the hex code for that color');
	assert.end();
});

test('hexFormat given a value greater than 3 bytes', (assert: test.Test): void => {
	assert.equal(hexFormat(0xabcdef01), '#abcdef01', 'returns the value');
	assert.end();
});
