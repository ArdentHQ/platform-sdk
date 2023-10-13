import { FunctionReturning } from "./types.js";

export const reduceRightObject = <T extends object, V>(
	iterable: T,
	iteratee: FunctionReturning,
	initialValue?: V,
): V | undefined => {
	const keys: string[] = Object.keys(iterable as object);

	let result: V | undefined = initialValue;

	for (let i = keys.length - 1; i >= 0; i--) {
		const key = keys[i];

		result = iteratee(result, iterable[key], key, iterable);
	}

	return result;
};
