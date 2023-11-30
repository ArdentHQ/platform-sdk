/**
 * IMPORTANT: This file is generated using "pnpm build:validators" CLI command and any manual changes should be avoided, they will be overriden when generating standalone validators.
 *
 * For any changes in schemas or custom validators, see the referenced schemas in packages/ark/cli/compile-validators.ts and adjust them accordingly.
 * After schema update, run "pnpm build:validators" to gererate new standalone validator code.
 *
 * Custom validation functions are defined in /packages/ark/source/crypto/validation/index.ts
 *
 */
import ucs2length from "ajv/dist/runtime/ucs2length.js";
import transform from "ajv-keywords/dist/definitions/transform.js";
import { fullFormats } from "ajv-formats/dist/formats.js";
"use strict";
var schema46 = { "$id": "hex", "type": "string", "pattern": "^[0123456789A-Fa-f]+$" };
var pattern0 = new RegExp("^[0123456789A-Fa-f]+$", "u");
function validate32(data, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.instancePath, instancePath = _c === void 0 ? "" : _c, parentData = _b.parentData, parentDataProperty = _b.parentDataProperty, _d = _b.rootData, rootData = _d === void 0 ? data : _d;
    ;
    var vErrors = null;
    var errors = 0;
    if (typeof data === "string") {
        if (!pattern0.test(data)) {
            var err0 = { instancePath: instancePath, schemaPath: "#/pattern", keyword: "pattern", params: { pattern: "^[0123456789A-Fa-f]+$" }, message: "must match pattern \"" + "^[0123456789A-Fa-f]+$" + "\"", schema: "^[0123456789A-Fa-f]+$", parentSchema: schema46, data: data };
            if (vErrors === null) {
                vErrors = [err0];
            }
            else {
                vErrors.push(err0);
            }
            errors++;
        }
    }
    else {
        var err1 = { instancePath: instancePath, schemaPath: "#/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema46.type, parentSchema: schema46, data: data };
        if (vErrors === null) {
            vErrors = [err1];
        }
        else {
            vErrors.push(err1);
        }
        errors++;
    }
    validate32.errors = vErrors;
    return errors === 0;
}
var schema47 = { "$id": "base58", "type": "string", "pattern": "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$" };
var pattern1 = new RegExp("^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$", "u");
function validate33(data, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.instancePath, instancePath = _c === void 0 ? "" : _c, parentData = _b.parentData, parentDataProperty = _b.parentDataProperty, _d = _b.rootData, rootData = _d === void 0 ? data : _d;
    ;
    var vErrors = null;
    var errors = 0;
    if (typeof data === "string") {
        if (!pattern1.test(data)) {
            var err0 = { instancePath: instancePath, schemaPath: "#/pattern", keyword: "pattern", params: { pattern: "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$" }, message: "must match pattern \"" + "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$" + "\"", schema: "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$", parentSchema: schema47, data: data };
            if (vErrors === null) {
                vErrors = [err0];
            }
            else {
                vErrors.push(err0);
            }
            errors++;
        }
    }
    else {
        var err1 = { instancePath: instancePath, schemaPath: "#/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema47.type, parentSchema: schema47, data: data };
        if (vErrors === null) {
            vErrors = [err1];
        }
        else {
            vErrors.push(err1);
        }
        errors++;
    }
    validate33.errors = vErrors;
    return errors === 0;
}
var schema48 = { "$id": "alphanumeric", "type": "string", "pattern": "^[a-zA-Z0-9]+$" };
var pattern2 = new RegExp("^[a-zA-Z0-9]+$", "u");
function validate34(data, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.instancePath, instancePath = _c === void 0 ? "" : _c, parentData = _b.parentData, parentDataProperty = _b.parentDataProperty, _d = _b.rootData, rootData = _d === void 0 ? data : _d;
    ;
    var vErrors = null;
    var errors = 0;
    if (typeof data === "string") {
        if (!pattern2.test(data)) {
            var err0 = { instancePath: instancePath, schemaPath: "#/pattern", keyword: "pattern", params: { pattern: "^[a-zA-Z0-9]+$" }, message: "must match pattern \"" + "^[a-zA-Z0-9]+$" + "\"", schema: "^[a-zA-Z0-9]+$", parentSchema: schema48, data: data };
            if (vErrors === null) {
                vErrors = [err0];
            }
            else {
                vErrors.push(err0);
            }
            errors++;
        }
    }
    else {
        var err1 = { instancePath: instancePath, schemaPath: "#/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema48.type, parentSchema: schema48, data: data };
        if (vErrors === null) {
            vErrors = [err1];
        }
        else {
            vErrors.push(err1);
        }
        errors++;
    }
    validate34.errors = vErrors;
    return errors === 0;
}
var schema49 = { "$id": "transactionId", "type": "string", "allOf": [{ "minLength": 64, "maxLength": 64 }, { "$ref": "hex" }] };
var func2 = ucs2length.default;
function validate35(data, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.instancePath, instancePath = _c === void 0 ? "" : _c, parentData = _b.parentData, parentDataProperty = _b.parentDataProperty, _d = _b.rootData, rootData = _d === void 0 ? data : _d;
    ;
    var vErrors = null;
    var errors = 0;
    if (typeof data !== "string") {
        var err0 = { instancePath: instancePath, schemaPath: "#/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema49.type, parentSchema: schema49, data: data };
        if (vErrors === null) {
            vErrors = [err0];
        }
        else {
            vErrors.push(err0);
        }
        errors++;
    }
    if (typeof data === "string") {
        if (func2(data) > 64) {
            var err1 = { instancePath: instancePath, schemaPath: "#/allOf/0/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters", schema: 64, parentSchema: schema49.allOf[0], data: data };
            if (vErrors === null) {
                vErrors = [err1];
            }
            else {
                vErrors.push(err1);
            }
            errors++;
        }
        if (func2(data) < 64) {
            var err2 = { instancePath: instancePath, schemaPath: "#/allOf/0/minLength", keyword: "minLength", params: { limit: 64 }, message: "must NOT have fewer than 64 characters", schema: 64, parentSchema: schema49.allOf[0], data: data };
            if (vErrors === null) {
                vErrors = [err2];
            }
            else {
                vErrors.push(err2);
            }
            errors++;
        }
    }
    if (typeof data === "string") {
        if (!pattern0.test(data)) {
            var err3 = { instancePath: instancePath, schemaPath: "hex/pattern", keyword: "pattern", params: { pattern: "^[0123456789A-Fa-f]+$" }, message: "must match pattern \"" + "^[0123456789A-Fa-f]+$" + "\"", schema: "^[0123456789A-Fa-f]+$", parentSchema: schema46, data: data };
            if (vErrors === null) {
                vErrors = [err3];
            }
            else {
                vErrors.push(err3);
            }
            errors++;
        }
    }
    else {
        var err4 = { instancePath: instancePath, schemaPath: "hex/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema46.type, parentSchema: schema46, data: data };
        if (vErrors === null) {
            vErrors = [err4];
        }
        else {
            vErrors.push(err4);
        }
        errors++;
    }
    validate35.errors = vErrors;
    return errors === 0;
}
var schema51 = { "$id": "networkByte", "network": true };
function validate36(data, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.instancePath, instancePath = _c === void 0 ? "" : _c, parentData = _b.parentData, parentDataProperty = _b.parentDataProperty, _d = _b.rootData, rootData = _d === void 0 ? data : _d;
    ;
    var vErrors = null;
    var errors = 0;
    validate36.errors = vErrors;
    return errors === 0;
}
var schema52 = { "$id": "address", "type": "string", "allOf": [{ "minLength": 34, "maxLength": 34 }, { "$ref": "base58" }] };
function validate37(data, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.instancePath, instancePath = _c === void 0 ? "" : _c, parentData = _b.parentData, parentDataProperty = _b.parentDataProperty, _d = _b.rootData, rootData = _d === void 0 ? data : _d;
    ;
    var vErrors = null;
    var errors = 0;
    if (typeof data !== "string") {
        var err0 = { instancePath: instancePath, schemaPath: "#/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema52.type, parentSchema: schema52, data: data };
        if (vErrors === null) {
            vErrors = [err0];
        }
        else {
            vErrors.push(err0);
        }
        errors++;
    }
    if (typeof data === "string") {
        if (func2(data) > 34) {
            var err1 = { instancePath: instancePath, schemaPath: "#/allOf/0/maxLength", keyword: "maxLength", params: { limit: 34 }, message: "must NOT have more than 34 characters", schema: 34, parentSchema: schema52.allOf[0], data: data };
            if (vErrors === null) {
                vErrors = [err1];
            }
            else {
                vErrors.push(err1);
            }
            errors++;
        }
        if (func2(data) < 34) {
            var err2 = { instancePath: instancePath, schemaPath: "#/allOf/0/minLength", keyword: "minLength", params: { limit: 34 }, message: "must NOT have fewer than 34 characters", schema: 34, parentSchema: schema52.allOf[0], data: data };
            if (vErrors === null) {
                vErrors = [err2];
            }
            else {
                vErrors.push(err2);
            }
            errors++;
        }
    }
    if (typeof data === "string") {
        if (!pattern1.test(data)) {
            var err3 = { instancePath: instancePath, schemaPath: "base58/pattern", keyword: "pattern", params: { pattern: "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$" }, message: "must match pattern \"" + "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$" + "\"", schema: "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$", parentSchema: schema47, data: data };
            if (vErrors === null) {
                vErrors = [err3];
            }
            else {
                vErrors.push(err3);
            }
            errors++;
        }
    }
    else {
        var err4 = { instancePath: instancePath, schemaPath: "base58/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema47.type, parentSchema: schema47, data: data };
        if (vErrors === null) {
            vErrors = [err4];
        }
        else {
            vErrors.push(err4);
        }
        errors++;
    }
    validate37.errors = vErrors;
    return errors === 0;
}
var schema54 = { "$id": "publicKey", "type": "string", "allOf": [{ "minLength": 66, "maxLength": 66 }, { "$ref": "hex" }, { "transform": ["toLowerCase"] }] };
var func8 = transform.transform.toLowerCase;
function validate38(data, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.instancePath, instancePath = _c === void 0 ? "" : _c, parentData = _b.parentData, parentDataProperty = _b.parentDataProperty, _d = _b.rootData, rootData = _d === void 0 ? data : _d;
    ;
    var vErrors = null;
    var errors = 0;
    if (typeof data !== "string") {
        var err0 = { instancePath: instancePath, schemaPath: "#/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema54.type, parentSchema: schema54, data: data };
        if (vErrors === null) {
            vErrors = [err0];
        }
        else {
            vErrors.push(err0);
        }
        errors++;
    }
    if (typeof data === "string") {
        if (func2(data) > 66) {
            var err1 = { instancePath: instancePath, schemaPath: "#/allOf/0/maxLength", keyword: "maxLength", params: { limit: 66 }, message: "must NOT have more than 66 characters", schema: 66, parentSchema: schema54.allOf[0], data: data };
            if (vErrors === null) {
                vErrors = [err1];
            }
            else {
                vErrors.push(err1);
            }
            errors++;
        }
        if (func2(data) < 66) {
            var err2 = { instancePath: instancePath, schemaPath: "#/allOf/0/minLength", keyword: "minLength", params: { limit: 66 }, message: "must NOT have fewer than 66 characters", schema: 66, parentSchema: schema54.allOf[0], data: data };
            if (vErrors === null) {
                vErrors = [err2];
            }
            else {
                vErrors.push(err2);
            }
            errors++;
        }
    }
    if (typeof data === "string") {
        if (!pattern0.test(data)) {
            var err3 = { instancePath: instancePath, schemaPath: "hex/pattern", keyword: "pattern", params: { pattern: "^[0123456789A-Fa-f]+$" }, message: "must match pattern \"" + "^[0123456789A-Fa-f]+$" + "\"", schema: "^[0123456789A-Fa-f]+$", parentSchema: schema46, data: data };
            if (vErrors === null) {
                vErrors = [err3];
            }
            else {
                vErrors.push(err3);
            }
            errors++;
        }
    }
    else {
        var err4 = { instancePath: instancePath, schemaPath: "hex/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema46.type, parentSchema: schema46, data: data };
        if (vErrors === null) {
            vErrors = [err4];
        }
        else {
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
var schema56 = { "$id": "walletVote", "allOf": [{ "type": "string", "pattern": "^[+|-][a-zA-Z0-9]{66}$" }, { "transform": ["toLowerCase"] }] };
var pattern6 = new RegExp("^[+|-][a-zA-Z0-9]{66}$", "u");
function validate39(data, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.instancePath, instancePath = _c === void 0 ? "" : _c, parentData = _b.parentData, parentDataProperty = _b.parentDataProperty, _d = _b.rootData, rootData = _d === void 0 ? data : _d;
    ;
    var vErrors = null;
    var errors = 0;
    if (typeof data === "string") {
        if (!pattern6.test(data)) {
            var err0 = { instancePath: instancePath, schemaPath: "#/allOf/0/pattern", keyword: "pattern", params: { pattern: "^[+|-][a-zA-Z0-9]{66}$" }, message: "must match pattern \"" + "^[+|-][a-zA-Z0-9]{66}$" + "\"", schema: "^[+|-][a-zA-Z0-9]{66}$", parentSchema: schema56.allOf[0], data: data };
            if (vErrors === null) {
                vErrors = [err0];
            }
            else {
                vErrors.push(err0);
            }
            errors++;
        }
    }
    else {
        var err1 = { instancePath: instancePath, schemaPath: "#/allOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema56.allOf[0].type, parentSchema: schema56.allOf[0], data: data };
        if (vErrors === null) {
            vErrors = [err1];
        }
        else {
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
var schema57 = { "$id": "delegateUsername", "type": "string", "allOf": [{ "type": "string", "pattern": "^[a-z0-9!@$&_.]+$" }, { "minLength": 1, "maxLength": 20 }, { "transform": ["toLowerCase"] }] };
var pattern7 = new RegExp("^[a-z0-9!@$&_.]+$", "u");
function validate40(data, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.instancePath, instancePath = _c === void 0 ? "" : _c, parentData = _b.parentData, parentDataProperty = _b.parentDataProperty, _d = _b.rootData, rootData = _d === void 0 ? data : _d;
    ;
    var vErrors = null;
    var errors = 0;
    if (typeof data !== "string") {
        var err0 = { instancePath: instancePath, schemaPath: "#/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema57.type, parentSchema: schema57, data: data };
        if (vErrors === null) {
            vErrors = [err0];
        }
        else {
            vErrors.push(err0);
        }
        errors++;
    }
    if (typeof data === "string") {
        if (!pattern7.test(data)) {
            var err1 = { instancePath: instancePath, schemaPath: "#/allOf/0/pattern", keyword: "pattern", params: { pattern: "^[a-z0-9!@$&_.]+$" }, message: "must match pattern \"" + "^[a-z0-9!@$&_.]+$" + "\"", schema: "^[a-z0-9!@$&_.]+$", parentSchema: schema57.allOf[0], data: data };
            if (vErrors === null) {
                vErrors = [err1];
            }
            else {
                vErrors.push(err1);
            }
            errors++;
        }
    }
    else {
        var err2 = { instancePath: instancePath, schemaPath: "#/allOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema57.allOf[0].type, parentSchema: schema57.allOf[0], data: data };
        if (vErrors === null) {
            vErrors = [err2];
        }
        else {
            vErrors.push(err2);
        }
        errors++;
    }
    if (typeof data === "string") {
        if (func2(data) > 20) {
            var err3 = { instancePath: instancePath, schemaPath: "#/allOf/1/maxLength", keyword: "maxLength", params: { limit: 20 }, message: "must NOT have more than 20 characters", schema: 20, parentSchema: schema57.allOf[1], data: data };
            if (vErrors === null) {
                vErrors = [err3];
            }
            else {
                vErrors.push(err3);
            }
            errors++;
        }
        if (func2(data) < 1) {
            var err4 = { instancePath: instancePath, schemaPath: "#/allOf/1/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters", schema: 1, parentSchema: schema57.allOf[1], data: data };
            if (vErrors === null) {
                vErrors = [err4];
            }
            else {
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
var schema58 = { "$id": "genericName", "type": "string", "allOf": [{ "type": "string", "pattern": "^[a-zA-Z0-9]+(( - |[ ._-])[a-zA-Z0-9]+)*[.]?$" }, { "minLength": 1, "maxLength": 40 }] };
var pattern8 = new RegExp("^[a-zA-Z0-9]+(( - |[ ._-])[a-zA-Z0-9]+)*[.]?$", "u");
function validate41(data, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.instancePath, instancePath = _c === void 0 ? "" : _c, parentData = _b.parentData, parentDataProperty = _b.parentDataProperty, _d = _b.rootData, rootData = _d === void 0 ? data : _d;
    ;
    var vErrors = null;
    var errors = 0;
    if (typeof data !== "string") {
        var err0 = { instancePath: instancePath, schemaPath: "#/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema58.type, parentSchema: schema58, data: data };
        if (vErrors === null) {
            vErrors = [err0];
        }
        else {
            vErrors.push(err0);
        }
        errors++;
    }
    if (typeof data === "string") {
        if (!pattern8.test(data)) {
            var err1 = { instancePath: instancePath, schemaPath: "#/allOf/0/pattern", keyword: "pattern", params: { pattern: "^[a-zA-Z0-9]+(( - |[ ._-])[a-zA-Z0-9]+)*[.]?$" }, message: "must match pattern \"" + "^[a-zA-Z0-9]+(( - |[ ._-])[a-zA-Z0-9]+)*[.]?$" + "\"", schema: "^[a-zA-Z0-9]+(( - |[ ._-])[a-zA-Z0-9]+)*[.]?$", parentSchema: schema58.allOf[0], data: data };
            if (vErrors === null) {
                vErrors = [err1];
            }
            else {
                vErrors.push(err1);
            }
            errors++;
        }
    }
    else {
        var err2 = { instancePath: instancePath, schemaPath: "#/allOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema58.allOf[0].type, parentSchema: schema58.allOf[0], data: data };
        if (vErrors === null) {
            vErrors = [err2];
        }
        else {
            vErrors.push(err2);
        }
        errors++;
    }
    if (typeof data === "string") {
        if (func2(data) > 40) {
            var err3 = { instancePath: instancePath, schemaPath: "#/allOf/1/maxLength", keyword: "maxLength", params: { limit: 40 }, message: "must NOT have more than 40 characters", schema: 40, parentSchema: schema58.allOf[1], data: data };
            if (vErrors === null) {
                vErrors = [err3];
            }
            else {
                vErrors.push(err3);
            }
            errors++;
        }
        if (func2(data) < 1) {
            var err4 = { instancePath: instancePath, schemaPath: "#/allOf/1/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters", schema: 1, parentSchema: schema58.allOf[1], data: data };
            if (vErrors === null) {
                vErrors = [err4];
            }
            else {
                vErrors.push(err4);
            }
            errors++;
        }
    }
    validate41.errors = vErrors;
    return errors === 0;
}
var schema59 = { "$id": "uri", "type": "string", "allOf": [{ "format": "uri" }, { "minLength": 4, "maxLength": 80 }] };
var formats0 = { fullFormats: fullFormats }.fullFormats.uri;
function validate42(data, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.instancePath, instancePath = _c === void 0 ? "" : _c, parentData = _b.parentData, parentDataProperty = _b.parentDataProperty, _d = _b.rootData, rootData = _d === void 0 ? data : _d;
    ;
    var vErrors = null;
    var errors = 0;
    if (typeof data !== "string") {
        var err0 = { instancePath: instancePath, schemaPath: "#/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema59.type, parentSchema: schema59, data: data };
        if (vErrors === null) {
            vErrors = [err0];
        }
        else {
            vErrors.push(err0);
        }
        errors++;
    }
    if (typeof data === "string") {
        if (!(formats0(data))) {
            var err1 = { instancePath: instancePath, schemaPath: "#/allOf/0/format", keyword: "format", params: { format: "uri" }, message: "must match format \"" + "uri" + "\"", schema: "uri", parentSchema: schema59.allOf[0], data: data };
            if (vErrors === null) {
                vErrors = [err1];
            }
            else {
                vErrors.push(err1);
            }
            errors++;
        }
    }
    if (typeof data === "string") {
        if (func2(data) > 80) {
            var err2 = { instancePath: instancePath, schemaPath: "#/allOf/1/maxLength", keyword: "maxLength", params: { limit: 80 }, message: "must NOT have more than 80 characters", schema: 80, parentSchema: schema59.allOf[1], data: data };
            if (vErrors === null) {
                vErrors = [err2];
            }
            else {
                vErrors.push(err2);
            }
            errors++;
        }
        if (func2(data) < 4) {
            var err3 = { instancePath: instancePath, schemaPath: "#/allOf/1/minLength", keyword: "minLength", params: { limit: 4 }, message: "must NOT have fewer than 4 characters", schema: 4, parentSchema: schema59.allOf[1], data: data };
            if (vErrors === null) {
                vErrors = [err3];
            }
            else {
                vErrors.push(err3);
            }
            errors++;
        }
    }
    validate42.errors = vErrors;
    return errors === 0;
}
var schema60 = { "$id": "multiSignatureLegacy", "else": { "required": ["type", "senderPublicKey", "fee", "amount", "nonce"] }, "if": { "properties": { "version": { "anyOf": [{ "type": "null" }, { "const": 1 }] } } }, "properties": { "amount": { "bignumber": { "minimum": 0, "maximum": 0 } }, "fee": { "bignumber": { "minimum": 1 } }, "id": { "anyOf": [{ "$ref": "transactionId" }, { "type": "null" }] }, "network": { "$ref": "networkByte" }, "nonce": { "bignumber": { "minimum": 0 } }, "secondSignature": { "$ref": "alphanumeric" }, "senderPublicKey": { "$ref": "publicKey" }, "signSignature": { "$ref": "alphanumeric" }, "signature": { "$ref": "alphanumeric" }, "version": { "enum": [1, 2], "anyOf": [{ "type": "null" }, { "const": 1 }] }, "timestamp": { "type": "integer", "minimum": 0 }, "typeGroup": { "minimum": 0, "type": "integer" }, "asset": { "properties": { "multiSignatureLegacy": { "properties": { "lifetime": { "minimum": 1, "type": "integer", "maximum": 72 }, "keysgroup": { "minItems": 1, "type": "array", "maxItems": 16, "items": { "allOf": [{ "minimum": 67, "type": "string", "maximum": 67, "transform": ["toLowerCase"] }] } }, "min": { "type": "integer", "minimum": 1, "maximum": { "$data": "1/keysgroup/length" } } }, "required": ["keysgroup", "min", "lifetime"], "type": "object" } }, "required": ["multiSignatureLegacy"], "type": "object" }, "signatures": { "items": { "$ref": "alphanumeric" }, "maxItems": 1, "minItems": 1, "type": "array" }, "type": { "transactionType": 4 } }, "then": { "required": ["type", "senderPublicKey", "fee", "amount", "timestamp"] }, "type": "object", "required": ["asset"] };
function validate43(data, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.instancePath, instancePath = _c === void 0 ? "" : _c, parentData = _b.parentData, parentDataProperty = _b.parentDataProperty, _d = _b.rootData, rootData = _d === void 0 ? data : _d;
    ;
    var vErrors = null;
    var errors = 0;
    var _errs1 = errors;
    var valid0 = true;
    var _errs2 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.version !== undefined) {
            var data0 = data.version;
            var _errs4 = errors;
            var valid2 = false;
            var _errs5 = errors;
            if (data0 !== null) {
                var err0 = {};
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
                var _errs7 = errors;
                if (1 !== data0) {
                    var err1 = {};
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
                var err2 = {};
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
    }
    var _valid0 = _errs2 === errors;
    errors = _errs1;
    if (vErrors !== null) {
        if (_errs1) {
            vErrors.length = _errs1;
        }
        else {
            vErrors = null;
        }
    }
    var ifClause0;
    if (_valid0) {
        var _errs8 = errors;
        if (data && typeof data == "object" && !Array.isArray(data)) {
            if (data.type === undefined) {
                var err3 = { instancePath: instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property '" + "type" + "'", schema: schema60.then.required, parentSchema: schema60.then, data: data };
                if (vErrors === null) {
                    vErrors = [err3];
                }
                else {
                    vErrors.push(err3);
                }
                errors++;
            }
            if (data.senderPublicKey === undefined) {
                var err4 = { instancePath: instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "senderPublicKey" }, message: "must have required property '" + "senderPublicKey" + "'", schema: schema60.then.required, parentSchema: schema60.then, data: data };
                if (vErrors === null) {
                    vErrors = [err4];
                }
                else {
                    vErrors.push(err4);
                }
                errors++;
            }
            if (data.fee === undefined) {
                var err5 = { instancePath: instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "fee" }, message: "must have required property '" + "fee" + "'", schema: schema60.then.required, parentSchema: schema60.then, data: data };
                if (vErrors === null) {
                    vErrors = [err5];
                }
                else {
                    vErrors.push(err5);
                }
                errors++;
            }
            if (data.amount === undefined) {
                var err6 = { instancePath: instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "amount" }, message: "must have required property '" + "amount" + "'", schema: schema60.then.required, parentSchema: schema60.then, data: data };
                if (vErrors === null) {
                    vErrors = [err6];
                }
                else {
                    vErrors.push(err6);
                }
                errors++;
            }
            if (data.timestamp === undefined) {
                var err7 = { instancePath: instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "timestamp" }, message: "must have required property '" + "timestamp" + "'", schema: schema60.then.required, parentSchema: schema60.then, data: data };
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
        var _errs9 = errors;
        if (data && typeof data == "object" && !Array.isArray(data)) {
            if (data.type === undefined) {
                var err8 = { instancePath: instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property '" + "type" + "'", schema: schema60.else.required, parentSchema: schema60.else, data: data };
                if (vErrors === null) {
                    vErrors = [err8];
                }
                else {
                    vErrors.push(err8);
                }
                errors++;
            }
            if (data.senderPublicKey === undefined) {
                var err9 = { instancePath: instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "senderPublicKey" }, message: "must have required property '" + "senderPublicKey" + "'", schema: schema60.else.required, parentSchema: schema60.else, data: data };
                if (vErrors === null) {
                    vErrors = [err9];
                }
                else {
                    vErrors.push(err9);
                }
                errors++;
            }
            if (data.fee === undefined) {
                var err10 = { instancePath: instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "fee" }, message: "must have required property '" + "fee" + "'", schema: schema60.else.required, parentSchema: schema60.else, data: data };
                if (vErrors === null) {
                    vErrors = [err10];
                }
                else {
                    vErrors.push(err10);
                }
                errors++;
            }
            if (data.amount === undefined) {
                var err11 = { instancePath: instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "amount" }, message: "must have required property '" + "amount" + "'", schema: schema60.else.required, parentSchema: schema60.else, data: data };
                if (vErrors === null) {
                    vErrors = [err11];
                }
                else {
                    vErrors.push(err11);
                }
                errors++;
            }
            if (data.nonce === undefined) {
                var err12 = { instancePath: instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "nonce" }, message: "must have required property '" + "nonce" + "'", schema: schema60.else.required, parentSchema: schema60.else, data: data };
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
    }
    if (!valid0) {
        var err13 = { instancePath: instancePath, schemaPath: "#/if", keyword: "if", params: { failingKeyword: ifClause0 }, message: "must match \"" + ifClause0 + "\" schema", schema: schema60.if, parentSchema: schema60, data: data };
        if (vErrors === null) {
            vErrors = [err13];
        }
        else {
            vErrors.push(err13);
        }
        errors++;
    }
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.asset === undefined) {
            var err14 = { instancePath: instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "asset" }, message: "must have required property '" + "asset" + "'", schema: schema60.required, parentSchema: schema60, data: data };
            if (vErrors === null) {
                vErrors = [err14];
            }
            else {
                vErrors.push(err14);
            }
            errors++;
        }
        if (data.id !== undefined) {
            var data3 = data.id;
            var _errs13 = errors;
            var valid4 = false;
            var _errs14 = errors;
            if (!(validate35(data3, { instancePath: instancePath + "/id", parentData: data, parentDataProperty: "id", rootData: rootData }))) {
                vErrors = vErrors === null ? validate35.errors : vErrors.concat(validate35.errors);
                errors = vErrors.length;
            }
            var _valid2 = _errs14 === errors;
            valid4 = valid4 || _valid2;
            if (!valid4) {
                var _errs15 = errors;
                if (data3 !== null) {
                    var err15 = { instancePath: instancePath + "/id", schemaPath: "#/properties/id/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null", schema: schema60.properties.id.anyOf[1].type, parentSchema: schema60.properties.id.anyOf[1], data: data3 };
                    if (vErrors === null) {
                        vErrors = [err15];
                    }
                    else {
                        vErrors.push(err15);
                    }
                    errors++;
                }
                var _valid2 = _errs15 === errors;
                valid4 = valid4 || _valid2;
            }
            if (!valid4) {
                var err16 = { instancePath: instancePath + "/id", schemaPath: "#/properties/id/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf", schema: schema60.properties.id.anyOf, parentSchema: schema60.properties.id, data: data3 };
                if (vErrors === null) {
                    vErrors = [err16];
                }
                else {
                    vErrors.push(err16);
                }
                errors++;
            }
            else {
                errors = _errs13;
                if (vErrors !== null) {
                    if (_errs13) {
                        vErrors.length = _errs13;
                    }
                    else {
                        vErrors = null;
                    }
                }
            }
        }
        if (data.secondSignature !== undefined) {
            var data6 = data.secondSignature;
            if (typeof data6 === "string") {
                if (!pattern2.test(data6)) {
                    var err17 = { instancePath: instancePath + "/secondSignature", schemaPath: "alphanumeric/pattern", keyword: "pattern", params: { pattern: "^[a-zA-Z0-9]+$" }, message: "must match pattern \"" + "^[a-zA-Z0-9]+$" + "\"", schema: "^[a-zA-Z0-9]+$", parentSchema: schema48, data: data6 };
                    if (vErrors === null) {
                        vErrors = [err17];
                    }
                    else {
                        vErrors.push(err17);
                    }
                    errors++;
                }
            }
            else {
                var err18 = { instancePath: instancePath + "/secondSignature", schemaPath: "alphanumeric/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema48.type, parentSchema: schema48, data: data6 };
                if (vErrors === null) {
                    vErrors = [err18];
                }
                else {
                    vErrors.push(err18);
                }
                errors++;
            }
        }
        if (data.senderPublicKey !== undefined) {
            if (!(validate38(data.senderPublicKey, { instancePath: instancePath + "/senderPublicKey", parentData: data, parentDataProperty: "senderPublicKey", rootData: rootData }))) {
                vErrors = vErrors === null ? validate38.errors : vErrors.concat(validate38.errors);
                errors = vErrors.length;
            }
        }
        if (data.signSignature !== undefined) {
            var data8 = data.signSignature;
            if (typeof data8 === "string") {
                if (!pattern2.test(data8)) {
                    var err19 = { instancePath: instancePath + "/signSignature", schemaPath: "alphanumeric/pattern", keyword: "pattern", params: { pattern: "^[a-zA-Z0-9]+$" }, message: "must match pattern \"" + "^[a-zA-Z0-9]+$" + "\"", schema: "^[a-zA-Z0-9]+$", parentSchema: schema48, data: data8 };
                    if (vErrors === null) {
                        vErrors = [err19];
                    }
                    else {
                        vErrors.push(err19);
                    }
                    errors++;
                }
            }
            else {
                var err20 = { instancePath: instancePath + "/signSignature", schemaPath: "alphanumeric/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema48.type, parentSchema: schema48, data: data8 };
                if (vErrors === null) {
                    vErrors = [err20];
                }
                else {
                    vErrors.push(err20);
                }
                errors++;
            }
        }
        if (data.signature !== undefined) {
            var data9 = data.signature;
            if (typeof data9 === "string") {
                if (!pattern2.test(data9)) {
                    var err21 = { instancePath: instancePath + "/signature", schemaPath: "alphanumeric/pattern", keyword: "pattern", params: { pattern: "^[a-zA-Z0-9]+$" }, message: "must match pattern \"" + "^[a-zA-Z0-9]+$" + "\"", schema: "^[a-zA-Z0-9]+$", parentSchema: schema48, data: data9 };
                    if (vErrors === null) {
                        vErrors = [err21];
                    }
                    else {
                        vErrors.push(err21);
                    }
                    errors++;
                }
            }
            else {
                var err22 = { instancePath: instancePath + "/signature", schemaPath: "alphanumeric/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema48.type, parentSchema: schema48, data: data9 };
                if (vErrors === null) {
                    vErrors = [err22];
                }
                else {
                    vErrors.push(err22);
                }
                errors++;
            }
        }
        if (data.version !== undefined) {
            var data10 = data.version;
            if (!((data10 === 1) || (data10 === 2))) {
                var err23 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/enum", keyword: "enum", params: { allowedValues: schema60.properties.version.enum }, message: "must be equal to one of the allowed values", schema: schema60.properties.version.enum, parentSchema: schema60.properties.version, data: data10 };
                if (vErrors === null) {
                    vErrors = [err23];
                }
                else {
                    vErrors.push(err23);
                }
                errors++;
            }
            var _errs31 = errors;
            var valid9 = false;
            var _errs32 = errors;
            if (data10 !== null) {
                var err24 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/anyOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null", schema: schema60.properties.version.anyOf[0].type, parentSchema: schema60.properties.version.anyOf[0], data: data10 };
                if (vErrors === null) {
                    vErrors = [err24];
                }
                else {
                    vErrors.push(err24);
                }
                errors++;
            }
            var _valid3 = _errs32 === errors;
            valid9 = valid9 || _valid3;
            if (!valid9) {
                var _errs34 = errors;
                if (1 !== data10) {
                    var err25 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/anyOf/1/const", keyword: "const", params: { allowedValue: 1 }, message: "must be equal to constant", schema: 1, parentSchema: schema60.properties.version.anyOf[1], data: data10 };
                    if (vErrors === null) {
                        vErrors = [err25];
                    }
                    else {
                        vErrors.push(err25);
                    }
                    errors++;
                }
                var _valid3 = _errs34 === errors;
                valid9 = valid9 || _valid3;
            }
            if (!valid9) {
                var err26 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf", schema: schema60.properties.version.anyOf, parentSchema: schema60.properties.version, data: data10 };
                if (vErrors === null) {
                    vErrors = [err26];
                }
                else {
                    vErrors.push(err26);
                }
                errors++;
            }
            else {
                errors = _errs31;
                if (vErrors !== null) {
                    if (_errs31) {
                        vErrors.length = _errs31;
                    }
                    else {
                        vErrors = null;
                    }
                }
            }
        }
        if (data.timestamp !== undefined) {
            var data11 = data.timestamp;
            if (!(((typeof data11 == "number") && (!(data11 % 1) && !isNaN(data11))) && (isFinite(data11)))) {
                var err27 = { instancePath: instancePath + "/timestamp", schemaPath: "#/properties/timestamp/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema60.properties.timestamp.type, parentSchema: schema60.properties.timestamp, data: data11 };
                if (vErrors === null) {
                    vErrors = [err27];
                }
                else {
                    vErrors.push(err27);
                }
                errors++;
            }
            if ((typeof data11 == "number") && (isFinite(data11))) {
                if (data11 < 0 || isNaN(data11)) {
                    var err28 = { instancePath: instancePath + "/timestamp", schemaPath: "#/properties/timestamp/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0", schema: 0, parentSchema: schema60.properties.timestamp, data: data11 };
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
        if (data.typeGroup !== undefined) {
            var data12 = data.typeGroup;
            if (!(((typeof data12 == "number") && (!(data12 % 1) && !isNaN(data12))) && (isFinite(data12)))) {
                var err29 = { instancePath: instancePath + "/typeGroup", schemaPath: "#/properties/typeGroup/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema60.properties.typeGroup.type, parentSchema: schema60.properties.typeGroup, data: data12 };
                if (vErrors === null) {
                    vErrors = [err29];
                }
                else {
                    vErrors.push(err29);
                }
                errors++;
            }
            if ((typeof data12 == "number") && (isFinite(data12))) {
                if (data12 < 0 || isNaN(data12)) {
                    var err30 = { instancePath: instancePath + "/typeGroup", schemaPath: "#/properties/typeGroup/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0", schema: 0, parentSchema: schema60.properties.typeGroup, data: data12 };
                    if (vErrors === null) {
                        vErrors = [err30];
                    }
                    else {
                        vErrors.push(err30);
                    }
                    errors++;
                }
            }
        }
        if (data.asset !== undefined) {
            var data13 = data.asset;
            if (data13 && typeof data13 == "object" && !Array.isArray(data13)) {
                if (data13.multiSignatureLegacy === undefined) {
                    var err31 = { instancePath: instancePath + "/asset", schemaPath: "#/properties/asset/required", keyword: "required", params: { missingProperty: "multiSignatureLegacy" }, message: "must have required property '" + "multiSignatureLegacy" + "'", schema: schema60.properties.asset.required, parentSchema: schema60.properties.asset, data: data13 };
                    if (vErrors === null) {
                        vErrors = [err31];
                    }
                    else {
                        vErrors.push(err31);
                    }
                    errors++;
                }
                if (data13.multiSignatureLegacy !== undefined) {
                    var data14 = data13.multiSignatureLegacy;
                    if (data14 && typeof data14 == "object" && !Array.isArray(data14)) {
                        if (data14.keysgroup === undefined) {
                            var err32 = { instancePath: instancePath + "/asset/multiSignatureLegacy", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/required", keyword: "required", params: { missingProperty: "keysgroup" }, message: "must have required property '" + "keysgroup" + "'", schema: schema60.properties.asset.properties.multiSignatureLegacy.required, parentSchema: schema60.properties.asset.properties.multiSignatureLegacy, data: data14 };
                            if (vErrors === null) {
                                vErrors = [err32];
                            }
                            else {
                                vErrors.push(err32);
                            }
                            errors++;
                        }
                        if (data14.min === undefined) {
                            var err33 = { instancePath: instancePath + "/asset/multiSignatureLegacy", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/required", keyword: "required", params: { missingProperty: "min" }, message: "must have required property '" + "min" + "'", schema: schema60.properties.asset.properties.multiSignatureLegacy.required, parentSchema: schema60.properties.asset.properties.multiSignatureLegacy, data: data14 };
                            if (vErrors === null) {
                                vErrors = [err33];
                            }
                            else {
                                vErrors.push(err33);
                            }
                            errors++;
                        }
                        if (data14.lifetime === undefined) {
                            var err34 = { instancePath: instancePath + "/asset/multiSignatureLegacy", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/required", keyword: "required", params: { missingProperty: "lifetime" }, message: "must have required property '" + "lifetime" + "'", schema: schema60.properties.asset.properties.multiSignatureLegacy.required, parentSchema: schema60.properties.asset.properties.multiSignatureLegacy, data: data14 };
                            if (vErrors === null) {
                                vErrors = [err34];
                            }
                            else {
                                vErrors.push(err34);
                            }
                            errors++;
                        }
                        if (data14.lifetime !== undefined) {
                            var data15 = data14.lifetime;
                            if (!(((typeof data15 == "number") && (!(data15 % 1) && !isNaN(data15))) && (isFinite(data15)))) {
                                var err35 = { instancePath: instancePath + "/asset/multiSignatureLegacy/lifetime", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/lifetime/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema60.properties.asset.properties.multiSignatureLegacy.properties.lifetime.type, parentSchema: schema60.properties.asset.properties.multiSignatureLegacy.properties.lifetime, data: data15 };
                                if (vErrors === null) {
                                    vErrors = [err35];
                                }
                                else {
                                    vErrors.push(err35);
                                }
                                errors++;
                            }
                            if ((typeof data15 == "number") && (isFinite(data15))) {
                                if (data15 > 72 || isNaN(data15)) {
                                    var err36 = { instancePath: instancePath + "/asset/multiSignatureLegacy/lifetime", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/lifetime/maximum", keyword: "maximum", params: { comparison: "<=", limit: 72 }, message: "must be <= 72", schema: 72, parentSchema: schema60.properties.asset.properties.multiSignatureLegacy.properties.lifetime, data: data15 };
                                    if (vErrors === null) {
                                        vErrors = [err36];
                                    }
                                    else {
                                        vErrors.push(err36);
                                    }
                                    errors++;
                                }
                                if (data15 < 1 || isNaN(data15)) {
                                    var err37 = { instancePath: instancePath + "/asset/multiSignatureLegacy/lifetime", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/lifetime/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1", schema: 1, parentSchema: schema60.properties.asset.properties.multiSignatureLegacy.properties.lifetime, data: data15 };
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
                        if (data14.keysgroup !== undefined) {
                            var data16 = data14.keysgroup;
                            if (Array.isArray(data16)) {
                                if (data16.length > 16) {
                                    var err38 = { instancePath: instancePath + "/asset/multiSignatureLegacy/keysgroup", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/keysgroup/maxItems", keyword: "maxItems", params: { limit: 16 }, message: "must NOT have more than 16 items", schema: 16, parentSchema: schema60.properties.asset.properties.multiSignatureLegacy.properties.keysgroup, data: data16 };
                                    if (vErrors === null) {
                                        vErrors = [err38];
                                    }
                                    else {
                                        vErrors.push(err38);
                                    }
                                    errors++;
                                }
                                if (data16.length < 1) {
                                    var err39 = { instancePath: instancePath + "/asset/multiSignatureLegacy/keysgroup", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/keysgroup/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items", schema: 1, parentSchema: schema60.properties.asset.properties.multiSignatureLegacy.properties.keysgroup, data: data16 };
                                    if (vErrors === null) {
                                        vErrors = [err39];
                                    }
                                    else {
                                        vErrors.push(err39);
                                    }
                                    errors++;
                                }
                                var len0 = data16.length;
                                for (var i0 = 0; i0 < len0; i0++) {
                                    var data17 = data16[i0];
                                    if (typeof data17 !== "string") {
                                        var err40 = { instancePath: instancePath + "/asset/multiSignatureLegacy/keysgroup/" + i0, schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/keysgroup/items/allOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema60.properties.asset.properties.multiSignatureLegacy.properties.keysgroup.items.allOf[0].type, parentSchema: schema60.properties.asset.properties.multiSignatureLegacy.properties.keysgroup.items.allOf[0], data: data17 };
                                        if (vErrors === null) {
                                            vErrors = [err40];
                                        }
                                        else {
                                            vErrors.push(err40);
                                        }
                                        errors++;
                                    }
                                    if (typeof data17 == "string" && data16 !== undefined) {
                                        data17 = func8(data17);
                                        data16[i0] = data17;
                                    }
                                    if ((typeof data17 == "number") && (isFinite(data17))) {
                                        if (data17 > 67 || isNaN(data17)) {
                                            var err41 = { instancePath: instancePath + "/asset/multiSignatureLegacy/keysgroup/" + i0, schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/keysgroup/items/allOf/0/maximum", keyword: "maximum", params: { comparison: "<=", limit: 67 }, message: "must be <= 67", schema: 67, parentSchema: schema60.properties.asset.properties.multiSignatureLegacy.properties.keysgroup.items.allOf[0], data: data17 };
                                            if (vErrors === null) {
                                                vErrors = [err41];
                                            }
                                            else {
                                                vErrors.push(err41);
                                            }
                                            errors++;
                                        }
                                        if (data17 < 67 || isNaN(data17)) {
                                            var err42 = { instancePath: instancePath + "/asset/multiSignatureLegacy/keysgroup/" + i0, schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/keysgroup/items/allOf/0/minimum", keyword: "minimum", params: { comparison: ">=", limit: 67 }, message: "must be >= 67", schema: 67, parentSchema: schema60.properties.asset.properties.multiSignatureLegacy.properties.keysgroup.items.allOf[0], data: data17 };
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
                            }
                            else {
                                var err43 = { instancePath: instancePath + "/asset/multiSignatureLegacy/keysgroup", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/keysgroup/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema60.properties.asset.properties.multiSignatureLegacy.properties.keysgroup.type, parentSchema: schema60.properties.asset.properties.multiSignatureLegacy.properties.keysgroup, data: data16 };
                                if (vErrors === null) {
                                    vErrors = [err43];
                                }
                                else {
                                    vErrors.push(err43);
                                }
                                errors++;
                            }
                        }
                        if (data14.min !== undefined) {
                            var data18 = data14.min;
                            if (!(((typeof data18 == "number") && (!(data18 % 1) && !isNaN(data18))) && (isFinite(data18)))) {
                                var err44 = { instancePath: instancePath + "/asset/multiSignatureLegacy/min", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/min/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema60.properties.asset.properties.multiSignatureLegacy.properties.min.type, parentSchema: schema60.properties.asset.properties.multiSignatureLegacy.properties.min, data: data18 };
                                if (vErrors === null) {
                                    vErrors = [err44];
                                }
                                else {
                                    vErrors.push(err44);
                                }
                                errors++;
                            }
                            if ((typeof data18 == "number") && (isFinite(data18))) {
                                var vSchema1 = data14 && data14.keysgroup && data14.keysgroup.length;
                                if (vSchema1 !== undefined && ((!((typeof vSchema1 == "number") && (isFinite(vSchema1)))) || (data18 > vSchema1 || isNaN(data18)))) {
                                    var err45 = { instancePath: instancePath + "/asset/multiSignatureLegacy/min", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/min/maximum", keyword: "maximum", params: { comparison: "<=", limit: vSchema1 }, message: "must be <= " + vSchema1, schema: schema60.properties.asset.properties.multiSignatureLegacy.properties.min.maximum, parentSchema: schema60.properties.asset.properties.multiSignatureLegacy.properties.min, data: data18 };
                                    if (vErrors === null) {
                                        vErrors = [err45];
                                    }
                                    else {
                                        vErrors.push(err45);
                                    }
                                    errors++;
                                }
                                if (data18 < 1 || isNaN(data18)) {
                                    var err46 = { instancePath: instancePath + "/asset/multiSignatureLegacy/min", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/min/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1", schema: 1, parentSchema: schema60.properties.asset.properties.multiSignatureLegacy.properties.min, data: data18 };
                                    if (vErrors === null) {
                                        vErrors = [err46];
                                    }
                                    else {
                                        vErrors.push(err46);
                                    }
                                    errors++;
                                }
                            }
                        }
                    }
                    else {
                        var err47 = { instancePath: instancePath + "/asset/multiSignatureLegacy", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema60.properties.asset.properties.multiSignatureLegacy.type, parentSchema: schema60.properties.asset.properties.multiSignatureLegacy, data: data14 };
                        if (vErrors === null) {
                            vErrors = [err47];
                        }
                        else {
                            vErrors.push(err47);
                        }
                        errors++;
                    }
                }
            }
            else {
                var err48 = { instancePath: instancePath + "/asset", schemaPath: "#/properties/asset/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema60.properties.asset.type, parentSchema: schema60.properties.asset, data: data13 };
                if (vErrors === null) {
                    vErrors = [err48];
                }
                else {
                    vErrors.push(err48);
                }
                errors++;
            }
        }
        if (data.signatures !== undefined) {
            var data19 = data.signatures;
            if (Array.isArray(data19)) {
                if (data19.length > 1) {
                    var err49 = { instancePath: instancePath + "/signatures", schemaPath: "#/properties/signatures/maxItems", keyword: "maxItems", params: { limit: 1 }, message: "must NOT have more than 1 items", schema: 1, parentSchema: schema60.properties.signatures, data: data19 };
                    if (vErrors === null) {
                        vErrors = [err49];
                    }
                    else {
                        vErrors.push(err49);
                    }
                    errors++;
                }
                if (data19.length < 1) {
                    var err50 = { instancePath: instancePath + "/signatures", schemaPath: "#/properties/signatures/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items", schema: 1, parentSchema: schema60.properties.signatures, data: data19 };
                    if (vErrors === null) {
                        vErrors = [err50];
                    }
                    else {
                        vErrors.push(err50);
                    }
                    errors++;
                }
                var len1 = data19.length;
                for (var i1 = 0; i1 < len1; i1++) {
                    var data20 = data19[i1];
                    if (typeof data20 === "string") {
                        if (!pattern2.test(data20)) {
                            var err51 = { instancePath: instancePath + "/signatures/" + i1, schemaPath: "alphanumeric/pattern", keyword: "pattern", params: { pattern: "^[a-zA-Z0-9]+$" }, message: "must match pattern \"" + "^[a-zA-Z0-9]+$" + "\"", schema: "^[a-zA-Z0-9]+$", parentSchema: schema48, data: data20 };
                            if (vErrors === null) {
                                vErrors = [err51];
                            }
                            else {
                                vErrors.push(err51);
                            }
                            errors++;
                        }
                    }
                    else {
                        var err52 = { instancePath: instancePath + "/signatures/" + i1, schemaPath: "alphanumeric/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema48.type, parentSchema: schema48, data: data20 };
                        if (vErrors === null) {
                            vErrors = [err52];
                        }
                        else {
                            vErrors.push(err52);
                        }
                        errors++;
                    }
                }
            }
            else {
                var err53 = { instancePath: instancePath + "/signatures", schemaPath: "#/properties/signatures/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema60.properties.signatures.type, parentSchema: schema60.properties.signatures, data: data19 };
                if (vErrors === null) {
                    vErrors = [err53];
                }
                else {
                    vErrors.push(err53);
                }
                errors++;
            }
        }
    }
    else {
        var err54 = { instancePath: instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema60.type, parentSchema: schema60, data: data };
        if (vErrors === null) {
            vErrors = [err54];
        }
        else {
            vErrors.push(err54);
        }
        errors++;
    }
    validate43.errors = vErrors;
    return errors === 0;
}
var schema66 = { "$id": "multiSignatureLegacyStrict", "else": { "required": ["type", "senderPublicKey", "fee", "amount", "nonce"] }, "if": { "properties": { "version": { "anyOf": [{ "type": "null" }, { "const": 1 }] } } }, "properties": { "amount": { "bignumber": { "minimum": 0, "maximum": 0 } }, "fee": { "bignumber": { "minimum": 1 } }, "id": { "anyOf": [{ "$ref": "transactionId" }, { "type": "null" }] }, "network": { "$ref": "networkByte" }, "nonce": { "bignumber": { "minimum": 0 } }, "secondSignature": { "$ref": "alphanumeric" }, "senderPublicKey": { "$ref": "publicKey" }, "signSignature": { "$ref": "alphanumeric" }, "signature": { "$ref": "alphanumeric" }, "version": { "enum": [1, 2], "anyOf": [{ "type": "null" }, { "const": 1 }] }, "timestamp": { "type": "integer", "minimum": 0 }, "typeGroup": { "minimum": 0, "type": "integer" }, "asset": { "properties": { "multiSignatureLegacy": { "properties": { "lifetime": { "minimum": 1, "type": "integer", "maximum": 72 }, "keysgroup": { "minItems": 1, "type": "array", "maxItems": 16, "items": { "allOf": [{ "minimum": 67, "type": "string", "maximum": 67, "transform": ["toLowerCase"] }] } }, "min": { "type": "integer", "minimum": 1, "maximum": { "$data": "1/keysgroup/length" } } }, "required": ["keysgroup", "min", "lifetime"], "type": "object" } }, "required": ["multiSignatureLegacy"], "type": "object" }, "signatures": { "items": { "$ref": "alphanumeric" }, "maxItems": 1, "minItems": 1, "type": "array" }, "type": { "transactionType": 4 } }, "then": { "required": ["type", "senderPublicKey", "fee", "amount", "timestamp"] }, "type": "object", "required": ["asset"], "anyOf": [{ "required": ["id", "signature"] }, { "required": ["id", "signature", "signatures"] }, { "required": ["id", "signatures"] }], "additionalProperties": false };
var func18 = Object.prototype.hasOwnProperty;
function validate46(data, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.instancePath, instancePath = _c === void 0 ? "" : _c, parentData = _b.parentData, parentDataProperty = _b.parentDataProperty, _d = _b.rootData, rootData = _d === void 0 ? data : _d;
    ;
    var vErrors = null;
    var errors = 0;
    var _errs1 = errors;
    var valid0 = false;
    var _errs2 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.id === undefined) {
            var err0 = { instancePath: instancePath, schemaPath: "#/anyOf/0/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property '" + "id" + "'", schema: schema66.anyOf[0].required, parentSchema: schema66.anyOf[0], data: data };
            if (vErrors === null) {
                vErrors = [err0];
            }
            else {
                vErrors.push(err0);
            }
            errors++;
        }
        if (data.signature === undefined) {
            var err1 = { instancePath: instancePath, schemaPath: "#/anyOf/0/required", keyword: "required", params: { missingProperty: "signature" }, message: "must have required property '" + "signature" + "'", schema: schema66.anyOf[0].required, parentSchema: schema66.anyOf[0], data: data };
            if (vErrors === null) {
                vErrors = [err1];
            }
            else {
                vErrors.push(err1);
            }
            errors++;
        }
    }
    var _valid0 = _errs2 === errors;
    valid0 = valid0 || _valid0;
    if (!valid0) {
        var _errs3 = errors;
        if (data && typeof data == "object" && !Array.isArray(data)) {
            if (data.id === undefined) {
                var err2 = { instancePath: instancePath, schemaPath: "#/anyOf/1/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property '" + "id" + "'", schema: schema66.anyOf[1].required, parentSchema: schema66.anyOf[1], data: data };
                if (vErrors === null) {
                    vErrors = [err2];
                }
                else {
                    vErrors.push(err2);
                }
                errors++;
            }
            if (data.signature === undefined) {
                var err3 = { instancePath: instancePath, schemaPath: "#/anyOf/1/required", keyword: "required", params: { missingProperty: "signature" }, message: "must have required property '" + "signature" + "'", schema: schema66.anyOf[1].required, parentSchema: schema66.anyOf[1], data: data };
                if (vErrors === null) {
                    vErrors = [err3];
                }
                else {
                    vErrors.push(err3);
                }
                errors++;
            }
            if (data.signatures === undefined) {
                var err4 = { instancePath: instancePath, schemaPath: "#/anyOf/1/required", keyword: "required", params: { missingProperty: "signatures" }, message: "must have required property '" + "signatures" + "'", schema: schema66.anyOf[1].required, parentSchema: schema66.anyOf[1], data: data };
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
            var _errs4 = errors;
            if (data && typeof data == "object" && !Array.isArray(data)) {
                if (data.id === undefined) {
                    var err5 = { instancePath: instancePath, schemaPath: "#/anyOf/2/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property '" + "id" + "'", schema: schema66.anyOf[2].required, parentSchema: schema66.anyOf[2], data: data };
                    if (vErrors === null) {
                        vErrors = [err5];
                    }
                    else {
                        vErrors.push(err5);
                    }
                    errors++;
                }
                if (data.signatures === undefined) {
                    var err6 = { instancePath: instancePath, schemaPath: "#/anyOf/2/required", keyword: "required", params: { missingProperty: "signatures" }, message: "must have required property '" + "signatures" + "'", schema: schema66.anyOf[2].required, parentSchema: schema66.anyOf[2], data: data };
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
    }
    if (!valid0) {
        var err7 = { instancePath: instancePath, schemaPath: "#/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf", schema: schema66.anyOf, parentSchema: schema66, data: data };
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
    }
    var _errs5 = errors;
    var valid1 = true;
    var _errs6 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.version !== undefined) {
            var data0 = data.version;
            var _errs8 = errors;
            var valid3 = false;
            var _errs9 = errors;
            if (data0 !== null) {
                var err8 = {};
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
                var _errs11 = errors;
                if (1 !== data0) {
                    var err9 = {};
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
                var err10 = {};
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
    }
    var _valid1 = _errs6 === errors;
    errors = _errs5;
    if (vErrors !== null) {
        if (_errs5) {
            vErrors.length = _errs5;
        }
        else {
            vErrors = null;
        }
    }
    var ifClause0;
    if (_valid1) {
        var _errs12 = errors;
        if (data && typeof data == "object" && !Array.isArray(data)) {
            if (data.type === undefined) {
                var err11 = { instancePath: instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property '" + "type" + "'", schema: schema66.then.required, parentSchema: schema66.then, data: data };
                if (vErrors === null) {
                    vErrors = [err11];
                }
                else {
                    vErrors.push(err11);
                }
                errors++;
            }
            if (data.senderPublicKey === undefined) {
                var err12 = { instancePath: instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "senderPublicKey" }, message: "must have required property '" + "senderPublicKey" + "'", schema: schema66.then.required, parentSchema: schema66.then, data: data };
                if (vErrors === null) {
                    vErrors = [err12];
                }
                else {
                    vErrors.push(err12);
                }
                errors++;
            }
            if (data.fee === undefined) {
                var err13 = { instancePath: instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "fee" }, message: "must have required property '" + "fee" + "'", schema: schema66.then.required, parentSchema: schema66.then, data: data };
                if (vErrors === null) {
                    vErrors = [err13];
                }
                else {
                    vErrors.push(err13);
                }
                errors++;
            }
            if (data.amount === undefined) {
                var err14 = { instancePath: instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "amount" }, message: "must have required property '" + "amount" + "'", schema: schema66.then.required, parentSchema: schema66.then, data: data };
                if (vErrors === null) {
                    vErrors = [err14];
                }
                else {
                    vErrors.push(err14);
                }
                errors++;
            }
            if (data.timestamp === undefined) {
                var err15 = { instancePath: instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "timestamp" }, message: "must have required property '" + "timestamp" + "'", schema: schema66.then.required, parentSchema: schema66.then, data: data };
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
        var _errs13 = errors;
        if (data && typeof data == "object" && !Array.isArray(data)) {
            if (data.type === undefined) {
                var err16 = { instancePath: instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property '" + "type" + "'", schema: schema66.else.required, parentSchema: schema66.else, data: data };
                if (vErrors === null) {
                    vErrors = [err16];
                }
                else {
                    vErrors.push(err16);
                }
                errors++;
            }
            if (data.senderPublicKey === undefined) {
                var err17 = { instancePath: instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "senderPublicKey" }, message: "must have required property '" + "senderPublicKey" + "'", schema: schema66.else.required, parentSchema: schema66.else, data: data };
                if (vErrors === null) {
                    vErrors = [err17];
                }
                else {
                    vErrors.push(err17);
                }
                errors++;
            }
            if (data.fee === undefined) {
                var err18 = { instancePath: instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "fee" }, message: "must have required property '" + "fee" + "'", schema: schema66.else.required, parentSchema: schema66.else, data: data };
                if (vErrors === null) {
                    vErrors = [err18];
                }
                else {
                    vErrors.push(err18);
                }
                errors++;
            }
            if (data.amount === undefined) {
                var err19 = { instancePath: instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "amount" }, message: "must have required property '" + "amount" + "'", schema: schema66.else.required, parentSchema: schema66.else, data: data };
                if (vErrors === null) {
                    vErrors = [err19];
                }
                else {
                    vErrors.push(err19);
                }
                errors++;
            }
            if (data.nonce === undefined) {
                var err20 = { instancePath: instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "nonce" }, message: "must have required property '" + "nonce" + "'", schema: schema66.else.required, parentSchema: schema66.else, data: data };
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
    }
    if (!valid1) {
        var err21 = { instancePath: instancePath, schemaPath: "#/if", keyword: "if", params: { failingKeyword: ifClause0 }, message: "must match \"" + ifClause0 + "\" schema", schema: schema66.if, parentSchema: schema66, data: data };
        if (vErrors === null) {
            vErrors = [err21];
        }
        else {
            vErrors.push(err21);
        }
        errors++;
    }
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.asset === undefined) {
            var err22 = { instancePath: instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "asset" }, message: "must have required property '" + "asset" + "'", schema: schema66.required, parentSchema: schema66, data: data };
            if (vErrors === null) {
                vErrors = [err22];
            }
            else {
                vErrors.push(err22);
            }
            errors++;
        }
        for (var key0 in data) {
            if (!(func18.call(schema66.properties, key0))) {
                var err23 = { instancePath: instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties", schema: false, parentSchema: schema66, data: data };
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
            var data3 = data.id;
            var _errs18 = errors;
            var valid5 = false;
            var _errs19 = errors;
            if (!(validate35(data3, { instancePath: instancePath + "/id", parentData: data, parentDataProperty: "id", rootData: rootData }))) {
                vErrors = vErrors === null ? validate35.errors : vErrors.concat(validate35.errors);
                errors = vErrors.length;
            }
            var _valid3 = _errs19 === errors;
            valid5 = valid5 || _valid3;
            if (!valid5) {
                var _errs20 = errors;
                if (data3 !== null) {
                    var err24 = { instancePath: instancePath + "/id", schemaPath: "#/properties/id/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null", schema: schema66.properties.id.anyOf[1].type, parentSchema: schema66.properties.id.anyOf[1], data: data3 };
                    if (vErrors === null) {
                        vErrors = [err24];
                    }
                    else {
                        vErrors.push(err24);
                    }
                    errors++;
                }
                var _valid3 = _errs20 === errors;
                valid5 = valid5 || _valid3;
            }
            if (!valid5) {
                var err25 = { instancePath: instancePath + "/id", schemaPath: "#/properties/id/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf", schema: schema66.properties.id.anyOf, parentSchema: schema66.properties.id, data: data3 };
                if (vErrors === null) {
                    vErrors = [err25];
                }
                else {
                    vErrors.push(err25);
                }
                errors++;
            }
            else {
                errors = _errs18;
                if (vErrors !== null) {
                    if (_errs18) {
                        vErrors.length = _errs18;
                    }
                    else {
                        vErrors = null;
                    }
                }
            }
        }
        if (data.secondSignature !== undefined) {
            var data6 = data.secondSignature;
            if (typeof data6 === "string") {
                if (!pattern2.test(data6)) {
                    var err26 = { instancePath: instancePath + "/secondSignature", schemaPath: "alphanumeric/pattern", keyword: "pattern", params: { pattern: "^[a-zA-Z0-9]+$" }, message: "must match pattern \"" + "^[a-zA-Z0-9]+$" + "\"", schema: "^[a-zA-Z0-9]+$", parentSchema: schema48, data: data6 };
                    if (vErrors === null) {
                        vErrors = [err26];
                    }
                    else {
                        vErrors.push(err26);
                    }
                    errors++;
                }
            }
            else {
                var err27 = { instancePath: instancePath + "/secondSignature", schemaPath: "alphanumeric/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema48.type, parentSchema: schema48, data: data6 };
                if (vErrors === null) {
                    vErrors = [err27];
                }
                else {
                    vErrors.push(err27);
                }
                errors++;
            }
        }
        if (data.senderPublicKey !== undefined) {
            if (!(validate38(data.senderPublicKey, { instancePath: instancePath + "/senderPublicKey", parentData: data, parentDataProperty: "senderPublicKey", rootData: rootData }))) {
                vErrors = vErrors === null ? validate38.errors : vErrors.concat(validate38.errors);
                errors = vErrors.length;
            }
        }
        if (data.signSignature !== undefined) {
            var data8 = data.signSignature;
            if (typeof data8 === "string") {
                if (!pattern2.test(data8)) {
                    var err28 = { instancePath: instancePath + "/signSignature", schemaPath: "alphanumeric/pattern", keyword: "pattern", params: { pattern: "^[a-zA-Z0-9]+$" }, message: "must match pattern \"" + "^[a-zA-Z0-9]+$" + "\"", schema: "^[a-zA-Z0-9]+$", parentSchema: schema48, data: data8 };
                    if (vErrors === null) {
                        vErrors = [err28];
                    }
                    else {
                        vErrors.push(err28);
                    }
                    errors++;
                }
            }
            else {
                var err29 = { instancePath: instancePath + "/signSignature", schemaPath: "alphanumeric/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema48.type, parentSchema: schema48, data: data8 };
                if (vErrors === null) {
                    vErrors = [err29];
                }
                else {
                    vErrors.push(err29);
                }
                errors++;
            }
        }
        if (data.signature !== undefined) {
            var data9 = data.signature;
            if (typeof data9 === "string") {
                if (!pattern2.test(data9)) {
                    var err30 = { instancePath: instancePath + "/signature", schemaPath: "alphanumeric/pattern", keyword: "pattern", params: { pattern: "^[a-zA-Z0-9]+$" }, message: "must match pattern \"" + "^[a-zA-Z0-9]+$" + "\"", schema: "^[a-zA-Z0-9]+$", parentSchema: schema48, data: data9 };
                    if (vErrors === null) {
                        vErrors = [err30];
                    }
                    else {
                        vErrors.push(err30);
                    }
                    errors++;
                }
            }
            else {
                var err31 = { instancePath: instancePath + "/signature", schemaPath: "alphanumeric/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema48.type, parentSchema: schema48, data: data9 };
                if (vErrors === null) {
                    vErrors = [err31];
                }
                else {
                    vErrors.push(err31);
                }
                errors++;
            }
        }
        if (data.version !== undefined) {
            var data10 = data.version;
            if (!((data10 === 1) || (data10 === 2))) {
                var err32 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/enum", keyword: "enum", params: { allowedValues: schema66.properties.version.enum }, message: "must be equal to one of the allowed values", schema: schema66.properties.version.enum, parentSchema: schema66.properties.version, data: data10 };
                if (vErrors === null) {
                    vErrors = [err32];
                }
                else {
                    vErrors.push(err32);
                }
                errors++;
            }
            var _errs36 = errors;
            var valid10 = false;
            var _errs37 = errors;
            if (data10 !== null) {
                var err33 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/anyOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null", schema: schema66.properties.version.anyOf[0].type, parentSchema: schema66.properties.version.anyOf[0], data: data10 };
                if (vErrors === null) {
                    vErrors = [err33];
                }
                else {
                    vErrors.push(err33);
                }
                errors++;
            }
            var _valid4 = _errs37 === errors;
            valid10 = valid10 || _valid4;
            if (!valid10) {
                var _errs39 = errors;
                if (1 !== data10) {
                    var err34 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/anyOf/1/const", keyword: "const", params: { allowedValue: 1 }, message: "must be equal to constant", schema: 1, parentSchema: schema66.properties.version.anyOf[1], data: data10 };
                    if (vErrors === null) {
                        vErrors = [err34];
                    }
                    else {
                        vErrors.push(err34);
                    }
                    errors++;
                }
                var _valid4 = _errs39 === errors;
                valid10 = valid10 || _valid4;
            }
            if (!valid10) {
                var err35 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf", schema: schema66.properties.version.anyOf, parentSchema: schema66.properties.version, data: data10 };
                if (vErrors === null) {
                    vErrors = [err35];
                }
                else {
                    vErrors.push(err35);
                }
                errors++;
            }
            else {
                errors = _errs36;
                if (vErrors !== null) {
                    if (_errs36) {
                        vErrors.length = _errs36;
                    }
                    else {
                        vErrors = null;
                    }
                }
            }
        }
        if (data.timestamp !== undefined) {
            var data11 = data.timestamp;
            if (!(((typeof data11 == "number") && (!(data11 % 1) && !isNaN(data11))) && (isFinite(data11)))) {
                var err36 = { instancePath: instancePath + "/timestamp", schemaPath: "#/properties/timestamp/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema66.properties.timestamp.type, parentSchema: schema66.properties.timestamp, data: data11 };
                if (vErrors === null) {
                    vErrors = [err36];
                }
                else {
                    vErrors.push(err36);
                }
                errors++;
            }
            if ((typeof data11 == "number") && (isFinite(data11))) {
                if (data11 < 0 || isNaN(data11)) {
                    var err37 = { instancePath: instancePath + "/timestamp", schemaPath: "#/properties/timestamp/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0", schema: 0, parentSchema: schema66.properties.timestamp, data: data11 };
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
        if (data.typeGroup !== undefined) {
            var data12 = data.typeGroup;
            if (!(((typeof data12 == "number") && (!(data12 % 1) && !isNaN(data12))) && (isFinite(data12)))) {
                var err38 = { instancePath: instancePath + "/typeGroup", schemaPath: "#/properties/typeGroup/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema66.properties.typeGroup.type, parentSchema: schema66.properties.typeGroup, data: data12 };
                if (vErrors === null) {
                    vErrors = [err38];
                }
                else {
                    vErrors.push(err38);
                }
                errors++;
            }
            if ((typeof data12 == "number") && (isFinite(data12))) {
                if (data12 < 0 || isNaN(data12)) {
                    var err39 = { instancePath: instancePath + "/typeGroup", schemaPath: "#/properties/typeGroup/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0", schema: 0, parentSchema: schema66.properties.typeGroup, data: data12 };
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
        if (data.asset !== undefined) {
            var data13 = data.asset;
            if (data13 && typeof data13 == "object" && !Array.isArray(data13)) {
                if (data13.multiSignatureLegacy === undefined) {
                    var err40 = { instancePath: instancePath + "/asset", schemaPath: "#/properties/asset/required", keyword: "required", params: { missingProperty: "multiSignatureLegacy" }, message: "must have required property '" + "multiSignatureLegacy" + "'", schema: schema66.properties.asset.required, parentSchema: schema66.properties.asset, data: data13 };
                    if (vErrors === null) {
                        vErrors = [err40];
                    }
                    else {
                        vErrors.push(err40);
                    }
                    errors++;
                }
                if (data13.multiSignatureLegacy !== undefined) {
                    var data14 = data13.multiSignatureLegacy;
                    if (data14 && typeof data14 == "object" && !Array.isArray(data14)) {
                        if (data14.keysgroup === undefined) {
                            var err41 = { instancePath: instancePath + "/asset/multiSignatureLegacy", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/required", keyword: "required", params: { missingProperty: "keysgroup" }, message: "must have required property '" + "keysgroup" + "'", schema: schema66.properties.asset.properties.multiSignatureLegacy.required, parentSchema: schema66.properties.asset.properties.multiSignatureLegacy, data: data14 };
                            if (vErrors === null) {
                                vErrors = [err41];
                            }
                            else {
                                vErrors.push(err41);
                            }
                            errors++;
                        }
                        if (data14.min === undefined) {
                            var err42 = { instancePath: instancePath + "/asset/multiSignatureLegacy", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/required", keyword: "required", params: { missingProperty: "min" }, message: "must have required property '" + "min" + "'", schema: schema66.properties.asset.properties.multiSignatureLegacy.required, parentSchema: schema66.properties.asset.properties.multiSignatureLegacy, data: data14 };
                            if (vErrors === null) {
                                vErrors = [err42];
                            }
                            else {
                                vErrors.push(err42);
                            }
                            errors++;
                        }
                        if (data14.lifetime === undefined) {
                            var err43 = { instancePath: instancePath + "/asset/multiSignatureLegacy", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/required", keyword: "required", params: { missingProperty: "lifetime" }, message: "must have required property '" + "lifetime" + "'", schema: schema66.properties.asset.properties.multiSignatureLegacy.required, parentSchema: schema66.properties.asset.properties.multiSignatureLegacy, data: data14 };
                            if (vErrors === null) {
                                vErrors = [err43];
                            }
                            else {
                                vErrors.push(err43);
                            }
                            errors++;
                        }
                        if (data14.lifetime !== undefined) {
                            var data15 = data14.lifetime;
                            if (!(((typeof data15 == "number") && (!(data15 % 1) && !isNaN(data15))) && (isFinite(data15)))) {
                                var err44 = { instancePath: instancePath + "/asset/multiSignatureLegacy/lifetime", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/lifetime/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema66.properties.asset.properties.multiSignatureLegacy.properties.lifetime.type, parentSchema: schema66.properties.asset.properties.multiSignatureLegacy.properties.lifetime, data: data15 };
                                if (vErrors === null) {
                                    vErrors = [err44];
                                }
                                else {
                                    vErrors.push(err44);
                                }
                                errors++;
                            }
                            if ((typeof data15 == "number") && (isFinite(data15))) {
                                if (data15 > 72 || isNaN(data15)) {
                                    var err45 = { instancePath: instancePath + "/asset/multiSignatureLegacy/lifetime", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/lifetime/maximum", keyword: "maximum", params: { comparison: "<=", limit: 72 }, message: "must be <= 72", schema: 72, parentSchema: schema66.properties.asset.properties.multiSignatureLegacy.properties.lifetime, data: data15 };
                                    if (vErrors === null) {
                                        vErrors = [err45];
                                    }
                                    else {
                                        vErrors.push(err45);
                                    }
                                    errors++;
                                }
                                if (data15 < 1 || isNaN(data15)) {
                                    var err46 = { instancePath: instancePath + "/asset/multiSignatureLegacy/lifetime", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/lifetime/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1", schema: 1, parentSchema: schema66.properties.asset.properties.multiSignatureLegacy.properties.lifetime, data: data15 };
                                    if (vErrors === null) {
                                        vErrors = [err46];
                                    }
                                    else {
                                        vErrors.push(err46);
                                    }
                                    errors++;
                                }
                            }
                        }
                        if (data14.keysgroup !== undefined) {
                            var data16 = data14.keysgroup;
                            if (Array.isArray(data16)) {
                                if (data16.length > 16) {
                                    var err47 = { instancePath: instancePath + "/asset/multiSignatureLegacy/keysgroup", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/keysgroup/maxItems", keyword: "maxItems", params: { limit: 16 }, message: "must NOT have more than 16 items", schema: 16, parentSchema: schema66.properties.asset.properties.multiSignatureLegacy.properties.keysgroup, data: data16 };
                                    if (vErrors === null) {
                                        vErrors = [err47];
                                    }
                                    else {
                                        vErrors.push(err47);
                                    }
                                    errors++;
                                }
                                if (data16.length < 1) {
                                    var err48 = { instancePath: instancePath + "/asset/multiSignatureLegacy/keysgroup", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/keysgroup/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items", schema: 1, parentSchema: schema66.properties.asset.properties.multiSignatureLegacy.properties.keysgroup, data: data16 };
                                    if (vErrors === null) {
                                        vErrors = [err48];
                                    }
                                    else {
                                        vErrors.push(err48);
                                    }
                                    errors++;
                                }
                                var len0 = data16.length;
                                for (var i0 = 0; i0 < len0; i0++) {
                                    var data17 = data16[i0];
                                    if (typeof data17 !== "string") {
                                        var err49 = { instancePath: instancePath + "/asset/multiSignatureLegacy/keysgroup/" + i0, schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/keysgroup/items/allOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema66.properties.asset.properties.multiSignatureLegacy.properties.keysgroup.items.allOf[0].type, parentSchema: schema66.properties.asset.properties.multiSignatureLegacy.properties.keysgroup.items.allOf[0], data: data17 };
                                        if (vErrors === null) {
                                            vErrors = [err49];
                                        }
                                        else {
                                            vErrors.push(err49);
                                        }
                                        errors++;
                                    }
                                    if (typeof data17 == "string" && data16 !== undefined) {
                                        data17 = func8(data17);
                                        data16[i0] = data17;
                                    }
                                    if ((typeof data17 == "number") && (isFinite(data17))) {
                                        if (data17 > 67 || isNaN(data17)) {
                                            var err50 = { instancePath: instancePath + "/asset/multiSignatureLegacy/keysgroup/" + i0, schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/keysgroup/items/allOf/0/maximum", keyword: "maximum", params: { comparison: "<=", limit: 67 }, message: "must be <= 67", schema: 67, parentSchema: schema66.properties.asset.properties.multiSignatureLegacy.properties.keysgroup.items.allOf[0], data: data17 };
                                            if (vErrors === null) {
                                                vErrors = [err50];
                                            }
                                            else {
                                                vErrors.push(err50);
                                            }
                                            errors++;
                                        }
                                        if (data17 < 67 || isNaN(data17)) {
                                            var err51 = { instancePath: instancePath + "/asset/multiSignatureLegacy/keysgroup/" + i0, schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/keysgroup/items/allOf/0/minimum", keyword: "minimum", params: { comparison: ">=", limit: 67 }, message: "must be >= 67", schema: 67, parentSchema: schema66.properties.asset.properties.multiSignatureLegacy.properties.keysgroup.items.allOf[0], data: data17 };
                                            if (vErrors === null) {
                                                vErrors = [err51];
                                            }
                                            else {
                                                vErrors.push(err51);
                                            }
                                            errors++;
                                        }
                                    }
                                }
                            }
                            else {
                                var err52 = { instancePath: instancePath + "/asset/multiSignatureLegacy/keysgroup", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/keysgroup/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema66.properties.asset.properties.multiSignatureLegacy.properties.keysgroup.type, parentSchema: schema66.properties.asset.properties.multiSignatureLegacy.properties.keysgroup, data: data16 };
                                if (vErrors === null) {
                                    vErrors = [err52];
                                }
                                else {
                                    vErrors.push(err52);
                                }
                                errors++;
                            }
                        }
                        if (data14.min !== undefined) {
                            var data18 = data14.min;
                            if (!(((typeof data18 == "number") && (!(data18 % 1) && !isNaN(data18))) && (isFinite(data18)))) {
                                var err53 = { instancePath: instancePath + "/asset/multiSignatureLegacy/min", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/min/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema66.properties.asset.properties.multiSignatureLegacy.properties.min.type, parentSchema: schema66.properties.asset.properties.multiSignatureLegacy.properties.min, data: data18 };
                                if (vErrors === null) {
                                    vErrors = [err53];
                                }
                                else {
                                    vErrors.push(err53);
                                }
                                errors++;
                            }
                            if ((typeof data18 == "number") && (isFinite(data18))) {
                                var vSchema1 = data14 && data14.keysgroup && data14.keysgroup.length;
                                if (vSchema1 !== undefined && ((!((typeof vSchema1 == "number") && (isFinite(vSchema1)))) || (data18 > vSchema1 || isNaN(data18)))) {
                                    var err54 = { instancePath: instancePath + "/asset/multiSignatureLegacy/min", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/min/maximum", keyword: "maximum", params: { comparison: "<=", limit: vSchema1 }, message: "must be <= " + vSchema1, schema: schema66.properties.asset.properties.multiSignatureLegacy.properties.min.maximum, parentSchema: schema66.properties.asset.properties.multiSignatureLegacy.properties.min, data: data18 };
                                    if (vErrors === null) {
                                        vErrors = [err54];
                                    }
                                    else {
                                        vErrors.push(err54);
                                    }
                                    errors++;
                                }
                                if (data18 < 1 || isNaN(data18)) {
                                    var err55 = { instancePath: instancePath + "/asset/multiSignatureLegacy/min", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/min/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1", schema: 1, parentSchema: schema66.properties.asset.properties.multiSignatureLegacy.properties.min, data: data18 };
                                    if (vErrors === null) {
                                        vErrors = [err55];
                                    }
                                    else {
                                        vErrors.push(err55);
                                    }
                                    errors++;
                                }
                            }
                        }
                    }
                    else {
                        var err56 = { instancePath: instancePath + "/asset/multiSignatureLegacy", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema66.properties.asset.properties.multiSignatureLegacy.type, parentSchema: schema66.properties.asset.properties.multiSignatureLegacy, data: data14 };
                        if (vErrors === null) {
                            vErrors = [err56];
                        }
                        else {
                            vErrors.push(err56);
                        }
                        errors++;
                    }
                }
            }
            else {
                var err57 = { instancePath: instancePath + "/asset", schemaPath: "#/properties/asset/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema66.properties.asset.type, parentSchema: schema66.properties.asset, data: data13 };
                if (vErrors === null) {
                    vErrors = [err57];
                }
                else {
                    vErrors.push(err57);
                }
                errors++;
            }
        }
        if (data.signatures !== undefined) {
            var data19 = data.signatures;
            if (Array.isArray(data19)) {
                if (data19.length > 1) {
                    var err58 = { instancePath: instancePath + "/signatures", schemaPath: "#/properties/signatures/maxItems", keyword: "maxItems", params: { limit: 1 }, message: "must NOT have more than 1 items", schema: 1, parentSchema: schema66.properties.signatures, data: data19 };
                    if (vErrors === null) {
                        vErrors = [err58];
                    }
                    else {
                        vErrors.push(err58);
                    }
                    errors++;
                }
                if (data19.length < 1) {
                    var err59 = { instancePath: instancePath + "/signatures", schemaPath: "#/properties/signatures/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items", schema: 1, parentSchema: schema66.properties.signatures, data: data19 };
                    if (vErrors === null) {
                        vErrors = [err59];
                    }
                    else {
                        vErrors.push(err59);
                    }
                    errors++;
                }
                var len1 = data19.length;
                for (var i1 = 0; i1 < len1; i1++) {
                    var data20 = data19[i1];
                    if (typeof data20 === "string") {
                        if (!pattern2.test(data20)) {
                            var err60 = { instancePath: instancePath + "/signatures/" + i1, schemaPath: "alphanumeric/pattern", keyword: "pattern", params: { pattern: "^[a-zA-Z0-9]+$" }, message: "must match pattern \"" + "^[a-zA-Z0-9]+$" + "\"", schema: "^[a-zA-Z0-9]+$", parentSchema: schema48, data: data20 };
                            if (vErrors === null) {
                                vErrors = [err60];
                            }
                            else {
                                vErrors.push(err60);
                            }
                            errors++;
                        }
                    }
                    else {
                        var err61 = { instancePath: instancePath + "/signatures/" + i1, schemaPath: "alphanumeric/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema48.type, parentSchema: schema48, data: data20 };
                        if (vErrors === null) {
                            vErrors = [err61];
                        }
                        else {
                            vErrors.push(err61);
                        }
                        errors++;
                    }
                }
            }
            else {
                var err62 = { instancePath: instancePath + "/signatures", schemaPath: "#/properties/signatures/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema66.properties.signatures.type, parentSchema: schema66.properties.signatures, data: data19 };
                if (vErrors === null) {
                    vErrors = [err62];
                }
                else {
                    vErrors.push(err62);
                }
                errors++;
            }
        }
    }
    else {
        var err63 = { instancePath: instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema66.type, parentSchema: schema66, data: data };
        if (vErrors === null) {
            vErrors = [err63];
        }
        else {
            vErrors.push(err63);
        }
        errors++;
    }
    validate46.errors = vErrors;
    return errors === 0;
}
var schema72 = { "$id": "multiSignatureLegacySigned", "else": { "required": ["type", "senderPublicKey", "fee", "amount", "nonce"] }, "if": { "properties": { "version": { "anyOf": [{ "type": "null" }, { "const": 1 }] } } }, "properties": { "amount": { "bignumber": { "minimum": 0, "maximum": 0 } }, "fee": { "bignumber": { "minimum": 1 } }, "id": { "anyOf": [{ "$ref": "transactionId" }, { "type": "null" }] }, "network": { "$ref": "networkByte" }, "nonce": { "bignumber": { "minimum": 0 } }, "secondSignature": { "$ref": "alphanumeric" }, "senderPublicKey": { "$ref": "publicKey" }, "signSignature": { "$ref": "alphanumeric" }, "signature": { "$ref": "alphanumeric" }, "version": { "enum": [1, 2], "anyOf": [{ "type": "null" }, { "const": 1 }] }, "timestamp": { "type": "integer", "minimum": 0 }, "typeGroup": { "minimum": 0, "type": "integer" }, "asset": { "properties": { "multiSignatureLegacy": { "properties": { "lifetime": { "minimum": 1, "type": "integer", "maximum": 72 }, "keysgroup": { "minItems": 1, "type": "array", "maxItems": 16, "items": { "allOf": [{ "minimum": 67, "type": "string", "maximum": 67, "transform": ["toLowerCase"] }] } }, "min": { "type": "integer", "minimum": 1, "maximum": { "$data": "1/keysgroup/length" } } }, "required": ["keysgroup", "min", "lifetime"], "type": "object" } }, "required": ["multiSignatureLegacy"], "type": "object" }, "signatures": { "items": { "$ref": "alphanumeric" }, "maxItems": 1, "minItems": 1, "type": "array" }, "type": { "transactionType": 4 } }, "then": { "required": ["type", "senderPublicKey", "fee", "amount", "timestamp"] }, "type": "object", "required": ["asset"], "anyOf": [{ "required": ["id", "signature"] }, { "required": ["id", "signature", "signatures"] }, { "required": ["id", "signatures"] }] };
function validate49(data, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.instancePath, instancePath = _c === void 0 ? "" : _c, parentData = _b.parentData, parentDataProperty = _b.parentDataProperty, _d = _b.rootData, rootData = _d === void 0 ? data : _d;
    ;
    var vErrors = null;
    var errors = 0;
    var _errs1 = errors;
    var valid0 = false;
    var _errs2 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.id === undefined) {
            var err0 = { instancePath: instancePath, schemaPath: "#/anyOf/0/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property '" + "id" + "'", schema: schema72.anyOf[0].required, parentSchema: schema72.anyOf[0], data: data };
            if (vErrors === null) {
                vErrors = [err0];
            }
            else {
                vErrors.push(err0);
            }
            errors++;
        }
        if (data.signature === undefined) {
            var err1 = { instancePath: instancePath, schemaPath: "#/anyOf/0/required", keyword: "required", params: { missingProperty: "signature" }, message: "must have required property '" + "signature" + "'", schema: schema72.anyOf[0].required, parentSchema: schema72.anyOf[0], data: data };
            if (vErrors === null) {
                vErrors = [err1];
            }
            else {
                vErrors.push(err1);
            }
            errors++;
        }
    }
    var _valid0 = _errs2 === errors;
    valid0 = valid0 || _valid0;
    if (!valid0) {
        var _errs3 = errors;
        if (data && typeof data == "object" && !Array.isArray(data)) {
            if (data.id === undefined) {
                var err2 = { instancePath: instancePath, schemaPath: "#/anyOf/1/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property '" + "id" + "'", schema: schema72.anyOf[1].required, parentSchema: schema72.anyOf[1], data: data };
                if (vErrors === null) {
                    vErrors = [err2];
                }
                else {
                    vErrors.push(err2);
                }
                errors++;
            }
            if (data.signature === undefined) {
                var err3 = { instancePath: instancePath, schemaPath: "#/anyOf/1/required", keyword: "required", params: { missingProperty: "signature" }, message: "must have required property '" + "signature" + "'", schema: schema72.anyOf[1].required, parentSchema: schema72.anyOf[1], data: data };
                if (vErrors === null) {
                    vErrors = [err3];
                }
                else {
                    vErrors.push(err3);
                }
                errors++;
            }
            if (data.signatures === undefined) {
                var err4 = { instancePath: instancePath, schemaPath: "#/anyOf/1/required", keyword: "required", params: { missingProperty: "signatures" }, message: "must have required property '" + "signatures" + "'", schema: schema72.anyOf[1].required, parentSchema: schema72.anyOf[1], data: data };
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
            var _errs4 = errors;
            if (data && typeof data == "object" && !Array.isArray(data)) {
                if (data.id === undefined) {
                    var err5 = { instancePath: instancePath, schemaPath: "#/anyOf/2/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property '" + "id" + "'", schema: schema72.anyOf[2].required, parentSchema: schema72.anyOf[2], data: data };
                    if (vErrors === null) {
                        vErrors = [err5];
                    }
                    else {
                        vErrors.push(err5);
                    }
                    errors++;
                }
                if (data.signatures === undefined) {
                    var err6 = { instancePath: instancePath, schemaPath: "#/anyOf/2/required", keyword: "required", params: { missingProperty: "signatures" }, message: "must have required property '" + "signatures" + "'", schema: schema72.anyOf[2].required, parentSchema: schema72.anyOf[2], data: data };
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
    }
    if (!valid0) {
        var err7 = { instancePath: instancePath, schemaPath: "#/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf", schema: schema72.anyOf, parentSchema: schema72, data: data };
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
    }
    var _errs5 = errors;
    var valid1 = true;
    var _errs6 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.version !== undefined) {
            var data0 = data.version;
            var _errs8 = errors;
            var valid3 = false;
            var _errs9 = errors;
            if (data0 !== null) {
                var err8 = {};
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
                var _errs11 = errors;
                if (1 !== data0) {
                    var err9 = {};
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
                var err10 = {};
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
    }
    var _valid1 = _errs6 === errors;
    errors = _errs5;
    if (vErrors !== null) {
        if (_errs5) {
            vErrors.length = _errs5;
        }
        else {
            vErrors = null;
        }
    }
    var ifClause0;
    if (_valid1) {
        var _errs12 = errors;
        if (data && typeof data == "object" && !Array.isArray(data)) {
            if (data.type === undefined) {
                var err11 = { instancePath: instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property '" + "type" + "'", schema: schema72.then.required, parentSchema: schema72.then, data: data };
                if (vErrors === null) {
                    vErrors = [err11];
                }
                else {
                    vErrors.push(err11);
                }
                errors++;
            }
            if (data.senderPublicKey === undefined) {
                var err12 = { instancePath: instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "senderPublicKey" }, message: "must have required property '" + "senderPublicKey" + "'", schema: schema72.then.required, parentSchema: schema72.then, data: data };
                if (vErrors === null) {
                    vErrors = [err12];
                }
                else {
                    vErrors.push(err12);
                }
                errors++;
            }
            if (data.fee === undefined) {
                var err13 = { instancePath: instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "fee" }, message: "must have required property '" + "fee" + "'", schema: schema72.then.required, parentSchema: schema72.then, data: data };
                if (vErrors === null) {
                    vErrors = [err13];
                }
                else {
                    vErrors.push(err13);
                }
                errors++;
            }
            if (data.amount === undefined) {
                var err14 = { instancePath: instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "amount" }, message: "must have required property '" + "amount" + "'", schema: schema72.then.required, parentSchema: schema72.then, data: data };
                if (vErrors === null) {
                    vErrors = [err14];
                }
                else {
                    vErrors.push(err14);
                }
                errors++;
            }
            if (data.timestamp === undefined) {
                var err15 = { instancePath: instancePath, schemaPath: "#/then/required", keyword: "required", params: { missingProperty: "timestamp" }, message: "must have required property '" + "timestamp" + "'", schema: schema72.then.required, parentSchema: schema72.then, data: data };
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
        var _errs13 = errors;
        if (data && typeof data == "object" && !Array.isArray(data)) {
            if (data.type === undefined) {
                var err16 = { instancePath: instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property '" + "type" + "'", schema: schema72.else.required, parentSchema: schema72.else, data: data };
                if (vErrors === null) {
                    vErrors = [err16];
                }
                else {
                    vErrors.push(err16);
                }
                errors++;
            }
            if (data.senderPublicKey === undefined) {
                var err17 = { instancePath: instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "senderPublicKey" }, message: "must have required property '" + "senderPublicKey" + "'", schema: schema72.else.required, parentSchema: schema72.else, data: data };
                if (vErrors === null) {
                    vErrors = [err17];
                }
                else {
                    vErrors.push(err17);
                }
                errors++;
            }
            if (data.fee === undefined) {
                var err18 = { instancePath: instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "fee" }, message: "must have required property '" + "fee" + "'", schema: schema72.else.required, parentSchema: schema72.else, data: data };
                if (vErrors === null) {
                    vErrors = [err18];
                }
                else {
                    vErrors.push(err18);
                }
                errors++;
            }
            if (data.amount === undefined) {
                var err19 = { instancePath: instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "amount" }, message: "must have required property '" + "amount" + "'", schema: schema72.else.required, parentSchema: schema72.else, data: data };
                if (vErrors === null) {
                    vErrors = [err19];
                }
                else {
                    vErrors.push(err19);
                }
                errors++;
            }
            if (data.nonce === undefined) {
                var err20 = { instancePath: instancePath, schemaPath: "#/else/required", keyword: "required", params: { missingProperty: "nonce" }, message: "must have required property '" + "nonce" + "'", schema: schema72.else.required, parentSchema: schema72.else, data: data };
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
    }
    if (!valid1) {
        var err21 = { instancePath: instancePath, schemaPath: "#/if", keyword: "if", params: { failingKeyword: ifClause0 }, message: "must match \"" + ifClause0 + "\" schema", schema: schema72.if, parentSchema: schema72, data: data };
        if (vErrors === null) {
            vErrors = [err21];
        }
        else {
            vErrors.push(err21);
        }
        errors++;
    }
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.asset === undefined) {
            var err22 = { instancePath: instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "asset" }, message: "must have required property '" + "asset" + "'", schema: schema72.required, parentSchema: schema72, data: data };
            if (vErrors === null) {
                vErrors = [err22];
            }
            else {
                vErrors.push(err22);
            }
            errors++;
        }
        if (data.id !== undefined) {
            var data3 = data.id;
            var _errs17 = errors;
            var valid5 = false;
            var _errs18 = errors;
            if (!(validate35(data3, { instancePath: instancePath + "/id", parentData: data, parentDataProperty: "id", rootData: rootData }))) {
                vErrors = vErrors === null ? validate35.errors : vErrors.concat(validate35.errors);
                errors = vErrors.length;
            }
            var _valid3 = _errs18 === errors;
            valid5 = valid5 || _valid3;
            if (!valid5) {
                var _errs19 = errors;
                if (data3 !== null) {
                    var err23 = { instancePath: instancePath + "/id", schemaPath: "#/properties/id/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null", schema: schema72.properties.id.anyOf[1].type, parentSchema: schema72.properties.id.anyOf[1], data: data3 };
                    if (vErrors === null) {
                        vErrors = [err23];
                    }
                    else {
                        vErrors.push(err23);
                    }
                    errors++;
                }
                var _valid3 = _errs19 === errors;
                valid5 = valid5 || _valid3;
            }
            if (!valid5) {
                var err24 = { instancePath: instancePath + "/id", schemaPath: "#/properties/id/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf", schema: schema72.properties.id.anyOf, parentSchema: schema72.properties.id, data: data3 };
                if (vErrors === null) {
                    vErrors = [err24];
                }
                else {
                    vErrors.push(err24);
                }
                errors++;
            }
            else {
                errors = _errs17;
                if (vErrors !== null) {
                    if (_errs17) {
                        vErrors.length = _errs17;
                    }
                    else {
                        vErrors = null;
                    }
                }
            }
        }
        if (data.secondSignature !== undefined) {
            var data6 = data.secondSignature;
            if (typeof data6 === "string") {
                if (!pattern2.test(data6)) {
                    var err25 = { instancePath: instancePath + "/secondSignature", schemaPath: "alphanumeric/pattern", keyword: "pattern", params: { pattern: "^[a-zA-Z0-9]+$" }, message: "must match pattern \"" + "^[a-zA-Z0-9]+$" + "\"", schema: "^[a-zA-Z0-9]+$", parentSchema: schema48, data: data6 };
                    if (vErrors === null) {
                        vErrors = [err25];
                    }
                    else {
                        vErrors.push(err25);
                    }
                    errors++;
                }
            }
            else {
                var err26 = { instancePath: instancePath + "/secondSignature", schemaPath: "alphanumeric/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema48.type, parentSchema: schema48, data: data6 };
                if (vErrors === null) {
                    vErrors = [err26];
                }
                else {
                    vErrors.push(err26);
                }
                errors++;
            }
        }
        if (data.senderPublicKey !== undefined) {
            if (!(validate38(data.senderPublicKey, { instancePath: instancePath + "/senderPublicKey", parentData: data, parentDataProperty: "senderPublicKey", rootData: rootData }))) {
                vErrors = vErrors === null ? validate38.errors : vErrors.concat(validate38.errors);
                errors = vErrors.length;
            }
        }
        if (data.signSignature !== undefined) {
            var data8 = data.signSignature;
            if (typeof data8 === "string") {
                if (!pattern2.test(data8)) {
                    var err27 = { instancePath: instancePath + "/signSignature", schemaPath: "alphanumeric/pattern", keyword: "pattern", params: { pattern: "^[a-zA-Z0-9]+$" }, message: "must match pattern \"" + "^[a-zA-Z0-9]+$" + "\"", schema: "^[a-zA-Z0-9]+$", parentSchema: schema48, data: data8 };
                    if (vErrors === null) {
                        vErrors = [err27];
                    }
                    else {
                        vErrors.push(err27);
                    }
                    errors++;
                }
            }
            else {
                var err28 = { instancePath: instancePath + "/signSignature", schemaPath: "alphanumeric/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema48.type, parentSchema: schema48, data: data8 };
                if (vErrors === null) {
                    vErrors = [err28];
                }
                else {
                    vErrors.push(err28);
                }
                errors++;
            }
        }
        if (data.signature !== undefined) {
            var data9 = data.signature;
            if (typeof data9 === "string") {
                if (!pattern2.test(data9)) {
                    var err29 = { instancePath: instancePath + "/signature", schemaPath: "alphanumeric/pattern", keyword: "pattern", params: { pattern: "^[a-zA-Z0-9]+$" }, message: "must match pattern \"" + "^[a-zA-Z0-9]+$" + "\"", schema: "^[a-zA-Z0-9]+$", parentSchema: schema48, data: data9 };
                    if (vErrors === null) {
                        vErrors = [err29];
                    }
                    else {
                        vErrors.push(err29);
                    }
                    errors++;
                }
            }
            else {
                var err30 = { instancePath: instancePath + "/signature", schemaPath: "alphanumeric/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema48.type, parentSchema: schema48, data: data9 };
                if (vErrors === null) {
                    vErrors = [err30];
                }
                else {
                    vErrors.push(err30);
                }
                errors++;
            }
        }
        if (data.version !== undefined) {
            var data10 = data.version;
            if (!((data10 === 1) || (data10 === 2))) {
                var err31 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/enum", keyword: "enum", params: { allowedValues: schema72.properties.version.enum }, message: "must be equal to one of the allowed values", schema: schema72.properties.version.enum, parentSchema: schema72.properties.version, data: data10 };
                if (vErrors === null) {
                    vErrors = [err31];
                }
                else {
                    vErrors.push(err31);
                }
                errors++;
            }
            var _errs35 = errors;
            var valid10 = false;
            var _errs36 = errors;
            if (data10 !== null) {
                var err32 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/anyOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null", schema: schema72.properties.version.anyOf[0].type, parentSchema: schema72.properties.version.anyOf[0], data: data10 };
                if (vErrors === null) {
                    vErrors = [err32];
                }
                else {
                    vErrors.push(err32);
                }
                errors++;
            }
            var _valid4 = _errs36 === errors;
            valid10 = valid10 || _valid4;
            if (!valid10) {
                var _errs38 = errors;
                if (1 !== data10) {
                    var err33 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/anyOf/1/const", keyword: "const", params: { allowedValue: 1 }, message: "must be equal to constant", schema: 1, parentSchema: schema72.properties.version.anyOf[1], data: data10 };
                    if (vErrors === null) {
                        vErrors = [err33];
                    }
                    else {
                        vErrors.push(err33);
                    }
                    errors++;
                }
                var _valid4 = _errs38 === errors;
                valid10 = valid10 || _valid4;
            }
            if (!valid10) {
                var err34 = { instancePath: instancePath + "/version", schemaPath: "#/properties/version/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf", schema: schema72.properties.version.anyOf, parentSchema: schema72.properties.version, data: data10 };
                if (vErrors === null) {
                    vErrors = [err34];
                }
                else {
                    vErrors.push(err34);
                }
                errors++;
            }
            else {
                errors = _errs35;
                if (vErrors !== null) {
                    if (_errs35) {
                        vErrors.length = _errs35;
                    }
                    else {
                        vErrors = null;
                    }
                }
            }
        }
        if (data.timestamp !== undefined) {
            var data11 = data.timestamp;
            if (!(((typeof data11 == "number") && (!(data11 % 1) && !isNaN(data11))) && (isFinite(data11)))) {
                var err35 = { instancePath: instancePath + "/timestamp", schemaPath: "#/properties/timestamp/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema72.properties.timestamp.type, parentSchema: schema72.properties.timestamp, data: data11 };
                if (vErrors === null) {
                    vErrors = [err35];
                }
                else {
                    vErrors.push(err35);
                }
                errors++;
            }
            if ((typeof data11 == "number") && (isFinite(data11))) {
                if (data11 < 0 || isNaN(data11)) {
                    var err36 = { instancePath: instancePath + "/timestamp", schemaPath: "#/properties/timestamp/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0", schema: 0, parentSchema: schema72.properties.timestamp, data: data11 };
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
        if (data.typeGroup !== undefined) {
            var data12 = data.typeGroup;
            if (!(((typeof data12 == "number") && (!(data12 % 1) && !isNaN(data12))) && (isFinite(data12)))) {
                var err37 = { instancePath: instancePath + "/typeGroup", schemaPath: "#/properties/typeGroup/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema72.properties.typeGroup.type, parentSchema: schema72.properties.typeGroup, data: data12 };
                if (vErrors === null) {
                    vErrors = [err37];
                }
                else {
                    vErrors.push(err37);
                }
                errors++;
            }
            if ((typeof data12 == "number") && (isFinite(data12))) {
                if (data12 < 0 || isNaN(data12)) {
                    var err38 = { instancePath: instancePath + "/typeGroup", schemaPath: "#/properties/typeGroup/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0", schema: 0, parentSchema: schema72.properties.typeGroup, data: data12 };
                    if (vErrors === null) {
                        vErrors = [err38];
                    }
                    else {
                        vErrors.push(err38);
                    }
                    errors++;
                }
            }
        }
        if (data.asset !== undefined) {
            var data13 = data.asset;
            if (data13 && typeof data13 == "object" && !Array.isArray(data13)) {
                if (data13.multiSignatureLegacy === undefined) {
                    var err39 = { instancePath: instancePath + "/asset", schemaPath: "#/properties/asset/required", keyword: "required", params: { missingProperty: "multiSignatureLegacy" }, message: "must have required property '" + "multiSignatureLegacy" + "'", schema: schema72.properties.asset.required, parentSchema: schema72.properties.asset, data: data13 };
                    if (vErrors === null) {
                        vErrors = [err39];
                    }
                    else {
                        vErrors.push(err39);
                    }
                    errors++;
                }
                if (data13.multiSignatureLegacy !== undefined) {
                    var data14 = data13.multiSignatureLegacy;
                    if (data14 && typeof data14 == "object" && !Array.isArray(data14)) {
                        if (data14.keysgroup === undefined) {
                            var err40 = { instancePath: instancePath + "/asset/multiSignatureLegacy", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/required", keyword: "required", params: { missingProperty: "keysgroup" }, message: "must have required property '" + "keysgroup" + "'", schema: schema72.properties.asset.properties.multiSignatureLegacy.required, parentSchema: schema72.properties.asset.properties.multiSignatureLegacy, data: data14 };
                            if (vErrors === null) {
                                vErrors = [err40];
                            }
                            else {
                                vErrors.push(err40);
                            }
                            errors++;
                        }
                        if (data14.min === undefined) {
                            var err41 = { instancePath: instancePath + "/asset/multiSignatureLegacy", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/required", keyword: "required", params: { missingProperty: "min" }, message: "must have required property '" + "min" + "'", schema: schema72.properties.asset.properties.multiSignatureLegacy.required, parentSchema: schema72.properties.asset.properties.multiSignatureLegacy, data: data14 };
                            if (vErrors === null) {
                                vErrors = [err41];
                            }
                            else {
                                vErrors.push(err41);
                            }
                            errors++;
                        }
                        if (data14.lifetime === undefined) {
                            var err42 = { instancePath: instancePath + "/asset/multiSignatureLegacy", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/required", keyword: "required", params: { missingProperty: "lifetime" }, message: "must have required property '" + "lifetime" + "'", schema: schema72.properties.asset.properties.multiSignatureLegacy.required, parentSchema: schema72.properties.asset.properties.multiSignatureLegacy, data: data14 };
                            if (vErrors === null) {
                                vErrors = [err42];
                            }
                            else {
                                vErrors.push(err42);
                            }
                            errors++;
                        }
                        if (data14.lifetime !== undefined) {
                            var data15 = data14.lifetime;
                            if (!(((typeof data15 == "number") && (!(data15 % 1) && !isNaN(data15))) && (isFinite(data15)))) {
                                var err43 = { instancePath: instancePath + "/asset/multiSignatureLegacy/lifetime", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/lifetime/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema72.properties.asset.properties.multiSignatureLegacy.properties.lifetime.type, parentSchema: schema72.properties.asset.properties.multiSignatureLegacy.properties.lifetime, data: data15 };
                                if (vErrors === null) {
                                    vErrors = [err43];
                                }
                                else {
                                    vErrors.push(err43);
                                }
                                errors++;
                            }
                            if ((typeof data15 == "number") && (isFinite(data15))) {
                                if (data15 > 72 || isNaN(data15)) {
                                    var err44 = { instancePath: instancePath + "/asset/multiSignatureLegacy/lifetime", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/lifetime/maximum", keyword: "maximum", params: { comparison: "<=", limit: 72 }, message: "must be <= 72", schema: 72, parentSchema: schema72.properties.asset.properties.multiSignatureLegacy.properties.lifetime, data: data15 };
                                    if (vErrors === null) {
                                        vErrors = [err44];
                                    }
                                    else {
                                        vErrors.push(err44);
                                    }
                                    errors++;
                                }
                                if (data15 < 1 || isNaN(data15)) {
                                    var err45 = { instancePath: instancePath + "/asset/multiSignatureLegacy/lifetime", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/lifetime/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1", schema: 1, parentSchema: schema72.properties.asset.properties.multiSignatureLegacy.properties.lifetime, data: data15 };
                                    if (vErrors === null) {
                                        vErrors = [err45];
                                    }
                                    else {
                                        vErrors.push(err45);
                                    }
                                    errors++;
                                }
                            }
                        }
                        if (data14.keysgroup !== undefined) {
                            var data16 = data14.keysgroup;
                            if (Array.isArray(data16)) {
                                if (data16.length > 16) {
                                    var err46 = { instancePath: instancePath + "/asset/multiSignatureLegacy/keysgroup", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/keysgroup/maxItems", keyword: "maxItems", params: { limit: 16 }, message: "must NOT have more than 16 items", schema: 16, parentSchema: schema72.properties.asset.properties.multiSignatureLegacy.properties.keysgroup, data: data16 };
                                    if (vErrors === null) {
                                        vErrors = [err46];
                                    }
                                    else {
                                        vErrors.push(err46);
                                    }
                                    errors++;
                                }
                                if (data16.length < 1) {
                                    var err47 = { instancePath: instancePath + "/asset/multiSignatureLegacy/keysgroup", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/keysgroup/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items", schema: 1, parentSchema: schema72.properties.asset.properties.multiSignatureLegacy.properties.keysgroup, data: data16 };
                                    if (vErrors === null) {
                                        vErrors = [err47];
                                    }
                                    else {
                                        vErrors.push(err47);
                                    }
                                    errors++;
                                }
                                var len0 = data16.length;
                                for (var i0 = 0; i0 < len0; i0++) {
                                    var data17 = data16[i0];
                                    if (typeof data17 !== "string") {
                                        var err48 = { instancePath: instancePath + "/asset/multiSignatureLegacy/keysgroup/" + i0, schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/keysgroup/items/allOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema72.properties.asset.properties.multiSignatureLegacy.properties.keysgroup.items.allOf[0].type, parentSchema: schema72.properties.asset.properties.multiSignatureLegacy.properties.keysgroup.items.allOf[0], data: data17 };
                                        if (vErrors === null) {
                                            vErrors = [err48];
                                        }
                                        else {
                                            vErrors.push(err48);
                                        }
                                        errors++;
                                    }
                                    if (typeof data17 == "string" && data16 !== undefined) {
                                        data17 = func8(data17);
                                        data16[i0] = data17;
                                    }
                                    if ((typeof data17 == "number") && (isFinite(data17))) {
                                        if (data17 > 67 || isNaN(data17)) {
                                            var err49 = { instancePath: instancePath + "/asset/multiSignatureLegacy/keysgroup/" + i0, schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/keysgroup/items/allOf/0/maximum", keyword: "maximum", params: { comparison: "<=", limit: 67 }, message: "must be <= 67", schema: 67, parentSchema: schema72.properties.asset.properties.multiSignatureLegacy.properties.keysgroup.items.allOf[0], data: data17 };
                                            if (vErrors === null) {
                                                vErrors = [err49];
                                            }
                                            else {
                                                vErrors.push(err49);
                                            }
                                            errors++;
                                        }
                                        if (data17 < 67 || isNaN(data17)) {
                                            var err50 = { instancePath: instancePath + "/asset/multiSignatureLegacy/keysgroup/" + i0, schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/keysgroup/items/allOf/0/minimum", keyword: "minimum", params: { comparison: ">=", limit: 67 }, message: "must be >= 67", schema: 67, parentSchema: schema72.properties.asset.properties.multiSignatureLegacy.properties.keysgroup.items.allOf[0], data: data17 };
                                            if (vErrors === null) {
                                                vErrors = [err50];
                                            }
                                            else {
                                                vErrors.push(err50);
                                            }
                                            errors++;
                                        }
                                    }
                                }
                            }
                            else {
                                var err51 = { instancePath: instancePath + "/asset/multiSignatureLegacy/keysgroup", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/keysgroup/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema72.properties.asset.properties.multiSignatureLegacy.properties.keysgroup.type, parentSchema: schema72.properties.asset.properties.multiSignatureLegacy.properties.keysgroup, data: data16 };
                                if (vErrors === null) {
                                    vErrors = [err51];
                                }
                                else {
                                    vErrors.push(err51);
                                }
                                errors++;
                            }
                        }
                        if (data14.min !== undefined) {
                            var data18 = data14.min;
                            if (!(((typeof data18 == "number") && (!(data18 % 1) && !isNaN(data18))) && (isFinite(data18)))) {
                                var err52 = { instancePath: instancePath + "/asset/multiSignatureLegacy/min", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/min/type", keyword: "type", params: { type: "integer" }, message: "must be integer", schema: schema72.properties.asset.properties.multiSignatureLegacy.properties.min.type, parentSchema: schema72.properties.asset.properties.multiSignatureLegacy.properties.min, data: data18 };
                                if (vErrors === null) {
                                    vErrors = [err52];
                                }
                                else {
                                    vErrors.push(err52);
                                }
                                errors++;
                            }
                            if ((typeof data18 == "number") && (isFinite(data18))) {
                                var vSchema1 = data14 && data14.keysgroup && data14.keysgroup.length;
                                if (vSchema1 !== undefined && ((!((typeof vSchema1 == "number") && (isFinite(vSchema1)))) || (data18 > vSchema1 || isNaN(data18)))) {
                                    var err53 = { instancePath: instancePath + "/asset/multiSignatureLegacy/min", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/min/maximum", keyword: "maximum", params: { comparison: "<=", limit: vSchema1 }, message: "must be <= " + vSchema1, schema: schema72.properties.asset.properties.multiSignatureLegacy.properties.min.maximum, parentSchema: schema72.properties.asset.properties.multiSignatureLegacy.properties.min, data: data18 };
                                    if (vErrors === null) {
                                        vErrors = [err53];
                                    }
                                    else {
                                        vErrors.push(err53);
                                    }
                                    errors++;
                                }
                                if (data18 < 1 || isNaN(data18)) {
                                    var err54 = { instancePath: instancePath + "/asset/multiSignatureLegacy/min", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/properties/min/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1", schema: 1, parentSchema: schema72.properties.asset.properties.multiSignatureLegacy.properties.min, data: data18 };
                                    if (vErrors === null) {
                                        vErrors = [err54];
                                    }
                                    else {
                                        vErrors.push(err54);
                                    }
                                    errors++;
                                }
                            }
                        }
                    }
                    else {
                        var err55 = { instancePath: instancePath + "/asset/multiSignatureLegacy", schemaPath: "#/properties/asset/properties/multiSignatureLegacy/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema72.properties.asset.properties.multiSignatureLegacy.type, parentSchema: schema72.properties.asset.properties.multiSignatureLegacy, data: data14 };
                        if (vErrors === null) {
                            vErrors = [err55];
                        }
                        else {
                            vErrors.push(err55);
                        }
                        errors++;
                    }
                }
            }
            else {
                var err56 = { instancePath: instancePath + "/asset", schemaPath: "#/properties/asset/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema72.properties.asset.type, parentSchema: schema72.properties.asset, data: data13 };
                if (vErrors === null) {
                    vErrors = [err56];
                }
                else {
                    vErrors.push(err56);
                }
                errors++;
            }
        }
        if (data.signatures !== undefined) {
            var data19 = data.signatures;
            if (Array.isArray(data19)) {
                if (data19.length > 1) {
                    var err57 = { instancePath: instancePath + "/signatures", schemaPath: "#/properties/signatures/maxItems", keyword: "maxItems", params: { limit: 1 }, message: "must NOT have more than 1 items", schema: 1, parentSchema: schema72.properties.signatures, data: data19 };
                    if (vErrors === null) {
                        vErrors = [err57];
                    }
                    else {
                        vErrors.push(err57);
                    }
                    errors++;
                }
                if (data19.length < 1) {
                    var err58 = { instancePath: instancePath + "/signatures", schemaPath: "#/properties/signatures/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items", schema: 1, parentSchema: schema72.properties.signatures, data: data19 };
                    if (vErrors === null) {
                        vErrors = [err58];
                    }
                    else {
                        vErrors.push(err58);
                    }
                    errors++;
                }
                var len1 = data19.length;
                for (var i1 = 0; i1 < len1; i1++) {
                    var data20 = data19[i1];
                    if (typeof data20 === "string") {
                        if (!pattern2.test(data20)) {
                            var err59 = { instancePath: instancePath + "/signatures/" + i1, schemaPath: "alphanumeric/pattern", keyword: "pattern", params: { pattern: "^[a-zA-Z0-9]+$" }, message: "must match pattern \"" + "^[a-zA-Z0-9]+$" + "\"", schema: "^[a-zA-Z0-9]+$", parentSchema: schema48, data: data20 };
                            if (vErrors === null) {
                                vErrors = [err59];
                            }
                            else {
                                vErrors.push(err59);
                            }
                            errors++;
                        }
                    }
                    else {
                        var err60 = { instancePath: instancePath + "/signatures/" + i1, schemaPath: "alphanumeric/type", keyword: "type", params: { type: "string" }, message: "must be string", schema: schema48.type, parentSchema: schema48, data: data20 };
                        if (vErrors === null) {
                            vErrors = [err60];
                        }
                        else {
                            vErrors.push(err60);
                        }
                        errors++;
                    }
                }
            }
            else {
                var err61 = { instancePath: instancePath + "/signatures", schemaPath: "#/properties/signatures/type", keyword: "type", params: { type: "array" }, message: "must be array", schema: schema72.properties.signatures.type, parentSchema: schema72.properties.signatures, data: data19 };
                if (vErrors === null) {
                    vErrors = [err61];
                }
                else {
                    vErrors.push(err61);
                }
                errors++;
            }
        }
    }
    else {
        var err62 = { instancePath: instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object", schema: schema72.type, parentSchema: schema72, data: data };
        if (vErrors === null) {
            vErrors = [err62];
        }
        else {
            vErrors.push(err62);
        }
        errors++;
    }
    validate49.errors = vErrors;
    return errors === 0;
}
export { validate32 as hex };
export { validate33 as base58 };
export { validate34 as alphanumeric };
export { validate35 as transactionId };
export { validate36 as networkByte };
export { validate37 as address };
export { validate38 as publicKey };
export { validate39 as walletVote };
export { validate40 as delegateUsername };
export { validate41 as genericName };
export { validate42 as uri };
export { validate43 as multiSignatureLegacy };
export { validate46 as multiSignatureLegacyStrict };
export { validate49 as multiSignatureLegacySigned };
