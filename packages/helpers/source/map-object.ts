import { FunctionReturning } from "./types.js";
export const mapObject = <T extends object, R extends object>(iterable: T, iteratee: FunctionReturning): R[] => {
	const keys: string[] = Object.keys(iterable as object);
	const result: R[] = new Array(keys.length);

	for (let i = 0; i < keys.length; i++) {
		const key: string = keys[i];

		result[i] = iteratee(iterable[key], key, iterable);
	}

	return result;
};
