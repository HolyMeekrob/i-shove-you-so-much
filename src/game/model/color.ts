export type Color = number;

const leftPad = (padChar: string, minLength: number, str: string): string =>
	str.length >= minLength
		? str
		: leftPad(padChar, minLength, `${padChar}${str}`);

export const hexFormat = (color: Color): string =>
	`#${leftPad('0', 6, color.toString(16))}`;
