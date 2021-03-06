#!/usr/bin/env node
'use strict';

/**
 * Module dependencies.
 */

var program = require('commander');
var colors = require('colors');
//let stringify = require('json-stringify');
var util = require("util");
var firstArg = void 0,
    secondArg = void 0,
    params = null;

function list(val) {
    return val.split(',');
}

program.version('0.0.2').arguments('<cmd> <file>').option('-p, --parameters <items>', 'List of params', list).option('-p, --pseudo <items>', 'List of pseudo overrides', list).action(function (arg1, arg2) {
    firstArg = arg1;
    secondArg = arg2;
});

program.parse(process.argv);

if (typeof firstArg === 'undefined') {
    console.error('no command given!');
    process.exit(1);
}

if (firstArg == "validate" || firstArg == "validate-json-output") {
    var validator = require('./validator');

    if (program.parameters) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = program.parameters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var param = _step.value;

                // Set the parameter
                var kv = param.split('=');
                validator.addParameterValue(kv[0], kv[1]);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }

    if (program.pseudo) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = program.pseudo[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var pseudo = _step2.value;

                // Set the parameter
                var _kv = pseudo.split('=');
                validator.addPseudoValue(_kv[0], _kv[1]);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    }

    var result = validator.validateFile(secondArg);

    if (firstArg == "validate-json-output") {
        // Output results as JSON
        //console.log(util.inspect(result, {showHidden: false, depth: null}));
        console.log(JSON.stringify(result));
    } else {

        // Show the errors on console
        console.log((result['errors']['info'].length + " infos").grey);
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = result['errors']['info'][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var info = _step3.value;

                console.log('Resource: ' + info['resource'].grey);
                console.log('Message: ' + info['message'].grey);
                console.log('Documentation: ' + info['documentation'].grey + '\n');
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        console.log((result['errors']['warn'].length + " warn").yellow);
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = result['errors']['warn'][Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var warn = _step4.value;

                console.log('Resource: ' + warn['resource'].yellow);
                console.log('Message: ' + warn['message'].yellow);
                console.log('Documentation: ' + warn['documentation'].yellow + '\n');
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }

        console.log((result['errors']['crit'].length + " crit").red);
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = result['errors']['crit'][Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var crit = _step5.value;

                console.log('Resource: ' + crit['resource'].red);
                console.log('Message: ' + crit['message'].red);
                console.log('Documentation: ' + crit['documentation'].red + '\n');
            }
        } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                }
            } finally {
                if (_didIteratorError5) {
                    throw _iteratorError5;
                }
            }
        }

        if (result['templateValid'] === false) {
            console.log('Template invalid!'.red.bold);
        } else {
            console.log('Template valid!'.green);
        }
    }
} else if (firstArg == "docs") {
    var docs = require('./docs');
    console.log(docs.getDoc(secondArg));
}