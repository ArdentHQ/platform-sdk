import { UUID } from "@ardenthq/sdk-cryptography";
import { describeWithContext } from "@ardenthq/sdk-test";

import { bootContainer } from "../test/mocking";
import { ContactAddressRepository } from "./contact-address.repository";
import { Profile } from "./profile";

void describeWithContext(
	"ContactAddressRepository",
	{
		stubData: {
			address: "D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW",
			coin: "ARK",
			network: "ark.devnet",
		},
	},
	async ({ it, beforeEach, assert }) => {
		beforeEach((context) => {
			bootContainer();

			context.profile = new Profile({ avatar: "avatar", data: "", id: "uuid", name: "name" });
			context.subject = new ContactAddressRepository(context.profile);
		});

		it("#create", (context) => {
			assert.length(context.subject.keys(), 0);

			context.subject.create(context.stubData);

			assert.length(context.subject.keys(), 1);

			// @TODO
			// assert.equal(context.subject.first().toObject(), {
			// 	id: expect.any(String),
			// 	...stubData,
			// });
		});

		it("#all", (context) => {
			assert.object(context.subject.all());
		});

		it("#first", (context) => {
			const address = context.subject.create(context.stubData);

			assert.is(context.subject.first(), address);
		});

		it("#last", (context) => {
			const address = context.subject.create(context.stubData);

			assert.is(context.subject.last(), address);
		});

		it("#count", (context) => {
			context.subject.create(context.stubData);

			assert.is(context.subject.count(), 1);
		});

		it("#fill", (context) => {
			const id = UUID.random();

			context.subject.fill([{ id, ...context.stubData }]);

			assert.object(context.subject.findById(id));
		});

		it("#toArray", (context) => {
			const address = context.subject.create(context.stubData);

			assert.equal(context.subject.toArray(), [address.toObject()]);
		});

		it("#find", (context) => {
			assert.throws(() => context.subject.findById("invalid"), "Failed to find");

			const address = context.subject.create(context.stubData);

			assert.object(context.subject.findById(address.id()));
		});

		it("#update invalid", (context) => {
			assert.throws(
				() => context.subject.update("invalid", { address: context.stubData.address }),
				"Failed to find",
			);
		});

		it("#update address", (context) => {
			const address = context.subject.create(context.stubData);

			context.subject.update(address.id(), { address: "new address" });

			assert.is(context.subject.findByAddress("new address")[0].address(), "new address");
			assert.true(context.profile.status().isDirty());
		});

		it("#update without address", (context) => {
			const address = context.subject.create(context.stubData);

			context.subject.update(address.id(), {});

			assert.equal(context.subject.findByAddress("new address"), []);
		});

		it("#forget", (context) => {
			assert.throws(() => context.subject.forget("invalid"), "Failed to find");

			const address = context.subject.create(context.stubData);

			context.subject.forget(address.id());

			assert.throws(() => context.subject.findById(address.id()), "Failed to find");
		});

		it("#findByAddress", (context) => {
			const address = context.subject.create(context.stubData);

			assert.length(context.subject.findByAddress(address.address()), 1);
			assert.length(context.subject.findByAddress("invalid"), 0);
		});

		it("#findByCoin", (context) => {
			const address = context.subject.create(context.stubData);

			assert.length(context.subject.findByCoin(address.coin()), 1);
			assert.length(context.subject.findByCoin("invalid"), 0);
		});

		it("#findByNetwork", (context) => {
			const address = context.subject.create(context.stubData);

			assert.length(context.subject.findByNetwork(address.network()), 1);
			assert.length(context.subject.findByNetwork("invalid"), 0);
		});

		it("#flush", (context) => {
			context.subject.create(context.stubData);

			assert.length(context.subject.keys(), 1);

			context.subject.flush();

			assert.length(context.subject.keys(), 0);
		});

		it("#exists", (context) => {
			context.subject.create(context.stubData);

			assert.true(context.subject.exists(context.stubData));

			assert.false(
				context.subject.exists({
					address: "DAWdHfDFEvvu57cHjAhs5K5di33B2DdCu1",
					coin: "ARK",
					network: "ark.devnet",
				}),
			);
		});
	},
);
