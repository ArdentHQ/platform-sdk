/**
 * IMPORTANT: This file is generated using "pnpm build:validators" CLI command and any manual changes should be avoided, they will be overriden when generating standalone validators.
 *
 * For any changes in schemas or custom validators, see the referenced schemas in packages/ark/cli/compile-validators.ts and adjust them accordingly.
 * After schema update, run "pnpm build:validators" to gererate new standalone validator code.
 *
 * Custom validation functions are defined in /packages/ark/source/crypto/validation/index.ts
 *
 */
//@ts-nocheck
	
"use strict";
const schema46 = { "$id": "networkByte", "network": true };
function validate32(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { /*# sourceURL="networkByte" */ ; let vErrors = null; let errors = 0; validate32.errors = vErrors; return errors === 0; }
const schema47 = { "$id": "secondSignature", "else": { "required": ["type", "senderPublicKey", "fee", "amount", "nonce"] }, "if": { "properties": { "version": { "anyOf": [{ "type": "null" }, { "const": 1 }] } } }, "properties": { "amount": { "bignumber": { "minimum": 0, "maximum": 0 } }, "fee": { "bignumber": { "minimum": 1 } }, "id": { "type": "string" }, "network": { "$ref": "networkByte" }, "nonce": { "bignumber": { "minimum": 0 } }, "secondSignature": { "type": "null" }, "senderPublicKey": { "type": "string" }, "signSignature": { "type": "string" }, "signature": { "type": "string" }, "version": { "enum": [1, 2] }, "signatures": { "items": { "type": "string" }, "maxItems": 16, "minItems": 1, "type": "array" }, "timestamp": { "type": "integer", "minimum": 0 }, "typeGroup": { "minimum": 0, "type": "integer" }, "asset": { "properties": { "signature": { "properties": { "publicKey": { "type": "string" } }, "required": ["publicKey"], "type": "object" } }, "required": ["signature"], "type": "object" }, "type": { "transactionType": 1 } }, "then": { "required": ["type", "senderPublicKey", "fee", "amount", "timestamp"] }, "type": "object", "required": ["asset"] };
function validate33(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { /*# sourceURL="secondSignature" */ ; let vErrors = null; let errors = 0; const _errs1 = errors; let valid0 = true; const _errs2 = errors; if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.version !== undefined) {
        let data0 = data.version;
        const _errs4 = errors;
        let valid2 = false;
        const _errs5 = errors;
        if (data0 !== null) {
            const err0 = {};
            if (vErrors === null) {
                vErrors = [err0];
            }
            else {
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
                }
                else {
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
            }
            else {
                vErrors.push(err2);
            }
            errors++;
        }
        else {
            errors = _errs4;
            if (vErrors !== null) {
                if (_errs4) {
                    vErrors.length = _errs4;
                }
                else {
                    vErrors = null;
                }
            }
        }
    }
} var _valid0 = _errs2 === errors; errors = _errs1; if (vErrors !== null) {
    if (_errs1) {
        vErrors.length = _errs1;
    }
    else {
        vErrors = null;
    }
} let ifClause0; if (_valid0) {
    const _errs8 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.type === undefined) {
            const err3 = { instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property '" + "type" + "'", schema: schema47.then.required, parentSchema: schema47.then, data };
            if (vErrors === null) {
                vErrors = [err3];
            }
            else {
                vErrors.push(err3);
            }
            errors++;
        }
        if (data.senderPublicKey === undefined) {
            const err4 = { instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "senderPublicKey" }, message: "must have required property '" + "senderPublicKey" + "'", schema: schema47.then.required, parentSchema: schema47.then, data };
            if (vErrors === null) {
                vErrors = [err4];
            }
            else {
                vErrors.push(err4);
            }
            errors++;
        }
        if (data.fee === undefined) {
            const err5 = { instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "fee" }, message: "must have required property '" + "fee" + "'", schema: schema47.then.required, parentSchema: schema47.then, data };
            if (vErrors === null) {
                vErrors = [err5];
            }
            else {
                vErrors.push(err5);
            }
            errors++;
        }
        if (data.amount === undefined) {
            const err6 = { instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "amount" }, message: "must have required property '" + "amount" + "'", schema: schema47.then.required, parentSchema: schema47.then, data };
            if (vErrors === null) {
                vErrors = [err6];
            }
            else {
                vErrors.push(err6);
            }
            errors++;
        }
        if (data.timestamp === undefined) {
            const err7 = { instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "timestamp" }, message: "must have required property '" + "timestamp" + "'", schema: schema47.then.required, parentSchema: schema47.then, data };
            if (vErrors === null) {
                vErrors = [err7];
            }
            else {
                vErrors.push(err7);
            }
            errors++;
        }
    }
    var _valid0 = _errs8 === errors;
    valid0 = _valid0;
    ifClause0 = "then";
}
else {
    const _errs9 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.type === undefined) {
            const err8 = { instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property '" + "type" + "'", schema: schema47.else.required, parentSchema: schema47.else, data };
            if (vErrors === null) {
                vErrors = [err8];
            }
            else {
                vErrors.push(err8);
            }
            errors++;
        }
        if (data.senderPublicKey === undefined) {
            const err9 = { instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "senderPublicKey" }, message: "must have required property '" + "senderPublicKey" + "'", schema: schema47.else.required, parentSchema: schema47.else, data };
            if (vErrors === null) {
                vErrors = [err9];
            }
            else {
                vErrors.push(err9);
            }
            errors++;
        }
        if (data.fee === undefined) {
            const err10 = { instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "fee" }, message: "must have required property '" + "fee" + "'", schema: schema47.else.required, parentSchema: schema47.else, data };
            if (vErrors === null) {
                vErrors = [err10];
            }
            else {
                vErrors.push(err10);
            }
            errors++;
        }
        if (data.amount === undefined) {
            const err11 = { instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "amount" }, message: "must have required property '" + "amount" + "'", schema: schema47.else.required, parentSchema: schema47.else, data };
            if (vErrors === null) {
                vErrors = [err11];
            }
            else {
                vErrors.push(err11);
            }
            errors++;
        }
        if (data.nonce === undefined) {
            const err12 = { instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "nonce" }, message: "must have required property '" + "nonce" + "'", schema: schema47.else.required, parentSchema: schema47.else, data };
            if (vErrors === null) {
                vErrors = [err12];
            }
            else {
                vErrors.push(err12);
            }
            errors++;
        }
    }
    var _valid0 = _errs9 === errors;
    valid0 = _valid0;
    ifClause0 = "else";
} if (!valid0) {
    const err13 = { instancePath, schemaPath: "#/if", keyword: "if", params: { failingKeyword: ifClause0 }, message: "must match \"" + ifClause0 + "\" schema", schema: schema47.if, parentSchema: schema47, data };
    if (vErrors === null) {
        vErrors = [err13];
    }
    else {
        vErrors.push(err13);
    }
    errors++;
} if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.asset === undefined) {
        const err14 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "asset" }, message: "must have required property '" + "asset" + "'", schema: schema47.required, parentSchema: schema47, data };
        if (vErrors === null) {
            vErrors = [err14];
        }
        else {
            vErrors.push(err14);
        }
        errors++;
    }
    if (data.id !== undefined) {
        let data3 = data.id;
        if (typeof data3 !== "string") {
            const err15 = { instancePath: instancePath + "/id", schemaPath: "#/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema47.properties.id.type, parentSchema: schema47.properties.id, data: data3 };
            if (vErrors === null) {
                vErrors = [err15];
            }
            else {
                vErrors.push(err15);
            }
            errors++;
        }
    }
    if (data.secondSignature !== undefined) {
        let data6 = data.secondSignature;
        if (data6 !== null) {
            const err16 = { instancePath: instancePath + "/secondSignature", schemaPath: "#/properties/secondSignature/type", keyword: "type", params: { type: "null" }, message: "must be null", schema: schema47.properties.secondSignature.type, parentSchema: schema47.properties.secondSignature, data: data6 };
            if (vErrors === null) {
                vErrors = [err16];
            }
            else {
                vErrors.push(err16);
            }
            errors++;
        }
    }
    if (data.senderPublicKey !== undefined) {
        let data7 = data.senderPublicKey;
        if (typeof data7 !== "string") {
            const err17 = { instancePath: instancePath + "/senderPublicKey", schemaPath: "#/properties/senderPublicKey/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema47.properties.senderPublicKey.type, parentSchema: schema47.properties.senderPublicKey, data: data7 };
            if (vErrors === null) {
                vErrors = [err17];
            }
            else {
                vErrors.push(err17);
            }
            errors++;
        }
    }
    if (data.signSignature !== undefined) {
        let data8 = data.signSignature;
        if (typeof data8 !== "string") {
            const err18 = { instancePath: instancePath + "/signSignature", schemaPath: "#/properties/signSignature/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema47.properties.signSignature.type, parentSchema: schema47.properties.signSignature, data: data8 };
            if (vErrors === null) {
                vErrors = [err18];
            }
            else {
                vErrors.push(err18);
            }
            errors++;
        }
    }
    if (data.signature !== undefined) {
        let data9 = data.signature;
        if (typeof data9 !== "string") {
            const err19 = { instancePath: instancePath + "/signature", schemaPath: "#/properties/signature/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema47.properties.signature.type, parentSchema: schema47.properties.signature, data: data9 };
            if (vErrors === null) {
                vErrors = [err19];
            }
            else {
                vErrors.push(err19);
            }
            errors++;
        }
    }
    if (data.version !== undefined) {
        let data10 = data.version;
        if (!((data10 === 1) || (data10 === 2))) {
            const err20 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/enum", keyword: "enum", params: { allowedValues: schema47.properties.version.enum }, message: "must be equal to one of the allowed values", schema: schema47.properties.version.enum, parentSchema: schema47.properties.version, data: data10 };
            if (vErrors === null) {
                vErrors = [err20];
            }
            else {
                vErrors.push(err20);
            }
            errors++;
        }
    }
    if (data.signatures !== undefined) {
        let data11 = data.signatures;
        if (Array.isArray(data11)) {
            if (data11.length > 16) {
                const err21 = { instancePath: instancePath + "/signatures", schemaPath: "#/properties/signatures/maxItems", keyword: "maxItems", params: { limit: 16 }, message: "must NOT have more than 16 items", schema: 16, parentSchema: schema47.properties.signatures, data: data11 };
                if (vErrors === null) {
                    vErrors = [err21];
                }
                else {
                    vErrors.push(err21);
                }
                errors++;
            }
            if (data11.length < 1) {
                const err22 = { instancePath: instancePath + "/signatures", schemaPath: "#/properties/signatures/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items", schema: 1, parentSchema: schema47.properties.signatures, data: data11 };
                if (vErrors === null) {
                    vErrors = [err22];
                }
                else {
                    vErrors.push(err22);
                }
                errors++;
            }
            const len0 = data11.length;
            for (let i0 = 0; i0 < len0; i0++) {
                let data12 = data11[i0];
                if (typeof data12 !== "string") {
                    const err23 = { instancePath: instancePath + "/signatures/" + i0, schemaPath: "#/properties/signatures/items/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema47.properties.signatures.items.type, parentSchema: schema47.properties.signatures.items, data: data12 };
                    if (vErrors === null) {
                        vErrors = [err23];
                    }
                    else {
                        vErrors.push(err23);
                    }
                    errors++;
                }
            }
        }
        else {
            const err24 = { instancePath: instancePath + "/signatures", schemaPath: "#/properties/signatures/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema47.properties.signatures.type, parentSchema: schema47.properties.signatures, data: data11 };
            if (vErrors === null) {
                vErrors = [err24];
            }
            else {
                vErrors.push(err24);
            }
            errors++;
        }
    }
    if (data.timestamp !== undefined) {
        let data13 = data.timestamp;
        if (!(((typeof data13 == "number") && (!(data13 % 1) && !isNaN(data13))) && (isFinite(data13)))) {
            const err25 = { instancePath: instancePath + "/timestamp", schemaPath: "#/properties/timestamp/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema47.properties.timestamp.type, parentSchema: schema47.properties.timestamp, data: data13 };
            if (vErrors === null) {
                vErrors = [err25];
            }
            else {
                vErrors.push(err25);
            }
            errors++;
        }
        if ((typeof data13 == "number") && (isFinite(data13))) {
            if (data13 < 0 || isNaN(data13)) {
                const err26 = { instancePath: instancePath + "/timestamp", schemaPath: "#/properties/timestamp/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0", schema: 0, parentSchema: schema47.properties.timestamp, data: data13 };
                if (vErrors === null) {
                    vErrors = [err26];
                }
                else {
                    vErrors.push(err26);
                }
                errors++;
            }
        }
    }
    if (data.typeGroup !== undefined) {
        let data14 = data.typeGroup;
        if (!(((typeof data14 == "number") && (!(data14 % 1) && !isNaN(data14))) && (isFinite(data14)))) {
            const err27 = { instancePath: instancePath + "/typeGroup", schemaPath: "#/properties/typeGroup/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema47.properties.typeGroup.type, parentSchema: schema47.properties.typeGroup, data: data14 };
            if (vErrors === null) {
                vErrors = [err27];
            }
            else {
                vErrors.push(err27);
            }
            errors++;
        }
        if ((typeof data14 == "number") && (isFinite(data14))) {
            if (data14 < 0 || isNaN(data14)) {
                const err28 = { instancePath: instancePath + "/typeGroup", schemaPath: "#/properties/typeGroup/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0", schema: 0, parentSchema: schema47.properties.typeGroup, data: data14 };
                if (vErrors === null) {
                    vErrors = [err28];
                }
                else {
                    vErrors.push(err28);
                }
                errors++;
            }
        }
    }
    if (data.asset !== undefined) {
        let data15 = data.asset;
        if (data15 && typeof data15 == "object" && !Array.isArray(data15)) {
            if (data15.signature === undefined) {
                const err29 = { instancePath: instancePath + "/asset", schemaPath: "#/properties/asset/required", keyword: "required", params: { missingProperty: "signature" }, message: "must have required property '" + "signature" + "'", schema: schema47.properties.asset.required, parentSchema: schema47.properties.asset, data: data15 };
                if (vErrors === null) {
                    vErrors = [err29];
                }
                else {
                    vErrors.push(err29);
                }
                errors++;
            }
            if (data15.signature !== undefined) {
                let data16 = data15.signature;
                if (data16 && typeof data16 == "object" && !Array.isArray(data16)) {
                    if (data16.publicKey === undefined) {
                        const err30 = { instancePath: instancePath + "/asset/signature", schemaPath: "#/properties/asset/properties/signature/required", keyword: "required", params: { missingProperty: "publicKey" }, message: "must have required property '" + "publicKey" + "'", schema: schema47.properties.asset.properties.signature.required, parentSchema: schema47.properties.asset.properties.signature, data: data16 };
                        if (vErrors === null) {
                            vErrors = [err30];
                        }
                        else {
                            vErrors.push(err30);
                        }
                        errors++;
                    }
                    if (data16.publicKey !== undefined) {
                        let data17 = data16.publicKey;
                        if (typeof data17 !== "string") {
                            const err31 = { instancePath: instancePath + "/asset/signature/publicKey", schemaPath: "#/properties/asset/properties/signature/properties/publicKey/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema47.properties.asset.properties.signature.properties.publicKey.type, parentSchema: schema47.properties.asset.properties.signature.properties.publicKey, data: data17 };
                            if (vErrors === null) {
                                vErrors = [err31];
                            }
                            else {
                                vErrors.push(err31);
                            }
                            errors++;
                        }
                    }
                }
                else {
                    const err32 = { instancePath: instancePath + "/asset/signature", schemaPath: "#/properties/asset/properties/signature/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema47.properties.asset.properties.signature.type, parentSchema: schema47.properties.asset.properties.signature, data: data16 };
                    if (vErrors === null) {
                        vErrors = [err32];
                    }
                    else {
                        vErrors.push(err32);
                    }
                    errors++;
                }
            }
        }
        else {
            const err33 = { instancePath: instancePath + "/asset", schemaPath: "#/properties/asset/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema47.properties.asset.type, parentSchema: schema47.properties.asset, data: data15 };
            if (vErrors === null) {
                vErrors = [err33];
            }
            else {
                vErrors.push(err33);
            }
            errors++;
        }
    }
}
else {
    const err34 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema47.type, parentSchema: schema47, data };
    if (vErrors === null) {
        vErrors = [err34];
    }
    else {
        vErrors.push(err34);
    }
    errors++;
} validate33.errors = vErrors; return errors === 0; }
const schema49 = { "$id": "secondSignatureStrict", "else": { "required": ["type", "senderPublicKey", "fee", "amount", "nonce"] }, "if": { "properties": { "version": { "anyOf": [{ "type": "null" }, { "const": 1 }] } } }, "properties": { "amount": { "bignumber": { "minimum": 0, "maximum": 0 } }, "fee": { "bignumber": { "minimum": 1 } }, "id": { "type": "string" }, "network": { "$ref": "networkByte" }, "nonce": { "bignumber": { "minimum": 0 } }, "secondSignature": { "type": "null" }, "senderPublicKey": { "type": "string" }, "signSignature": { "type": "string" }, "signature": { "type": "string" }, "version": { "enum": [1, 2] }, "signatures": { "items": { "type": "string" }, "maxItems": 16, "minItems": 1, "type": "array" }, "timestamp": { "type": "integer", "minimum": 0 }, "typeGroup": { "minimum": 0, "type": "integer" }, "asset": { "properties": { "signature": { "properties": { "publicKey": { "type": "string" } }, "required": ["publicKey"], "type": "object" } }, "required": ["signature"], "type": "object" }, "type": { "transactionType": 1 } }, "then": { "required": ["type", "senderPublicKey", "fee", "amount", "timestamp"] }, "type": "object", "required": ["asset"], "anyOf": [{ "required": ["id", "signature"] }, { "required": ["id", "signature", "signatures"] }, { "required": ["id", "signatures"] }], "additionalProperties": false };
const func2 = Object.prototype.hasOwnProperty;
function validate34(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { /*# sourceURL="secondSignatureStrict" */ ; let vErrors = null; let errors = 0; const _errs1 = errors; let valid0 = false; const _errs2 = errors; if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.id === undefined) {
        const err0 = { instancePath, schemaPath: "#/anyOf/0/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property '" + "id" + "'", schema: schema49.anyOf[0].required, parentSchema: schema49.anyOf[0], data };
        if (vErrors === null) {
            vErrors = [err0];
        }
        else {
            vErrors.push(err0);
        }
        errors++;
    }
    if (data.signature === undefined) {
        const err1 = { instancePath, schemaPath: "#/anyOf/0/required", keyword: "required", params: { missingProperty: "signature" }, message: "must have required property '" + "signature" + "'", schema: schema49.anyOf[0].required, parentSchema: schema49.anyOf[0], data };
        if (vErrors === null) {
            vErrors = [err1];
        }
        else {
            vErrors.push(err1);
        }
        errors++;
    }
} var _valid0 = _errs2 === errors; valid0 = valid0 || _valid0; if (!valid0) {
    const _errs3 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.id === undefined) {
            const err2 = { instancePath, schemaPath: "#/anyOf/1/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property '" + "id" + "'", schema: schema49.anyOf[1].required, parentSchema: schema49.anyOf[1], data };
            if (vErrors === null) {
                vErrors = [err2];
            }
            else {
                vErrors.push(err2);
            }
            errors++;
        }
        if (data.signature === undefined) {
            const err3 = { instancePath, schemaPath: "#/anyOf/1/required", keyword: "required", params: { missingProperty: "signature" }, message: "must have required property '" + "signature" + "'", schema: schema49.anyOf[1].required, parentSchema: schema49.anyOf[1], data };
            if (vErrors === null) {
                vErrors = [err3];
            }
            else {
                vErrors.push(err3);
            }
            errors++;
        }
        if (data.signatures === undefined) {
            const err4 = { instancePath, schemaPath: "#/anyOf/1/required", keyword: "required", params: { missingProperty: "signatures" }, message: "must have required property '" + "signatures" + "'", schema: schema49.anyOf[1].required, parentSchema: schema49.anyOf[1], data };
            if (vErrors === null) {
                vErrors = [err4];
            }
            else {
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
                const err5 = { instancePath, schemaPath: "#/anyOf/2/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property '" + "id" + "'", schema: schema49.anyOf[2].required, parentSchema: schema49.anyOf[2], data };
                if (vErrors === null) {
                    vErrors = [err5];
                }
                else {
                    vErrors.push(err5);
                }
                errors++;
            }
            if (data.signatures === undefined) {
                const err6 = { instancePath, schemaPath: "#/anyOf/2/required", keyword: "required", params: { missingProperty: "signatures" }, message: "must have required property '" + "signatures" + "'", schema: schema49.anyOf[2].required, parentSchema: schema49.anyOf[2], data };
                if (vErrors === null) {
                    vErrors = [err6];
                }
                else {
                    vErrors.push(err6);
                }
                errors++;
            }
        }
        var _valid0 = _errs4 === errors;
        valid0 = valid0 || _valid0;
    }
} if (!valid0) {
    const err7 = { instancePath, schemaPath: "#/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf", schema: schema49.anyOf, parentSchema: schema49, data };
    if (vErrors === null) {
        vErrors = [err7];
    }
    else {
        vErrors.push(err7);
    }
    errors++;
}
else {
    errors = _errs1;
    if (vErrors !== null) {
        if (_errs1) {
            vErrors.length = _errs1;
        }
        else {
            vErrors = null;
        }
    }
} const _errs5 = errors; let valid1 = true; const _errs6 = errors; if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.version !== undefined) {
        let data0 = data.version;
        const _errs8 = errors;
        let valid3 = false;
        const _errs9 = errors;
        if (data0 !== null) {
            const err8 = {};
            if (vErrors === null) {
                vErrors = [err8];
            }
            else {
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
                }
                else {
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
            }
            else {
                vErrors.push(err10);
            }
            errors++;
        }
        else {
            errors = _errs8;
            if (vErrors !== null) {
                if (_errs8) {
                    vErrors.length = _errs8;
                }
                else {
                    vErrors = null;
                }
            }
        }
    }
} var _valid1 = _errs6 === errors; errors = _errs5; if (vErrors !== null) {
    if (_errs5) {
        vErrors.length = _errs5;
    }
    else {
        vErrors = null;
    }
} let ifClause0; if (_valid1) {
    const _errs12 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.type === undefined) {
            const err11 = { instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property '" + "type" + "'", schema: schema49.then.required, parentSchema: schema49.then, data };
            if (vErrors === null) {
                vErrors = [err11];
            }
            else {
                vErrors.push(err11);
            }
            errors++;
        }
        if (data.senderPublicKey === undefined) {
            const err12 = { instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "senderPublicKey" }, message: "must have required property '" + "senderPublicKey" + "'", schema: schema49.then.required, parentSchema: schema49.then, data };
            if (vErrors === null) {
                vErrors = [err12];
            }
            else {
                vErrors.push(err12);
            }
            errors++;
        }
        if (data.fee === undefined) {
            const err13 = { instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "fee" }, message: "must have required property '" + "fee" + "'", schema: schema49.then.required, parentSchema: schema49.then, data };
            if (vErrors === null) {
                vErrors = [err13];
            }
            else {
                vErrors.push(err13);
            }
            errors++;
        }
        if (data.amount === undefined) {
            const err14 = { instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "amount" }, message: "must have required property '" + "amount" + "'", schema: schema49.then.required, parentSchema: schema49.then, data };
            if (vErrors === null) {
                vErrors = [err14];
            }
            else {
                vErrors.push(err14);
            }
            errors++;
        }
        if (data.timestamp === undefined) {
            const err15 = { instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "timestamp" }, message: "must have required property '" + "timestamp" + "'", schema: schema49.then.required, parentSchema: schema49.then, data };
            if (vErrors === null) {
                vErrors = [err15];
            }
            else {
                vErrors.push(err15);
            }
            errors++;
        }
    }
    var _valid1 = _errs12 === errors;
    valid1 = _valid1;
    ifClause0 = "then";
}
else {
    const _errs13 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.type === undefined) {
            const err16 = { instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property '" + "type" + "'", schema: schema49.else.required, parentSchema: schema49.else, data };
            if (vErrors === null) {
                vErrors = [err16];
            }
            else {
                vErrors.push(err16);
            }
            errors++;
        }
        if (data.senderPublicKey === undefined) {
            const err17 = { instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "senderPublicKey" }, message: "must have required property '" + "senderPublicKey" + "'", schema: schema49.else.required, parentSchema: schema49.else, data };
            if (vErrors === null) {
                vErrors = [err17];
            }
            else {
                vErrors.push(err17);
            }
            errors++;
        }
        if (data.fee === undefined) {
            const err18 = { instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "fee" }, message: "must have required property '" + "fee" + "'", schema: schema49.else.required, parentSchema: schema49.else, data };
            if (vErrors === null) {
                vErrors = [err18];
            }
            else {
                vErrors.push(err18);
            }
            errors++;
        }
        if (data.amount === undefined) {
            const err19 = { instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "amount" }, message: "must have required property '" + "amount" + "'", schema: schema49.else.required, parentSchema: schema49.else, data };
            if (vErrors === null) {
                vErrors = [err19];
            }
            else {
                vErrors.push(err19);
            }
            errors++;
        }
        if (data.nonce === undefined) {
            const err20 = { instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "nonce" }, message: "must have required property '" + "nonce" + "'", schema: schema49.else.required, parentSchema: schema49.else, data };
            if (vErrors === null) {
                vErrors = [err20];
            }
            else {
                vErrors.push(err20);
            }
            errors++;
        }
    }
    var _valid1 = _errs13 === errors;
    valid1 = _valid1;
    ifClause0 = "else";
} if (!valid1) {
    const err21 = { instancePath, schemaPath: "#/if", keyword: "if", params: { failingKeyword: ifClause0 }, message: "must match \"" + ifClause0 + "\" schema", schema: schema49.if, parentSchema: schema49, data };
    if (vErrors === null) {
        vErrors = [err21];
    }
    else {
        vErrors.push(err21);
    }
    errors++;
} if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.asset === undefined) {
        const err22 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "asset" }, message: "must have required property '" + "asset" + "'", schema: schema49.required, parentSchema: schema49, data };
        if (vErrors === null) {
            vErrors = [err22];
        }
        else {
            vErrors.push(err22);
        }
        errors++;
    }
    for (const key0 in data) {
        if (!(func2.call(schema49.properties, key0))) {
            const err23 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties", schema: false, parentSchema: schema49, data };
            if (vErrors === null) {
                vErrors = [err23];
            }
            else {
                vErrors.push(err23);
            }
            errors++;
        }
    }
    if (data.id !== undefined) {
        let data3 = data.id;
        if (typeof data3 !== "string") {
            const err24 = { instancePath: instancePath + "/id", schemaPath: "#/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema49.properties.id.type, parentSchema: schema49.properties.id, data: data3 };
            if (vErrors === null) {
                vErrors = [err24];
            }
            else {
                vErrors.push(err24);
            }
            errors++;
        }
    }
    if (data.secondSignature !== undefined) {
        let data6 = data.secondSignature;
        if (data6 !== null) {
            const err25 = { instancePath: instancePath + "/secondSignature", schemaPath: "#/properties/secondSignature/type", keyword: "type", params: { type: "null" }, message: "must be null", schema: schema49.properties.secondSignature.type, parentSchema: schema49.properties.secondSignature, data: data6 };
            if (vErrors === null) {
                vErrors = [err25];
            }
            else {
                vErrors.push(err25);
            }
            errors++;
        }
    }
    if (data.senderPublicKey !== undefined) {
        let data7 = data.senderPublicKey;
        if (typeof data7 !== "string") {
            const err26 = { instancePath: instancePath + "/senderPublicKey", schemaPath: "#/properties/senderPublicKey/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema49.properties.senderPublicKey.type, parentSchema: schema49.properties.senderPublicKey, data: data7 };
            if (vErrors === null) {
                vErrors = [err26];
            }
            else {
                vErrors.push(err26);
            }
            errors++;
        }
    }
    if (data.signSignature !== undefined) {
        let data8 = data.signSignature;
        if (typeof data8 !== "string") {
            const err27 = { instancePath: instancePath + "/signSignature", schemaPath: "#/properties/signSignature/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema49.properties.signSignature.type, parentSchema: schema49.properties.signSignature, data: data8 };
            if (vErrors === null) {
                vErrors = [err27];
            }
            else {
                vErrors.push(err27);
            }
            errors++;
        }
    }
    if (data.signature !== undefined) {
        let data9 = data.signature;
        if (typeof data9 !== "string") {
            const err28 = { instancePath: instancePath + "/signature", schemaPath: "#/properties/signature/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema49.properties.signature.type, parentSchema: schema49.properties.signature, data: data9 };
            if (vErrors === null) {
                vErrors = [err28];
            }
            else {
                vErrors.push(err28);
            }
            errors++;
        }
    }
    if (data.version !== undefined) {
        let data10 = data.version;
        if (!((data10 === 1) || (data10 === 2))) {
            const err29 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/enum", keyword: "enum", params: { allowedValues: schema49.properties.version.enum }, message: "must be equal to one of the allowed values", schema: schema49.properties.version.enum, parentSchema: schema49.properties.version, data: data10 };
            if (vErrors === null) {
                vErrors = [err29];
            }
            else {
                vErrors.push(err29);
            }
            errors++;
        }
    }
    if (data.signatures !== undefined) {
        let data11 = data.signatures;
        if (Array.isArray(data11)) {
            if (data11.length > 16) {
                const err30 = { instancePath: instancePath + "/signatures", schemaPath: "#/properties/signatures/maxItems", keyword: "maxItems", params: { limit: 16 }, message: "must NOT have more than 16 items", schema: 16, parentSchema: schema49.properties.signatures, data: data11 };
                if (vErrors === null) {
                    vErrors = [err30];
                }
                else {
                    vErrors.push(err30);
                }
                errors++;
            }
            if (data11.length < 1) {
                const err31 = { instancePath: instancePath + "/signatures", schemaPath: "#/properties/signatures/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items", schema: 1, parentSchema: schema49.properties.signatures, data: data11 };
                if (vErrors === null) {
                    vErrors = [err31];
                }
                else {
                    vErrors.push(err31);
                }
                errors++;
            }
            const len0 = data11.length;
            for (let i0 = 0; i0 < len0; i0++) {
                let data12 = data11[i0];
                if (typeof data12 !== "string") {
                    const err32 = { instancePath: instancePath + "/signatures/" + i0, schemaPath: "#/properties/signatures/items/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema49.properties.signatures.items.type, parentSchema: schema49.properties.signatures.items, data: data12 };
                    if (vErrors === null) {
                        vErrors = [err32];
                    }
                    else {
                        vErrors.push(err32);
                    }
                    errors++;
                }
            }
        }
        else {
            const err33 = { instancePath: instancePath + "/signatures", schemaPath: "#/properties/signatures/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema49.properties.signatures.type, parentSchema: schema49.properties.signatures, data: data11 };
            if (vErrors === null) {
                vErrors = [err33];
            }
            else {
                vErrors.push(err33);
            }
            errors++;
        }
    }
    if (data.timestamp !== undefined) {
        let data13 = data.timestamp;
        if (!(((typeof data13 == "number") && (!(data13 % 1) && !isNaN(data13))) && (isFinite(data13)))) {
            const err34 = { instancePath: instancePath + "/timestamp", schemaPath: "#/properties/timestamp/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema49.properties.timestamp.type, parentSchema: schema49.properties.timestamp, data: data13 };
            if (vErrors === null) {
                vErrors = [err34];
            }
            else {
                vErrors.push(err34);
            }
            errors++;
        }
        if ((typeof data13 == "number") && (isFinite(data13))) {
            if (data13 < 0 || isNaN(data13)) {
                const err35 = { instancePath: instancePath + "/timestamp", schemaPath: "#/properties/timestamp/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0", schema: 0, parentSchema: schema49.properties.timestamp, data: data13 };
                if (vErrors === null) {
                    vErrors = [err35];
                }
                else {
                    vErrors.push(err35);
                }
                errors++;
            }
        }
    }
    if (data.typeGroup !== undefined) {
        let data14 = data.typeGroup;
        if (!(((typeof data14 == "number") && (!(data14 % 1) && !isNaN(data14))) && (isFinite(data14)))) {
            const err36 = { instancePath: instancePath + "/typeGroup", schemaPath: "#/properties/typeGroup/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema49.properties.typeGroup.type, parentSchema: schema49.properties.typeGroup, data: data14 };
            if (vErrors === null) {
                vErrors = [err36];
            }
            else {
                vErrors.push(err36);
            }
            errors++;
        }
        if ((typeof data14 == "number") && (isFinite(data14))) {
            if (data14 < 0 || isNaN(data14)) {
                const err37 = { instancePath: instancePath + "/typeGroup", schemaPath: "#/properties/typeGroup/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0", schema: 0, parentSchema: schema49.properties.typeGroup, data: data14 };
                if (vErrors === null) {
                    vErrors = [err37];
                }
                else {
                    vErrors.push(err37);
                }
                errors++;
            }
        }
    }
    if (data.asset !== undefined) {
        let data15 = data.asset;
        if (data15 && typeof data15 == "object" && !Array.isArray(data15)) {
            if (data15.signature === undefined) {
                const err38 = { instancePath: instancePath + "/asset", schemaPath: "#/properties/asset/required", keyword: "required", params: { missingProperty: "signature" }, message: "must have required property '" + "signature" + "'", schema: schema49.properties.asset.required, parentSchema: schema49.properties.asset, data: data15 };
                if (vErrors === null) {
                    vErrors = [err38];
                }
                else {
                    vErrors.push(err38);
                }
                errors++;
            }
            if (data15.signature !== undefined) {
                let data16 = data15.signature;
                if (data16 && typeof data16 == "object" && !Array.isArray(data16)) {
                    if (data16.publicKey === undefined) {
                        const err39 = { instancePath: instancePath + "/asset/signature", schemaPath: "#/properties/asset/properties/signature/required", keyword: "required", params: { missingProperty: "publicKey" }, message: "must have required property '" + "publicKey" + "'", schema: schema49.properties.asset.properties.signature.required, parentSchema: schema49.properties.asset.properties.signature, data: data16 };
                        if (vErrors === null) {
                            vErrors = [err39];
                        }
                        else {
                            vErrors.push(err39);
                        }
                        errors++;
                    }
                    if (data16.publicKey !== undefined) {
                        let data17 = data16.publicKey;
                        if (typeof data17 !== "string") {
                            const err40 = { instancePath: instancePath + "/asset/signature/publicKey", schemaPath: "#/properties/asset/properties/signature/properties/publicKey/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema49.properties.asset.properties.signature.properties.publicKey.type, parentSchema: schema49.properties.asset.properties.signature.properties.publicKey, data: data17 };
                            if (vErrors === null) {
                                vErrors = [err40];
                            }
                            else {
                                vErrors.push(err40);
                            }
                            errors++;
                        }
                    }
                }
                else {
                    const err41 = { instancePath: instancePath + "/asset/signature", schemaPath: "#/properties/asset/properties/signature/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema49.properties.asset.properties.signature.type, parentSchema: schema49.properties.asset.properties.signature, data: data16 };
                    if (vErrors === null) {
                        vErrors = [err41];
                    }
                    else {
                        vErrors.push(err41);
                    }
                    errors++;
                }
            }
        }
        else {
            const err42 = { instancePath: instancePath + "/asset", schemaPath: "#/properties/asset/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema49.properties.asset.type, parentSchema: schema49.properties.asset, data: data15 };
            if (vErrors === null) {
                vErrors = [err42];
            }
            else {
                vErrors.push(err42);
            }
            errors++;
        }
    }
}
else {
    const err43 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema49.type, parentSchema: schema49, data };
    if (vErrors === null) {
        vErrors = [err43];
    }
    else {
        vErrors.push(err43);
    }
    errors++;
} validate34.errors = vErrors; return errors === 0; }
const schema51 = { "$id": "secondSignatureSigned", "else": { "required": ["type", "senderPublicKey", "fee", "amount", "nonce"] }, "if": { "properties": { "version": { "anyOf": [{ "type": "null" }, { "const": 1 }] } } }, "properties": { "amount": { "bignumber": { "minimum": 0, "maximum": 0 } }, "fee": { "bignumber": { "minimum": 1 } }, "id": { "type": "string" }, "network": { "$ref": "networkByte" }, "nonce": { "bignumber": { "minimum": 0 } }, "secondSignature": { "type": "null" }, "senderPublicKey": { "type": "string" }, "signSignature": { "type": "string" }, "signature": { "type": "string" }, "version": { "enum": [1, 2] }, "signatures": { "items": { "type": "string" }, "maxItems": 16, "minItems": 1, "type": "array" }, "timestamp": { "type": "integer", "minimum": 0 }, "typeGroup": { "minimum": 0, "type": "integer" }, "asset": { "properties": { "signature": { "properties": { "publicKey": { "type": "string" } }, "required": ["publicKey"], "type": "object" } }, "required": ["signature"], "type": "object" }, "type": { "transactionType": 1 } }, "then": { "required": ["type", "senderPublicKey", "fee", "amount", "timestamp"] }, "type": "object", "required": ["asset"], "anyOf": [{ "required": ["id", "signature"] }, { "required": ["id", "signature", "signatures"] }, { "required": ["id", "signatures"] }] };
function validate35(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { /*# sourceURL="secondSignatureSigned" */ ; let vErrors = null; let errors = 0; const _errs1 = errors; let valid0 = false; const _errs2 = errors; if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.id === undefined) {
        const err0 = { instancePath, schemaPath: "#/anyOf/0/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property '" + "id" + "'", schema: schema51.anyOf[0].required, parentSchema: schema51.anyOf[0], data };
        if (vErrors === null) {
            vErrors = [err0];
        }
        else {
            vErrors.push(err0);
        }
        errors++;
    }
    if (data.signature === undefined) {
        const err1 = { instancePath, schemaPath: "#/anyOf/0/required", keyword: "required", params: { missingProperty: "signature" }, message: "must have required property '" + "signature" + "'", schema: schema51.anyOf[0].required, parentSchema: schema51.anyOf[0], data };
        if (vErrors === null) {
            vErrors = [err1];
        }
        else {
            vErrors.push(err1);
        }
        errors++;
    }
} var _valid0 = _errs2 === errors; valid0 = valid0 || _valid0; if (!valid0) {
    const _errs3 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.id === undefined) {
            const err2 = { instancePath, schemaPath: "#/anyOf/1/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property '" + "id" + "'", schema: schema51.anyOf[1].required, parentSchema: schema51.anyOf[1], data };
            if (vErrors === null) {
                vErrors = [err2];
            }
            else {
                vErrors.push(err2);
            }
            errors++;
        }
        if (data.signature === undefined) {
            const err3 = { instancePath, schemaPath: "#/anyOf/1/required", keyword: "required", params: { missingProperty: "signature" }, message: "must have required property '" + "signature" + "'", schema: schema51.anyOf[1].required, parentSchema: schema51.anyOf[1], data };
            if (vErrors === null) {
                vErrors = [err3];
            }
            else {
                vErrors.push(err3);
            }
            errors++;
        }
        if (data.signatures === undefined) {
            const err4 = { instancePath, schemaPath: "#/anyOf/1/required", keyword: "required", params: { missingProperty: "signatures" }, message: "must have required property '" + "signatures" + "'", schema: schema51.anyOf[1].required, parentSchema: schema51.anyOf[1], data };
            if (vErrors === null) {
                vErrors = [err4];
            }
            else {
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
                const err5 = { instancePath, schemaPath: "#/anyOf/2/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property '" + "id" + "'", schema: schema51.anyOf[2].required, parentSchema: schema51.anyOf[2], data };
                if (vErrors === null) {
                    vErrors = [err5];
                }
                else {
                    vErrors.push(err5);
                }
                errors++;
            }
            if (data.signatures === undefined) {
                const err6 = { instancePath, schemaPath: "#/anyOf/2/required", keyword: "required", params: { missingProperty: "signatures" }, message: "must have required property '" + "signatures" + "'", schema: schema51.anyOf[2].required, parentSchema: schema51.anyOf[2], data };
                if (vErrors === null) {
                    vErrors = [err6];
                }
                else {
                    vErrors.push(err6);
                }
                errors++;
            }
        }
        var _valid0 = _errs4 === errors;
        valid0 = valid0 || _valid0;
    }
} if (!valid0) {
    const err7 = { instancePath, schemaPath: "#/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf", schema: schema51.anyOf, parentSchema: schema51, data };
    if (vErrors === null) {
        vErrors = [err7];
    }
    else {
        vErrors.push(err7);
    }
    errors++;
}
else {
    errors = _errs1;
    if (vErrors !== null) {
        if (_errs1) {
            vErrors.length = _errs1;
        }
        else {
            vErrors = null;
        }
    }
} const _errs5 = errors; let valid1 = true; const _errs6 = errors; if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.version !== undefined) {
        let data0 = data.version;
        const _errs8 = errors;
        let valid3 = false;
        const _errs9 = errors;
        if (data0 !== null) {
            const err8 = {};
            if (vErrors === null) {
                vErrors = [err8];
            }
            else {
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
                }
                else {
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
            }
            else {
                vErrors.push(err10);
            }
            errors++;
        }
        else {
            errors = _errs8;
            if (vErrors !== null) {
                if (_errs8) {
                    vErrors.length = _errs8;
                }
                else {
                    vErrors = null;
                }
            }
        }
    }
} var _valid1 = _errs6 === errors; errors = _errs5; if (vErrors !== null) {
    if (_errs5) {
        vErrors.length = _errs5;
    }
    else {
        vErrors = null;
    }
} let ifClause0; if (_valid1) {
    const _errs12 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.type === undefined) {
            const err11 = { instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property '" + "type" + "'", schema: schema51.then.required, parentSchema: schema51.then, data };
            if (vErrors === null) {
                vErrors = [err11];
            }
            else {
                vErrors.push(err11);
            }
            errors++;
        }
        if (data.senderPublicKey === undefined) {
            const err12 = { instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "senderPublicKey" }, message: "must have required property '" + "senderPublicKey" + "'", schema: schema51.then.required, parentSchema: schema51.then, data };
            if (vErrors === null) {
                vErrors = [err12];
            }
            else {
                vErrors.push(err12);
            }
            errors++;
        }
        if (data.fee === undefined) {
            const err13 = { instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "fee" }, message: "must have required property '" + "fee" + "'", schema: schema51.then.required, parentSchema: schema51.then, data };
            if (vErrors === null) {
                vErrors = [err13];
            }
            else {
                vErrors.push(err13);
            }
            errors++;
        }
        if (data.amount === undefined) {
            const err14 = { instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "amount" }, message: "must have required property '" + "amount" + "'", schema: schema51.then.required, parentSchema: schema51.then, data };
            if (vErrors === null) {
                vErrors = [err14];
            }
            else {
                vErrors.push(err14);
            }
            errors++;
        }
        if (data.timestamp === undefined) {
            const err15 = { instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "timestamp" }, message: "must have required property '" + "timestamp" + "'", schema: schema51.then.required, parentSchema: schema51.then, data };
            if (vErrors === null) {
                vErrors = [err15];
            }
            else {
                vErrors.push(err15);
            }
            errors++;
        }
    }
    var _valid1 = _errs12 === errors;
    valid1 = _valid1;
    ifClause0 = "then";
}
else {
    const _errs13 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.type === undefined) {
            const err16 = { instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property '" + "type" + "'", schema: schema51.else.required, parentSchema: schema51.else, data };
            if (vErrors === null) {
                vErrors = [err16];
            }
            else {
                vErrors.push(err16);
            }
            errors++;
        }
        if (data.senderPublicKey === undefined) {
            const err17 = { instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "senderPublicKey" }, message: "must have required property '" + "senderPublicKey" + "'", schema: schema51.else.required, parentSchema: schema51.else, data };
            if (vErrors === null) {
                vErrors = [err17];
            }
            else {
                vErrors.push(err17);
            }
            errors++;
        }
        if (data.fee === undefined) {
            const err18 = { instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "fee" }, message: "must have required property '" + "fee" + "'", schema: schema51.else.required, parentSchema: schema51.else, data };
            if (vErrors === null) {
                vErrors = [err18];
            }
            else {
                vErrors.push(err18);
            }
            errors++;
        }
        if (data.amount === undefined) {
            const err19 = { instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "amount" }, message: "must have required property '" + "amount" + "'", schema: schema51.else.required, parentSchema: schema51.else, data };
            if (vErrors === null) {
                vErrors = [err19];
            }
            else {
                vErrors.push(err19);
            }
            errors++;
        }
        if (data.nonce === undefined) {
            const err20 = { instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "nonce" }, message: "must have required property '" + "nonce" + "'", schema: schema51.else.required, parentSchema: schema51.else, data };
            if (vErrors === null) {
                vErrors = [err20];
            }
            else {
                vErrors.push(err20);
            }
            errors++;
        }
    }
    var _valid1 = _errs13 === errors;
    valid1 = _valid1;
    ifClause0 = "else";
} if (!valid1) {
    const err21 = { instancePath, schemaPath: "#/if", keyword: "if", params: { failingKeyword: ifClause0 }, message: "must match \"" + ifClause0 + "\" schema", schema: schema51.if, parentSchema: schema51, data };
    if (vErrors === null) {
        vErrors = [err21];
    }
    else {
        vErrors.push(err21);
    }
    errors++;
} if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.asset === undefined) {
        const err22 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "asset" }, message: "must have required property '" + "asset" + "'", schema: schema51.required, parentSchema: schema51, data };
        if (vErrors === null) {
            vErrors = [err22];
        }
        else {
            vErrors.push(err22);
        }
        errors++;
    }
    if (data.id !== undefined) {
        let data3 = data.id;
        if (typeof data3 !== "string") {
            const err23 = { instancePath: instancePath + "/id", schemaPath: "#/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema51.properties.id.type, parentSchema: schema51.properties.id, data: data3 };
            if (vErrors === null) {
                vErrors = [err23];
            }
            else {
                vErrors.push(err23);
            }
            errors++;
        }
    }
    if (data.secondSignature !== undefined) {
        let data6 = data.secondSignature;
        if (data6 !== null) {
            const err24 = { instancePath: instancePath + "/secondSignature", schemaPath: "#/properties/secondSignature/type", keyword: "type", params: { type: "null" }, message: "must be null", schema: schema51.properties.secondSignature.type, parentSchema: schema51.properties.secondSignature, data: data6 };
            if (vErrors === null) {
                vErrors = [err24];
            }
            else {
                vErrors.push(err24);
            }
            errors++;
        }
    }
    if (data.senderPublicKey !== undefined) {
        let data7 = data.senderPublicKey;
        if (typeof data7 !== "string") {
            const err25 = { instancePath: instancePath + "/senderPublicKey", schemaPath: "#/properties/senderPublicKey/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema51.properties.senderPublicKey.type, parentSchema: schema51.properties.senderPublicKey, data: data7 };
            if (vErrors === null) {
                vErrors = [err25];
            }
            else {
                vErrors.push(err25);
            }
            errors++;
        }
    }
    if (data.signSignature !== undefined) {
        let data8 = data.signSignature;
        if (typeof data8 !== "string") {
            const err26 = { instancePath: instancePath + "/signSignature", schemaPath: "#/properties/signSignature/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema51.properties.signSignature.type, parentSchema: schema51.properties.signSignature, data: data8 };
            if (vErrors === null) {
                vErrors = [err26];
            }
            else {
                vErrors.push(err26);
            }
            errors++;
        }
    }
    if (data.signature !== undefined) {
        let data9 = data.signature;
        if (typeof data9 !== "string") {
            const err27 = { instancePath: instancePath + "/signature", schemaPath: "#/properties/signature/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema51.properties.signature.type, parentSchema: schema51.properties.signature, data: data9 };
            if (vErrors === null) {
                vErrors = [err27];
            }
            else {
                vErrors.push(err27);
            }
            errors++;
        }
    }
    if (data.version !== undefined) {
        let data10 = data.version;
        if (!((data10 === 1) || (data10 === 2))) {
            const err28 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/enum", keyword: "enum", params: { allowedValues: schema51.properties.version.enum }, message: "must be equal to one of the allowed values", schema: schema51.properties.version.enum, parentSchema: schema51.properties.version, data: data10 };
            if (vErrors === null) {
                vErrors = [err28];
            }
            else {
                vErrors.push(err28);
            }
            errors++;
        }
    }
    if (data.signatures !== undefined) {
        let data11 = data.signatures;
        if (Array.isArray(data11)) {
            if (data11.length > 16) {
                const err29 = { instancePath: instancePath + "/signatures", schemaPath: "#/properties/signatures/maxItems", keyword: "maxItems", params: { limit: 16 }, message: "must NOT have more than 16 items", schema: 16, parentSchema: schema51.properties.signatures, data: data11 };
                if (vErrors === null) {
                    vErrors = [err29];
                }
                else {
                    vErrors.push(err29);
                }
                errors++;
            }
            if (data11.length < 1) {
                const err30 = { instancePath: instancePath + "/signatures", schemaPath: "#/properties/signatures/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items", schema: 1, parentSchema: schema51.properties.signatures, data: data11 };
                if (vErrors === null) {
                    vErrors = [err30];
                }
                else {
                    vErrors.push(err30);
                }
                errors++;
            }
            const len0 = data11.length;
            for (let i0 = 0; i0 < len0; i0++) {
                let data12 = data11[i0];
                if (typeof data12 !== "string") {
                    const err31 = { instancePath: instancePath + "/signatures/" + i0, schemaPath: "#/properties/signatures/items/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema51.properties.signatures.items.type, parentSchema: schema51.properties.signatures.items, data: data12 };
                    if (vErrors === null) {
                        vErrors = [err31];
                    }
                    else {
                        vErrors.push(err31);
                    }
                    errors++;
                }
            }
        }
        else {
            const err32 = { instancePath: instancePath + "/signatures", schemaPath: "#/properties/signatures/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema51.properties.signatures.type, parentSchema: schema51.properties.signatures, data: data11 };
            if (vErrors === null) {
                vErrors = [err32];
            }
            else {
                vErrors.push(err32);
            }
            errors++;
        }
    }
    if (data.timestamp !== undefined) {
        let data13 = data.timestamp;
        if (!(((typeof data13 == "number") && (!(data13 % 1) && !isNaN(data13))) && (isFinite(data13)))) {
            const err33 = { instancePath: instancePath + "/timestamp", schemaPath: "#/properties/timestamp/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema51.properties.timestamp.type, parentSchema: schema51.properties.timestamp, data: data13 };
            if (vErrors === null) {
                vErrors = [err33];
            }
            else {
                vErrors.push(err33);
            }
            errors++;
        }
        if ((typeof data13 == "number") && (isFinite(data13))) {
            if (data13 < 0 || isNaN(data13)) {
                const err34 = { instancePath: instancePath + "/timestamp", schemaPath: "#/properties/timestamp/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0", schema: 0, parentSchema: schema51.properties.timestamp, data: data13 };
                if (vErrors === null) {
                    vErrors = [err34];
                }
                else {
                    vErrors.push(err34);
                }
                errors++;
            }
        }
    }
    if (data.typeGroup !== undefined) {
        let data14 = data.typeGroup;
        if (!(((typeof data14 == "number") && (!(data14 % 1) && !isNaN(data14))) && (isFinite(data14)))) {
            const err35 = { instancePath: instancePath + "/typeGroup", schemaPath: "#/properties/typeGroup/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema51.properties.typeGroup.type, parentSchema: schema51.properties.typeGroup, data: data14 };
            if (vErrors === null) {
                vErrors = [err35];
            }
            else {
                vErrors.push(err35);
            }
            errors++;
        }
        if ((typeof data14 == "number") && (isFinite(data14))) {
            if (data14 < 0 || isNaN(data14)) {
                const err36 = { instancePath: instancePath + "/typeGroup", schemaPath: "#/properties/typeGroup/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0", schema: 0, parentSchema: schema51.properties.typeGroup, data: data14 };
                if (vErrors === null) {
                    vErrors = [err36];
                }
                else {
                    vErrors.push(err36);
                }
                errors++;
            }
        }
    }
    if (data.asset !== undefined) {
        let data15 = data.asset;
        if (data15 && typeof data15 == "object" && !Array.isArray(data15)) {
            if (data15.signature === undefined) {
                const err37 = { instancePath: instancePath + "/asset", schemaPath: "#/properties/asset/required", keyword: "required", params: { missingProperty: "signature" }, message: "must have required property '" + "signature" + "'", schema: schema51.properties.asset.required, parentSchema: schema51.properties.asset, data: data15 };
                if (vErrors === null) {
                    vErrors = [err37];
                }
                else {
                    vErrors.push(err37);
                }
                errors++;
            }
            if (data15.signature !== undefined) {
                let data16 = data15.signature;
                if (data16 && typeof data16 == "object" && !Array.isArray(data16)) {
                    if (data16.publicKey === undefined) {
                        const err38 = { instancePath: instancePath + "/asset/signature", schemaPath: "#/properties/asset/properties/signature/required", keyword: "required", params: { missingProperty: "publicKey" }, message: "must have required property '" + "publicKey" + "'", schema: schema51.properties.asset.properties.signature.required, parentSchema: schema51.properties.asset.properties.signature, data: data16 };
                        if (vErrors === null) {
                            vErrors = [err38];
                        }
                        else {
                            vErrors.push(err38);
                        }
                        errors++;
                    }
                    if (data16.publicKey !== undefined) {
                        let data17 = data16.publicKey;
                        if (typeof data17 !== "string") {
                            const err39 = { instancePath: instancePath + "/asset/signature/publicKey", schemaPath: "#/properties/asset/properties/signature/properties/publicKey/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema51.properties.asset.properties.signature.properties.publicKey.type, parentSchema: schema51.properties.asset.properties.signature.properties.publicKey, data: data17 };
                            if (vErrors === null) {
                                vErrors = [err39];
                            }
                            else {
                                vErrors.push(err39);
                            }
                            errors++;
                        }
                    }
                }
                else {
                    const err40 = { instancePath: instancePath + "/asset/signature", schemaPath: "#/properties/asset/properties/signature/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema51.properties.asset.properties.signature.type, parentSchema: schema51.properties.asset.properties.signature, data: data16 };
                    if (vErrors === null) {
                        vErrors = [err40];
                    }
                    else {
                        vErrors.push(err40);
                    }
                    errors++;
                }
            }
        }
        else {
            const err41 = { instancePath: instancePath + "/asset", schemaPath: "#/properties/asset/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema51.properties.asset.type, parentSchema: schema51.properties.asset, data: data15 };
            if (vErrors === null) {
                vErrors = [err41];
            }
            else {
                vErrors.push(err41);
            }
            errors++;
        }
    }
}
else {
    const err42 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema51.type, parentSchema: schema51, data };
    if (vErrors === null) {
        vErrors = [err42];
    }
    else {
        vErrors.push(err42);
    }
    errors++;
} validate35.errors = vErrors; return errors === 0; }
export { validate32 as networkByte };
export { validate33 as secondSignature };
export { validate34 as secondSignatureStrict };
export { validate35 as secondSignatureSigned };
//# sourceMappingURL=module.js.map