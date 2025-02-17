import { decodeFunctionData as viemDecodeFunctionData, Hex } from "viem";
import { ConsensusAbi, UsernamesAbi } from "@mainsail/evm-contracts";

interface FunctionData {
	functionName: string;
	args: any[];
}

export const decodeFunctionData = (data: Hex, abiType: "consensus" | "username" = "consensus"): FunctionData => {
	const abi = abiType === "consensus" ? ConsensusAbi.abi : UsernamesAbi.abi;

	try {
		const result = viemDecodeFunctionData({
			abi,
			data,
		}) as FunctionData;

		return result;
	} catch (error) {
		throw new Error(error.message);
	}
};
