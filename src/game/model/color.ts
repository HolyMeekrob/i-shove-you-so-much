export type Color = number;

const leftPad = (padChar: string, minLength: number, str: string): string =>
	str.length >= minLength
		? str
		: leftPad(padChar, minLength, `${padChar}${str}`);

export const hexFormat = (color: Color): string =>
	`#${leftPad('0', 6, color.toString(16))}`;

export const getRed = (color: Color): number =>
	color >> 16;

export const getGreen = (color: Color): number =>
	color >> 8 & 0xff;

export const getBlue = (color: Color): number =>
	color & 0xff;
