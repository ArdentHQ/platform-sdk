"use strict";
export const hex = validate32;
const schema46 = { $id: "hex", type: "string", pattern: "^[0123456789A-Fa-f]+$" };
const pattern0 = new RegExp("^[0123456789A-Fa-f]+$", "u");
function validate32(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	/*# sourceURL="hex" */ let vErrors = null;
	let errors = 0;
	if (typeof data === "string") {
		if (!pattern0.test(data)) {
			const err0 = {
				instancePath,
				schemaPath: "#/pattern",
				keyword: "pattern",
				params: { pattern: "^[0123456789A-Fa-f]+$" },
				message: 'must match pattern "' + "^[0123456789A-Fa-f]+$" + '"',
				schema: "^[0123456789A-Fa-f]+$",
				parentSchema: schema46,
				data,
			};
			if (vErrors === null) {
				vErrors = [err0];
			} else {
				vErrors.push(err0);
			}
			errors++;
		}
	} else {
		const err1 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "string" },
			message: "must be string",
			schema: schema46.type,
			parentSchema: schema46,
			data,
		};
		if (vErrors === null) {
			vErrors = [err1];
		} else {
			vErrors.push(err1);
		}
		errors++;
	}
	validate32.errors = vErrors;
	return errors === 0;
}
export const base58 = validate33;
const schema47 = {
	$id: "base58",
	type: "string",
	pattern: "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$",
};
const pattern1 = new RegExp("^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$", "u");
function validate33(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	/*# sourceURL="base58" */ let vErrors = null;
	let errors = 0;
	if (typeof data === "string") {
		if (!pattern1.test(data)) {
			const err0 = {
				instancePath,
				schemaPath: "#/pattern",
				keyword: "pattern",
				params: { pattern: "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$" },
				message:
					'must match pattern "' + "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$" + '"',
				schema: "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$",
				parentSchema: schema47,
				data,
			};
			if (vErrors === null) {
				vErrors = [err0];
			} else {
				vErrors.push(err0);
			}
			errors++;
		}
	} else {
		const err1 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "string" },
			message: "must be string",
			schema: schema47.type,
			parentSchema: schema47,
			data,
		};
		if (vErrors === null) {
			vErrors = [err1];
		} else {
			vErrors.push(err1);
		}
		errors++;
	}
	validate33.errors = vErrors;
	return errors === 0;
}
export const alphanumeric = validate34;
const schema48 = { $id: "alphanumeric", type: "string", pattern: "^[a-zA-Z0-9]+$" };
const pattern2 = new RegExp("^[a-zA-Z0-9]+$", "u");
function validate34(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	/*# sourceURL="alphanumeric" */ let vErrors = null;
	let errors = 0;
	if (typeof data === "string") {
		if (!pattern2.test(data)) {
			const err0 = {
				instancePath,
				schemaPath: "#/pattern",
				keyword: "pattern",
				params: { pattern: "^[a-zA-Z0-9]+$" },
				message: 'must match pattern "' + "^[a-zA-Z0-9]+$" + '"',
				schema: "^[a-zA-Z0-9]+$",
				parentSchema: schema48,
				data,
			};
			if (vErrors === null) {
				vErrors = [err0];
			} else {
				vErrors.push(err0);
			}
			errors++;
		}
	} else {
		const err1 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "string" },
			message: "must be string",
			schema: schema48.type,
			parentSchema: schema48,
			data,
		};
		if (vErrors === null) {
			vErrors = [err1];
		} else {
			vErrors.push(err1);
		}
		errors++;
	}
	validate34.errors = vErrors;
	return errors === 0;
}
export const transactionId = validate35;
const schema49 = { $id: "transactionId", type: "string", allOf: [{ minLength: 64, maxLength: 64 }, { $ref: "hex" }] };
const func2 = require("ajv/dist/runtime/ucs2length").default;
function validate35(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	/*# sourceURL="transactionId" */ let vErrors = null;
	let errors = 0;
	if (typeof data !== "string") {
		const err0 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "string" },
			message: "must be string",
			schema: schema49.type,
			parentSchema: schema49,
			data,
		};
		if (vErrors === null) {
			vErrors = [err0];
		} else {
			vErrors.push(err0);
		}
		errors++;
	}
	if (typeof data === "string") {
		if (func2(data) > 64) {
			const err1 = {
				instancePath,
				schemaPath: "#/allOf/0/maxLength",
				keyword: "maxLength",
				params: { limit: 64 },
				message: "must NOT have more than 64 characters",
				schema: 64,
				parentSchema: schema49.allOf[0],
				data,
			};
			if (vErrors === null) {
				vErrors = [err1];
			} else {
				vErrors.push(err1);
			}
			errors++;
		}
		if (func2(data) < 64) {
			const err2 = {
				instancePath,
				schemaPath: "#/allOf/0/minLength",
				keyword: "minLength",
				params: { limit: 64 },
				message: "must NOT have fewer than 64 characters",
				schema: 64,
				parentSchema: schema49.allOf[0],
				data,
			};
			if (vErrors === null) {
				vErrors = [err2];
			} else {
				vErrors.push(err2);
			}
			errors++;
		}
	}
	if (typeof data === "string") {
		if (!pattern0.test(data)) {
			const err3 = {
				instancePath,
				schemaPath: "hex/pattern",
				keyword: "pattern",
				params: { pattern: "^[0123456789A-Fa-f]+$" },
				message: 'must match pattern "' + "^[0123456789A-Fa-f]+$" + '"',
				schema: "^[0123456789A-Fa-f]+$",
				parentSchema: schema46,
				data,
			};
			if (vErrors === null) {
				vErrors = [err3];
			} else {
				vErrors.push(err3);
			}
			errors++;
		}
	} else {
		const err4 = {
			instancePath,
			schemaPath: "hex/type",
			keyword: "type",
			params: { type: "string" },
			message: "must be string",
			schema: schema46.type,
			parentSchema: schema46,
			data,
		};
		if (vErrors === null) {
			vErrors = [err4];
		} else {
			vErrors.push(err4);
		}
		errors++;
	}
	validate35.errors = vErrors;
	return errors === 0;
}
export const networkByte = validate36;
const schema51 = { $id: "networkByte", network: true };
function validate36(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	/*# sourceURL="networkByte" */ let vErrors = null;
	let errors = 0;
	validate36.errors = vErrors;
	return errors === 0;
}
export const address = validate37;
const schema52 = { $id: "address", type: "string", allOf: [{ minLength: 34, maxLength: 34 }, { $ref: "base58" }] };
function validate37(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	/*# sourceURL="address" */ let vErrors = null;
	let errors = 0;
	if (typeof data !== "string") {
		const err0 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "string" },
			message: "must be string",
			schema: schema52.type,
			parentSchema: schema52,
			data,
		};
		if (vErrors === null) {
			vErrors = [err0];
		} else {
			vErrors.push(err0);
		}
		errors++;
	}
	if (typeof data === "string") {
		if (func2(data) > 34) {
			const err1 = {
				instancePath,
				schemaPath: "#/allOf/0/maxLength",
				keyword: "maxLength",
				params: { limit: 34 },
				message: "must NOT have more than 34 characters",
				schema: 34,
				parentSchema: schema52.allOf[0],
				data,
			};
			if (vErrors === null) {
				vErrors = [err1];
			} else {
				vErrors.push(err1);
			}
			errors++;
		}
		if (func2(data) < 34) {
			const err2 = {
				instancePath,
				schemaPath: "#/allOf/0/minLength",
				keyword: "minLength",
				params: { limit: 34 },
				message: "must NOT have fewer than 34 characters",
				schema: 34,
				parentSchema: schema52.allOf[0],
				data,
			};
			if (vErrors === null) {
				vErrors = [err2];
			} else {
				vErrors.push(err2);
			}
			errors++;
		}
	}
	if (typeof data === "string") {
		if (!pattern1.test(data)) {
			const err3 = {
				instancePath,
				schemaPath: "base58/pattern",
				keyword: "pattern",
				params: { pattern: "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$" },
				message:
					'must match pattern "' + "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$" + '"',
				schema: "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$",
				parentSchema: schema47,
				data,
			};
			if (vErrors === null) {
				vErrors = [err3];
			} else {
				vErrors.push(err3);
			}
			errors++;
		}
	} else {
		const err4 = {
			instancePath,
			schemaPath: "base58/type",
			keyword: "type",
			params: { type: "string" },
			message: "must be string",
			schema: schema47.type,
			parentSchema: schema47,
			data,
		};
		if (vErrors === null) {
			vErrors = [err4];
		} else {
			vErrors.push(err4);
		}
		errors++;
	}
	validate37.errors = vErrors;
	return errors === 0;
}
export const publicKey = validate38;
const schema54 = {
	$id: "publicKey",
	type: "string",
	allOf: [{ minLength: 66, maxLength: 66 }, { $ref: "hex" }, { transform: ["toLowerCase"] }],
};
const func8 = require("ajv-keywords/dist/definitions/transform").transform.toLowerCase;
function validate38(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	/*# sourceURL="publicKey" */ let vErrors = null;
	let errors = 0;
	if (typeof data !== "string") {
		const err0 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "string" },
			message: "must be string",
			schema: schema54.type,
			parentSchema: schema54,
			data,
		};
		if (vErrors === null) {
			vErrors = [err0];
		} else {
			vErrors.push(err0);
		}
		errors++;
	}
	if (typeof data === "string") {
		if (func2(data) > 66) {
			const err1 = {
				instancePath,
				schemaPath: "#/allOf/0/maxLength",
				keyword: "maxLength",
				params: { limit: 66 },
				message: "must NOT have more than 66 characters",
				schema: 66,
				parentSchema: schema54.allOf[0],
				data,
			};
			if (vErrors === null) {
				vErrors = [err1];
			} else {
				vErrors.push(err1);
			}
			errors++;
		}
		if (func2(data) < 66) {
			const err2 = {
				instancePath,
				schemaPath: "#/allOf/0/minLength",
				keyword: "minLength",
				params: { limit: 66 },
				message: "must NOT have fewer than 66 characters",
				schema: 66,
				parentSchema: schema54.allOf[0],
				data,
			};
			if (vErrors === null) {
				vErrors = [err2];
			} else {
				vErrors.push(err2);
			}
			errors++;
		}
	}
	if (typeof data === "string") {
		if (!pattern0.test(data)) {
			const err3 = {
				instancePath,
				schemaPath: "hex/pattern",
				keyword: "pattern",
				params: { pattern: "^[0123456789A-Fa-f]+$" },
				message: 'must match pattern "' + "^[0123456789A-Fa-f]+$" + '"',
				schema: "^[0123456789A-Fa-f]+$",
				parentSchema: schema46,
				data,
			};
			if (vErrors === null) {
				vErrors = [err3];
			} else {
				vErrors.push(err3);
			}
			errors++;
		}
	} else {
		const err4 = {
			instancePath,
			schemaPath: "hex/type",
			keyword: "type",
			params: { type: "string" },
			message: "must be string",
			schema: schema46.type,
			parentSchema: schema46,
			data,
		};
		if (vErrors === null) {
			vErrors = [err4];
		} else {
			vErrors.push(err4);
		}
		errors++;
	}
	if (typeof data == "string" && parentData !== undefined) {
		data = func8(data);
		parentData[parentDataProperty] = data;
	}
	validate38.errors = vErrors;
	return errors === 0;
}
export const walletVote = validate39;
const schema56 = {
	$id: "walletVote",
	allOf: [{ type: "string", pattern: "^[+|-][a-zA-Z0-9]{66}$" }, { transform: ["toLowerCase"] }],
};
const pattern6 = new RegExp("^[+|-][a-zA-Z0-9]{66}$", "u");
function validate39(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	/*# sourceURL="walletVote" */ let vErrors = null;
	let errors = 0;
	if (typeof data === "string") {
		if (!pattern6.test(data)) {
			const err0 = {
				instancePath,
				schemaPath: "#/allOf/0/pattern",
				keyword: "pattern",
				params: { pattern: "^[+|-][a-zA-Z0-9]{66}$" },
				message: 'must match pattern "' + "^[+|-][a-zA-Z0-9]{66}$" + '"',
				schema: "^[+|-][a-zA-Z0-9]{66}$",
				parentSchema: schema56.allOf[0],
				data,
			};
			if (vErrors === null) {
				vErrors = [err0];
			} else {
				vErrors.push(err0);
			}
			errors++;
		}
	} else {
		const err1 = {
			instancePath,
			schemaPath: "#/allOf/0/type",
			keyword: "type",
			params: { type: "string" },
			message: "must be string",
			schema: schema56.allOf[0].type,
			parentSchema: schema56.allOf[0],
			data,
		};
		if (vErrors === null) {
			vErrors = [err1];
		} else {
			vErrors.push(err1);
		}
		errors++;
	}
	if (typeof data == "string" && parentData !== undefined) {
		data = func8(data);
		parentData[parentDataProperty] = data;
	}
	validate39.errors = vErrors;
	return errors === 0;
}
export const delegateUsername = validate40;
const schema57 = {
	$id: "delegateUsername",
	type: "string",
	allOf: [
		{ type: "string", pattern: "^[a-z0-9!@$&_.]+$" },
		{ minLength: 1, maxLength: 20 },
		{ transform: ["toLowerCase"] },
	],
};
const pattern7 = new RegExp("^[a-z0-9!@$&_.]+$", "u");
function validate40(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	/*# sourceURL="delegateUsername" */ let vErrors = null;
	let errors = 0;
	if (typeof data !== "string") {
		const err0 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "string" },
			message: "must be string",
			schema: schema57.type,
			parentSchema: schema57,
			data,
		};
		if (vErrors === null) {
			vErrors = [err0];
		} else {
			vErrors.push(err0);
		}
		errors++;
	}
	if (typeof data === "string") {
		if (!pattern7.test(data)) {
			const err1 = {
				instancePath,
				schemaPath: "#/allOf/0/pattern",
				keyword: "pattern",
				params: { pattern: "^[a-z0-9!@$&_.]+$" },
				message: 'must match pattern "' + "^[a-z0-9!@$&_.]+$" + '"',
				schema: "^[a-z0-9!@$&_.]+$",
				parentSchema: schema57.allOf[0],
				data,
			};
			if (vErrors === null) {
				vErrors = [err1];
			} else {
				vErrors.push(err1);
			}
			errors++;
		}
	} else {
		const err2 = {
			instancePath,
			schemaPath: "#/allOf/0/type",
			keyword: "type",
			params: { type: "string" },
			message: "must be string",
			schema: schema57.allOf[0].type,
			parentSchema: schema57.allOf[0],
			data,
		};
		if (vErrors === null) {
			vErrors = [err2];
		} else {
			vErrors.push(err2);
		}
		errors++;
	}
	if (typeof data === "string") {
		if (func2(data) > 20) {
			const err3 = {
				instancePath,
				schemaPath: "#/allOf/1/maxLength",
				keyword: "maxLength",
				params: { limit: 20 },
				message: "must NOT have more than 20 characters",
				schema: 20,
				parentSchema: schema57.allOf[1],
				data,
			};
			if (vErrors === null) {
				vErrors = [err3];
			} else {
				vErrors.push(err3);
			}
			errors++;
		}
		if (func2(data) < 1) {
			const err4 = {
				instancePath,
				schemaPath: "#/allOf/1/minLength",
				keyword: "minLength",
				params: { limit: 1 },
				message: "must NOT have fewer than 1 characters",
				schema: 1,
				parentSchema: schema57.allOf[1],
				data,
			};
			if (vErrors === null) {
				vErrors = [err4];
			} else {
				vErrors.push(err4);
			}
			errors++;
		}
	}
	if (typeof data == "string" && parentData !== undefined) {
		data = func8(data);
		parentData[parentDataProperty] = data;
	}
	validate40.errors = vErrors;
	return errors === 0;
}
export const genericName = validate41;
const schema58 = {
	$id: "genericName",
	type: "string",
	allOf: [
		{ type: "string", pattern: "^[a-zA-Z0-9]+(( - |[ ._-])[a-zA-Z0-9]+)*[.]?$" },
		{ minLength: 1, maxLength: 40 },
	],
};
const pattern8 = new RegExp("^[a-zA-Z0-9]+(( - |[ ._-])[a-zA-Z0-9]+)*[.]?$", "u");
function validate41(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	/*# sourceURL="genericName" */ let vErrors = null;
	let errors = 0;
	if (typeof data !== "string") {
		const err0 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "string" },
			message: "must be string",
			schema: schema58.type,
			parentSchema: schema58,
			data,
		};
		if (vErrors === null) {
			vErrors = [err0];
		} else {
			vErrors.push(err0);
		}
		errors++;
	}
	if (typeof data === "string") {
		if (!pattern8.test(data)) {
			const err1 = {
				instancePath,
				schemaPath: "#/allOf/0/pattern",
				keyword: "pattern",
				params: { pattern: "^[a-zA-Z0-9]+(( - |[ ._-])[a-zA-Z0-9]+)*[.]?$" },
				message: 'must match pattern "' + "^[a-zA-Z0-9]+(( - |[ ._-])[a-zA-Z0-9]+)*[.]?$" + '"',
				schema: "^[a-zA-Z0-9]+(( - |[ ._-])[a-zA-Z0-9]+)*[.]?$",
				parentSchema: schema58.allOf[0],
				data,
			};
			if (vErrors === null) {
				vErrors = [err1];
			} else {
				vErrors.push(err1);
			}
			errors++;
		}
	} else {
		const err2 = {
			instancePath,
			schemaPath: "#/allOf/0/type",
			keyword: "type",
			params: { type: "string" },
			message: "must be string",
			schema: schema58.allOf[0].type,
			parentSchema: schema58.allOf[0],
			data,
		};
		if (vErrors === null) {
			vErrors = [err2];
		} else {
			vErrors.push(err2);
		}
		errors++;
	}
	if (typeof data === "string") {
		if (func2(data) > 40) {
			const err3 = {
				instancePath,
				schemaPath: "#/allOf/1/maxLength",
				keyword: "maxLength",
				params: { limit: 40 },
				message: "must NOT have more than 40 characters",
				schema: 40,
				parentSchema: schema58.allOf[1],
				data,
			};
			if (vErrors === null) {
				vErrors = [err3];
			} else {
				vErrors.push(err3);
			}
			errors++;
		}
		if (func2(data) < 1) {
			const err4 = {
				instancePath,
				schemaPath: "#/allOf/1/minLength",
				keyword: "minLength",
				params: { limit: 1 },
				message: "must NOT have fewer than 1 characters",
				schema: 1,
				parentSchema: schema58.allOf[1],
				data,
			};
			if (vErrors === null) {
				vErrors = [err4];
			} else {
				vErrors.push(err4);
			}
			errors++;
		}
	}
	validate41.errors = vErrors;
	return errors === 0;
}
export const uri = validate42;
const schema59 = { $id: "uri", type: "string", allOf: [{ format: "uri" }, { minLength: 4, maxLength: 80 }] };
const formats0 = require("ajv-formats/dist/formats").fullFormats.uri;
function validate42(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	/*# sourceURL="uri" */ let vErrors = null;
	let errors = 0;
	if (typeof data !== "string") {
		const err0 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "string" },
			message: "must be string",
			schema: schema59.type,
			parentSchema: schema59,
			data,
		};
		if (vErrors === null) {
			vErrors = [err0];
		} else {
			vErrors.push(err0);
		}
		errors++;
	}
	if (typeof data === "string") {
		if (!formats0(data)) {
			const err1 = {
				instancePath,
				schemaPath: "#/allOf/0/format",
				keyword: "format",
				params: { format: "uri" },
				message: 'must match format "' + "uri" + '"',
				schema: "uri",
				parentSchema: schema59.allOf[0],
				data,
			};
			if (vErrors === null) {
				vErrors = [err1];
			} else {
				vErrors.push(err1);
			}
			errors++;
		}
	}
	if (typeof data === "string") {
		if (func2(data) > 80) {
			const err2 = {
				instancePath,
				schemaPath: "#/allOf/1/maxLength",
				keyword: "maxLength",
				params: { limit: 80 },
				message: "must NOT have more than 80 characters",
				schema: 80,
				parentSchema: schema59.allOf[1],
				data,
			};
			if (vErrors === null) {
				vErrors = [err2];
			} else {
				vErrors.push(err2);
			}
			errors++;
		}
		if (func2(data) < 4) {
			const err3 = {
				instancePath,
				schemaPath: "#/allOf/1/minLength",
				keyword: "minLength",
				params: { limit: 4 },
				message: "must NOT have fewer than 4 characters",
				schema: 4,
				parentSchema: schema59.allOf[1],
				data,
			};
			if (vErrors === null) {
				vErrors = [err3];
			} else {
				vErrors.push(err3);
			}
			errors++;
		}
	}
	validate42.errors = vErrors;
	return errors === 0;
}
export const ipfs = validate43;
const schema60 = {
	$id: "ipfs",
	else: { required: ["type", "senderPublicKey", "fee", "amount", "nonce"] },
	if: { properties: { version: { anyOf: [{ type: "null" }, { const: 1 }] } } },
	properties: {
		amount: { bignumber: { minimum: 0, maximum: 0 } },
		fee: { bignumber: { minimum: 1 } },
		id: { anyOf: [{ $ref: "transactionId" }, { type: "null" }] },
		network: { $ref: "networkByte" },
		nonce: { bignumber: { minimum: 0 } },
		secondSignature: { $ref: "alphanumeric" },
		senderPublicKey: { $ref: "publicKey" },
		signSignature: { $ref: "alphanumeric" },
		signature: { $ref: "alphanumeric" },
		version: { enum: [1, 2] },
		signatures: {
			items: { allOf: [{ maxLength: 130, minLength: 130 }, { $ref: "alphanumeric" }] },
			maxItems: 16,
			minItems: 1,
			type: "array",
			uniqueItems: true,
		},
		timestamp: { type: "integer", minimum: 0 },
		typeGroup: { minimum: 0, type: "integer" },
		asset: {
			properties: { ipfs: { allOf: [{ maxLength: 90, minLength: 2 }, { $ref: "base58" }] } },
			required: ["ipfs"],
			type: "object",
		},
		type: { transactionType: 5 },
	},
	then: { required: ["type", "senderPublicKey", "fee", "amount", "timestamp"] },
	type: "object",
};
const func0 = require("ajv/dist/runtime/equal").default;
function validate43(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	/*# sourceURL="ipfs" */ let vErrors = null;
	let errors = 0;
	const _errs1 = errors;
	let valid0 = true;
	const _errs2 = errors;
	if (data && typeof data == "object" && !Array.isArray(data)) {
		if (data.version !== undefined) {
			let data0 = data.version;
			const _errs4 = errors;
			let valid2 = false;
			const _errs5 = errors;
			if (data0 !== null) {
				const err0 = {};
				if (vErrors === null) {
					vErrors = [err0];
				} else {
					vErrors.push(err0);
				}
				errors++;
			}
			var _valid1 = _errs5 === errors;
			valid2 = valid2 || _valid1;
			if (!valid2) {
				const _errs7 = errors;
				if (1 !== data0) {
					const err1 = {};
					if (vErrors === null) {
						vErrors = [err1];
					} else {
						vErrors.push(err1);
					}
					errors++;
				}
				var _valid1 = _errs7 === errors;
				valid2 = valid2 || _valid1;
			}
			if (!valid2) {
				const err2 = {};
				if (vErrors === null) {
					vErrors = [err2];
				} else {
					vErrors.push(err2);
				}
				errors++;
			} else {
				errors = _errs4;
				if (vErrors !== null) {
					if (_errs4) {
						vErrors.length = _errs4;
					} else {
						vErrors = null;
					}
				}
			}
		}
	}
	var _valid0 = _errs2 === errors;
	errors = _errs1;
	if (vErrors !== null) {
		if (_errs1) {
			vErrors.length = _errs1;
		} else {
			vErrors = null;
		}
	}
	let ifClause0;
	if (_valid0) {
		const _errs8 = errors;
		if (data && typeof data == "object" && !Array.isArray(data)) {
			if (data.type === undefined) {
				const err3 = {
					instancePath,
					schemaPath: "#/then/required",
					keyword: "required",
					params: { missingProperty: "type" },
					message: "must have required property '" + "type" + "'",
					schema: schema60.then.required,
					parentSchema: schema60.then,
					data,
				};
				if (vErrors === null) {
					vErrors = [err3];
				} else {
					vErrors.push(err3);
				}
				errors++;
			}
			if (data.senderPublicKey === undefined) {
				const err4 = {
					instancePath,
					schemaPath: "#/then/required",
					keyword: "required",
					params: { missingProperty: "senderPublicKey" },
					message: "must have required property '" + "senderPublicKey" + "'",
					schema: schema60.then.required,
					parentSchema: schema60.then,
					data,
				};
				if (vErrors === null) {
					vErrors = [err4];
				} else {
					vErrors.push(err4);
				}
				errors++;
			}
			if (data.fee === undefined) {
				const err5 = {
					instancePath,
					schemaPath: "#/then/required",
					keyword: "required",
					params: { missingProperty: "fee" },
					message: "must have required property '" + "fee" + "'",
					schema: schema60.then.required,
					parentSchema: schema60.then,
					data,
				};
				if (vErrors === null) {
					vErrors = [err5];
				} else {
					vErrors.push(err5);
				}
				errors++;
			}
			if (data.amount === undefined) {
				const err6 = {
					instancePath,
					schemaPath: "#/then/required",
					keyword: "required",
					params: { missingProperty: "amount" },
					message: "must have required property '" + "amount" + "'",
					schema: schema60.then.required,
					parentSchema: schema60.then,
					data,
				};
				if (vErrors === null) {
					vErrors = [err6];
				} else {
					vErrors.push(err6);
				}
				errors++;
			}
			if (data.timestamp === undefined) {
				const err7 = {
					instancePath,
					schemaPath: "#/then/required",
					keyword: "required",
					params: { missingProperty: "timestamp" },
					message: "must have required property '" + "timestamp" + "'",
					schema: schema60.then.required,
					parentSchema: schema60.then,
					data,
				};
				if (vErrors === null) {
					vErrors = [err7];
				} else {
					vErrors.push(err7);
				}
				errors++;
			}
		}
		var _valid0 = _errs8 === errors;
		valid0 = _valid0;
		ifClause0 = "then";
	} else {
		const _errs9 = errors;
		if (data && typeof data == "object" && !Array.isArray(data)) {
			if (data.type === undefined) {
				const err8 = {
					instancePath,
					schemaPath: "#/else/required",
					keyword: "required",
					params: { missingProperty: "type" },
					message: "must have required property '" + "type" + "'",
					schema: schema60.else.required,
					parentSchema: schema60.else,
					data,
				};
				if (vErrors === null) {
					vErrors = [err8];
				} else {
					vErrors.push(err8);
				}
				errors++;
			}
			if (data.senderPublicKey === undefined) {
				const err9 = {
					instancePath,
					schemaPath: "#/else/required",
					keyword: "required",
					params: { missingProperty: "senderPublicKey" },
					message: "must have required property '" + "senderPublicKey" + "'",
					schema: schema60.else.required,
					parentSchema: schema60.else,
					data,
				};
				if (vErrors === null) {
					vErrors = [err9];
				} else {
					vErrors.push(err9);
				}
				errors++;
			}
			if (data.fee === undefined) {
				const err10 = {
					instancePath,
					schemaPath: "#/else/required",
					keyword: "required",
					params: { missingProperty: "fee" },
					message: "must have required property '" + "fee" + "'",
					schema: schema60.else.required,
					parentSchema: schema60.else,
					data,
				};
				if (vErrors === null) {
					vErrors = [err10];
				} else {
					vErrors.push(err10);
				}
				errors++;
			}
			if (data.amount === undefined) {
				const err11 = {
					instancePath,
					schemaPath: "#/else/required",
					keyword: "required",
					params: { missingProperty: "amount" },
					message: "must have required property '" + "amount" + "'",
					schema: schema60.else.required,
					parentSchema: schema60.else,
					data,
				};
				if (vErrors === null) {
					vErrors = [err11];
				} else {
					vErrors.push(err11);
				}
				errors++;
			}
			if (data.nonce === undefined) {
				const err12 = {
					instancePath,
					schemaPath: "#/else/required",
					keyword: "required",
					params: { missingProperty: "nonce" },
					message: "must have required property '" + "nonce" + "'",
					schema: schema60.else.required,
					parentSchema: schema60.else,
					data,
				};
				if (vErrors === null) {
					vErrors = [err12];
				} else {
					vErrors.push(err12);
				}
				errors++;
			}
		}
		var _valid0 = _errs9 === errors;
		valid0 = _valid0;
		ifClause0 = "else";
	}
	if (!valid0) {
		const err13 = {
			instancePath,
			schemaPath: "#/if",
			keyword: "if",
			params: { failingKeyword: ifClause0 },
			message: 'must match "' + ifClause0 + '" schema',
			schema: schema60.if,
			parentSchema: schema60,
			data,
		};
		if (vErrors === null) {
			vErrors = [err13];
		} else {
			vErrors.push(err13);
		}
		errors++;
	}
	if (data && typeof data == "object" && !Array.isArray(data)) {
		if (data.id !== undefined) {
			let data3 = data.id;
			const _errs13 = errors;
			let valid4 = false;
			const _errs14 = errors;
			if (
				!validate35(data3, {
					instancePath: instancePath + "/id",
					parentData: data,
					parentDataProperty: "id",
					rootData,
				})
			) {
				vErrors = vErrors === null ? validate35.errors : vErrors.concat(validate35.errors);
				errors = vErrors.length;
			}
			var _valid2 = _errs14 === errors;
			valid4 = valid4 || _valid2;
			if (!valid4) {
				const _errs15 = errors;
				if (data3 !== null) {
					const err14 = {
						instancePath: instancePath + "/id",
						schemaPath: "#/properties/id/anyOf/1/type",
						keyword: "type",
						params: { type: "null" },
						message: "must be null",
						schema: schema60.properties.id.anyOf[1].type,
						parentSchema: schema60.properties.id.anyOf[1],
						data: data3,
					};
					if (vErrors === null) {
						vErrors = [err14];
					} else {
						vErrors.push(err14);
					}
					errors++;
				}
				var _valid2 = _errs15 === errors;
				valid4 = valid4 || _valid2;
			}
			if (!valid4) {
				const err15 = {
					instancePath: instancePath + "/id",
					schemaPath: "#/properties/id/anyOf",
					keyword: "anyOf",
					params: {},
					message: "must match a schema in anyOf",
					schema: schema60.properties.id.anyOf,
					parentSchema: schema60.properties.id,
					data: data3,
				};
				if (vErrors === null) {
					vErrors = [err15];
				} else {
					vErrors.push(err15);
				}
				errors++;
			} else {
				errors = _errs13;
				if (vErrors !== null) {
					if (_errs13) {
						vErrors.length = _errs13;
					} else {
						vErrors = null;
					}
				}
			}
		}
		if (data.secondSignature !== undefined) {
			let data6 = data.secondSignature;
			if (typeof data6 === "string") {
				if (!pattern2.test(data6)) {
					const err16 = {
						instancePath: instancePath + "/secondSignature",
						schemaPath: "alphanumeric/pattern",
						keyword: "pattern",
						params: { pattern: "^[a-zA-Z0-9]+$" },
						message: 'must match pattern "' + "^[a-zA-Z0-9]+$" + '"',
						schema: "^[a-zA-Z0-9]+$",
						parentSchema: schema48,
						data: data6,
					};
					if (vErrors === null) {
						vErrors = [err16];
					} else {
						vErrors.push(err16);
					}
					errors++;
				}
			} else {
				const err17 = {
					instancePath: instancePath + "/secondSignature",
					schemaPath: "alphanumeric/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string",
					schema: schema48.type,
					parentSchema: schema48,
					data: data6,
				};
				if (vErrors === null) {
					vErrors = [err17];
				} else {
					vErrors.push(err17);
				}
				errors++;
			}
		}
		if (data.senderPublicKey !== undefined) {
			if (
				!validate38(data.senderPublicKey, {
					instancePath: instancePath + "/senderPublicKey",
					parentData: data,
					parentDataProperty: "senderPublicKey",
					rootData,
				})
			) {
				vErrors = vErrors === null ? validate38.errors : vErrors.concat(validate38.errors);
				errors = vErrors.length;
			}
		}
		if (data.signSignature !== undefined) {
			let data8 = data.signSignature;
			if (typeof data8 === "string") {
				if (!pattern2.test(data8)) {
					const err18 = {
						instancePath: instancePath + "/signSignature",
						schemaPath: "alphanumeric/pattern",
						keyword: "pattern",
						params: { pattern: "^[a-zA-Z0-9]+$" },
						message: 'must match pattern "' + "^[a-zA-Z0-9]+$" + '"',
						schema: "^[a-zA-Z0-9]+$",
						parentSchema: schema48,
						data: data8,
					};
					if (vErrors === null) {
						vErrors = [err18];
					} else {
						vErrors.push(err18);
					}
					errors++;
				}
			} else {
				const err19 = {
					instancePath: instancePath + "/signSignature",
					schemaPath: "alphanumeric/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string",
					schema: schema48.type,
					parentSchema: schema48,
					data: data8,
				};
				if (vErrors === null) {
					vErrors = [err19];
				} else {
					vErrors.push(err19);
				}
				errors++;
			}
		}
		if (data.signature !== undefined) {
			let data9 = data.signature;
			if (typeof data9 === "string") {
				if (!pattern2.test(data9)) {
					const err20 = {
						instancePath: instancePath + "/signature",
						schemaPath: "alphanumeric/pattern",
						keyword: "pattern",
						params: { pattern: "^[a-zA-Z0-9]+$" },
						message: 'must match pattern "' + "^[a-zA-Z0-9]+$" + '"',
						schema: "^[a-zA-Z0-9]+$",
						parentSchema: schema48,
						data: data9,
					};
					if (vErrors === null) {
						vErrors = [err20];
					} else {
						vErrors.push(err20);
					}
					errors++;
				}
			} else {
				const err21 = {
					instancePath: instancePath + "/signature",
					schemaPath: "alphanumeric/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string",
					schema: schema48.type,
					parentSchema: schema48,
					data: data9,
				};
				if (vErrors === null) {
					vErrors = [err21];
				} else {
					vErrors.push(err21);
				}
				errors++;
			}
		}
		if (data.version !== undefined) {
			let data10 = data.version;
			if (!(data10 === 1 || data10 === 2)) {
				const err22 = {
					instancePath: instancePath + "/version",
					schemaPath: "#/properties/version/enum",
					keyword: "enum",
					params: { allowedValues: schema60.properties.version.enum },
					message: "must be equal to one of the allowed values",
					schema: schema60.properties.version.enum,
					parentSchema: schema60.properties.version,
					data: data10,
				};
				if (vErrors === null) {
					vErrors = [err22];
				} else {
					vErrors.push(err22);
				}
				errors++;
			}
		}
		if (data.signatures !== undefined) {
			let data11 = data.signatures;
			if (Array.isArray(data11)) {
				if (data11.length > 16) {
					const err23 = {
						instancePath: instancePath + "/signatures",
						schemaPath: "#/properties/signatures/maxItems",
						keyword: "maxItems",
						params: { limit: 16 },
						message: "must NOT have more than 16 items",
						schema: 16,
						parentSchema: schema60.properties.signatures,
						data: data11,
					};
					if (vErrors === null) {
						vErrors = [err23];
					} else {
						vErrors.push(err23);
					}
					errors++;
				}
				if (data11.length < 1) {
					const err24 = {
						instancePath: instancePath + "/signatures",
						schemaPath: "#/properties/signatures/minItems",
						keyword: "minItems",
						params: { limit: 1 },
						message: "must NOT have fewer than 1 items",
						schema: 1,
						parentSchema: schema60.properties.signatures,
						data: data11,
					};
					if (vErrors === null) {
						vErrors = [err24];
					} else {
						vErrors.push(err24);
					}
					errors++;
				}
				const len0 = data11.length;
				for (let i0 = 0; i0 < len0; i0++) {
					let data12 = data11[i0];
					if (typeof data12 === "string") {
						if (func2(data12) > 130) {
							const err25 = {
								instancePath: instancePath + "/signatures/" + i0,
								schemaPath: "#/properties/signatures/items/allOf/0/maxLength",
								keyword: "maxLength",
								params: { limit: 130 },
								message: "must NOT have more than 130 characters",
								schema: 130,
								parentSchema: schema60.properties.signatures.items.allOf[0],
								data: data12,
							};
							if (vErrors === null) {
								vErrors = [err25];
							} else {
								vErrors.push(err25);
							}
							errors++;
						}
						if (func2(data12) < 130) {
							const err26 = {
								instancePath: instancePath + "/signatures/" + i0,
								schemaPath: "#/properties/signatures/items/allOf/0/minLength",
								keyword: "minLength",
								params: { limit: 130 },
								message: "must NOT have fewer than 130 characters",
								schema: 130,
								parentSchema: schema60.properties.signatures.items.allOf[0],
								data: data12,
							};
							if (vErrors === null) {
								vErrors = [err26];
							} else {
								vErrors.push(err26);
							}
							errors++;
						}
					}
					if (typeof data12 === "string") {
						if (!pattern2.test(data12)) {
							const err27 = {
								instancePath: instancePath + "/signatures/" + i0,
								schemaPath: "alphanumeric/pattern",
								keyword: "pattern",
								params: { pattern: "^[a-zA-Z0-9]+$" },
								message: 'must match pattern "' + "^[a-zA-Z0-9]+$" + '"',
								schema: "^[a-zA-Z0-9]+$",
								parentSchema: schema48,
								data: data12,
							};
							if (vErrors === null) {
								vErrors = [err27];
							} else {
								vErrors.push(err27);
							}
							errors++;
						}
					} else {
						const err28 = {
							instancePath: instancePath + "/signatures/" + i0,
							schemaPath: "alphanumeric/type",
							keyword: "type",
							params: { type: "string" },
							message: "must be string",
							schema: schema48.type,
							parentSchema: schema48,
							data: data12,
						};
						if (vErrors === null) {
							vErrors = [err28];
						} else {
							vErrors.push(err28);
						}
						errors++;
					}
				}
				let i1 = data11.length;
				let j0;
				if (i1 > 1) {
					outer0: for (; i1--; ) {
						for (j0 = i1; j0--; ) {
							if (func0(data11[i1], data11[j0])) {
								const err29 = {
									instancePath: instancePath + "/signatures",
									schemaPath: "#/properties/signatures/uniqueItems",
									keyword: "uniqueItems",
									params: { i: i1, j: j0 },
									message:
										"must NOT have duplicate items (items ## " +
										j0 +
										" and " +
										i1 +
										" are identical)",
									schema: true,
									parentSchema: schema60.properties.signatures,
									data: data11,
								};
								if (vErrors === null) {
									vErrors = [err29];
								} else {
									vErrors.push(err29);
								}
								errors++;
								break outer0;
							}
						}
					}
				}
			} else {
				const err30 = {
					instancePath: instancePath + "/signatures",
					schemaPath: "#/properties/signatures/type",
					keyword: "type",
					params: { type: "array" },
					message: "must be array",
					schema: schema60.properties.signatures.type,
					parentSchema: schema60.properties.signatures,
					data: data11,
				};
				if (vErrors === null) {
					vErrors = [err30];
				} else {
					vErrors.push(err30);
				}
				errors++;
			}
		}
		if (data.timestamp !== undefined) {
			let data13 = data.timestamp;
			if (!(typeof data13 == "number" && !(data13 % 1) && !isNaN(data13) && isFinite(data13))) {
				const err31 = {
					instancePath: instancePath + "/timestamp",
					schemaPath: "#/properties/timestamp/type",
					keyword: "type",
					params: { type: "integer" },
					message: "must be integer",
					schema: schema60.properties.timestamp.type,
					parentSchema: schema60.properties.timestamp,
					data: data13,
				};
				if (vErrors === null) {
					vErrors = [err31];
				} else {
					vErrors.push(err31);
				}
				errors++;
			}
			if (typeof data13 == "number" && isFinite(data13)) {
				if (data13 < 0 || isNaN(data13)) {
					const err32 = {
						instancePath: instancePath + "/timestamp",
						schemaPath: "#/properties/timestamp/minimum",
						keyword: "minimum",
						params: { comparison: ">=", limit: 0 },
						message: "must be >= 0",
						schema: 0,
						parentSchema: schema60.properties.timestamp,
						data: data13,
					};
					if (vErrors === null) {
						vErrors = [err32];
					} else {
						vErrors.push(err32);
					}
					errors++;
				}
			}
		}
		if (data.typeGroup !== undefined) {
			let data14 = data.typeGroup;
			if (!(typeof data14 == "number" && !(data14 % 1) && !isNaN(data14) && isFinite(data14))) {
				const err33 = {
					instancePath: instancePath + "/typeGroup",
					schemaPath: "#/properties/typeGroup/type",
					keyword: "type",
					params: { type: "integer" },
					message: "must be integer",
					schema: schema60.properties.typeGroup.type,
					parentSchema: schema60.properties.typeGroup,
					data: data14,
				};
				if (vErrors === null) {
					vErrors = [err33];
				} else {
					vErrors.push(err33);
				}
				errors++;
			}
			if (typeof data14 == "number" && isFinite(data14)) {
				if (data14 < 0 || isNaN(data14)) {
					const err34 = {
						instancePath: instancePath + "/typeGroup",
						schemaPath: "#/properties/typeGroup/minimum",
						keyword: "minimum",
						params: { comparison: ">=", limit: 0 },
						message: "must be >= 0",
						schema: 0,
						parentSchema: schema60.properties.typeGroup,
						data: data14,
					};
					if (vErrors === null) {
						vErrors = [err34];
					} else {
						vErrors.push(err34);
					}
					errors++;
				}
			}
		}
		if (data.asset !== undefined) {
			let data15 = data.asset;
			if (data15 && typeof data15 == "object" && !Array.isArray(data15)) {
				if (data15.ipfs === undefined) {
					const err35 = {
						instancePath: instancePath + "/asset",
						schemaPath: "#/properties/asset/required",
						keyword: "required",
						params: { missingProperty: "ipfs" },
						message: "must have required property '" + "ipfs" + "'",
						schema: schema60.properties.asset.required,
						parentSchema: schema60.properties.asset,
						data: data15,
					};
					if (vErrors === null) {
						vErrors = [err35];
					} else {
						vErrors.push(err35);
					}
					errors++;
				}
				if (data15.ipfs !== undefined) {
					let data16 = data15.ipfs;
					if (typeof data16 === "string") {
						if (func2(data16) > 90) {
							const err36 = {
								instancePath: instancePath + "/asset/ipfs",
								schemaPath: "#/properties/asset/properties/ipfs/allOf/0/maxLength",
								keyword: "maxLength",
								params: { limit: 90 },
								message: "must NOT have more than 90 characters",
								schema: 90,
								parentSchema: schema60.properties.asset.properties.ipfs.allOf[0],
								data: data16,
							};
							if (vErrors === null) {
								vErrors = [err36];
							} else {
								vErrors.push(err36);
							}
							errors++;
						}
						if (func2(data16) < 2) {
							const err37 = {
								instancePath: instancePath + "/asset/ipfs",
								schemaPath: "#/properties/asset/properties/ipfs/allOf/0/minLength",
								keyword: "minLength",
								params: { limit: 2 },
								message: "must NOT have fewer than 2 characters",
								schema: 2,
								parentSchema: schema60.properties.asset.properties.ipfs.allOf[0],
								data: data16,
							};
							if (vErrors === null) {
								vErrors = [err37];
							} else {
								vErrors.push(err37);
							}
							errors++;
						}
					}
					if (typeof data16 === "string") {
						if (!pattern1.test(data16)) {
							const err38 = {
								instancePath: instancePath + "/asset/ipfs",
								schemaPath: "base58/pattern",
								keyword: "pattern",
								params: { pattern: "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$" },
								message:
									'must match pattern "' +
									"^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$" +
									'"',
								schema: "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$",
								parentSchema: schema47,
								data: data16,
							};
							if (vErrors === null) {
								vErrors = [err38];
							} else {
								vErrors.push(err38);
							}
							errors++;
						}
					} else {
						const err39 = {
							instancePath: instancePath + "/asset/ipfs",
							schemaPath: "base58/type",
							keyword: "type",
							params: { type: "string" },
							message: "must be string",
							schema: schema47.type,
							parentSchema: schema47,
							data: data16,
						};
						if (vErrors === null) {
							vErrors = [err39];
						} else {
							vErrors.push(err39);
						}
						errors++;
					}
				}
			} else {
				const err40 = {
					instancePath: instancePath + "/asset",
					schemaPath: "#/properties/asset/type",
					keyword: "type",
					params: { type: "object" },
					message: "must be object",
					schema: schema60.properties.asset.type,
					parentSchema: schema60.properties.asset,
					data: data15,
				};
				if (vErrors === null) {
					vErrors = [err40];
				} else {
					vErrors.push(err40);
				}
				errors++;
			}
		}
	} else {
		const err41 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "object" },
			message: "must be object",
			schema: schema60.type,
			parentSchema: schema60,
			data,
		};
		if (vErrors === null) {
			vErrors = [err41];
		} else {
			vErrors.push(err41);
		}
		errors++;
	}
	validate43.errors = vErrors;
	return errors === 0;
}
export const ipfsStrict = validate46;
const schema67 = {
	$id: "ipfsStrict",
	else: { required: ["type", "senderPublicKey", "fee", "amount", "nonce"] },
	if: { properties: { version: { anyOf: [{ type: "null" }, { const: 1 }] } } },
	properties: {
		amount: { bignumber: { minimum: 0, maximum: 0 } },
		fee: { bignumber: { minimum: 1 } },
		id: { anyOf: [{ $ref: "transactionId" }, { type: "null" }] },
		network: { $ref: "networkByte" },
		nonce: { bignumber: { minimum: 0 } },
		secondSignature: { $ref: "alphanumeric" },
		senderPublicKey: { $ref: "publicKey" },
		signSignature: { $ref: "alphanumeric" },
		signature: { $ref: "alphanumeric" },
		version: { enum: [1, 2] },
		signatures: {
			items: { allOf: [{ maxLength: 130, minLength: 130 }, { $ref: "alphanumeric" }] },
			maxItems: 16,
			minItems: 1,
			type: "array",
			uniqueItems: true,
		},
		timestamp: { type: "integer", minimum: 0 },
		typeGroup: { minimum: 0, type: "integer" },
		asset: {
			properties: { ipfs: { allOf: [{ maxLength: 90, minLength: 2 }, { $ref: "base58" }] } },
			required: ["ipfs"],
			type: "object",
		},
		type: { transactionType: 5 },
	},
	then: { required: ["type", "senderPublicKey", "fee", "amount", "timestamp"] },
	type: "object",
	anyOf: [
		{ required: ["id", "signature"] },
		{ required: ["id", "signature", "signatures"] },
		{ required: ["id", "signatures"] },
	],
	additionalProperties: false,
};
const func22 = Object.prototype.hasOwnProperty;
function validate46(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	/*# sourceURL="ipfsStrict" */ let vErrors = null;
	let errors = 0;
	const _errs1 = errors;
	let valid0 = false;
	const _errs2 = errors;
	if (data && typeof data == "object" && !Array.isArray(data)) {
		if (data.id === undefined) {
			const err0 = {
				instancePath,
				schemaPath: "#/anyOf/0/required",
				keyword: "required",
				params: { missingProperty: "id" },
				message: "must have required property '" + "id" + "'",
				schema: schema67.anyOf[0].required,
				parentSchema: schema67.anyOf[0],
				data,
			};
			if (vErrors === null) {
				vErrors = [err0];
			} else {
				vErrors.push(err0);
			}
			errors++;
		}
		if (data.signature === undefined) {
			const err1 = {
				instancePath,
				schemaPath: "#/anyOf/0/required",
				keyword: "required",
				params: { missingProperty: "signature" },
				message: "must have required property '" + "signature" + "'",
				schema: schema67.anyOf[0].required,
				parentSchema: schema67.anyOf[0],
				data,
			};
			if (vErrors === null) {
				vErrors = [err1];
			} else {
				vErrors.push(err1);
			}
			errors++;
		}
	}
	var _valid0 = _errs2 === errors;
	valid0 = valid0 || _valid0;
	if (!valid0) {
		const _errs3 = errors;
		if (data && typeof data == "object" && !Array.isArray(data)) {
			if (data.id === undefined) {
				const err2 = {
					instancePath,
					schemaPath: "#/anyOf/1/required",
					keyword: "required",
					params: { missingProperty: "id" },
					message: "must have required property '" + "id" + "'",
					schema: schema67.anyOf[1].required,
					parentSchema: schema67.anyOf[1],
					data,
				};
				if (vErrors === null) {
					vErrors = [err2];
				} else {
					vErrors.push(err2);
				}
				errors++;
			}
			if (data.signature === undefined) {
				const err3 = {
					instancePath,
					schemaPath: "#/anyOf/1/required",
					keyword: "required",
					params: { missingProperty: "signature" },
					message: "must have required property '" + "signature" + "'",
					schema: schema67.anyOf[1].required,
					parentSchema: schema67.anyOf[1],
					data,
				};
				if (vErrors === null) {
					vErrors = [err3];
				} else {
					vErrors.push(err3);
				}
				errors++;
			}
			if (data.signatures === undefined) {
				const err4 = {
					instancePath,
					schemaPath: "#/anyOf/1/required",
					keyword: "required",
					params: { missingProperty: "signatures" },
					message: "must have required property '" + "signatures" + "'",
					schema: schema67.anyOf[1].required,
					parentSchema: schema67.anyOf[1],
					data,
				};
				if (vErrors === null) {
					vErrors = [err4];
				} else {
					vErrors.push(err4);
				}
				errors++;
			}
		}
		var _valid0 = _errs3 === errors;
		valid0 = valid0 || _valid0;
		if (!valid0) {
			const _errs4 = errors;
			if (data && typeof data == "object" && !Array.isArray(data)) {
				if (data.id === undefined) {
					const err5 = {
						instancePath,
						schemaPath: "#/anyOf/2/required",
						keyword: "required",
						params: { missingProperty: "id" },
						message: "must have required property '" + "id" + "'",
						schema: schema67.anyOf[2].required,
						parentSchema: schema67.anyOf[2],
						data,
					};
					if (vErrors === null) {
						vErrors = [err5];
					} else {
						vErrors.push(err5);
					}
					errors++;
				}
				if (data.signatures === undefined) {
					const err6 = {
						instancePath,
						schemaPath: "#/anyOf/2/required",
						keyword: "required",
						params: { missingProperty: "signatures" },
						message: "must have required property '" + "signatures" + "'",
						schema: schema67.anyOf[2].required,
						parentSchema: schema67.anyOf[2],
						data,
					};
					if (vErrors === null) {
						vErrors = [err6];
					} else {
						vErrors.push(err6);
					}
					errors++;
				}
			}
			var _valid0 = _errs4 === errors;
			valid0 = valid0 || _valid0;
		}
	}
	if (!valid0) {
		const err7 = {
			instancePath,
			schemaPath: "#/anyOf",
			keyword: "anyOf",
			params: {},
			message: "must match a schema in anyOf",
			schema: schema67.anyOf,
			parentSchema: schema67,
			data,
		};
		if (vErrors === null) {
			vErrors = [err7];
		} else {
			vErrors.push(err7);
		}
		errors++;
	} else {
		errors = _errs1;
		if (vErrors !== null) {
			if (_errs1) {
				vErrors.length = _errs1;
			} else {
				vErrors = null;
			}
		}
	}
	const _errs5 = errors;
	let valid1 = true;
	const _errs6 = errors;
	if (data && typeof data == "object" && !Array.isArray(data)) {
		if (data.version !== undefined) {
			let data0 = data.version;
			const _errs8 = errors;
			let valid3 = false;
			const _errs9 = errors;
			if (data0 !== null) {
				const err8 = {};
				if (vErrors === null) {
					vErrors = [err8];
				} else {
					vErrors.push(err8);
				}
				errors++;
			}
			var _valid2 = _errs9 === errors;
			valid3 = valid3 || _valid2;
			if (!valid3) {
				const _errs11 = errors;
				if (1 !== data0) {
					const err9 = {};
					if (vErrors === null) {
						vErrors = [err9];
					} else {
						vErrors.push(err9);
					}
					errors++;
				}
				var _valid2 = _errs11 === errors;
				valid3 = valid3 || _valid2;
			}
			if (!valid3) {
				const err10 = {};
				if (vErrors === null) {
					vErrors = [err10];
				} else {
					vErrors.push(err10);
				}
				errors++;
			} else {
				errors = _errs8;
				if (vErrors !== null) {
					if (_errs8) {
						vErrors.length = _errs8;
					} else {
						vErrors = null;
					}
				}
			}
		}
	}
	var _valid1 = _errs6 === errors;
	errors = _errs5;
	if (vErrors !== null) {
		if (_errs5) {
			vErrors.length = _errs5;
		} else {
			vErrors = null;
		}
	}
	let ifClause0;
	if (_valid1) {
		const _errs12 = errors;
		if (data && typeof data == "object" && !Array.isArray(data)) {
			if (data.type === undefined) {
				const err11 = {
					instancePath,
					schemaPath: "#/then/required",
					keyword: "required",
					params: { missingProperty: "type" },
					message: "must have required property '" + "type" + "'",
					schema: schema67.then.required,
					parentSchema: schema67.then,
					data,
				};
				if (vErrors === null) {
					vErrors = [err11];
				} else {
					vErrors.push(err11);
				}
				errors++;
			}
			if (data.senderPublicKey === undefined) {
				const err12 = {
					instancePath,
					schemaPath: "#/then/required",
					keyword: "required",
					params: { missingProperty: "senderPublicKey" },
					message: "must have required property '" + "senderPublicKey" + "'",
					schema: schema67.then.required,
					parentSchema: schema67.then,
					data,
				};
				if (vErrors === null) {
					vErrors = [err12];
				} else {
					vErrors.push(err12);
				}
				errors++;
			}
			if (data.fee === undefined) {
				const err13 = {
					instancePath,
					schemaPath: "#/then/required",
					keyword: "required",
					params: { missingProperty: "fee" },
					message: "must have required property '" + "fee" + "'",
					schema: schema67.then.required,
					parentSchema: schema67.then,
					data,
				};
				if (vErrors === null) {
					vErrors = [err13];
				} else {
					vErrors.push(err13);
				}
				errors++;
			}
			if (data.amount === undefined) {
				const err14 = {
					instancePath,
					schemaPath: "#/then/required",
					keyword: "required",
					params: { missingProperty: "amount" },
					message: "must have required property '" + "amount" + "'",
					schema: schema67.then.required,
					parentSchema: schema67.then,
					data,
				};
				if (vErrors === null) {
					vErrors = [err14];
				} else {
					vErrors.push(err14);
				}
				errors++;
			}
			if (data.timestamp === undefined) {
				const err15 = {
					instancePath,
					schemaPath: "#/then/required",
					keyword: "required",
					params: { missingProperty: "timestamp" },
					message: "must have required property '" + "timestamp" + "'",
					schema: schema67.then.required,
					parentSchema: schema67.then,
					data,
				};
				if (vErrors === null) {
					vErrors = [err15];
				} else {
					vErrors.push(err15);
				}
				errors++;
			}
		}
		var _valid1 = _errs12 === errors;
		valid1 = _valid1;
		ifClause0 = "then";
	} else {
		const _errs13 = errors;
		if (data && typeof data == "object" && !Array.isArray(data)) {
			if (data.type === undefined) {
				const err16 = {
					instancePath,
					schemaPath: "#/else/required",
					keyword: "required",
					params: { missingProperty: "type" },
					message: "must have required property '" + "type" + "'",
					schema: schema67.else.required,
					parentSchema: schema67.else,
					data,
				};
				if (vErrors === null) {
					vErrors = [err16];
				} else {
					vErrors.push(err16);
				}
				errors++;
			}
			if (data.senderPublicKey === undefined) {
				const err17 = {
					instancePath,
					schemaPath: "#/else/required",
					keyword: "required",
					params: { missingProperty: "senderPublicKey" },
					message: "must have required property '" + "senderPublicKey" + "'",
					schema: schema67.else.required,
					parentSchema: schema67.else,
					data,
				};
				if (vErrors === null) {
					vErrors = [err17];
				} else {
					vErrors.push(err17);
				}
				errors++;
			}
			if (data.fee === undefined) {
				const err18 = {
					instancePath,
					schemaPath: "#/else/required",
					keyword: "required",
					params: { missingProperty: "fee" },
					message: "must have required property '" + "fee" + "'",
					schema: schema67.else.required,
					parentSchema: schema67.else,
					data,
				};
				if (vErrors === null) {
					vErrors = [err18];
				} else {
					vErrors.push(err18);
				}
				errors++;
			}
			if (data.amount === undefined) {
				const err19 = {
					instancePath,
					schemaPath: "#/else/required",
					keyword: "required",
					params: { missingProperty: "amount" },
					message: "must have required property '" + "amount" + "'",
					schema: schema67.else.required,
					parentSchema: schema67.else,
					data,
				};
				if (vErrors === null) {
					vErrors = [err19];
				} else {
					vErrors.push(err19);
				}
				errors++;
			}
			if (data.nonce === undefined) {
				const err20 = {
					instancePath,
					schemaPath: "#/else/required",
					keyword: "required",
					params: { missingProperty: "nonce" },
					message: "must have required property '" + "nonce" + "'",
					schema: schema67.else.required,
					parentSchema: schema67.else,
					data,
				};
				if (vErrors === null) {
					vErrors = [err20];
				} else {
					vErrors.push(err20);
				}
				errors++;
			}
		}
		var _valid1 = _errs13 === errors;
		valid1 = _valid1;
		ifClause0 = "else";
	}
	if (!valid1) {
		const err21 = {
			instancePath,
			schemaPath: "#/if",
			keyword: "if",
			params: { failingKeyword: ifClause0 },
			message: 'must match "' + ifClause0 + '" schema',
			schema: schema67.if,
			parentSchema: schema67,
			data,
		};
		if (vErrors === null) {
			vErrors = [err21];
		} else {
			vErrors.push(err21);
		}
		errors++;
	}
	if (data && typeof data == "object" && !Array.isArray(data)) {
		for (const key0 in data) {
			if (!func22.call(schema67.properties, key0)) {
				const err22 = {
					instancePath,
					schemaPath: "#/additionalProperties",
					keyword: "additionalProperties",
					params: { additionalProperty: key0 },
					message: "must NOT have additional properties",
					schema: false,
					parentSchema: schema67,
					data,
				};
				if (vErrors === null) {
					vErrors = [err22];
				} else {
					vErrors.push(err22);
				}
				errors++;
			}
		}
		if (data.id !== undefined) {
			let data3 = data.id;
			const _errs18 = errors;
			let valid5 = false;
			const _errs19 = errors;
			if (
				!validate35(data3, {
					instancePath: instancePath + "/id",
					parentData: data,
					parentDataProperty: "id",
					rootData,
				})
			) {
				vErrors = vErrors === null ? validate35.errors : vErrors.concat(validate35.errors);
				errors = vErrors.length;
			}
			var _valid3 = _errs19 === errors;
			valid5 = valid5 || _valid3;
			if (!valid5) {
				const _errs20 = errors;
				if (data3 !== null) {
					const err23 = {
						instancePath: instancePath + "/id",
						schemaPath: "#/properties/id/anyOf/1/type",
						keyword: "type",
						params: { type: "null" },
						message: "must be null",
						schema: schema67.properties.id.anyOf[1].type,
						parentSchema: schema67.properties.id.anyOf[1],
						data: data3,
					};
					if (vErrors === null) {
						vErrors = [err23];
					} else {
						vErrors.push(err23);
					}
					errors++;
				}
				var _valid3 = _errs20 === errors;
				valid5 = valid5 || _valid3;
			}
			if (!valid5) {
				const err24 = {
					instancePath: instancePath + "/id",
					schemaPath: "#/properties/id/anyOf",
					keyword: "anyOf",
					params: {},
					message: "must match a schema in anyOf",
					schema: schema67.properties.id.anyOf,
					parentSchema: schema67.properties.id,
					data: data3,
				};
				if (vErrors === null) {
					vErrors = [err24];
				} else {
					vErrors.push(err24);
				}
				errors++;
			} else {
				errors = _errs18;
				if (vErrors !== null) {
					if (_errs18) {
						vErrors.length = _errs18;
					} else {
						vErrors = null;
					}
				}
			}
		}
		if (data.secondSignature !== undefined) {
			let data6 = data.secondSignature;
			if (typeof data6 === "string") {
				if (!pattern2.test(data6)) {
					const err25 = {
						instancePath: instancePath + "/secondSignature",
						schemaPath: "alphanumeric/pattern",
						keyword: "pattern",
						params: { pattern: "^[a-zA-Z0-9]+$" },
						message: 'must match pattern "' + "^[a-zA-Z0-9]+$" + '"',
						schema: "^[a-zA-Z0-9]+$",
						parentSchema: schema48,
						data: data6,
					};
					if (vErrors === null) {
						vErrors = [err25];
					} else {
						vErrors.push(err25);
					}
					errors++;
				}
			} else {
				const err26 = {
					instancePath: instancePath + "/secondSignature",
					schemaPath: "alphanumeric/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string",
					schema: schema48.type,
					parentSchema: schema48,
					data: data6,
				};
				if (vErrors === null) {
					vErrors = [err26];
				} else {
					vErrors.push(err26);
				}
				errors++;
			}
		}
		if (data.senderPublicKey !== undefined) {
			if (
				!validate38(data.senderPublicKey, {
					instancePath: instancePath + "/senderPublicKey",
					parentData: data,
					parentDataProperty: "senderPublicKey",
					rootData,
				})
			) {
				vErrors = vErrors === null ? validate38.errors : vErrors.concat(validate38.errors);
				errors = vErrors.length;
			}
		}
		if (data.signSignature !== undefined) {
			let data8 = data.signSignature;
			if (typeof data8 === "string") {
				if (!pattern2.test(data8)) {
					const err27 = {
						instancePath: instancePath + "/signSignature",
						schemaPath: "alphanumeric/pattern",
						keyword: "pattern",
						params: { pattern: "^[a-zA-Z0-9]+$" },
						message: 'must match pattern "' + "^[a-zA-Z0-9]+$" + '"',
						schema: "^[a-zA-Z0-9]+$",
						parentSchema: schema48,
						data: data8,
					};
					if (vErrors === null) {
						vErrors = [err27];
					} else {
						vErrors.push(err27);
					}
					errors++;
				}
			} else {
				const err28 = {
					instancePath: instancePath + "/signSignature",
					schemaPath: "alphanumeric/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string",
					schema: schema48.type,
					parentSchema: schema48,
					data: data8,
				};
				if (vErrors === null) {
					vErrors = [err28];
				} else {
					vErrors.push(err28);
				}
				errors++;
			}
		}
		if (data.signature !== undefined) {
			let data9 = data.signature;
			if (typeof data9 === "string") {
				if (!pattern2.test(data9)) {
					const err29 = {
						instancePath: instancePath + "/signature",
						schemaPath: "alphanumeric/pattern",
						keyword: "pattern",
						params: { pattern: "^[a-zA-Z0-9]+$" },
						message: 'must match pattern "' + "^[a-zA-Z0-9]+$" + '"',
						schema: "^[a-zA-Z0-9]+$",
						parentSchema: schema48,
						data: data9,
					};
					if (vErrors === null) {
						vErrors = [err29];
					} else {
						vErrors.push(err29);
					}
					errors++;
				}
			} else {
				const err30 = {
					instancePath: instancePath + "/signature",
					schemaPath: "alphanumeric/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string",
					schema: schema48.type,
					parentSchema: schema48,
					data: data9,
				};
				if (vErrors === null) {
					vErrors = [err30];
				} else {
					vErrors.push(err30);
				}
				errors++;
			}
		}
		if (data.version !== undefined) {
			let data10 = data.version;
			if (!(data10 === 1 || data10 === 2)) {
				const err31 = {
					instancePath: instancePath + "/version",
					schemaPath: "#/properties/version/enum",
					keyword: "enum",
					params: { allowedValues: schema67.properties.version.enum },
					message: "must be equal to one of the allowed values",
					schema: schema67.properties.version.enum,
					parentSchema: schema67.properties.version,
					data: data10,
				};
				if (vErrors === null) {
					vErrors = [err31];
				} else {
					vErrors.push(err31);
				}
				errors++;
			}
		}
		if (data.signatures !== undefined) {
			let data11 = data.signatures;
			if (Array.isArray(data11)) {
				if (data11.length > 16) {
					const err32 = {
						instancePath: instancePath + "/signatures",
						schemaPath: "#/properties/signatures/maxItems",
						keyword: "maxItems",
						params: { limit: 16 },
						message: "must NOT have more than 16 items",
						schema: 16,
						parentSchema: schema67.properties.signatures,
						data: data11,
					};
					if (vErrors === null) {
						vErrors = [err32];
					} else {
						vErrors.push(err32);
					}
					errors++;
				}
				if (data11.length < 1) {
					const err33 = {
						instancePath: instancePath + "/signatures",
						schemaPath: "#/properties/signatures/minItems",
						keyword: "minItems",
						params: { limit: 1 },
						message: "must NOT have fewer than 1 items",
						schema: 1,
						parentSchema: schema67.properties.signatures,
						data: data11,
					};
					if (vErrors === null) {
						vErrors = [err33];
					} else {
						vErrors.push(err33);
					}
					errors++;
				}
				const len0 = data11.length;
				for (let i0 = 0; i0 < len0; i0++) {
					let data12 = data11[i0];
					if (typeof data12 === "string") {
						if (func2(data12) > 130) {
							const err34 = {
								instancePath: instancePath + "/signatures/" + i0,
								schemaPath: "#/properties/signatures/items/allOf/0/maxLength",
								keyword: "maxLength",
								params: { limit: 130 },
								message: "must NOT have more than 130 characters",
								schema: 130,
								parentSchema: schema67.properties.signatures.items.allOf[0],
								data: data12,
							};
							if (vErrors === null) {
								vErrors = [err34];
							} else {
								vErrors.push(err34);
							}
							errors++;
						}
						if (func2(data12) < 130) {
							const err35 = {
								instancePath: instancePath + "/signatures/" + i0,
								schemaPath: "#/properties/signatures/items/allOf/0/minLength",
								keyword: "minLength",
								params: { limit: 130 },
								message: "must NOT have fewer than 130 characters",
								schema: 130,
								parentSchema: schema67.properties.signatures.items.allOf[0],
								data: data12,
							};
							if (vErrors === null) {
								vErrors = [err35];
							} else {
								vErrors.push(err35);
							}
							errors++;
						}
					}
					if (typeof data12 === "string") {
						if (!pattern2.test(data12)) {
							const err36 = {
								instancePath: instancePath + "/signatures/" + i0,
								schemaPath: "alphanumeric/pattern",
								keyword: "pattern",
								params: { pattern: "^[a-zA-Z0-9]+$" },
								message: 'must match pattern "' + "^[a-zA-Z0-9]+$" + '"',
								schema: "^[a-zA-Z0-9]+$",
								parentSchema: schema48,
								data: data12,
							};
							if (vErrors === null) {
								vErrors = [err36];
							} else {
								vErrors.push(err36);
							}
							errors++;
						}
					} else {
						const err37 = {
							instancePath: instancePath + "/signatures/" + i0,
							schemaPath: "alphanumeric/type",
							keyword: "type",
							params: { type: "string" },
							message: "must be string",
							schema: schema48.type,
							parentSchema: schema48,
							data: data12,
						};
						if (vErrors === null) {
							vErrors = [err37];
						} else {
							vErrors.push(err37);
						}
						errors++;
					}
				}
				let i1 = data11.length;
				let j0;
				if (i1 > 1) {
					outer0: for (; i1--; ) {
						for (j0 = i1; j0--; ) {
							if (func0(data11[i1], data11[j0])) {
								const err38 = {
									instancePath: instancePath + "/signatures",
									schemaPath: "#/properties/signatures/uniqueItems",
									keyword: "uniqueItems",
									params: { i: i1, j: j0 },
									message:
										"must NOT have duplicate items (items ## " +
										j0 +
										" and " +
										i1 +
										" are identical)",
									schema: true,
									parentSchema: schema67.properties.signatures,
									data: data11,
								};
								if (vErrors === null) {
									vErrors = [err38];
								} else {
									vErrors.push(err38);
								}
								errors++;
								break outer0;
							}
						}
					}
				}
			} else {
				const err39 = {
					instancePath: instancePath + "/signatures",
					schemaPath: "#/properties/signatures/type",
					keyword: "type",
					params: { type: "array" },
					message: "must be array",
					schema: schema67.properties.signatures.type,
					parentSchema: schema67.properties.signatures,
					data: data11,
				};
				if (vErrors === null) {
					vErrors = [err39];
				} else {
					vErrors.push(err39);
				}
				errors++;
			}
		}
		if (data.timestamp !== undefined) {
			let data13 = data.timestamp;
			if (!(typeof data13 == "number" && !(data13 % 1) && !isNaN(data13) && isFinite(data13))) {
				const err40 = {
					instancePath: instancePath + "/timestamp",
					schemaPath: "#/properties/timestamp/type",
					keyword: "type",
					params: { type: "integer" },
					message: "must be integer",
					schema: schema67.properties.timestamp.type,
					parentSchema: schema67.properties.timestamp,
					data: data13,
				};
				if (vErrors === null) {
					vErrors = [err40];
				} else {
					vErrors.push(err40);
				}
				errors++;
			}
			if (typeof data13 == "number" && isFinite(data13)) {
				if (data13 < 0 || isNaN(data13)) {
					const err41 = {
						instancePath: instancePath + "/timestamp",
						schemaPath: "#/properties/timestamp/minimum",
						keyword: "minimum",
						params: { comparison: ">=", limit: 0 },
						message: "must be >= 0",
						schema: 0,
						parentSchema: schema67.properties.timestamp,
						data: data13,
					};
					if (vErrors === null) {
						vErrors = [err41];
					} else {
						vErrors.push(err41);
					}
					errors++;
				}
			}
		}
		if (data.typeGroup !== undefined) {
			let data14 = data.typeGroup;
			if (!(typeof data14 == "number" && !(data14 % 1) && !isNaN(data14) && isFinite(data14))) {
				const err42 = {
					instancePath: instancePath + "/typeGroup",
					schemaPath: "#/properties/typeGroup/type",
					keyword: "type",
					params: { type: "integer" },
					message: "must be integer",
					schema: schema67.properties.typeGroup.type,
					parentSchema: schema67.properties.typeGroup,
					data: data14,
				};
				if (vErrors === null) {
					vErrors = [err42];
				} else {
					vErrors.push(err42);
				}
				errors++;
			}
			if (typeof data14 == "number" && isFinite(data14)) {
				if (data14 < 0 || isNaN(data14)) {
					const err43 = {
						instancePath: instancePath + "/typeGroup",
						schemaPath: "#/properties/typeGroup/minimum",
						keyword: "minimum",
						params: { comparison: ">=", limit: 0 },
						message: "must be >= 0",
						schema: 0,
						parentSchema: schema67.properties.typeGroup,
						data: data14,
					};
					if (vErrors === null) {
						vErrors = [err43];
					} else {
						vErrors.push(err43);
					}
					errors++;
				}
			}
		}
		if (data.asset !== undefined) {
			let data15 = data.asset;
			if (data15 && typeof data15 == "object" && !Array.isArray(data15)) {
				if (data15.ipfs === undefined) {
					const err44 = {
						instancePath: instancePath + "/asset",
						schemaPath: "#/properties/asset/required",
						keyword: "required",
						params: { missingProperty: "ipfs" },
						message: "must have required property '" + "ipfs" + "'",
						schema: schema67.properties.asset.required,
						parentSchema: schema67.properties.asset,
						data: data15,
					};
					if (vErrors === null) {
						vErrors = [err44];
					} else {
						vErrors.push(err44);
					}
					errors++;
				}
				if (data15.ipfs !== undefined) {
					let data16 = data15.ipfs;
					if (typeof data16 === "string") {
						if (func2(data16) > 90) {
							const err45 = {
								instancePath: instancePath + "/asset/ipfs",
								schemaPath: "#/properties/asset/properties/ipfs/allOf/0/maxLength",
								keyword: "maxLength",
								params: { limit: 90 },
								message: "must NOT have more than 90 characters",
								schema: 90,
								parentSchema: schema67.properties.asset.properties.ipfs.allOf[0],
								data: data16,
							};
							if (vErrors === null) {
								vErrors = [err45];
							} else {
								vErrors.push(err45);
							}
							errors++;
						}
						if (func2(data16) < 2) {
							const err46 = {
								instancePath: instancePath + "/asset/ipfs",
								schemaPath: "#/properties/asset/properties/ipfs/allOf/0/minLength",
								keyword: "minLength",
								params: { limit: 2 },
								message: "must NOT have fewer than 2 characters",
								schema: 2,
								parentSchema: schema67.properties.asset.properties.ipfs.allOf[0],
								data: data16,
							};
							if (vErrors === null) {
								vErrors = [err46];
							} else {
								vErrors.push(err46);
							}
							errors++;
						}
					}
					if (typeof data16 === "string") {
						if (!pattern1.test(data16)) {
							const err47 = {
								instancePath: instancePath + "/asset/ipfs",
								schemaPath: "base58/pattern",
								keyword: "pattern",
								params: { pattern: "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$" },
								message:
									'must match pattern "' +
									"^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$" +
									'"',
								schema: "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$",
								parentSchema: schema47,
								data: data16,
							};
							if (vErrors === null) {
								vErrors = [err47];
							} else {
								vErrors.push(err47);
							}
							errors++;
						}
					} else {
						const err48 = {
							instancePath: instancePath + "/asset/ipfs",
							schemaPath: "base58/type",
							keyword: "type",
							params: { type: "string" },
							message: "must be string",
							schema: schema47.type,
							parentSchema: schema47,
							data: data16,
						};
						if (vErrors === null) {
							vErrors = [err48];
						} else {
							vErrors.push(err48);
						}
						errors++;
					}
				}
			} else {
				const err49 = {
					instancePath: instancePath + "/asset",
					schemaPath: "#/properties/asset/type",
					keyword: "type",
					params: { type: "object" },
					message: "must be object",
					schema: schema67.properties.asset.type,
					parentSchema: schema67.properties.asset,
					data: data15,
				};
				if (vErrors === null) {
					vErrors = [err49];
				} else {
					vErrors.push(err49);
				}
				errors++;
			}
		}
	} else {
		const err50 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "object" },
			message: "must be object",
			schema: schema67.type,
			parentSchema: schema67,
			data,
		};
		if (vErrors === null) {
			vErrors = [err50];
		} else {
			vErrors.push(err50);
		}
		errors++;
	}
	validate46.errors = vErrors;
	return errors === 0;
}
export const ipfsSigned = validate49;
const schema74 = {
	$id: "ipfsSigned",
	else: { required: ["type", "senderPublicKey", "fee", "amount", "nonce"] },
	if: { properties: { version: { anyOf: [{ type: "null" }, { const: 1 }] } } },
	properties: {
		amount: { bignumber: { minimum: 0, maximum: 0 } },
		fee: { bignumber: { minimum: 1 } },
		id: { anyOf: [{ $ref: "transactionId" }, { type: "null" }] },
		network: { $ref: "networkByte" },
		nonce: { bignumber: { minimum: 0 } },
		secondSignature: { $ref: "alphanumeric" },
		senderPublicKey: { $ref: "publicKey" },
		signSignature: { $ref: "alphanumeric" },
		signature: { $ref: "alphanumeric" },
		version: { enum: [1, 2] },
		signatures: {
			items: { allOf: [{ maxLength: 130, minLength: 130 }, { $ref: "alphanumeric" }] },
			maxItems: 16,
			minItems: 1,
			type: "array",
			uniqueItems: true,
		},
		timestamp: { type: "integer", minimum: 0 },
		typeGroup: { minimum: 0, type: "integer" },
		asset: {
			properties: { ipfs: { allOf: [{ maxLength: 90, minLength: 2 }, { $ref: "base58" }] } },
			required: ["ipfs"],
			type: "object",
		},
		type: { transactionType: 5 },
	},
	then: { required: ["type", "senderPublicKey", "fee", "amount", "timestamp"] },
	type: "object",
	anyOf: [
		{ required: ["id", "signature"] },
		{ required: ["id", "signature", "signatures"] },
		{ required: ["id", "signatures"] },
	],
};
function validate49(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	/*# sourceURL="ipfsSigned" */ let vErrors = null;
	let errors = 0;
	const _errs1 = errors;
	let valid0 = false;
	const _errs2 = errors;
	if (data && typeof data == "object" && !Array.isArray(data)) {
		if (data.id === undefined) {
			const err0 = {
				instancePath,
				schemaPath: "#/anyOf/0/required",
				keyword: "required",
				params: { missingProperty: "id" },
				message: "must have required property '" + "id" + "'",
				schema: schema74.anyOf[0].required,
				parentSchema: schema74.anyOf[0],
				data,
			};
			if (vErrors === null) {
				vErrors = [err0];
			} else {
				vErrors.push(err0);
			}
			errors++;
		}
		if (data.signature === undefined) {
			const err1 = {
				instancePath,
				schemaPath: "#/anyOf/0/required",
				keyword: "required",
				params: { missingProperty: "signature" },
				message: "must have required property '" + "signature" + "'",
				schema: schema74.anyOf[0].required,
				parentSchema: schema74.anyOf[0],
				data,
			};
			if (vErrors === null) {
				vErrors = [err1];
			} else {
				vErrors.push(err1);
			}
			errors++;
		}
	}
	var _valid0 = _errs2 === errors;
	valid0 = valid0 || _valid0;
	if (!valid0) {
		const _errs3 = errors;
		if (data && typeof data == "object" && !Array.isArray(data)) {
			if (data.id === undefined) {
				const err2 = {
					instancePath,
					schemaPath: "#/anyOf/1/required",
					keyword: "required",
					params: { missingProperty: "id" },
					message: "must have required property '" + "id" + "'",
					schema: schema74.anyOf[1].required,
					parentSchema: schema74.anyOf[1],
					data,
				};
				if (vErrors === null) {
					vErrors = [err2];
				} else {
					vErrors.push(err2);
				}
				errors++;
			}
			if (data.signature === undefined) {
				const err3 = {
					instancePath,
					schemaPath: "#/anyOf/1/required",
					keyword: "required",
					params: { missingProperty: "signature" },
					message: "must have required property '" + "signature" + "'",
					schema: schema74.anyOf[1].required,
					parentSchema: schema74.anyOf[1],
					data,
				};
				if (vErrors === null) {
					vErrors = [err3];
				} else {
					vErrors.push(err3);
				}
				errors++;
			}
			if (data.signatures === undefined) {
				const err4 = {
					instancePath,
					schemaPath: "#/anyOf/1/required",
					keyword: "required",
					params: { missingProperty: "signatures" },
					message: "must have required property '" + "signatures" + "'",
					schema: schema74.anyOf[1].required,
					parentSchema: schema74.anyOf[1],
					data,
				};
				if (vErrors === null) {
					vErrors = [err4];
				} else {
					vErrors.push(err4);
				}
				errors++;
			}
		}
		var _valid0 = _errs3 === errors;
		valid0 = valid0 || _valid0;
		if (!valid0) {
			const _errs4 = errors;
			if (data && typeof data == "object" && !Array.isArray(data)) {
				if (data.id === undefined) {
					const err5 = {
						instancePath,
						schemaPath: "#/anyOf/2/required",
						keyword: "required",
						params: { missingProperty: "id" },
						message: "must have required property '" + "id" + "'",
						schema: schema74.anyOf[2].required,
						parentSchema: schema74.anyOf[2],
						data,
					};
					if (vErrors === null) {
						vErrors = [err5];
					} else {
						vErrors.push(err5);
					}
					errors++;
				}
				if (data.signatures === undefined) {
					const err6 = {
						instancePath,
						schemaPath: "#/anyOf/2/required",
						keyword: "required",
						params: { missingProperty: "signatures" },
						message: "must have required property '" + "signatures" + "'",
						schema: schema74.anyOf[2].required,
						parentSchema: schema74.anyOf[2],
						data,
					};
					if (vErrors === null) {
						vErrors = [err6];
					} else {
						vErrors.push(err6);
					}
					errors++;
				}
			}
			var _valid0 = _errs4 === errors;
			valid0 = valid0 || _valid0;
		}
	}
	if (!valid0) {
		const err7 = {
			instancePath,
			schemaPath: "#/anyOf",
			keyword: "anyOf",
			params: {},
			message: "must match a schema in anyOf",
			schema: schema74.anyOf,
			parentSchema: schema74,
			data,
		};
		if (vErrors === null) {
			vErrors = [err7];
		} else {
			vErrors.push(err7);
		}
		errors++;
	} else {
		errors = _errs1;
		if (vErrors !== null) {
			if (_errs1) {
				vErrors.length = _errs1;
			} else {
				vErrors = null;
			}
		}
	}
	const _errs5 = errors;
	let valid1 = true;
	const _errs6 = errors;
	if (data && typeof data == "object" && !Array.isArray(data)) {
		if (data.version !== undefined) {
			let data0 = data.version;
			const _errs8 = errors;
			let valid3 = false;
			const _errs9 = errors;
			if (data0 !== null) {
				const err8 = {};
				if (vErrors === null) {
					vErrors = [err8];
				} else {
					vErrors.push(err8);
				}
				errors++;
			}
			var _valid2 = _errs9 === errors;
			valid3 = valid3 || _valid2;
			if (!valid3) {
				const _errs11 = errors;
				if (1 !== data0) {
					const err9 = {};
					if (vErrors === null) {
						vErrors = [err9];
					} else {
						vErrors.push(err9);
					}
					errors++;
				}
				var _valid2 = _errs11 === errors;
				valid3 = valid3 || _valid2;
			}
			if (!valid3) {
				const err10 = {};
				if (vErrors === null) {
					vErrors = [err10];
				} else {
					vErrors.push(err10);
				}
				errors++;
			} else {
				errors = _errs8;
				if (vErrors !== null) {
					if (_errs8) {
						vErrors.length = _errs8;
					} else {
						vErrors = null;
					}
				}
			}
		}
	}
	var _valid1 = _errs6 === errors;
	errors = _errs5;
	if (vErrors !== null) {
		if (_errs5) {
			vErrors.length = _errs5;
		} else {
			vErrors = null;
		}
	}
	let ifClause0;
	if (_valid1) {
		const _errs12 = errors;
		if (data && typeof data == "object" && !Array.isArray(data)) {
			if (data.type === undefined) {
				const err11 = {
					instancePath,
					schemaPath: "#/then/required",
					keyword: "required",
					params: { missingProperty: "type" },
					message: "must have required property '" + "type" + "'",
					schema: schema74.then.required,
					parentSchema: schema74.then,
					data,
				};
				if (vErrors === null) {
					vErrors = [err11];
				} else {
					vErrors.push(err11);
				}
				errors++;
			}
			if (data.senderPublicKey === undefined) {
				const err12 = {
					instancePath,
					schemaPath: "#/then/required",
					keyword: "required",
					params: { missingProperty: "senderPublicKey" },
					message: "must have required property '" + "senderPublicKey" + "'",
					schema: schema74.then.required,
					parentSchema: schema74.then,
					data,
				};
				if (vErrors === null) {
					vErrors = [err12];
				} else {
					vErrors.push(err12);
				}
				errors++;
			}
			if (data.fee === undefined) {
				const err13 = {
					instancePath,
					schemaPath: "#/then/required",
					keyword: "required",
					params: { missingProperty: "fee" },
					message: "must have required property '" + "fee" + "'",
					schema: schema74.then.required,
					parentSchema: schema74.then,
					data,
				};
				if (vErrors === null) {
					vErrors = [err13];
				} else {
					vErrors.push(err13);
				}
				errors++;
			}
			if (data.amount === undefined) {
				const err14 = {
					instancePath,
					schemaPath: "#/then/required",
					keyword: "required",
					params: { missingProperty: "amount" },
					message: "must have required property '" + "amount" + "'",
					schema: schema74.then.required,
					parentSchema: schema74.then,
					data,
				};
				if (vErrors === null) {
					vErrors = [err14];
				} else {
					vErrors.push(err14);
				}
				errors++;
			}
			if (data.timestamp === undefined) {
				const err15 = {
					instancePath,
					schemaPath: "#/then/required",
					keyword: "required",
					params: { missingProperty: "timestamp" },
					message: "must have required property '" + "timestamp" + "'",
					schema: schema74.then.required,
					parentSchema: schema74.then,
					data,
				};
				if (vErrors === null) {
					vErrors = [err15];
				} else {
					vErrors.push(err15);
				}
				errors++;
			}
		}
		var _valid1 = _errs12 === errors;
		valid1 = _valid1;
		ifClause0 = "then";
	} else {
		const _errs13 = errors;
		if (data && typeof data == "object" && !Array.isArray(data)) {
			if (data.type === undefined) {
				const err16 = {
					instancePath,
					schemaPath: "#/else/required",
					keyword: "required",
					params: { missingProperty: "type" },
					message: "must have required property '" + "type" + "'",
					schema: schema74.else.required,
					parentSchema: schema74.else,
					data,
				};
				if (vErrors === null) {
					vErrors = [err16];
				} else {
					vErrors.push(err16);
				}
				errors++;
			}
			if (data.senderPublicKey === undefined) {
				const err17 = {
					instancePath,
					schemaPath: "#/else/required",
					keyword: "required",
					params: { missingProperty: "senderPublicKey" },
					message: "must have required property '" + "senderPublicKey" + "'",
					schema: schema74.else.required,
					parentSchema: schema74.else,
					data,
				};
				if (vErrors === null) {
					vErrors = [err17];
				} else {
					vErrors.push(err17);
				}
				errors++;
			}
			if (data.fee === undefined) {
				const err18 = {
					instancePath,
					schemaPath: "#/else/required",
					keyword: "required",
					params: { missingProperty: "fee" },
					message: "must have required property '" + "fee" + "'",
					schema: schema74.else.required,
					parentSchema: schema74.else,
					data,
				};
				if (vErrors === null) {
					vErrors = [err18];
				} else {
					vErrors.push(err18);
				}
				errors++;
			}
			if (data.amount === undefined) {
				const err19 = {
					instancePath,
					schemaPath: "#/else/required",
					keyword: "required",
					params: { missingProperty: "amount" },
					message: "must have required property '" + "amount" + "'",
					schema: schema74.else.required,
					parentSchema: schema74.else,
					data,
				};
				if (vErrors === null) {
					vErrors = [err19];
				} else {
					vErrors.push(err19);
				}
				errors++;
			}
			if (data.nonce === undefined) {
				const err20 = {
					instancePath,
					schemaPath: "#/else/required",
					keyword: "required",
					params: { missingProperty: "nonce" },
					message: "must have required property '" + "nonce" + "'",
					schema: schema74.else.required,
					parentSchema: schema74.else,
					data,
				};
				if (vErrors === null) {
					vErrors = [err20];
				} else {
					vErrors.push(err20);
				}
				errors++;
			}
		}
		var _valid1 = _errs13 === errors;
		valid1 = _valid1;
		ifClause0 = "else";
	}
	if (!valid1) {
		const err21 = {
			instancePath,
			schemaPath: "#/if",
			keyword: "if",
			params: { failingKeyword: ifClause0 },
			message: 'must match "' + ifClause0 + '" schema',
			schema: schema74.if,
			parentSchema: schema74,
			data,
		};
		if (vErrors === null) {
			vErrors = [err21];
		} else {
			vErrors.push(err21);
		}
		errors++;
	}
	if (data && typeof data == "object" && !Array.isArray(data)) {
		if (data.id !== undefined) {
			let data3 = data.id;
			const _errs17 = errors;
			let valid5 = false;
			const _errs18 = errors;
			if (
				!validate35(data3, {
					instancePath: instancePath + "/id",
					parentData: data,
					parentDataProperty: "id",
					rootData,
				})
			) {
				vErrors = vErrors === null ? validate35.errors : vErrors.concat(validate35.errors);
				errors = vErrors.length;
			}
			var _valid3 = _errs18 === errors;
			valid5 = valid5 || _valid3;
			if (!valid5) {
				const _errs19 = errors;
				if (data3 !== null) {
					const err22 = {
						instancePath: instancePath + "/id",
						schemaPath: "#/properties/id/anyOf/1/type",
						keyword: "type",
						params: { type: "null" },
						message: "must be null",
						schema: schema74.properties.id.anyOf[1].type,
						parentSchema: schema74.properties.id.anyOf[1],
						data: data3,
					};
					if (vErrors === null) {
						vErrors = [err22];
					} else {
						vErrors.push(err22);
					}
					errors++;
				}
				var _valid3 = _errs19 === errors;
				valid5 = valid5 || _valid3;
			}
			if (!valid5) {
				const err23 = {
					instancePath: instancePath + "/id",
					schemaPath: "#/properties/id/anyOf",
					keyword: "anyOf",
					params: {},
					message: "must match a schema in anyOf",
					schema: schema74.properties.id.anyOf,
					parentSchema: schema74.properties.id,
					data: data3,
				};
				if (vErrors === null) {
					vErrors = [err23];
				} else {
					vErrors.push(err23);
				}
				errors++;
			} else {
				errors = _errs17;
				if (vErrors !== null) {
					if (_errs17) {
						vErrors.length = _errs17;
					} else {
						vErrors = null;
					}
				}
			}
		}
		if (data.secondSignature !== undefined) {
			let data6 = data.secondSignature;
			if (typeof data6 === "string") {
				if (!pattern2.test(data6)) {
					const err24 = {
						instancePath: instancePath + "/secondSignature",
						schemaPath: "alphanumeric/pattern",
						keyword: "pattern",
						params: { pattern: "^[a-zA-Z0-9]+$" },
						message: 'must match pattern "' + "^[a-zA-Z0-9]+$" + '"',
						schema: "^[a-zA-Z0-9]+$",
						parentSchema: schema48,
						data: data6,
					};
					if (vErrors === null) {
						vErrors = [err24];
					} else {
						vErrors.push(err24);
					}
					errors++;
				}
			} else {
				const err25 = {
					instancePath: instancePath + "/secondSignature",
					schemaPath: "alphanumeric/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string",
					schema: schema48.type,
					parentSchema: schema48,
					data: data6,
				};
				if (vErrors === null) {
					vErrors = [err25];
				} else {
					vErrors.push(err25);
				}
				errors++;
			}
		}
		if (data.senderPublicKey !== undefined) {
			if (
				!validate38(data.senderPublicKey, {
					instancePath: instancePath + "/senderPublicKey",
					parentData: data,
					parentDataProperty: "senderPublicKey",
					rootData,
				})
			) {
				vErrors = vErrors === null ? validate38.errors : vErrors.concat(validate38.errors);
				errors = vErrors.length;
			}
		}
		if (data.signSignature !== undefined) {
			let data8 = data.signSignature;
			if (typeof data8 === "string") {
				if (!pattern2.test(data8)) {
					const err26 = {
						instancePath: instancePath + "/signSignature",
						schemaPath: "alphanumeric/pattern",
						keyword: "pattern",
						params: { pattern: "^[a-zA-Z0-9]+$" },
						message: 'must match pattern "' + "^[a-zA-Z0-9]+$" + '"',
						schema: "^[a-zA-Z0-9]+$",
						parentSchema: schema48,
						data: data8,
					};
					if (vErrors === null) {
						vErrors = [err26];
					} else {
						vErrors.push(err26);
					}
					errors++;
				}
			} else {
				const err27 = {
					instancePath: instancePath + "/signSignature",
					schemaPath: "alphanumeric/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string",
					schema: schema48.type,
					parentSchema: schema48,
					data: data8,
				};
				if (vErrors === null) {
					vErrors = [err27];
				} else {
					vErrors.push(err27);
				}
				errors++;
			}
		}
		if (data.signature !== undefined) {
			let data9 = data.signature;
			if (typeof data9 === "string") {
				if (!pattern2.test(data9)) {
					const err28 = {
						instancePath: instancePath + "/signature",
						schemaPath: "alphanumeric/pattern",
						keyword: "pattern",
						params: { pattern: "^[a-zA-Z0-9]+$" },
						message: 'must match pattern "' + "^[a-zA-Z0-9]+$" + '"',
						schema: "^[a-zA-Z0-9]+$",
						parentSchema: schema48,
						data: data9,
					};
					if (vErrors === null) {
						vErrors = [err28];
					} else {
						vErrors.push(err28);
					}
					errors++;
				}
			} else {
				const err29 = {
					instancePath: instancePath + "/signature",
					schemaPath: "alphanumeric/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string",
					schema: schema48.type,
					parentSchema: schema48,
					data: data9,
				};
				if (vErrors === null) {
					vErrors = [err29];
				} else {
					vErrors.push(err29);
				}
				errors++;
			}
		}
		if (data.version !== undefined) {
			let data10 = data.version;
			if (!(data10 === 1 || data10 === 2)) {
				const err30 = {
					instancePath: instancePath + "/version",
					schemaPath: "#/properties/version/enum",
					keyword: "enum",
					params: { allowedValues: schema74.properties.version.enum },
					message: "must be equal to one of the allowed values",
					schema: schema74.properties.version.enum,
					parentSchema: schema74.properties.version,
					data: data10,
				};
				if (vErrors === null) {
					vErrors = [err30];
				} else {
					vErrors.push(err30);
				}
				errors++;
			}
		}
		if (data.signatures !== undefined) {
			let data11 = data.signatures;
			if (Array.isArray(data11)) {
				if (data11.length > 16) {
					const err31 = {
						instancePath: instancePath + "/signatures",
						schemaPath: "#/properties/signatures/maxItems",
						keyword: "maxItems",
						params: { limit: 16 },
						message: "must NOT have more than 16 items",
						schema: 16,
						parentSchema: schema74.properties.signatures,
						data: data11,
					};
					if (vErrors === null) {
						vErrors = [err31];
					} else {
						vErrors.push(err31);
					}
					errors++;
				}
				if (data11.length < 1) {
					const err32 = {
						instancePath: instancePath + "/signatures",
						schemaPath: "#/properties/signatures/minItems",
						keyword: "minItems",
						params: { limit: 1 },
						message: "must NOT have fewer than 1 items",
						schema: 1,
						parentSchema: schema74.properties.signatures,
						data: data11,
					};
					if (vErrors === null) {
						vErrors = [err32];
					} else {
						vErrors.push(err32);
					}
					errors++;
				}
				const len0 = data11.length;
				for (let i0 = 0; i0 < len0; i0++) {
					let data12 = data11[i0];
					if (typeof data12 === "string") {
						if (func2(data12) > 130) {
							const err33 = {
								instancePath: instancePath + "/signatures/" + i0,
								schemaPath: "#/properties/signatures/items/allOf/0/maxLength",
								keyword: "maxLength",
								params: { limit: 130 },
								message: "must NOT have more than 130 characters",
								schema: 130,
								parentSchema: schema74.properties.signatures.items.allOf[0],
								data: data12,
							};
							if (vErrors === null) {
								vErrors = [err33];
							} else {
								vErrors.push(err33);
							}
							errors++;
						}
						if (func2(data12) < 130) {
							const err34 = {
								instancePath: instancePath + "/signatures/" + i0,
								schemaPath: "#/properties/signatures/items/allOf/0/minLength",
								keyword: "minLength",
								params: { limit: 130 },
								message: "must NOT have fewer than 130 characters",
								schema: 130,
								parentSchema: schema74.properties.signatures.items.allOf[0],
								data: data12,
							};
							if (vErrors === null) {
								vErrors = [err34];
							} else {
								vErrors.push(err34);
							}
							errors++;
						}
					}
					if (typeof data12 === "string") {
						if (!pattern2.test(data12)) {
							const err35 = {
								instancePath: instancePath + "/signatures/" + i0,
								schemaPath: "alphanumeric/pattern",
								keyword: "pattern",
								params: { pattern: "^[a-zA-Z0-9]+$" },
								message: 'must match pattern "' + "^[a-zA-Z0-9]+$" + '"',
								schema: "^[a-zA-Z0-9]+$",
								parentSchema: schema48,
								data: data12,
							};
							if (vErrors === null) {
								vErrors = [err35];
							} else {
								vErrors.push(err35);
							}
							errors++;
						}
					} else {
						const err36 = {
							instancePath: instancePath + "/signatures/" + i0,
							schemaPath: "alphanumeric/type",
							keyword: "type",
							params: { type: "string" },
							message: "must be string",
							schema: schema48.type,
							parentSchema: schema48,
							data: data12,
						};
						if (vErrors === null) {
							vErrors = [err36];
						} else {
							vErrors.push(err36);
						}
						errors++;
					}
				}
				let i1 = data11.length;
				let j0;
				if (i1 > 1) {
					outer0: for (; i1--; ) {
						for (j0 = i1; j0--; ) {
							if (func0(data11[i1], data11[j0])) {
								const err37 = {
									instancePath: instancePath + "/signatures",
									schemaPath: "#/properties/signatures/uniqueItems",
									keyword: "uniqueItems",
									params: { i: i1, j: j0 },
									message:
										"must NOT have duplicate items (items ## " +
										j0 +
										" and " +
										i1 +
										" are identical)",
									schema: true,
									parentSchema: schema74.properties.signatures,
									data: data11,
								};
								if (vErrors === null) {
									vErrors = [err37];
								} else {
									vErrors.push(err37);
								}
								errors++;
								break outer0;
							}
						}
					}
				}
			} else {
				const err38 = {
					instancePath: instancePath + "/signatures",
					schemaPath: "#/properties/signatures/type",
					keyword: "type",
					params: { type: "array" },
					message: "must be array",
					schema: schema74.properties.signatures.type,
					parentSchema: schema74.properties.signatures,
					data: data11,
				};
				if (vErrors === null) {
					vErrors = [err38];
				} else {
					vErrors.push(err38);
				}
				errors++;
			}
		}
		if (data.timestamp !== undefined) {
			let data13 = data.timestamp;
			if (!(typeof data13 == "number" && !(data13 % 1) && !isNaN(data13) && isFinite(data13))) {
				const err39 = {
					instancePath: instancePath + "/timestamp",
					schemaPath: "#/properties/timestamp/type",
					keyword: "type",
					params: { type: "integer" },
					message: "must be integer",
					schema: schema74.properties.timestamp.type,
					parentSchema: schema74.properties.timestamp,
					data: data13,
				};
				if (vErrors === null) {
					vErrors = [err39];
				} else {
					vErrors.push(err39);
				}
				errors++;
			}
			if (typeof data13 == "number" && isFinite(data13)) {
				if (data13 < 0 || isNaN(data13)) {
					const err40 = {
						instancePath: instancePath + "/timestamp",
						schemaPath: "#/properties/timestamp/minimum",
						keyword: "minimum",
						params: { comparison: ">=", limit: 0 },
						message: "must be >= 0",
						schema: 0,
						parentSchema: schema74.properties.timestamp,
						data: data13,
					};
					if (vErrors === null) {
						vErrors = [err40];
					} else {
						vErrors.push(err40);
					}
					errors++;
				}
			}
		}
		if (data.typeGroup !== undefined) {
			let data14 = data.typeGroup;
			if (!(typeof data14 == "number" && !(data14 % 1) && !isNaN(data14) && isFinite(data14))) {
				const err41 = {
					instancePath: instancePath + "/typeGroup",
					schemaPath: "#/properties/typeGroup/type",
					keyword: "type",
					params: { type: "integer" },
					message: "must be integer",
					schema: schema74.properties.typeGroup.type,
					parentSchema: schema74.properties.typeGroup,
					data: data14,
				};
				if (vErrors === null) {
					vErrors = [err41];
				} else {
					vErrors.push(err41);
				}
				errors++;
			}
			if (typeof data14 == "number" && isFinite(data14)) {
				if (data14 < 0 || isNaN(data14)) {
					const err42 = {
						instancePath: instancePath + "/typeGroup",
						schemaPath: "#/properties/typeGroup/minimum",
						keyword: "minimum",
						params: { comparison: ">=", limit: 0 },
						message: "must be >= 0",
						schema: 0,
						parentSchema: schema74.properties.typeGroup,
						data: data14,
					};
					if (vErrors === null) {
						vErrors = [err42];
					} else {
						vErrors.push(err42);
					}
					errors++;
				}
			}
		}
		if (data.asset !== undefined) {
			let data15 = data.asset;
			if (data15 && typeof data15 == "object" && !Array.isArray(data15)) {
				if (data15.ipfs === undefined) {
					const err43 = {
						instancePath: instancePath + "/asset",
						schemaPath: "#/properties/asset/required",
						keyword: "required",
						params: { missingProperty: "ipfs" },
						message: "must have required property '" + "ipfs" + "'",
						schema: schema74.properties.asset.required,
						parentSchema: schema74.properties.asset,
						data: data15,
					};
					if (vErrors === null) {
						vErrors = [err43];
					} else {
						vErrors.push(err43);
					}
					errors++;
				}
				if (data15.ipfs !== undefined) {
					let data16 = data15.ipfs;
					if (typeof data16 === "string") {
						if (func2(data16) > 90) {
							const err44 = {
								instancePath: instancePath + "/asset/ipfs",
								schemaPath: "#/properties/asset/properties/ipfs/allOf/0/maxLength",
								keyword: "maxLength",
								params: { limit: 90 },
								message: "must NOT have more than 90 characters",
								schema: 90,
								parentSchema: schema74.properties.asset.properties.ipfs.allOf[0],
								data: data16,
							};
							if (vErrors === null) {
								vErrors = [err44];
							} else {
								vErrors.push(err44);
							}
							errors++;
						}
						if (func2(data16) < 2) {
							const err45 = {
								instancePath: instancePath + "/asset/ipfs",
								schemaPath: "#/properties/asset/properties/ipfs/allOf/0/minLength",
								keyword: "minLength",
								params: { limit: 2 },
								message: "must NOT have fewer than 2 characters",
								schema: 2,
								parentSchema: schema74.properties.asset.properties.ipfs.allOf[0],
								data: data16,
							};
							if (vErrors === null) {
								vErrors = [err45];
							} else {
								vErrors.push(err45);
							}
							errors++;
						}
					}
					if (typeof data16 === "string") {
						if (!pattern1.test(data16)) {
							const err46 = {
								instancePath: instancePath + "/asset/ipfs",
								schemaPath: "base58/pattern",
								keyword: "pattern",
								params: { pattern: "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$" },
								message:
									'must match pattern "' +
									"^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$" +
									'"',
								schema: "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$",
								parentSchema: schema47,
								data: data16,
							};
							if (vErrors === null) {
								vErrors = [err46];
							} else {
								vErrors.push(err46);
							}
							errors++;
						}
					} else {
						const err47 = {
							instancePath: instancePath + "/asset/ipfs",
							schemaPath: "base58/type",
							keyword: "type",
							params: { type: "string" },
							message: "must be string",
							schema: schema47.type,
							parentSchema: schema47,
							data: data16,
						};
						if (vErrors === null) {
							vErrors = [err47];
						} else {
							vErrors.push(err47);
						}
						errors++;
					}
				}
			} else {
				const err48 = {
					instancePath: instancePath + "/asset",
					schemaPath: "#/properties/asset/type",
					keyword: "type",
					params: { type: "object" },
					message: "must be object",
					schema: schema74.properties.asset.type,
					parentSchema: schema74.properties.asset,
					data: data15,
				};
				if (vErrors === null) {
					vErrors = [err48];
				} else {
					vErrors.push(err48);
				}
				errors++;
			}
		}
	} else {
		const err49 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "object" },
			message: "must be object",
			schema: schema74.type,
			parentSchema: schema74,
			data,
		};
		if (vErrors === null) {
			vErrors = [err49];
		} else {
			vErrors.push(err49);
		}
		errors++;
	}
	validate49.errors = vErrors;
	return errors === 0;
}
