'use strict';
import ucs2length from 'ajv/lib/compile/ucs2length'
import equal from 'ajv/lib/compile/equal';

var validate = (function() {
  var pattern0 = new RegExp('^[a-zA-Z0-9]+$');
  var refVal = [];
  var refVal1 = (function() {
    var pattern0 = new RegExp('^[0123456789A-Fa-f]+$');
    var refVal = [];
    var refVal1 = {
      "$id": "hex",
      "type": "string",
      "pattern": "^[0123456789A-Fa-f]+$"
    };
    refVal[1] = refVal1;
    return function validate(data, dataPath, parentData, parentDataProperty, rootData) {
      'use strict'; /*# sourceURL=transactionId */
      var vErrors = null;
      var errors = 0;
      if (rootData === undefined) rootData = data;
      var errs_1 = errors;
      if (typeof data === "string") {
        if (ucs2length(data) > 64) {
          var err = {
            keyword: 'maxLength',
            dataPath: (dataPath || '') + "",
            schemaPath: '#/allOf/0/maxLength',
            params: {
              limit: 64
            },
            message: 'should NOT be longer than 64 characters'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        if (ucs2length(data) < 64) {
          var err = {
            keyword: 'minLength',
            dataPath: (dataPath || '') + "",
            schemaPath: '#/allOf/0/minLength',
            params: {
              limit: 64
            },
            message: 'should NOT be shorter than 64 characters'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
      }
      var valid1 = errors === errs_1;
      var errs_1 = errors;
      var errs_2 = errors;
      if (typeof data === "string") {
        if (!pattern0.test(data)) {
          var err = {
            keyword: 'pattern',
            dataPath: (dataPath || '') + "",
            schemaPath: 'hex/pattern',
            params: {
              pattern: '^[0123456789A-Fa-f]+$'
            },
            message: 'should match pattern "^[0123456789A-Fa-f]+$"'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
      } else {
        var err = {
          keyword: 'type',
          dataPath: (dataPath || '') + "",
          schemaPath: 'hex/type',
          params: {
            type: 'string'
          },
          message: 'should be string'
        };
        if (vErrors === null) vErrors = [err];
        else vErrors.push(err);
        errors++;
      }
      var valid2 = errors === errs_2;
      var valid1 = errors === errs_1;
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal1.schema = {
    "$id": "transactionId",
    "allOf": [{
      "minLength": 64,
      "maxLength": 64
    }, {
      "$ref": "hex"
    }]
  };
  refVal1.errors = null;
  refVal[1] = refVal1;
  var refVal2 = {
    "$id": "networkByte",
    "network": true
  };
  refVal[2] = refVal2;
  var refVal3 = {
    "$id": "alphanumeric",
    "type": "string",
    "pattern": "^[a-zA-Z0-9]+$"
  };
  refVal[3] = refVal3;
  var refVal4 = (function() {
    var pattern0 = new RegExp('^[0123456789A-Fa-f]+$');
    var refVal = [];
    var refVal1 = {
      "$id": "hex",
      "type": "string",
      "pattern": "^[0123456789A-Fa-f]+$"
    };
    refVal[1] = refVal1;
    return function validate(data, dataPath, parentData, parentDataProperty, rootData) {
      'use strict'; /*# sourceURL=publicKey */
      var vErrors = null;
      var errors = 0;
      if (rootData === undefined) rootData = data;
      var errs_1 = errors;
      if (typeof data === "string") {
        if (ucs2length(data) > 66) {
          var err = {
            keyword: 'maxLength',
            dataPath: (dataPath || '') + "",
            schemaPath: '#/allOf/0/maxLength',
            params: {
              limit: 66
            },
            message: 'should NOT be longer than 66 characters'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        if (ucs2length(data) < 66) {
          var err = {
            keyword: 'minLength',
            dataPath: (dataPath || '') + "",
            schemaPath: '#/allOf/0/minLength',
            params: {
              limit: 66
            },
            message: 'should NOT be shorter than 66 characters'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
      }
      var valid1 = errors === errs_1;
      var errs_1 = errors;
      var errs_2 = errors;
      if (typeof data === "string") {
        if (!pattern0.test(data)) {
          var err = {
            keyword: 'pattern',
            dataPath: (dataPath || '') + "",
            schemaPath: 'hex/pattern',
            params: {
              pattern: '^[0123456789A-Fa-f]+$'
            },
            message: 'should match pattern "^[0123456789A-Fa-f]+$"'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
      } else {
        var err = {
          keyword: 'type',
          dataPath: (dataPath || '') + "",
          schemaPath: 'hex/type',
          params: {
            type: 'string'
          },
          message: 'should be string'
        };
        if (vErrors === null) vErrors = [err];
        else vErrors.push(err);
        errors++;
      }
      var valid2 = errors === errs_2;
      var valid1 = errors === errs_1;
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal4.schema = {
    "$id": "publicKey",
    "allOf": [{
      "minLength": 66,
      "maxLength": 66
    }, {
      "$ref": "hex"
    }, {
      "transform": ["toLowerCase"]
    }]
  };
  refVal4.errors = null;
  refVal[4] = refVal4;
  return function validate(data, dataPath, parentData, parentDataProperty, rootData) {
    'use strict'; /*# sourceURL=delegateResignation */
    var vErrors = null;
    var errors = 0;
    if (rootData === undefined) rootData = data;
    if ((data && typeof data === "object" && !Array.isArray(data))) {
      var errs__0 = errors;
      var valid1 = true;
      var data1 = data.id;
      if (data1 !== undefined) {
        var errs_1 = errors;
        var errs__1 = errors;
        var valid1 = false;
        var errs_2 = errors;
        if (!refVal1(data1, (dataPath || '') + '.id', data, 'id', rootData)) {
          if (vErrors === null) vErrors = refVal1.errors;
          else vErrors = vErrors.concat(refVal1.errors);
          errors = vErrors.length;
        }
        var valid2 = errors === errs_2;
        valid1 = valid1 || valid2;
        if (!valid1) {
          var errs_2 = errors;
          if (data1 !== null) {
            var err = {
              keyword: 'type',
              dataPath: (dataPath || '') + '.id',
              schemaPath: '#/properties/id/anyOf/1/type',
              params: {
                type: 'null'
              },
              message: 'should be null'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
          var valid2 = errors === errs_2;
          valid1 = valid1 || valid2;
          if (!valid1) {}
        }
        if (!valid1) {
          var err = {
            keyword: 'anyOf',
            dataPath: (dataPath || '') + '.id',
            schemaPath: '#/properties/id/anyOf',
            params: {},
            message: 'should match some schema in anyOf'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        } else {
          errors = errs__1;
          if (vErrors !== null) {
            if (errs__1) vErrors.length = errs__1;
            else vErrors = null;
          }
        }
        var valid1 = errors === errs_1;
      }
      if (data.network !== undefined) {
        var errs_1 = errors;
        var valid2 = true;
        var valid1 = errors === errs_1;
      }
      var data1 = data.secondSignature;
      if (data1 !== undefined) {
        var errs_1 = errors;
        var errs_2 = errors;
        if (typeof data1 === "string") {
          if (!pattern0.test(data1)) {
            var err = {
              keyword: 'pattern',
              dataPath: (dataPath || '') + '.secondSignature',
              schemaPath: 'alphanumeric/pattern',
              params: {
                pattern: '^[a-zA-Z0-9]+$'
              },
              message: 'should match pattern "^[a-zA-Z0-9]+$"'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.secondSignature',
            schemaPath: 'alphanumeric/type',
            params: {
              type: 'string'
            },
            message: 'should be string'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid2 = errors === errs_2;
        var valid1 = errors === errs_1;
      }
      if (data.senderPublicKey !== undefined) {
        var errs_1 = errors;
        if (!refVal4(data.senderPublicKey, (dataPath || '') + '.senderPublicKey', data, 'senderPublicKey', rootData)) {
          if (vErrors === null) vErrors = refVal4.errors;
          else vErrors = vErrors.concat(refVal4.errors);
          errors = vErrors.length;
        }
        var valid1 = errors === errs_1;
      }
      var data1 = data.signSignature;
      if (data1 !== undefined) {
        var errs_1 = errors;
        var errs_2 = errors;
        if (typeof data1 === "string") {
          if (!pattern0.test(data1)) {
            var err = {
              keyword: 'pattern',
              dataPath: (dataPath || '') + '.signSignature',
              schemaPath: 'alphanumeric/pattern',
              params: {
                pattern: '^[a-zA-Z0-9]+$'
              },
              message: 'should match pattern "^[a-zA-Z0-9]+$"'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.signSignature',
            schemaPath: 'alphanumeric/type',
            params: {
              type: 'string'
            },
            message: 'should be string'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid2 = errors === errs_2;
        var valid1 = errors === errs_1;
      }
      var data1 = data.signature;
      if (data1 !== undefined) {
        var errs_1 = errors;
        var errs_2 = errors;
        if (typeof data1 === "string") {
          if (!pattern0.test(data1)) {
            var err = {
              keyword: 'pattern',
              dataPath: (dataPath || '') + '.signature',
              schemaPath: 'alphanumeric/pattern',
              params: {
                pattern: '^[a-zA-Z0-9]+$'
              },
              message: 'should match pattern "^[a-zA-Z0-9]+$"'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.signature',
            schemaPath: 'alphanumeric/type',
            params: {
              type: 'string'
            },
            message: 'should be string'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid2 = errors === errs_2;
        var valid1 = errors === errs_1;
      }
      if (data.version !== undefined) {
        var errs_1 = errors;
        var schema1 = validate.schema.properties.version.enum;
        var valid1;
        valid1 = false;
        for (var i1 = 0; i1 < schema1.length; i1++)
          if (equal(data.version, schema1[i1])) {
            valid1 = true;
            break;
          } if (!valid1) {
          var err = {
            keyword: 'enum',
            dataPath: (dataPath || '') + '.version',
            schemaPath: '#/properties/version/enum',
            params: {
              allowedValues: schema1
            },
            message: 'should be equal to one of the allowed values'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid1 = errors === errs_1;
      }
      var data1 = data.signatures;
      if (data1 !== undefined) {
        var errs_1 = errors;
        if (Array.isArray(data1)) {
          if (data1.length > 16) {
            var err = {
              keyword: 'maxItems',
              dataPath: (dataPath || '') + '.signatures',
              schemaPath: '#/properties/signatures/maxItems',
              params: {
                limit: 16
              },
              message: 'should NOT have more than 16 items'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
          if (data1.length < 1) {
            var err = {
              keyword: 'minItems',
              dataPath: (dataPath || '') + '.signatures',
              schemaPath: '#/properties/signatures/minItems',
              params: {
                limit: 1
              },
              message: 'should NOT have fewer than 1 items'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
          var errs__1 = errors;
          var valid1;
          for (var i1 = 0; i1 < data1.length; i1++) {
            var data2 = data1[i1];
            var errs_2 = errors;
            var errs_3 = errors;
            if (typeof data2 === "string") {
              if (ucs2length(data2) > 130) {
                var err = {
                  keyword: 'maxLength',
                  dataPath: (dataPath || '') + '.signatures[' + i1 + ']',
                  schemaPath: '#/properties/signatures/items/allOf/0/maxLength',
                  params: {
                    limit: 130
                  },
                  message: 'should NOT be longer than 130 characters'
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              }
              if (ucs2length(data2) < 130) {
                var err = {
                  keyword: 'minLength',
                  dataPath: (dataPath || '') + '.signatures[' + i1 + ']',
                  schemaPath: '#/properties/signatures/items/allOf/0/minLength',
                  params: {
                    limit: 130
                  },
                  message: 'should NOT be shorter than 130 characters'
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              }
            }
            var valid3 = errors === errs_3;
            var errs_3 = errors;
            var errs_4 = errors;
            if (typeof data2 === "string") {
              if (!pattern0.test(data2)) {
                var err = {
                  keyword: 'pattern',
                  dataPath: (dataPath || '') + '.signatures[' + i1 + ']',
                  schemaPath: 'alphanumeric/pattern',
                  params: {
                    pattern: '^[a-zA-Z0-9]+$'
                  },
                  message: 'should match pattern "^[a-zA-Z0-9]+$"'
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              }
            } else {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.signatures[' + i1 + ']',
                schemaPath: 'alphanumeric/type',
                params: {
                  type: 'string'
                },
                message: 'should be string'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            var valid4 = errors === errs_4;
            var valid3 = errors === errs_3;
            var valid2 = errors === errs_2;
          }
          var i = data1.length,
            valid1 = true,
            j;
          if (i > 1) {
            outer: for (; i--;) {
              for (j = i; j--;) {
                if (equal(data1[i], data1[j])) {
                  valid1 = false;
                  break outer;
                }
              }
            }
          }
          if (!valid1) {
            var err = {
              keyword: 'uniqueItems',
              dataPath: (dataPath || '') + '.signatures',
              schemaPath: '#/properties/signatures/uniqueItems',
              params: {
                i: i,
                j: j
              },
              message: 'should NOT have duplicate items (items ## ' + j + ' and ' + i + ' are identical)'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.signatures',
            schemaPath: '#/properties/signatures/type',
            params: {
              type: 'array'
            },
            message: 'should be array'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid1 = errors === errs_1;
      }
      var data1 = data.timestamp;
      if (data1 !== undefined) {
        var errs_1 = errors;
        if ((typeof data1 !== "number" || (data1 % 1) || data1 !== data1)) {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.timestamp',
            schemaPath: '#/properties/timestamp/type',
            params: {
              type: 'integer'
            },
            message: 'should be integer'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        if ((typeof data1 === "number")) {
          if (data1 < 0 || data1 !== data1) {
            var err = {
              keyword: 'minimum',
              dataPath: (dataPath || '') + '.timestamp',
              schemaPath: '#/properties/timestamp/minimum',
              params: {
                comparison: '>=',
                limit: 0,
                exclusive: false
              },
              message: 'should be >= 0'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
        }
        var valid1 = errors === errs_1;
      }
      var data1 = data.typeGroup;
      if (data1 !== undefined) {
        var errs_1 = errors;
        if ((typeof data1 !== "number" || (data1 % 1) || data1 !== data1)) {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.typeGroup',
            schemaPath: '#/properties/typeGroup/type',
            params: {
              type: 'integer'
            },
            message: 'should be integer'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        if ((typeof data1 === "number")) {
          if (data1 < 0 || data1 !== data1) {
            var err = {
              keyword: 'minimum',
              dataPath: (dataPath || '') + '.typeGroup',
              schemaPath: '#/properties/typeGroup/minimum',
              params: {
                comparison: '>=',
                limit: 0,
                exclusive: false
              },
              message: 'should be >= 0'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
        }
        var valid1 = errors === errs_1;
      }
    } else {
      var err = {
        keyword: 'type',
        dataPath: (dataPath || '') + "",
        schemaPath: '#/type',
        params: {
          type: 'object'
        },
        message: 'should be object'
      };
      if (vErrors === null) vErrors = [err];
      else vErrors.push(err);
      errors++;
    }
    var errs__0 = errors;
    var valid0 = true;
    var errs_1 = errors;
    if ((data && typeof data === "object" && !Array.isArray(data))) {
      var errs__1 = errors;
      var valid2 = true;
      var data1 = data.version;
      if (data1 !== undefined) {
        var errs_2 = errors;
        var errs__2 = errors;
        var valid2 = false;
        var errs_3 = errors;
        if (data1 !== null) {
          var err = {};
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid3 = errors === errs_3;
        valid2 = valid2 || valid3;
        if (!valid2) {
          var errs_3 = errors;
          var schema3 = validate.schema.if.properties.version.anyOf[1].const;
          var valid3 = equal(data1, schema3);
          if (!valid3) {
            var err = {};
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
          var valid3 = errors === errs_3;
          valid2 = valid2 || valid3;
          if (!valid2) {}
        }
        if (!valid2) {
          var err = {};
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        } else {
          errors = errs__2;
          if (vErrors !== null) {
            if (errs__2) vErrors.length = errs__2;
            else vErrors = null;
          }
        }
        var valid2 = errors === errs_2;
      }
    }
    var valid1 = errors === errs_1;
    errors = errs__0;
    if (vErrors !== null) {
      if (errs__0) vErrors.length = errs__0;
      else vErrors = null;
    }
    if (valid1) {
      var errs_1 = errors;
      if ((data && typeof data === "object" && !Array.isArray(data))) {
        if (data.type === undefined) {
          var err = {
            keyword: 'required',
            dataPath: (dataPath || '') + "",
            schemaPath: '#/then/required',
            params: {
              missingProperty: 'type'
            },
            message: 'should have required property \'type\''
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        if (data.senderPublicKey === undefined) {
          var err = {
            keyword: 'required',
            dataPath: (dataPath || '') + "",
            schemaPath: '#/then/required',
            params: {
              missingProperty: 'senderPublicKey'
            },
            message: 'should have required property \'senderPublicKey\''
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        if (data.fee === undefined) {
          var err = {
            keyword: 'required',
            dataPath: (dataPath || '') + "",
            schemaPath: '#/then/required',
            params: {
              missingProperty: 'fee'
            },
            message: 'should have required property \'fee\''
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        if (data.amount === undefined) {
          var err = {
            keyword: 'required',
            dataPath: (dataPath || '') + "",
            schemaPath: '#/then/required',
            params: {
              missingProperty: 'amount'
            },
            message: 'should have required property \'amount\''
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        if (data.timestamp === undefined) {
          var err = {
            keyword: 'required',
            dataPath: (dataPath || '') + "",
            schemaPath: '#/then/required',
            params: {
              missingProperty: 'timestamp'
            },
            message: 'should have required property \'timestamp\''
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
      }
      var valid1 = errors === errs_1;
      valid0 = valid1;
      var ifClause0 = 'then';
    } else {
      var errs_1 = errors;
      if ((data && typeof data === "object" && !Array.isArray(data))) {
        if (data.type === undefined) {
          var err = {
            keyword: 'required',
            dataPath: (dataPath || '') + "",
            schemaPath: '#/else/required',
            params: {
              missingProperty: 'type'
            },
            message: 'should have required property \'type\''
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        if (data.senderPublicKey === undefined) {
          var err = {
            keyword: 'required',
            dataPath: (dataPath || '') + "",
            schemaPath: '#/else/required',
            params: {
              missingProperty: 'senderPublicKey'
            },
            message: 'should have required property \'senderPublicKey\''
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        if (data.fee === undefined) {
          var err = {
            keyword: 'required',
            dataPath: (dataPath || '') + "",
            schemaPath: '#/else/required',
            params: {
              missingProperty: 'fee'
            },
            message: 'should have required property \'fee\''
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        if (data.amount === undefined) {
          var err = {
            keyword: 'required',
            dataPath: (dataPath || '') + "",
            schemaPath: '#/else/required',
            params: {
              missingProperty: 'amount'
            },
            message: 'should have required property \'amount\''
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        if (data.nonce === undefined) {
          var err = {
            keyword: 'required',
            dataPath: (dataPath || '') + "",
            schemaPath: '#/else/required',
            params: {
              missingProperty: 'nonce'
            },
            message: 'should have required property \'nonce\''
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
      }
      var valid1 = errors === errs_1;
      valid0 = valid1;
      var ifClause0 = 'else';
    }
    if (!valid0) {
      var err = {
        keyword: 'if',
        dataPath: (dataPath || '') + "",
        schemaPath: '#/if',
        params: {
          failingKeyword: ifClause0
        },
        message: 'should match "' + ifClause0 + '" schema'
      };
      if (vErrors === null) vErrors = [err];
      else vErrors.push(err);
      errors++;
    }
    validate.errors = vErrors;
    return errors === 0;
  };
})();
validate.schema = {
  "$id": "delegateResignation",
  "else": {
    "required": ["type", "senderPublicKey", "fee", "amount", "nonce"]
  },
  "if": {
    "properties": {
      "version": {
        "anyOf": [{
          "type": "null"
        }, {
          "const": 1
        }]
      }
    }
  },
  "properties": {
    "amount": {
      "bignumber": {
        "minimum": 0,
        "maximum": 0
      }
    },
    "fee": {
      "bignumber": {
        "minimum": 1
      }
    },
    "id": {
      "anyOf": [{
        "$ref": "transactionId"
      }, {
        "type": "null"
      }]
    },
    "network": {
      "$ref": "networkByte"
    },
    "nonce": {
      "bignumber": {
        "minimum": 0
      }
    },
    "secondSignature": {
      "$ref": "alphanumeric"
    },
    "senderPublicKey": {
      "$ref": "publicKey"
    },
    "signSignature": {
      "$ref": "alphanumeric"
    },
    "signature": {
      "$ref": "alphanumeric"
    },
    "version": {
      "enum": [1, 2]
    },
    "signatures": {
      "additionalItems": false,
      "items": {
        "allOf": [{
          "maxLength": 130,
          "minLength": 130
        }, {
          "$ref": "alphanumeric"
        }]
      },
      "maxItems": 16,
      "minItems": 1,
      "type": "array",
      "uniqueItems": true
    },
    "timestamp": {
      "type": "integer",
      "minimum": 0
    },
    "typeGroup": {
      "minimum": 0,
      "type": "integer"
    },
    "type": {
      "transactionType": 7
    }
  },
  "then": {
    "required": ["type", "senderPublicKey", "fee", "amount", "timestamp"]
  },
  "type": "object"
};
validate.errors = null;
export default  validate
