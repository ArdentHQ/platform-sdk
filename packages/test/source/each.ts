// @ts-nocheck

import { format as concordance } from "concordance";
import SK from "string-kit";
import { Callback, Context, Test, test } from "uvu";

export const formatName = (name: string, dataset: unknown): string => SK.format(name, concordance(dataset));

export const each = (test: Test) => (name: string, callback: Callback<any>, datasets: unknown[]) => {
	for (const dataset of datasets) {
		test(formatName(name, dataset), async (context: Context) => callback({ context, dataset }));
	}
};
