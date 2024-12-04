import { decodeFunctionData as viemDecodeFunctionData, Hex } from "viem";
import { ConsensusAbi } from "@mainsail/evm-contracts";

interface FunctionData {
	functionName: string;
	args: any[];
}

export const decodeFunctionData = (data: Hex): FunctionData => {
	try {
		const result = viemDecodeFunctionData({
			abi: ConsensusAbi.abi,
			data,
		}) as FunctionData;

		return result;
	} catch (error) {
		throw new Error(error.message);
	}
};
