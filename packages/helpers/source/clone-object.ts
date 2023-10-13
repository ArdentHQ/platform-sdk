export const cloneObject = <T extends object>(input: T): T => {
	const keys: string[] = Object.keys(input);
	const cloned = {};

	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];

		cloned[key] = input[key];
	}

	return cloned as T;
};


