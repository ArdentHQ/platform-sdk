import { FunctionReturning } from "./types.js";

export const reduceObject = <T extends object, V>(iterable: T, iteratee: FunctionReturning, initialValue: V): V => {
	const keys: string[] = Object.keys(iterable);

	let result: V = initialValue;

	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];

		result = iteratee(result, iterable[key], key, iterable);
	}

	return result;
};
