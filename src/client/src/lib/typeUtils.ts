export const ensureDefined = <T>(val: T | undefined, defaultVal: T): T =>
	val === undefined ? defaultVal : val;