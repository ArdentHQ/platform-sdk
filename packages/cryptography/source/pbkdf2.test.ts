import { describeWithContext } from "@ardenthq/sdk-test";

import { PBKDF2 } from "./pbkdf2";

describeWithContext(
	"PBKDF2",
	{
		message: "Hello World",
		password: "password",
	},
	({ assert, it }) => {
		it("should encrypt the given value", async ({ message, password }) => {
			assert.type(await PBKDF2.encrypt(message, password), "string");
		});

		it("should decrypt the given value", async ({ message, password }) => {
			assert.is(await PBKDF2.decrypt(await PBKDF2.encrypt(message, password), password), message);
		});
	},
);
