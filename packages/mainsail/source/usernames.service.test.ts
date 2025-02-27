import { Collections, DTO, IoC } from "@ardenthq/sdk";
import { describe } from "@ardenthq/sdk-test";

import { createService } from "../test/mocking";
import { UsernamesService } from "./usernames.service.js";

describe("UsernamesService", async ({ assert, beforeEach, it, nock }) => {
	beforeEach(async (context) => {
		context.subject = await createService(UsernamesService, undefined, (container) => {
			container.constant(IoC.BindingType.ClientService, {
				usernames: async (addresses: string[]): Promise<Collections.UsernameDataCollection> =>
					new Collections.UsernameDataCollection([
						new DTO.UsernameData({
							address: "0x93485b57ff3DeD81430D08579142fAe8234c6A17",
							username: "user1",
						}),
						new DTO.UsernameData({
							address: "0x6F0182a0cc707b055322CcF6d4CB6a5Aff1aEb22",
							username: "user2",
						}),
					]),
			});
		});
	});

	it("should return a collection of usernames if the request succeeds", async (context) => {
		const addresses = ["0x93485b57ff3DeD81430D08579142fAe8234c6A17", "0x6F0182a0cc707b055322CcF6d4CB6a5Aff1aEb22"];

		const result = await context.subject.usernames(addresses);

		assert.instance(result, Collections.UsernameDataCollection);
		assert.length(result.items(), 2);
		assert.equal(result.items()[0].address(), "0x93485b57ff3DeD81430D08579142fAe8234c6A17");
		assert.equal(result.items()[0].username(), "user1");
		assert.equal(result.items()[1].address(), "0x6F0182a0cc707b055322CcF6d4CB6a5Aff1aEb22");
		assert.equal(result.items()[1].username(), "user2");
	});
});
