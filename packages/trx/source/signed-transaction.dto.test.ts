import { describe } from "@ardenthq/sdk-test";
import { DateTime } from "@ardenthq/sdk-intl";

import { createService } from "../test/mocking";
import { SignedTransactionData } from "./signed-transaction.dto.js";

describe("SignedTransactionData", async ({ beforeEach, it, assert }) => {
	beforeEach(async (context) => {
		context.subject = await createService(SignedTransactionData);

		context.subject.configure(
			"214e690d9a630013826a5ad002c254740028ae3b8f4230949fd04148e3d26b42",
			{
				visible: false,
				txID: "214e690d9a630013826a5ad002c254740028ae3b8f4230949fd04148e3d26b42",
				raw_data: {
					contract: [
						{
							parameter: {
								value: {
									amount: 1000000,
									owner_address: "410971d4dec6c12a9b4df09cbad2e42c063084860a",
									to_address: "41359a9ff5b9cd7c752e56194586e85f2fe24401fa",
								},
								type_url: "type.googleapis.com/protocol.TransferContract",
							},
							type: "TransferContract",
						},
					],
					ref_block_bytes: "a1b9",
					ref_block_hash: "dd59919999e7c481",
					expiration: 1620877881000,
					timestamp: 1620877822246,
				},
				raw_data_hex:
					"0a02a1b92208dd59919999e7c48140a8dde69e962f5a67080112630a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412320a15410971d4dec6c12a9b4df09cbad2e42c063084860a121541359a9ff5b9cd7c752e56194586e85f2fe24401fa18c0843d70a692e39e962f",
				signature: [
					"87c7efb2be02e64019ecfda21021a7fac4b0664e0f67eaa64b6bed8e26315eb3e215660ecb1659d647094decdc2221fecbf0fbbf2de78c8f6b2fdc729e4953a401",
				],
			},
			"",
		);
	});

	it("should have a sender", (context) => {
		assert.is(context.subject.sender(), "410971d4dec6c12a9b4df09cbad2e42c063084860a");
	});

	it("should have a recipient", (context) => {
		assert.is(context.subject.recipient(), "41359a9ff5b9cd7c752e56194586e85f2fe24401fa");
	});

	it("should have an amount", (context) => {
		assert.is(context.subject.amount().toNumber(), 1_000_000);
	});

	it("should have a fee", (context) => {
		assert.is(context.subject.fee().toNumber(), 0);
	});

	it("should have a timestamp", (context) => {
		assert.true(DateTime.make(1620877822246).isSame(context.subject.timestamp()));
	});
});
