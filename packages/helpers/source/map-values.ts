import { FunctionReturning } from "./types.js";

export const mapValues = <T extends object>(iterable: T, iteratee: FunctionReturning): object => {
	const keys: string[] = Object.keys(iterable as object);
	const result = {};

	for (let i = 0; i < keys.length; i++) {
		const key: string = keys[i];

		result[key] = iteratee(iterable[key], key, iterable);
	}

	return result;
};
