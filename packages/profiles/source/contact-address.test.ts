import { describe } from "@ardenthq/sdk-test";

import { bootContainer } from "../test/mocking";
import { ContactAddress } from "./contact-address.js";
import { Profile } from "./profile";

describe("ContactAddress", async ({ it, assert, beforeEach }) => {
	beforeEach((context) => {
		bootContainer();

		const profile = new Profile({ avatar: "avatar", data: "", id: "profile-id", name: "name" });

		context.subject = new ContactAddress(
			{
				address: "0xA5cc0BfEB09742C5e4C610f2EBaaB82Eb142Ca10",
				coin: "ARK",
				id: "uuid",
			},
			profile,
		);
	});

	it("should have an id", (context) => {
		assert.is(context.subject.id(), "uuid");
	});

	it("should have a coin", (context) => {
		assert.is(context.subject.coin(), "ARK");
	});

	it("should have an address", (context) => {
		assert.is(context.subject.address(), "0xA5cc0BfEB09742C5e4C610f2EBaaB82Eb142Ca10");
	});

	it("should have an avatar", (context) => {
		assert.string(context.subject.avatar());
	});

	it("should turn into an object", (context) => {
		assert.equal(context.subject.toObject(), {
			address: "0xA5cc0BfEB09742C5e4C610f2EBaaB82Eb142Ca10",
			coin: "ARK",
			id: "uuid",
		});
	});

	it("should change the address", (context) => {
		context.subject.setAddress("new address");
		assert.is(context.subject.address(), "new address");
	});
});
