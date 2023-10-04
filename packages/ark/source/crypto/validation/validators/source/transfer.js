import ucs2length from 'ajv/lib/compile/ucs2length';
import equal from 'ajv/lib/compile/equal';

import Formats from 'ajv/lib/compile/formats'
const formats = Formats()
console.log({ formats })

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
          validate.errors = [{
            keyword: 'maxLength',
            dataPath: (dataPath || '') + "",
            schemaPath: '#/allOf/0/maxLength',
            params: {
              limit: 64
            },
            message: 'should NOT be longer than 64 characters'
          }];
          return false;
        } else {
          if (ucs2length(data) < 64) {
            validate.errors = [{
              keyword: 'minLength',
              dataPath: (dataPath || '') + "",
              schemaPath: '#/allOf/0/minLength',
              params: {
                limit: 64
              },
              message: 'should NOT be shorter than 64 characters'
            }];
            return false;
          } else {}
        }
      }
      if (errors === errs_1) {}
      var valid1 = errors === errs_1;
      if (valid1) {
        var errs_1 = errors;
        var errs_2 = errors;
        if (typeof data === "string") {
          if (!pattern0.test(data)) {
            validate.errors = [{
              keyword: 'pattern',
              dataPath: (dataPath || '') + "",
              schemaPath: 'hex/pattern',
              params: {
                pattern: '^[0123456789A-Fa-f]+$'
              },
              message: 'should match pattern "^[0123456789A-Fa-f]+$"'
            }];
            return false;
          } else {}
        } else {
          validate.errors = [{
            keyword: 'type',
            dataPath: (dataPath || '') + "",
            schemaPath: 'hex/type',
            params: {
              type: 'string'
            },
            message: 'should be string'
          }];
          return false;
        }
        if (errors === errs_2) {}
        var valid2 = errors === errs_2;
        if (valid2) {}
        if (errors === errs_1) {}
        var valid1 = errors === errs_1;
        if (valid1) {}
      }
      if (errors === 0) {}
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
          validate.errors = [{
            keyword: 'maxLength',
            dataPath: (dataPath || '') + "",
            schemaPath: '#/allOf/0/maxLength',
            params: {
              limit: 66
            },
            message: 'should NOT be longer than 66 characters'
          }];
          return false;
        } else {
          if (ucs2length(data) < 66) {
            validate.errors = [{
              keyword: 'minLength',
              dataPath: (dataPath || '') + "",
              schemaPath: '#/allOf/0/minLength',
              params: {
                limit: 66
              },
              message: 'should NOT be shorter than 66 characters'
            }];
            return false;
          } else {}
        }
      }
      if (errors === errs_1) {}
      var valid1 = errors === errs_1;
      if (valid1) {
        var errs_1 = errors;
        var errs_2 = errors;
        if (typeof data === "string") {
          if (!pattern0.test(data)) {
            validate.errors = [{
              keyword: 'pattern',
              dataPath: (dataPath || '') + "",
              schemaPath: 'hex/pattern',
              params: {
                pattern: '^[0123456789A-Fa-f]+$'
              },
              message: 'should match pattern "^[0123456789A-Fa-f]+$"'
            }];
            return false;
          } else {}
        } else {
          validate.errors = [{
            keyword: 'type',
            dataPath: (dataPath || '') + "",
            schemaPath: 'hex/type',
            params: {
              type: 'string'
            },
            message: 'should be string'
          }];
          return false;
        }
        if (errors === errs_2) {}
        var valid2 = errors === errs_2;
        if (valid2) {}
        if (errors === errs_1) {}
        var valid1 = errors === errs_1;
        if (valid1) {
          var errs_1 = errors;
          if (typeof data === "string") {
            customRule0.errors = null;
            var errs__1 = errors;
            var valid1;
            valid1 = customRule0.call(self, data, (dataPath || ''), parentData, parentDataProperty, rootData);
            if (parentData) data = parentData[parentDataProperty];
            if (true) {}
          }
          if (errors === errs_1) {}
          var valid1 = errors === errs_1;
          if (valid1) {}
        }
      }
      if (errors === 0) {}
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
  var refVal5 = (function() {
    var pattern0 = new RegExp('^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$');
    var refVal = [];
    var refVal1 = {
      "$id": "base58",
      "type": "string",
      "pattern": "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$"
    };
    refVal[1] = refVal1;
    return function validate(data, dataPath, parentData, parentDataProperty, rootData) {
      'use strict'; /*# sourceURL=address */
      var vErrors = null;
      var errors = 0;
      if (rootData === undefined) rootData = data;
      var errs_1 = errors;
      if (typeof data === "string") {
        if (ucs2length(data) > 34) {
          validate.errors = [{
            keyword: 'maxLength',
            dataPath: (dataPath || '') + "",
            schemaPath: '#/allOf/0/maxLength',
            params: {
              limit: 34
            },
            message: 'should NOT be longer than 34 characters'
          }];
          return false;
        } else {
          if (ucs2length(data) < 34) {
            validate.errors = [{
              keyword: 'minLength',
              dataPath: (dataPath || '') + "",
              schemaPath: '#/allOf/0/minLength',
              params: {
                limit: 34
              },
              message: 'should NOT be shorter than 34 characters'
            }];
            return false;
          } else {}
        }
      }
      if (errors === errs_1) {}
      var valid1 = errors === errs_1;
      if (valid1) {
        var errs_1 = errors;
        var errs_2 = errors;
        if (typeof data === "string") {
          if (!pattern0.test(data)) {
            validate.errors = [{
              keyword: 'pattern',
              dataPath: (dataPath || '') + "",
              schemaPath: 'base58/pattern',
              params: {
                pattern: '^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$'
              },
              message: 'should match pattern "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$"'
            }];
            return false;
          } else {}
        } else {
          validate.errors = [{
            keyword: 'type',
            dataPath: (dataPath || '') + "",
            schemaPath: 'base58/type',
            params: {
              type: 'string'
            },
            message: 'should be string'
          }];
          return false;
        }
        if (errors === errs_2) {}
        var valid2 = errors === errs_2;
        if (valid2) {}
        if (errors === errs_1) {}
        var valid1 = errors === errs_1;
        if (valid1) {}
      }
      if (errors === 0) {}
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal5.schema = {
    "$id": "address",
    "allOf": [{
      "minLength": 34,
      "maxLength": 34
    }, {
      "$ref": "base58"
    }]
  };
  refVal5.errors = null;
  refVal[5] = refVal5;
  return function validate(data, dataPath, parentData, parentDataProperty, rootData) {
    'use strict'; /*# sourceURL=transfer */
    var vErrors = null;
    var errors = 0;
    if (rootData === undefined) rootData = data;
    if ((data && typeof data === "object" && !Array.isArray(data))) {
      if (true) {
        var errs__0 = errors;
        var valid1 = true;
        for (var key0 in data) {
          var isAdditional0 = !(false || validate.schema.properties.hasOwnProperty(key0));
          if (isAdditional0) {}
        }
        if (valid1) {
          var data1 = data.amount;
          if (data1 === undefined) {
            valid1 = true;
          } else {
            var errs_1 = errors;
            customRule0.errors = null;
            var errs__1 = errors;
            var valid1;
            valid1 = customRule0.call(self, data1, (dataPath || '') + '.amount', data, 'amount', rootData);
            if (data) data1 = data['amount'];
            if (!valid1) {
              validate.errors = [{
                keyword: 'bignumber',
                dataPath: (dataPath || '') + '.amount',
                schemaPath: '#/properties/amount/bignumber',
                params: {
                  keyword: 'bignumber'
                },
                message: 'should pass "bignumber" keyword validation'
              }];
              return false;
            } else {}
            if (errors === errs_1) {}
            var valid1 = errors === errs_1;
          }
          if (valid1) {
            var data1 = data.fee;
            if (data1 === undefined) {
              valid1 = true;
            } else {
              var errs_1 = errors;
              customRule1.errors = null;
              var errs__1 = errors;
              var valid1;
              valid1 = customRule1.call(self, data1, (dataPath || '') + '.fee', data, 'fee', rootData);
              if (data) data1 = data['fee'];
              if (!valid1) {
                validate.errors = [{
                  keyword: 'bignumber',
                  dataPath: (dataPath || '') + '.fee',
                  schemaPath: '#/properties/fee/bignumber',
                  params: {
                    keyword: 'bignumber'
                  },
                  message: 'should pass "bignumber" keyword validation'
                }];
                return false;
              } else {}
              if (errors === errs_1) {}
              var valid1 = errors === errs_1;
            }
            if (valid1) {
              var data1 = data.id;
              if (data1 === undefined) {
                valid1 = true;
              } else {
                var errs_1 = errors;
                var errs__1 = errors;
                var valid1 = false;
                var errs_2 = errors;
                if (!refVal1(data1, (dataPath || '') + '.id', data, 'id', rootData)) {
                  if (vErrors === null) vErrors = refVal1.errors;
                  else vErrors = vErrors.concat(refVal1.errors);
                  errors = vErrors.length;
                } else {}
                if (errors === errs_2) {}
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
                  validate.errors = vErrors;
                  return false;
                } else {
                  errors = errs__1;
                  if (vErrors !== null) {
                    if (errs__1) vErrors.length = errs__1;
                    else vErrors = null;
                  }
                }
                if (errors === errs_1) {}
                var valid1 = errors === errs_1;
              }
              if (valid1) {
                if (data.network === undefined) {
                  valid1 = true;
                } else {
                  var errs_1 = errors;
                  var errs_2 = errors;
                  customRule2.errors = null;
                  var errs__2 = errors;
                  var valid2;
                  valid2 = customRule2.call(self, data.network, (dataPath || '') + '.network', data, 'network', rootData);
                  if (!valid2) {
                    validate.errors = [{
                      keyword: 'network',
                      dataPath: (dataPath || '') + '.network',
                      schemaPath: 'networkByte/network',
                      params: {
                        keyword: 'network'
                      },
                      message: 'should pass "network" keyword validation'
                    }];
                    return false;
                  } else {}
                  if (errors === errs_2) {}
                  var valid2 = errors === errs_2;
                  if (valid2) {}
                  if (errors === errs_1) {}
                  var valid1 = errors === errs_1;
                }
                if (valid1) {
                  var data1 = data.nonce;
                  if (data1 === undefined) {
                    valid1 = true;
                  } else {
                    var errs_1 = errors;
                    customRule3.errors = null;
                    var errs__1 = errors;
                    var valid1;
                    valid1 = customRule3.call(self, data1, (dataPath || '') + '.nonce', data, 'nonce', rootData);
                    if (data) data1 = data['nonce'];
                    if (!valid1) {
                      validate.errors = [{
                        keyword: 'bignumber',
                        dataPath: (dataPath || '') + '.nonce',
                        schemaPath: '#/properties/nonce/bignumber',
                        params: {
                          keyword: 'bignumber'
                        },
                        message: 'should pass "bignumber" keyword validation'
                      }];
                      return false;
                    } else {}
                    if (errors === errs_1) {}
                    var valid1 = errors === errs_1;
                  }
                  if (valid1) {
                    var data1 = data.secondSignature;
                    if (data1 === undefined) {
                      valid1 = true;
                    } else {
                      var errs_1 = errors;
                      var errs_2 = errors;
                      if (typeof data1 === "string") {
                        if (!pattern0.test(data1)) {
                          validate.errors = [{
                            keyword: 'pattern',
                            dataPath: (dataPath || '') + '.secondSignature',
                            schemaPath: 'alphanumeric/pattern',
                            params: {
                              pattern: '^[a-zA-Z0-9]+$'
                            },
                            message: 'should match pattern "^[a-zA-Z0-9]+$"'
                          }];
                          return false;
                        } else {}
                      } else {
                        validate.errors = [{
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.secondSignature',
                          schemaPath: 'alphanumeric/type',
                          params: {
                            type: 'string'
                          },
                          message: 'should be string'
                        }];
                        return false;
                      }
                      if (errors === errs_2) {}
                      var valid2 = errors === errs_2;
                      if (valid2) {}
                      if (errors === errs_1) {}
                      var valid1 = errors === errs_1;
                    }
                    if (valid1) {
                      if (data.senderPublicKey === undefined) {
                        valid1 = true;
                      } else {
                        var errs_1 = errors;
                        if (!refVal4(data.senderPublicKey, (dataPath || '') + '.senderPublicKey', data, 'senderPublicKey', rootData)) {
                          if (vErrors === null) vErrors = refVal4.errors;
                          else vErrors = vErrors.concat(refVal4.errors);
                          errors = vErrors.length;
                        } else {}
                        if (errors === errs_1) {}
                        var valid1 = errors === errs_1;
                      }
                      if (valid1) {
                        var data1 = data.signSignature;
                        if (data1 === undefined) {
                          valid1 = true;
                        } else {
                          var errs_1 = errors;
                          var errs_2 = errors;
                          if (typeof data1 === "string") {
                            if (!pattern0.test(data1)) {
                              validate.errors = [{
                                keyword: 'pattern',
                                dataPath: (dataPath || '') + '.signSignature',
                                schemaPath: 'alphanumeric/pattern',
                                params: {
                                  pattern: '^[a-zA-Z0-9]+$'
                                },
                                message: 'should match pattern "^[a-zA-Z0-9]+$"'
                              }];
                              return false;
                            } else {}
                          } else {
                            validate.errors = [{
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.signSignature',
                              schemaPath: 'alphanumeric/type',
                              params: {
                                type: 'string'
                              },
                              message: 'should be string'
                            }];
                            return false;
                          }
                          if (errors === errs_2) {}
                          var valid2 = errors === errs_2;
                          if (valid2) {}
                          if (errors === errs_1) {}
                          var valid1 = errors === errs_1;
                        }
                        if (valid1) {
                          var data1 = data.signature;
                          if (data1 === undefined) {
                            valid1 = true;
                          } else {
                            var errs_1 = errors;
                            var errs_2 = errors;
                            if (typeof data1 === "string") {
                              if (!pattern0.test(data1)) {
                                validate.errors = [{
                                  keyword: 'pattern',
                                  dataPath: (dataPath || '') + '.signature',
                                  schemaPath: 'alphanumeric/pattern',
                                  params: {
                                    pattern: '^[a-zA-Z0-9]+$'
                                  },
                                  message: 'should match pattern "^[a-zA-Z0-9]+$"'
                                }];
                                return false;
                              } else {}
                            } else {
                              validate.errors = [{
                                keyword: 'type',
                                dataPath: (dataPath || '') + '.signature',
                                schemaPath: 'alphanumeric/type',
                                params: {
                                  type: 'string'
                                },
                                message: 'should be string'
                              }];
                              return false;
                            }
                            if (errors === errs_2) {}
                            var valid2 = errors === errs_2;
                            if (valid2) {}
                            if (errors === errs_1) {}
                            var valid1 = errors === errs_1;
                          }
                          if (valid1) {
                            if (data.version === undefined) {
                              valid1 = true;
                            } else {
                              var errs_1 = errors;
                              var schema1 = validate.schema.properties.version.enum;
                              var valid1;
                              valid1 = false;
                              for (var i1 = 0; i1 < schema1.length; i1++)
                                if (equal(data.version, schema1[i1])) {
                                  valid1 = true;
                                  break;
                                } if (!valid1) {
                                validate.errors = [{
                                  keyword: 'enum',
                                  dataPath: (dataPath || '') + '.version',
                                  schemaPath: '#/properties/version/enum',
                                  params: {
                                    allowedValues: schema1
                                  },
                                  message: 'should be equal to one of the allowed values'
                                }];
                                return false;
                              } else {}
                              if (errors === errs_1) {}
                              var valid1 = errors === errs_1;
                            }
                            if (valid1) {
                              var data1 = data.signatures;
                              if (data1 === undefined) {
                                valid1 = true;
                              } else {
                                var errs_1 = errors;
                                if (Array.isArray(data1)) {
                                  if (data1.length > 16) {
                                    validate.errors = [{
                                      keyword: 'maxItems',
                                      dataPath: (dataPath || '') + '.signatures',
                                      schemaPath: '#/properties/signatures/maxItems',
                                      params: {
                                        limit: 16
                                      },
                                      message: 'should NOT have more than 16 items'
                                    }];
                                    return false;
                                  } else {
                                    if (data1.length < 1) {
                                      validate.errors = [{
                                        keyword: 'minItems',
                                        dataPath: (dataPath || '') + '.signatures',
                                        schemaPath: '#/properties/signatures/minItems',
                                        params: {
                                          limit: 1
                                        },
                                        message: 'should NOT have fewer than 1 items'
                                      }];
                                      return false;
                                    } else {
                                      var errs__1 = errors;
                                      var valid1;
                                      for (var i1 = 0; i1 < data1.length; i1++) {
                                        var data2 = data1[i1];
                                        var errs_2 = errors;
                                        var errs_3 = errors;
                                        if (typeof data2 === "string") {
                                          if (ucs2length(data2) > 130) {
                                            validate.errors = [{
                                              keyword: 'maxLength',
                                              dataPath: (dataPath || '') + '.signatures[' + i1 + ']',
                                              schemaPath: '#/properties/signatures/items/allOf/0/maxLength',
                                              params: {
                                                limit: 130
                                              },
                                              message: 'should NOT be longer than 130 characters'
                                            }];
                                            return false;
                                          } else {
                                            if (ucs2length(data2) < 130) {
                                              validate.errors = [{
                                                keyword: 'minLength',
                                                dataPath: (dataPath || '') + '.signatures[' + i1 + ']',
                                                schemaPath: '#/properties/signatures/items/allOf/0/minLength',
                                                params: {
                                                  limit: 130
                                                },
                                                message: 'should NOT be shorter than 130 characters'
                                              }];
                                              return false;
                                            } else {}
                                          }
                                        }
                                        if (errors === errs_3) {}
                                        var valid3 = errors === errs_3;
                                        if (valid3) {
                                          var errs_3 = errors;
                                          var errs_4 = errors;
                                          if (typeof data2 === "string") {
                                            if (!pattern0.test(data2)) {
                                              validate.errors = [{
                                                keyword: 'pattern',
                                                dataPath: (dataPath || '') + '.signatures[' + i1 + ']',
                                                schemaPath: 'alphanumeric/pattern',
                                                params: {
                                                  pattern: '^[a-zA-Z0-9]+$'
                                                },
                                                message: 'should match pattern "^[a-zA-Z0-9]+$"'
                                              }];
                                              return false;
                                            } else {}
                                          } else {
                                            validate.errors = [{
                                              keyword: 'type',
                                              dataPath: (dataPath || '') + '.signatures[' + i1 + ']',
                                              schemaPath: 'alphanumeric/type',
                                              params: {
                                                type: 'string'
                                              },
                                              message: 'should be string'
                                            }];
                                            return false;
                                          }
                                          if (errors === errs_4) {}
                                          var valid4 = errors === errs_4;
                                          if (valid4) {}
                                          if (errors === errs_3) {}
                                          var valid3 = errors === errs_3;
                                          if (valid3) {}
                                        }
                                        if (errors === errs_2) {}
                                        var valid2 = errors === errs_2;
                                        if (!valid2) break;
                                      }
                                      if (errs__1 == errors) {
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
                                          validate.errors = [{
                                            keyword: 'uniqueItems',
                                            dataPath: (dataPath || '') + '.signatures',
                                            schemaPath: '#/properties/signatures/uniqueItems',
                                            params: {
                                              i: i,
                                              j: j
                                            },
                                            message: 'should NOT have duplicate items (items ## ' + j + ' and ' + i + ' are identical)'
                                          }];
                                          return false;
                                        } else {}
                                      }
                                    }
                                  }
                                } else {
                                  validate.errors = [{
                                    keyword: 'type',
                                    dataPath: (dataPath || '') + '.signatures',
                                    schemaPath: '#/properties/signatures/type',
                                    params: {
                                      type: 'array'
                                    },
                                    message: 'should be array'
                                  }];
                                  return false;
                                }
                                if (errors === errs_1) {}
                                var valid1 = errors === errs_1;
                              }
                              if (valid1) {
                                var data1 = data.timestamp;
                                if (data1 === undefined) {
                                  valid1 = true;
                                } else {
                                  var errs_1 = errors;
                                  if ((typeof data1 !== "number" || (data1 % 1) || data1 !== data1)) {
                                    validate.errors = [{
                                      keyword: 'type',
                                      dataPath: (dataPath || '') + '.timestamp',
                                      schemaPath: '#/properties/timestamp/type',
                                      params: {
                                        type: 'integer'
                                      },
                                      message: 'should be integer'
                                    }];
                                    return false;
                                  }
                                  if ((typeof data1 === "number")) {
                                    if (data1 < 0 || data1 !== data1) {
                                      validate.errors = [{
                                        keyword: 'minimum',
                                        dataPath: (dataPath || '') + '.timestamp',
                                        schemaPath: '#/properties/timestamp/minimum',
                                        params: {
                                          comparison: '>=',
                                          limit: 0,
                                          exclusive: false
                                        },
                                        message: 'should be >= 0'
                                      }];
                                      return false;
                                    } else {}
                                  }
                                  if (errors === errs_1) {}
                                  var valid1 = errors === errs_1;
                                }
                                if (valid1) {
                                  var data1 = data.typeGroup;
                                  if (data1 === undefined) {
                                    valid1 = true;
                                  } else {
                                    var errs_1 = errors;
                                    if ((typeof data1 !== "number" || (data1 % 1) || data1 !== data1)) {
                                      validate.errors = [{
                                        keyword: 'type',
                                        dataPath: (dataPath || '') + '.typeGroup',
                                        schemaPath: '#/properties/typeGroup/type',
                                        params: {
                                          type: 'integer'
                                        },
                                        message: 'should be integer'
                                      }];
                                      return false;
                                    }
                                    if ((typeof data1 === "number")) {
                                      if (data1 < 0 || data1 !== data1) {
                                        validate.errors = [{
                                          keyword: 'minimum',
                                          dataPath: (dataPath || '') + '.typeGroup',
                                          schemaPath: '#/properties/typeGroup/minimum',
                                          params: {
                                            comparison: '>=',
                                            limit: 0,
                                            exclusive: false
                                          },
                                          message: 'should be >= 0'
                                        }];
                                        return false;
                                      } else {}
                                    }
                                    if (errors === errs_1) {}
                                    var valid1 = errors === errs_1;
                                  }
                                  if (valid1) {
                                    var data1 = data.expiration;
                                    if (data1 === undefined) {
                                      valid1 = true;
                                    } else {
                                      var errs_1 = errors;
                                      if ((typeof data1 !== "number" || (data1 % 1) || data1 !== data1)) {
                                        validate.errors = [{
                                          keyword: 'type',
                                          dataPath: (dataPath || '') + '.expiration',
                                          schemaPath: '#/properties/expiration/type',
                                          params: {
                                            type: 'integer'
                                          },
                                          message: 'should be integer'
                                        }];
                                        return false;
                                      }
                                      if ((typeof data1 === "number")) {
                                        if (data1 < 0 || data1 !== data1) {
                                          validate.errors = [{
                                            keyword: 'minimum',
                                            dataPath: (dataPath || '') + '.expiration',
                                            schemaPath: '#/properties/expiration/minimum',
                                            params: {
                                              comparison: '>=',
                                              limit: 0,
                                              exclusive: false
                                            },
                                            message: 'should be >= 0'
                                          }];
                                          return false;
                                        } else {}
                                      }
                                      if (errors === errs_1) {}
                                      var valid1 = errors === errs_1;
                                    }
                                    if (valid1) {
                                      if (data.recipientId === undefined) {
                                        valid1 = false;
                                        validate.errors = [{
                                          keyword: 'required',
                                          dataPath: (dataPath || '') + "",
                                          schemaPath: '#/required',
                                          params: {
                                            missingProperty: 'recipientId'
                                          },
                                          message: 'should have required property \'recipientId\''
                                        }];
                                        return false;
                                      } else {
                                        var errs_1 = errors;
                                        if (!refVal5(data.recipientId, (dataPath || '') + '.recipientId', data, 'recipientId', rootData)) {
                                          if (vErrors === null) vErrors = refVal5.errors;
                                          else vErrors = vErrors.concat(refVal5.errors);
                                          errors = vErrors.length;
                                        } else {}
                                        if (errors === errs_1) {}
                                        var valid1 = errors === errs_1;
                                      }
                                      if (valid1) {
                                        if (data.type === undefined) {
                                          valid1 = true;
                                        } else {
                                          var errs_1 = errors;
                                          customRule4.errors = null;
                                          var errs__1 = errors;
                                          var valid1;
                                          valid1 = customRule4.call(self, data.type, (dataPath || '') + '.type', data, 'type', rootData);
                                          if (!valid1) {
                                            validate.errors = [{
                                              keyword: 'transactionType',
                                              dataPath: (dataPath || '') + '.type',
                                              schemaPath: '#/properties/type/transactionType',
                                              params: {
                                                keyword: 'transactionType'
                                              },
                                              message: 'should pass "transactionType" keyword validation'
                                            }];
                                            return false;
                                          } else {}
                                          if (errors === errs_1) {}
                                          var valid1 = errors === errs_1;
                                        }
                                        if (valid1) {
                                          var data1 = data.vendorField;
                                          if (data1 === undefined) {
                                            valid1 = true;
                                          } else {
                                            var errs_1 = errors;
                                            var errs__1 = errors;
                                            var valid1 = false;
                                            var errs_2 = errors;
                                            if (data1 !== null) {
                                              var err = {
                                                keyword: 'type',
                                                dataPath: (dataPath || '') + '.vendorField',
                                                schemaPath: '#/properties/vendorField/anyOf/0/type',
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
                                            if (!valid1) {
                                              var errs_2 = errors;
                                              if ((typeof data1 === "number")) {
                                                if (true) {}
                                              }
                                              if (errors === errs_2) {
                                                if (typeof data1 === "string") {
                                                  if (!formats.vendorField(data1)) {
                                                    var err = {
                                                      keyword: 'format',
                                                      dataPath: (dataPath || '') + '.vendorField',
                                                      schemaPath: '#/properties/vendorField/anyOf/1/format',
                                                      params: {
                                                        format: 'vendorField'
                                                      },
                                                      message: 'should match format "vendorField"'
                                                    };
                                                    if (vErrors === null) vErrors = [err];
                                                    else vErrors.push(err);
                                                    errors++;
                                                  } else {}
                                                } else {
                                                  var err = {
                                                    keyword: 'type',
                                                    dataPath: (dataPath || '') + '.vendorField',
                                                    schemaPath: '#/properties/vendorField/anyOf/1/type',
                                                    params: {
                                                      type: 'string'
                                                    },
                                                    message: 'should be string'
                                                  };
                                                  if (vErrors === null) vErrors = [err];
                                                  else vErrors.push(err);
                                                  errors++;
                                                }
                                                if (errors === errs_2) {}
                                              }
                                              var valid2 = errors === errs_2;
                                              valid1 = valid1 || valid2;
                                              if (!valid1) {}
                                            }
                                            if (!valid1) {
                                              var err = {
                                                keyword: 'anyOf',
                                                dataPath: (dataPath || '') + '.vendorField',
                                                schemaPath: '#/properties/vendorField/anyOf',
                                                params: {},
                                                message: 'should match some schema in anyOf'
                                              };
                                              if (vErrors === null) vErrors = [err];
                                              else vErrors.push(err);
                                              errors++;
                                              validate.errors = vErrors;
                                              return false;
                                            } else {
                                              errors = errs__1;
                                              if (vErrors !== null) {
                                                if (errs__1) vErrors.length = errs__1;
                                                else vErrors = null;
                                              }
                                            }
                                            if (errors === errs_1) {}
                                            var valid1 = errors === errs_1;
                                          }
                                          if (valid1) {}
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (errs__0 == errors) {}
      }
    } else {
      validate.errors = [{
        keyword: 'type',
        dataPath: (dataPath || '') + "",
        schemaPath: '#/type',
        params: {
          type: 'object'
        },
        message: 'should be object'
      }];
      return false;
    }
    if (errors === 0) {
      var errs__0 = errors;
      var valid0 = true;
      var errs_1 = errors;
      if ((data && typeof data === "object" && !Array.isArray(data))) {
        var errs__1 = errors;
        var valid2 = true;
        for (var key1 in data) {
          var isAdditional1 = !(false || key1 == 'version');
          if (isAdditional1) {}
        }
        if (valid2) {
          var data1 = data.version;
          if (data1 === undefined) {
            valid2 = true;
          } else {
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
              } else {}
              if (errors === errs_3) {}
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
            if (errors === errs_2) {}
            var valid2 = errors === errs_2;
          }
          if (valid2) {}
        }
        if (errs__1 == errors) {}
      }
      if (errors === errs_1) {}
      var valid1 = errors === errs_1;
      errors = errs__0;
      if (vErrors !== null) {
        if (errs__0) vErrors.length = errs__0;
        else vErrors = null;
      }
      if (valid1) {
        var errs_1 = errors;
        if ((data && typeof data === "object" && !Array.isArray(data))) {
          var missing1;
          if (((data.type === undefined) && (missing1 = '.type')) || ((data.senderPublicKey === undefined) && (missing1 = '.senderPublicKey')) || ((data.fee === undefined) && (missing1 = '.fee')) || ((data.amount === undefined) && (missing1 = '.amount')) || ((data.timestamp === undefined) && (missing1 = '.timestamp'))) {
            validate.errors = [{
              keyword: 'required',
              dataPath: (dataPath || '') + "",
              schemaPath: '#/then/required',
              params: {
                missingProperty: '' + missing1 + ''
              },
              message: 'should have required property \'' + missing1 + '\''
            }];
            return false;
          } else {}
        }
        if (errors === errs_1) {}
        var valid1 = errors === errs_1;
        valid0 = valid1;
        var ifClause0 = 'then';
      } else {
        var errs_1 = errors;
        if ((data && typeof data === "object" && !Array.isArray(data))) {
          var missing1;
          if (((data.type === undefined) && (missing1 = '.type')) || ((data.senderPublicKey === undefined) && (missing1 = '.senderPublicKey')) || ((data.fee === undefined) && (missing1 = '.fee')) || ((data.amount === undefined) && (missing1 = '.amount')) || ((data.nonce === undefined) && (missing1 = '.nonce'))) {
            validate.errors = [{
              keyword: 'required',
              dataPath: (dataPath || '') + "",
              schemaPath: '#/else/required',
              params: {
                missingProperty: '' + missing1 + ''
              },
              message: 'should have required property \'' + missing1 + '\''
            }];
            return false;
          } else {}
        }
        if (errors === errs_1) {}
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
        validate.errors = vErrors;
        return false;
      } else {}
      if (errors === 0) {}
    }
    validate.errors = vErrors;
    return errors === 0;
  };
})();
validate.schema = {
  "$id": "transfer",
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
        "minimum": 1
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
    "expiration": {
      "minimum": 0,
      "type": "integer"
    },
    "recipientId": {
      "$ref": "address"
    },
    "type": {
      "transactionType": 0
    },
    "vendorField": {
      "anyOf": [{
        "type": "null"
      }, {
        "format": "vendorField",
        "type": "string"
      }]
    }
  },
  "then": {
    "required": ["type", "senderPublicKey", "fee", "amount", "timestamp"]
  },
  "type": "object",
  "required": ["recipientId"]
};
validate.errors = null;
export default validate
