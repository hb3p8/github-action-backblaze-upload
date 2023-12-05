/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 253:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(2037));
const utils_1 = __nccwpck_require__(185);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 7078:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(253);
const file_command_1 = __nccwpck_require__(5073);
const utils_1 = __nccwpck_require__(185);
const os = __importStar(__nccwpck_require__(2037));
const path = __importStar(__nccwpck_require__(1017));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 5073:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(7147));
const os = __importStar(__nccwpck_require__(2037));
const utils_1 = __nccwpck_require__(185);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 185:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 3057:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */

/**
 * Module exports.
 */

module.exports = __nccwpck_require__(3765)


/***/ }),

/***/ 6483:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var db = __nccwpck_require__(3057)
var extname = (__nccwpck_require__(1017).extname)

/**
 * Module variables.
 * @private
 */

var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/
var TEXT_TYPE_REGEXP = /^text\//i

/**
 * Module exports.
 * @public
 */

exports.charset = charset
exports.charsets = { lookup: charset }
exports.contentType = contentType
exports.extension = extension
exports.extensions = Object.create(null)
exports.lookup = lookup
exports.types = Object.create(null)

// Populate the extensions/types maps
populateMaps(exports.extensions, exports.types)

/**
 * Get the default charset for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */

function charset (type) {
  if (!type || typeof type !== 'string') {
    return false
  }

  // TODO: use media-typer
  var match = EXTRACT_TYPE_REGEXP.exec(type)
  var mime = match && db[match[1].toLowerCase()]

  if (mime && mime.charset) {
    return mime.charset
  }

  // default text/* to utf-8
  if (match && TEXT_TYPE_REGEXP.test(match[1])) {
    return 'UTF-8'
  }

  return false
}

/**
 * Create a full Content-Type header given a MIME type or extension.
 *
 * @param {string} str
 * @return {boolean|string}
 */

function contentType (str) {
  // TODO: should this even be in this module?
  if (!str || typeof str !== 'string') {
    return false
  }

  var mime = str.indexOf('/') === -1
    ? exports.lookup(str)
    : str

  if (!mime) {
    return false
  }

  // TODO: use content-type or other module
  if (mime.indexOf('charset') === -1) {
    var charset = exports.charset(mime)
    if (charset) mime += '; charset=' + charset.toLowerCase()
  }

  return mime
}

/**
 * Get the default extension for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */

function extension (type) {
  if (!type || typeof type !== 'string') {
    return false
  }

  // TODO: use media-typer
  var match = EXTRACT_TYPE_REGEXP.exec(type)

  // get extensions
  var exts = match && exports.extensions[match[1].toLowerCase()]

  if (!exts || !exts.length) {
    return false
  }

  return exts[0]
}

/**
 * Lookup the MIME type for a file path/extension.
 *
 * @param {string} path
 * @return {boolean|string}
 */

function lookup (path) {
  if (!path || typeof path !== 'string') {
    return false
  }

  // get the extension ("ext" or ".ext" or full path)
  var extension = extname('x.' + path)
    .toLowerCase()
    .substr(1)

  if (!extension) {
    return false
  }

  return exports.types[extension] || false
}

/**
 * Populate the extensions and types maps.
 * @private
 */

function populateMaps (extensions, types) {
  // source preference (least -> most)
  var preference = ['nginx', 'apache', undefined, 'iana']

  Object.keys(db).forEach(function forEachMimeType (type) {
    var mime = db[type]
    var exts = mime.extensions

    if (!exts || !exts.length) {
      return
    }

    // mime -> extensions
    extensions[type] = exts

    // extension -> mime
    for (var i = 0; i < exts.length; i++) {
      var extension = exts[i]

      if (types[extension]) {
        var from = preference.indexOf(db[types[extension]].source)
        var to = preference.indexOf(mime.source)

        if (types[extension] !== 'application/octet-stream' &&
          (from > to || (from === to && types[extension].substr(0, 12) === 'application/'))) {
          // skip the remapping
          continue
        }
      }

      // set the extension -> mime
      types[extension] = type
    }
  })
}


/***/ }),

/***/ 5804:
/***/ ((module) => {

"use strict";


/**
 * Converts tokens for a single address into an address object
 *
 * @param {Array} tokens Tokens object
 * @return {Object} Address object
 */
function _handleAddress(tokens) {
    let token;
    let isGroup = false;
    let state = 'text';
    let address;
    let addresses = [];
    let data = {
        address: [],
        comment: [],
        group: [],
        text: []
    };
    let i;
    let len;

    // Filter out <addresses>, (comments) and regular text
    for (i = 0, len = tokens.length; i < len; i++) {
        token = tokens[i];
        if (token.type === 'operator') {
            switch (token.value) {
                case '<':
                    state = 'address';
                    break;
                case '(':
                    state = 'comment';
                    break;
                case ':':
                    state = 'group';
                    isGroup = true;
                    break;
                default:
                    state = 'text';
            }
        } else if (token.value) {
            if (state === 'address') {
                // handle use case where unquoted name includes a "<"
                // Apple Mail truncates everything between an unexpected < and an address
                // and so will we
                token.value = token.value.replace(/^[^<]*<\s*/, '');
            }
            data[state].push(token.value);
        }
    }

    // If there is no text but a comment, replace the two
    if (!data.text.length && data.comment.length) {
        data.text = data.comment;
        data.comment = [];
    }

    if (isGroup) {
        // http://tools.ietf.org/html/rfc2822#appendix-A.1.3
        data.text = data.text.join(' ');
        addresses.push({
            name: data.text || (address && address.name),
            group: data.group.length ? addressparser(data.group.join(',')) : []
        });
    } else {
        // If no address was found, try to detect one from regular text
        if (!data.address.length && data.text.length) {
            for (i = data.text.length - 1; i >= 0; i--) {
                if (data.text[i].match(/^[^@\s]+@[^@\s]+$/)) {
                    data.address = data.text.splice(i, 1);
                    break;
                }
            }

            let _regexHandler = function (address) {
                if (!data.address.length) {
                    data.address = [address.trim()];
                    return ' ';
                } else {
                    return address;
                }
            };

            // still no address
            if (!data.address.length) {
                for (i = data.text.length - 1; i >= 0; i--) {
                    // fixed the regex to parse email address correctly when email address has more than one @
                    data.text[i] = data.text[i].replace(/\s*\b[^@\s]+@[^\s]+\b\s*/, _regexHandler).trim();
                    if (data.address.length) {
                        break;
                    }
                }
            }
        }

        // If there's still is no text but a comment exixts, replace the two
        if (!data.text.length && data.comment.length) {
            data.text = data.comment;
            data.comment = [];
        }

        // Keep only the first address occurence, push others to regular text
        if (data.address.length > 1) {
            data.text = data.text.concat(data.address.splice(1));
        }

        // Join values with spaces
        data.text = data.text.join(' ');
        data.address = data.address.join(' ');

        if (!data.address && isGroup) {
            return [];
        } else {
            address = {
                address: data.address || data.text || '',
                name: data.text || data.address || ''
            };

            if (address.address === address.name) {
                if ((address.address || '').match(/@/)) {
                    address.name = '';
                } else {
                    address.address = '';
                }
            }

            addresses.push(address);
        }
    }

    return addresses;
}

/**
 * Creates a Tokenizer object for tokenizing address field strings
 *
 * @constructor
 * @param {String} str Address field string
 */
class Tokenizer {
    constructor(str) {
        this.str = (str || '').toString();
        this.operatorCurrent = '';
        this.operatorExpecting = '';
        this.node = null;
        this.escaped = false;

        this.list = [];
        /**
         * Operator tokens and which tokens are expected to end the sequence
         */
        this.operators = {
            '"': '"',
            '(': ')',
            '<': '>',
            ',': '',
            ':': ';',
            // Semicolons are not a legal delimiter per the RFC2822 grammar other
            // than for terminating a group, but they are also not valid for any
            // other use in this context.  Given that some mail clients have
            // historically allowed the semicolon as a delimiter equivalent to the
            // comma in their UI, it makes sense to treat them the same as a comma
            // when used outside of a group.
            ';': ''
        };
    }

    /**
     * Tokenizes the original input string
     *
     * @return {Array} An array of operator|text tokens
     */
    tokenize() {
        let chr,
            list = [];
        for (let i = 0, len = this.str.length; i < len; i++) {
            chr = this.str.charAt(i);
            this.checkChar(chr);
        }

        this.list.forEach(node => {
            node.value = (node.value || '').toString().trim();
            if (node.value) {
                list.push(node);
            }
        });

        return list;
    }

    /**
     * Checks if a character is an operator or text and acts accordingly
     *
     * @param {String} chr Character from the address field
     */
    checkChar(chr) {
        if (this.escaped) {
            // ignore next condition blocks
        } else if (chr === this.operatorExpecting) {
            this.node = {
                type: 'operator',
                value: chr
            };
            this.list.push(this.node);
            this.node = null;
            this.operatorExpecting = '';
            this.escaped = false;
            return;
        } else if (!this.operatorExpecting && chr in this.operators) {
            this.node = {
                type: 'operator',
                value: chr
            };
            this.list.push(this.node);
            this.node = null;
            this.operatorExpecting = this.operators[chr];
            this.escaped = false;
            return;
        } else if (['"', "'"].includes(this.operatorExpecting) && chr === '\\') {
            this.escaped = true;
            return;
        }

        if (!this.node) {
            this.node = {
                type: 'text',
                value: ''
            };
            this.list.push(this.node);
        }

        if (chr === '\n') {
            // Convert newlines to spaces. Carriage return is ignored as \r and \n usually
            // go together anyway and there already is a WS for \n. Lone \r means something is fishy.
            chr = ' ';
        }

        if (chr.charCodeAt(0) >= 0x21 || [' ', '\t'].includes(chr)) {
            // skip command bytes
            this.node.value += chr;
        }

        this.escaped = false;
    }
}

/**
 * Parses structured e-mail addresses from an address field
 *
 * Example:
 *
 *    'Name <address@domain>'
 *
 * will be converted to
 *
 *     [{name: 'Name', address: 'address@domain'}]
 *
 * @param {String} str Address field
 * @return {Array} An array of address objects
 */
function addressparser(str, options) {
    options = options || {};

    let tokenizer = new Tokenizer(str);
    let tokens = tokenizer.tokenize();

    let addresses = [];
    let address = [];
    let parsedAddresses = [];

    tokens.forEach(token => {
        if (token.type === 'operator' && (token.value === ',' || token.value === ';')) {
            if (address.length) {
                addresses.push(address);
            }
            address = [];
        } else {
            address.push(token);
        }
    });

    if (address.length) {
        addresses.push(address);
    }

    addresses.forEach(address => {
        address = _handleAddress(address);
        if (address.length) {
            parsedAddresses = parsedAddresses.concat(address);
        }
    });

    if (options.flatten) {
        let addresses = [];
        let walkAddressList = list => {
            list.forEach(address => {
                if (address.group) {
                    return walkAddressList(address.group);
                } else {
                    addresses.push(address);
                }
            });
        };
        walkAddressList(parsedAddresses);
        return addresses;
    }

    return parsedAddresses;
}

// expose to the world
module.exports = addressparser;


/***/ }),

/***/ 3885:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const Transform = (__nccwpck_require__(2781).Transform);

/**
 * Encodes a Buffer into a base64 encoded string
 *
 * @param {Buffer} buffer Buffer to convert
 * @returns {String} base64 encoded string
 */
function encode(buffer) {
    if (typeof buffer === 'string') {
        buffer = Buffer.from(buffer, 'utf-8');
    }

    return buffer.toString('base64');
}

/**
 * Adds soft line breaks to a base64 string
 *
 * @param {String} str base64 encoded string that might need line wrapping
 * @param {Number} [lineLength=76] Maximum allowed length for a line
 * @returns {String} Soft-wrapped base64 encoded string
 */
function wrap(str, lineLength) {
    str = (str || '').toString();
    lineLength = lineLength || 76;

    if (str.length <= lineLength) {
        return str;
    }

    let result = [];
    let pos = 0;
    let chunkLength = lineLength * 1024;
    while (pos < str.length) {
        let wrappedLines = str
            .substr(pos, chunkLength)
            .replace(new RegExp('.{' + lineLength + '}', 'g'), '$&\r\n')
            .trim();
        result.push(wrappedLines);
        pos += chunkLength;
    }

    return result.join('\r\n').trim();
}

/**
 * Creates a transform stream for encoding data to base64 encoding
 *
 * @constructor
 * @param {Object} options Stream options
 * @param {Number} [options.lineLength=76] Maximum lenght for lines, set to false to disable wrapping
 */
class Encoder extends Transform {
    constructor(options) {
        super();
        // init Transform
        this.options = options || {};

        if (this.options.lineLength !== false) {
            this.options.lineLength = this.options.lineLength || 76;
        }

        this._curLine = '';
        this._remainingBytes = false;

        this.inputBytes = 0;
        this.outputBytes = 0;
    }

    _transform(chunk, encoding, done) {
        if (encoding !== 'buffer') {
            chunk = Buffer.from(chunk, encoding);
        }

        if (!chunk || !chunk.length) {
            return setImmediate(done);
        }

        this.inputBytes += chunk.length;

        if (this._remainingBytes && this._remainingBytes.length) {
            chunk = Buffer.concat([this._remainingBytes, chunk], this._remainingBytes.length + chunk.length);
            this._remainingBytes = false;
        }

        if (chunk.length % 3) {
            this._remainingBytes = chunk.slice(chunk.length - (chunk.length % 3));
            chunk = chunk.slice(0, chunk.length - (chunk.length % 3));
        } else {
            this._remainingBytes = false;
        }

        let b64 = this._curLine + encode(chunk);

        if (this.options.lineLength) {
            b64 = wrap(b64, this.options.lineLength);

            // remove last line as it is still most probably incomplete
            let lastLF = b64.lastIndexOf('\n');
            if (lastLF < 0) {
                this._curLine = b64;
                b64 = '';
            } else if (lastLF === b64.length - 1) {
                this._curLine = '';
            } else {
                this._curLine = b64.substr(lastLF + 1);
                b64 = b64.substr(0, lastLF + 1);
            }
        }

        if (b64) {
            this.outputBytes += b64.length;
            this.push(Buffer.from(b64, 'ascii'));
        }

        setImmediate(done);
    }

    _flush(done) {
        if (this._remainingBytes && this._remainingBytes.length) {
            this._curLine += encode(this._remainingBytes);
        }

        if (this._curLine) {
            this._curLine = wrap(this._curLine, this.options.lineLength);
            this.outputBytes += this._curLine.length;
            this.push(this._curLine, 'ascii');
            this._curLine = '';
        }
        done();
    }
}

// expose to the world
module.exports = {
    encode,
    wrap,
    Encoder
};


/***/ }),

/***/ 1163:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


// FIXME:
// replace this Transform mess with a method that pipes input argument to output argument

const MessageParser = __nccwpck_require__(7295);
const RelaxedBody = __nccwpck_require__(5425);
const sign = __nccwpck_require__(5678);
const PassThrough = (__nccwpck_require__(2781).PassThrough);
const fs = __nccwpck_require__(7147);
const path = __nccwpck_require__(1017);
const crypto = __nccwpck_require__(6113);

const DKIM_ALGO = 'sha256';
const MAX_MESSAGE_SIZE = 128 * 1024; // buffer messages larger than this to disk

/*
// Usage:

let dkim = new DKIM({
    domainName: 'example.com',
    keySelector: 'key-selector',
    privateKey,
    cacheDir: '/tmp'
});
dkim.sign(input).pipe(process.stdout);

// Where inputStream is a rfc822 message (either a stream, string or Buffer)
// and outputStream is a DKIM signed rfc822 message
*/

class DKIMSigner {
    constructor(options, keys, input, output) {
        this.options = options || {};
        this.keys = keys;

        this.cacheTreshold = Number(this.options.cacheTreshold) || MAX_MESSAGE_SIZE;
        this.hashAlgo = this.options.hashAlgo || DKIM_ALGO;

        this.cacheDir = this.options.cacheDir || false;

        this.chunks = [];
        this.chunklen = 0;
        this.readPos = 0;
        this.cachePath = this.cacheDir ? path.join(this.cacheDir, 'message.' + Date.now() + '-' + crypto.randomBytes(14).toString('hex')) : false;
        this.cache = false;

        this.headers = false;
        this.bodyHash = false;
        this.parser = false;
        this.relaxedBody = false;

        this.input = input;
        this.output = output;
        this.output.usingCache = false;

        this.errored = false;

        this.input.on('error', err => {
            this.errored = true;
            this.cleanup();
            output.emit('error', err);
        });
    }

    cleanup() {
        if (!this.cache || !this.cachePath) {
            return;
        }
        fs.unlink(this.cachePath, () => false);
    }

    createReadCache() {
        // pipe remainings to cache file
        this.cache = fs.createReadStream(this.cachePath);
        this.cache.once('error', err => {
            this.cleanup();
            this.output.emit('error', err);
        });
        this.cache.once('close', () => {
            this.cleanup();
        });
        this.cache.pipe(this.output);
    }

    sendNextChunk() {
        if (this.errored) {
            return;
        }

        if (this.readPos >= this.chunks.length) {
            if (!this.cache) {
                return this.output.end();
            }
            return this.createReadCache();
        }
        let chunk = this.chunks[this.readPos++];
        if (this.output.write(chunk) === false) {
            return this.output.once('drain', () => {
                this.sendNextChunk();
            });
        }
        setImmediate(() => this.sendNextChunk());
    }

    sendSignedOutput() {
        let keyPos = 0;
        let signNextKey = () => {
            if (keyPos >= this.keys.length) {
                this.output.write(this.parser.rawHeaders);
                return setImmediate(() => this.sendNextChunk());
            }
            let key = this.keys[keyPos++];
            let dkimField = sign(this.headers, this.hashAlgo, this.bodyHash, {
                domainName: key.domainName,
                keySelector: key.keySelector,
                privateKey: key.privateKey,
                headerFieldNames: this.options.headerFieldNames,
                skipFields: this.options.skipFields
            });
            if (dkimField) {
                this.output.write(Buffer.from(dkimField + '\r\n'));
            }
            return setImmediate(signNextKey);
        };

        if (this.bodyHash && this.headers) {
            return signNextKey();
        }

        this.output.write(this.parser.rawHeaders);
        this.sendNextChunk();
    }

    createWriteCache() {
        this.output.usingCache = true;
        // pipe remainings to cache file
        this.cache = fs.createWriteStream(this.cachePath);
        this.cache.once('error', err => {
            this.cleanup();
            // drain input
            this.relaxedBody.unpipe(this.cache);
            this.relaxedBody.on('readable', () => {
                while (this.relaxedBody.read() !== null) {
                    // do nothing
                }
            });
            this.errored = true;
            // emit error
            this.output.emit('error', err);
        });
        this.cache.once('close', () => {
            this.sendSignedOutput();
        });
        this.relaxedBody.removeAllListeners('readable');
        this.relaxedBody.pipe(this.cache);
    }

    signStream() {
        this.parser = new MessageParser();
        this.relaxedBody = new RelaxedBody({
            hashAlgo: this.hashAlgo
        });

        this.parser.on('headers', value => {
            this.headers = value;
        });

        this.relaxedBody.on('hash', value => {
            this.bodyHash = value;
        });

        this.relaxedBody.on('readable', () => {
            let chunk;
            if (this.cache) {
                return;
            }
            while ((chunk = this.relaxedBody.read()) !== null) {
                this.chunks.push(chunk);
                this.chunklen += chunk.length;
                if (this.chunklen >= this.cacheTreshold && this.cachePath) {
                    return this.createWriteCache();
                }
            }
        });

        this.relaxedBody.on('end', () => {
            if (this.cache) {
                return;
            }
            this.sendSignedOutput();
        });

        this.parser.pipe(this.relaxedBody);
        setImmediate(() => this.input.pipe(this.parser));
    }
}

class DKIM {
    constructor(options) {
        this.options = options || {};
        this.keys = [].concat(
            this.options.keys || {
                domainName: options.domainName,
                keySelector: options.keySelector,
                privateKey: options.privateKey
            }
        );
    }

    sign(input, extraOptions) {
        let output = new PassThrough();
        let inputStream = input;
        let writeValue = false;

        if (Buffer.isBuffer(input)) {
            writeValue = input;
            inputStream = new PassThrough();
        } else if (typeof input === 'string') {
            writeValue = Buffer.from(input);
            inputStream = new PassThrough();
        }

        let options = this.options;
        if (extraOptions && Object.keys(extraOptions).length) {
            options = {};
            Object.keys(this.options || {}).forEach(key => {
                options[key] = this.options[key];
            });
            Object.keys(extraOptions || {}).forEach(key => {
                if (!(key in options)) {
                    options[key] = extraOptions[key];
                }
            });
        }

        let signer = new DKIMSigner(options, this.keys, inputStream, output);
        setImmediate(() => {
            signer.signStream();
            if (writeValue) {
                setImmediate(() => {
                    inputStream.end(writeValue);
                });
            }
        });

        return output;
    }
}

module.exports = DKIM;


/***/ }),

/***/ 7295:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const Transform = (__nccwpck_require__(2781).Transform);

/**
 * MessageParser instance is a transform stream that separates message headers
 * from the rest of the body. Headers are emitted with the 'headers' event. Message
 * body is passed on as the resulting stream.
 */
class MessageParser extends Transform {
    constructor(options) {
        super(options);
        this.lastBytes = Buffer.alloc(4);
        this.headersParsed = false;
        this.headerBytes = 0;
        this.headerChunks = [];
        this.rawHeaders = false;
        this.bodySize = 0;
    }

    /**
     * Keeps count of the last 4 bytes in order to detect line breaks on chunk boundaries
     *
     * @param {Buffer} data Next data chunk from the stream
     */
    updateLastBytes(data) {
        let lblen = this.lastBytes.length;
        let nblen = Math.min(data.length, lblen);

        // shift existing bytes
        for (let i = 0, len = lblen - nblen; i < len; i++) {
            this.lastBytes[i] = this.lastBytes[i + nblen];
        }

        // add new bytes
        for (let i = 1; i <= nblen; i++) {
            this.lastBytes[lblen - i] = data[data.length - i];
        }
    }

    /**
     * Finds and removes message headers from the remaining body. We want to keep
     * headers separated until final delivery to be able to modify these
     *
     * @param {Buffer} data Next chunk of data
     * @return {Boolean} Returns true if headers are already found or false otherwise
     */
    checkHeaders(data) {
        if (this.headersParsed) {
            return true;
        }

        let lblen = this.lastBytes.length;
        let headerPos = 0;
        this.curLinePos = 0;
        for (let i = 0, len = this.lastBytes.length + data.length; i < len; i++) {
            let chr;
            if (i < lblen) {
                chr = this.lastBytes[i];
            } else {
                chr = data[i - lblen];
            }
            if (chr === 0x0a && i) {
                let pr1 = i - 1 < lblen ? this.lastBytes[i - 1] : data[i - 1 - lblen];
                let pr2 = i > 1 ? (i - 2 < lblen ? this.lastBytes[i - 2] : data[i - 2 - lblen]) : false;
                if (pr1 === 0x0a) {
                    this.headersParsed = true;
                    headerPos = i - lblen + 1;
                    this.headerBytes += headerPos;
                    break;
                } else if (pr1 === 0x0d && pr2 === 0x0a) {
                    this.headersParsed = true;
                    headerPos = i - lblen + 1;
                    this.headerBytes += headerPos;
                    break;
                }
            }
        }

        if (this.headersParsed) {
            this.headerChunks.push(data.slice(0, headerPos));
            this.rawHeaders = Buffer.concat(this.headerChunks, this.headerBytes);
            this.headerChunks = null;
            this.emit('headers', this.parseHeaders());
            if (data.length - 1 > headerPos) {
                let chunk = data.slice(headerPos);
                this.bodySize += chunk.length;
                // this would be the first chunk of data sent downstream
                setImmediate(() => this.push(chunk));
            }
            return false;
        } else {
            this.headerBytes += data.length;
            this.headerChunks.push(data);
        }

        // store last 4 bytes to catch header break
        this.updateLastBytes(data);

        return false;
    }

    _transform(chunk, encoding, callback) {
        if (!chunk || !chunk.length) {
            return callback();
        }

        if (typeof chunk === 'string') {
            chunk = Buffer.from(chunk, encoding);
        }

        let headersFound;

        try {
            headersFound = this.checkHeaders(chunk);
        } catch (E) {
            return callback(E);
        }

        if (headersFound) {
            this.bodySize += chunk.length;
            this.push(chunk);
        }

        setImmediate(callback);
    }

    _flush(callback) {
        if (this.headerChunks) {
            let chunk = Buffer.concat(this.headerChunks, this.headerBytes);
            this.bodySize += chunk.length;
            this.push(chunk);
            this.headerChunks = null;
        }
        callback();
    }

    parseHeaders() {
        let lines = (this.rawHeaders || '').toString().split(/\r?\n/);
        for (let i = lines.length - 1; i > 0; i--) {
            if (/^\s/.test(lines[i])) {
                lines[i - 1] += '\n' + lines[i];
                lines.splice(i, 1);
            }
        }
        return lines
            .filter(line => line.trim())
            .map(line => ({
                key: line.substr(0, line.indexOf(':')).trim().toLowerCase(),
                line
            }));
    }
}

module.exports = MessageParser;


/***/ }),

/***/ 5425:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


// streams through a message body and calculates relaxed body hash

const Transform = (__nccwpck_require__(2781).Transform);
const crypto = __nccwpck_require__(6113);

class RelaxedBody extends Transform {
    constructor(options) {
        super();
        options = options || {};
        this.chunkBuffer = [];
        this.chunkBufferLen = 0;
        this.bodyHash = crypto.createHash(options.hashAlgo || 'sha1');
        this.remainder = '';
        this.byteLength = 0;

        this.debug = options.debug;
        this._debugBody = options.debug ? [] : false;
    }

    updateHash(chunk) {
        let bodyStr;

        // find next remainder
        let nextRemainder = '';

        // This crux finds and removes the spaces from the last line and the newline characters after the last non-empty line
        // If we get another chunk that does not match this description then we can restore the previously processed data
        let state = 'file';
        for (let i = chunk.length - 1; i >= 0; i--) {
            let c = chunk[i];

            if (state === 'file' && (c === 0x0a || c === 0x0d)) {
                // do nothing, found \n or \r at the end of chunk, stil end of file
            } else if (state === 'file' && (c === 0x09 || c === 0x20)) {
                // switch to line ending mode, this is the last non-empty line
                state = 'line';
            } else if (state === 'line' && (c === 0x09 || c === 0x20)) {
                // do nothing, found ' ' or \t at the end of line, keep processing the last non-empty line
            } else if (state === 'file' || state === 'line') {
                // non line/file ending character found, switch to body mode
                state = 'body';
                if (i === chunk.length - 1) {
                    // final char is not part of line end or file end, so do nothing
                    break;
                }
            }

            if (i === 0) {
                // reached to the beginning of the chunk, check if it is still about the ending
                // and if the remainder also matches
                if (
                    (state === 'file' && (!this.remainder || /[\r\n]$/.test(this.remainder))) ||
                    (state === 'line' && (!this.remainder || /[ \t]$/.test(this.remainder)))
                ) {
                    // keep everything
                    this.remainder += chunk.toString('binary');
                    return;
                } else if (state === 'line' || state === 'file') {
                    // process existing remainder as normal line but store the current chunk
                    nextRemainder = chunk.toString('binary');
                    chunk = false;
                    break;
                }
            }

            if (state !== 'body') {
                continue;
            }

            // reached first non ending byte
            nextRemainder = chunk.slice(i + 1).toString('binary');
            chunk = chunk.slice(0, i + 1);
            break;
        }

        let needsFixing = !!this.remainder;
        if (chunk && !needsFixing) {
            // check if we even need to change anything
            for (let i = 0, len = chunk.length; i < len; i++) {
                if (i && chunk[i] === 0x0a && chunk[i - 1] !== 0x0d) {
                    // missing \r before \n
                    needsFixing = true;
                    break;
                } else if (i && chunk[i] === 0x0d && chunk[i - 1] === 0x20) {
                    // trailing WSP found
                    needsFixing = true;
                    break;
                } else if (i && chunk[i] === 0x20 && chunk[i - 1] === 0x20) {
                    // multiple spaces found, needs to be replaced with just one
                    needsFixing = true;
                    break;
                } else if (chunk[i] === 0x09) {
                    // TAB found, needs to be replaced with a space
                    needsFixing = true;
                    break;
                }
            }
        }

        if (needsFixing) {
            bodyStr = this.remainder + (chunk ? chunk.toString('binary') : '');
            this.remainder = nextRemainder;
            bodyStr = bodyStr
                .replace(/\r?\n/g, '\n') // use js line endings
                .replace(/[ \t]*$/gm, '') // remove line endings, rtrim
                .replace(/[ \t]+/gm, ' ') // single spaces
                .replace(/\n/g, '\r\n'); // restore rfc822 line endings
            chunk = Buffer.from(bodyStr, 'binary');
        } else if (nextRemainder) {
            this.remainder = nextRemainder;
        }

        if (this.debug) {
            this._debugBody.push(chunk);
        }
        this.bodyHash.update(chunk);
    }

    _transform(chunk, encoding, callback) {
        if (!chunk || !chunk.length) {
            return callback();
        }

        if (typeof chunk === 'string') {
            chunk = Buffer.from(chunk, encoding);
        }

        this.updateHash(chunk);

        this.byteLength += chunk.length;
        this.push(chunk);
        callback();
    }

    _flush(callback) {
        // generate final hash and emit it
        if (/[\r\n]$/.test(this.remainder) && this.byteLength > 2) {
            // add terminating line end
            this.bodyHash.update(Buffer.from('\r\n'));
        }
        if (!this.byteLength) {
            // emit empty line buffer to keep the stream flowing
            this.push(Buffer.from('\r\n'));
            // this.bodyHash.update(Buffer.from('\r\n'));
        }

        this.emit('hash', this.bodyHash.digest('base64'), this.debug ? Buffer.concat(this._debugBody) : false);
        callback();
    }
}

module.exports = RelaxedBody;


/***/ }),

/***/ 5678:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const punycode = __nccwpck_require__(5477);
const mimeFuncs = __nccwpck_require__(5346);
const crypto = __nccwpck_require__(6113);

/**
 * Returns DKIM signature header line
 *
 * @param {Object} headers Parsed headers object from MessageParser
 * @param {String} bodyHash Base64 encoded hash of the message
 * @param {Object} options DKIM options
 * @param {String} options.domainName Domain name to be signed for
 * @param {String} options.keySelector DKIM key selector to use
 * @param {String} options.privateKey DKIM private key to use
 * @return {String} Complete header line
 */

module.exports = (headers, hashAlgo, bodyHash, options) => {
    options = options || {};

    // all listed fields from RFC4871 #5.5
    let defaultFieldNames =
        'From:Sender:Reply-To:Subject:Date:Message-ID:To:' +
        'Cc:MIME-Version:Content-Type:Content-Transfer-Encoding:Content-ID:' +
        'Content-Description:Resent-Date:Resent-From:Resent-Sender:' +
        'Resent-To:Resent-Cc:Resent-Message-ID:In-Reply-To:References:' +
        'List-Id:List-Help:List-Unsubscribe:List-Subscribe:List-Post:' +
        'List-Owner:List-Archive';

    let fieldNames = options.headerFieldNames || defaultFieldNames;

    let canonicalizedHeaderData = relaxedHeaders(headers, fieldNames, options.skipFields);
    let dkimHeader = generateDKIMHeader(options.domainName, options.keySelector, canonicalizedHeaderData.fieldNames, hashAlgo, bodyHash);

    let signer, signature;

    canonicalizedHeaderData.headers += 'dkim-signature:' + relaxedHeaderLine(dkimHeader);

    signer = crypto.createSign(('rsa-' + hashAlgo).toUpperCase());
    signer.update(canonicalizedHeaderData.headers);
    try {
        signature = signer.sign(options.privateKey, 'base64');
    } catch (E) {
        return false;
    }

    return dkimHeader + signature.replace(/(^.{73}|.{75}(?!\r?\n|\r))/g, '$&\r\n ').trim();
};

module.exports.relaxedHeaders = relaxedHeaders;

function generateDKIMHeader(domainName, keySelector, fieldNames, hashAlgo, bodyHash) {
    let dkim = [
        'v=1',
        'a=rsa-' + hashAlgo,
        'c=relaxed/relaxed',
        'd=' + punycode.toASCII(domainName),
        'q=dns/txt',
        's=' + keySelector,
        'bh=' + bodyHash,
        'h=' + fieldNames
    ].join('; ');

    return mimeFuncs.foldLines('DKIM-Signature: ' + dkim, 76) + ';\r\n b=';
}

function relaxedHeaders(headers, fieldNames, skipFields) {
    let includedFields = new Set();
    let skip = new Set();
    let headerFields = new Map();

    (skipFields || '')
        .toLowerCase()
        .split(':')
        .forEach(field => {
            skip.add(field.trim());
        });

    (fieldNames || '')
        .toLowerCase()
        .split(':')
        .filter(field => !skip.has(field.trim()))
        .forEach(field => {
            includedFields.add(field.trim());
        });

    for (let i = headers.length - 1; i >= 0; i--) {
        let line = headers[i];
        // only include the first value from bottom to top
        if (includedFields.has(line.key) && !headerFields.has(line.key)) {
            headerFields.set(line.key, relaxedHeaderLine(line.line));
        }
    }

    let headersList = [];
    let fields = [];
    includedFields.forEach(field => {
        if (headerFields.has(field)) {
            fields.push(field);
            headersList.push(field + ':' + headerFields.get(field));
        }
    });

    return {
        headers: headersList.join('\r\n') + '\r\n',
        fieldNames: fields.join(':')
    };
}

function relaxedHeaderLine(line) {
    return line
        .substr(line.indexOf(':') + 1)
        .replace(/\r?\n/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}


/***/ }),

/***/ 2233:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


// module to handle cookies

const urllib = __nccwpck_require__(7310);

const SESSION_TIMEOUT = 1800; // 30 min

/**
 * Creates a biskviit cookie jar for managing cookie values in memory
 *
 * @constructor
 * @param {Object} [options] Optional options object
 */
class Cookies {
    constructor(options) {
        this.options = options || {};
        this.cookies = [];
    }

    /**
     * Stores a cookie string to the cookie storage
     *
     * @param {String} cookieStr Value from the 'Set-Cookie:' header
     * @param {String} url Current URL
     */
    set(cookieStr, url) {
        let urlparts = urllib.parse(url || '');
        let cookie = this.parse(cookieStr);
        let domain;

        if (cookie.domain) {
            domain = cookie.domain.replace(/^\./, '');

            // do not allow cross origin cookies
            if (
                // can't be valid if the requested domain is shorter than current hostname
                urlparts.hostname.length < domain.length ||
                // prefix domains with dot to be sure that partial matches are not used
                ('.' + urlparts.hostname).substr(-domain.length + 1) !== '.' + domain
            ) {
                cookie.domain = urlparts.hostname;
            }
        } else {
            cookie.domain = urlparts.hostname;
        }

        if (!cookie.path) {
            cookie.path = this.getPath(urlparts.pathname);
        }

        // if no expire date, then use sessionTimeout value
        if (!cookie.expires) {
            cookie.expires = new Date(Date.now() + (Number(this.options.sessionTimeout || SESSION_TIMEOUT) || SESSION_TIMEOUT) * 1000);
        }

        return this.add(cookie);
    }

    /**
     * Returns cookie string for the 'Cookie:' header.
     *
     * @param {String} url URL to check for
     * @returns {String} Cookie header or empty string if no matches were found
     */
    get(url) {
        return this.list(url)
            .map(cookie => cookie.name + '=' + cookie.value)
            .join('; ');
    }

    /**
     * Lists all valied cookie objects for the specified URL
     *
     * @param {String} url URL to check for
     * @returns {Array} An array of cookie objects
     */
    list(url) {
        let result = [];
        let i;
        let cookie;

        for (i = this.cookies.length - 1; i >= 0; i--) {
            cookie = this.cookies[i];

            if (this.isExpired(cookie)) {
                this.cookies.splice(i, i);
                continue;
            }

            if (this.match(cookie, url)) {
                result.unshift(cookie);
            }
        }

        return result;
    }

    /**
     * Parses cookie string from the 'Set-Cookie:' header
     *
     * @param {String} cookieStr String from the 'Set-Cookie:' header
     * @returns {Object} Cookie object
     */
    parse(cookieStr) {
        let cookie = {};

        (cookieStr || '')
            .toString()
            .split(';')
            .forEach(cookiePart => {
                let valueParts = cookiePart.split('=');
                let key = valueParts.shift().trim().toLowerCase();
                let value = valueParts.join('=').trim();
                let domain;

                if (!key) {
                    // skip empty parts
                    return;
                }

                switch (key) {
                    case 'expires':
                        value = new Date(value);
                        // ignore date if can not parse it
                        if (value.toString() !== 'Invalid Date') {
                            cookie.expires = value;
                        }
                        break;

                    case 'path':
                        cookie.path = value;
                        break;

                    case 'domain':
                        domain = value.toLowerCase();
                        if (domain.length && domain.charAt(0) !== '.') {
                            domain = '.' + domain; // ensure preceeding dot for user set domains
                        }
                        cookie.domain = domain;
                        break;

                    case 'max-age':
                        cookie.expires = new Date(Date.now() + (Number(value) || 0) * 1000);
                        break;

                    case 'secure':
                        cookie.secure = true;
                        break;

                    case 'httponly':
                        cookie.httponly = true;
                        break;

                    default:
                        if (!cookie.name) {
                            cookie.name = key;
                            cookie.value = value;
                        }
                }
            });

        return cookie;
    }

    /**
     * Checks if a cookie object is valid for a specified URL
     *
     * @param {Object} cookie Cookie object
     * @param {String} url URL to check for
     * @returns {Boolean} true if cookie is valid for specifiec URL
     */
    match(cookie, url) {
        let urlparts = urllib.parse(url || '');

        // check if hostname matches
        // .foo.com also matches subdomains, foo.com does not
        if (
            urlparts.hostname !== cookie.domain &&
            (cookie.domain.charAt(0) !== '.' || ('.' + urlparts.hostname).substr(-cookie.domain.length) !== cookie.domain)
        ) {
            return false;
        }

        // check if path matches
        let path = this.getPath(urlparts.pathname);
        if (path.substr(0, cookie.path.length) !== cookie.path) {
            return false;
        }

        // check secure argument
        if (cookie.secure && urlparts.protocol !== 'https:') {
            return false;
        }

        return true;
    }

    /**
     * Adds (or updates/removes if needed) a cookie object to the cookie storage
     *
     * @param {Object} cookie Cookie value to be stored
     */
    add(cookie) {
        let i;
        let len;

        // nothing to do here
        if (!cookie || !cookie.name) {
            return false;
        }

        // overwrite if has same params
        for (i = 0, len = this.cookies.length; i < len; i++) {
            if (this.compare(this.cookies[i], cookie)) {
                // check if the cookie needs to be removed instead
                if (this.isExpired(cookie)) {
                    this.cookies.splice(i, 1); // remove expired/unset cookie
                    return false;
                }

                this.cookies[i] = cookie;
                return true;
            }
        }

        // add as new if not already expired
        if (!this.isExpired(cookie)) {
            this.cookies.push(cookie);
        }

        return true;
    }

    /**
     * Checks if two cookie objects are the same
     *
     * @param {Object} a Cookie to check against
     * @param {Object} b Cookie to check against
     * @returns {Boolean} True, if the cookies are the same
     */
    compare(a, b) {
        return a.name === b.name && a.path === b.path && a.domain === b.domain && a.secure === b.secure && a.httponly === a.httponly;
    }

    /**
     * Checks if a cookie is expired
     *
     * @param {Object} cookie Cookie object to check against
     * @returns {Boolean} True, if the cookie is expired
     */
    isExpired(cookie) {
        return (cookie.expires && cookie.expires < new Date()) || !cookie.value;
    }

    /**
     * Returns normalized cookie path for an URL path argument
     *
     * @param {String} pathname
     * @returns {String} Normalized path
     */
    getPath(pathname) {
        let path = (pathname || '/').split('/');
        path.pop(); // remove filename part
        path = path.join('/').trim();

        // ensure path prefix /
        if (path.charAt(0) !== '/') {
            path = '/' + path;
        }

        // ensure path suffix /
        if (path.substr(-1) !== '/') {
            path += '/';
        }

        return path;
    }
}

module.exports = Cookies;


/***/ }),

/***/ 6665:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const http = __nccwpck_require__(3685);
const https = __nccwpck_require__(5687);
const urllib = __nccwpck_require__(7310);
const zlib = __nccwpck_require__(9796);
const PassThrough = (__nccwpck_require__(2781).PassThrough);
const Cookies = __nccwpck_require__(2233);
const packageData = __nccwpck_require__(4129);

const MAX_REDIRECTS = 5;

module.exports = function (url, options) {
    return fetch(url, options);
};

module.exports.Cookies = Cookies;

function fetch(url, options) {
    options = options || {};

    options.fetchRes = options.fetchRes || new PassThrough();
    options.cookies = options.cookies || new Cookies();
    options.redirects = options.redirects || 0;
    options.maxRedirects = isNaN(options.maxRedirects) ? MAX_REDIRECTS : options.maxRedirects;

    if (options.cookie) {
        [].concat(options.cookie || []).forEach(cookie => {
            options.cookies.set(cookie, url);
        });
        options.cookie = false;
    }

    let fetchRes = options.fetchRes;
    let parsed = urllib.parse(url);
    let method = (options.method || '').toString().trim().toUpperCase() || 'GET';
    let finished = false;
    let cookies;
    let body;

    let handler = parsed.protocol === 'https:' ? https : http;

    let headers = {
        'accept-encoding': 'gzip,deflate',
        'user-agent': 'nodemailer/' + packageData.version
    };

    Object.keys(options.headers || {}).forEach(key => {
        headers[key.toLowerCase().trim()] = options.headers[key];
    });

    if (options.userAgent) {
        headers['user-agent'] = options.userAgent;
    }

    if (parsed.auth) {
        headers.Authorization = 'Basic ' + Buffer.from(parsed.auth).toString('base64');
    }

    if ((cookies = options.cookies.get(url))) {
        headers.cookie = cookies;
    }

    if (options.body) {
        if (options.contentType !== false) {
            headers['Content-Type'] = options.contentType || 'application/x-www-form-urlencoded';
        }

        if (typeof options.body.pipe === 'function') {
            // it's a stream
            headers['Transfer-Encoding'] = 'chunked';
            body = options.body;
            body.on('error', err => {
                if (finished) {
                    return;
                }
                finished = true;
                err.type = 'FETCH';
                err.sourceUrl = url;
                fetchRes.emit('error', err);
            });
        } else {
            if (options.body instanceof Buffer) {
                body = options.body;
            } else if (typeof options.body === 'object') {
                try {
                    // encodeURIComponent can fail on invalid input (partial emoji etc.)
                    body = Buffer.from(
                        Object.keys(options.body)
                            .map(key => {
                                let value = options.body[key].toString().trim();
                                return encodeURIComponent(key) + '=' + encodeURIComponent(value);
                            })
                            .join('&')
                    );
                } catch (E) {
                    if (finished) {
                        return;
                    }
                    finished = true;
                    E.type = 'FETCH';
                    E.sourceUrl = url;
                    fetchRes.emit('error', E);
                    return;
                }
            } else {
                body = Buffer.from(options.body.toString().trim());
            }

            headers['Content-Type'] = options.contentType || 'application/x-www-form-urlencoded';
            headers['Content-Length'] = body.length;
        }
        // if method is not provided, use POST instead of GET
        method = (options.method || '').toString().trim().toUpperCase() || 'POST';
    }

    let req;
    let reqOptions = {
        method,
        host: parsed.hostname,
        path: parsed.path,
        port: parsed.port ? parsed.port : parsed.protocol === 'https:' ? 443 : 80,
        headers,
        rejectUnauthorized: false,
        agent: false
    };

    if (options.tls) {
        Object.keys(options.tls).forEach(key => {
            reqOptions[key] = options.tls[key];
        });
    }

    try {
        req = handler.request(reqOptions);
    } catch (E) {
        finished = true;
        setImmediate(() => {
            E.type = 'FETCH';
            E.sourceUrl = url;
            fetchRes.emit('error', E);
        });
        return fetchRes;
    }

    if (options.timeout) {
        req.setTimeout(options.timeout, () => {
            if (finished) {
                return;
            }
            finished = true;
            req.abort();
            let err = new Error('Request Timeout');
            err.type = 'FETCH';
            err.sourceUrl = url;
            fetchRes.emit('error', err);
        });
    }

    req.on('error', err => {
        if (finished) {
            return;
        }
        finished = true;
        err.type = 'FETCH';
        err.sourceUrl = url;
        fetchRes.emit('error', err);
    });

    req.on('response', res => {
        let inflate;

        if (finished) {
            return;
        }

        switch (res.headers['content-encoding']) {
            case 'gzip':
            case 'deflate':
                inflate = zlib.createUnzip();
                break;
        }

        if (res.headers['set-cookie']) {
            [].concat(res.headers['set-cookie'] || []).forEach(cookie => {
                options.cookies.set(cookie, url);
            });
        }

        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
            // redirect
            options.redirects++;
            if (options.redirects > options.maxRedirects) {
                finished = true;
                let err = new Error('Maximum redirect count exceeded');
                err.type = 'FETCH';
                err.sourceUrl = url;
                fetchRes.emit('error', err);
                req.abort();
                return;
            }
            // redirect does not include POST body
            options.method = 'GET';
            options.body = false;
            return fetch(urllib.resolve(url, res.headers.location), options);
        }

        fetchRes.statusCode = res.statusCode;
        fetchRes.headers = res.headers;

        if (res.statusCode >= 300 && !options.allowErrorResponse) {
            finished = true;
            let err = new Error('Invalid status code ' + res.statusCode);
            err.type = 'FETCH';
            err.sourceUrl = url;
            fetchRes.emit('error', err);
            req.abort();
            return;
        }

        res.on('error', err => {
            if (finished) {
                return;
            }
            finished = true;
            err.type = 'FETCH';
            err.sourceUrl = url;
            fetchRes.emit('error', err);
            req.abort();
        });

        if (inflate) {
            res.pipe(inflate).pipe(fetchRes);
            inflate.on('error', err => {
                if (finished) {
                    return;
                }
                finished = true;
                err.type = 'FETCH';
                err.sourceUrl = url;
                fetchRes.emit('error', err);
                req.abort();
            });
        } else {
            res.pipe(fetchRes);
        }
    });

    setImmediate(() => {
        if (body) {
            try {
                if (typeof body.pipe === 'function') {
                    return body.pipe(req);
                } else {
                    req.write(body);
                }
            } catch (err) {
                finished = true;
                err.type = 'FETCH';
                err.sourceUrl = url;
                fetchRes.emit('error', err);
                return;
            }
        }
        req.end();
    });

    return fetchRes;
}


/***/ }),

/***/ 2339:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const packageData = __nccwpck_require__(4129);
const shared = __nccwpck_require__(2974);

/**
 * Generates a Transport object to generate JSON output
 *
 * @constructor
 * @param {Object} optional config parameter
 */
class JSONTransport {
    constructor(options) {
        options = options || {};

        this.options = options || {};

        this.name = 'JSONTransport';
        this.version = packageData.version;

        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'json-transport'
        });
    }

    /**
     * <p>Compiles a mailcomposer message and forwards it to handler that sends it.</p>
     *
     * @param {Object} emailMessage MailComposer object
     * @param {Function} callback Callback function to run when the sending is completed
     */
    send(mail, done) {
        // Sendmail strips this header line by itself
        mail.message.keepBcc = true;

        let envelope = mail.data.envelope || mail.message.getEnvelope();
        let messageId = mail.message.messageId();

        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
            recipients.push('...and ' + recipients.splice(2).length + ' more');
        }
        this.logger.info(
            {
                tnx: 'send',
                messageId
            },
            'Composing JSON structure of %s to <%s>',
            messageId,
            recipients.join(', ')
        );

        setImmediate(() => {
            mail.normalize((err, data) => {
                if (err) {
                    this.logger.error(
                        {
                            err,
                            tnx: 'send',
                            messageId
                        },
                        'Failed building JSON structure for %s. %s',
                        messageId,
                        err.message
                    );
                    return done(err);
                }

                delete data.envelope;
                delete data.normalizedHeaders;

                return done(null, {
                    envelope,
                    messageId,
                    message: this.options.skipEncoding ? data : JSON.stringify(data)
                });
            });
        });
    }
}

module.exports = JSONTransport;


/***/ }),

/***/ 2014:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/* eslint no-undefined: 0 */



const MimeNode = __nccwpck_require__(4686);
const mimeFuncs = __nccwpck_require__(5346);

/**
 * Creates the object for composing a MimeNode instance out from the mail options
 *
 * @constructor
 * @param {Object} mail Mail options
 */
class MailComposer {
    constructor(mail) {
        this.mail = mail || {};
        this.message = false;
    }

    /**
     * Builds MimeNode instance
     */
    compile() {
        this._alternatives = this.getAlternatives();
        this._htmlNode = this._alternatives.filter(alternative => /^text\/html\b/i.test(alternative.contentType)).pop();
        this._attachments = this.getAttachments(!!this._htmlNode);

        this._useRelated = !!(this._htmlNode && this._attachments.related.length);
        this._useAlternative = this._alternatives.length > 1;
        this._useMixed = this._attachments.attached.length > 1 || (this._alternatives.length && this._attachments.attached.length === 1);

        // Compose MIME tree
        if (this.mail.raw) {
            this.message = new MimeNode('message/rfc822', { newline: this.mail.newline }).setRaw(this.mail.raw);
        } else if (this._useMixed) {
            this.message = this._createMixed();
        } else if (this._useAlternative) {
            this.message = this._createAlternative();
        } else if (this._useRelated) {
            this.message = this._createRelated();
        } else {
            this.message = this._createContentNode(
                false,
                []
                    .concat(this._alternatives || [])
                    .concat(this._attachments.attached || [])
                    .shift() || {
                    contentType: 'text/plain',
                    content: ''
                }
            );
        }

        // Add custom headers
        if (this.mail.headers) {
            this.message.addHeader(this.mail.headers);
        }

        // Add headers to the root node, always overrides custom headers
        ['from', 'sender', 'to', 'cc', 'bcc', 'reply-to', 'in-reply-to', 'references', 'subject', 'message-id', 'date'].forEach(header => {
            let key = header.replace(/-(\w)/g, (o, c) => c.toUpperCase());
            if (this.mail[key]) {
                this.message.setHeader(header, this.mail[key]);
            }
        });

        // Sets custom envelope
        if (this.mail.envelope) {
            this.message.setEnvelope(this.mail.envelope);
        }

        // ensure Message-Id value
        this.message.messageId();

        return this.message;
    }

    /**
     * List all attachments. Resulting attachment objects can be used as input for MimeNode nodes
     *
     * @param {Boolean} findRelated If true separate related attachments from attached ones
     * @returns {Object} An object of arrays (`related` and `attached`)
     */
    getAttachments(findRelated) {
        let icalEvent, eventObject;
        let attachments = [].concat(this.mail.attachments || []).map((attachment, i) => {
            let data;
            let isMessageNode = /^message\//i.test(attachment.contentType);

            if (/^data:/i.test(attachment.path || attachment.href)) {
                attachment = this._processDataUrl(attachment);
            }

            data = {
                contentType: attachment.contentType || mimeFuncs.detectMimeType(attachment.filename || attachment.path || attachment.href || 'bin'),
                contentDisposition: attachment.contentDisposition || (isMessageNode ? 'inline' : 'attachment'),
                contentTransferEncoding: 'contentTransferEncoding' in attachment ? attachment.contentTransferEncoding : 'base64'
            };

            if (attachment.filename) {
                data.filename = attachment.filename;
            } else if (!isMessageNode && attachment.filename !== false) {
                data.filename = (attachment.path || attachment.href || '').split('/').pop().split('?').shift() || 'attachment-' + (i + 1);
                if (data.filename.indexOf('.') < 0) {
                    data.filename += '.' + mimeFuncs.detectExtension(data.contentType);
                }
            }

            if (/^https?:\/\//i.test(attachment.path)) {
                attachment.href = attachment.path;
                attachment.path = undefined;
            }

            if (attachment.cid) {
                data.cid = attachment.cid;
            }

            if (attachment.raw) {
                data.raw = attachment.raw;
            } else if (attachment.path) {
                data.content = {
                    path: attachment.path
                };
            } else if (attachment.href) {
                data.content = {
                    href: attachment.href,
                    httpHeaders: attachment.httpHeaders
                };
            } else {
                data.content = attachment.content || '';
            }

            if (attachment.encoding) {
                data.encoding = attachment.encoding;
            }

            if (attachment.headers) {
                data.headers = attachment.headers;
            }

            return data;
        });

        if (this.mail.icalEvent) {
            if (
                typeof this.mail.icalEvent === 'object' &&
                (this.mail.icalEvent.content || this.mail.icalEvent.path || this.mail.icalEvent.href || this.mail.icalEvent.raw)
            ) {
                icalEvent = this.mail.icalEvent;
            } else {
                icalEvent = {
                    content: this.mail.icalEvent
                };
            }

            eventObject = {};
            Object.keys(icalEvent).forEach(key => {
                eventObject[key] = icalEvent[key];
            });

            eventObject.contentType = 'application/ics';
            if (!eventObject.headers) {
                eventObject.headers = {};
            }
            eventObject.filename = eventObject.filename || 'invite.ics';
            eventObject.headers['Content-Disposition'] = 'attachment';
            eventObject.headers['Content-Transfer-Encoding'] = 'base64';
        }

        if (!findRelated) {
            return {
                attached: attachments.concat(eventObject || []),
                related: []
            };
        } else {
            return {
                attached: attachments.filter(attachment => !attachment.cid).concat(eventObject || []),
                related: attachments.filter(attachment => !!attachment.cid)
            };
        }
    }

    /**
     * List alternatives. Resulting objects can be used as input for MimeNode nodes
     *
     * @returns {Array} An array of alternative elements. Includes the `text` and `html` values as well
     */
    getAlternatives() {
        let alternatives = [],
            text,
            html,
            watchHtml,
            amp,
            icalEvent,
            eventObject;

        if (this.mail.text) {
            if (typeof this.mail.text === 'object' && (this.mail.text.content || this.mail.text.path || this.mail.text.href || this.mail.text.raw)) {
                text = this.mail.text;
            } else {
                text = {
                    content: this.mail.text
                };
            }
            text.contentType = 'text/plain; charset=utf-8';
        }

        if (this.mail.watchHtml) {
            if (
                typeof this.mail.watchHtml === 'object' &&
                (this.mail.watchHtml.content || this.mail.watchHtml.path || this.mail.watchHtml.href || this.mail.watchHtml.raw)
            ) {
                watchHtml = this.mail.watchHtml;
            } else {
                watchHtml = {
                    content: this.mail.watchHtml
                };
            }
            watchHtml.contentType = 'text/watch-html; charset=utf-8';
        }

        if (this.mail.amp) {
            if (typeof this.mail.amp === 'object' && (this.mail.amp.content || this.mail.amp.path || this.mail.amp.href || this.mail.amp.raw)) {
                amp = this.mail.amp;
            } else {
                amp = {
                    content: this.mail.amp
                };
            }
            amp.contentType = 'text/x-amp-html; charset=utf-8';
        }

        // NB! when including attachments with a calendar alternative you might end up in a blank screen on some clients
        if (this.mail.icalEvent) {
            if (
                typeof this.mail.icalEvent === 'object' &&
                (this.mail.icalEvent.content || this.mail.icalEvent.path || this.mail.icalEvent.href || this.mail.icalEvent.raw)
            ) {
                icalEvent = this.mail.icalEvent;
            } else {
                icalEvent = {
                    content: this.mail.icalEvent
                };
            }

            eventObject = {};
            Object.keys(icalEvent).forEach(key => {
                eventObject[key] = icalEvent[key];
            });

            if (eventObject.content && typeof eventObject.content === 'object') {
                // we are going to have the same attachment twice, so mark this to be
                // resolved just once
                eventObject.content._resolve = true;
            }

            eventObject.filename = false;
            eventObject.contentType = 'text/calendar; charset=utf-8; method=' + (eventObject.method || 'PUBLISH').toString().trim().toUpperCase();
            if (!eventObject.headers) {
                eventObject.headers = {};
            }
        }

        if (this.mail.html) {
            if (typeof this.mail.html === 'object' && (this.mail.html.content || this.mail.html.path || this.mail.html.href || this.mail.html.raw)) {
                html = this.mail.html;
            } else {
                html = {
                    content: this.mail.html
                };
            }
            html.contentType = 'text/html; charset=utf-8';
        }

        []
            .concat(text || [])
            .concat(watchHtml || [])
            .concat(amp || [])
            .concat(html || [])
            .concat(eventObject || [])
            .concat(this.mail.alternatives || [])
            .forEach(alternative => {
                let data;

                if (/^data:/i.test(alternative.path || alternative.href)) {
                    alternative = this._processDataUrl(alternative);
                }

                data = {
                    contentType: alternative.contentType || mimeFuncs.detectMimeType(alternative.filename || alternative.path || alternative.href || 'txt'),
                    contentTransferEncoding: alternative.contentTransferEncoding
                };

                if (alternative.filename) {
                    data.filename = alternative.filename;
                }

                if (/^https?:\/\//i.test(alternative.path)) {
                    alternative.href = alternative.path;
                    alternative.path = undefined;
                }

                if (alternative.raw) {
                    data.raw = alternative.raw;
                } else if (alternative.path) {
                    data.content = {
                        path: alternative.path
                    };
                } else if (alternative.href) {
                    data.content = {
                        href: alternative.href
                    };
                } else {
                    data.content = alternative.content || '';
                }

                if (alternative.encoding) {
                    data.encoding = alternative.encoding;
                }

                if (alternative.headers) {
                    data.headers = alternative.headers;
                }

                alternatives.push(data);
            });

        return alternatives;
    }

    /**
     * Builds multipart/mixed node. It should always contain different type of elements on the same level
     * eg. text + attachments
     *
     * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
     * @returns {Object} MimeNode node element
     */
    _createMixed(parentNode) {
        let node;

        if (!parentNode) {
            node = new MimeNode('multipart/mixed', {
                baseBoundary: this.mail.baseBoundary,
                textEncoding: this.mail.textEncoding,
                boundaryPrefix: this.mail.boundaryPrefix,
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            });
        } else {
            node = parentNode.createChild('multipart/mixed', {
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            });
        }

        if (this._useAlternative) {
            this._createAlternative(node);
        } else if (this._useRelated) {
            this._createRelated(node);
        }

        []
            .concat((!this._useAlternative && this._alternatives) || [])
            .concat(this._attachments.attached || [])
            .forEach(element => {
                // if the element is a html node from related subpart then ignore it
                if (!this._useRelated || element !== this._htmlNode) {
                    this._createContentNode(node, element);
                }
            });

        return node;
    }

    /**
     * Builds multipart/alternative node. It should always contain same type of elements on the same level
     * eg. text + html view of the same data
     *
     * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
     * @returns {Object} MimeNode node element
     */
    _createAlternative(parentNode) {
        let node;

        if (!parentNode) {
            node = new MimeNode('multipart/alternative', {
                baseBoundary: this.mail.baseBoundary,
                textEncoding: this.mail.textEncoding,
                boundaryPrefix: this.mail.boundaryPrefix,
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            });
        } else {
            node = parentNode.createChild('multipart/alternative', {
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            });
        }

        this._alternatives.forEach(alternative => {
            if (this._useRelated && this._htmlNode === alternative) {
                this._createRelated(node);
            } else {
                this._createContentNode(node, alternative);
            }
        });

        return node;
    }

    /**
     * Builds multipart/related node. It should always contain html node with related attachments
     *
     * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
     * @returns {Object} MimeNode node element
     */
    _createRelated(parentNode) {
        let node;

        if (!parentNode) {
            node = new MimeNode('multipart/related; type="text/html"', {
                baseBoundary: this.mail.baseBoundary,
                textEncoding: this.mail.textEncoding,
                boundaryPrefix: this.mail.boundaryPrefix,
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            });
        } else {
            node = parentNode.createChild('multipart/related; type="text/html"', {
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            });
        }

        this._createContentNode(node, this._htmlNode);

        this._attachments.related.forEach(alternative => this._createContentNode(node, alternative));

        return node;
    }

    /**
     * Creates a regular node with contents
     *
     * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
     * @param {Object} element Node data
     * @returns {Object} MimeNode node element
     */
    _createContentNode(parentNode, element) {
        element = element || {};
        element.content = element.content || '';

        let node;
        let encoding = (element.encoding || 'utf8')
            .toString()
            .toLowerCase()
            .replace(/[-_\s]/g, '');

        if (!parentNode) {
            node = new MimeNode(element.contentType, {
                filename: element.filename,
                baseBoundary: this.mail.baseBoundary,
                textEncoding: this.mail.textEncoding,
                boundaryPrefix: this.mail.boundaryPrefix,
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            });
        } else {
            node = parentNode.createChild(element.contentType, {
                filename: element.filename,
                textEncoding: this.mail.textEncoding,
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            });
        }

        // add custom headers
        if (element.headers) {
            node.addHeader(element.headers);
        }

        if (element.cid) {
            node.setHeader('Content-Id', '<' + element.cid.replace(/[<>]/g, '') + '>');
        }

        if (element.contentTransferEncoding) {
            node.setHeader('Content-Transfer-Encoding', element.contentTransferEncoding);
        } else if (this.mail.encoding && /^text\//i.test(element.contentType)) {
            node.setHeader('Content-Transfer-Encoding', this.mail.encoding);
        }

        if (!/^text\//i.test(element.contentType) || element.contentDisposition) {
            node.setHeader('Content-Disposition', element.contentDisposition || (element.cid ? 'inline' : 'attachment'));
        }

        if (typeof element.content === 'string' && !['utf8', 'usascii', 'ascii'].includes(encoding)) {
            element.content = Buffer.from(element.content, encoding);
        }

        // prefer pregenerated raw content
        if (element.raw) {
            node.setRaw(element.raw);
        } else {
            node.setContent(element.content);
        }

        return node;
    }

    /**
     * Parses data uri and converts it to a Buffer
     *
     * @param {Object} element Content element
     * @return {Object} Parsed element
     */
    _processDataUrl(element) {
        let parts = (element.path || element.href).match(/^data:((?:[^;]*;)*(?:[^,]*)),(.*)$/i);
        if (!parts) {
            return element;
        }

        element.content = /\bbase64$/i.test(parts[1]) ? Buffer.from(parts[2], 'base64') : Buffer.from(decodeURIComponent(parts[2]));

        if ('path' in element) {
            element.path = false;
        }

        if ('href' in element) {
            element.href = false;
        }

        parts[1].split(';').forEach(item => {
            if (/^\w+\/[^/]+$/i.test(item)) {
                element.contentType = element.contentType || item.toLowerCase();
            }
        });

        return element;
    }
}

module.exports = MailComposer;


/***/ }),

/***/ 2972:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const EventEmitter = __nccwpck_require__(2361);
const shared = __nccwpck_require__(2974);
const mimeTypes = __nccwpck_require__(5402);
const MailComposer = __nccwpck_require__(2014);
const DKIM = __nccwpck_require__(1163);
const httpProxyClient = __nccwpck_require__(555);
const util = __nccwpck_require__(3837);
const urllib = __nccwpck_require__(7310);
const packageData = __nccwpck_require__(4129);
const MailMessage = __nccwpck_require__(3049);
const net = __nccwpck_require__(1808);
const dns = __nccwpck_require__(9523);
const crypto = __nccwpck_require__(6113);

/**
 * Creates an object for exposing the Mail API
 *
 * @constructor
 * @param {Object} transporter Transport object instance to pass the mails to
 */
class Mail extends EventEmitter {
    constructor(transporter, options, defaults) {
        super();

        this.options = options || {};
        this._defaults = defaults || {};

        this._defaultPlugins = {
            compile: [(...args) => this._convertDataImages(...args)],
            stream: []
        };

        this._userPlugins = {
            compile: [],
            stream: []
        };

        this.meta = new Map();

        this.dkim = this.options.dkim ? new DKIM(this.options.dkim) : false;

        this.transporter = transporter;
        this.transporter.mailer = this;

        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'mail'
        });

        this.logger.debug(
            {
                tnx: 'create'
            },
            'Creating transport: %s',
            this.getVersionString()
        );

        // setup emit handlers for the transporter
        if (typeof this.transporter.on === 'function') {
            // deprecated log interface
            this.transporter.on('log', log => {
                this.logger.debug(
                    {
                        tnx: 'transport'
                    },
                    '%s: %s',
                    log.type,
                    log.message
                );
            });

            // transporter errors
            this.transporter.on('error', err => {
                this.logger.error(
                    {
                        err,
                        tnx: 'transport'
                    },
                    'Transport Error: %s',
                    err.message
                );
                this.emit('error', err);
            });

            // indicates if the sender has became idle
            this.transporter.on('idle', (...args) => {
                this.emit('idle', ...args);
            });
        }

        /**
         * Optional methods passed to the underlying transport object
         */
        ['close', 'isIdle', 'verify'].forEach(method => {
            this[method] = (...args) => {
                if (typeof this.transporter[method] === 'function') {
                    if (method === 'verify' && typeof this.getSocket === 'function') {
                        this.transporter.getSocket = this.getSocket;
                        this.getSocket = false;
                    }
                    return this.transporter[method](...args);
                } else {
                    this.logger.warn(
                        {
                            tnx: 'transport',
                            methodName: method
                        },
                        'Non existing method %s called for transport',
                        method
                    );
                    return false;
                }
            };
        });

        // setup proxy handling
        if (this.options.proxy && typeof this.options.proxy === 'string') {
            this.setupProxy(this.options.proxy);
        }
    }

    use(step, plugin) {
        step = (step || '').toString();
        if (!this._userPlugins.hasOwnProperty(step)) {
            this._userPlugins[step] = [plugin];
        } else {
            this._userPlugins[step].push(plugin);
        }

        return this;
    }

    /**
     * Sends an email using the preselected transport object
     *
     * @param {Object} data E-data description
     * @param {Function?} callback Callback to run once the sending succeeded or failed
     */
    sendMail(data, callback) {
        let promise;

        if (!callback) {
            promise = new Promise((resolve, reject) => {
                callback = shared.callbackPromise(resolve, reject);
            });
        }

        if (typeof this.getSocket === 'function') {
            this.transporter.getSocket = this.getSocket;
            this.getSocket = false;
        }

        let mail = new MailMessage(this, data);

        this.logger.debug(
            {
                tnx: 'transport',
                name: this.transporter.name,
                version: this.transporter.version,
                action: 'send'
            },
            'Sending mail using %s/%s',
            this.transporter.name,
            this.transporter.version
        );

        this._processPlugins('compile', mail, err => {
            if (err) {
                this.logger.error(
                    {
                        err,
                        tnx: 'plugin',
                        action: 'compile'
                    },
                    'PluginCompile Error: %s',
                    err.message
                );
                return callback(err);
            }

            mail.message = new MailComposer(mail.data).compile();

            mail.setMailerHeader();
            mail.setPriorityHeaders();
            mail.setListHeaders();

            this._processPlugins('stream', mail, err => {
                if (err) {
                    this.logger.error(
                        {
                            err,
                            tnx: 'plugin',
                            action: 'stream'
                        },
                        'PluginStream Error: %s',
                        err.message
                    );
                    return callback(err);
                }

                if (mail.data.dkim || this.dkim) {
                    mail.message.processFunc(input => {
                        let dkim = mail.data.dkim ? new DKIM(mail.data.dkim) : this.dkim;
                        this.logger.debug(
                            {
                                tnx: 'DKIM',
                                messageId: mail.message.messageId(),
                                dkimDomains: dkim.keys.map(key => key.keySelector + '.' + key.domainName).join(', ')
                            },
                            'Signing outgoing message with %s keys',
                            dkim.keys.length
                        );
                        return dkim.sign(input, mail.data._dkim);
                    });
                }

                this.transporter.send(mail, (...args) => {
                    if (args[0]) {
                        this.logger.error(
                            {
                                err: args[0],
                                tnx: 'transport',
                                action: 'send'
                            },
                            'Send Error: %s',
                            args[0].message
                        );
                    }
                    callback(...args);
                });
            });
        });

        return promise;
    }

    getVersionString() {
        return util.format('%s (%s; +%s; %s/%s)', packageData.name, packageData.version, packageData.homepage, this.transporter.name, this.transporter.version);
    }

    _processPlugins(step, mail, callback) {
        step = (step || '').toString();

        if (!this._userPlugins.hasOwnProperty(step)) {
            return callback();
        }

        let userPlugins = this._userPlugins[step] || [];
        let defaultPlugins = this._defaultPlugins[step] || [];

        if (userPlugins.length) {
            this.logger.debug(
                {
                    tnx: 'transaction',
                    pluginCount: userPlugins.length,
                    step
                },
                'Using %s plugins for %s',
                userPlugins.length,
                step
            );
        }

        if (userPlugins.length + defaultPlugins.length === 0) {
            return callback();
        }

        let pos = 0;
        let block = 'default';
        let processPlugins = () => {
            let curplugins = block === 'default' ? defaultPlugins : userPlugins;
            if (pos >= curplugins.length) {
                if (block === 'default' && userPlugins.length) {
                    block = 'user';
                    pos = 0;
                    curplugins = userPlugins;
                } else {
                    return callback();
                }
            }
            let plugin = curplugins[pos++];
            plugin(mail, err => {
                if (err) {
                    return callback(err);
                }
                processPlugins();
            });
        };

        processPlugins();
    }

    /**
     * Sets up proxy handler for a Nodemailer object
     *
     * @param {String} proxyUrl Proxy configuration url
     */
    setupProxy(proxyUrl) {
        let proxy = urllib.parse(proxyUrl);

        // setup socket handler for the mailer object
        this.getSocket = (options, callback) => {
            let protocol = proxy.protocol.replace(/:$/, '').toLowerCase();

            if (this.meta.has('proxy_handler_' + protocol)) {
                return this.meta.get('proxy_handler_' + protocol)(proxy, options, callback);
            }

            switch (protocol) {
                // Connect using a HTTP CONNECT method
                case 'http':
                case 'https':
                    httpProxyClient(proxy.href, options.port, options.host, (err, socket) => {
                        if (err) {
                            return callback(err);
                        }
                        return callback(null, {
                            connection: socket
                        });
                    });
                    return;
                case 'socks':
                case 'socks5':
                case 'socks4':
                case 'socks4a': {
                    if (!this.meta.has('proxy_socks_module')) {
                        return callback(new Error('Socks module not loaded'));
                    }
                    let connect = ipaddress => {
                        let proxyV2 = !!this.meta.get('proxy_socks_module').SocksClient;
                        let socksClient = proxyV2 ? this.meta.get('proxy_socks_module').SocksClient : this.meta.get('proxy_socks_module');
                        let proxyType = Number(proxy.protocol.replace(/\D/g, '')) || 5;
                        let connectionOpts = {
                            proxy: {
                                ipaddress,
                                port: Number(proxy.port),
                                type: proxyType
                            },
                            [proxyV2 ? 'destination' : 'target']: {
                                host: options.host,
                                port: options.port
                            },
                            command: 'connect'
                        };

                        if (proxy.auth) {
                            let username = decodeURIComponent(proxy.auth.split(':').shift());
                            let password = decodeURIComponent(proxy.auth.split(':').pop());
                            if (proxyV2) {
                                connectionOpts.proxy.userId = username;
                                connectionOpts.proxy.password = password;
                            } else if (proxyType === 4) {
                                connectionOpts.userid = username;
                            } else {
                                connectionOpts.authentication = {
                                    username,
                                    password
                                };
                            }
                        }

                        socksClient.createConnection(connectionOpts, (err, info) => {
                            if (err) {
                                return callback(err);
                            }
                            return callback(null, {
                                connection: info.socket || info
                            });
                        });
                    };

                    if (net.isIP(proxy.hostname)) {
                        return connect(proxy.hostname);
                    }

                    return dns.resolve(proxy.hostname, (err, address) => {
                        if (err) {
                            return callback(err);
                        }
                        connect(Array.isArray(address) ? address[0] : address);
                    });
                }
            }
            callback(new Error('Unknown proxy configuration'));
        };
    }

    _convertDataImages(mail, callback) {
        if ((!this.options.attachDataUrls && !mail.data.attachDataUrls) || !mail.data.html) {
            return callback();
        }
        mail.resolveContent(mail.data, 'html', (err, html) => {
            if (err) {
                return callback(err);
            }
            let cidCounter = 0;
            html = (html || '').toString().replace(/(<img\b[^>]* src\s*=[\s"']*)(data:([^;]+);[^"'>\s]+)/gi, (match, prefix, dataUri, mimeType) => {
                let cid = crypto.randomBytes(10).toString('hex') + '@localhost';
                if (!mail.data.attachments) {
                    mail.data.attachments = [];
                }
                if (!Array.isArray(mail.data.attachments)) {
                    mail.data.attachments = [].concat(mail.data.attachments || []);
                }
                mail.data.attachments.push({
                    path: dataUri,
                    cid,
                    filename: 'image-' + ++cidCounter + '.' + mimeTypes.detectExtension(mimeType)
                });
                return prefix + 'cid:' + cid;
            });
            mail.data.html = html;
            callback();
        });
    }

    set(key, value) {
        return this.meta.set(key, value);
    }

    get(key) {
        return this.meta.get(key);
    }
}

module.exports = Mail;


/***/ }),

/***/ 3049:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const shared = __nccwpck_require__(2974);
const MimeNode = __nccwpck_require__(4686);
const mimeFuncs = __nccwpck_require__(5346);

class MailMessage {
    constructor(mailer, data) {
        this.mailer = mailer;
        this.data = {};
        this.message = null;

        data = data || {};
        let options = mailer.options || {};
        let defaults = mailer._defaults || {};

        Object.keys(data).forEach(key => {
            this.data[key] = data[key];
        });

        this.data.headers = this.data.headers || {};

        // apply defaults
        Object.keys(defaults).forEach(key => {
            if (!(key in this.data)) {
                this.data[key] = defaults[key];
            } else if (key === 'headers') {
                // headers is a special case. Allow setting individual default headers
                Object.keys(defaults.headers).forEach(key => {
                    if (!(key in this.data.headers)) {
                        this.data.headers[key] = defaults.headers[key];
                    }
                });
            }
        });

        // force specific keys from transporter options
        ['disableFileAccess', 'disableUrlAccess', 'normalizeHeaderKey'].forEach(key => {
            if (key in options) {
                this.data[key] = options[key];
            }
        });
    }

    resolveContent(...args) {
        return shared.resolveContent(...args);
    }

    resolveAll(callback) {
        let keys = [
            [this.data, 'html'],
            [this.data, 'text'],
            [this.data, 'watchHtml'],
            [this.data, 'amp'],
            [this.data, 'icalEvent']
        ];

        if (this.data.alternatives && this.data.alternatives.length) {
            this.data.alternatives.forEach((alternative, i) => {
                keys.push([this.data.alternatives, i]);
            });
        }

        if (this.data.attachments && this.data.attachments.length) {
            this.data.attachments.forEach((attachment, i) => {
                if (!attachment.filename) {
                    attachment.filename = (attachment.path || attachment.href || '').split('/').pop().split('?').shift() || 'attachment-' + (i + 1);
                    if (attachment.filename.indexOf('.') < 0) {
                        attachment.filename += '.' + mimeFuncs.detectExtension(attachment.contentType);
                    }
                }

                if (!attachment.contentType) {
                    attachment.contentType = mimeFuncs.detectMimeType(attachment.filename || attachment.path || attachment.href || 'bin');
                }

                keys.push([this.data.attachments, i]);
            });
        }

        let mimeNode = new MimeNode();

        let addressKeys = ['from', 'to', 'cc', 'bcc', 'sender', 'replyTo'];

        addressKeys.forEach(address => {
            let value;
            if (this.message) {
                value = [].concat(mimeNode._parseAddresses(this.message.getHeader(address === 'replyTo' ? 'reply-to' : address)) || []);
            } else if (this.data[address]) {
                value = [].concat(mimeNode._parseAddresses(this.data[address]) || []);
            }
            if (value && value.length) {
                this.data[address] = value;
            } else if (address in this.data) {
                this.data[address] = null;
            }
        });

        let singleKeys = ['from', 'sender', 'replyTo'];
        singleKeys.forEach(address => {
            if (this.data[address]) {
                this.data[address] = this.data[address].shift();
            }
        });

        let pos = 0;
        let resolveNext = () => {
            if (pos >= keys.length) {
                return callback(null, this.data);
            }
            let args = keys[pos++];
            if (!args[0] || !args[0][args[1]]) {
                return resolveNext();
            }
            shared.resolveContent(...args, (err, value) => {
                if (err) {
                    return callback(err);
                }

                let node = {
                    content: value
                };
                if (args[0][args[1]] && typeof args[0][args[1]] === 'object' && !Buffer.isBuffer(args[0][args[1]])) {
                    Object.keys(args[0][args[1]]).forEach(key => {
                        if (!(key in node) && !['content', 'path', 'href', 'raw'].includes(key)) {
                            node[key] = args[0][args[1]][key];
                        }
                    });
                }

                args[0][args[1]] = node;
                resolveNext();
            });
        };

        setImmediate(() => resolveNext());
    }

    normalize(callback) {
        let envelope = this.data.envelope || this.message.getEnvelope();
        let messageId = this.message.messageId();

        this.resolveAll((err, data) => {
            if (err) {
                return callback(err);
            }

            data.envelope = envelope;
            data.messageId = messageId;

            ['html', 'text', 'watchHtml', 'amp'].forEach(key => {
                if (data[key] && data[key].content) {
                    if (typeof data[key].content === 'string') {
                        data[key] = data[key].content;
                    } else if (Buffer.isBuffer(data[key].content)) {
                        data[key] = data[key].content.toString();
                    }
                }
            });

            if (data.icalEvent && Buffer.isBuffer(data.icalEvent.content)) {
                data.icalEvent.content = data.icalEvent.content.toString('base64');
                data.icalEvent.encoding = 'base64';
            }

            if (data.alternatives && data.alternatives.length) {
                data.alternatives.forEach(alternative => {
                    if (alternative && alternative.content && Buffer.isBuffer(alternative.content)) {
                        alternative.content = alternative.content.toString('base64');
                        alternative.encoding = 'base64';
                    }
                });
            }

            if (data.attachments && data.attachments.length) {
                data.attachments.forEach(attachment => {
                    if (attachment && attachment.content && Buffer.isBuffer(attachment.content)) {
                        attachment.content = attachment.content.toString('base64');
                        attachment.encoding = 'base64';
                    }
                });
            }

            data.normalizedHeaders = {};
            Object.keys(data.headers || {}).forEach(key => {
                let value = [].concat(data.headers[key] || []).shift();
                value = (value && value.value) || value;
                if (value) {
                    if (['references', 'in-reply-to', 'message-id', 'content-id'].includes(key)) {
                        value = this.message._encodeHeaderValue(key, value);
                    }
                    data.normalizedHeaders[key] = value;
                }
            });

            if (data.list && typeof data.list === 'object') {
                let listHeaders = this._getListHeaders(data.list);
                listHeaders.forEach(entry => {
                    data.normalizedHeaders[entry.key] = entry.value.map(val => (val && val.value) || val).join(', ');
                });
            }

            if (data.references) {
                data.normalizedHeaders.references = this.message._encodeHeaderValue('references', data.references);
            }

            if (data.inReplyTo) {
                data.normalizedHeaders['in-reply-to'] = this.message._encodeHeaderValue('in-reply-to', data.inReplyTo);
            }

            return callback(null, data);
        });
    }

    setMailerHeader() {
        if (!this.message || !this.data.xMailer) {
            return;
        }
        this.message.setHeader('X-Mailer', this.data.xMailer);
    }

    setPriorityHeaders() {
        if (!this.message || !this.data.priority) {
            return;
        }
        switch ((this.data.priority || '').toString().toLowerCase()) {
            case 'high':
                this.message.setHeader('X-Priority', '1 (Highest)');
                this.message.setHeader('X-MSMail-Priority', 'High');
                this.message.setHeader('Importance', 'High');
                break;
            case 'low':
                this.message.setHeader('X-Priority', '5 (Lowest)');
                this.message.setHeader('X-MSMail-Priority', 'Low');
                this.message.setHeader('Importance', 'Low');
                break;
            default:
            // do not add anything, since all messages are 'Normal' by default
        }
    }

    setListHeaders() {
        if (!this.message || !this.data.list || typeof this.data.list !== 'object') {
            return;
        }
        // add optional List-* headers
        if (this.data.list && typeof this.data.list === 'object') {
            this._getListHeaders(this.data.list).forEach(listHeader => {
                listHeader.value.forEach(value => {
                    this.message.addHeader(listHeader.key, value);
                });
            });
        }
    }

    _getListHeaders(listData) {
        // make sure an url looks like <protocol:url>
        return Object.keys(listData).map(key => ({
            key: 'list-' + key.toLowerCase().trim(),
            value: [].concat(listData[key] || []).map(value => ({
                prepared: true,
                foldLines: true,
                value: []
                    .concat(value || [])
                    .map(value => {
                        if (typeof value === 'string') {
                            value = {
                                url: value
                            };
                        }

                        if (value && value.url) {
                            if (key.toLowerCase().trim() === 'id') {
                                // List-ID: "comment" <domain>
                                let comment = value.comment || '';
                                if (mimeFuncs.isPlainText(comment)) {
                                    comment = '"' + comment + '"';
                                } else {
                                    comment = mimeFuncs.encodeWord(comment);
                                }

                                return (value.comment ? comment + ' ' : '') + this._formatListUrl(value.url).replace(/^<[^:]+\/{,2}/, '');
                            }

                            // List-*: <http://domain> (comment)
                            let comment = value.comment || '';
                            if (!mimeFuncs.isPlainText(comment)) {
                                comment = mimeFuncs.encodeWord(comment);
                            }

                            return this._formatListUrl(value.url) + (value.comment ? ' (' + comment + ')' : '');
                        }

                        return '';
                    })
                    .filter(value => value)
                    .join(', ')
            }))
        }));
    }

    _formatListUrl(url) {
        url = url.replace(/[\s<]+|[\s>]+/g, '');
        if (/^(https?|mailto|ftp):/.test(url)) {
            return '<' + url + '>';
        }
        if (/^[^@]+@[^@]+$/.test(url)) {
            return '<mailto:' + url + '>';
        }

        return '<http://' + url + '>';
    }
}

module.exports = MailMessage;


/***/ }),

/***/ 5346:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/* eslint no-control-regex:0 */



const base64 = __nccwpck_require__(3885);
const qp = __nccwpck_require__(3901);
const mimeTypes = __nccwpck_require__(5402);

module.exports = {
    /**
     * Checks if a value is plaintext string (uses only printable 7bit chars)
     *
     * @param {String} value String to be tested
     * @returns {Boolean} true if it is a plaintext string
     */
    isPlainText(value, isParam) {
        const re = isParam ? /[\x00-\x08\x0b\x0c\x0e-\x1f"\u0080-\uFFFF]/ : /[\x00-\x08\x0b\x0c\x0e-\x1f\u0080-\uFFFF]/;
        if (typeof value !== 'string' || re.test(value)) {
            return false;
        } else {
            return true;
        }
    },

    /**
     * Checks if a multi line string containes lines longer than the selected value.
     *
     * Useful when detecting if a mail message needs any processing at all –
     * if only plaintext characters are used and lines are short, then there is
     * no need to encode the values in any way. If the value is plaintext but has
     * longer lines then allowed, then use format=flowed
     *
     * @param {Number} lineLength Max line length to check for
     * @returns {Boolean} Returns true if there is at least one line longer than lineLength chars
     */
    hasLongerLines(str, lineLength) {
        if (str.length > 128 * 1024) {
            // do not test strings longer than 128kB
            return true;
        }
        return new RegExp('^.{' + (lineLength + 1) + ',}', 'm').test(str);
    },

    /**
     * Encodes a string or an Buffer to an UTF-8 MIME Word (rfc2047)
     *
     * @param {String|Buffer} data String to be encoded
     * @param {String} mimeWordEncoding='Q' Encoding for the mime word, either Q or B
     * @param {Number} [maxLength=0] If set, split mime words into several chunks if needed
     * @return {String} Single or several mime words joined together
     */
    encodeWord(data, mimeWordEncoding, maxLength) {
        mimeWordEncoding = (mimeWordEncoding || 'Q').toString().toUpperCase().trim().charAt(0);
        maxLength = maxLength || 0;

        let encodedStr;
        let toCharset = 'UTF-8';

        if (maxLength && maxLength > 7 + toCharset.length) {
            maxLength -= 7 + toCharset.length;
        }

        if (mimeWordEncoding === 'Q') {
            // https://tools.ietf.org/html/rfc2047#section-5 rule (3)
            encodedStr = qp.encode(data).replace(/[^a-z0-9!*+\-/=]/gi, chr => {
                let ord = chr.charCodeAt(0).toString(16).toUpperCase();
                if (chr === ' ') {
                    return '_';
                } else {
                    return '=' + (ord.length === 1 ? '0' + ord : ord);
                }
            });
        } else if (mimeWordEncoding === 'B') {
            encodedStr = typeof data === 'string' ? data : base64.encode(data);
            maxLength = maxLength ? Math.max(3, ((maxLength - (maxLength % 4)) / 4) * 3) : 0;
        }

        if (maxLength && (mimeWordEncoding !== 'B' ? encodedStr : base64.encode(data)).length > maxLength) {
            if (mimeWordEncoding === 'Q') {
                encodedStr = this.splitMimeEncodedString(encodedStr, maxLength).join('?= =?' + toCharset + '?' + mimeWordEncoding + '?');
            } else {
                // RFC2047 6.3 (2) states that encoded-word must include an integral number of characters, so no chopping unicode sequences
                let parts = [];
                let lpart = '';
                for (let i = 0, len = encodedStr.length; i < len; i++) {
                    let chr = encodedStr.charAt(i);
                    // check if we can add this character to the existing string
                    // without breaking byte length limit
                    if (Buffer.byteLength(lpart + chr) <= maxLength || i === 0) {
                        lpart += chr;
                    } else {
                        // we hit the length limit, so push the existing string and start over
                        parts.push(base64.encode(lpart));
                        lpart = chr;
                    }
                }
                if (lpart) {
                    parts.push(base64.encode(lpart));
                }

                if (parts.length > 1) {
                    encodedStr = parts.join('?= =?' + toCharset + '?' + mimeWordEncoding + '?');
                } else {
                    encodedStr = parts.join('');
                }
            }
        } else if (mimeWordEncoding === 'B') {
            encodedStr = base64.encode(data);
        }

        return '=?' + toCharset + '?' + mimeWordEncoding + '?' + encodedStr + (encodedStr.substr(-2) === '?=' ? '' : '?=');
    },

    /**
     * Finds word sequences with non ascii text and converts these to mime words
     *
     * @param {String} value String to be encoded
     * @param {String} mimeWordEncoding='Q' Encoding for the mime word, either Q or B
     * @param {Number} [maxLength=0] If set, split mime words into several chunks if needed
     * @param {Boolean} [encodeAll=false] If true and the value needs encoding then encodes entire string, not just the smallest match
     * @return {String} String with possible mime words
     */
    encodeWords(value, mimeWordEncoding, maxLength, encodeAll) {
        maxLength = maxLength || 0;

        let encodedValue;

        // find first word with a non-printable ascii or special symbol in it
        let firstMatch = value.match(/(?:^|\s)([^\s]*["\u0080-\uFFFF])/);
        if (!firstMatch) {
            return value;
        }

        if (encodeAll) {
            // if it is requested to encode everything or the string contains something that resebles encoded word, then encode everything

            return this.encodeWord(value, mimeWordEncoding, maxLength);
        }

        // find the last word with a non-printable ascii in it
        let lastMatch = value.match(/(["\u0080-\uFFFF][^\s]*)[^"\u0080-\uFFFF]*$/);
        if (!lastMatch) {
            // should not happen
            return value;
        }

        let startIndex =
            firstMatch.index +
            (
                firstMatch[0].match(/[^\s]/) || {
                    index: 0
                }
            ).index;
        let endIndex = lastMatch.index + (lastMatch[1] || '').length;

        encodedValue =
            (startIndex ? value.substr(0, startIndex) : '') +
            this.encodeWord(value.substring(startIndex, endIndex), mimeWordEncoding || 'Q', maxLength) +
            (endIndex < value.length ? value.substr(endIndex) : '');

        return encodedValue;
    },

    /**
     * Joins parsed header value together as 'value; param1=value1; param2=value2'
     * PS: We are following RFC 822 for the list of special characters that we need to keep in quotes.
     *      Refer: https://www.w3.org/Protocols/rfc1341/4_Content-Type.html
     * @param {Object} structured Parsed header value
     * @return {String} joined header value
     */
    buildHeaderValue(structured) {
        let paramsArray = [];

        Object.keys(structured.params || {}).forEach(param => {
            // filename might include unicode characters so it is a special case
            // other values probably do not
            let value = structured.params[param];
            if (!this.isPlainText(value, true) || value.length >= 75) {
                this.buildHeaderParam(param, value, 50).forEach(encodedParam => {
                    if (!/[\s"\\;:/=(),<>@[\]?]|^[-']|'$/.test(encodedParam.value) || encodedParam.key.substr(-1) === '*') {
                        paramsArray.push(encodedParam.key + '=' + encodedParam.value);
                    } else {
                        paramsArray.push(encodedParam.key + '=' + JSON.stringify(encodedParam.value));
                    }
                });
            } else if (/[\s'"\\;:/=(),<>@[\]?]|^-/.test(value)) {
                paramsArray.push(param + '=' + JSON.stringify(value));
            } else {
                paramsArray.push(param + '=' + value);
            }
        });

        return structured.value + (paramsArray.length ? '; ' + paramsArray.join('; ') : '');
    },

    /**
     * Encodes a string or an Buffer to an UTF-8 Parameter Value Continuation encoding (rfc2231)
     * Useful for splitting long parameter values.
     *
     * For example
     *      title="unicode string"
     * becomes
     *     title*0*=utf-8''unicode
     *     title*1*=%20string
     *
     * @param {String|Buffer} data String to be encoded
     * @param {Number} [maxLength=50] Max length for generated chunks
     * @param {String} [fromCharset='UTF-8'] Source sharacter set
     * @return {Array} A list of encoded keys and headers
     */
    buildHeaderParam(key, data, maxLength) {
        let list = [];
        let encodedStr = typeof data === 'string' ? data : (data || '').toString();
        let encodedStrArr;
        let chr, ord;
        let line;
        let startPos = 0;
        let i, len;

        maxLength = maxLength || 50;

        // process ascii only text
        if (this.isPlainText(data, true)) {
            // check if conversion is even needed
            if (encodedStr.length <= maxLength) {
                return [
                    {
                        key,
                        value: encodedStr
                    }
                ];
            }

            encodedStr = encodedStr.replace(new RegExp('.{' + maxLength + '}', 'g'), str => {
                list.push({
                    line: str
                });
                return '';
            });

            if (encodedStr) {
                list.push({
                    line: encodedStr
                });
            }
        } else {
            if (/[\uD800-\uDBFF]/.test(encodedStr)) {
                // string containts surrogate pairs, so normalize it to an array of bytes
                encodedStrArr = [];
                for (i = 0, len = encodedStr.length; i < len; i++) {
                    chr = encodedStr.charAt(i);
                    ord = chr.charCodeAt(0);
                    if (ord >= 0xd800 && ord <= 0xdbff && i < len - 1) {
                        chr += encodedStr.charAt(i + 1);
                        encodedStrArr.push(chr);
                        i++;
                    } else {
                        encodedStrArr.push(chr);
                    }
                }
                encodedStr = encodedStrArr;
            }

            // first line includes the charset and language info and needs to be encoded
            // even if it does not contain any unicode characters
            line = 'utf-8\x27\x27';
            let encoded = true;
            startPos = 0;

            // process text with unicode or special chars
            for (i = 0, len = encodedStr.length; i < len; i++) {
                chr = encodedStr[i];

                if (encoded) {
                    chr = this.safeEncodeURIComponent(chr);
                } else {
                    // try to urlencode current char
                    chr = chr === ' ' ? chr : this.safeEncodeURIComponent(chr);
                    // By default it is not required to encode a line, the need
                    // only appears when the string contains unicode or special chars
                    // in this case we start processing the line over and encode all chars
                    if (chr !== encodedStr[i]) {
                        // Check if it is even possible to add the encoded char to the line
                        // If not, there is no reason to use this line, just push it to the list
                        // and start a new line with the char that needs encoding
                        if ((this.safeEncodeURIComponent(line) + chr).length >= maxLength) {
                            list.push({
                                line,
                                encoded
                            });
                            line = '';
                            startPos = i - 1;
                        } else {
                            encoded = true;
                            i = startPos;
                            line = '';
                            continue;
                        }
                    }
                }

                // if the line is already too long, push it to the list and start a new one
                if ((line + chr).length >= maxLength) {
                    list.push({
                        line,
                        encoded
                    });
                    line = chr = encodedStr[i] === ' ' ? ' ' : this.safeEncodeURIComponent(encodedStr[i]);
                    if (chr === encodedStr[i]) {
                        encoded = false;
                        startPos = i - 1;
                    } else {
                        encoded = true;
                    }
                } else {
                    line += chr;
                }
            }

            if (line) {
                list.push({
                    line,
                    encoded
                });
            }
        }

        return list.map((item, i) => ({
            // encoded lines: {name}*{part}*
            // unencoded lines: {name}*{part}
            // if any line needs to be encoded then the first line (part==0) is always encoded
            key: key + '*' + i + (item.encoded ? '*' : ''),
            value: item.line
        }));
    },

    /**
     * Parses a header value with key=value arguments into a structured
     * object.
     *
     *   parseHeaderValue('content-type: text/plain; CHARSET='UTF-8'') ->
     *   {
     *     'value': 'text/plain',
     *     'params': {
     *       'charset': 'UTF-8'
     *     }
     *   }
     *
     * @param {String} str Header value
     * @return {Object} Header value as a parsed structure
     */
    parseHeaderValue(str) {
        let response = {
            value: false,
            params: {}
        };
        let key = false;
        let value = '';
        let type = 'value';
        let quote = false;
        let escaped = false;
        let chr;

        for (let i = 0, len = str.length; i < len; i++) {
            chr = str.charAt(i);
            if (type === 'key') {
                if (chr === '=') {
                    key = value.trim().toLowerCase();
                    type = 'value';
                    value = '';
                    continue;
                }
                value += chr;
            } else {
                if (escaped) {
                    value += chr;
                } else if (chr === '\\') {
                    escaped = true;
                    continue;
                } else if (quote && chr === quote) {
                    quote = false;
                } else if (!quote && chr === '"') {
                    quote = chr;
                } else if (!quote && chr === ';') {
                    if (key === false) {
                        response.value = value.trim();
                    } else {
                        response.params[key] = value.trim();
                    }
                    type = 'key';
                    value = '';
                } else {
                    value += chr;
                }
                escaped = false;
            }
        }

        if (type === 'value') {
            if (key === false) {
                response.value = value.trim();
            } else {
                response.params[key] = value.trim();
            }
        } else if (value.trim()) {
            response.params[value.trim().toLowerCase()] = '';
        }

        // handle parameter value continuations
        // https://tools.ietf.org/html/rfc2231#section-3

        // preprocess values
        Object.keys(response.params).forEach(key => {
            let actualKey, nr, match, value;
            if ((match = key.match(/(\*(\d+)|\*(\d+)\*|\*)$/))) {
                actualKey = key.substr(0, match.index);
                nr = Number(match[2] || match[3]) || 0;

                if (!response.params[actualKey] || typeof response.params[actualKey] !== 'object') {
                    response.params[actualKey] = {
                        charset: false,
                        values: []
                    };
                }

                value = response.params[key];

                if (nr === 0 && match[0].substr(-1) === '*' && (match = value.match(/^([^']*)'[^']*'(.*)$/))) {
                    response.params[actualKey].charset = match[1] || 'iso-8859-1';
                    value = match[2];
                }

                response.params[actualKey].values[nr] = value;

                // remove the old reference
                delete response.params[key];
            }
        });

        // concatenate split rfc2231 strings and convert encoded strings to mime encoded words
        Object.keys(response.params).forEach(key => {
            let value;
            if (response.params[key] && Array.isArray(response.params[key].values)) {
                value = response.params[key].values.map(val => val || '').join('');

                if (response.params[key].charset) {
                    // convert "%AB" to "=?charset?Q?=AB?="
                    response.params[key] =
                        '=?' +
                        response.params[key].charset +
                        '?Q?' +
                        value
                            // fix invalidly encoded chars
                            .replace(/[=?_\s]/g, s => {
                                let c = s.charCodeAt(0).toString(16);
                                if (s === ' ') {
                                    return '_';
                                } else {
                                    return '%' + (c.length < 2 ? '0' : '') + c;
                                }
                            })
                            // change from urlencoding to percent encoding
                            .replace(/%/g, '=') +
                        '?=';
                } else {
                    response.params[key] = value;
                }
            }
        });

        return response;
    },

    /**
     * Returns file extension for a content type string. If no suitable extensions
     * are found, 'bin' is used as the default extension
     *
     * @param {String} mimeType Content type to be checked for
     * @return {String} File extension
     */
    detectExtension: mimeType => mimeTypes.detectExtension(mimeType),

    /**
     * Returns content type for a file extension. If no suitable content types
     * are found, 'application/octet-stream' is used as the default content type
     *
     * @param {String} extension Extension to be checked for
     * @return {String} File extension
     */
    detectMimeType: extension => mimeTypes.detectMimeType(extension),

    /**
     * Folds long lines, useful for folding header lines (afterSpace=false) and
     * flowed text (afterSpace=true)
     *
     * @param {String} str String to be folded
     * @param {Number} [lineLength=76] Maximum length of a line
     * @param {Boolean} afterSpace If true, leave a space in th end of a line
     * @return {String} String with folded lines
     */
    foldLines(str, lineLength, afterSpace) {
        str = (str || '').toString();
        lineLength = lineLength || 76;

        let pos = 0,
            len = str.length,
            result = '',
            line,
            match;

        while (pos < len) {
            line = str.substr(pos, lineLength);
            if (line.length < lineLength) {
                result += line;
                break;
            }
            if ((match = line.match(/^[^\n\r]*(\r?\n|\r)/))) {
                line = match[0];
                result += line;
                pos += line.length;
                continue;
            } else if ((match = line.match(/(\s+)[^\s]*$/)) && match[0].length - (afterSpace ? (match[1] || '').length : 0) < line.length) {
                line = line.substr(0, line.length - (match[0].length - (afterSpace ? (match[1] || '').length : 0)));
            } else if ((match = str.substr(pos + line.length).match(/^[^\s]+(\s*)/))) {
                line = line + match[0].substr(0, match[0].length - (!afterSpace ? (match[1] || '').length : 0));
            }

            result += line;
            pos += line.length;
            if (pos < len) {
                result += '\r\n';
            }
        }

        return result;
    },

    /**
     * Splits a mime encoded string. Needed for dividing mime words into smaller chunks
     *
     * @param {String} str Mime encoded string to be split up
     * @param {Number} maxlen Maximum length of characters for one part (minimum 12)
     * @return {Array} Split string
     */
    splitMimeEncodedString: (str, maxlen) => {
        let curLine,
            match,
            chr,
            done,
            lines = [];

        // require at least 12 symbols to fit possible 4 octet UTF-8 sequences
        maxlen = Math.max(maxlen || 0, 12);

        while (str.length) {
            curLine = str.substr(0, maxlen);

            // move incomplete escaped char back to main
            if ((match = curLine.match(/[=][0-9A-F]?$/i))) {
                curLine = curLine.substr(0, match.index);
            }

            done = false;
            while (!done) {
                done = true;
                // check if not middle of a unicode char sequence
                if ((match = str.substr(curLine.length).match(/^[=]([0-9A-F]{2})/i))) {
                    chr = parseInt(match[1], 16);
                    // invalid sequence, move one char back anc recheck
                    if (chr < 0xc2 && chr > 0x7f) {
                        curLine = curLine.substr(0, curLine.length - 3);
                        done = false;
                    }
                }
            }

            if (curLine.length) {
                lines.push(curLine);
            }
            str = str.substr(curLine.length);
        }

        return lines;
    },

    encodeURICharComponent: chr => {
        let res = '';
        let ord = chr.charCodeAt(0).toString(16).toUpperCase();

        if (ord.length % 2) {
            ord = '0' + ord;
        }

        if (ord.length > 2) {
            for (let i = 0, len = ord.length / 2; i < len; i++) {
                res += '%' + ord.substr(i, 2);
            }
        } else {
            res += '%' + ord;
        }

        return res;
    },

    safeEncodeURIComponent(str) {
        str = (str || '').toString();

        try {
            // might throw if we try to encode invalid sequences, eg. partial emoji
            str = encodeURIComponent(str);
        } catch (E) {
            // should never run
            return str.replace(/[^\x00-\x1F *'()<>@,;:\\"[\]?=\u007F-\uFFFF]+/g, '');
        }

        // ensure chars that are not handled by encodeURICompent are converted as well
        return str.replace(/[\x00-\x1F *'()<>@,;:\\"[\]?=\u007F-\uFFFF]/g, chr => this.encodeURICharComponent(chr));
    }
};


/***/ }),

/***/ 5402:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/* eslint quote-props: 0 */



const path = __nccwpck_require__(1017);

const defaultMimeType = 'application/octet-stream';
const defaultExtension = 'bin';

const mimeTypes = new Map([
    ['application/acad', 'dwg'],
    ['application/applixware', 'aw'],
    ['application/arj', 'arj'],
    ['application/atom+xml', 'xml'],
    ['application/atomcat+xml', 'atomcat'],
    ['application/atomsvc+xml', 'atomsvc'],
    ['application/base64', ['mm', 'mme']],
    ['application/binhex', 'hqx'],
    ['application/binhex4', 'hqx'],
    ['application/book', ['book', 'boo']],
    ['application/ccxml+xml,', 'ccxml'],
    ['application/cdf', 'cdf'],
    ['application/cdmi-capability', 'cdmia'],
    ['application/cdmi-container', 'cdmic'],
    ['application/cdmi-domain', 'cdmid'],
    ['application/cdmi-object', 'cdmio'],
    ['application/cdmi-queue', 'cdmiq'],
    ['application/clariscad', 'ccad'],
    ['application/commonground', 'dp'],
    ['application/cu-seeme', 'cu'],
    ['application/davmount+xml', 'davmount'],
    ['application/drafting', 'drw'],
    ['application/dsptype', 'tsp'],
    ['application/dssc+der', 'dssc'],
    ['application/dssc+xml', 'xdssc'],
    ['application/dxf', 'dxf'],
    ['application/ecmascript', ['js', 'es']],
    ['application/emma+xml', 'emma'],
    ['application/envoy', 'evy'],
    ['application/epub+zip', 'epub'],
    ['application/excel', ['xls', 'xl', 'xla', 'xlb', 'xlc', 'xld', 'xlk', 'xll', 'xlm', 'xlt', 'xlv', 'xlw']],
    ['application/exi', 'exi'],
    ['application/font-tdpfr', 'pfr'],
    ['application/fractals', 'fif'],
    ['application/freeloader', 'frl'],
    ['application/futuresplash', 'spl'],
    ['application/gnutar', 'tgz'],
    ['application/groupwise', 'vew'],
    ['application/hlp', 'hlp'],
    ['application/hta', 'hta'],
    ['application/hyperstudio', 'stk'],
    ['application/i-deas', 'unv'],
    ['application/iges', ['iges', 'igs']],
    ['application/inf', 'inf'],
    ['application/internet-property-stream', 'acx'],
    ['application/ipfix', 'ipfix'],
    ['application/java', 'class'],
    ['application/java-archive', 'jar'],
    ['application/java-byte-code', 'class'],
    ['application/java-serialized-object', 'ser'],
    ['application/java-vm', 'class'],
    ['application/javascript', 'js'],
    ['application/json', 'json'],
    ['application/lha', 'lha'],
    ['application/lzx', 'lzx'],
    ['application/mac-binary', 'bin'],
    ['application/mac-binhex', 'hqx'],
    ['application/mac-binhex40', 'hqx'],
    ['application/mac-compactpro', 'cpt'],
    ['application/macbinary', 'bin'],
    ['application/mads+xml', 'mads'],
    ['application/marc', 'mrc'],
    ['application/marcxml+xml', 'mrcx'],
    ['application/mathematica', 'ma'],
    ['application/mathml+xml', 'mathml'],
    ['application/mbedlet', 'mbd'],
    ['application/mbox', 'mbox'],
    ['application/mcad', 'mcd'],
    ['application/mediaservercontrol+xml', 'mscml'],
    ['application/metalink4+xml', 'meta4'],
    ['application/mets+xml', 'mets'],
    ['application/mime', 'aps'],
    ['application/mods+xml', 'mods'],
    ['application/mp21', 'm21'],
    ['application/mp4', 'mp4'],
    ['application/mspowerpoint', ['ppt', 'pot', 'pps', 'ppz']],
    ['application/msword', ['doc', 'dot', 'w6w', 'wiz', 'word']],
    ['application/mswrite', 'wri'],
    ['application/mxf', 'mxf'],
    ['application/netmc', 'mcp'],
    ['application/octet-stream', ['*']],
    ['application/oda', 'oda'],
    ['application/oebps-package+xml', 'opf'],
    ['application/ogg', 'ogx'],
    ['application/olescript', 'axs'],
    ['application/onenote', 'onetoc'],
    ['application/patch-ops-error+xml', 'xer'],
    ['application/pdf', 'pdf'],
    ['application/pgp-encrypted', 'asc'],
    ['application/pgp-signature', 'pgp'],
    ['application/pics-rules', 'prf'],
    ['application/pkcs-12', 'p12'],
    ['application/pkcs-crl', 'crl'],
    ['application/pkcs10', 'p10'],
    ['application/pkcs7-mime', ['p7c', 'p7m']],
    ['application/pkcs7-signature', 'p7s'],
    ['application/pkcs8', 'p8'],
    ['application/pkix-attr-cert', 'ac'],
    ['application/pkix-cert', ['cer', 'crt']],
    ['application/pkix-crl', 'crl'],
    ['application/pkix-pkipath', 'pkipath'],
    ['application/pkixcmp', 'pki'],
    ['application/plain', 'text'],
    ['application/pls+xml', 'pls'],
    ['application/postscript', ['ps', 'ai', 'eps']],
    ['application/powerpoint', 'ppt'],
    ['application/pro_eng', ['part', 'prt']],
    ['application/prs.cww', 'cww'],
    ['application/pskc+xml', 'pskcxml'],
    ['application/rdf+xml', 'rdf'],
    ['application/reginfo+xml', 'rif'],
    ['application/relax-ng-compact-syntax', 'rnc'],
    ['application/resource-lists+xml', 'rl'],
    ['application/resource-lists-diff+xml', 'rld'],
    ['application/ringing-tones', 'rng'],
    ['application/rls-services+xml', 'rs'],
    ['application/rsd+xml', 'rsd'],
    ['application/rss+xml', 'xml'],
    ['application/rtf', ['rtf', 'rtx']],
    ['application/sbml+xml', 'sbml'],
    ['application/scvp-cv-request', 'scq'],
    ['application/scvp-cv-response', 'scs'],
    ['application/scvp-vp-request', 'spq'],
    ['application/scvp-vp-response', 'spp'],
    ['application/sdp', 'sdp'],
    ['application/sea', 'sea'],
    ['application/set', 'set'],
    ['application/set-payment-initiation', 'setpay'],
    ['application/set-registration-initiation', 'setreg'],
    ['application/shf+xml', 'shf'],
    ['application/sla', 'stl'],
    ['application/smil', ['smi', 'smil']],
    ['application/smil+xml', 'smi'],
    ['application/solids', 'sol'],
    ['application/sounder', 'sdr'],
    ['application/sparql-query', 'rq'],
    ['application/sparql-results+xml', 'srx'],
    ['application/srgs', 'gram'],
    ['application/srgs+xml', 'grxml'],
    ['application/sru+xml', 'sru'],
    ['application/ssml+xml', 'ssml'],
    ['application/step', ['step', 'stp']],
    ['application/streamingmedia', 'ssm'],
    ['application/tei+xml', 'tei'],
    ['application/thraud+xml', 'tfi'],
    ['application/timestamped-data', 'tsd'],
    ['application/toolbook', 'tbk'],
    ['application/vda', 'vda'],
    ['application/vnd.3gpp.pic-bw-large', 'plb'],
    ['application/vnd.3gpp.pic-bw-small', 'psb'],
    ['application/vnd.3gpp.pic-bw-var', 'pvb'],
    ['application/vnd.3gpp2.tcap', 'tcap'],
    ['application/vnd.3m.post-it-notes', 'pwn'],
    ['application/vnd.accpac.simply.aso', 'aso'],
    ['application/vnd.accpac.simply.imp', 'imp'],
    ['application/vnd.acucobol', 'acu'],
    ['application/vnd.acucorp', 'atc'],
    ['application/vnd.adobe.air-application-installer-package+zip', 'air'],
    ['application/vnd.adobe.fxp', 'fxp'],
    ['application/vnd.adobe.xdp+xml', 'xdp'],
    ['application/vnd.adobe.xfdf', 'xfdf'],
    ['application/vnd.ahead.space', 'ahead'],
    ['application/vnd.airzip.filesecure.azf', 'azf'],
    ['application/vnd.airzip.filesecure.azs', 'azs'],
    ['application/vnd.amazon.ebook', 'azw'],
    ['application/vnd.americandynamics.acc', 'acc'],
    ['application/vnd.amiga.ami', 'ami'],
    ['application/vnd.android.package-archive', 'apk'],
    ['application/vnd.anser-web-certificate-issue-initiation', 'cii'],
    ['application/vnd.anser-web-funds-transfer-initiation', 'fti'],
    ['application/vnd.antix.game-component', 'atx'],
    ['application/vnd.apple.installer+xml', 'mpkg'],
    ['application/vnd.apple.mpegurl', 'm3u8'],
    ['application/vnd.aristanetworks.swi', 'swi'],
    ['application/vnd.audiograph', 'aep'],
    ['application/vnd.blueice.multipass', 'mpm'],
    ['application/vnd.bmi', 'bmi'],
    ['application/vnd.businessobjects', 'rep'],
    ['application/vnd.chemdraw+xml', 'cdxml'],
    ['application/vnd.chipnuts.karaoke-mmd', 'mmd'],
    ['application/vnd.cinderella', 'cdy'],
    ['application/vnd.claymore', 'cla'],
    ['application/vnd.cloanto.rp9', 'rp9'],
    ['application/vnd.clonk.c4group', 'c4g'],
    ['application/vnd.cluetrust.cartomobile-config', 'c11amc'],
    ['application/vnd.cluetrust.cartomobile-config-pkg', 'c11amz'],
    ['application/vnd.commonspace', 'csp'],
    ['application/vnd.contact.cmsg', 'cdbcmsg'],
    ['application/vnd.cosmocaller', 'cmc'],
    ['application/vnd.crick.clicker', 'clkx'],
    ['application/vnd.crick.clicker.keyboard', 'clkk'],
    ['application/vnd.crick.clicker.palette', 'clkp'],
    ['application/vnd.crick.clicker.template', 'clkt'],
    ['application/vnd.crick.clicker.wordbank', 'clkw'],
    ['application/vnd.criticaltools.wbs+xml', 'wbs'],
    ['application/vnd.ctc-posml', 'pml'],
    ['application/vnd.cups-ppd', 'ppd'],
    ['application/vnd.curl.car', 'car'],
    ['application/vnd.curl.pcurl', 'pcurl'],
    ['application/vnd.data-vision.rdz', 'rdz'],
    ['application/vnd.denovo.fcselayout-link', 'fe_launch'],
    ['application/vnd.dna', 'dna'],
    ['application/vnd.dolby.mlp', 'mlp'],
    ['application/vnd.dpgraph', 'dpg'],
    ['application/vnd.dreamfactory', 'dfac'],
    ['application/vnd.dvb.ait', 'ait'],
    ['application/vnd.dvb.service', 'svc'],
    ['application/vnd.dynageo', 'geo'],
    ['application/vnd.ecowin.chart', 'mag'],
    ['application/vnd.enliven', 'nml'],
    ['application/vnd.epson.esf', 'esf'],
    ['application/vnd.epson.msf', 'msf'],
    ['application/vnd.epson.quickanime', 'qam'],
    ['application/vnd.epson.salt', 'slt'],
    ['application/vnd.epson.ssf', 'ssf'],
    ['application/vnd.eszigno3+xml', 'es3'],
    ['application/vnd.ezpix-album', 'ez2'],
    ['application/vnd.ezpix-package', 'ez3'],
    ['application/vnd.fdf', 'fdf'],
    ['application/vnd.fdsn.seed', 'seed'],
    ['application/vnd.flographit', 'gph'],
    ['application/vnd.fluxtime.clip', 'ftc'],
    ['application/vnd.framemaker', 'fm'],
    ['application/vnd.frogans.fnc', 'fnc'],
    ['application/vnd.frogans.ltf', 'ltf'],
    ['application/vnd.fsc.weblaunch', 'fsc'],
    ['application/vnd.fujitsu.oasys', 'oas'],
    ['application/vnd.fujitsu.oasys2', 'oa2'],
    ['application/vnd.fujitsu.oasys3', 'oa3'],
    ['application/vnd.fujitsu.oasysgp', 'fg5'],
    ['application/vnd.fujitsu.oasysprs', 'bh2'],
    ['application/vnd.fujixerox.ddd', 'ddd'],
    ['application/vnd.fujixerox.docuworks', 'xdw'],
    ['application/vnd.fujixerox.docuworks.binder', 'xbd'],
    ['application/vnd.fuzzysheet', 'fzs'],
    ['application/vnd.genomatix.tuxedo', 'txd'],
    ['application/vnd.geogebra.file', 'ggb'],
    ['application/vnd.geogebra.tool', 'ggt'],
    ['application/vnd.geometry-explorer', 'gex'],
    ['application/vnd.geonext', 'gxt'],
    ['application/vnd.geoplan', 'g2w'],
    ['application/vnd.geospace', 'g3w'],
    ['application/vnd.gmx', 'gmx'],
    ['application/vnd.google-earth.kml+xml', 'kml'],
    ['application/vnd.google-earth.kmz', 'kmz'],
    ['application/vnd.grafeq', 'gqf'],
    ['application/vnd.groove-account', 'gac'],
    ['application/vnd.groove-help', 'ghf'],
    ['application/vnd.groove-identity-message', 'gim'],
    ['application/vnd.groove-injector', 'grv'],
    ['application/vnd.groove-tool-message', 'gtm'],
    ['application/vnd.groove-tool-template', 'tpl'],
    ['application/vnd.groove-vcard', 'vcg'],
    ['application/vnd.hal+xml', 'hal'],
    ['application/vnd.handheld-entertainment+xml', 'zmm'],
    ['application/vnd.hbci', 'hbci'],
    ['application/vnd.hhe.lesson-player', 'les'],
    ['application/vnd.hp-hpgl', ['hgl', 'hpg', 'hpgl']],
    ['application/vnd.hp-hpid', 'hpid'],
    ['application/vnd.hp-hps', 'hps'],
    ['application/vnd.hp-jlyt', 'jlt'],
    ['application/vnd.hp-pcl', 'pcl'],
    ['application/vnd.hp-pclxl', 'pclxl'],
    ['application/vnd.hydrostatix.sof-data', 'sfd-hdstx'],
    ['application/vnd.hzn-3d-crossword', 'x3d'],
    ['application/vnd.ibm.minipay', 'mpy'],
    ['application/vnd.ibm.modcap', 'afp'],
    ['application/vnd.ibm.rights-management', 'irm'],
    ['application/vnd.ibm.secure-container', 'sc'],
    ['application/vnd.iccprofile', 'icc'],
    ['application/vnd.igloader', 'igl'],
    ['application/vnd.immervision-ivp', 'ivp'],
    ['application/vnd.immervision-ivu', 'ivu'],
    ['application/vnd.insors.igm', 'igm'],
    ['application/vnd.intercon.formnet', 'xpw'],
    ['application/vnd.intergeo', 'i2g'],
    ['application/vnd.intu.qbo', 'qbo'],
    ['application/vnd.intu.qfx', 'qfx'],
    ['application/vnd.ipunplugged.rcprofile', 'rcprofile'],
    ['application/vnd.irepository.package+xml', 'irp'],
    ['application/vnd.is-xpr', 'xpr'],
    ['application/vnd.isac.fcs', 'fcs'],
    ['application/vnd.jam', 'jam'],
    ['application/vnd.jcp.javame.midlet-rms', 'rms'],
    ['application/vnd.jisp', 'jisp'],
    ['application/vnd.joost.joda-archive', 'joda'],
    ['application/vnd.kahootz', 'ktz'],
    ['application/vnd.kde.karbon', 'karbon'],
    ['application/vnd.kde.kchart', 'chrt'],
    ['application/vnd.kde.kformula', 'kfo'],
    ['application/vnd.kde.kivio', 'flw'],
    ['application/vnd.kde.kontour', 'kon'],
    ['application/vnd.kde.kpresenter', 'kpr'],
    ['application/vnd.kde.kspread', 'ksp'],
    ['application/vnd.kde.kword', 'kwd'],
    ['application/vnd.kenameaapp', 'htke'],
    ['application/vnd.kidspiration', 'kia'],
    ['application/vnd.kinar', 'kne'],
    ['application/vnd.koan', 'skp'],
    ['application/vnd.kodak-descriptor', 'sse'],
    ['application/vnd.las.las+xml', 'lasxml'],
    ['application/vnd.llamagraphics.life-balance.desktop', 'lbd'],
    ['application/vnd.llamagraphics.life-balance.exchange+xml', 'lbe'],
    ['application/vnd.lotus-1-2-3', '123'],
    ['application/vnd.lotus-approach', 'apr'],
    ['application/vnd.lotus-freelance', 'pre'],
    ['application/vnd.lotus-notes', 'nsf'],
    ['application/vnd.lotus-organizer', 'org'],
    ['application/vnd.lotus-screencam', 'scm'],
    ['application/vnd.lotus-wordpro', 'lwp'],
    ['application/vnd.macports.portpkg', 'portpkg'],
    ['application/vnd.mcd', 'mcd'],
    ['application/vnd.medcalcdata', 'mc1'],
    ['application/vnd.mediastation.cdkey', 'cdkey'],
    ['application/vnd.mfer', 'mwf'],
    ['application/vnd.mfmp', 'mfm'],
    ['application/vnd.micrografx.flo', 'flo'],
    ['application/vnd.micrografx.igx', 'igx'],
    ['application/vnd.mif', 'mif'],
    ['application/vnd.mobius.daf', 'daf'],
    ['application/vnd.mobius.dis', 'dis'],
    ['application/vnd.mobius.mbk', 'mbk'],
    ['application/vnd.mobius.mqy', 'mqy'],
    ['application/vnd.mobius.msl', 'msl'],
    ['application/vnd.mobius.plc', 'plc'],
    ['application/vnd.mobius.txf', 'txf'],
    ['application/vnd.mophun.application', 'mpn'],
    ['application/vnd.mophun.certificate', 'mpc'],
    ['application/vnd.mozilla.xul+xml', 'xul'],
    ['application/vnd.ms-artgalry', 'cil'],
    ['application/vnd.ms-cab-compressed', 'cab'],
    ['application/vnd.ms-excel', ['xls', 'xla', 'xlc', 'xlm', 'xlt', 'xlw', 'xlb', 'xll']],
    ['application/vnd.ms-excel.addin.macroenabled.12', 'xlam'],
    ['application/vnd.ms-excel.sheet.binary.macroenabled.12', 'xlsb'],
    ['application/vnd.ms-excel.sheet.macroenabled.12', 'xlsm'],
    ['application/vnd.ms-excel.template.macroenabled.12', 'xltm'],
    ['application/vnd.ms-fontobject', 'eot'],
    ['application/vnd.ms-htmlhelp', 'chm'],
    ['application/vnd.ms-ims', 'ims'],
    ['application/vnd.ms-lrm', 'lrm'],
    ['application/vnd.ms-officetheme', 'thmx'],
    ['application/vnd.ms-outlook', 'msg'],
    ['application/vnd.ms-pki.certstore', 'sst'],
    ['application/vnd.ms-pki.pko', 'pko'],
    ['application/vnd.ms-pki.seccat', 'cat'],
    ['application/vnd.ms-pki.stl', 'stl'],
    ['application/vnd.ms-pkicertstore', 'sst'],
    ['application/vnd.ms-pkiseccat', 'cat'],
    ['application/vnd.ms-pkistl', 'stl'],
    ['application/vnd.ms-powerpoint', ['ppt', 'pot', 'pps', 'ppa', 'pwz']],
    ['application/vnd.ms-powerpoint.addin.macroenabled.12', 'ppam'],
    ['application/vnd.ms-powerpoint.presentation.macroenabled.12', 'pptm'],
    ['application/vnd.ms-powerpoint.slide.macroenabled.12', 'sldm'],
    ['application/vnd.ms-powerpoint.slideshow.macroenabled.12', 'ppsm'],
    ['application/vnd.ms-powerpoint.template.macroenabled.12', 'potm'],
    ['application/vnd.ms-project', 'mpp'],
    ['application/vnd.ms-word.document.macroenabled.12', 'docm'],
    ['application/vnd.ms-word.template.macroenabled.12', 'dotm'],
    ['application/vnd.ms-works', ['wks', 'wcm', 'wdb', 'wps']],
    ['application/vnd.ms-wpl', 'wpl'],
    ['application/vnd.ms-xpsdocument', 'xps'],
    ['application/vnd.mseq', 'mseq'],
    ['application/vnd.musician', 'mus'],
    ['application/vnd.muvee.style', 'msty'],
    ['application/vnd.neurolanguage.nlu', 'nlu'],
    ['application/vnd.noblenet-directory', 'nnd'],
    ['application/vnd.noblenet-sealer', 'nns'],
    ['application/vnd.noblenet-web', 'nnw'],
    ['application/vnd.nokia.configuration-message', 'ncm'],
    ['application/vnd.nokia.n-gage.data', 'ngdat'],
    ['application/vnd.nokia.n-gage.symbian.install', 'n-gage'],
    ['application/vnd.nokia.radio-preset', 'rpst'],
    ['application/vnd.nokia.radio-presets', 'rpss'],
    ['application/vnd.nokia.ringing-tone', 'rng'],
    ['application/vnd.novadigm.edm', 'edm'],
    ['application/vnd.novadigm.edx', 'edx'],
    ['application/vnd.novadigm.ext', 'ext'],
    ['application/vnd.oasis.opendocument.chart', 'odc'],
    ['application/vnd.oasis.opendocument.chart-template', 'otc'],
    ['application/vnd.oasis.opendocument.database', 'odb'],
    ['application/vnd.oasis.opendocument.formula', 'odf'],
    ['application/vnd.oasis.opendocument.formula-template', 'odft'],
    ['application/vnd.oasis.opendocument.graphics', 'odg'],
    ['application/vnd.oasis.opendocument.graphics-template', 'otg'],
    ['application/vnd.oasis.opendocument.image', 'odi'],
    ['application/vnd.oasis.opendocument.image-template', 'oti'],
    ['application/vnd.oasis.opendocument.presentation', 'odp'],
    ['application/vnd.oasis.opendocument.presentation-template', 'otp'],
    ['application/vnd.oasis.opendocument.spreadsheet', 'ods'],
    ['application/vnd.oasis.opendocument.spreadsheet-template', 'ots'],
    ['application/vnd.oasis.opendocument.text', 'odt'],
    ['application/vnd.oasis.opendocument.text-master', 'odm'],
    ['application/vnd.oasis.opendocument.text-template', 'ott'],
    ['application/vnd.oasis.opendocument.text-web', 'oth'],
    ['application/vnd.olpc-sugar', 'xo'],
    ['application/vnd.oma.dd2+xml', 'dd2'],
    ['application/vnd.openofficeorg.extension', 'oxt'],
    ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'pptx'],
    ['application/vnd.openxmlformats-officedocument.presentationml.slide', 'sldx'],
    ['application/vnd.openxmlformats-officedocument.presentationml.slideshow', 'ppsx'],
    ['application/vnd.openxmlformats-officedocument.presentationml.template', 'potx'],
    ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'xlsx'],
    ['application/vnd.openxmlformats-officedocument.spreadsheetml.template', 'xltx'],
    ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'docx'],
    ['application/vnd.openxmlformats-officedocument.wordprocessingml.template', 'dotx'],
    ['application/vnd.osgeo.mapguide.package', 'mgp'],
    ['application/vnd.osgi.dp', 'dp'],
    ['application/vnd.palm', 'pdb'],
    ['application/vnd.pawaafile', 'paw'],
    ['application/vnd.pg.format', 'str'],
    ['application/vnd.pg.osasli', 'ei6'],
    ['application/vnd.picsel', 'efif'],
    ['application/vnd.pmi.widget', 'wg'],
    ['application/vnd.pocketlearn', 'plf'],
    ['application/vnd.powerbuilder6', 'pbd'],
    ['application/vnd.previewsystems.box', 'box'],
    ['application/vnd.proteus.magazine', 'mgz'],
    ['application/vnd.publishare-delta-tree', 'qps'],
    ['application/vnd.pvi.ptid1', 'ptid'],
    ['application/vnd.quark.quarkxpress', 'qxd'],
    ['application/vnd.realvnc.bed', 'bed'],
    ['application/vnd.recordare.musicxml', 'mxl'],
    ['application/vnd.recordare.musicxml+xml', 'musicxml'],
    ['application/vnd.rig.cryptonote', 'cryptonote'],
    ['application/vnd.rim.cod', 'cod'],
    ['application/vnd.rn-realmedia', 'rm'],
    ['application/vnd.rn-realplayer', 'rnx'],
    ['application/vnd.route66.link66+xml', 'link66'],
    ['application/vnd.sailingtracker.track', 'st'],
    ['application/vnd.seemail', 'see'],
    ['application/vnd.sema', 'sema'],
    ['application/vnd.semd', 'semd'],
    ['application/vnd.semf', 'semf'],
    ['application/vnd.shana.informed.formdata', 'ifm'],
    ['application/vnd.shana.informed.formtemplate', 'itp'],
    ['application/vnd.shana.informed.interchange', 'iif'],
    ['application/vnd.shana.informed.package', 'ipk'],
    ['application/vnd.simtech-mindmapper', 'twd'],
    ['application/vnd.smaf', 'mmf'],
    ['application/vnd.smart.teacher', 'teacher'],
    ['application/vnd.solent.sdkm+xml', 'sdkm'],
    ['application/vnd.spotfire.dxp', 'dxp'],
    ['application/vnd.spotfire.sfs', 'sfs'],
    ['application/vnd.stardivision.calc', 'sdc'],
    ['application/vnd.stardivision.draw', 'sda'],
    ['application/vnd.stardivision.impress', 'sdd'],
    ['application/vnd.stardivision.math', 'smf'],
    ['application/vnd.stardivision.writer', 'sdw'],
    ['application/vnd.stardivision.writer-global', 'sgl'],
    ['application/vnd.stepmania.stepchart', 'sm'],
    ['application/vnd.sun.xml.calc', 'sxc'],
    ['application/vnd.sun.xml.calc.template', 'stc'],
    ['application/vnd.sun.xml.draw', 'sxd'],
    ['application/vnd.sun.xml.draw.template', 'std'],
    ['application/vnd.sun.xml.impress', 'sxi'],
    ['application/vnd.sun.xml.impress.template', 'sti'],
    ['application/vnd.sun.xml.math', 'sxm'],
    ['application/vnd.sun.xml.writer', 'sxw'],
    ['application/vnd.sun.xml.writer.global', 'sxg'],
    ['application/vnd.sun.xml.writer.template', 'stw'],
    ['application/vnd.sus-calendar', 'sus'],
    ['application/vnd.svd', 'svd'],
    ['application/vnd.symbian.install', 'sis'],
    ['application/vnd.syncml+xml', 'xsm'],
    ['application/vnd.syncml.dm+wbxml', 'bdm'],
    ['application/vnd.syncml.dm+xml', 'xdm'],
    ['application/vnd.tao.intent-module-archive', 'tao'],
    ['application/vnd.tmobile-livetv', 'tmo'],
    ['application/vnd.trid.tpt', 'tpt'],
    ['application/vnd.triscape.mxs', 'mxs'],
    ['application/vnd.trueapp', 'tra'],
    ['application/vnd.ufdl', 'ufd'],
    ['application/vnd.uiq.theme', 'utz'],
    ['application/vnd.umajin', 'umj'],
    ['application/vnd.unity', 'unityweb'],
    ['application/vnd.uoml+xml', 'uoml'],
    ['application/vnd.vcx', 'vcx'],
    ['application/vnd.visio', 'vsd'],
    ['application/vnd.visionary', 'vis'],
    ['application/vnd.vsf', 'vsf'],
    ['application/vnd.wap.wbxml', 'wbxml'],
    ['application/vnd.wap.wmlc', 'wmlc'],
    ['application/vnd.wap.wmlscriptc', 'wmlsc'],
    ['application/vnd.webturbo', 'wtb'],
    ['application/vnd.wolfram.player', 'nbp'],
    ['application/vnd.wordperfect', 'wpd'],
    ['application/vnd.wqd', 'wqd'],
    ['application/vnd.wt.stf', 'stf'],
    ['application/vnd.xara', ['web', 'xar']],
    ['application/vnd.xfdl', 'xfdl'],
    ['application/vnd.yamaha.hv-dic', 'hvd'],
    ['application/vnd.yamaha.hv-script', 'hvs'],
    ['application/vnd.yamaha.hv-voice', 'hvp'],
    ['application/vnd.yamaha.openscoreformat', 'osf'],
    ['application/vnd.yamaha.openscoreformat.osfpvg+xml', 'osfpvg'],
    ['application/vnd.yamaha.smaf-audio', 'saf'],
    ['application/vnd.yamaha.smaf-phrase', 'spf'],
    ['application/vnd.yellowriver-custom-menu', 'cmp'],
    ['application/vnd.zul', 'zir'],
    ['application/vnd.zzazz.deck+xml', 'zaz'],
    ['application/vocaltec-media-desc', 'vmd'],
    ['application/vocaltec-media-file', 'vmf'],
    ['application/voicexml+xml', 'vxml'],
    ['application/widget', 'wgt'],
    ['application/winhlp', 'hlp'],
    ['application/wordperfect', ['wp', 'wp5', 'wp6', 'wpd']],
    ['application/wordperfect6.0', ['w60', 'wp5']],
    ['application/wordperfect6.1', 'w61'],
    ['application/wsdl+xml', 'wsdl'],
    ['application/wspolicy+xml', 'wspolicy'],
    ['application/x-123', 'wk1'],
    ['application/x-7z-compressed', '7z'],
    ['application/x-abiword', 'abw'],
    ['application/x-ace-compressed', 'ace'],
    ['application/x-aim', 'aim'],
    ['application/x-authorware-bin', 'aab'],
    ['application/x-authorware-map', 'aam'],
    ['application/x-authorware-seg', 'aas'],
    ['application/x-bcpio', 'bcpio'],
    ['application/x-binary', 'bin'],
    ['application/x-binhex40', 'hqx'],
    ['application/x-bittorrent', 'torrent'],
    ['application/x-bsh', ['bsh', 'sh', 'shar']],
    ['application/x-bytecode.elisp', 'elc'],
    ['applicaiton/x-bytecode.python', 'pyc'],
    ['application/x-bzip', 'bz'],
    ['application/x-bzip2', ['boz', 'bz2']],
    ['application/x-cdf', 'cdf'],
    ['application/x-cdlink', 'vcd'],
    ['application/x-chat', ['cha', 'chat']],
    ['application/x-chess-pgn', 'pgn'],
    ['application/x-cmu-raster', 'ras'],
    ['application/x-cocoa', 'cco'],
    ['application/x-compactpro', 'cpt'],
    ['application/x-compress', 'z'],
    ['application/x-compressed', ['tgz', 'gz', 'z', 'zip']],
    ['application/x-conference', 'nsc'],
    ['application/x-cpio', 'cpio'],
    ['application/x-cpt', 'cpt'],
    ['application/x-csh', 'csh'],
    ['application/x-debian-package', 'deb'],
    ['application/x-deepv', 'deepv'],
    ['application/x-director', ['dir', 'dcr', 'dxr']],
    ['application/x-doom', 'wad'],
    ['application/x-dtbncx+xml', 'ncx'],
    ['application/x-dtbook+xml', 'dtb'],
    ['application/x-dtbresource+xml', 'res'],
    ['application/x-dvi', 'dvi'],
    ['application/x-elc', 'elc'],
    ['application/x-envoy', ['env', 'evy']],
    ['application/x-esrehber', 'es'],
    ['application/x-excel', ['xls', 'xla', 'xlb', 'xlc', 'xld', 'xlk', 'xll', 'xlm', 'xlt', 'xlv', 'xlw']],
    ['application/x-font-bdf', 'bdf'],
    ['application/x-font-ghostscript', 'gsf'],
    ['application/x-font-linux-psf', 'psf'],
    ['application/x-font-otf', 'otf'],
    ['application/x-font-pcf', 'pcf'],
    ['application/x-font-snf', 'snf'],
    ['application/x-font-ttf', 'ttf'],
    ['application/x-font-type1', 'pfa'],
    ['application/x-font-woff', 'woff'],
    ['application/x-frame', 'mif'],
    ['application/x-freelance', 'pre'],
    ['application/x-futuresplash', 'spl'],
    ['application/x-gnumeric', 'gnumeric'],
    ['application/x-gsp', 'gsp'],
    ['application/x-gss', 'gss'],
    ['application/x-gtar', 'gtar'],
    ['application/x-gzip', ['gz', 'gzip']],
    ['application/x-hdf', 'hdf'],
    ['application/x-helpfile', ['help', 'hlp']],
    ['application/x-httpd-imap', 'imap'],
    ['application/x-ima', 'ima'],
    ['application/x-internet-signup', ['ins', 'isp']],
    ['application/x-internett-signup', 'ins'],
    ['application/x-inventor', 'iv'],
    ['application/x-ip2', 'ip'],
    ['application/x-iphone', 'iii'],
    ['application/x-java-class', 'class'],
    ['application/x-java-commerce', 'jcm'],
    ['application/x-java-jnlp-file', 'jnlp'],
    ['application/x-javascript', 'js'],
    ['application/x-koan', ['skd', 'skm', 'skp', 'skt']],
    ['application/x-ksh', 'ksh'],
    ['application/x-latex', ['latex', 'ltx']],
    ['application/x-lha', 'lha'],
    ['application/x-lisp', 'lsp'],
    ['application/x-livescreen', 'ivy'],
    ['application/x-lotus', 'wq1'],
    ['application/x-lotusscreencam', 'scm'],
    ['application/x-lzh', 'lzh'],
    ['application/x-lzx', 'lzx'],
    ['application/x-mac-binhex40', 'hqx'],
    ['application/x-macbinary', 'bin'],
    ['application/x-magic-cap-package-1.0', 'mc$'],
    ['application/x-mathcad', 'mcd'],
    ['application/x-meme', 'mm'],
    ['application/x-midi', ['mid', 'midi']],
    ['application/x-mif', 'mif'],
    ['application/x-mix-transfer', 'nix'],
    ['application/x-mobipocket-ebook', 'prc'],
    ['application/x-mplayer2', 'asx'],
    ['application/x-ms-application', 'application'],
    ['application/x-ms-wmd', 'wmd'],
    ['application/x-ms-wmz', 'wmz'],
    ['application/x-ms-xbap', 'xbap'],
    ['application/x-msaccess', 'mdb'],
    ['application/x-msbinder', 'obd'],
    ['application/x-mscardfile', 'crd'],
    ['application/x-msclip', 'clp'],
    ['application/x-msdownload', ['exe', 'dll']],
    ['application/x-msexcel', ['xls', 'xla', 'xlw']],
    ['application/x-msmediaview', ['mvb', 'm13', 'm14']],
    ['application/x-msmetafile', 'wmf'],
    ['application/x-msmoney', 'mny'],
    ['application/x-mspowerpoint', 'ppt'],
    ['application/x-mspublisher', 'pub'],
    ['application/x-msschedule', 'scd'],
    ['application/x-msterminal', 'trm'],
    ['application/x-mswrite', 'wri'],
    ['application/x-navi-animation', 'ani'],
    ['application/x-navidoc', 'nvd'],
    ['application/x-navimap', 'map'],
    ['application/x-navistyle', 'stl'],
    ['application/x-netcdf', ['cdf', 'nc']],
    ['application/x-newton-compatible-pkg', 'pkg'],
    ['application/x-nokia-9000-communicator-add-on-software', 'aos'],
    ['application/x-omc', 'omc'],
    ['application/x-omcdatamaker', 'omcd'],
    ['application/x-omcregerator', 'omcr'],
    ['application/x-pagemaker', ['pm4', 'pm5']],
    ['application/x-pcl', 'pcl'],
    ['application/x-perfmon', ['pma', 'pmc', 'pml', 'pmr', 'pmw']],
    ['application/x-pixclscript', 'plx'],
    ['application/x-pkcs10', 'p10'],
    ['application/x-pkcs12', ['p12', 'pfx']],
    ['application/x-pkcs7-certificates', ['p7b', 'spc']],
    ['application/x-pkcs7-certreqresp', 'p7r'],
    ['application/x-pkcs7-mime', ['p7m', 'p7c']],
    ['application/x-pkcs7-signature', ['p7s', 'p7a']],
    ['application/x-pointplus', 'css'],
    ['application/x-portable-anymap', 'pnm'],
    ['application/x-project', ['mpc', 'mpt', 'mpv', 'mpx']],
    ['application/x-qpro', 'wb1'],
    ['application/x-rar-compressed', 'rar'],
    ['application/x-rtf', 'rtf'],
    ['application/x-sdp', 'sdp'],
    ['application/x-sea', 'sea'],
    ['application/x-seelogo', 'sl'],
    ['application/x-sh', 'sh'],
    ['application/x-shar', ['shar', 'sh']],
    ['application/x-shockwave-flash', 'swf'],
    ['application/x-silverlight-app', 'xap'],
    ['application/x-sit', 'sit'],
    ['application/x-sprite', ['spr', 'sprite']],
    ['application/x-stuffit', 'sit'],
    ['application/x-stuffitx', 'sitx'],
    ['application/x-sv4cpio', 'sv4cpio'],
    ['application/x-sv4crc', 'sv4crc'],
    ['application/x-tar', 'tar'],
    ['application/x-tbook', ['sbk', 'tbk']],
    ['application/x-tcl', 'tcl'],
    ['application/x-tex', 'tex'],
    ['application/x-tex-tfm', 'tfm'],
    ['application/x-texinfo', ['texi', 'texinfo']],
    ['application/x-troff', ['roff', 't', 'tr']],
    ['application/x-troff-man', 'man'],
    ['application/x-troff-me', 'me'],
    ['application/x-troff-ms', 'ms'],
    ['application/x-troff-msvideo', 'avi'],
    ['application/x-ustar', 'ustar'],
    ['application/x-visio', ['vsd', 'vst', 'vsw']],
    ['application/x-vnd.audioexplosion.mzz', 'mzz'],
    ['application/x-vnd.ls-xpix', 'xpix'],
    ['application/x-vrml', 'vrml'],
    ['application/x-wais-source', ['src', 'wsrc']],
    ['application/x-winhelp', 'hlp'],
    ['application/x-wintalk', 'wtk'],
    ['application/x-world', ['wrl', 'svr']],
    ['application/x-wpwin', 'wpd'],
    ['application/x-wri', 'wri'],
    ['application/x-x509-ca-cert', ['cer', 'crt', 'der']],
    ['application/x-x509-user-cert', 'crt'],
    ['application/x-xfig', 'fig'],
    ['application/x-xpinstall', 'xpi'],
    ['application/x-zip-compressed', 'zip'],
    ['application/xcap-diff+xml', 'xdf'],
    ['application/xenc+xml', 'xenc'],
    ['application/xhtml+xml', 'xhtml'],
    ['application/xml', 'xml'],
    ['application/xml-dtd', 'dtd'],
    ['application/xop+xml', 'xop'],
    ['application/xslt+xml', 'xslt'],
    ['application/xspf+xml', 'xspf'],
    ['application/xv+xml', 'mxml'],
    ['application/yang', 'yang'],
    ['application/yin+xml', 'yin'],
    ['application/ynd.ms-pkipko', 'pko'],
    ['application/zip', 'zip'],
    ['audio/adpcm', 'adp'],
    ['audio/aiff', ['aiff', 'aif', 'aifc']],
    ['audio/basic', ['snd', 'au']],
    ['audio/it', 'it'],
    ['audio/make', ['funk', 'my', 'pfunk']],
    ['audio/make.my.funk', 'pfunk'],
    ['audio/mid', ['mid', 'rmi']],
    ['audio/midi', ['midi', 'kar', 'mid']],
    ['audio/mod', 'mod'],
    ['audio/mp4', 'mp4a'],
    ['audio/mpeg', ['mpga', 'mp3', 'm2a', 'mp2', 'mpa', 'mpg']],
    ['audio/mpeg3', 'mp3'],
    ['audio/nspaudio', ['la', 'lma']],
    ['audio/ogg', 'oga'],
    ['audio/s3m', 's3m'],
    ['audio/tsp-audio', 'tsi'],
    ['audio/tsplayer', 'tsp'],
    ['audio/vnd.dece.audio', 'uva'],
    ['audio/vnd.digital-winds', 'eol'],
    ['audio/vnd.dra', 'dra'],
    ['audio/vnd.dts', 'dts'],
    ['audio/vnd.dts.hd', 'dtshd'],
    ['audio/vnd.lucent.voice', 'lvp'],
    ['audio/vnd.ms-playready.media.pya', 'pya'],
    ['audio/vnd.nuera.ecelp4800', 'ecelp4800'],
    ['audio/vnd.nuera.ecelp7470', 'ecelp7470'],
    ['audio/vnd.nuera.ecelp9600', 'ecelp9600'],
    ['audio/vnd.qcelp', 'qcp'],
    ['audio/vnd.rip', 'rip'],
    ['audio/voc', 'voc'],
    ['audio/voxware', 'vox'],
    ['audio/wav', 'wav'],
    ['audio/webm', 'weba'],
    ['audio/x-aac', 'aac'],
    ['audio/x-adpcm', 'snd'],
    ['audio/x-aiff', ['aiff', 'aif', 'aifc']],
    ['audio/x-au', 'au'],
    ['audio/x-gsm', ['gsd', 'gsm']],
    ['audio/x-jam', 'jam'],
    ['audio/x-liveaudio', 'lam'],
    ['audio/x-mid', ['mid', 'midi']],
    ['audio/x-midi', ['midi', 'mid']],
    ['audio/x-mod', 'mod'],
    ['audio/x-mpeg', 'mp2'],
    ['audio/x-mpeg-3', 'mp3'],
    ['audio/x-mpegurl', 'm3u'],
    ['audio/x-mpequrl', 'm3u'],
    ['audio/x-ms-wax', 'wax'],
    ['audio/x-ms-wma', 'wma'],
    ['audio/x-nspaudio', ['la', 'lma']],
    ['audio/x-pn-realaudio', ['ra', 'ram', 'rm', 'rmm', 'rmp']],
    ['audio/x-pn-realaudio-plugin', ['ra', 'rmp', 'rpm']],
    ['audio/x-psid', 'sid'],
    ['audio/x-realaudio', 'ra'],
    ['audio/x-twinvq', 'vqf'],
    ['audio/x-twinvq-plugin', ['vqe', 'vql']],
    ['audio/x-vnd.audioexplosion.mjuicemediafile', 'mjf'],
    ['audio/x-voc', 'voc'],
    ['audio/x-wav', 'wav'],
    ['audio/xm', 'xm'],
    ['chemical/x-cdx', 'cdx'],
    ['chemical/x-cif', 'cif'],
    ['chemical/x-cmdf', 'cmdf'],
    ['chemical/x-cml', 'cml'],
    ['chemical/x-csml', 'csml'],
    ['chemical/x-pdb', ['pdb', 'xyz']],
    ['chemical/x-xyz', 'xyz'],
    ['drawing/x-dwf', 'dwf'],
    ['i-world/i-vrml', 'ivr'],
    ['image/bmp', ['bmp', 'bm']],
    ['image/cgm', 'cgm'],
    ['image/cis-cod', 'cod'],
    ['image/cmu-raster', ['ras', 'rast']],
    ['image/fif', 'fif'],
    ['image/florian', ['flo', 'turbot']],
    ['image/g3fax', 'g3'],
    ['image/gif', 'gif'],
    ['image/ief', ['ief', 'iefs']],
    ['image/jpeg', ['jpeg', 'jpe', 'jpg', 'jfif', 'jfif-tbnl']],
    ['image/jutvision', 'jut'],
    ['image/ktx', 'ktx'],
    ['image/naplps', ['nap', 'naplps']],
    ['image/pict', ['pic', 'pict']],
    ['image/pipeg', 'jfif'],
    ['image/pjpeg', ['jfif', 'jpe', 'jpeg', 'jpg']],
    ['image/png', ['png', 'x-png']],
    ['image/prs.btif', 'btif'],
    ['image/svg+xml', 'svg'],
    ['image/tiff', ['tif', 'tiff']],
    ['image/vasa', 'mcf'],
    ['image/vnd.adobe.photoshop', 'psd'],
    ['image/vnd.dece.graphic', 'uvi'],
    ['image/vnd.djvu', 'djvu'],
    ['image/vnd.dvb.subtitle', 'sub'],
    ['image/vnd.dwg', ['dwg', 'dxf', 'svf']],
    ['image/vnd.dxf', 'dxf'],
    ['image/vnd.fastbidsheet', 'fbs'],
    ['image/vnd.fpx', 'fpx'],
    ['image/vnd.fst', 'fst'],
    ['image/vnd.fujixerox.edmics-mmr', 'mmr'],
    ['image/vnd.fujixerox.edmics-rlc', 'rlc'],
    ['image/vnd.ms-modi', 'mdi'],
    ['image/vnd.net-fpx', ['fpx', 'npx']],
    ['image/vnd.rn-realflash', 'rf'],
    ['image/vnd.rn-realpix', 'rp'],
    ['image/vnd.wap.wbmp', 'wbmp'],
    ['image/vnd.xiff', 'xif'],
    ['image/webp', 'webp'],
    ['image/x-cmu-raster', 'ras'],
    ['image/x-cmx', 'cmx'],
    ['image/x-dwg', ['dwg', 'dxf', 'svf']],
    ['image/x-freehand', 'fh'],
    ['image/x-icon', 'ico'],
    ['image/x-jg', 'art'],
    ['image/x-jps', 'jps'],
    ['image/x-niff', ['niff', 'nif']],
    ['image/x-pcx', 'pcx'],
    ['image/x-pict', ['pct', 'pic']],
    ['image/x-portable-anymap', 'pnm'],
    ['image/x-portable-bitmap', 'pbm'],
    ['image/x-portable-graymap', 'pgm'],
    ['image/x-portable-greymap', 'pgm'],
    ['image/x-portable-pixmap', 'ppm'],
    ['image/x-quicktime', ['qif', 'qti', 'qtif']],
    ['image/x-rgb', 'rgb'],
    ['image/x-tiff', ['tif', 'tiff']],
    ['image/x-windows-bmp', 'bmp'],
    ['image/x-xbitmap', 'xbm'],
    ['image/x-xbm', 'xbm'],
    ['image/x-xpixmap', ['xpm', 'pm']],
    ['image/x-xwd', 'xwd'],
    ['image/x-xwindowdump', 'xwd'],
    ['image/xbm', 'xbm'],
    ['image/xpm', 'xpm'],
    ['message/rfc822', ['eml', 'mht', 'mhtml', 'nws', 'mime']],
    ['model/iges', ['iges', 'igs']],
    ['model/mesh', 'msh'],
    ['model/vnd.collada+xml', 'dae'],
    ['model/vnd.dwf', 'dwf'],
    ['model/vnd.gdl', 'gdl'],
    ['model/vnd.gtw', 'gtw'],
    ['model/vnd.mts', 'mts'],
    ['model/vnd.vtu', 'vtu'],
    ['model/vrml', ['vrml', 'wrl', 'wrz']],
    ['model/x-pov', 'pov'],
    ['multipart/x-gzip', 'gzip'],
    ['multipart/x-ustar', 'ustar'],
    ['multipart/x-zip', 'zip'],
    ['music/crescendo', ['mid', 'midi']],
    ['music/x-karaoke', 'kar'],
    ['paleovu/x-pv', 'pvu'],
    ['text/asp', 'asp'],
    ['text/calendar', 'ics'],
    ['text/css', 'css'],
    ['text/csv', 'csv'],
    ['text/ecmascript', 'js'],
    ['text/h323', '323'],
    ['text/html', ['html', 'htm', 'stm', 'acgi', 'htmls', 'htx', 'shtml']],
    ['text/iuls', 'uls'],
    ['text/javascript', 'js'],
    ['text/mcf', 'mcf'],
    ['text/n3', 'n3'],
    ['text/pascal', 'pas'],
    [
        'text/plain',
        [
            'txt',
            'bas',
            'c',
            'h',
            'c++',
            'cc',
            'com',
            'conf',
            'cxx',
            'def',
            'f',
            'f90',
            'for',
            'g',
            'hh',
            'idc',
            'jav',
            'java',
            'list',
            'log',
            'lst',
            'm',
            'mar',
            'pl',
            'sdml',
            'text'
        ]
    ],
    ['text/plain-bas', 'par'],
    ['text/prs.lines.tag', 'dsc'],
    ['text/richtext', ['rtx', 'rt', 'rtf']],
    ['text/scriplet', 'wsc'],
    ['text/scriptlet', 'sct'],
    ['text/sgml', ['sgm', 'sgml']],
    ['text/tab-separated-values', 'tsv'],
    ['text/troff', 't'],
    ['text/turtle', 'ttl'],
    ['text/uri-list', ['uni', 'unis', 'uri', 'uris']],
    ['text/vnd.abc', 'abc'],
    ['text/vnd.curl', 'curl'],
    ['text/vnd.curl.dcurl', 'dcurl'],
    ['text/vnd.curl.mcurl', 'mcurl'],
    ['text/vnd.curl.scurl', 'scurl'],
    ['text/vnd.fly', 'fly'],
    ['text/vnd.fmi.flexstor', 'flx'],
    ['text/vnd.graphviz', 'gv'],
    ['text/vnd.in3d.3dml', '3dml'],
    ['text/vnd.in3d.spot', 'spot'],
    ['text/vnd.rn-realtext', 'rt'],
    ['text/vnd.sun.j2me.app-descriptor', 'jad'],
    ['text/vnd.wap.wml', 'wml'],
    ['text/vnd.wap.wmlscript', 'wmls'],
    ['text/webviewhtml', 'htt'],
    ['text/x-asm', ['asm', 's']],
    ['text/x-audiosoft-intra', 'aip'],
    ['text/x-c', ['c', 'cc', 'cpp']],
    ['text/x-component', 'htc'],
    ['text/x-fortran', ['for', 'f', 'f77', 'f90']],
    ['text/x-h', ['h', 'hh']],
    ['text/x-java-source', ['java', 'jav']],
    ['text/x-java-source,java', 'java'],
    ['text/x-la-asf', 'lsx'],
    ['text/x-m', 'm'],
    ['text/x-pascal', 'p'],
    ['text/x-script', 'hlb'],
    ['text/x-script.csh', 'csh'],
    ['text/x-script.elisp', 'el'],
    ['text/x-script.guile', 'scm'],
    ['text/x-script.ksh', 'ksh'],
    ['text/x-script.lisp', 'lsp'],
    ['text/x-script.perl', 'pl'],
    ['text/x-script.perl-module', 'pm'],
    ['text/x-script.phyton', 'py'],
    ['text/x-script.rexx', 'rexx'],
    ['text/x-script.scheme', 'scm'],
    ['text/x-script.sh', 'sh'],
    ['text/x-script.tcl', 'tcl'],
    ['text/x-script.tcsh', 'tcsh'],
    ['text/x-script.zsh', 'zsh'],
    ['text/x-server-parsed-html', ['shtml', 'ssi']],
    ['text/x-setext', 'etx'],
    ['text/x-sgml', ['sgm', 'sgml']],
    ['text/x-speech', ['spc', 'talk']],
    ['text/x-uil', 'uil'],
    ['text/x-uuencode', ['uu', 'uue']],
    ['text/x-vcalendar', 'vcs'],
    ['text/x-vcard', 'vcf'],
    ['text/xml', 'xml'],
    ['video/3gpp', '3gp'],
    ['video/3gpp2', '3g2'],
    ['video/animaflex', 'afl'],
    ['video/avi', 'avi'],
    ['video/avs-video', 'avs'],
    ['video/dl', 'dl'],
    ['video/fli', 'fli'],
    ['video/gl', 'gl'],
    ['video/h261', 'h261'],
    ['video/h263', 'h263'],
    ['video/h264', 'h264'],
    ['video/jpeg', 'jpgv'],
    ['video/jpm', 'jpm'],
    ['video/mj2', 'mj2'],
    ['video/mp4', 'mp4'],
    ['video/mpeg', ['mpeg', 'mp2', 'mpa', 'mpe', 'mpg', 'mpv2', 'm1v', 'm2v', 'mp3']],
    ['video/msvideo', 'avi'],
    ['video/ogg', 'ogv'],
    ['video/quicktime', ['mov', 'qt', 'moov']],
    ['video/vdo', 'vdo'],
    ['video/vivo', ['viv', 'vivo']],
    ['video/vnd.dece.hd', 'uvh'],
    ['video/vnd.dece.mobile', 'uvm'],
    ['video/vnd.dece.pd', 'uvp'],
    ['video/vnd.dece.sd', 'uvs'],
    ['video/vnd.dece.video', 'uvv'],
    ['video/vnd.fvt', 'fvt'],
    ['video/vnd.mpegurl', 'mxu'],
    ['video/vnd.ms-playready.media.pyv', 'pyv'],
    ['video/vnd.rn-realvideo', 'rv'],
    ['video/vnd.uvvu.mp4', 'uvu'],
    ['video/vnd.vivo', ['viv', 'vivo']],
    ['video/vosaic', 'vos'],
    ['video/webm', 'webm'],
    ['video/x-amt-demorun', 'xdr'],
    ['video/x-amt-showrun', 'xsr'],
    ['video/x-atomic3d-feature', 'fmf'],
    ['video/x-dl', 'dl'],
    ['video/x-dv', ['dif', 'dv']],
    ['video/x-f4v', 'f4v'],
    ['video/x-fli', 'fli'],
    ['video/x-flv', 'flv'],
    ['video/x-gl', 'gl'],
    ['video/x-isvideo', 'isu'],
    ['video/x-la-asf', ['lsf', 'lsx']],
    ['video/x-m4v', 'm4v'],
    ['video/x-motion-jpeg', 'mjpg'],
    ['video/x-mpeg', ['mp3', 'mp2']],
    ['video/x-mpeq2a', 'mp2'],
    ['video/x-ms-asf', ['asf', 'asr', 'asx']],
    ['video/x-ms-asf-plugin', 'asx'],
    ['video/x-ms-wm', 'wm'],
    ['video/x-ms-wmv', 'wmv'],
    ['video/x-ms-wmx', 'wmx'],
    ['video/x-ms-wvx', 'wvx'],
    ['video/x-msvideo', 'avi'],
    ['video/x-qtc', 'qtc'],
    ['video/x-scm', 'scm'],
    ['video/x-sgi-movie', ['movie', 'mv']],
    ['windows/metafile', 'wmf'],
    ['www/mime', 'mime'],
    ['x-conference/x-cooltalk', 'ice'],
    ['x-music/x-midi', ['mid', 'midi']],
    ['x-world/x-3dmf', ['3dm', '3dmf', 'qd3', 'qd3d']],
    ['x-world/x-svr', 'svr'],
    ['x-world/x-vrml', ['flr', 'vrml', 'wrl', 'wrz', 'xaf', 'xof']],
    ['x-world/x-vrt', 'vrt'],
    ['xgl/drawing', 'xgz'],
    ['xgl/movie', 'xmz']
]);
const extensions = new Map([
    ['123', 'application/vnd.lotus-1-2-3'],
    ['323', 'text/h323'],
    ['*', 'application/octet-stream'],
    ['3dm', 'x-world/x-3dmf'],
    ['3dmf', 'x-world/x-3dmf'],
    ['3dml', 'text/vnd.in3d.3dml'],
    ['3g2', 'video/3gpp2'],
    ['3gp', 'video/3gpp'],
    ['7z', 'application/x-7z-compressed'],
    ['a', 'application/octet-stream'],
    ['aab', 'application/x-authorware-bin'],
    ['aac', 'audio/x-aac'],
    ['aam', 'application/x-authorware-map'],
    ['aas', 'application/x-authorware-seg'],
    ['abc', 'text/vnd.abc'],
    ['abw', 'application/x-abiword'],
    ['ac', 'application/pkix-attr-cert'],
    ['acc', 'application/vnd.americandynamics.acc'],
    ['ace', 'application/x-ace-compressed'],
    ['acgi', 'text/html'],
    ['acu', 'application/vnd.acucobol'],
    ['acx', 'application/internet-property-stream'],
    ['adp', 'audio/adpcm'],
    ['aep', 'application/vnd.audiograph'],
    ['afl', 'video/animaflex'],
    ['afp', 'application/vnd.ibm.modcap'],
    ['ahead', 'application/vnd.ahead.space'],
    ['ai', 'application/postscript'],
    ['aif', ['audio/aiff', 'audio/x-aiff']],
    ['aifc', ['audio/aiff', 'audio/x-aiff']],
    ['aiff', ['audio/aiff', 'audio/x-aiff']],
    ['aim', 'application/x-aim'],
    ['aip', 'text/x-audiosoft-intra'],
    ['air', 'application/vnd.adobe.air-application-installer-package+zip'],
    ['ait', 'application/vnd.dvb.ait'],
    ['ami', 'application/vnd.amiga.ami'],
    ['ani', 'application/x-navi-animation'],
    ['aos', 'application/x-nokia-9000-communicator-add-on-software'],
    ['apk', 'application/vnd.android.package-archive'],
    ['application', 'application/x-ms-application'],
    ['apr', 'application/vnd.lotus-approach'],
    ['aps', 'application/mime'],
    ['arc', 'application/octet-stream'],
    ['arj', ['application/arj', 'application/octet-stream']],
    ['art', 'image/x-jg'],
    ['asf', 'video/x-ms-asf'],
    ['asm', 'text/x-asm'],
    ['aso', 'application/vnd.accpac.simply.aso'],
    ['asp', 'text/asp'],
    ['asr', 'video/x-ms-asf'],
    ['asx', ['video/x-ms-asf', 'application/x-mplayer2', 'video/x-ms-asf-plugin']],
    ['atc', 'application/vnd.acucorp'],
    ['atomcat', 'application/atomcat+xml'],
    ['atomsvc', 'application/atomsvc+xml'],
    ['atx', 'application/vnd.antix.game-component'],
    ['au', ['audio/basic', 'audio/x-au']],
    ['avi', ['video/avi', 'video/msvideo', 'application/x-troff-msvideo', 'video/x-msvideo']],
    ['avs', 'video/avs-video'],
    ['aw', 'application/applixware'],
    ['axs', 'application/olescript'],
    ['azf', 'application/vnd.airzip.filesecure.azf'],
    ['azs', 'application/vnd.airzip.filesecure.azs'],
    ['azw', 'application/vnd.amazon.ebook'],
    ['bas', 'text/plain'],
    ['bcpio', 'application/x-bcpio'],
    ['bdf', 'application/x-font-bdf'],
    ['bdm', 'application/vnd.syncml.dm+wbxml'],
    ['bed', 'application/vnd.realvnc.bed'],
    ['bh2', 'application/vnd.fujitsu.oasysprs'],
    ['bin', ['application/octet-stream', 'application/mac-binary', 'application/macbinary', 'application/x-macbinary', 'application/x-binary']],
    ['bm', 'image/bmp'],
    ['bmi', 'application/vnd.bmi'],
    ['bmp', ['image/bmp', 'image/x-windows-bmp']],
    ['boo', 'application/book'],
    ['book', 'application/book'],
    ['box', 'application/vnd.previewsystems.box'],
    ['boz', 'application/x-bzip2'],
    ['bsh', 'application/x-bsh'],
    ['btif', 'image/prs.btif'],
    ['bz', 'application/x-bzip'],
    ['bz2', 'application/x-bzip2'],
    ['c', ['text/plain', 'text/x-c']],
    ['c++', 'text/plain'],
    ['c11amc', 'application/vnd.cluetrust.cartomobile-config'],
    ['c11amz', 'application/vnd.cluetrust.cartomobile-config-pkg'],
    ['c4g', 'application/vnd.clonk.c4group'],
    ['cab', 'application/vnd.ms-cab-compressed'],
    ['car', 'application/vnd.curl.car'],
    ['cat', ['application/vnd.ms-pkiseccat', 'application/vnd.ms-pki.seccat']],
    ['cc', ['text/plain', 'text/x-c']],
    ['ccad', 'application/clariscad'],
    ['cco', 'application/x-cocoa'],
    ['ccxml', 'application/ccxml+xml,'],
    ['cdbcmsg', 'application/vnd.contact.cmsg'],
    ['cdf', ['application/cdf', 'application/x-cdf', 'application/x-netcdf']],
    ['cdkey', 'application/vnd.mediastation.cdkey'],
    ['cdmia', 'application/cdmi-capability'],
    ['cdmic', 'application/cdmi-container'],
    ['cdmid', 'application/cdmi-domain'],
    ['cdmio', 'application/cdmi-object'],
    ['cdmiq', 'application/cdmi-queue'],
    ['cdx', 'chemical/x-cdx'],
    ['cdxml', 'application/vnd.chemdraw+xml'],
    ['cdy', 'application/vnd.cinderella'],
    ['cer', ['application/pkix-cert', 'application/x-x509-ca-cert']],
    ['cgm', 'image/cgm'],
    ['cha', 'application/x-chat'],
    ['chat', 'application/x-chat'],
    ['chm', 'application/vnd.ms-htmlhelp'],
    ['chrt', 'application/vnd.kde.kchart'],
    ['cif', 'chemical/x-cif'],
    ['cii', 'application/vnd.anser-web-certificate-issue-initiation'],
    ['cil', 'application/vnd.ms-artgalry'],
    ['cla', 'application/vnd.claymore'],
    ['class', ['application/octet-stream', 'application/java', 'application/java-byte-code', 'application/java-vm', 'application/x-java-class']],
    ['clkk', 'application/vnd.crick.clicker.keyboard'],
    ['clkp', 'application/vnd.crick.clicker.palette'],
    ['clkt', 'application/vnd.crick.clicker.template'],
    ['clkw', 'application/vnd.crick.clicker.wordbank'],
    ['clkx', 'application/vnd.crick.clicker'],
    ['clp', 'application/x-msclip'],
    ['cmc', 'application/vnd.cosmocaller'],
    ['cmdf', 'chemical/x-cmdf'],
    ['cml', 'chemical/x-cml'],
    ['cmp', 'application/vnd.yellowriver-custom-menu'],
    ['cmx', 'image/x-cmx'],
    ['cod', ['image/cis-cod', 'application/vnd.rim.cod']],
    ['com', ['application/octet-stream', 'text/plain']],
    ['conf', 'text/plain'],
    ['cpio', 'application/x-cpio'],
    ['cpp', 'text/x-c'],
    ['cpt', ['application/mac-compactpro', 'application/x-compactpro', 'application/x-cpt']],
    ['crd', 'application/x-mscardfile'],
    ['crl', ['application/pkix-crl', 'application/pkcs-crl']],
    ['crt', ['application/pkix-cert', 'application/x-x509-user-cert', 'application/x-x509-ca-cert']],
    ['cryptonote', 'application/vnd.rig.cryptonote'],
    ['csh', ['text/x-script.csh', 'application/x-csh']],
    ['csml', 'chemical/x-csml'],
    ['csp', 'application/vnd.commonspace'],
    ['css', ['text/css', 'application/x-pointplus']],
    ['csv', 'text/csv'],
    ['cu', 'application/cu-seeme'],
    ['curl', 'text/vnd.curl'],
    ['cww', 'application/prs.cww'],
    ['cxx', 'text/plain'],
    ['dae', 'model/vnd.collada+xml'],
    ['daf', 'application/vnd.mobius.daf'],
    ['davmount', 'application/davmount+xml'],
    ['dcr', 'application/x-director'],
    ['dcurl', 'text/vnd.curl.dcurl'],
    ['dd2', 'application/vnd.oma.dd2+xml'],
    ['ddd', 'application/vnd.fujixerox.ddd'],
    ['deb', 'application/x-debian-package'],
    ['deepv', 'application/x-deepv'],
    ['def', 'text/plain'],
    ['der', 'application/x-x509-ca-cert'],
    ['dfac', 'application/vnd.dreamfactory'],
    ['dif', 'video/x-dv'],
    ['dir', 'application/x-director'],
    ['dis', 'application/vnd.mobius.dis'],
    ['djvu', 'image/vnd.djvu'],
    ['dl', ['video/dl', 'video/x-dl']],
    ['dll', 'application/x-msdownload'],
    ['dms', 'application/octet-stream'],
    ['dna', 'application/vnd.dna'],
    ['doc', 'application/msword'],
    ['docm', 'application/vnd.ms-word.document.macroenabled.12'],
    ['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    ['dot', 'application/msword'],
    ['dotm', 'application/vnd.ms-word.template.macroenabled.12'],
    ['dotx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.template'],
    ['dp', ['application/commonground', 'application/vnd.osgi.dp']],
    ['dpg', 'application/vnd.dpgraph'],
    ['dra', 'audio/vnd.dra'],
    ['drw', 'application/drafting'],
    ['dsc', 'text/prs.lines.tag'],
    ['dssc', 'application/dssc+der'],
    ['dtb', 'application/x-dtbook+xml'],
    ['dtd', 'application/xml-dtd'],
    ['dts', 'audio/vnd.dts'],
    ['dtshd', 'audio/vnd.dts.hd'],
    ['dump', 'application/octet-stream'],
    ['dv', 'video/x-dv'],
    ['dvi', 'application/x-dvi'],
    ['dwf', ['model/vnd.dwf', 'drawing/x-dwf']],
    ['dwg', ['application/acad', 'image/vnd.dwg', 'image/x-dwg']],
    ['dxf', ['application/dxf', 'image/vnd.dwg', 'image/vnd.dxf', 'image/x-dwg']],
    ['dxp', 'application/vnd.spotfire.dxp'],
    ['dxr', 'application/x-director'],
    ['ecelp4800', 'audio/vnd.nuera.ecelp4800'],
    ['ecelp7470', 'audio/vnd.nuera.ecelp7470'],
    ['ecelp9600', 'audio/vnd.nuera.ecelp9600'],
    ['edm', 'application/vnd.novadigm.edm'],
    ['edx', 'application/vnd.novadigm.edx'],
    ['efif', 'application/vnd.picsel'],
    ['ei6', 'application/vnd.pg.osasli'],
    ['el', 'text/x-script.elisp'],
    ['elc', ['application/x-elc', 'application/x-bytecode.elisp']],
    ['eml', 'message/rfc822'],
    ['emma', 'application/emma+xml'],
    ['env', 'application/x-envoy'],
    ['eol', 'audio/vnd.digital-winds'],
    ['eot', 'application/vnd.ms-fontobject'],
    ['eps', 'application/postscript'],
    ['epub', 'application/epub+zip'],
    ['es', ['application/ecmascript', 'application/x-esrehber']],
    ['es3', 'application/vnd.eszigno3+xml'],
    ['esf', 'application/vnd.epson.esf'],
    ['etx', 'text/x-setext'],
    ['evy', ['application/envoy', 'application/x-envoy']],
    ['exe', ['application/octet-stream', 'application/x-msdownload']],
    ['exi', 'application/exi'],
    ['ext', 'application/vnd.novadigm.ext'],
    ['ez2', 'application/vnd.ezpix-album'],
    ['ez3', 'application/vnd.ezpix-package'],
    ['f', ['text/plain', 'text/x-fortran']],
    ['f4v', 'video/x-f4v'],
    ['f77', 'text/x-fortran'],
    ['f90', ['text/plain', 'text/x-fortran']],
    ['fbs', 'image/vnd.fastbidsheet'],
    ['fcs', 'application/vnd.isac.fcs'],
    ['fdf', 'application/vnd.fdf'],
    ['fe_launch', 'application/vnd.denovo.fcselayout-link'],
    ['fg5', 'application/vnd.fujitsu.oasysgp'],
    ['fh', 'image/x-freehand'],
    ['fif', ['application/fractals', 'image/fif']],
    ['fig', 'application/x-xfig'],
    ['fli', ['video/fli', 'video/x-fli']],
    ['flo', ['image/florian', 'application/vnd.micrografx.flo']],
    ['flr', 'x-world/x-vrml'],
    ['flv', 'video/x-flv'],
    ['flw', 'application/vnd.kde.kivio'],
    ['flx', 'text/vnd.fmi.flexstor'],
    ['fly', 'text/vnd.fly'],
    ['fm', 'application/vnd.framemaker'],
    ['fmf', 'video/x-atomic3d-feature'],
    ['fnc', 'application/vnd.frogans.fnc'],
    ['for', ['text/plain', 'text/x-fortran']],
    ['fpx', ['image/vnd.fpx', 'image/vnd.net-fpx']],
    ['frl', 'application/freeloader'],
    ['fsc', 'application/vnd.fsc.weblaunch'],
    ['fst', 'image/vnd.fst'],
    ['ftc', 'application/vnd.fluxtime.clip'],
    ['fti', 'application/vnd.anser-web-funds-transfer-initiation'],
    ['funk', 'audio/make'],
    ['fvt', 'video/vnd.fvt'],
    ['fxp', 'application/vnd.adobe.fxp'],
    ['fzs', 'application/vnd.fuzzysheet'],
    ['g', 'text/plain'],
    ['g2w', 'application/vnd.geoplan'],
    ['g3', 'image/g3fax'],
    ['g3w', 'application/vnd.geospace'],
    ['gac', 'application/vnd.groove-account'],
    ['gdl', 'model/vnd.gdl'],
    ['geo', 'application/vnd.dynageo'],
    ['gex', 'application/vnd.geometry-explorer'],
    ['ggb', 'application/vnd.geogebra.file'],
    ['ggt', 'application/vnd.geogebra.tool'],
    ['ghf', 'application/vnd.groove-help'],
    ['gif', 'image/gif'],
    ['gim', 'application/vnd.groove-identity-message'],
    ['gl', ['video/gl', 'video/x-gl']],
    ['gmx', 'application/vnd.gmx'],
    ['gnumeric', 'application/x-gnumeric'],
    ['gph', 'application/vnd.flographit'],
    ['gqf', 'application/vnd.grafeq'],
    ['gram', 'application/srgs'],
    ['grv', 'application/vnd.groove-injector'],
    ['grxml', 'application/srgs+xml'],
    ['gsd', 'audio/x-gsm'],
    ['gsf', 'application/x-font-ghostscript'],
    ['gsm', 'audio/x-gsm'],
    ['gsp', 'application/x-gsp'],
    ['gss', 'application/x-gss'],
    ['gtar', 'application/x-gtar'],
    ['gtm', 'application/vnd.groove-tool-message'],
    ['gtw', 'model/vnd.gtw'],
    ['gv', 'text/vnd.graphviz'],
    ['gxt', 'application/vnd.geonext'],
    ['gz', ['application/x-gzip', 'application/x-compressed']],
    ['gzip', ['multipart/x-gzip', 'application/x-gzip']],
    ['h', ['text/plain', 'text/x-h']],
    ['h261', 'video/h261'],
    ['h263', 'video/h263'],
    ['h264', 'video/h264'],
    ['hal', 'application/vnd.hal+xml'],
    ['hbci', 'application/vnd.hbci'],
    ['hdf', 'application/x-hdf'],
    ['help', 'application/x-helpfile'],
    ['hgl', 'application/vnd.hp-hpgl'],
    ['hh', ['text/plain', 'text/x-h']],
    ['hlb', 'text/x-script'],
    ['hlp', ['application/winhlp', 'application/hlp', 'application/x-helpfile', 'application/x-winhelp']],
    ['hpg', 'application/vnd.hp-hpgl'],
    ['hpgl', 'application/vnd.hp-hpgl'],
    ['hpid', 'application/vnd.hp-hpid'],
    ['hps', 'application/vnd.hp-hps'],
    [
        'hqx',
        [
            'application/mac-binhex40',
            'application/binhex',
            'application/binhex4',
            'application/mac-binhex',
            'application/x-binhex40',
            'application/x-mac-binhex40'
        ]
    ],
    ['hta', 'application/hta'],
    ['htc', 'text/x-component'],
    ['htke', 'application/vnd.kenameaapp'],
    ['htm', 'text/html'],
    ['html', 'text/html'],
    ['htmls', 'text/html'],
    ['htt', 'text/webviewhtml'],
    ['htx', 'text/html'],
    ['hvd', 'application/vnd.yamaha.hv-dic'],
    ['hvp', 'application/vnd.yamaha.hv-voice'],
    ['hvs', 'application/vnd.yamaha.hv-script'],
    ['i2g', 'application/vnd.intergeo'],
    ['icc', 'application/vnd.iccprofile'],
    ['ice', 'x-conference/x-cooltalk'],
    ['ico', 'image/x-icon'],
    ['ics', 'text/calendar'],
    ['idc', 'text/plain'],
    ['ief', 'image/ief'],
    ['iefs', 'image/ief'],
    ['ifm', 'application/vnd.shana.informed.formdata'],
    ['iges', ['application/iges', 'model/iges']],
    ['igl', 'application/vnd.igloader'],
    ['igm', 'application/vnd.insors.igm'],
    ['igs', ['application/iges', 'model/iges']],
    ['igx', 'application/vnd.micrografx.igx'],
    ['iif', 'application/vnd.shana.informed.interchange'],
    ['iii', 'application/x-iphone'],
    ['ima', 'application/x-ima'],
    ['imap', 'application/x-httpd-imap'],
    ['imp', 'application/vnd.accpac.simply.imp'],
    ['ims', 'application/vnd.ms-ims'],
    ['inf', 'application/inf'],
    ['ins', ['application/x-internet-signup', 'application/x-internett-signup']],
    ['ip', 'application/x-ip2'],
    ['ipfix', 'application/ipfix'],
    ['ipk', 'application/vnd.shana.informed.package'],
    ['irm', 'application/vnd.ibm.rights-management'],
    ['irp', 'application/vnd.irepository.package+xml'],
    ['isp', 'application/x-internet-signup'],
    ['isu', 'video/x-isvideo'],
    ['it', 'audio/it'],
    ['itp', 'application/vnd.shana.informed.formtemplate'],
    ['iv', 'application/x-inventor'],
    ['ivp', 'application/vnd.immervision-ivp'],
    ['ivr', 'i-world/i-vrml'],
    ['ivu', 'application/vnd.immervision-ivu'],
    ['ivy', 'application/x-livescreen'],
    ['jad', 'text/vnd.sun.j2me.app-descriptor'],
    ['jam', ['application/vnd.jam', 'audio/x-jam']],
    ['jar', 'application/java-archive'],
    ['jav', ['text/plain', 'text/x-java-source']],
    ['java', ['text/plain', 'text/x-java-source,java', 'text/x-java-source']],
    ['jcm', 'application/x-java-commerce'],
    ['jfif', ['image/pipeg', 'image/jpeg', 'image/pjpeg']],
    ['jfif-tbnl', 'image/jpeg'],
    ['jisp', 'application/vnd.jisp'],
    ['jlt', 'application/vnd.hp-jlyt'],
    ['jnlp', 'application/x-java-jnlp-file'],
    ['joda', 'application/vnd.joost.joda-archive'],
    ['jpe', ['image/jpeg', 'image/pjpeg']],
    ['jpeg', ['image/jpeg', 'image/pjpeg']],
    ['jpg', ['image/jpeg', 'image/pjpeg']],
    ['jpgv', 'video/jpeg'],
    ['jpm', 'video/jpm'],
    ['jps', 'image/x-jps'],
    ['js', ['application/javascript', 'application/ecmascript', 'text/javascript', 'text/ecmascript', 'application/x-javascript']],
    ['json', 'application/json'],
    ['jut', 'image/jutvision'],
    ['kar', ['audio/midi', 'music/x-karaoke']],
    ['karbon', 'application/vnd.kde.karbon'],
    ['kfo', 'application/vnd.kde.kformula'],
    ['kia', 'application/vnd.kidspiration'],
    ['kml', 'application/vnd.google-earth.kml+xml'],
    ['kmz', 'application/vnd.google-earth.kmz'],
    ['kne', 'application/vnd.kinar'],
    ['kon', 'application/vnd.kde.kontour'],
    ['kpr', 'application/vnd.kde.kpresenter'],
    ['ksh', ['application/x-ksh', 'text/x-script.ksh']],
    ['ksp', 'application/vnd.kde.kspread'],
    ['ktx', 'image/ktx'],
    ['ktz', 'application/vnd.kahootz'],
    ['kwd', 'application/vnd.kde.kword'],
    ['la', ['audio/nspaudio', 'audio/x-nspaudio']],
    ['lam', 'audio/x-liveaudio'],
    ['lasxml', 'application/vnd.las.las+xml'],
    ['latex', 'application/x-latex'],
    ['lbd', 'application/vnd.llamagraphics.life-balance.desktop'],
    ['lbe', 'application/vnd.llamagraphics.life-balance.exchange+xml'],
    ['les', 'application/vnd.hhe.lesson-player'],
    ['lha', ['application/octet-stream', 'application/lha', 'application/x-lha']],
    ['lhx', 'application/octet-stream'],
    ['link66', 'application/vnd.route66.link66+xml'],
    ['list', 'text/plain'],
    ['lma', ['audio/nspaudio', 'audio/x-nspaudio']],
    ['log', 'text/plain'],
    ['lrm', 'application/vnd.ms-lrm'],
    ['lsf', 'video/x-la-asf'],
    ['lsp', ['application/x-lisp', 'text/x-script.lisp']],
    ['lst', 'text/plain'],
    ['lsx', ['video/x-la-asf', 'text/x-la-asf']],
    ['ltf', 'application/vnd.frogans.ltf'],
    ['ltx', 'application/x-latex'],
    ['lvp', 'audio/vnd.lucent.voice'],
    ['lwp', 'application/vnd.lotus-wordpro'],
    ['lzh', ['application/octet-stream', 'application/x-lzh']],
    ['lzx', ['application/lzx', 'application/octet-stream', 'application/x-lzx']],
    ['m', ['text/plain', 'text/x-m']],
    ['m13', 'application/x-msmediaview'],
    ['m14', 'application/x-msmediaview'],
    ['m1v', 'video/mpeg'],
    ['m21', 'application/mp21'],
    ['m2a', 'audio/mpeg'],
    ['m2v', 'video/mpeg'],
    ['m3u', ['audio/x-mpegurl', 'audio/x-mpequrl']],
    ['m3u8', 'application/vnd.apple.mpegurl'],
    ['m4v', 'video/x-m4v'],
    ['ma', 'application/mathematica'],
    ['mads', 'application/mads+xml'],
    ['mag', 'application/vnd.ecowin.chart'],
    ['man', 'application/x-troff-man'],
    ['map', 'application/x-navimap'],
    ['mar', 'text/plain'],
    ['mathml', 'application/mathml+xml'],
    ['mbd', 'application/mbedlet'],
    ['mbk', 'application/vnd.mobius.mbk'],
    ['mbox', 'application/mbox'],
    ['mc$', 'application/x-magic-cap-package-1.0'],
    ['mc1', 'application/vnd.medcalcdata'],
    ['mcd', ['application/mcad', 'application/vnd.mcd', 'application/x-mathcad']],
    ['mcf', ['image/vasa', 'text/mcf']],
    ['mcp', 'application/netmc'],
    ['mcurl', 'text/vnd.curl.mcurl'],
    ['mdb', 'application/x-msaccess'],
    ['mdi', 'image/vnd.ms-modi'],
    ['me', 'application/x-troff-me'],
    ['meta4', 'application/metalink4+xml'],
    ['mets', 'application/mets+xml'],
    ['mfm', 'application/vnd.mfmp'],
    ['mgp', 'application/vnd.osgeo.mapguide.package'],
    ['mgz', 'application/vnd.proteus.magazine'],
    ['mht', 'message/rfc822'],
    ['mhtml', 'message/rfc822'],
    ['mid', ['audio/mid', 'audio/midi', 'music/crescendo', 'x-music/x-midi', 'audio/x-midi', 'application/x-midi', 'audio/x-mid']],
    ['midi', ['audio/midi', 'music/crescendo', 'x-music/x-midi', 'audio/x-midi', 'application/x-midi', 'audio/x-mid']],
    ['mif', ['application/vnd.mif', 'application/x-mif', 'application/x-frame']],
    ['mime', ['message/rfc822', 'www/mime']],
    ['mj2', 'video/mj2'],
    ['mjf', 'audio/x-vnd.audioexplosion.mjuicemediafile'],
    ['mjpg', 'video/x-motion-jpeg'],
    ['mlp', 'application/vnd.dolby.mlp'],
    ['mm', ['application/base64', 'application/x-meme']],
    ['mmd', 'application/vnd.chipnuts.karaoke-mmd'],
    ['mme', 'application/base64'],
    ['mmf', 'application/vnd.smaf'],
    ['mmr', 'image/vnd.fujixerox.edmics-mmr'],
    ['mny', 'application/x-msmoney'],
    ['mod', ['audio/mod', 'audio/x-mod']],
    ['mods', 'application/mods+xml'],
    ['moov', 'video/quicktime'],
    ['mov', 'video/quicktime'],
    ['movie', 'video/x-sgi-movie'],
    ['mp2', ['video/mpeg', 'audio/mpeg', 'video/x-mpeg', 'audio/x-mpeg', 'video/x-mpeq2a']],
    ['mp3', ['audio/mpeg', 'audio/mpeg3', 'video/mpeg', 'audio/x-mpeg-3', 'video/x-mpeg']],
    ['mp4', ['video/mp4', 'application/mp4']],
    ['mp4a', 'audio/mp4'],
    ['mpa', ['video/mpeg', 'audio/mpeg']],
    ['mpc', ['application/vnd.mophun.certificate', 'application/x-project']],
    ['mpe', 'video/mpeg'],
    ['mpeg', 'video/mpeg'],
    ['mpg', ['video/mpeg', 'audio/mpeg']],
    ['mpga', 'audio/mpeg'],
    ['mpkg', 'application/vnd.apple.installer+xml'],
    ['mpm', 'application/vnd.blueice.multipass'],
    ['mpn', 'application/vnd.mophun.application'],
    ['mpp', 'application/vnd.ms-project'],
    ['mpt', 'application/x-project'],
    ['mpv', 'application/x-project'],
    ['mpv2', 'video/mpeg'],
    ['mpx', 'application/x-project'],
    ['mpy', 'application/vnd.ibm.minipay'],
    ['mqy', 'application/vnd.mobius.mqy'],
    ['mrc', 'application/marc'],
    ['mrcx', 'application/marcxml+xml'],
    ['ms', 'application/x-troff-ms'],
    ['mscml', 'application/mediaservercontrol+xml'],
    ['mseq', 'application/vnd.mseq'],
    ['msf', 'application/vnd.epson.msf'],
    ['msg', 'application/vnd.ms-outlook'],
    ['msh', 'model/mesh'],
    ['msl', 'application/vnd.mobius.msl'],
    ['msty', 'application/vnd.muvee.style'],
    ['mts', 'model/vnd.mts'],
    ['mus', 'application/vnd.musician'],
    ['musicxml', 'application/vnd.recordare.musicxml+xml'],
    ['mv', 'video/x-sgi-movie'],
    ['mvb', 'application/x-msmediaview'],
    ['mwf', 'application/vnd.mfer'],
    ['mxf', 'application/mxf'],
    ['mxl', 'application/vnd.recordare.musicxml'],
    ['mxml', 'application/xv+xml'],
    ['mxs', 'application/vnd.triscape.mxs'],
    ['mxu', 'video/vnd.mpegurl'],
    ['my', 'audio/make'],
    ['mzz', 'application/x-vnd.audioexplosion.mzz'],
    ['n-gage', 'application/vnd.nokia.n-gage.symbian.install'],
    ['n3', 'text/n3'],
    ['nap', 'image/naplps'],
    ['naplps', 'image/naplps'],
    ['nbp', 'application/vnd.wolfram.player'],
    ['nc', 'application/x-netcdf'],
    ['ncm', 'application/vnd.nokia.configuration-message'],
    ['ncx', 'application/x-dtbncx+xml'],
    ['ngdat', 'application/vnd.nokia.n-gage.data'],
    ['nif', 'image/x-niff'],
    ['niff', 'image/x-niff'],
    ['nix', 'application/x-mix-transfer'],
    ['nlu', 'application/vnd.neurolanguage.nlu'],
    ['nml', 'application/vnd.enliven'],
    ['nnd', 'application/vnd.noblenet-directory'],
    ['nns', 'application/vnd.noblenet-sealer'],
    ['nnw', 'application/vnd.noblenet-web'],
    ['npx', 'image/vnd.net-fpx'],
    ['nsc', 'application/x-conference'],
    ['nsf', 'application/vnd.lotus-notes'],
    ['nvd', 'application/x-navidoc'],
    ['nws', 'message/rfc822'],
    ['o', 'application/octet-stream'],
    ['oa2', 'application/vnd.fujitsu.oasys2'],
    ['oa3', 'application/vnd.fujitsu.oasys3'],
    ['oas', 'application/vnd.fujitsu.oasys'],
    ['obd', 'application/x-msbinder'],
    ['oda', 'application/oda'],
    ['odb', 'application/vnd.oasis.opendocument.database'],
    ['odc', 'application/vnd.oasis.opendocument.chart'],
    ['odf', 'application/vnd.oasis.opendocument.formula'],
    ['odft', 'application/vnd.oasis.opendocument.formula-template'],
    ['odg', 'application/vnd.oasis.opendocument.graphics'],
    ['odi', 'application/vnd.oasis.opendocument.image'],
    ['odm', 'application/vnd.oasis.opendocument.text-master'],
    ['odp', 'application/vnd.oasis.opendocument.presentation'],
    ['ods', 'application/vnd.oasis.opendocument.spreadsheet'],
    ['odt', 'application/vnd.oasis.opendocument.text'],
    ['oga', 'audio/ogg'],
    ['ogv', 'video/ogg'],
    ['ogx', 'application/ogg'],
    ['omc', 'application/x-omc'],
    ['omcd', 'application/x-omcdatamaker'],
    ['omcr', 'application/x-omcregerator'],
    ['onetoc', 'application/onenote'],
    ['opf', 'application/oebps-package+xml'],
    ['org', 'application/vnd.lotus-organizer'],
    ['osf', 'application/vnd.yamaha.openscoreformat'],
    ['osfpvg', 'application/vnd.yamaha.openscoreformat.osfpvg+xml'],
    ['otc', 'application/vnd.oasis.opendocument.chart-template'],
    ['otf', 'application/x-font-otf'],
    ['otg', 'application/vnd.oasis.opendocument.graphics-template'],
    ['oth', 'application/vnd.oasis.opendocument.text-web'],
    ['oti', 'application/vnd.oasis.opendocument.image-template'],
    ['otp', 'application/vnd.oasis.opendocument.presentation-template'],
    ['ots', 'application/vnd.oasis.opendocument.spreadsheet-template'],
    ['ott', 'application/vnd.oasis.opendocument.text-template'],
    ['oxt', 'application/vnd.openofficeorg.extension'],
    ['p', 'text/x-pascal'],
    ['p10', ['application/pkcs10', 'application/x-pkcs10']],
    ['p12', ['application/pkcs-12', 'application/x-pkcs12']],
    ['p7a', 'application/x-pkcs7-signature'],
    ['p7b', 'application/x-pkcs7-certificates'],
    ['p7c', ['application/pkcs7-mime', 'application/x-pkcs7-mime']],
    ['p7m', ['application/pkcs7-mime', 'application/x-pkcs7-mime']],
    ['p7r', 'application/x-pkcs7-certreqresp'],
    ['p7s', ['application/pkcs7-signature', 'application/x-pkcs7-signature']],
    ['p8', 'application/pkcs8'],
    ['par', 'text/plain-bas'],
    ['part', 'application/pro_eng'],
    ['pas', 'text/pascal'],
    ['paw', 'application/vnd.pawaafile'],
    ['pbd', 'application/vnd.powerbuilder6'],
    ['pbm', 'image/x-portable-bitmap'],
    ['pcf', 'application/x-font-pcf'],
    ['pcl', ['application/vnd.hp-pcl', 'application/x-pcl']],
    ['pclxl', 'application/vnd.hp-pclxl'],
    ['pct', 'image/x-pict'],
    ['pcurl', 'application/vnd.curl.pcurl'],
    ['pcx', 'image/x-pcx'],
    ['pdb', ['application/vnd.palm', 'chemical/x-pdb']],
    ['pdf', 'application/pdf'],
    ['pfa', 'application/x-font-type1'],
    ['pfr', 'application/font-tdpfr'],
    ['pfunk', ['audio/make', 'audio/make.my.funk']],
    ['pfx', 'application/x-pkcs12'],
    ['pgm', ['image/x-portable-graymap', 'image/x-portable-greymap']],
    ['pgn', 'application/x-chess-pgn'],
    ['pgp', 'application/pgp-signature'],
    ['pic', ['image/pict', 'image/x-pict']],
    ['pict', 'image/pict'],
    ['pkg', 'application/x-newton-compatible-pkg'],
    ['pki', 'application/pkixcmp'],
    ['pkipath', 'application/pkix-pkipath'],
    ['pko', ['application/ynd.ms-pkipko', 'application/vnd.ms-pki.pko']],
    ['pl', ['text/plain', 'text/x-script.perl']],
    ['plb', 'application/vnd.3gpp.pic-bw-large'],
    ['plc', 'application/vnd.mobius.plc'],
    ['plf', 'application/vnd.pocketlearn'],
    ['pls', 'application/pls+xml'],
    ['plx', 'application/x-pixclscript'],
    ['pm', ['text/x-script.perl-module', 'image/x-xpixmap']],
    ['pm4', 'application/x-pagemaker'],
    ['pm5', 'application/x-pagemaker'],
    ['pma', 'application/x-perfmon'],
    ['pmc', 'application/x-perfmon'],
    ['pml', ['application/vnd.ctc-posml', 'application/x-perfmon']],
    ['pmr', 'application/x-perfmon'],
    ['pmw', 'application/x-perfmon'],
    ['png', 'image/png'],
    ['pnm', ['application/x-portable-anymap', 'image/x-portable-anymap']],
    ['portpkg', 'application/vnd.macports.portpkg'],
    ['pot', ['application/vnd.ms-powerpoint', 'application/mspowerpoint']],
    ['potm', 'application/vnd.ms-powerpoint.template.macroenabled.12'],
    ['potx', 'application/vnd.openxmlformats-officedocument.presentationml.template'],
    ['pov', 'model/x-pov'],
    ['ppa', 'application/vnd.ms-powerpoint'],
    ['ppam', 'application/vnd.ms-powerpoint.addin.macroenabled.12'],
    ['ppd', 'application/vnd.cups-ppd'],
    ['ppm', 'image/x-portable-pixmap'],
    ['pps', ['application/vnd.ms-powerpoint', 'application/mspowerpoint']],
    ['ppsm', 'application/vnd.ms-powerpoint.slideshow.macroenabled.12'],
    ['ppsx', 'application/vnd.openxmlformats-officedocument.presentationml.slideshow'],
    ['ppt', ['application/vnd.ms-powerpoint', 'application/mspowerpoint', 'application/powerpoint', 'application/x-mspowerpoint']],
    ['pptm', 'application/vnd.ms-powerpoint.presentation.macroenabled.12'],
    ['pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
    ['ppz', 'application/mspowerpoint'],
    ['prc', 'application/x-mobipocket-ebook'],
    ['pre', ['application/vnd.lotus-freelance', 'application/x-freelance']],
    ['prf', 'application/pics-rules'],
    ['prt', 'application/pro_eng'],
    ['ps', 'application/postscript'],
    ['psb', 'application/vnd.3gpp.pic-bw-small'],
    ['psd', ['application/octet-stream', 'image/vnd.adobe.photoshop']],
    ['psf', 'application/x-font-linux-psf'],
    ['pskcxml', 'application/pskc+xml'],
    ['ptid', 'application/vnd.pvi.ptid1'],
    ['pub', 'application/x-mspublisher'],
    ['pvb', 'application/vnd.3gpp.pic-bw-var'],
    ['pvu', 'paleovu/x-pv'],
    ['pwn', 'application/vnd.3m.post-it-notes'],
    ['pwz', 'application/vnd.ms-powerpoint'],
    ['py', 'text/x-script.phyton'],
    ['pya', 'audio/vnd.ms-playready.media.pya'],
    ['pyc', 'applicaiton/x-bytecode.python'],
    ['pyv', 'video/vnd.ms-playready.media.pyv'],
    ['qam', 'application/vnd.epson.quickanime'],
    ['qbo', 'application/vnd.intu.qbo'],
    ['qcp', 'audio/vnd.qcelp'],
    ['qd3', 'x-world/x-3dmf'],
    ['qd3d', 'x-world/x-3dmf'],
    ['qfx', 'application/vnd.intu.qfx'],
    ['qif', 'image/x-quicktime'],
    ['qps', 'application/vnd.publishare-delta-tree'],
    ['qt', 'video/quicktime'],
    ['qtc', 'video/x-qtc'],
    ['qti', 'image/x-quicktime'],
    ['qtif', 'image/x-quicktime'],
    ['qxd', 'application/vnd.quark.quarkxpress'],
    ['ra', ['audio/x-realaudio', 'audio/x-pn-realaudio', 'audio/x-pn-realaudio-plugin']],
    ['ram', 'audio/x-pn-realaudio'],
    ['rar', 'application/x-rar-compressed'],
    ['ras', ['image/cmu-raster', 'application/x-cmu-raster', 'image/x-cmu-raster']],
    ['rast', 'image/cmu-raster'],
    ['rcprofile', 'application/vnd.ipunplugged.rcprofile'],
    ['rdf', 'application/rdf+xml'],
    ['rdz', 'application/vnd.data-vision.rdz'],
    ['rep', 'application/vnd.businessobjects'],
    ['res', 'application/x-dtbresource+xml'],
    ['rexx', 'text/x-script.rexx'],
    ['rf', 'image/vnd.rn-realflash'],
    ['rgb', 'image/x-rgb'],
    ['rif', 'application/reginfo+xml'],
    ['rip', 'audio/vnd.rip'],
    ['rl', 'application/resource-lists+xml'],
    ['rlc', 'image/vnd.fujixerox.edmics-rlc'],
    ['rld', 'application/resource-lists-diff+xml'],
    ['rm', ['application/vnd.rn-realmedia', 'audio/x-pn-realaudio']],
    ['rmi', 'audio/mid'],
    ['rmm', 'audio/x-pn-realaudio'],
    ['rmp', ['audio/x-pn-realaudio-plugin', 'audio/x-pn-realaudio']],
    ['rms', 'application/vnd.jcp.javame.midlet-rms'],
    ['rnc', 'application/relax-ng-compact-syntax'],
    ['rng', ['application/ringing-tones', 'application/vnd.nokia.ringing-tone']],
    ['rnx', 'application/vnd.rn-realplayer'],
    ['roff', 'application/x-troff'],
    ['rp', 'image/vnd.rn-realpix'],
    ['rp9', 'application/vnd.cloanto.rp9'],
    ['rpm', 'audio/x-pn-realaudio-plugin'],
    ['rpss', 'application/vnd.nokia.radio-presets'],
    ['rpst', 'application/vnd.nokia.radio-preset'],
    ['rq', 'application/sparql-query'],
    ['rs', 'application/rls-services+xml'],
    ['rsd', 'application/rsd+xml'],
    ['rt', ['text/richtext', 'text/vnd.rn-realtext']],
    ['rtf', ['application/rtf', 'text/richtext', 'application/x-rtf']],
    ['rtx', ['text/richtext', 'application/rtf']],
    ['rv', 'video/vnd.rn-realvideo'],
    ['s', 'text/x-asm'],
    ['s3m', 'audio/s3m'],
    ['saf', 'application/vnd.yamaha.smaf-audio'],
    ['saveme', 'application/octet-stream'],
    ['sbk', 'application/x-tbook'],
    ['sbml', 'application/sbml+xml'],
    ['sc', 'application/vnd.ibm.secure-container'],
    ['scd', 'application/x-msschedule'],
    ['scm', ['application/vnd.lotus-screencam', 'video/x-scm', 'text/x-script.guile', 'application/x-lotusscreencam', 'text/x-script.scheme']],
    ['scq', 'application/scvp-cv-request'],
    ['scs', 'application/scvp-cv-response'],
    ['sct', 'text/scriptlet'],
    ['scurl', 'text/vnd.curl.scurl'],
    ['sda', 'application/vnd.stardivision.draw'],
    ['sdc', 'application/vnd.stardivision.calc'],
    ['sdd', 'application/vnd.stardivision.impress'],
    ['sdkm', 'application/vnd.solent.sdkm+xml'],
    ['sdml', 'text/plain'],
    ['sdp', ['application/sdp', 'application/x-sdp']],
    ['sdr', 'application/sounder'],
    ['sdw', 'application/vnd.stardivision.writer'],
    ['sea', ['application/sea', 'application/x-sea']],
    ['see', 'application/vnd.seemail'],
    ['seed', 'application/vnd.fdsn.seed'],
    ['sema', 'application/vnd.sema'],
    ['semd', 'application/vnd.semd'],
    ['semf', 'application/vnd.semf'],
    ['ser', 'application/java-serialized-object'],
    ['set', 'application/set'],
    ['setpay', 'application/set-payment-initiation'],
    ['setreg', 'application/set-registration-initiation'],
    ['sfd-hdstx', 'application/vnd.hydrostatix.sof-data'],
    ['sfs', 'application/vnd.spotfire.sfs'],
    ['sgl', 'application/vnd.stardivision.writer-global'],
    ['sgm', ['text/sgml', 'text/x-sgml']],
    ['sgml', ['text/sgml', 'text/x-sgml']],
    ['sh', ['application/x-shar', 'application/x-bsh', 'application/x-sh', 'text/x-script.sh']],
    ['shar', ['application/x-bsh', 'application/x-shar']],
    ['shf', 'application/shf+xml'],
    ['shtml', ['text/html', 'text/x-server-parsed-html']],
    ['sid', 'audio/x-psid'],
    ['sis', 'application/vnd.symbian.install'],
    ['sit', ['application/x-stuffit', 'application/x-sit']],
    ['sitx', 'application/x-stuffitx'],
    ['skd', 'application/x-koan'],
    ['skm', 'application/x-koan'],
    ['skp', ['application/vnd.koan', 'application/x-koan']],
    ['skt', 'application/x-koan'],
    ['sl', 'application/x-seelogo'],
    ['sldm', 'application/vnd.ms-powerpoint.slide.macroenabled.12'],
    ['sldx', 'application/vnd.openxmlformats-officedocument.presentationml.slide'],
    ['slt', 'application/vnd.epson.salt'],
    ['sm', 'application/vnd.stepmania.stepchart'],
    ['smf', 'application/vnd.stardivision.math'],
    ['smi', ['application/smil', 'application/smil+xml']],
    ['smil', 'application/smil'],
    ['snd', ['audio/basic', 'audio/x-adpcm']],
    ['snf', 'application/x-font-snf'],
    ['sol', 'application/solids'],
    ['spc', ['text/x-speech', 'application/x-pkcs7-certificates']],
    ['spf', 'application/vnd.yamaha.smaf-phrase'],
    ['spl', ['application/futuresplash', 'application/x-futuresplash']],
    ['spot', 'text/vnd.in3d.spot'],
    ['spp', 'application/scvp-vp-response'],
    ['spq', 'application/scvp-vp-request'],
    ['spr', 'application/x-sprite'],
    ['sprite', 'application/x-sprite'],
    ['src', 'application/x-wais-source'],
    ['sru', 'application/sru+xml'],
    ['srx', 'application/sparql-results+xml'],
    ['sse', 'application/vnd.kodak-descriptor'],
    ['ssf', 'application/vnd.epson.ssf'],
    ['ssi', 'text/x-server-parsed-html'],
    ['ssm', 'application/streamingmedia'],
    ['ssml', 'application/ssml+xml'],
    ['sst', ['application/vnd.ms-pkicertstore', 'application/vnd.ms-pki.certstore']],
    ['st', 'application/vnd.sailingtracker.track'],
    ['stc', 'application/vnd.sun.xml.calc.template'],
    ['std', 'application/vnd.sun.xml.draw.template'],
    ['step', 'application/step'],
    ['stf', 'application/vnd.wt.stf'],
    ['sti', 'application/vnd.sun.xml.impress.template'],
    ['stk', 'application/hyperstudio'],
    ['stl', ['application/vnd.ms-pkistl', 'application/sla', 'application/vnd.ms-pki.stl', 'application/x-navistyle']],
    ['stm', 'text/html'],
    ['stp', 'application/step'],
    ['str', 'application/vnd.pg.format'],
    ['stw', 'application/vnd.sun.xml.writer.template'],
    ['sub', 'image/vnd.dvb.subtitle'],
    ['sus', 'application/vnd.sus-calendar'],
    ['sv4cpio', 'application/x-sv4cpio'],
    ['sv4crc', 'application/x-sv4crc'],
    ['svc', 'application/vnd.dvb.service'],
    ['svd', 'application/vnd.svd'],
    ['svf', ['image/vnd.dwg', 'image/x-dwg']],
    ['svg', 'image/svg+xml'],
    ['svr', ['x-world/x-svr', 'application/x-world']],
    ['swf', 'application/x-shockwave-flash'],
    ['swi', 'application/vnd.aristanetworks.swi'],
    ['sxc', 'application/vnd.sun.xml.calc'],
    ['sxd', 'application/vnd.sun.xml.draw'],
    ['sxg', 'application/vnd.sun.xml.writer.global'],
    ['sxi', 'application/vnd.sun.xml.impress'],
    ['sxm', 'application/vnd.sun.xml.math'],
    ['sxw', 'application/vnd.sun.xml.writer'],
    ['t', ['text/troff', 'application/x-troff']],
    ['talk', 'text/x-speech'],
    ['tao', 'application/vnd.tao.intent-module-archive'],
    ['tar', 'application/x-tar'],
    ['tbk', ['application/toolbook', 'application/x-tbook']],
    ['tcap', 'application/vnd.3gpp2.tcap'],
    ['tcl', ['text/x-script.tcl', 'application/x-tcl']],
    ['tcsh', 'text/x-script.tcsh'],
    ['teacher', 'application/vnd.smart.teacher'],
    ['tei', 'application/tei+xml'],
    ['tex', 'application/x-tex'],
    ['texi', 'application/x-texinfo'],
    ['texinfo', 'application/x-texinfo'],
    ['text', ['application/plain', 'text/plain']],
    ['tfi', 'application/thraud+xml'],
    ['tfm', 'application/x-tex-tfm'],
    ['tgz', ['application/gnutar', 'application/x-compressed']],
    ['thmx', 'application/vnd.ms-officetheme'],
    ['tif', ['image/tiff', 'image/x-tiff']],
    ['tiff', ['image/tiff', 'image/x-tiff']],
    ['tmo', 'application/vnd.tmobile-livetv'],
    ['torrent', 'application/x-bittorrent'],
    ['tpl', 'application/vnd.groove-tool-template'],
    ['tpt', 'application/vnd.trid.tpt'],
    ['tr', 'application/x-troff'],
    ['tra', 'application/vnd.trueapp'],
    ['trm', 'application/x-msterminal'],
    ['tsd', 'application/timestamped-data'],
    ['tsi', 'audio/tsp-audio'],
    ['tsp', ['application/dsptype', 'audio/tsplayer']],
    ['tsv', 'text/tab-separated-values'],
    ['ttf', 'application/x-font-ttf'],
    ['ttl', 'text/turtle'],
    ['turbot', 'image/florian'],
    ['twd', 'application/vnd.simtech-mindmapper'],
    ['txd', 'application/vnd.genomatix.tuxedo'],
    ['txf', 'application/vnd.mobius.txf'],
    ['txt', 'text/plain'],
    ['ufd', 'application/vnd.ufdl'],
    ['uil', 'text/x-uil'],
    ['uls', 'text/iuls'],
    ['umj', 'application/vnd.umajin'],
    ['uni', 'text/uri-list'],
    ['unis', 'text/uri-list'],
    ['unityweb', 'application/vnd.unity'],
    ['unv', 'application/i-deas'],
    ['uoml', 'application/vnd.uoml+xml'],
    ['uri', 'text/uri-list'],
    ['uris', 'text/uri-list'],
    ['ustar', ['application/x-ustar', 'multipart/x-ustar']],
    ['utz', 'application/vnd.uiq.theme'],
    ['uu', ['application/octet-stream', 'text/x-uuencode']],
    ['uue', 'text/x-uuencode'],
    ['uva', 'audio/vnd.dece.audio'],
    ['uvh', 'video/vnd.dece.hd'],
    ['uvi', 'image/vnd.dece.graphic'],
    ['uvm', 'video/vnd.dece.mobile'],
    ['uvp', 'video/vnd.dece.pd'],
    ['uvs', 'video/vnd.dece.sd'],
    ['uvu', 'video/vnd.uvvu.mp4'],
    ['uvv', 'video/vnd.dece.video'],
    ['vcd', 'application/x-cdlink'],
    ['vcf', 'text/x-vcard'],
    ['vcg', 'application/vnd.groove-vcard'],
    ['vcs', 'text/x-vcalendar'],
    ['vcx', 'application/vnd.vcx'],
    ['vda', 'application/vda'],
    ['vdo', 'video/vdo'],
    ['vew', 'application/groupwise'],
    ['vis', 'application/vnd.visionary'],
    ['viv', ['video/vivo', 'video/vnd.vivo']],
    ['vivo', ['video/vivo', 'video/vnd.vivo']],
    ['vmd', 'application/vocaltec-media-desc'],
    ['vmf', 'application/vocaltec-media-file'],
    ['voc', ['audio/voc', 'audio/x-voc']],
    ['vos', 'video/vosaic'],
    ['vox', 'audio/voxware'],
    ['vqe', 'audio/x-twinvq-plugin'],
    ['vqf', 'audio/x-twinvq'],
    ['vql', 'audio/x-twinvq-plugin'],
    ['vrml', ['model/vrml', 'x-world/x-vrml', 'application/x-vrml']],
    ['vrt', 'x-world/x-vrt'],
    ['vsd', ['application/vnd.visio', 'application/x-visio']],
    ['vsf', 'application/vnd.vsf'],
    ['vst', 'application/x-visio'],
    ['vsw', 'application/x-visio'],
    ['vtu', 'model/vnd.vtu'],
    ['vxml', 'application/voicexml+xml'],
    ['w60', 'application/wordperfect6.0'],
    ['w61', 'application/wordperfect6.1'],
    ['w6w', 'application/msword'],
    ['wad', 'application/x-doom'],
    ['wav', ['audio/wav', 'audio/x-wav']],
    ['wax', 'audio/x-ms-wax'],
    ['wb1', 'application/x-qpro'],
    ['wbmp', 'image/vnd.wap.wbmp'],
    ['wbs', 'application/vnd.criticaltools.wbs+xml'],
    ['wbxml', 'application/vnd.wap.wbxml'],
    ['wcm', 'application/vnd.ms-works'],
    ['wdb', 'application/vnd.ms-works'],
    ['web', 'application/vnd.xara'],
    ['weba', 'audio/webm'],
    ['webm', 'video/webm'],
    ['webp', 'image/webp'],
    ['wg', 'application/vnd.pmi.widget'],
    ['wgt', 'application/widget'],
    ['wiz', 'application/msword'],
    ['wk1', 'application/x-123'],
    ['wks', 'application/vnd.ms-works'],
    ['wm', 'video/x-ms-wm'],
    ['wma', 'audio/x-ms-wma'],
    ['wmd', 'application/x-ms-wmd'],
    ['wmf', ['windows/metafile', 'application/x-msmetafile']],
    ['wml', 'text/vnd.wap.wml'],
    ['wmlc', 'application/vnd.wap.wmlc'],
    ['wmls', 'text/vnd.wap.wmlscript'],
    ['wmlsc', 'application/vnd.wap.wmlscriptc'],
    ['wmv', 'video/x-ms-wmv'],
    ['wmx', 'video/x-ms-wmx'],
    ['wmz', 'application/x-ms-wmz'],
    ['woff', 'application/x-font-woff'],
    ['word', 'application/msword'],
    ['wp', 'application/wordperfect'],
    ['wp5', ['application/wordperfect', 'application/wordperfect6.0']],
    ['wp6', 'application/wordperfect'],
    ['wpd', ['application/wordperfect', 'application/vnd.wordperfect', 'application/x-wpwin']],
    ['wpl', 'application/vnd.ms-wpl'],
    ['wps', 'application/vnd.ms-works'],
    ['wq1', 'application/x-lotus'],
    ['wqd', 'application/vnd.wqd'],
    ['wri', ['application/mswrite', 'application/x-wri', 'application/x-mswrite']],
    ['wrl', ['model/vrml', 'x-world/x-vrml', 'application/x-world']],
    ['wrz', ['model/vrml', 'x-world/x-vrml']],
    ['wsc', 'text/scriplet'],
    ['wsdl', 'application/wsdl+xml'],
    ['wspolicy', 'application/wspolicy+xml'],
    ['wsrc', 'application/x-wais-source'],
    ['wtb', 'application/vnd.webturbo'],
    ['wtk', 'application/x-wintalk'],
    ['wvx', 'video/x-ms-wvx'],
    ['x-png', 'image/png'],
    ['x3d', 'application/vnd.hzn-3d-crossword'],
    ['xaf', 'x-world/x-vrml'],
    ['xap', 'application/x-silverlight-app'],
    ['xar', 'application/vnd.xara'],
    ['xbap', 'application/x-ms-xbap'],
    ['xbd', 'application/vnd.fujixerox.docuworks.binder'],
    ['xbm', ['image/xbm', 'image/x-xbm', 'image/x-xbitmap']],
    ['xdf', 'application/xcap-diff+xml'],
    ['xdm', 'application/vnd.syncml.dm+xml'],
    ['xdp', 'application/vnd.adobe.xdp+xml'],
    ['xdr', 'video/x-amt-demorun'],
    ['xdssc', 'application/dssc+xml'],
    ['xdw', 'application/vnd.fujixerox.docuworks'],
    ['xenc', 'application/xenc+xml'],
    ['xer', 'application/patch-ops-error+xml'],
    ['xfdf', 'application/vnd.adobe.xfdf'],
    ['xfdl', 'application/vnd.xfdl'],
    ['xgz', 'xgl/drawing'],
    ['xhtml', 'application/xhtml+xml'],
    ['xif', 'image/vnd.xiff'],
    ['xl', 'application/excel'],
    ['xla', ['application/vnd.ms-excel', 'application/excel', 'application/x-msexcel', 'application/x-excel']],
    ['xlam', 'application/vnd.ms-excel.addin.macroenabled.12'],
    ['xlb', ['application/excel', 'application/vnd.ms-excel', 'application/x-excel']],
    ['xlc', ['application/vnd.ms-excel', 'application/excel', 'application/x-excel']],
    ['xld', ['application/excel', 'application/x-excel']],
    ['xlk', ['application/excel', 'application/x-excel']],
    ['xll', ['application/excel', 'application/vnd.ms-excel', 'application/x-excel']],
    ['xlm', ['application/vnd.ms-excel', 'application/excel', 'application/x-excel']],
    ['xls', ['application/vnd.ms-excel', 'application/excel', 'application/x-msexcel', 'application/x-excel']],
    ['xlsb', 'application/vnd.ms-excel.sheet.binary.macroenabled.12'],
    ['xlsm', 'application/vnd.ms-excel.sheet.macroenabled.12'],
    ['xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    ['xlt', ['application/vnd.ms-excel', 'application/excel', 'application/x-excel']],
    ['xltm', 'application/vnd.ms-excel.template.macroenabled.12'],
    ['xltx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.template'],
    ['xlv', ['application/excel', 'application/x-excel']],
    ['xlw', ['application/vnd.ms-excel', 'application/excel', 'application/x-msexcel', 'application/x-excel']],
    ['xm', 'audio/xm'],
    ['xml', ['application/xml', 'text/xml', 'application/atom+xml', 'application/rss+xml']],
    ['xmz', 'xgl/movie'],
    ['xo', 'application/vnd.olpc-sugar'],
    ['xof', 'x-world/x-vrml'],
    ['xop', 'application/xop+xml'],
    ['xpi', 'application/x-xpinstall'],
    ['xpix', 'application/x-vnd.ls-xpix'],
    ['xpm', ['image/xpm', 'image/x-xpixmap']],
    ['xpr', 'application/vnd.is-xpr'],
    ['xps', 'application/vnd.ms-xpsdocument'],
    ['xpw', 'application/vnd.intercon.formnet'],
    ['xslt', 'application/xslt+xml'],
    ['xsm', 'application/vnd.syncml+xml'],
    ['xspf', 'application/xspf+xml'],
    ['xsr', 'video/x-amt-showrun'],
    ['xul', 'application/vnd.mozilla.xul+xml'],
    ['xwd', ['image/x-xwd', 'image/x-xwindowdump']],
    ['xyz', ['chemical/x-xyz', 'chemical/x-pdb']],
    ['yang', 'application/yang'],
    ['yin', 'application/yin+xml'],
    ['z', ['application/x-compressed', 'application/x-compress']],
    ['zaz', 'application/vnd.zzazz.deck+xml'],
    ['zip', ['application/zip', 'multipart/x-zip', 'application/x-zip-compressed', 'application/x-compressed']],
    ['zir', 'application/vnd.zul'],
    ['zmm', 'application/vnd.handheld-entertainment+xml'],
    ['zoo', 'application/octet-stream'],
    ['zsh', 'text/x-script.zsh']
]);

module.exports = {
    detectMimeType(filename) {
        if (!filename) {
            return defaultMimeType;
        }

        let parsed = path.parse(filename);
        let extension = (parsed.ext.substr(1) || parsed.name || '').split('?').shift().trim().toLowerCase();
        let value = defaultMimeType;

        if (extensions.has(extension)) {
            value = extensions.get(extension);
        }

        if (Array.isArray(value)) {
            return value[0];
        }
        return value;
    },

    detectExtension(mimeType) {
        if (!mimeType) {
            return defaultExtension;
        }
        let parts = (mimeType || '').toLowerCase().trim().split('/');
        let rootType = parts.shift().trim();
        let subType = parts.join('/').trim();

        if (mimeTypes.has(rootType + '/' + subType)) {
            let value = mimeTypes.get(rootType + '/' + subType);
            if (Array.isArray(value)) {
                return value[0];
            }
            return value;
        }

        switch (rootType) {
            case 'text':
                return 'txt';
            default:
                return 'bin';
        }
    }
};


/***/ }),

/***/ 4686:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/* eslint no-undefined: 0, prefer-spread: 0, no-control-regex: 0 */



const crypto = __nccwpck_require__(6113);
const os = __nccwpck_require__(2037);
const fs = __nccwpck_require__(7147);
const punycode = __nccwpck_require__(5477);
const PassThrough = (__nccwpck_require__(2781).PassThrough);
const shared = __nccwpck_require__(2974);

const mimeFuncs = __nccwpck_require__(5346);
const qp = __nccwpck_require__(3901);
const base64 = __nccwpck_require__(3885);
const addressparser = __nccwpck_require__(5804);
const fetch = __nccwpck_require__(6665);
const LastNewline = __nccwpck_require__(7027);

const LeWindows = __nccwpck_require__(6309);
const LeUnix = __nccwpck_require__(4370);

/**
 * Creates a new mime tree node. Assumes 'multipart/*' as the content type
 * if it is a branch, anything else counts as leaf. If rootNode is missing from
 * the options, assumes this is the root.
 *
 * @param {String} contentType Define the content type for the node. Can be left blank for attachments (derived from filename)
 * @param {Object} [options] optional options
 * @param {Object} [options.rootNode] root node for this tree
 * @param {Object} [options.parentNode] immediate parent for this node
 * @param {Object} [options.filename] filename for an attachment node
 * @param {String} [options.baseBoundary] shared part of the unique multipart boundary
 * @param {Boolean} [options.keepBcc] If true, do not exclude Bcc from the generated headers
 * @param {Function} [options.normalizeHeaderKey] method to normalize header keys for custom caseing
 * @param {String} [options.textEncoding] either 'Q' (the default) or 'B'
 */
class MimeNode {
    constructor(contentType, options) {
        this.nodeCounter = 0;

        options = options || {};

        /**
         * shared part of the unique multipart boundary
         */
        this.baseBoundary = options.baseBoundary || crypto.randomBytes(8).toString('hex');
        this.boundaryPrefix = options.boundaryPrefix || '--_NmP';

        this.disableFileAccess = !!options.disableFileAccess;
        this.disableUrlAccess = !!options.disableUrlAccess;

        this.normalizeHeaderKey = options.normalizeHeaderKey;

        /**
         * If date headers is missing and current node is the root, this value is used instead
         */
        this.date = new Date();

        /**
         * Root node for current mime tree
         */
        this.rootNode = options.rootNode || this;

        /**
         * If true include Bcc in generated headers (if available)
         */
        this.keepBcc = !!options.keepBcc;

        /**
         * If filename is specified but contentType is not (probably an attachment)
         * detect the content type from filename extension
         */
        if (options.filename) {
            /**
             * Filename for this node. Useful with attachments
             */
            this.filename = options.filename;
            if (!contentType) {
                contentType = mimeFuncs.detectMimeType(this.filename.split('.').pop());
            }
        }

        /**
         * Indicates which encoding should be used for header strings: "Q" or "B"
         */
        this.textEncoding = (options.textEncoding || '').toString().trim().charAt(0).toUpperCase();

        /**
         * Immediate parent for this node (or undefined if not set)
         */
        this.parentNode = options.parentNode;

        /**
         * Hostname for default message-id values
         */
        this.hostname = options.hostname;

        /**
         * If set to 'win' then uses \r\n, if 'linux' then \n. If not set (or `raw` is used) then newlines are kept as is.
         */
        this.newline = options.newline;

        /**
         * An array for possible child nodes
         */
        this.childNodes = [];

        /**
         * Used for generating unique boundaries (prepended to the shared base)
         */
        this._nodeId = ++this.rootNode.nodeCounter;

        /**
         * A list of header values for this node in the form of [{key:'', value:''}]
         */
        this._headers = [];

        /**
         * True if the content only uses ASCII printable characters
         * @type {Boolean}
         */
        this._isPlainText = false;

        /**
         * True if the content is plain text but has longer lines than allowed
         * @type {Boolean}
         */
        this._hasLongLines = false;

        /**
         * If set, use instead this value for envelopes instead of generating one
         * @type {Boolean}
         */
        this._envelope = false;

        /**
         * If set then use this value as the stream content instead of building it
         * @type {String|Buffer|Stream}
         */
        this._raw = false;

        /**
         * Additional transform streams that the message will be piped before
         * exposing by createReadStream
         * @type {Array}
         */
        this._transforms = [];

        /**
         * Additional process functions that the message will be piped through before
         * exposing by createReadStream. These functions are run after transforms
         * @type {Array}
         */
        this._processFuncs = [];

        /**
         * If content type is set (or derived from the filename) add it to headers
         */
        if (contentType) {
            this.setHeader('Content-Type', contentType);
        }
    }

    /////// PUBLIC METHODS

    /**
     * Creates and appends a child node.Arguments provided are passed to MimeNode constructor
     *
     * @param {String} [contentType] Optional content type
     * @param {Object} [options] Optional options object
     * @return {Object} Created node object
     */
    createChild(contentType, options) {
        if (!options && typeof contentType === 'object') {
            options = contentType;
            contentType = undefined;
        }
        let node = new MimeNode(contentType, options);
        this.appendChild(node);
        return node;
    }

    /**
     * Appends an existing node to the mime tree. Removes the node from an existing
     * tree if needed
     *
     * @param {Object} childNode node to be appended
     * @return {Object} Appended node object
     */
    appendChild(childNode) {
        if (childNode.rootNode !== this.rootNode) {
            childNode.rootNode = this.rootNode;
            childNode._nodeId = ++this.rootNode.nodeCounter;
        }

        childNode.parentNode = this;

        this.childNodes.push(childNode);
        return childNode;
    }

    /**
     * Replaces current node with another node
     *
     * @param {Object} node Replacement node
     * @return {Object} Replacement node
     */
    replace(node) {
        if (node === this) {
            return this;
        }

        this.parentNode.childNodes.forEach((childNode, i) => {
            if (childNode === this) {
                node.rootNode = this.rootNode;
                node.parentNode = this.parentNode;
                node._nodeId = this._nodeId;

                this.rootNode = this;
                this.parentNode = undefined;

                node.parentNode.childNodes[i] = node;
            }
        });

        return node;
    }

    /**
     * Removes current node from the mime tree
     *
     * @return {Object} removed node
     */
    remove() {
        if (!this.parentNode) {
            return this;
        }

        for (let i = this.parentNode.childNodes.length - 1; i >= 0; i--) {
            if (this.parentNode.childNodes[i] === this) {
                this.parentNode.childNodes.splice(i, 1);
                this.parentNode = undefined;
                this.rootNode = this;
                return this;
            }
        }
    }

    /**
     * Sets a header value. If the value for selected key exists, it is overwritten.
     * You can set multiple values as well by using [{key:'', value:''}] or
     * {key: 'value'} as the first argument.
     *
     * @param {String|Array|Object} key Header key or a list of key value pairs
     * @param {String} value Header value
     * @return {Object} current node
     */
    setHeader(key, value) {
        let added = false,
            headerValue;

        // Allow setting multiple headers at once
        if (!value && key && typeof key === 'object') {
            // allow {key:'content-type', value: 'text/plain'}
            if (key.key && 'value' in key) {
                this.setHeader(key.key, key.value);
            } else if (Array.isArray(key)) {
                // allow [{key:'content-type', value: 'text/plain'}]
                key.forEach(i => {
                    this.setHeader(i.key, i.value);
                });
            } else {
                // allow {'content-type': 'text/plain'}
                Object.keys(key).forEach(i => {
                    this.setHeader(i, key[i]);
                });
            }
            return this;
        }

        key = this._normalizeHeaderKey(key);

        headerValue = {
            key,
            value
        };

        // Check if the value exists and overwrite
        for (let i = 0, len = this._headers.length; i < len; i++) {
            if (this._headers[i].key === key) {
                if (!added) {
                    // replace the first match
                    this._headers[i] = headerValue;
                    added = true;
                } else {
                    // remove following matches
                    this._headers.splice(i, 1);
                    i--;
                    len--;
                }
            }
        }

        // match not found, append the value
        if (!added) {
            this._headers.push(headerValue);
        }

        return this;
    }

    /**
     * Adds a header value. If the value for selected key exists, the value is appended
     * as a new field and old one is not touched.
     * You can set multiple values as well by using [{key:'', value:''}] or
     * {key: 'value'} as the first argument.
     *
     * @param {String|Array|Object} key Header key or a list of key value pairs
     * @param {String} value Header value
     * @return {Object} current node
     */
    addHeader(key, value) {
        // Allow setting multiple headers at once
        if (!value && key && typeof key === 'object') {
            // allow {key:'content-type', value: 'text/plain'}
            if (key.key && key.value) {
                this.addHeader(key.key, key.value);
            } else if (Array.isArray(key)) {
                // allow [{key:'content-type', value: 'text/plain'}]
                key.forEach(i => {
                    this.addHeader(i.key, i.value);
                });
            } else {
                // allow {'content-type': 'text/plain'}
                Object.keys(key).forEach(i => {
                    this.addHeader(i, key[i]);
                });
            }
            return this;
        } else if (Array.isArray(value)) {
            value.forEach(val => {
                this.addHeader(key, val);
            });
            return this;
        }

        this._headers.push({
            key: this._normalizeHeaderKey(key),
            value
        });

        return this;
    }

    /**
     * Retrieves the first mathcing value of a selected key
     *
     * @param {String} key Key to search for
     * @retun {String} Value for the key
     */
    getHeader(key) {
        key = this._normalizeHeaderKey(key);
        for (let i = 0, len = this._headers.length; i < len; i++) {
            if (this._headers[i].key === key) {
                return this._headers[i].value;
            }
        }
    }

    /**
     * Sets body content for current node. If the value is a string, charset is added automatically
     * to Content-Type (if it is text/*). If the value is a Buffer, you need to specify
     * the charset yourself
     *
     * @param (String|Buffer) content Body content
     * @return {Object} current node
     */
    setContent(content) {
        this.content = content;
        if (typeof this.content.pipe === 'function') {
            // pre-stream handler. might be triggered if a stream is set as content
            // and 'error' fires before anything is done with this stream
            this._contentErrorHandler = err => {
                this.content.removeListener('error', this._contentErrorHandler);
                this.content = err;
            };
            this.content.once('error', this._contentErrorHandler);
        } else if (typeof this.content === 'string') {
            this._isPlainText = mimeFuncs.isPlainText(this.content);
            if (this._isPlainText && mimeFuncs.hasLongerLines(this.content, 76)) {
                // If there are lines longer than 76 symbols/bytes do not use 7bit
                this._hasLongLines = true;
            }
        }
        return this;
    }

    build(callback) {
        let promise;

        if (!callback) {
            promise = new Promise((resolve, reject) => {
                callback = shared.callbackPromise(resolve, reject);
            });
        }

        let stream = this.createReadStream();
        let buf = [];
        let buflen = 0;
        let returned = false;

        stream.on('readable', () => {
            let chunk;

            while ((chunk = stream.read()) !== null) {
                buf.push(chunk);
                buflen += chunk.length;
            }
        });

        stream.once('error', err => {
            if (returned) {
                return;
            }
            returned = true;

            return callback(err);
        });

        stream.once('end', chunk => {
            if (returned) {
                return;
            }
            returned = true;

            if (chunk && chunk.length) {
                buf.push(chunk);
                buflen += chunk.length;
            }
            return callback(null, Buffer.concat(buf, buflen));
        });

        return promise;
    }

    getTransferEncoding() {
        let transferEncoding = false;
        let contentType = (this.getHeader('Content-Type') || '').toString().toLowerCase().trim();

        if (this.content) {
            transferEncoding = (this.getHeader('Content-Transfer-Encoding') || '').toString().toLowerCase().trim();
            if (!transferEncoding || !['base64', 'quoted-printable'].includes(transferEncoding)) {
                if (/^text\//i.test(contentType)) {
                    // If there are no special symbols, no need to modify the text
                    if (this._isPlainText && !this._hasLongLines) {
                        transferEncoding = '7bit';
                    } else if (typeof this.content === 'string' || this.content instanceof Buffer) {
                        // detect preferred encoding for string value
                        transferEncoding = this._getTextEncoding(this.content) === 'Q' ? 'quoted-printable' : 'base64';
                    } else {
                        // we can not check content for a stream, so either use preferred encoding or fallback to QP
                        transferEncoding = this.textEncoding === 'B' ? 'base64' : 'quoted-printable';
                    }
                } else if (!/^(multipart|message)\//i.test(contentType)) {
                    transferEncoding = transferEncoding || 'base64';
                }
            }
        }
        return transferEncoding;
    }

    /**
     * Builds the header block for the mime node. Append \r\n\r\n before writing the content
     *
     * @returns {String} Headers
     */
    buildHeaders() {
        let transferEncoding = this.getTransferEncoding();
        let headers = [];

        if (transferEncoding) {
            this.setHeader('Content-Transfer-Encoding', transferEncoding);
        }

        if (this.filename && !this.getHeader('Content-Disposition')) {
            this.setHeader('Content-Disposition', 'attachment');
        }

        // Ensure mandatory header fields
        if (this.rootNode === this) {
            if (!this.getHeader('Date')) {
                this.setHeader('Date', this.date.toUTCString().replace(/GMT/, '+0000'));
            }

            // ensure that Message-Id is present
            this.messageId();

            if (!this.getHeader('MIME-Version')) {
                this.setHeader('MIME-Version', '1.0');
            }
        }

        this._headers.forEach(header => {
            let key = header.key;
            let value = header.value;
            let structured;
            let param;
            let options = {};
            let formattedHeaders = ['From', 'Sender', 'To', 'Cc', 'Bcc', 'Reply-To', 'Date', 'References'];

            if (value && typeof value === 'object' && !formattedHeaders.includes(key)) {
                Object.keys(value).forEach(key => {
                    if (key !== 'value') {
                        options[key] = value[key];
                    }
                });
                value = (value.value || '').toString();
                if (!value.trim()) {
                    return;
                }
            }

            if (options.prepared) {
                // header value is
                if (options.foldLines) {
                    headers.push(mimeFuncs.foldLines(key + ': ' + value));
                } else {
                    headers.push(key + ': ' + value);
                }
                return;
            }

            switch (header.key) {
                case 'Content-Disposition':
                    structured = mimeFuncs.parseHeaderValue(value);
                    if (this.filename) {
                        structured.params.filename = this.filename;
                    }
                    value = mimeFuncs.buildHeaderValue(structured);
                    break;

                case 'Content-Type':
                    structured = mimeFuncs.parseHeaderValue(value);

                    this._handleContentType(structured);

                    if (structured.value.match(/^text\/plain\b/) && typeof this.content === 'string' && /[\u0080-\uFFFF]/.test(this.content)) {
                        structured.params.charset = 'utf-8';
                    }

                    value = mimeFuncs.buildHeaderValue(structured);

                    if (this.filename) {
                        // add support for non-compliant clients like QQ webmail
                        // we can't build the value with buildHeaderValue as the value is non standard and
                        // would be converted to parameter continuation encoding that we do not want
                        param = this._encodeWords(this.filename);

                        if (param !== this.filename || /[\s'"\\;:/=(),<>@[\]?]|^-/.test(param)) {
                            // include value in quotes if needed
                            param = '"' + param + '"';
                        }
                        value += '; name=' + param;
                    }
                    break;

                case 'Bcc':
                    if (!this.keepBcc) {
                        // skip BCC values
                        return;
                    }
                    break;
            }

            value = this._encodeHeaderValue(key, value);

            // skip empty lines
            if (!(value || '').toString().trim()) {
                return;
            }

            if (typeof this.normalizeHeaderKey === 'function') {
                let normalized = this.normalizeHeaderKey(key, value);
                if (normalized && typeof normalized === 'string' && normalized.length) {
                    key = normalized;
                }
            }

            headers.push(mimeFuncs.foldLines(key + ': ' + value, 76));
        });

        return headers.join('\r\n');
    }

    /**
     * Streams the rfc2822 message from the current node. If this is a root node,
     * mandatory header fields are set if missing (Date, Message-Id, MIME-Version)
     *
     * @return {String} Compiled message
     */
    createReadStream(options) {
        options = options || {};

        let stream = new PassThrough(options);
        let outputStream = stream;
        let transform;

        this.stream(stream, options, err => {
            if (err) {
                outputStream.emit('error', err);
                return;
            }
            stream.end();
        });

        for (let i = 0, len = this._transforms.length; i < len; i++) {
            transform = typeof this._transforms[i] === 'function' ? this._transforms[i]() : this._transforms[i];
            outputStream.once('error', err => {
                transform.emit('error', err);
            });
            outputStream = outputStream.pipe(transform);
        }

        // ensure terminating newline after possible user transforms
        transform = new LastNewline();
        outputStream.once('error', err => {
            transform.emit('error', err);
        });
        outputStream = outputStream.pipe(transform);

        // dkim and stuff
        for (let i = 0, len = this._processFuncs.length; i < len; i++) {
            transform = this._processFuncs[i];
            outputStream = transform(outputStream);
        }

        if (this.newline) {
            const winbreak = ['win', 'windows', 'dos', '\r\n'].includes(this.newline.toString().toLowerCase());
            const newlineTransform = winbreak ? new LeWindows() : new LeUnix();

            const stream = outputStream.pipe(newlineTransform);
            outputStream.on('error', err => stream.emit('error', err));
            return stream;
        }

        return outputStream;
    }

    /**
     * Appends a transform stream object to the transforms list. Final output
     * is passed through this stream before exposing
     *
     * @param {Object} transform Read-Write stream
     */
    transform(transform) {
        this._transforms.push(transform);
    }

    /**
     * Appends a post process function. The functon is run after transforms and
     * uses the following syntax
     *
     *   processFunc(input) -> outputStream
     *
     * @param {Object} processFunc Read-Write stream
     */
    processFunc(processFunc) {
        this._processFuncs.push(processFunc);
    }

    stream(outputStream, options, done) {
        let transferEncoding = this.getTransferEncoding();
        let contentStream;
        let localStream;

        // protect actual callback against multiple triggering
        let returned = false;
        let callback = err => {
            if (returned) {
                return;
            }
            returned = true;
            done(err);
        };

        // for multipart nodes, push child nodes
        // for content nodes end the stream
        let finalize = () => {
            let childId = 0;
            let processChildNode = () => {
                if (childId >= this.childNodes.length) {
                    outputStream.write('\r\n--' + this.boundary + '--\r\n');
                    return callback();
                }
                let child = this.childNodes[childId++];
                outputStream.write((childId > 1 ? '\r\n' : '') + '--' + this.boundary + '\r\n');
                child.stream(outputStream, options, err => {
                    if (err) {
                        return callback(err);
                    }
                    setImmediate(processChildNode);
                });
            };

            if (this.multipart) {
                setImmediate(processChildNode);
            } else {
                return callback();
            }
        };

        // pushes node content
        let sendContent = () => {
            if (this.content) {
                if (Object.prototype.toString.call(this.content) === '[object Error]') {
                    // content is already errored
                    return callback(this.content);
                }

                if (typeof this.content.pipe === 'function') {
                    this.content.removeListener('error', this._contentErrorHandler);
                    this._contentErrorHandler = err => callback(err);
                    this.content.once('error', this._contentErrorHandler);
                }

                let createStream = () => {
                    if (['quoted-printable', 'base64'].includes(transferEncoding)) {
                        contentStream = new (transferEncoding === 'base64' ? base64 : qp).Encoder(options);

                        contentStream.pipe(outputStream, {
                            end: false
                        });
                        contentStream.once('end', finalize);
                        contentStream.once('error', err => callback(err));

                        localStream = this._getStream(this.content);
                        localStream.pipe(contentStream);
                    } else {
                        // anything that is not QP or Base54 passes as-is
                        localStream = this._getStream(this.content);
                        localStream.pipe(outputStream, {
                            end: false
                        });
                        localStream.once('end', finalize);
                    }

                    localStream.once('error', err => callback(err));
                };

                if (this.content._resolve) {
                    let chunks = [];
                    let chunklen = 0;
                    let returned = false;
                    let sourceStream = this._getStream(this.content);
                    sourceStream.on('error', err => {
                        if (returned) {
                            return;
                        }
                        returned = true;
                        callback(err);
                    });
                    sourceStream.on('readable', () => {
                        let chunk;
                        while ((chunk = sourceStream.read()) !== null) {
                            chunks.push(chunk);
                            chunklen += chunk.length;
                        }
                    });
                    sourceStream.on('end', () => {
                        if (returned) {
                            return;
                        }
                        returned = true;
                        this.content._resolve = false;
                        this.content._resolvedValue = Buffer.concat(chunks, chunklen);
                        setImmediate(createStream);
                    });
                } else {
                    setImmediate(createStream);
                }
                return;
            } else {
                return setImmediate(finalize);
            }
        };

        if (this._raw) {
            setImmediate(() => {
                if (Object.prototype.toString.call(this._raw) === '[object Error]') {
                    // content is already errored
                    return callback(this._raw);
                }

                // remove default error handler (if set)
                if (typeof this._raw.pipe === 'function') {
                    this._raw.removeListener('error', this._contentErrorHandler);
                }

                let raw = this._getStream(this._raw);
                raw.pipe(outputStream, {
                    end: false
                });
                raw.on('error', err => outputStream.emit('error', err));
                raw.on('end', finalize);
            });
        } else {
            outputStream.write(this.buildHeaders() + '\r\n\r\n');
            setImmediate(sendContent);
        }
    }

    /**
     * Sets envelope to be used instead of the generated one
     *
     * @return {Object} SMTP envelope in the form of {from: 'from@example.com', to: ['to@example.com']}
     */
    setEnvelope(envelope) {
        let list;

        this._envelope = {
            from: false,
            to: []
        };

        if (envelope.from) {
            list = [];
            this._convertAddresses(this._parseAddresses(envelope.from), list);
            list = list.filter(address => address && address.address);
            if (list.length && list[0]) {
                this._envelope.from = list[0].address;
            }
        }
        ['to', 'cc', 'bcc'].forEach(key => {
            if (envelope[key]) {
                this._convertAddresses(this._parseAddresses(envelope[key]), this._envelope.to);
            }
        });

        this._envelope.to = this._envelope.to.map(to => to.address).filter(address => address);

        let standardFields = ['to', 'cc', 'bcc', 'from'];
        Object.keys(envelope).forEach(key => {
            if (!standardFields.includes(key)) {
                this._envelope[key] = envelope[key];
            }
        });

        return this;
    }

    /**
     * Generates and returns an object with parsed address fields
     *
     * @return {Object} Address object
     */
    getAddresses() {
        let addresses = {};

        this._headers.forEach(header => {
            let key = header.key.toLowerCase();
            if (['from', 'sender', 'reply-to', 'to', 'cc', 'bcc'].includes(key)) {
                if (!Array.isArray(addresses[key])) {
                    addresses[key] = [];
                }

                this._convertAddresses(this._parseAddresses(header.value), addresses[key]);
            }
        });

        return addresses;
    }

    /**
     * Generates and returns SMTP envelope with the sender address and a list of recipients addresses
     *
     * @return {Object} SMTP envelope in the form of {from: 'from@example.com', to: ['to@example.com']}
     */
    getEnvelope() {
        if (this._envelope) {
            return this._envelope;
        }

        let envelope = {
            from: false,
            to: []
        };
        this._headers.forEach(header => {
            let list = [];
            if (header.key === 'From' || (!envelope.from && ['Reply-To', 'Sender'].includes(header.key))) {
                this._convertAddresses(this._parseAddresses(header.value), list);
                if (list.length && list[0]) {
                    envelope.from = list[0].address;
                }
            } else if (['To', 'Cc', 'Bcc'].includes(header.key)) {
                this._convertAddresses(this._parseAddresses(header.value), envelope.to);
            }
        });

        envelope.to = envelope.to.map(to => to.address);

        return envelope;
    }

    /**
     * Returns Message-Id value. If it does not exist, then creates one
     *
     * @return {String} Message-Id value
     */
    messageId() {
        let messageId = this.getHeader('Message-ID');
        // You really should define your own Message-Id field!
        if (!messageId) {
            messageId = this._generateMessageId();
            this.setHeader('Message-ID', messageId);
        }
        return messageId;
    }

    /**
     * Sets pregenerated content that will be used as the output of this node
     *
     * @param {String|Buffer|Stream} Raw MIME contents
     */
    setRaw(raw) {
        this._raw = raw;

        if (this._raw && typeof this._raw.pipe === 'function') {
            // pre-stream handler. might be triggered if a stream is set as content
            // and 'error' fires before anything is done with this stream
            this._contentErrorHandler = err => {
                this._raw.removeListener('error', this._contentErrorHandler);
                this._raw = err;
            };
            this._raw.once('error', this._contentErrorHandler);
        }

        return this;
    }

    /////// PRIVATE METHODS

    /**
     * Detects and returns handle to a stream related with the content.
     *
     * @param {Mixed} content Node content
     * @returns {Object} Stream object
     */
    _getStream(content) {
        let contentStream;

        if (content._resolvedValue) {
            // pass string or buffer content as a stream
            contentStream = new PassThrough();
            setImmediate(() => contentStream.end(content._resolvedValue));
            return contentStream;
        } else if (typeof content.pipe === 'function') {
            // assume as stream
            return content;
        } else if (content && typeof content.path === 'string' && !content.href) {
            if (this.disableFileAccess) {
                contentStream = new PassThrough();
                setImmediate(() => contentStream.emit('error', new Error('File access rejected for ' + content.path)));
                return contentStream;
            }
            // read file
            return fs.createReadStream(content.path);
        } else if (content && typeof content.href === 'string') {
            if (this.disableUrlAccess) {
                contentStream = new PassThrough();
                setImmediate(() => contentStream.emit('error', new Error('Url access rejected for ' + content.href)));
                return contentStream;
            }
            // fetch URL
            return fetch(content.href, { headers: content.httpHeaders });
        } else {
            // pass string or buffer content as a stream
            contentStream = new PassThrough();
            setImmediate(() => contentStream.end(content || ''));
            return contentStream;
        }
    }

    /**
     * Parses addresses. Takes in a single address or an array or an
     * array of address arrays (eg. To: [[first group], [second group],...])
     *
     * @param {Mixed} addresses Addresses to be parsed
     * @return {Array} An array of address objects
     */
    _parseAddresses(addresses) {
        return [].concat.apply(
            [],
            [].concat(addresses).map(address => {
                // eslint-disable-line prefer-spread
                if (address && address.address) {
                    address.address = this._normalizeAddress(address.address);
                    address.name = address.name || '';
                    return [address];
                }
                return addressparser(address);
            })
        );
    }

    /**
     * Normalizes a header key, uses Camel-Case form, except for uppercase MIME-
     *
     * @param {String} key Key to be normalized
     * @return {String} key in Camel-Case form
     */
    _normalizeHeaderKey(key) {
        key = (key || '')
            .toString()
            // no newlines in keys
            .replace(/\r?\n|\r/g, ' ')
            .trim()
            .toLowerCase()
            // use uppercase words, except MIME
            .replace(/^X-SMTPAPI$|^(MIME|DKIM|ARC|BIMI)\b|^[a-z]|-(SPF|FBL|ID|MD5)$|-[a-z]/gi, c => c.toUpperCase())
            // special case
            .replace(/^Content-Features$/i, 'Content-features');

        return key;
    }

    /**
     * Checks if the content type is multipart and defines boundary if needed.
     * Doesn't return anything, modifies object argument instead.
     *
     * @param {Object} structured Parsed header value for 'Content-Type' key
     */
    _handleContentType(structured) {
        this.contentType = structured.value.trim().toLowerCase();

        this.multipart = /^multipart\//i.test(this.contentType) ? this.contentType.substr(this.contentType.indexOf('/') + 1) : false;

        if (this.multipart) {
            this.boundary = structured.params.boundary = structured.params.boundary || this.boundary || this._generateBoundary();
        } else {
            this.boundary = false;
        }
    }

    /**
     * Generates a multipart boundary value
     *
     * @return {String} boundary value
     */
    _generateBoundary() {
        return this.rootNode.boundaryPrefix + '-' + this.rootNode.baseBoundary + '-Part_' + this._nodeId;
    }

    /**
     * Encodes a header value for use in the generated rfc2822 email.
     *
     * @param {String} key Header key
     * @param {String} value Header value
     */
    _encodeHeaderValue(key, value) {
        key = this._normalizeHeaderKey(key);

        switch (key) {
            // Structured headers
            case 'From':
            case 'Sender':
            case 'To':
            case 'Cc':
            case 'Bcc':
            case 'Reply-To':
                return this._convertAddresses(this._parseAddresses(value));

            // values enclosed in <>
            case 'Message-ID':
            case 'In-Reply-To':
            case 'Content-Id':
                value = (value || '').toString().replace(/\r?\n|\r/g, ' ');

                if (value.charAt(0) !== '<') {
                    value = '<' + value;
                }

                if (value.charAt(value.length - 1) !== '>') {
                    value = value + '>';
                }
                return value;

            // space separated list of values enclosed in <>
            case 'References':
                value = [].concat
                    .apply(
                        [],
                        [].concat(value || '').map(elm => {
                            // eslint-disable-line prefer-spread
                            elm = (elm || '')
                                .toString()
                                .replace(/\r?\n|\r/g, ' ')
                                .trim();
                            return elm.replace(/<[^>]*>/g, str => str.replace(/\s/g, '')).split(/\s+/);
                        })
                    )
                    .map(elm => {
                        if (elm.charAt(0) !== '<') {
                            elm = '<' + elm;
                        }
                        if (elm.charAt(elm.length - 1) !== '>') {
                            elm = elm + '>';
                        }
                        return elm;
                    });

                return value.join(' ').trim();

            case 'Date':
                if (Object.prototype.toString.call(value) === '[object Date]') {
                    return value.toUTCString().replace(/GMT/, '+0000');
                }

                value = (value || '').toString().replace(/\r?\n|\r/g, ' ');
                return this._encodeWords(value);

            case 'Content-Type':
            case 'Content-Disposition':
                // if it includes a filename then it is already encoded
                return (value || '').toString().replace(/\r?\n|\r/g, ' ');

            default:
                value = (value || '').toString().replace(/\r?\n|\r/g, ' ');
                // encodeWords only encodes if needed, otherwise the original string is returned
                return this._encodeWords(value);
        }
    }

    /**
     * Rebuilds address object using punycode and other adjustments
     *
     * @param {Array} addresses An array of address objects
     * @param {Array} [uniqueList] An array to be populated with addresses
     * @return {String} address string
     */
    _convertAddresses(addresses, uniqueList) {
        let values = [];

        uniqueList = uniqueList || [];

        [].concat(addresses || []).forEach(address => {
            if (address.address) {
                address.address = this._normalizeAddress(address.address);

                if (!address.name) {
                    values.push(address.address.indexOf(' ') >= 0 ? `<${address.address}>` : `${address.address}`);
                } else if (address.name) {
                    values.push(`${this._encodeAddressName(address.name)} <${address.address}>`);
                }

                if (address.address) {
                    if (!uniqueList.filter(a => a.address === address.address).length) {
                        uniqueList.push(address);
                    }
                }
            } else if (address.group) {
                let groupListAddresses = (address.group.length ? this._convertAddresses(address.group, uniqueList) : '').trim();
                values.push(`${this._encodeAddressName(address.name)}:${groupListAddresses};`);
            }
        });

        return values.join(', ');
    }

    /**
     * Normalizes an email address
     *
     * @param {Array} address An array of address objects
     * @return {String} address string
     */
    _normalizeAddress(address) {
        address = (address || '')
            .toString()
            .replace(/[\x00-\x1F<>]+/g, ' ') // remove unallowed characters
            .trim();

        let lastAt = address.lastIndexOf('@');
        if (lastAt < 0) {
            // Bare username
            return address;
        }

        let user = address.substr(0, lastAt);
        let domain = address.substr(lastAt + 1);

        // Usernames are not touched and are kept as is even if these include unicode
        // Domains are punycoded by default
        // 'jõgeva.ee' will be converted to 'xn--jgeva-dua.ee'
        // non-unicode domains are left as is

        let encodedDomain;

        try {
            encodedDomain = punycode.toASCII(domain.toLowerCase());
        } catch (err) {
            // keep as is?
        }

        if (user.indexOf(' ') >= 0) {
            if (user.charAt(0) !== '"') {
                user = '"' + user;
            }
            if (user.substr(-1) !== '"') {
                user = user + '"';
            }
        }

        return `${user}@${encodedDomain}`;
    }

    /**
     * If needed, mime encodes the name part
     *
     * @param {String} name Name part of an address
     * @returns {String} Mime word encoded string if needed
     */
    _encodeAddressName(name) {
        if (!/^[\w ']*$/.test(name)) {
            if (/^[\x20-\x7e]*$/.test(name)) {
                return '"' + name.replace(/([\\"])/g, '\\$1') + '"';
            } else {
                return mimeFuncs.encodeWord(name, this._getTextEncoding(name), 52);
            }
        }
        return name;
    }

    /**
     * If needed, mime encodes the name part
     *
     * @param {String} name Name part of an address
     * @returns {String} Mime word encoded string if needed
     */
    _encodeWords(value) {
        // set encodeAll parameter to true even though it is against the recommendation of RFC2047,
        // by default only words that include non-ascii should be converted into encoded words
        // but some clients (eg. Zimbra) do not handle it properly and remove surrounding whitespace
        return mimeFuncs.encodeWords(value, this._getTextEncoding(value), 52, true);
    }

    /**
     * Detects best mime encoding for a text value
     *
     * @param {String} value Value to check for
     * @return {String} either 'Q' or 'B'
     */
    _getTextEncoding(value) {
        value = (value || '').toString();

        let encoding = this.textEncoding;
        let latinLen;
        let nonLatinLen;

        if (!encoding) {
            // count latin alphabet symbols and 8-bit range symbols + control symbols
            // if there are more latin characters, then use quoted-printable
            // encoding, otherwise use base64
            nonLatinLen = (value.match(/[\x00-\x08\x0B\x0C\x0E-\x1F\u0080-\uFFFF]/g) || []).length; // eslint-disable-line no-control-regex
            latinLen = (value.match(/[a-z]/gi) || []).length;
            // if there are more latin symbols than binary/unicode, then prefer Q, otherwise B
            encoding = nonLatinLen < latinLen ? 'Q' : 'B';
        }
        return encoding;
    }

    /**
     * Generates a message id
     *
     * @return {String} Random Message-ID value
     */
    _generateMessageId() {
        return (
            '<' +
            [2, 2, 2, 6].reduce(
                // crux to generate UUID-like random strings
                (prev, len) => prev + '-' + crypto.randomBytes(len).toString('hex'),
                crypto.randomBytes(4).toString('hex')
            ) +
            '@' +
            // try to use the domain of the FROM address or fallback to server hostname
            (this.getEnvelope().from || this.hostname || os.hostname() || 'localhost').split('@').pop() +
            '>'
        );
    }
}

module.exports = MimeNode;


/***/ }),

/***/ 7027:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const Transform = (__nccwpck_require__(2781).Transform);

class LastNewline extends Transform {
    constructor() {
        super();
        this.lastByte = false;
    }

    _transform(chunk, encoding, done) {
        if (chunk.length) {
            this.lastByte = chunk[chunk.length - 1];
        }

        this.push(chunk);
        done();
    }

    _flush(done) {
        if (this.lastByte === 0x0a) {
            return done();
        }
        if (this.lastByte === 0x0d) {
            this.push(Buffer.from('\n'));
            return done();
        }
        this.push(Buffer.from('\r\n'));
        return done();
    }
}

module.exports = LastNewline;


/***/ }),

/***/ 4370:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const stream = __nccwpck_require__(2781);
const Transform = stream.Transform;

/**
 * Ensures that only <LF> is used for linebreaks
 *
 * @param {Object} options Stream options
 */
class LeWindows extends Transform {
    constructor(options) {
        super(options);
        // init Transform
        this.options = options || {};
    }

    /**
     * Escapes dots
     */
    _transform(chunk, encoding, done) {
        let buf;
        let lastPos = 0;

        for (let i = 0, len = chunk.length; i < len; i++) {
            if (chunk[i] === 0x0d) {
                // \n
                buf = chunk.slice(lastPos, i);
                lastPos = i + 1;
                this.push(buf);
            }
        }
        if (lastPos && lastPos < chunk.length) {
            buf = chunk.slice(lastPos);
            this.push(buf);
        } else if (!lastPos) {
            this.push(chunk);
        }
        done();
    }
}

module.exports = LeWindows;


/***/ }),

/***/ 6309:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const stream = __nccwpck_require__(2781);
const Transform = stream.Transform;

/**
 * Ensures that only <CR><LF> sequences are used for linebreaks
 *
 * @param {Object} options Stream options
 */
class LeWindows extends Transform {
    constructor(options) {
        super(options);
        // init Transform
        this.options = options || {};
        this.lastByte = false;
    }

    /**
     * Escapes dots
     */
    _transform(chunk, encoding, done) {
        let buf;
        let lastPos = 0;

        for (let i = 0, len = chunk.length; i < len; i++) {
            if (chunk[i] === 0x0a) {
                // \n
                if ((i && chunk[i - 1] !== 0x0d) || (!i && this.lastByte !== 0x0d)) {
                    if (i > lastPos) {
                        buf = chunk.slice(lastPos, i);
                        this.push(buf);
                    }
                    this.push(Buffer.from('\r\n'));
                    lastPos = i + 1;
                }
            }
        }

        if (lastPos && lastPos < chunk.length) {
            buf = chunk.slice(lastPos);
            this.push(buf);
        } else if (!lastPos) {
            this.push(chunk);
        }

        this.lastByte = chunk[chunk.length - 1];
        done();
    }
}

module.exports = LeWindows;


/***/ }),

/***/ 9841:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const Mailer = __nccwpck_require__(2972);
const shared = __nccwpck_require__(2974);
const SMTPPool = __nccwpck_require__(4163);
const SMTPTransport = __nccwpck_require__(4975);
const SendmailTransport = __nccwpck_require__(5592);
const StreamTransport = __nccwpck_require__(1878);
const JSONTransport = __nccwpck_require__(2339);
const SESTransport = __nccwpck_require__(3790);
const fetch = __nccwpck_require__(6665);
const packageData = __nccwpck_require__(4129);

const ETHEREAL_API = (process.env.ETHEREAL_API || 'https://api.nodemailer.com').replace(/\/+$/, '');
const ETHEREAL_WEB = (process.env.ETHEREAL_WEB || 'https://ethereal.email').replace(/\/+$/, '');
const ETHEREAL_CACHE = ['true', 'yes', 'y', '1'].includes((process.env.ETHEREAL_CACHE || 'yes').toString().trim().toLowerCase());

let testAccount = false;

module.exports.createTransport = function (transporter, defaults) {
    let urlConfig;
    let options;
    let mailer;

    if (
        // provided transporter is a configuration object, not transporter plugin
        (typeof transporter === 'object' && typeof transporter.send !== 'function') ||
        // provided transporter looks like a connection url
        (typeof transporter === 'string' && /^(smtps?|direct):/i.test(transporter))
    ) {
        if ((urlConfig = typeof transporter === 'string' ? transporter : transporter.url)) {
            // parse a configuration URL into configuration options
            options = shared.parseConnectionUrl(urlConfig);
        } else {
            options = transporter;
        }

        if (options.pool) {
            transporter = new SMTPPool(options);
        } else if (options.sendmail) {
            transporter = new SendmailTransport(options);
        } else if (options.streamTransport) {
            transporter = new StreamTransport(options);
        } else if (options.jsonTransport) {
            transporter = new JSONTransport(options);
        } else if (options.SES) {
            transporter = new SESTransport(options);
        } else {
            transporter = new SMTPTransport(options);
        }
    }

    mailer = new Mailer(transporter, options, defaults);

    return mailer;
};

module.exports.createTestAccount = function (apiUrl, callback) {
    let promise;

    if (!callback && typeof apiUrl === 'function') {
        callback = apiUrl;
        apiUrl = false;
    }

    if (!callback) {
        promise = new Promise((resolve, reject) => {
            callback = shared.callbackPromise(resolve, reject);
        });
    }

    if (ETHEREAL_CACHE && testAccount) {
        setImmediate(() => callback(null, testAccount));
        return promise;
    }

    apiUrl = apiUrl || ETHEREAL_API;

    let chunks = [];
    let chunklen = 0;

    let req = fetch(apiUrl + '/user', {
        contentType: 'application/json',
        method: 'POST',
        body: Buffer.from(
            JSON.stringify({
                requestor: packageData.name,
                version: packageData.version
            })
        )
    });

    req.on('readable', () => {
        let chunk;
        while ((chunk = req.read()) !== null) {
            chunks.push(chunk);
            chunklen += chunk.length;
        }
    });

    req.once('error', err => callback(err));

    req.once('end', () => {
        let res = Buffer.concat(chunks, chunklen);
        let data;
        let err;
        try {
            data = JSON.parse(res.toString());
        } catch (E) {
            err = E;
        }
        if (err) {
            return callback(err);
        }
        if (data.status !== 'success' || data.error) {
            return callback(new Error(data.error || 'Request failed'));
        }
        delete data.status;
        testAccount = data;
        callback(null, testAccount);
    });

    return promise;
};

module.exports.getTestMessageUrl = function (info) {
    if (!info || !info.response) {
        return false;
    }

    let infoProps = new Map();
    info.response.replace(/\[([^\]]+)\]$/, (m, props) => {
        props.replace(/\b([A-Z0-9]+)=([^\s]+)/g, (m, key, value) => {
            infoProps.set(key, value);
        });
    });

    if (infoProps.has('STATUS') && infoProps.has('MSGID')) {
        return (testAccount.web || ETHEREAL_WEB) + '/message/' + infoProps.get('MSGID');
    }

    return false;
};


/***/ }),

/***/ 3901:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const Transform = (__nccwpck_require__(2781).Transform);

/**
 * Encodes a Buffer into a Quoted-Printable encoded string
 *
 * @param {Buffer} buffer Buffer to convert
 * @returns {String} Quoted-Printable encoded string
 */
function encode(buffer) {
    if (typeof buffer === 'string') {
        buffer = Buffer.from(buffer, 'utf-8');
    }

    // usable characters that do not need encoding
    let ranges = [
        // https://tools.ietf.org/html/rfc2045#section-6.7
        [0x09], // <TAB>
        [0x0a], // <LF>
        [0x0d], // <CR>
        [0x20, 0x3c], // <SP>!"#$%&'()*+,-./0123456789:;
        [0x3e, 0x7e] // >?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}
    ];
    let result = '';
    let ord;

    for (let i = 0, len = buffer.length; i < len; i++) {
        ord = buffer[i];
        // if the char is in allowed range, then keep as is, unless it is a WS in the end of a line
        if (checkRanges(ord, ranges) && !((ord === 0x20 || ord === 0x09) && (i === len - 1 || buffer[i + 1] === 0x0a || buffer[i + 1] === 0x0d))) {
            result += String.fromCharCode(ord);
            continue;
        }
        result += '=' + (ord < 0x10 ? '0' : '') + ord.toString(16).toUpperCase();
    }

    return result;
}

/**
 * Adds soft line breaks to a Quoted-Printable string
 *
 * @param {String} str Quoted-Printable encoded string that might need line wrapping
 * @param {Number} [lineLength=76] Maximum allowed length for a line
 * @returns {String} Soft-wrapped Quoted-Printable encoded string
 */
function wrap(str, lineLength) {
    str = (str || '').toString();
    lineLength = lineLength || 76;

    if (str.length <= lineLength) {
        return str;
    }

    let pos = 0;
    let len = str.length;
    let match, code, line;
    let lineMargin = Math.floor(lineLength / 3);
    let result = '';

    // insert soft linebreaks where needed
    while (pos < len) {
        line = str.substr(pos, lineLength);
        if ((match = line.match(/\r\n/))) {
            line = line.substr(0, match.index + match[0].length);
            result += line;
            pos += line.length;
            continue;
        }

        if (line.substr(-1) === '\n') {
            // nothing to change here
            result += line;
            pos += line.length;
            continue;
        } else if ((match = line.substr(-lineMargin).match(/\n.*?$/))) {
            // truncate to nearest line break
            line = line.substr(0, line.length - (match[0].length - 1));
            result += line;
            pos += line.length;
            continue;
        } else if (line.length > lineLength - lineMargin && (match = line.substr(-lineMargin).match(/[ \t.,!?][^ \t.,!?]*$/))) {
            // truncate to nearest space
            line = line.substr(0, line.length - (match[0].length - 1));
        } else if (line.match(/[=][\da-f]{0,2}$/i)) {
            // push incomplete encoding sequences to the next line
            if ((match = line.match(/[=][\da-f]{0,1}$/i))) {
                line = line.substr(0, line.length - match[0].length);
            }

            // ensure that utf-8 sequences are not split
            while (line.length > 3 && line.length < len - pos && !line.match(/^(?:=[\da-f]{2}){1,4}$/i) && (match = line.match(/[=][\da-f]{2}$/gi))) {
                code = parseInt(match[0].substr(1, 2), 16);
                if (code < 128) {
                    break;
                }

                line = line.substr(0, line.length - 3);

                if (code >= 0xc0) {
                    break;
                }
            }
        }

        if (pos + line.length < len && line.substr(-1) !== '\n') {
            if (line.length === lineLength && line.match(/[=][\da-f]{2}$/i)) {
                line = line.substr(0, line.length - 3);
            } else if (line.length === lineLength) {
                line = line.substr(0, line.length - 1);
            }
            pos += line.length;
            line += '=\r\n';
        } else {
            pos += line.length;
        }

        result += line;
    }

    return result;
}

/**
 * Helper function to check if a number is inside provided ranges
 *
 * @param {Number} nr Number to check for
 * @param {Array} ranges An Array of allowed values
 * @returns {Boolean} True if the value was found inside allowed ranges, false otherwise
 */
function checkRanges(nr, ranges) {
    for (let i = ranges.length - 1; i >= 0; i--) {
        if (!ranges[i].length) {
            continue;
        }
        if (ranges[i].length === 1 && nr === ranges[i][0]) {
            return true;
        }
        if (ranges[i].length === 2 && nr >= ranges[i][0] && nr <= ranges[i][1]) {
            return true;
        }
    }
    return false;
}

/**
 * Creates a transform stream for encoding data to Quoted-Printable encoding
 *
 * @constructor
 * @param {Object} options Stream options
 * @param {Number} [options.lineLength=76] Maximum length for lines, set to false to disable wrapping
 */
class Encoder extends Transform {
    constructor(options) {
        super();

        // init Transform
        this.options = options || {};

        if (this.options.lineLength !== false) {
            this.options.lineLength = this.options.lineLength || 76;
        }

        this._curLine = '';

        this.inputBytes = 0;
        this.outputBytes = 0;
    }

    _transform(chunk, encoding, done) {
        let qp;

        if (encoding !== 'buffer') {
            chunk = Buffer.from(chunk, encoding);
        }

        if (!chunk || !chunk.length) {
            return done();
        }

        this.inputBytes += chunk.length;

        if (this.options.lineLength) {
            qp = this._curLine + encode(chunk);
            qp = wrap(qp, this.options.lineLength);
            qp = qp.replace(/(^|\n)([^\n]*)$/, (match, lineBreak, lastLine) => {
                this._curLine = lastLine;
                return lineBreak;
            });

            if (qp) {
                this.outputBytes += qp.length;
                this.push(qp);
            }
        } else {
            qp = encode(chunk);
            this.outputBytes += qp.length;
            this.push(qp, 'ascii');
        }

        done();
    }

    _flush(done) {
        if (this._curLine) {
            this.outputBytes += this._curLine.length;
            this.push(this._curLine, 'ascii');
        }
        done();
    }
}

// expose to the world
module.exports = {
    encode,
    wrap,
    Encoder
};


/***/ }),

/***/ 5592:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const spawn = (__nccwpck_require__(2081).spawn);
const packageData = __nccwpck_require__(4129);
const shared = __nccwpck_require__(2974);

/**
 * Generates a Transport object for Sendmail
 *
 * Possible options can be the following:
 *
 *  * **path** optional path to sendmail binary
 *  * **newline** either 'windows' or 'unix'
 *  * **args** an array of arguments for the sendmail binary
 *
 * @constructor
 * @param {Object} optional config parameter for Sendmail
 */
class SendmailTransport {
    constructor(options) {
        options = options || {};

        // use a reference to spawn for mocking purposes
        this._spawn = spawn;

        this.options = options || {};

        this.name = 'Sendmail';
        this.version = packageData.version;

        this.path = 'sendmail';
        this.args = false;
        this.winbreak = false;

        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'sendmail'
        });

        if (options) {
            if (typeof options === 'string') {
                this.path = options;
            } else if (typeof options === 'object') {
                if (options.path) {
                    this.path = options.path;
                }
                if (Array.isArray(options.args)) {
                    this.args = options.args;
                }
                this.winbreak = ['win', 'windows', 'dos', '\r\n'].includes((options.newline || '').toString().toLowerCase());
            }
        }
    }

    /**
     * <p>Compiles a mailcomposer message and forwards it to handler that sends it.</p>
     *
     * @param {Object} emailMessage MailComposer object
     * @param {Function} callback Callback function to run when the sending is completed
     */
    send(mail, done) {
        // Sendmail strips this header line by itself
        mail.message.keepBcc = true;

        let envelope = mail.data.envelope || mail.message.getEnvelope();
        let messageId = mail.message.messageId();
        let args;
        let sendmail;
        let returned;

        const hasInvalidAddresses = []
            .concat(envelope.from || [])
            .concat(envelope.to || [])
            .some(addr => /^-/.test(addr));
        if (hasInvalidAddresses) {
            return done(new Error('Can not send mail. Invalid envelope addresses.'));
        }

        if (this.args) {
            // force -i to keep single dots
            args = ['-i'].concat(this.args).concat(envelope.to);
        } else {
            args = ['-i'].concat(envelope.from ? ['-f', envelope.from] : []).concat(envelope.to);
        }

        let callback = err => {
            if (returned) {
                // ignore any additional responses, already done
                return;
            }
            returned = true;
            if (typeof done === 'function') {
                if (err) {
                    return done(err);
                } else {
                    return done(null, {
                        envelope: mail.data.envelope || mail.message.getEnvelope(),
                        messageId,
                        response: 'Messages queued for delivery'
                    });
                }
            }
        };

        try {
            sendmail = this._spawn(this.path, args);
        } catch (E) {
            this.logger.error(
                {
                    err: E,
                    tnx: 'spawn',
                    messageId
                },
                'Error occurred while spawning sendmail. %s',
                E.message
            );
            return callback(E);
        }

        if (sendmail) {
            sendmail.on('error', err => {
                this.logger.error(
                    {
                        err,
                        tnx: 'spawn',
                        messageId
                    },
                    'Error occurred when sending message %s. %s',
                    messageId,
                    err.message
                );
                callback(err);
            });

            sendmail.once('exit', code => {
                if (!code) {
                    return callback();
                }
                let err;
                if (code === 127) {
                    err = new Error('Sendmail command not found, process exited with code ' + code);
                } else {
                    err = new Error('Sendmail exited with code ' + code);
                }

                this.logger.error(
                    {
                        err,
                        tnx: 'stdin',
                        messageId
                    },
                    'Error sending message %s to sendmail. %s',
                    messageId,
                    err.message
                );
                callback(err);
            });
            sendmail.once('close', callback);

            sendmail.stdin.on('error', err => {
                this.logger.error(
                    {
                        err,
                        tnx: 'stdin',
                        messageId
                    },
                    'Error occurred when piping message %s to sendmail. %s',
                    messageId,
                    err.message
                );
                callback(err);
            });

            let recipients = [].concat(envelope.to || []);
            if (recipients.length > 3) {
                recipients.push('...and ' + recipients.splice(2).length + ' more');
            }
            this.logger.info(
                {
                    tnx: 'send',
                    messageId
                },
                'Sending message %s to <%s>',
                messageId,
                recipients.join(', ')
            );

            let sourceStream = mail.message.createReadStream();
            sourceStream.once('error', err => {
                this.logger.error(
                    {
                        err,
                        tnx: 'stdin',
                        messageId
                    },
                    'Error occurred when generating message %s. %s',
                    messageId,
                    err.message
                );
                sendmail.kill('SIGINT'); // do not deliver the message
                callback(err);
            });

            sourceStream.pipe(sendmail.stdin);
        } else {
            return callback(new Error('sendmail was not found'));
        }
    }
}

module.exports = SendmailTransport;


/***/ }),

/***/ 3790:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const EventEmitter = __nccwpck_require__(2361);
const packageData = __nccwpck_require__(4129);
const shared = __nccwpck_require__(2974);
const LeWindows = __nccwpck_require__(6309);

/**
 * Generates a Transport object for AWS SES
 *
 * Possible options can be the following:
 *
 *  * **sendingRate** optional Number specifying how many messages per second should be delivered to SES
 *  * **maxConnections** optional Number specifying max number of parallel connections to SES
 *
 * @constructor
 * @param {Object} optional config parameter
 */
class SESTransport extends EventEmitter {
    constructor(options) {
        super();
        options = options || {};

        this.options = options || {};
        this.ses = this.options.SES;

        this.name = 'SESTransport';
        this.version = packageData.version;

        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'ses-transport'
        });

        // parallel sending connections
        this.maxConnections = Number(this.options.maxConnections) || Infinity;
        this.connections = 0;

        // max messages per second
        this.sendingRate = Number(this.options.sendingRate) || Infinity;
        this.sendingRateTTL = null;
        this.rateInterval = 1000; // milliseconds
        this.rateMessages = [];

        this.pending = [];

        this.idling = true;

        setImmediate(() => {
            if (this.idling) {
                this.emit('idle');
            }
        });
    }

    /**
     * Schedules a sending of a message
     *
     * @param {Object} emailMessage MailComposer object
     * @param {Function} callback Callback function to run when the sending is completed
     */
    send(mail, callback) {
        if (this.connections >= this.maxConnections) {
            this.idling = false;
            return this.pending.push({
                mail,
                callback
            });
        }

        if (!this._checkSendingRate()) {
            this.idling = false;
            return this.pending.push({
                mail,
                callback
            });
        }

        this._send(mail, (...args) => {
            setImmediate(() => callback(...args));
            this._sent();
        });
    }

    _checkRatedQueue() {
        if (this.connections >= this.maxConnections || !this._checkSendingRate()) {
            return;
        }

        if (!this.pending.length) {
            if (!this.idling) {
                this.idling = true;
                this.emit('idle');
            }
            return;
        }

        let next = this.pending.shift();
        this._send(next.mail, (...args) => {
            setImmediate(() => next.callback(...args));
            this._sent();
        });
    }

    _checkSendingRate() {
        clearTimeout(this.sendingRateTTL);

        let now = Date.now();
        let oldest = false;
        // delete older messages
        for (let i = this.rateMessages.length - 1; i >= 0; i--) {
            if (this.rateMessages[i].ts >= now - this.rateInterval && (!oldest || this.rateMessages[i].ts < oldest)) {
                oldest = this.rateMessages[i].ts;
            }

            if (this.rateMessages[i].ts < now - this.rateInterval && !this.rateMessages[i].pending) {
                this.rateMessages.splice(i, 1);
            }
        }

        if (this.rateMessages.length < this.sendingRate) {
            return true;
        }

        let delay = Math.max(oldest + 1001, now + 20);
        this.sendingRateTTL = setTimeout(() => this._checkRatedQueue(), now - delay);

        try {
            this.sendingRateTTL.unref();
        } catch (E) {
            // Ignore. Happens on envs with non-node timer implementation
        }

        return false;
    }

    _sent() {
        this.connections--;
        this._checkRatedQueue();
    }

    /**
     * Returns true if there are free slots in the queue
     */
    isIdle() {
        return this.idling;
    }

    /**
     * Compiles a mailcomposer message and forwards it to SES
     *
     * @param {Object} emailMessage MailComposer object
     * @param {Function} callback Callback function to run when the sending is completed
     */
    _send(mail, callback) {
        let statObject = {
            ts: Date.now(),
            pending: true
        };
        this.connections++;
        this.rateMessages.push(statObject);

        let envelope = mail.data.envelope || mail.message.getEnvelope();
        let messageId = mail.message.messageId();

        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
            recipients.push('...and ' + recipients.splice(2).length + ' more');
        }
        this.logger.info(
            {
                tnx: 'send',
                messageId
            },
            'Sending message %s to <%s>',
            messageId,
            recipients.join(', ')
        );

        let getRawMessage = next => {
            // do not use Message-ID and Date in DKIM signature
            if (!mail.data._dkim) {
                mail.data._dkim = {};
            }
            if (mail.data._dkim.skipFields && typeof mail.data._dkim.skipFields === 'string') {
                mail.data._dkim.skipFields += ':date:message-id';
            } else {
                mail.data._dkim.skipFields = 'date:message-id';
            }

            let sourceStream = mail.message.createReadStream();
            let stream = sourceStream.pipe(new LeWindows());
            let chunks = [];
            let chunklen = 0;

            stream.on('readable', () => {
                let chunk;
                while ((chunk = stream.read()) !== null) {
                    chunks.push(chunk);
                    chunklen += chunk.length;
                }
            });

            sourceStream.once('error', err => stream.emit('error', err));

            stream.once('error', err => {
                next(err);
            });

            stream.once('end', () => next(null, Buffer.concat(chunks, chunklen)));
        };

        setImmediate(() =>
            getRawMessage((err, raw) => {
                if (err) {
                    this.logger.error(
                        {
                            err,
                            tnx: 'send',
                            messageId
                        },
                        'Failed creating message for %s. %s',
                        messageId,
                        err.message
                    );
                    statObject.pending = false;
                    return callback(err);
                }

                let sesMessage = {
                    RawMessage: {
                        // required
                        Data: raw // required
                    },
                    Source: envelope.from,
                    Destinations: envelope.to
                };

                Object.keys(mail.data.ses || {}).forEach(key => {
                    sesMessage[key] = mail.data.ses[key];
                });

                let ses = (this.ses.aws ? this.ses.ses : this.ses) || {};
                let aws = this.ses.aws || {};

                let getRegion = cb => {
                    if (ses.config && typeof ses.config.region === 'function') {
                        // promise
                        return ses.config
                            .region()
                            .then(region => cb(null, region))
                            .catch(err => cb(err));
                    }
                    return cb(null, (ses.config && ses.config.region) || 'us-east-1');
                };

                getRegion((err, region) => {
                    if (err || !region) {
                        region = 'us-east-1';
                    }

                    let sendPromise;
                    if (typeof ses.send === 'function' && aws.SendRawEmailCommand) {
                        // v3 API
                        sendPromise = ses.send(new aws.SendRawEmailCommand(sesMessage));
                    } else {
                        // v2 API
                        sendPromise = ses.sendRawEmail(sesMessage).promise();
                    }

                    sendPromise
                        .then(data => {
                            if (region === 'us-east-1') {
                                region = 'email';
                            }

                            statObject.pending = false;
                            callback(null, {
                                envelope: {
                                    from: envelope.from,
                                    to: envelope.to
                                },
                                messageId: '<' + data.MessageId + (!/@/.test(data.MessageId) ? '@' + region + '.amazonses.com' : '') + '>',
                                response: data.MessageId,
                                raw
                            });
                        })
                        .catch(err => {
                            this.logger.error(
                                {
                                    err,
                                    tnx: 'send'
                                },
                                'Send error for %s: %s',
                                messageId,
                                err.message
                            );
                            statObject.pending = false;
                            callback(err);
                        });
                });
            })
        );
    }

    /**
     * Verifies SES configuration
     *
     * @param {Function} callback Callback function
     */
    verify(callback) {
        let promise;
        let ses = (this.ses.aws ? this.ses.ses : this.ses) || {};
        let aws = this.ses.aws || {};

        const sesMessage = {
            RawMessage: {
                // required
                Data: 'From: invalid@invalid\r\nTo: invalid@invalid\r\n Subject: Invalid\r\n\r\nInvalid'
            },
            Source: 'invalid@invalid',
            Destinations: ['invalid@invalid']
        };

        if (!callback) {
            promise = new Promise((resolve, reject) => {
                callback = shared.callbackPromise(resolve, reject);
            });
        }
        const cb = err => {
            if (err && (err.code || err.Code) !== 'InvalidParameterValue') {
                return callback(err);
            }
            return callback(null, true);
        };

        if (typeof ses.send === 'function' && aws.SendRawEmailCommand) {
            // v3 API
            sesMessage.RawMessage.Data = Buffer.from(sesMessage.RawMessage.Data);
            ses.send(new aws.SendRawEmailCommand(sesMessage), cb);
        } else {
            // v2 API
            ses.sendRawEmail(sesMessage, cb);
        }

        return promise;
    }
}

module.exports = SESTransport;


/***/ }),

/***/ 2974:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/* eslint no-console: 0 */



const urllib = __nccwpck_require__(7310);
const util = __nccwpck_require__(3837);
const fs = __nccwpck_require__(7147);
const fetch = __nccwpck_require__(6665);
const dns = __nccwpck_require__(9523);
const net = __nccwpck_require__(1808);
const os = __nccwpck_require__(2037);

const DNS_TTL = 5 * 60 * 1000;

const networkInterfaces = (module.exports.networkInterfaces = os.networkInterfaces());

const resolver = (family, hostname, callback) => {
    const familySupported =
        // crux that replaces Object.values(networkInterfaces) as Object.values is not supported in nodejs v6
        Object.keys(networkInterfaces)
            .map(key => networkInterfaces[key])
            // crux that replaces .flat() as it is not supported in older Node versions (v10 and older)
            .reduce((acc, val) => acc.concat(val), [])
            .filter(i => !i.internal)
            .filter(i => i.family === 'IPv' + family).length > 0;

    if (!familySupported) {
        return callback(null, []);
    }

    dns['resolve' + family](hostname, (err, addresses) => {
        if (err) {
            switch (err.code) {
                case dns.NODATA:
                case dns.NOTFOUND:
                case dns.NOTIMP:
                case dns.SERVFAIL:
                case dns.CONNREFUSED:
                case 'EAI_AGAIN':
                    return callback(null, []);
            }
            return callback(err);
        }
        return callback(null, Array.isArray(addresses) ? addresses : [].concat(addresses || []));
    });
};

const dnsCache = (module.exports.dnsCache = new Map());

const formatDNSValue = (value, extra) => {
    if (!value) {
        return Object.assign({}, extra || {});
    }

    return Object.assign(
        {
            servername: value.servername,
            host:
                !value.addresses || !value.addresses.length
                    ? null
                    : value.addresses.length === 1
                    ? value.addresses[0]
                    : value.addresses[Math.floor(Math.random() * value.addresses.length)]
        },
        extra || {}
    );
};

module.exports.resolveHostname = (options, callback) => {
    options = options || {};

    if (!options.host && options.servername) {
        options.host = options.servername;
    }

    if (!options.host || net.isIP(options.host)) {
        // nothing to do here
        let value = {
            addresses: [options.host],
            servername: options.servername || false
        };
        return callback(
            null,
            formatDNSValue(value, {
                cached: false
            })
        );
    }

    let cached;

    if (dnsCache.has(options.host)) {
        cached = dnsCache.get(options.host);
        if (!cached.expires || cached.expires >= Date.now()) {
            return callback(
                null,
                formatDNSValue(cached.value, {
                    cached: true
                })
            );
        }
    }

    resolver(4, options.host, (err, addresses) => {
        if (err) {
            if (cached) {
                // ignore error, use expired value
                return callback(
                    null,
                    formatDNSValue(cached.value, {
                        cached: true,
                        error: err
                    })
                );
            }
            return callback(err);
        }

        if (addresses && addresses.length) {
            let value = {
                addresses,
                servername: options.servername || options.host
            };

            dnsCache.set(options.host, {
                value,
                expires: Date.now() + DNS_TTL
            });

            return callback(
                null,
                formatDNSValue(value, {
                    cached: false
                })
            );
        }

        resolver(6, options.host, (err, addresses) => {
            if (err) {
                if (cached) {
                    // ignore error, use expired value
                    return callback(
                        null,
                        formatDNSValue(cached.value, {
                            cached: true,
                            error: err
                        })
                    );
                }
                return callback(err);
            }

            if (addresses && addresses.length) {
                let value = {
                    addresses,
                    servername: options.servername || options.host
                };

                dnsCache.set(options.host, {
                    value,
                    expires: Date.now() + DNS_TTL
                });

                return callback(
                    null,
                    formatDNSValue(value, {
                        cached: false
                    })
                );
            }

            try {
                dns.lookup(options.host, {}, (err, address) => {
                    if (err) {
                        if (cached) {
                            // ignore error, use expired value
                            return callback(
                                null,
                                formatDNSValue(cached.value, {
                                    cached: true,
                                    error: err
                                })
                            );
                        }
                        return callback(err);
                    }

                    if (!address && cached) {
                        // nothing was found, fallback to cached value
                        return callback(
                            null,
                            formatDNSValue(cached.value, {
                                cached: true
                            })
                        );
                    }

                    let value = {
                        addresses: address ? [address] : [options.host],
                        servername: options.servername || options.host
                    };

                    dnsCache.set(options.host, {
                        value,
                        expires: Date.now() + DNS_TTL
                    });

                    return callback(
                        null,
                        formatDNSValue(value, {
                            cached: false
                        })
                    );
                });
            } catch (err) {
                if (cached) {
                    // ignore error, use expired value
                    return callback(
                        null,
                        formatDNSValue(cached.value, {
                            cached: true,
                            error: err
                        })
                    );
                }
                return callback(err);
            }
        });
    });
};
/**
 * Parses connection url to a structured configuration object
 *
 * @param {String} str Connection url
 * @return {Object} Configuration object
 */
module.exports.parseConnectionUrl = str => {
    str = str || '';
    let options = {};

    [urllib.parse(str, true)].forEach(url => {
        let auth;

        switch (url.protocol) {
            case 'smtp:':
                options.secure = false;
                break;
            case 'smtps:':
                options.secure = true;
                break;
            case 'direct:':
                options.direct = true;
                break;
        }

        if (!isNaN(url.port) && Number(url.port)) {
            options.port = Number(url.port);
        }

        if (url.hostname) {
            options.host = url.hostname;
        }

        if (url.auth) {
            auth = url.auth.split(':');

            if (!options.auth) {
                options.auth = {};
            }

            options.auth.user = auth.shift();
            options.auth.pass = auth.join(':');
        }

        Object.keys(url.query || {}).forEach(key => {
            let obj = options;
            let lKey = key;
            let value = url.query[key];

            if (!isNaN(value)) {
                value = Number(value);
            }

            switch (value) {
                case 'true':
                    value = true;
                    break;
                case 'false':
                    value = false;
                    break;
            }

            // tls is nested object
            if (key.indexOf('tls.') === 0) {
                lKey = key.substr(4);
                if (!options.tls) {
                    options.tls = {};
                }
                obj = options.tls;
            } else if (key.indexOf('.') >= 0) {
                // ignore nested properties besides tls
                return;
            }

            if (!(lKey in obj)) {
                obj[lKey] = value;
            }
        });
    });

    return options;
};

module.exports._logFunc = (logger, level, defaults, data, message, ...args) => {
    let entry = {};

    Object.keys(defaults || {}).forEach(key => {
        if (key !== 'level') {
            entry[key] = defaults[key];
        }
    });

    Object.keys(data || {}).forEach(key => {
        if (key !== 'level') {
            entry[key] = data[key];
        }
    });

    logger[level](entry, message, ...args);
};

/**
 * Returns a bunyan-compatible logger interface. Uses either provided logger or
 * creates a default console logger
 *
 * @param {Object} [options] Options object that might include 'logger' value
 * @return {Object} bunyan compatible logger
 */
module.exports.getLogger = (options, defaults) => {
    options = options || {};

    let response = {};
    let levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];

    if (!options.logger) {
        // use vanity logger
        levels.forEach(level => {
            response[level] = () => false;
        });
        return response;
    }

    let logger = options.logger;

    if (options.logger === true) {
        // create console logger
        logger = createDefaultLogger(levels);
    }

    levels.forEach(level => {
        response[level] = (data, message, ...args) => {
            module.exports._logFunc(logger, level, defaults, data, message, ...args);
        };
    });

    return response;
};

/**
 * Wrapper for creating a callback that either resolves or rejects a promise
 * based on input
 *
 * @param {Function} resolve Function to run if callback is called
 * @param {Function} reject Function to run if callback ends with an error
 */
module.exports.callbackPromise = (resolve, reject) =>
    function () {
        let args = Array.from(arguments);
        let err = args.shift();
        if (err) {
            reject(err);
        } else {
            resolve(...args);
        }
    };

/**
 * Resolves a String or a Buffer value for content value. Useful if the value
 * is a Stream or a file or an URL. If the value is a Stream, overwrites
 * the stream object with the resolved value (you can't stream a value twice).
 *
 * This is useful when you want to create a plugin that needs a content value,
 * for example the `html` or `text` value as a String or a Buffer but not as
 * a file path or an URL.
 *
 * @param {Object} data An object or an Array you want to resolve an element for
 * @param {String|Number} key Property name or an Array index
 * @param {Function} callback Callback function with (err, value)
 */
module.exports.resolveContent = (data, key, callback) => {
    let promise;

    if (!callback) {
        promise = new Promise((resolve, reject) => {
            callback = module.exports.callbackPromise(resolve, reject);
        });
    }

    let content = (data && data[key] && data[key].content) || data[key];
    let contentStream;
    let encoding = ((typeof data[key] === 'object' && data[key].encoding) || 'utf8')
        .toString()
        .toLowerCase()
        .replace(/[-_\s]/g, '');

    if (!content) {
        return callback(null, content);
    }

    if (typeof content === 'object') {
        if (typeof content.pipe === 'function') {
            return resolveStream(content, (err, value) => {
                if (err) {
                    return callback(err);
                }
                // we can't stream twice the same content, so we need
                // to replace the stream object with the streaming result
                if (data[key].content) {
                    data[key].content = value;
                } else {
                    data[key] = value;
                }
                callback(null, value);
            });
        } else if (/^https?:\/\//i.test(content.path || content.href)) {
            contentStream = fetch(content.path || content.href);
            return resolveStream(contentStream, callback);
        } else if (/^data:/i.test(content.path || content.href)) {
            let parts = (content.path || content.href).match(/^data:((?:[^;]*;)*(?:[^,]*)),(.*)$/i);
            if (!parts) {
                return callback(null, Buffer.from(0));
            }
            return callback(null, /\bbase64$/i.test(parts[1]) ? Buffer.from(parts[2], 'base64') : Buffer.from(decodeURIComponent(parts[2])));
        } else if (content.path) {
            return resolveStream(fs.createReadStream(content.path), callback);
        }
    }

    if (typeof data[key].content === 'string' && !['utf8', 'usascii', 'ascii'].includes(encoding)) {
        content = Buffer.from(data[key].content, encoding);
    }

    // default action, return as is
    setImmediate(() => callback(null, content));

    return promise;
};

/**
 * Copies properties from source objects to target objects
 */
module.exports.assign = function (/* target, ... sources */) {
    let args = Array.from(arguments);
    let target = args.shift() || {};

    args.forEach(source => {
        Object.keys(source || {}).forEach(key => {
            if (['tls', 'auth'].includes(key) && source[key] && typeof source[key] === 'object') {
                // tls and auth are special keys that need to be enumerated separately
                // other objects are passed as is
                if (!target[key]) {
                    // ensure that target has this key
                    target[key] = {};
                }
                Object.keys(source[key]).forEach(subKey => {
                    target[key][subKey] = source[key][subKey];
                });
            } else {
                target[key] = source[key];
            }
        });
    });
    return target;
};

module.exports.encodeXText = str => {
    // ! 0x21
    // + 0x2B
    // = 0x3D
    // ~ 0x7E
    if (!/[^\x21-\x2A\x2C-\x3C\x3E-\x7E]/.test(str)) {
        return str;
    }
    let buf = Buffer.from(str);
    let result = '';
    for (let i = 0, len = buf.length; i < len; i++) {
        let c = buf[i];
        if (c < 0x21 || c > 0x7e || c === 0x2b || c === 0x3d) {
            result += '+' + (c < 0x10 ? '0' : '') + c.toString(16).toUpperCase();
        } else {
            result += String.fromCharCode(c);
        }
    }
    return result;
};

/**
 * Streams a stream value into a Buffer
 *
 * @param {Object} stream Readable stream
 * @param {Function} callback Callback function with (err, value)
 */
function resolveStream(stream, callback) {
    let responded = false;
    let chunks = [];
    let chunklen = 0;

    stream.on('error', err => {
        if (responded) {
            return;
        }

        responded = true;
        callback(err);
    });

    stream.on('readable', () => {
        let chunk;
        while ((chunk = stream.read()) !== null) {
            chunks.push(chunk);
            chunklen += chunk.length;
        }
    });

    stream.on('end', () => {
        if (responded) {
            return;
        }
        responded = true;

        let value;

        try {
            value = Buffer.concat(chunks, chunklen);
        } catch (E) {
            return callback(E);
        }
        callback(null, value);
    });
}

/**
 * Generates a bunyan-like logger that prints to console
 *
 * @returns {Object} Bunyan logger instance
 */
function createDefaultLogger(levels) {
    let levelMaxLen = 0;
    let levelNames = new Map();
    levels.forEach(level => {
        if (level.length > levelMaxLen) {
            levelMaxLen = level.length;
        }
    });

    levels.forEach(level => {
        let levelName = level.toUpperCase();
        if (levelName.length < levelMaxLen) {
            levelName += ' '.repeat(levelMaxLen - levelName.length);
        }
        levelNames.set(level, levelName);
    });

    let print = (level, entry, message, ...args) => {
        let prefix = '';
        if (entry) {
            if (entry.tnx === 'server') {
                prefix = 'S: ';
            } else if (entry.tnx === 'client') {
                prefix = 'C: ';
            }

            if (entry.sid) {
                prefix = '[' + entry.sid + '] ' + prefix;
            }

            if (entry.cid) {
                prefix = '[#' + entry.cid + '] ' + prefix;
            }
        }

        message = util.format(message, ...args);
        message.split(/\r?\n/).forEach(line => {
            console.log('[%s] %s %s', new Date().toISOString().substr(0, 19).replace(/T/, ' '), levelNames.get(level), prefix + line);
        });
    };

    let logger = {};
    levels.forEach(level => {
        logger[level] = print.bind(null, level);
    });

    return logger;
}


/***/ }),

/***/ 2786:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const stream = __nccwpck_require__(2781);
const Transform = stream.Transform;

/**
 * Escapes dots in the beginning of lines. Ends the stream with <CR><LF>.<CR><LF>
 * Also makes sure that only <CR><LF> sequences are used for linebreaks
 *
 * @param {Object} options Stream options
 */
class DataStream extends Transform {
    constructor(options) {
        super(options);
        // init Transform
        this.options = options || {};
        this._curLine = '';

        this.inByteCount = 0;
        this.outByteCount = 0;
        this.lastByte = false;
    }

    /**
     * Escapes dots
     */
    _transform(chunk, encoding, done) {
        let chunks = [];
        let chunklen = 0;
        let i,
            len,
            lastPos = 0;
        let buf;

        if (!chunk || !chunk.length) {
            return done();
        }

        if (typeof chunk === 'string') {
            chunk = Buffer.from(chunk);
        }

        this.inByteCount += chunk.length;

        for (i = 0, len = chunk.length; i < len; i++) {
            if (chunk[i] === 0x2e) {
                // .
                if ((i && chunk[i - 1] === 0x0a) || (!i && (!this.lastByte || this.lastByte === 0x0a))) {
                    buf = chunk.slice(lastPos, i + 1);
                    chunks.push(buf);
                    chunks.push(Buffer.from('.'));
                    chunklen += buf.length + 1;
                    lastPos = i + 1;
                }
            } else if (chunk[i] === 0x0a) {
                // .
                if ((i && chunk[i - 1] !== 0x0d) || (!i && this.lastByte !== 0x0d)) {
                    if (i > lastPos) {
                        buf = chunk.slice(lastPos, i);
                        chunks.push(buf);
                        chunklen += buf.length + 2;
                    } else {
                        chunklen += 2;
                    }
                    chunks.push(Buffer.from('\r\n'));
                    lastPos = i + 1;
                }
            }
        }

        if (chunklen) {
            // add last piece
            if (lastPos < chunk.length) {
                buf = chunk.slice(lastPos);
                chunks.push(buf);
                chunklen += buf.length;
            }

            this.outByteCount += chunklen;
            this.push(Buffer.concat(chunks, chunklen));
        } else {
            this.outByteCount += chunk.length;
            this.push(chunk);
        }

        this.lastByte = chunk[chunk.length - 1];
        done();
    }

    /**
     * Finalizes the stream with a dot on a single line
     */
    _flush(done) {
        let buf;
        if (this.lastByte === 0x0a) {
            buf = Buffer.from('.\r\n');
        } else if (this.lastByte === 0x0d) {
            buf = Buffer.from('\n.\r\n');
        } else {
            buf = Buffer.from('\r\n.\r\n');
        }
        this.outByteCount += buf.length;
        this.push(buf);
        done();
    }
}

module.exports = DataStream;


/***/ }),

/***/ 555:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


/**
 * Minimal HTTP/S proxy client
 */

const net = __nccwpck_require__(1808);
const tls = __nccwpck_require__(4404);
const urllib = __nccwpck_require__(7310);

/**
 * Establishes proxied connection to destinationPort
 *
 * httpProxyClient("http://localhost:3128/", 80, "google.com", function(err, socket){
 *     socket.write("GET / HTTP/1.0\r\n\r\n");
 * });
 *
 * @param {String} proxyUrl proxy configuration, etg "http://proxy.host:3128/"
 * @param {Number} destinationPort Port to open in destination host
 * @param {String} destinationHost Destination hostname
 * @param {Function} callback Callback to run with the rocket object once connection is established
 */
function httpProxyClient(proxyUrl, destinationPort, destinationHost, callback) {
    let proxy = urllib.parse(proxyUrl);

    // create a socket connection to the proxy server
    let options;
    let connect;
    let socket;

    options = {
        host: proxy.hostname,
        port: Number(proxy.port) ? Number(proxy.port) : proxy.protocol === 'https:' ? 443 : 80
    };

    if (proxy.protocol === 'https:') {
        // we can use untrusted proxies as long as we verify actual SMTP certificates
        options.rejectUnauthorized = false;
        connect = tls.connect.bind(tls);
    } else {
        connect = net.connect.bind(net);
    }

    // Error harness for initial connection. Once connection is established, the responsibility
    // to handle errors is passed to whoever uses this socket
    let finished = false;
    let tempSocketErr = function (err) {
        if (finished) {
            return;
        }
        finished = true;
        try {
            socket.destroy();
        } catch (E) {
            // ignore
        }
        callback(err);
    };

    socket = connect(options, () => {
        if (finished) {
            return;
        }

        let reqHeaders = {
            Host: destinationHost + ':' + destinationPort,
            Connection: 'close'
        };
        if (proxy.auth) {
            reqHeaders['Proxy-Authorization'] = 'Basic ' + Buffer.from(proxy.auth).toString('base64');
        }

        socket.write(
            // HTTP method
            'CONNECT ' +
                destinationHost +
                ':' +
                destinationPort +
                ' HTTP/1.1\r\n' +
                // HTTP request headers
                Object.keys(reqHeaders)
                    .map(key => key + ': ' + reqHeaders[key])
                    .join('\r\n') +
                // End request
                '\r\n\r\n'
        );

        let headers = '';
        let onSocketData = chunk => {
            let match;
            let remainder;

            if (finished) {
                return;
            }

            headers += chunk.toString('binary');
            if ((match = headers.match(/\r\n\r\n/))) {
                socket.removeListener('data', onSocketData);

                remainder = headers.substr(match.index + match[0].length);
                headers = headers.substr(0, match.index);
                if (remainder) {
                    socket.unshift(Buffer.from(remainder, 'binary'));
                }

                // proxy connection is now established
                finished = true;

                // check response code
                match = headers.match(/^HTTP\/\d+\.\d+ (\d+)/i);
                if (!match || (match[1] || '').charAt(0) !== '2') {
                    try {
                        socket.destroy();
                    } catch (E) {
                        // ignore
                    }
                    return callback(new Error('Invalid response from proxy' + ((match && ': ' + match[1]) || '')));
                }

                socket.removeListener('error', tempSocketErr);
                return callback(null, socket);
            }
        };
        socket.on('data', onSocketData);
    });

    socket.once('error', tempSocketErr);
}

module.exports = httpProxyClient;


/***/ }),

/***/ 4615:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const packageInfo = __nccwpck_require__(4129);
const EventEmitter = (__nccwpck_require__(2361).EventEmitter);
const net = __nccwpck_require__(1808);
const tls = __nccwpck_require__(4404);
const os = __nccwpck_require__(2037);
const crypto = __nccwpck_require__(6113);
const DataStream = __nccwpck_require__(2786);
const PassThrough = (__nccwpck_require__(2781).PassThrough);
const shared = __nccwpck_require__(2974);

// default timeout values in ms
const CONNECTION_TIMEOUT = 2 * 60 * 1000; // how much to wait for the connection to be established
const SOCKET_TIMEOUT = 10 * 60 * 1000; // how much to wait for socket inactivity before disconnecting the client
const GREETING_TIMEOUT = 30 * 1000; // how much to wait after connection is established but SMTP greeting is not receieved

/**
 * Generates a SMTP connection object
 *
 * Optional options object takes the following possible properties:
 *
 *  * **port** - is the port to connect to (defaults to 587 or 465)
 *  * **host** - is the hostname or IP address to connect to (defaults to 'localhost')
 *  * **secure** - use SSL
 *  * **ignoreTLS** - ignore server support for STARTTLS
 *  * **requireTLS** - forces the client to use STARTTLS
 *  * **name** - the name of the client server
 *  * **localAddress** - outbound address to bind to (see: http://nodejs.org/api/net.html#net_net_connect_options_connectionlistener)
 *  * **greetingTimeout** - Time to wait in ms until greeting message is received from the server (defaults to 10000)
 *  * **connectionTimeout** - how many milliseconds to wait for the connection to establish
 *  * **socketTimeout** - Time of inactivity until the connection is closed (defaults to 1 hour)
 *  * **lmtp** - if true, uses LMTP instead of SMTP protocol
 *  * **logger** - bunyan compatible logger interface
 *  * **debug** - if true pass SMTP traffic to the logger
 *  * **tls** - options for createCredentials
 *  * **socket** - existing socket to use instead of creating a new one (see: http://nodejs.org/api/net.html#net_class_net_socket)
 *  * **secured** - boolean indicates that the provided socket has already been upgraded to tls
 *
 * @constructor
 * @namespace SMTP Client module
 * @param {Object} [options] Option properties
 */
class SMTPConnection extends EventEmitter {
    constructor(options) {
        super(options);

        this.id = crypto.randomBytes(8).toString('base64').replace(/\W/g, '');
        this.stage = 'init';

        this.options = options || {};

        this.secureConnection = !!this.options.secure;
        this.alreadySecured = !!this.options.secured;

        this.port = Number(this.options.port) || (this.secureConnection ? 465 : 587);
        this.host = this.options.host || 'localhost';

        if (typeof this.options.secure === 'undefined' && this.port === 465) {
            // if secure option is not set but port is 465, then default to secure
            this.secureConnection = true;
        }

        this.name = this.options.name || this._getHostname();

        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'smtp-connection',
            sid: this.id
        });

        this.customAuth = new Map();
        Object.keys(this.options.customAuth || {}).forEach(key => {
            let mapKey = (key || '').toString().trim().toUpperCase();
            if (!mapKey) {
                return;
            }
            this.customAuth.set(mapKey, this.options.customAuth[key]);
        });

        /**
         * Expose version nr, just for the reference
         * @type {String}
         */
        this.version = packageInfo.version;

        /**
         * If true, then the user is authenticated
         * @type {Boolean}
         */
        this.authenticated = false;

        /**
         * If set to true, this instance is no longer active
         * @private
         */
        this.destroyed = false;

        /**
         * Defines if the current connection is secure or not. If not,
         * STARTTLS can be used if available
         * @private
         */
        this.secure = !!this.secureConnection;

        /**
         * Store incomplete messages coming from the server
         * @private
         */
        this._remainder = '';

        /**
         * Unprocessed responses from the server
         * @type {Array}
         */
        this._responseQueue = [];

        this.lastServerResponse = false;

        /**
         * The socket connecting to the server
         * @publick
         */
        this._socket = false;

        /**
         * Lists supported auth mechanisms
         * @private
         */
        this._supportedAuth = [];

        /**
         * Set to true, if EHLO response includes "AUTH".
         * If false then authentication is not tried
         */
        this.allowsAuth = false;

        /**
         * Includes current envelope (from, to)
         * @private
         */
        this._envelope = false;

        /**
         * Lists supported extensions
         * @private
         */
        this._supportedExtensions = [];

        /**
         * Defines the maximum allowed size for a single message
         * @private
         */
        this._maxAllowedSize = 0;

        /**
         * Function queue to run if a data chunk comes from the server
         * @private
         */
        this._responseActions = [];
        this._recipientQueue = [];

        /**
         * Timeout variable for waiting the greeting
         * @private
         */
        this._greetingTimeout = false;

        /**
         * Timeout variable for waiting the connection to start
         * @private
         */
        this._connectionTimeout = false;

        /**
         * If the socket is deemed already closed
         * @private
         */
        this._destroyed = false;

        /**
         * If the socket is already being closed
         * @private
         */
        this._closing = false;

        /**
         * Callbacks for socket's listeners
         */
        this._onSocketData = chunk => this._onData(chunk);
        this._onSocketError = error => this._onError(error, 'ESOCKET', false, 'CONN');
        this._onSocketClose = () => this._onClose();
        this._onSocketEnd = () => this._onEnd();
        this._onSocketTimeout = () => this._onTimeout();
    }

    /**
     * Creates a connection to a SMTP server and sets up connection
     * listener
     */
    connect(connectCallback) {
        if (typeof connectCallback === 'function') {
            this.once('connect', () => {
                this.logger.debug(
                    {
                        tnx: 'smtp'
                    },
                    'SMTP handshake finished'
                );
                connectCallback();
            });

            const isDestroyedMessage = this._isDestroyedMessage('connect');
            if (isDestroyedMessage) {
                return connectCallback(this._formatError(isDestroyedMessage, 'ECONNECTION', false, 'CONN'));
            }
        }

        let opts = {
            port: this.port,
            host: this.host
        };

        if (this.options.localAddress) {
            opts.localAddress = this.options.localAddress;
        }

        let setupConnectionHandlers = () => {
            this._connectionTimeout = setTimeout(() => {
                this._onError('Connection timeout', 'ETIMEDOUT', false, 'CONN');
            }, this.options.connectionTimeout || CONNECTION_TIMEOUT);

            this._socket.on('error', this._onSocketError);
        };

        if (this.options.connection) {
            // connection is already opened
            this._socket = this.options.connection;
            if (this.secureConnection && !this.alreadySecured) {
                setImmediate(() =>
                    this._upgradeConnection(err => {
                        if (err) {
                            this._onError(new Error('Error initiating TLS - ' + (err.message || err)), 'ETLS', false, 'CONN');
                            return;
                        }
                        this._onConnect();
                    })
                );
            } else {
                setImmediate(() => this._onConnect());
            }
            return;
        } else if (this.options.socket) {
            // socket object is set up but not yet connected
            this._socket = this.options.socket;
            return shared.resolveHostname(opts, (err, resolved) => {
                if (err) {
                    return setImmediate(() => this._onError(err, 'EDNS', false, 'CONN'));
                }
                this.logger.debug(
                    {
                        tnx: 'dns',
                        source: opts.host,
                        resolved: resolved.host,
                        cached: !!resolved.cached
                    },
                    'Resolved %s as %s [cache %s]',
                    opts.host,
                    resolved.host,
                    resolved.cached ? 'hit' : 'miss'
                );
                Object.keys(resolved).forEach(key => {
                    if (key.charAt(0) !== '_' && resolved[key]) {
                        opts[key] = resolved[key];
                    }
                });
                try {
                    this._socket.connect(this.port, this.host, () => {
                        this._socket.setKeepAlive(true);
                        this._onConnect();
                    });
                    setupConnectionHandlers();
                } catch (E) {
                    return setImmediate(() => this._onError(E, 'ECONNECTION', false, 'CONN'));
                }
            });
        } else if (this.secureConnection) {
            // connect using tls
            if (this.options.tls) {
                Object.keys(this.options.tls).forEach(key => {
                    opts[key] = this.options.tls[key];
                });
            }
            return shared.resolveHostname(opts, (err, resolved) => {
                if (err) {
                    return setImmediate(() => this._onError(err, 'EDNS', false, 'CONN'));
                }
                this.logger.debug(
                    {
                        tnx: 'dns',
                        source: opts.host,
                        resolved: resolved.host,
                        cached: !!resolved.cached
                    },
                    'Resolved %s as %s [cache %s]',
                    opts.host,
                    resolved.host,
                    resolved.cached ? 'hit' : 'miss'
                );
                Object.keys(resolved).forEach(key => {
                    if (key.charAt(0) !== '_' && resolved[key]) {
                        opts[key] = resolved[key];
                    }
                });
                try {
                    this._socket = tls.connect(opts, () => {
                        this._socket.setKeepAlive(true);
                        this._onConnect();
                    });
                    setupConnectionHandlers();
                } catch (E) {
                    return setImmediate(() => this._onError(E, 'ECONNECTION', false, 'CONN'));
                }
            });
        } else {
            // connect using plaintext
            return shared.resolveHostname(opts, (err, resolved) => {
                if (err) {
                    return setImmediate(() => this._onError(err, 'EDNS', false, 'CONN'));
                }
                this.logger.debug(
                    {
                        tnx: 'dns',
                        source: opts.host,
                        resolved: resolved.host,
                        cached: !!resolved.cached
                    },
                    'Resolved %s as %s [cache %s]',
                    opts.host,
                    resolved.host,
                    resolved.cached ? 'hit' : 'miss'
                );
                Object.keys(resolved).forEach(key => {
                    if (key.charAt(0) !== '_' && resolved[key]) {
                        opts[key] = resolved[key];
                    }
                });
                try {
                    this._socket = net.connect(opts, () => {
                        this._socket.setKeepAlive(true);
                        this._onConnect();
                    });
                    setupConnectionHandlers();
                } catch (E) {
                    return setImmediate(() => this._onError(E, 'ECONNECTION', false, 'CONN'));
                }
            });
        }
    }

    /**
     * Sends QUIT
     */
    quit() {
        this._sendCommand('QUIT');
        this._responseActions.push(this.close);
    }

    /**
     * Closes the connection to the server
     */
    close() {
        clearTimeout(this._connectionTimeout);
        clearTimeout(this._greetingTimeout);
        this._responseActions = [];

        // allow to run this function only once
        if (this._closing) {
            return;
        }
        this._closing = true;

        let closeMethod = 'end';

        if (this.stage === 'init') {
            // Close the socket immediately when connection timed out
            closeMethod = 'destroy';
        }

        this.logger.debug(
            {
                tnx: 'smtp'
            },
            'Closing connection to the server using "%s"',
            closeMethod
        );

        let socket = (this._socket && this._socket.socket) || this._socket;

        if (socket && !socket.destroyed) {
            try {
                this._socket[closeMethod]();
            } catch (E) {
                // just ignore
            }
        }

        this._destroy();
    }

    /**
     * Authenticate user
     */
    login(authData, callback) {
        const isDestroyedMessage = this._isDestroyedMessage('login');
        if (isDestroyedMessage) {
            return callback(this._formatError(isDestroyedMessage, 'ECONNECTION', false, 'API'));
        }

        this._auth = authData || {};
        // Select SASL authentication method
        this._authMethod = (this._auth.method || '').toString().trim().toUpperCase() || false;

        if (!this._authMethod && this._auth.oauth2 && !this._auth.credentials) {
            this._authMethod = 'XOAUTH2';
        } else if (!this._authMethod || (this._authMethod === 'XOAUTH2' && !this._auth.oauth2)) {
            // use first supported
            this._authMethod = (this._supportedAuth[0] || 'PLAIN').toUpperCase().trim();
        }

        if (this._authMethod !== 'XOAUTH2' && (!this._auth.credentials || !this._auth.credentials.user || !this._auth.credentials.pass)) {
            if (this._auth.user && this._auth.pass) {
                this._auth.credentials = {
                    user: this._auth.user,
                    pass: this._auth.pass,
                    options: this._auth.options
                };
            } else {
                return callback(this._formatError('Missing credentials for "' + this._authMethod + '"', 'EAUTH', false, 'API'));
            }
        }

        if (this.customAuth.has(this._authMethod)) {
            let handler = this.customAuth.get(this._authMethod);
            let lastResponse;
            let returned = false;

            let resolve = () => {
                if (returned) {
                    return;
                }
                returned = true;
                this.logger.info(
                    {
                        tnx: 'smtp',
                        username: this._auth.user,
                        action: 'authenticated',
                        method: this._authMethod
                    },
                    'User %s authenticated',
                    JSON.stringify(this._auth.user)
                );
                this.authenticated = true;
                callback(null, true);
            };

            let reject = err => {
                if (returned) {
                    return;
                }
                returned = true;
                callback(this._formatError(err, 'EAUTH', lastResponse, 'AUTH ' + this._authMethod));
            };

            let handlerResponse = handler({
                auth: this._auth,
                method: this._authMethod,

                extensions: [].concat(this._supportedExtensions),
                authMethods: [].concat(this._supportedAuth),
                maxAllowedSize: this._maxAllowedSize || false,

                sendCommand: (cmd, done) => {
                    let promise;

                    if (!done) {
                        promise = new Promise((resolve, reject) => {
                            done = shared.callbackPromise(resolve, reject);
                        });
                    }

                    this._responseActions.push(str => {
                        lastResponse = str;

                        let codes = str.match(/^(\d+)(?:\s(\d+\.\d+\.\d+))?\s/);
                        let data = {
                            command: cmd,
                            response: str
                        };
                        if (codes) {
                            data.status = Number(codes[1]) || 0;
                            if (codes[2]) {
                                data.code = codes[2];
                            }
                            data.text = str.substr(codes[0].length);
                        } else {
                            data.text = str;
                            data.status = 0; // just in case we need to perform numeric comparisons
                        }
                        done(null, data);
                    });
                    setImmediate(() => this._sendCommand(cmd));

                    return promise;
                },

                resolve,
                reject
            });

            if (handlerResponse && typeof handlerResponse.catch === 'function') {
                // a promise was returned
                handlerResponse.then(resolve).catch(reject);
            }

            return;
        }

        switch (this._authMethod) {
            case 'XOAUTH2':
                this._handleXOauth2Token(false, callback);
                return;
            case 'LOGIN':
                this._responseActions.push(str => {
                    this._actionAUTH_LOGIN_USER(str, callback);
                });
                this._sendCommand('AUTH LOGIN');
                return;
            case 'PLAIN':
                this._responseActions.push(str => {
                    this._actionAUTHComplete(str, callback);
                });
                this._sendCommand(
                    'AUTH PLAIN ' +
                        Buffer.from(
                            //this._auth.user+'\u0000'+
                            '\u0000' + // skip authorization identity as it causes problems with some servers
                                this._auth.credentials.user +
                                '\u0000' +
                                this._auth.credentials.pass,
                            'utf-8'
                        ).toString('base64'),
                    // log entry without passwords
                    'AUTH PLAIN ' +
                        Buffer.from(
                            //this._auth.user+'\u0000'+
                            '\u0000' + // skip authorization identity as it causes problems with some servers
                                this._auth.credentials.user +
                                '\u0000' +
                                '/* secret */',
                            'utf-8'
                        ).toString('base64')
                );
                return;
            case 'CRAM-MD5':
                this._responseActions.push(str => {
                    this._actionAUTH_CRAM_MD5(str, callback);
                });
                this._sendCommand('AUTH CRAM-MD5');
                return;
        }

        return callback(this._formatError('Unknown authentication method "' + this._authMethod + '"', 'EAUTH', false, 'API'));
    }

    /**
     * Sends a message
     *
     * @param {Object} envelope Envelope object, {from: addr, to: [addr]}
     * @param {Object} message String, Buffer or a Stream
     * @param {Function} callback Callback to return once sending is completed
     */
    send(envelope, message, done) {
        if (!message) {
            return done(this._formatError('Empty message', 'EMESSAGE', false, 'API'));
        }

        const isDestroyedMessage = this._isDestroyedMessage('send message');
        if (isDestroyedMessage) {
            return done(this._formatError(isDestroyedMessage, 'ECONNECTION', false, 'API'));
        }

        // reject larger messages than allowed
        if (this._maxAllowedSize && envelope.size > this._maxAllowedSize) {
            return setImmediate(() => {
                done(this._formatError('Message size larger than allowed ' + this._maxAllowedSize, 'EMESSAGE', false, 'MAIL FROM'));
            });
        }

        // ensure that callback is only called once
        let returned = false;
        let callback = function () {
            if (returned) {
                return;
            }
            returned = true;

            done(...arguments);
        };

        if (typeof message.on === 'function') {
            message.on('error', err => callback(this._formatError(err, 'ESTREAM', false, 'API')));
        }

        let startTime = Date.now();
        this._setEnvelope(envelope, (err, info) => {
            if (err) {
                return callback(err);
            }
            let envelopeTime = Date.now();
            let stream = this._createSendStream((err, str) => {
                if (err) {
                    return callback(err);
                }

                info.envelopeTime = envelopeTime - startTime;
                info.messageTime = Date.now() - envelopeTime;
                info.messageSize = stream.outByteCount;
                info.response = str;

                return callback(null, info);
            });
            if (typeof message.pipe === 'function') {
                message.pipe(stream);
            } else {
                stream.write(message);
                stream.end();
            }
        });
    }

    /**
     * Resets connection state
     *
     * @param {Function} callback Callback to return once connection is reset
     */
    reset(callback) {
        this._sendCommand('RSET');
        this._responseActions.push(str => {
            if (str.charAt(0) !== '2') {
                return callback(this._formatError('Could not reset session state. response=' + str, 'EPROTOCOL', str, 'RSET'));
            }
            this._envelope = false;
            return callback(null, true);
        });
    }

    /**
     * Connection listener that is run when the connection to
     * the server is opened
     *
     * @event
     */
    _onConnect() {
        clearTimeout(this._connectionTimeout);

        this.logger.info(
            {
                tnx: 'network',
                localAddress: this._socket.localAddress,
                localPort: this._socket.localPort,
                remoteAddress: this._socket.remoteAddress,
                remotePort: this._socket.remotePort
            },
            '%s established to %s:%s',
            this.secure ? 'Secure connection' : 'Connection',
            this._socket.remoteAddress,
            this._socket.remotePort
        );

        if (this._destroyed) {
            // Connection was established after we already had canceled it
            this.close();
            return;
        }

        this.stage = 'connected';

        // clear existing listeners for the socket
        this._socket.removeListener('data', this._onSocketData);
        this._socket.removeListener('timeout', this._onSocketTimeout);
        this._socket.removeListener('close', this._onSocketClose);
        this._socket.removeListener('end', this._onSocketEnd);

        this._socket.on('data', this._onSocketData);
        this._socket.once('close', this._onSocketClose);
        this._socket.once('end', this._onSocketEnd);

        this._socket.setTimeout(this.options.socketTimeout || SOCKET_TIMEOUT);
        this._socket.on('timeout', this._onSocketTimeout);

        this._greetingTimeout = setTimeout(() => {
            // if still waiting for greeting, give up
            if (this._socket && !this._destroyed && this._responseActions[0] === this._actionGreeting) {
                this._onError('Greeting never received', 'ETIMEDOUT', false, 'CONN');
            }
        }, this.options.greetingTimeout || GREETING_TIMEOUT);

        this._responseActions.push(this._actionGreeting);

        // we have a 'data' listener set up so resume socket if it was paused
        this._socket.resume();
    }

    /**
     * 'data' listener for data coming from the server
     *
     * @event
     * @param {Buffer} chunk Data chunk coming from the server
     */
    _onData(chunk) {
        if (this._destroyed || !chunk || !chunk.length) {
            return;
        }

        let data = (chunk || '').toString('binary');
        let lines = (this._remainder + data).split(/\r?\n/);
        let lastline;

        this._remainder = lines.pop();

        for (let i = 0, len = lines.length; i < len; i++) {
            if (this._responseQueue.length) {
                lastline = this._responseQueue[this._responseQueue.length - 1];
                if (/^\d+-/.test(lastline.split('\n').pop())) {
                    this._responseQueue[this._responseQueue.length - 1] += '\n' + lines[i];
                    continue;
                }
            }
            this._responseQueue.push(lines[i]);
        }

        if (this._responseQueue.length) {
            lastline = this._responseQueue[this._responseQueue.length - 1];
            if (/^\d+-/.test(lastline.split('\n').pop())) {
                return;
            }
        }

        this._processResponse();
    }

    /**
     * 'error' listener for the socket
     *
     * @event
     * @param {Error} err Error object
     * @param {String} type Error name
     */
    _onError(err, type, data, command) {
        clearTimeout(this._connectionTimeout);
        clearTimeout(this._greetingTimeout);

        if (this._destroyed) {
            // just ignore, already closed
            // this might happen when a socket is canceled because of reached timeout
            // but the socket timeout error itself receives only after
            return;
        }

        err = this._formatError(err, type, data, command);

        this.logger.error(data, err.message);

        this.emit('error', err);
        this.close();
    }

    _formatError(message, type, response, command) {
        let err;

        if (/Error\]$/i.test(Object.prototype.toString.call(message))) {
            err = message;
        } else {
            err = new Error(message);
        }

        if (type && type !== 'Error') {
            err.code = type;
        }

        if (response) {
            err.response = response;
            err.message += ': ' + response;
        }

        let responseCode = (typeof response === 'string' && Number((response.match(/^\d+/) || [])[0])) || false;
        if (responseCode) {
            err.responseCode = responseCode;
        }

        if (command) {
            err.command = command;
        }

        return err;
    }

    /**
     * 'close' listener for the socket
     *
     * @event
     */
    _onClose() {
        this.logger.info(
            {
                tnx: 'network'
            },
            'Connection closed'
        );

        if (this.upgrading && !this._destroyed) {
            return this._onError(new Error('Connection closed unexpectedly'), 'ETLS', false, 'CONN');
        } else if (![this._actionGreeting, this.close].includes(this._responseActions[0]) && !this._destroyed) {
            return this._onError(new Error('Connection closed unexpectedly'), 'ECONNECTION', false, 'CONN');
        }

        this._destroy();
    }

    /**
     * 'end' listener for the socket
     *
     * @event
     */
    _onEnd() {
        if (this._socket && !this._socket.destroyed) {
            this._socket.destroy();
        }
    }

    /**
     * 'timeout' listener for the socket
     *
     * @event
     */
    _onTimeout() {
        return this._onError(new Error('Timeout'), 'ETIMEDOUT', false, 'CONN');
    }

    /**
     * Destroys the client, emits 'end'
     */
    _destroy() {
        if (this._destroyed) {
            return;
        }
        this._destroyed = true;
        this.emit('end');
    }

    /**
     * Upgrades the connection to TLS
     *
     * @param {Function} callback Callback function to run when the connection
     *        has been secured
     */
    _upgradeConnection(callback) {
        // do not remove all listeners or it breaks node v0.10 as there's
        // apparently a 'finish' event set that would be cleared as well

        // we can safely keep 'error', 'end', 'close' etc. events
        this._socket.removeListener('data', this._onSocketData); // incoming data is going to be gibberish from this point onwards
        this._socket.removeListener('timeout', this._onSocketTimeout); // timeout will be re-set for the new socket object

        let socketPlain = this._socket;
        let opts = {
            socket: this._socket,
            host: this.host
        };

        Object.keys(this.options.tls || {}).forEach(key => {
            opts[key] = this.options.tls[key];
        });

        this.upgrading = true;
        // tls.connect is not an asynchronous function however it may still throw errors and requires to be wrapped with try/catch
        try {
            this._socket = tls.connect(opts, () => {
                this.secure = true;
                this.upgrading = false;
                this._socket.on('data', this._onSocketData);

                socketPlain.removeListener('close', this._onSocketClose);
                socketPlain.removeListener('end', this._onSocketEnd);

                return callback(null, true);
            });
        } catch (err) {
            return callback(err);
        }

        this._socket.on('error', this._onSocketError);
        this._socket.once('close', this._onSocketClose);
        this._socket.once('end', this._onSocketEnd);

        this._socket.setTimeout(this.options.socketTimeout || SOCKET_TIMEOUT); // 10 min.
        this._socket.on('timeout', this._onSocketTimeout);

        // resume in case the socket was paused
        socketPlain.resume();
    }

    /**
     * Processes queued responses from the server
     *
     * @param {Boolean} force If true, ignores _processing flag
     */
    _processResponse() {
        if (!this._responseQueue.length) {
            return false;
        }

        let str = (this.lastServerResponse = (this._responseQueue.shift() || '').toString());

        if (/^\d+-/.test(str.split('\n').pop())) {
            // keep waiting for the final part of multiline response
            return;
        }

        if (this.options.debug || this.options.transactionLog) {
            this.logger.debug(
                {
                    tnx: 'server'
                },
                str.replace(/\r?\n$/, '')
            );
        }

        if (!str.trim()) {
            // skip unexpected empty lines
            setImmediate(() => this._processResponse(true));
        }

        let action = this._responseActions.shift();

        if (typeof action === 'function') {
            action.call(this, str);
            setImmediate(() => this._processResponse(true));
        } else {
            return this._onError(new Error('Unexpected Response'), 'EPROTOCOL', str, 'CONN');
        }
    }

    /**
     * Send a command to the server, append \r\n
     *
     * @param {String} str String to be sent to the server
     * @param {String} logStr Optional string to be used for logging instead of the actual string
     */
    _sendCommand(str, logStr) {
        if (this._destroyed) {
            // Connection already closed, can't send any more data
            return;
        }

        if (this._socket.destroyed) {
            return this.close();
        }

        if (this.options.debug || this.options.transactionLog) {
            this.logger.debug(
                {
                    tnx: 'client'
                },
                (logStr || str || '').toString().replace(/\r?\n$/, '')
            );
        }

        this._socket.write(Buffer.from(str + '\r\n', 'utf-8'));
    }

    /**
     * Initiates a new message by submitting envelope data, starting with
     * MAIL FROM: command
     *
     * @param {Object} envelope Envelope object in the form of
     *        {from:'...', to:['...']}
     *        or
     *        {from:{address:'...',name:'...'}, to:[address:'...',name:'...']}
     */
    _setEnvelope(envelope, callback) {
        let args = [];
        let useSmtpUtf8 = false;

        this._envelope = envelope || {};
        this._envelope.from = ((this._envelope.from && this._envelope.from.address) || this._envelope.from || '').toString().trim();

        this._envelope.to = [].concat(this._envelope.to || []).map(to => ((to && to.address) || to || '').toString().trim());

        if (!this._envelope.to.length) {
            return callback(this._formatError('No recipients defined', 'EENVELOPE', false, 'API'));
        }

        if (this._envelope.from && /[\r\n<>]/.test(this._envelope.from)) {
            return callback(this._formatError('Invalid sender ' + JSON.stringify(this._envelope.from), 'EENVELOPE', false, 'API'));
        }

        // check if the sender address uses only ASCII characters,
        // otherwise require usage of SMTPUTF8 extension
        if (/[\x80-\uFFFF]/.test(this._envelope.from)) {
            useSmtpUtf8 = true;
        }

        for (let i = 0, len = this._envelope.to.length; i < len; i++) {
            if (!this._envelope.to[i] || /[\r\n<>]/.test(this._envelope.to[i])) {
                return callback(this._formatError('Invalid recipient ' + JSON.stringify(this._envelope.to[i]), 'EENVELOPE', false, 'API'));
            }

            // check if the recipients addresses use only ASCII characters,
            // otherwise require usage of SMTPUTF8 extension
            if (/[\x80-\uFFFF]/.test(this._envelope.to[i])) {
                useSmtpUtf8 = true;
            }
        }

        // clone the recipients array for latter manipulation
        this._envelope.rcptQueue = JSON.parse(JSON.stringify(this._envelope.to || []));
        this._envelope.rejected = [];
        this._envelope.rejectedErrors = [];
        this._envelope.accepted = [];

        if (this._envelope.dsn) {
            try {
                this._envelope.dsn = this._setDsnEnvelope(this._envelope.dsn);
            } catch (err) {
                return callback(this._formatError('Invalid DSN ' + err.message, 'EENVELOPE', false, 'API'));
            }
        }

        this._responseActions.push(str => {
            this._actionMAIL(str, callback);
        });

        // If the server supports SMTPUTF8 and the envelope includes an internationalized
        // email address then append SMTPUTF8 keyword to the MAIL FROM command
        if (useSmtpUtf8 && this._supportedExtensions.includes('SMTPUTF8')) {
            args.push('SMTPUTF8');
            this._usingSmtpUtf8 = true;
        }

        // If the server supports 8BITMIME and the message might contain non-ascii bytes
        // then append the 8BITMIME keyword to the MAIL FROM command
        if (this._envelope.use8BitMime && this._supportedExtensions.includes('8BITMIME')) {
            args.push('BODY=8BITMIME');
            this._using8BitMime = true;
        }

        if (this._envelope.size && this._supportedExtensions.includes('SIZE')) {
            args.push('SIZE=' + this._envelope.size);
        }

        // If the server supports DSN and the envelope includes an DSN prop
        // then append DSN params to the MAIL FROM command
        if (this._envelope.dsn && this._supportedExtensions.includes('DSN')) {
            if (this._envelope.dsn.ret) {
                args.push('RET=' + shared.encodeXText(this._envelope.dsn.ret));
            }
            if (this._envelope.dsn.envid) {
                args.push('ENVID=' + shared.encodeXText(this._envelope.dsn.envid));
            }
        }

        this._sendCommand('MAIL FROM:<' + this._envelope.from + '>' + (args.length ? ' ' + args.join(' ') : ''));
    }

    _setDsnEnvelope(params) {
        let ret = (params.ret || params.return || '').toString().toUpperCase() || null;
        if (ret) {
            switch (ret) {
                case 'HDRS':
                case 'HEADERS':
                    ret = 'HDRS';
                    break;
                case 'FULL':
                case 'BODY':
                    ret = 'FULL';
                    break;
            }
        }

        if (ret && !['FULL', 'HDRS'].includes(ret)) {
            throw new Error('ret: ' + JSON.stringify(ret));
        }

        let envid = (params.envid || params.id || '').toString() || null;

        let notify = params.notify || null;
        if (notify) {
            if (typeof notify === 'string') {
                notify = notify.split(',');
            }
            notify = notify.map(n => n.trim().toUpperCase());
            let validNotify = ['NEVER', 'SUCCESS', 'FAILURE', 'DELAY'];
            let invaliNotify = notify.filter(n => !validNotify.includes(n));
            if (invaliNotify.length || (notify.length > 1 && notify.includes('NEVER'))) {
                throw new Error('notify: ' + JSON.stringify(notify.join(',')));
            }
            notify = notify.join(',');
        }

        let orcpt = (params.recipient || params.orcpt || '').toString() || null;
        if (orcpt && orcpt.indexOf(';') < 0) {
            orcpt = 'rfc822;' + orcpt;
        }

        return {
            ret,
            envid,
            notify,
            orcpt
        };
    }

    _getDsnRcptToArgs() {
        let args = [];
        // If the server supports DSN and the envelope includes an DSN prop
        // then append DSN params to the RCPT TO command
        if (this._envelope.dsn && this._supportedExtensions.includes('DSN')) {
            if (this._envelope.dsn.notify) {
                args.push('NOTIFY=' + shared.encodeXText(this._envelope.dsn.notify));
            }
            if (this._envelope.dsn.orcpt) {
                args.push('ORCPT=' + shared.encodeXText(this._envelope.dsn.orcpt));
            }
        }
        return args.length ? ' ' + args.join(' ') : '';
    }

    _createSendStream(callback) {
        let dataStream = new DataStream();
        let logStream;

        if (this.options.lmtp) {
            this._envelope.accepted.forEach((recipient, i) => {
                let final = i === this._envelope.accepted.length - 1;
                this._responseActions.push(str => {
                    this._actionLMTPStream(recipient, final, str, callback);
                });
            });
        } else {
            this._responseActions.push(str => {
                this._actionSMTPStream(str, callback);
            });
        }

        dataStream.pipe(this._socket, {
            end: false
        });

        if (this.options.debug) {
            logStream = new PassThrough();
            logStream.on('readable', () => {
                let chunk;
                while ((chunk = logStream.read())) {
                    this.logger.debug(
                        {
                            tnx: 'message'
                        },
                        chunk.toString('binary').replace(/\r?\n$/, '')
                    );
                }
            });
            dataStream.pipe(logStream);
        }

        dataStream.once('end', () => {
            this.logger.info(
                {
                    tnx: 'message',
                    inByteCount: dataStream.inByteCount,
                    outByteCount: dataStream.outByteCount
                },
                '<%s bytes encoded mime message (source size %s bytes)>',
                dataStream.outByteCount,
                dataStream.inByteCount
            );
        });

        return dataStream;
    }

    /** ACTIONS **/

    /**
     * Will be run after the connection is created and the server sends
     * a greeting. If the incoming message starts with 220 initiate
     * SMTP session by sending EHLO command
     *
     * @param {String} str Message from the server
     */
    _actionGreeting(str) {
        clearTimeout(this._greetingTimeout);

        if (str.substr(0, 3) !== '220') {
            this._onError(new Error('Invalid greeting. response=' + str), 'EPROTOCOL', str, 'CONN');
            return;
        }

        if (this.options.lmtp) {
            this._responseActions.push(this._actionLHLO);
            this._sendCommand('LHLO ' + this.name);
        } else {
            this._responseActions.push(this._actionEHLO);
            this._sendCommand('EHLO ' + this.name);
        }
    }

    /**
     * Handles server response for LHLO command. If it yielded in
     * error, emit 'error', otherwise treat this as an EHLO response
     *
     * @param {String} str Message from the server
     */
    _actionLHLO(str) {
        if (str.charAt(0) !== '2') {
            this._onError(new Error('Invalid LHLO. response=' + str), 'EPROTOCOL', str, 'LHLO');
            return;
        }

        this._actionEHLO(str);
    }

    /**
     * Handles server response for EHLO command. If it yielded in
     * error, try HELO instead, otherwise initiate TLS negotiation
     * if STARTTLS is supported by the server or move into the
     * authentication phase.
     *
     * @param {String} str Message from the server
     */
    _actionEHLO(str) {
        let match;

        if (str.substr(0, 3) === '421') {
            this._onError(new Error('Server terminates connection. response=' + str), 'ECONNECTION', str, 'EHLO');
            return;
        }

        if (str.charAt(0) !== '2') {
            if (this.options.requireTLS) {
                this._onError(new Error('EHLO failed but HELO does not support required STARTTLS. response=' + str), 'ECONNECTION', str, 'EHLO');
                return;
            }

            // Try HELO instead
            this._responseActions.push(this._actionHELO);
            this._sendCommand('HELO ' + this.name);
            return;
        }

        // Detect if the server supports STARTTLS
        if (!this.secure && !this.options.ignoreTLS && (/[ -]STARTTLS\b/im.test(str) || this.options.requireTLS)) {
            this._sendCommand('STARTTLS');
            this._responseActions.push(this._actionSTARTTLS);
            return;
        }

        // Detect if the server supports SMTPUTF8
        if (/[ -]SMTPUTF8\b/im.test(str)) {
            this._supportedExtensions.push('SMTPUTF8');
        }

        // Detect if the server supports DSN
        if (/[ -]DSN\b/im.test(str)) {
            this._supportedExtensions.push('DSN');
        }

        // Detect if the server supports 8BITMIME
        if (/[ -]8BITMIME\b/im.test(str)) {
            this._supportedExtensions.push('8BITMIME');
        }

        // Detect if the server supports PIPELINING
        if (/[ -]PIPELINING\b/im.test(str)) {
            this._supportedExtensions.push('PIPELINING');
        }

        // Detect if the server supports AUTH
        if (/[ -]AUTH\b/i.test(str)) {
            this.allowsAuth = true;
        }

        // Detect if the server supports PLAIN auth
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)PLAIN/i.test(str)) {
            this._supportedAuth.push('PLAIN');
        }

        // Detect if the server supports LOGIN auth
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)LOGIN/i.test(str)) {
            this._supportedAuth.push('LOGIN');
        }

        // Detect if the server supports CRAM-MD5 auth
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)CRAM-MD5/i.test(str)) {
            this._supportedAuth.push('CRAM-MD5');
        }

        // Detect if the server supports XOAUTH2 auth
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)XOAUTH2/i.test(str)) {
            this._supportedAuth.push('XOAUTH2');
        }

        // Detect if the server supports SIZE extensions (and the max allowed size)
        if ((match = str.match(/[ -]SIZE(?:[ \t]+(\d+))?/im))) {
            this._supportedExtensions.push('SIZE');
            this._maxAllowedSize = Number(match[1]) || 0;
        }

        this.emit('connect');
    }

    /**
     * Handles server response for HELO command. If it yielded in
     * error, emit 'error', otherwise move into the authentication phase.
     *
     * @param {String} str Message from the server
     */
    _actionHELO(str) {
        if (str.charAt(0) !== '2') {
            this._onError(new Error('Invalid HELO. response=' + str), 'EPROTOCOL', str, 'HELO');
            return;
        }

        // assume that authentication is enabled (most probably is not though)
        this.allowsAuth = true;

        this.emit('connect');
    }

    /**
     * Handles server response for STARTTLS command. If there's an error
     * try HELO instead, otherwise initiate TLS upgrade. If the upgrade
     * succeedes restart the EHLO
     *
     * @param {String} str Message from the server
     */
    _actionSTARTTLS(str) {
        if (str.charAt(0) !== '2') {
            if (this.options.opportunisticTLS) {
                this.logger.info(
                    {
                        tnx: 'smtp'
                    },
                    'Failed STARTTLS upgrade, continuing unencrypted'
                );
                return this.emit('connect');
            }
            this._onError(new Error('Error upgrading connection with STARTTLS'), 'ETLS', str, 'STARTTLS');
            return;
        }

        this._upgradeConnection((err, secured) => {
            if (err) {
                this._onError(new Error('Error initiating TLS - ' + (err.message || err)), 'ETLS', false, 'STARTTLS');
                return;
            }

            this.logger.info(
                {
                    tnx: 'smtp'
                },
                'Connection upgraded with STARTTLS'
            );

            if (secured) {
                // restart session
                if (this.options.lmtp) {
                    this._responseActions.push(this._actionLHLO);
                    this._sendCommand('LHLO ' + this.name);
                } else {
                    this._responseActions.push(this._actionEHLO);
                    this._sendCommand('EHLO ' + this.name);
                }
            } else {
                this.emit('connect');
            }
        });
    }

    /**
     * Handle the response for AUTH LOGIN command. We are expecting
     * '334 VXNlcm5hbWU6' (base64 for 'Username:'). Data to be sent as
     * response needs to be base64 encoded username. We do not need
     * exact match but settle with 334 response in general as some
     * hosts invalidly use a longer message than VXNlcm5hbWU6
     *
     * @param {String} str Message from the server
     */
    _actionAUTH_LOGIN_USER(str, callback) {
        if (!/^334[ -]/.test(str)) {
            // expecting '334 VXNlcm5hbWU6'
            callback(this._formatError('Invalid login sequence while waiting for "334 VXNlcm5hbWU6"', 'EAUTH', str, 'AUTH LOGIN'));
            return;
        }

        this._responseActions.push(str => {
            this._actionAUTH_LOGIN_PASS(str, callback);
        });

        this._sendCommand(Buffer.from(this._auth.credentials.user + '', 'utf-8').toString('base64'));
    }

    /**
     * Handle the response for AUTH CRAM-MD5 command. We are expecting
     * '334 <challenge string>'. Data to be sent as response needs to be
     * base64 decoded challenge string, MD5 hashed using the password as
     * a HMAC key, prefixed by the username and a space, and finally all
     * base64 encoded again.
     *
     * @param {String} str Message from the server
     */
    _actionAUTH_CRAM_MD5(str, callback) {
        let challengeMatch = str.match(/^334\s+(.+)$/);
        let challengeString = '';

        if (!challengeMatch) {
            return callback(this._formatError('Invalid login sequence while waiting for server challenge string', 'EAUTH', str, 'AUTH CRAM-MD5'));
        } else {
            challengeString = challengeMatch[1];
        }

        // Decode from base64
        let base64decoded = Buffer.from(challengeString, 'base64').toString('ascii'),
            hmacMD5 = crypto.createHmac('md5', this._auth.credentials.pass);

        hmacMD5.update(base64decoded);

        let prepended = this._auth.credentials.user + ' ' + hmacMD5.digest('hex');

        this._responseActions.push(str => {
            this._actionAUTH_CRAM_MD5_PASS(str, callback);
        });

        this._sendCommand(
            Buffer.from(prepended).toString('base64'),
            // hidden hash for logs
            Buffer.from(this._auth.credentials.user + ' /* secret */').toString('base64')
        );
    }

    /**
     * Handles the response to CRAM-MD5 authentication, if there's no error,
     * the user can be considered logged in. Start waiting for a message to send
     *
     * @param {String} str Message from the server
     */
    _actionAUTH_CRAM_MD5_PASS(str, callback) {
        if (!str.match(/^235\s+/)) {
            return callback(this._formatError('Invalid login sequence while waiting for "235"', 'EAUTH', str, 'AUTH CRAM-MD5'));
        }

        this.logger.info(
            {
                tnx: 'smtp',
                username: this._auth.user,
                action: 'authenticated',
                method: this._authMethod
            },
            'User %s authenticated',
            JSON.stringify(this._auth.user)
        );
        this.authenticated = true;
        callback(null, true);
    }

    /**
     * Handle the response for AUTH LOGIN command. We are expecting
     * '334 UGFzc3dvcmQ6' (base64 for 'Password:'). Data to be sent as
     * response needs to be base64 encoded password.
     *
     * @param {String} str Message from the server
     */
    _actionAUTH_LOGIN_PASS(str, callback) {
        if (!/^334[ -]/.test(str)) {
            // expecting '334 UGFzc3dvcmQ6'
            return callback(this._formatError('Invalid login sequence while waiting for "334 UGFzc3dvcmQ6"', 'EAUTH', str, 'AUTH LOGIN'));
        }

        this._responseActions.push(str => {
            this._actionAUTHComplete(str, callback);
        });

        this._sendCommand(
            Buffer.from((this._auth.credentials.pass || '').toString(), 'utf-8').toString('base64'),
            // Hidden pass for logs
            Buffer.from('/* secret */', 'utf-8').toString('base64')
        );
    }

    /**
     * Handles the response for authentication, if there's no error,
     * the user can be considered logged in. Start waiting for a message to send
     *
     * @param {String} str Message from the server
     */
    _actionAUTHComplete(str, isRetry, callback) {
        if (!callback && typeof isRetry === 'function') {
            callback = isRetry;
            isRetry = false;
        }

        if (str.substr(0, 3) === '334') {
            this._responseActions.push(str => {
                if (isRetry || this._authMethod !== 'XOAUTH2') {
                    this._actionAUTHComplete(str, true, callback);
                } else {
                    // fetch a new OAuth2 access token
                    setImmediate(() => this._handleXOauth2Token(true, callback));
                }
            });
            this._sendCommand('');
            return;
        }

        if (str.charAt(0) !== '2') {
            this.logger.info(
                {
                    tnx: 'smtp',
                    username: this._auth.user,
                    action: 'authfail',
                    method: this._authMethod
                },
                'User %s failed to authenticate',
                JSON.stringify(this._auth.user)
            );
            return callback(this._formatError('Invalid login', 'EAUTH', str, 'AUTH ' + this._authMethod));
        }

        this.logger.info(
            {
                tnx: 'smtp',
                username: this._auth.user,
                action: 'authenticated',
                method: this._authMethod
            },
            'User %s authenticated',
            JSON.stringify(this._auth.user)
        );
        this.authenticated = true;
        callback(null, true);
    }

    /**
     * Handle response for a MAIL FROM: command
     *
     * @param {String} str Message from the server
     */
    _actionMAIL(str, callback) {
        let message, curRecipient;
        if (Number(str.charAt(0)) !== 2) {
            if (this._usingSmtpUtf8 && /^550 /.test(str) && /[\x80-\uFFFF]/.test(this._envelope.from)) {
                message = 'Internationalized mailbox name not allowed';
            } else {
                message = 'Mail command failed';
            }
            return callback(this._formatError(message, 'EENVELOPE', str, 'MAIL FROM'));
        }

        if (!this._envelope.rcptQueue.length) {
            return callback(this._formatError('Can\x27t send mail - no recipients defined', 'EENVELOPE', false, 'API'));
        } else {
            this._recipientQueue = [];

            if (this._supportedExtensions.includes('PIPELINING')) {
                while (this._envelope.rcptQueue.length) {
                    curRecipient = this._envelope.rcptQueue.shift();
                    this._recipientQueue.push(curRecipient);
                    this._responseActions.push(str => {
                        this._actionRCPT(str, callback);
                    });
                    this._sendCommand('RCPT TO:<' + curRecipient + '>' + this._getDsnRcptToArgs());
                }
            } else {
                curRecipient = this._envelope.rcptQueue.shift();
                this._recipientQueue.push(curRecipient);
                this._responseActions.push(str => {
                    this._actionRCPT(str, callback);
                });
                this._sendCommand('RCPT TO:<' + curRecipient + '>' + this._getDsnRcptToArgs());
            }
        }
    }

    /**
     * Handle response for a RCPT TO: command
     *
     * @param {String} str Message from the server
     */
    _actionRCPT(str, callback) {
        let message,
            err,
            curRecipient = this._recipientQueue.shift();
        if (Number(str.charAt(0)) !== 2) {
            // this is a soft error
            if (this._usingSmtpUtf8 && /^553 /.test(str) && /[\x80-\uFFFF]/.test(curRecipient)) {
                message = 'Internationalized mailbox name not allowed';
            } else {
                message = 'Recipient command failed';
            }
            this._envelope.rejected.push(curRecipient);
            // store error for the failed recipient
            err = this._formatError(message, 'EENVELOPE', str, 'RCPT TO');
            err.recipient = curRecipient;
            this._envelope.rejectedErrors.push(err);
        } else {
            this._envelope.accepted.push(curRecipient);
        }

        if (!this._envelope.rcptQueue.length && !this._recipientQueue.length) {
            if (this._envelope.rejected.length < this._envelope.to.length) {
                this._responseActions.push(str => {
                    this._actionDATA(str, callback);
                });
                this._sendCommand('DATA');
            } else {
                err = this._formatError('Can\x27t send mail - all recipients were rejected', 'EENVELOPE', str, 'RCPT TO');
                err.rejected = this._envelope.rejected;
                err.rejectedErrors = this._envelope.rejectedErrors;
                return callback(err);
            }
        } else if (this._envelope.rcptQueue.length) {
            curRecipient = this._envelope.rcptQueue.shift();
            this._recipientQueue.push(curRecipient);
            this._responseActions.push(str => {
                this._actionRCPT(str, callback);
            });
            this._sendCommand('RCPT TO:<' + curRecipient + '>' + this._getDsnRcptToArgs());
        }
    }

    /**
     * Handle response for a DATA command
     *
     * @param {String} str Message from the server
     */
    _actionDATA(str, callback) {
        // response should be 354 but according to this issue https://github.com/eleith/emailjs/issues/24
        // some servers might use 250 instead, so lets check for 2 or 3 as the first digit
        if (!/^[23]/.test(str)) {
            return callback(this._formatError('Data command failed', 'EENVELOPE', str, 'DATA'));
        }

        let response = {
            accepted: this._envelope.accepted,
            rejected: this._envelope.rejected
        };

        if (this._envelope.rejectedErrors.length) {
            response.rejectedErrors = this._envelope.rejectedErrors;
        }

        callback(null, response);
    }

    /**
     * Handle response for a DATA stream when using SMTP
     * We expect a single response that defines if the sending succeeded or failed
     *
     * @param {String} str Message from the server
     */
    _actionSMTPStream(str, callback) {
        if (Number(str.charAt(0)) !== 2) {
            // Message failed
            return callback(this._formatError('Message failed', 'EMESSAGE', str, 'DATA'));
        } else {
            // Message sent succesfully
            return callback(null, str);
        }
    }

    /**
     * Handle response for a DATA stream
     * We expect a separate response for every recipient. All recipients can either
     * succeed or fail separately
     *
     * @param {String} recipient The recipient this response applies to
     * @param {Boolean} final Is this the final recipient?
     * @param {String} str Message from the server
     */
    _actionLMTPStream(recipient, final, str, callback) {
        let err;
        if (Number(str.charAt(0)) !== 2) {
            // Message failed
            err = this._formatError('Message failed for recipient ' + recipient, 'EMESSAGE', str, 'DATA');
            err.recipient = recipient;
            this._envelope.rejected.push(recipient);
            this._envelope.rejectedErrors.push(err);
            for (let i = 0, len = this._envelope.accepted.length; i < len; i++) {
                if (this._envelope.accepted[i] === recipient) {
                    this._envelope.accepted.splice(i, 1);
                }
            }
        }
        if (final) {
            return callback(null, str);
        }
    }

    _handleXOauth2Token(isRetry, callback) {
        this._auth.oauth2.getToken(isRetry, (err, accessToken) => {
            if (err) {
                this.logger.info(
                    {
                        tnx: 'smtp',
                        username: this._auth.user,
                        action: 'authfail',
                        method: this._authMethod
                    },
                    'User %s failed to authenticate',
                    JSON.stringify(this._auth.user)
                );
                return callback(this._formatError(err, 'EAUTH', false, 'AUTH XOAUTH2'));
            }
            this._responseActions.push(str => {
                this._actionAUTHComplete(str, isRetry, callback);
            });
            this._sendCommand(
                'AUTH XOAUTH2 ' + this._auth.oauth2.buildXOAuth2Token(accessToken),
                //  Hidden for logs
                'AUTH XOAUTH2 ' + this._auth.oauth2.buildXOAuth2Token('/* secret */')
            );
        });
    }

    /**
     *
     * @param {string} command
     * @private
     */
    _isDestroyedMessage(command) {
        if (this._destroyed) {
            return 'Cannot ' + command + ' - smtp connection is already destroyed.';
        }

        if (this._socket) {
            if (this._socket.destroyed) {
                return 'Cannot ' + command + ' - smtp connection socket is already destroyed.';
            }

            if (!this._socket.writable) {
                return 'Cannot ' + command + ' - smtp connection socket is already half-closed.';
            }
        }
    }

    _getHostname() {
        // defaul hostname is machine hostname or [IP]
        let defaultHostname = os.hostname() || '';

        // ignore if not FQDN
        if (defaultHostname.indexOf('.') < 0) {
            defaultHostname = '[127.0.0.1]';
        }

        // IP should be enclosed in []
        if (defaultHostname.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
            defaultHostname = '[' + defaultHostname + ']';
        }

        return defaultHostname;
    }
}

module.exports = SMTPConnection;


/***/ }),

/***/ 4163:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const EventEmitter = __nccwpck_require__(2361);
const PoolResource = __nccwpck_require__(5378);
const SMTPConnection = __nccwpck_require__(4615);
const wellKnown = __nccwpck_require__(4285);
const shared = __nccwpck_require__(2974);
const packageData = __nccwpck_require__(4129);

/**
 * Creates a SMTP pool transport object for Nodemailer
 *
 * @constructor
 * @param {Object} options SMTP Connection options
 */
class SMTPPool extends EventEmitter {
    constructor(options) {
        super();

        options = options || {};
        if (typeof options === 'string') {
            options = {
                url: options
            };
        }

        let urlData;
        let service = options.service;

        if (typeof options.getSocket === 'function') {
            this.getSocket = options.getSocket;
        }

        if (options.url) {
            urlData = shared.parseConnectionUrl(options.url);
            service = service || urlData.service;
        }

        this.options = shared.assign(
            false, // create new object
            options, // regular options
            urlData, // url options
            service && wellKnown(service) // wellknown options
        );

        this.options.maxConnections = this.options.maxConnections || 5;
        this.options.maxMessages = this.options.maxMessages || 100;

        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'smtp-pool'
        });

        // temporary object
        let connection = new SMTPConnection(this.options);

        this.name = 'SMTP (pool)';
        this.version = packageData.version + '[client:' + connection.version + ']';

        this._rateLimit = {
            counter: 0,
            timeout: null,
            waiting: [],
            checkpoint: false,
            delta: Number(this.options.rateDelta) || 1000,
            limit: Number(this.options.rateLimit) || 0
        };
        this._closed = false;
        this._queue = [];
        this._connections = [];
        this._connectionCounter = 0;

        this.idling = true;

        setImmediate(() => {
            if (this.idling) {
                this.emit('idle');
            }
        });
    }

    /**
     * Placeholder function for creating proxy sockets. This method immediatelly returns
     * without a socket
     *
     * @param {Object} options Connection options
     * @param {Function} callback Callback function to run with the socket keys
     */
    getSocket(options, callback) {
        // return immediatelly
        return setImmediate(() => callback(null, false));
    }

    /**
     * Queues an e-mail to be sent using the selected settings
     *
     * @param {Object} mail Mail object
     * @param {Function} callback Callback function
     */
    send(mail, callback) {
        if (this._closed) {
            return false;
        }

        this._queue.push({
            mail,
            requeueAttempts: 0,
            callback
        });

        if (this.idling && this._queue.length >= this.options.maxConnections) {
            this.idling = false;
        }

        setImmediate(() => this._processMessages());

        return true;
    }

    /**
     * Closes all connections in the pool. If there is a message being sent, the connection
     * is closed later
     */
    close() {
        let connection;
        let len = this._connections.length;
        this._closed = true;

        // clear rate limit timer if it exists
        clearTimeout(this._rateLimit.timeout);

        if (!len && !this._queue.length) {
            return;
        }

        // remove all available connections
        for (let i = len - 1; i >= 0; i--) {
            if (this._connections[i] && this._connections[i].available) {
                connection = this._connections[i];
                connection.close();
                this.logger.info(
                    {
                        tnx: 'connection',
                        cid: connection.id,
                        action: 'removed'
                    },
                    'Connection #%s removed',
                    connection.id
                );
            }
        }

        if (len && !this._connections.length) {
            this.logger.debug(
                {
                    tnx: 'connection'
                },
                'All connections removed'
            );
        }

        if (!this._queue.length) {
            return;
        }

        // make sure that entire queue would be cleaned
        let invokeCallbacks = () => {
            if (!this._queue.length) {
                this.logger.debug(
                    {
                        tnx: 'connection'
                    },
                    'Pending queue entries cleared'
                );
                return;
            }
            let entry = this._queue.shift();
            if (entry && typeof entry.callback === 'function') {
                try {
                    entry.callback(new Error('Connection pool was closed'));
                } catch (E) {
                    this.logger.error(
                        {
                            err: E,
                            tnx: 'callback',
                            cid: connection.id
                        },
                        'Callback error for #%s: %s',
                        connection.id,
                        E.message
                    );
                }
            }
            setImmediate(invokeCallbacks);
        };
        setImmediate(invokeCallbacks);
    }

    /**
     * Check the queue and available connections. If there is a message to be sent and there is
     * an available connection, then use this connection to send the mail
     */
    _processMessages() {
        let connection;
        let i, len;

        // do nothing if already closed
        if (this._closed) {
            return;
        }

        // do nothing if queue is empty
        if (!this._queue.length) {
            if (!this.idling) {
                // no pending jobs
                this.idling = true;
                this.emit('idle');
            }
            return;
        }

        // find first available connection
        for (i = 0, len = this._connections.length; i < len; i++) {
            if (this._connections[i].available) {
                connection = this._connections[i];
                break;
            }
        }

        if (!connection && this._connections.length < this.options.maxConnections) {
            connection = this._createConnection();
        }

        if (!connection) {
            // no more free connection slots available
            this.idling = false;
            return;
        }

        // check if there is free space in the processing queue
        if (!this.idling && this._queue.length < this.options.maxConnections) {
            this.idling = true;
            this.emit('idle');
        }

        let entry = (connection.queueEntry = this._queue.shift());
        entry.messageId = (connection.queueEntry.mail.message.getHeader('message-id') || '').replace(/[<>\s]/g, '');

        connection.available = false;

        this.logger.debug(
            {
                tnx: 'pool',
                cid: connection.id,
                messageId: entry.messageId,
                action: 'assign'
            },
            'Assigned message <%s> to #%s (%s)',
            entry.messageId,
            connection.id,
            connection.messages + 1
        );

        if (this._rateLimit.limit) {
            this._rateLimit.counter++;
            if (!this._rateLimit.checkpoint) {
                this._rateLimit.checkpoint = Date.now();
            }
        }

        connection.send(entry.mail, (err, info) => {
            // only process callback if current handler is not changed
            if (entry === connection.queueEntry) {
                try {
                    entry.callback(err, info);
                } catch (E) {
                    this.logger.error(
                        {
                            err: E,
                            tnx: 'callback',
                            cid: connection.id
                        },
                        'Callback error for #%s: %s',
                        connection.id,
                        E.message
                    );
                }
                connection.queueEntry = false;
            }
        });
    }

    /**
     * Creates a new pool resource
     */
    _createConnection() {
        let connection = new PoolResource(this);

        connection.id = ++this._connectionCounter;

        this.logger.info(
            {
                tnx: 'pool',
                cid: connection.id,
                action: 'conection'
            },
            'Created new pool resource #%s',
            connection.id
        );

        // resource comes available
        connection.on('available', () => {
            this.logger.debug(
                {
                    tnx: 'connection',
                    cid: connection.id,
                    action: 'available'
                },
                'Connection #%s became available',
                connection.id
            );

            if (this._closed) {
                // if already closed run close() that will remove this connections from connections list
                this.close();
            } else {
                // check if there's anything else to send
                this._processMessages();
            }
        });

        // resource is terminated with an error
        connection.once('error', err => {
            if (err.code !== 'EMAXLIMIT') {
                this.logger.error(
                    {
                        err,
                        tnx: 'pool',
                        cid: connection.id
                    },
                    'Pool Error for #%s: %s',
                    connection.id,
                    err.message
                );
            } else {
                this.logger.debug(
                    {
                        tnx: 'pool',
                        cid: connection.id,
                        action: 'maxlimit'
                    },
                    'Max messages limit exchausted for #%s',
                    connection.id
                );
            }

            if (connection.queueEntry) {
                try {
                    connection.queueEntry.callback(err);
                } catch (E) {
                    this.logger.error(
                        {
                            err: E,
                            tnx: 'callback',
                            cid: connection.id
                        },
                        'Callback error for #%s: %s',
                        connection.id,
                        E.message
                    );
                }
                connection.queueEntry = false;
            }

            // remove the erroneus connection from connections list
            this._removeConnection(connection);

            this._continueProcessing();
        });

        connection.once('close', () => {
            this.logger.info(
                {
                    tnx: 'connection',
                    cid: connection.id,
                    action: 'closed'
                },
                'Connection #%s was closed',
                connection.id
            );

            this._removeConnection(connection);

            if (connection.queueEntry) {
                // If the connection closed when sending, add the message to the queue again
                // if max number of requeues is not reached yet
                // Note that we must wait a bit.. because the callback of the 'error' handler might be called
                // in the next event loop
                setTimeout(() => {
                    if (connection.queueEntry) {
                        if (this._shouldRequeuOnConnectionClose(connection.queueEntry)) {
                            this._requeueEntryOnConnectionClose(connection);
                        } else {
                            this._failDeliveryOnConnectionClose(connection);
                        }
                    }
                    this._continueProcessing();
                }, 50);
            } else {
                this._continueProcessing();
            }
        });

        this._connections.push(connection);

        return connection;
    }

    _shouldRequeuOnConnectionClose(queueEntry) {
        if (this.options.maxRequeues === undefined || this.options.maxRequeues < 0) {
            return true;
        }

        return queueEntry.requeueAttempts < this.options.maxRequeues;
    }

    _failDeliveryOnConnectionClose(connection) {
        if (connection.queueEntry && connection.queueEntry.callback) {
            try {
                connection.queueEntry.callback(new Error('Reached maximum number of retries after connection was closed'));
            } catch (E) {
                this.logger.error(
                    {
                        err: E,
                        tnx: 'callback',
                        messageId: connection.queueEntry.messageId,
                        cid: connection.id
                    },
                    'Callback error for #%s: %s',
                    connection.id,
                    E.message
                );
            }
            connection.queueEntry = false;
        }
    }

    _requeueEntryOnConnectionClose(connection) {
        connection.queueEntry.requeueAttempts = connection.queueEntry.requeueAttempts + 1;
        this.logger.debug(
            {
                tnx: 'pool',
                cid: connection.id,
                messageId: connection.queueEntry.messageId,
                action: 'requeue'
            },
            'Re-queued message <%s> for #%s. Attempt: #%s',
            connection.queueEntry.messageId,
            connection.id,
            connection.queueEntry.requeueAttempts
        );
        this._queue.unshift(connection.queueEntry);
        connection.queueEntry = false;
    }

    /**
     * Continue to process message if the pool hasn't closed
     */
    _continueProcessing() {
        if (this._closed) {
            this.close();
        } else {
            setTimeout(() => this._processMessages(), 100);
        }
    }

    /**
     * Remove resource from pool
     *
     * @param {Object} connection The PoolResource to remove
     */
    _removeConnection(connection) {
        let index = this._connections.indexOf(connection);

        if (index !== -1) {
            this._connections.splice(index, 1);
        }
    }

    /**
     * Checks if connections have hit current rate limit and if so, queues the availability callback
     *
     * @param {Function} callback Callback function to run once rate limiter has been cleared
     */
    _checkRateLimit(callback) {
        if (!this._rateLimit.limit) {
            return callback();
        }

        let now = Date.now();

        if (this._rateLimit.counter < this._rateLimit.limit) {
            return callback();
        }

        this._rateLimit.waiting.push(callback);

        if (this._rateLimit.checkpoint <= now - this._rateLimit.delta) {
            return this._clearRateLimit();
        } else if (!this._rateLimit.timeout) {
            this._rateLimit.timeout = setTimeout(() => this._clearRateLimit(), this._rateLimit.delta - (now - this._rateLimit.checkpoint));
            this._rateLimit.checkpoint = now;
        }
    }

    /**
     * Clears current rate limit limitation and runs paused callback
     */
    _clearRateLimit() {
        clearTimeout(this._rateLimit.timeout);
        this._rateLimit.timeout = null;
        this._rateLimit.counter = 0;
        this._rateLimit.checkpoint = false;

        // resume all paused connections
        while (this._rateLimit.waiting.length) {
            let cb = this._rateLimit.waiting.shift();
            setImmediate(cb);
        }
    }

    /**
     * Returns true if there are free slots in the queue
     */
    isIdle() {
        return this.idling;
    }

    /**
     * Verifies SMTP configuration
     *
     * @param {Function} callback Callback function
     */
    verify(callback) {
        let promise;

        if (!callback) {
            promise = new Promise((resolve, reject) => {
                callback = shared.callbackPromise(resolve, reject);
            });
        }

        let auth = new PoolResource(this).auth;

        this.getSocket(this.options, (err, socketOptions) => {
            if (err) {
                return callback(err);
            }

            let options = this.options;
            if (socketOptions && socketOptions.connection) {
                this.logger.info(
                    {
                        tnx: 'proxy',
                        remoteAddress: socketOptions.connection.remoteAddress,
                        remotePort: socketOptions.connection.remotePort,
                        destHost: options.host || '',
                        destPort: options.port || '',
                        action: 'connected'
                    },
                    'Using proxied socket from %s:%s to %s:%s',
                    socketOptions.connection.remoteAddress,
                    socketOptions.connection.remotePort,
                    options.host || '',
                    options.port || ''
                );
                options = shared.assign(false, options);
                Object.keys(socketOptions).forEach(key => {
                    options[key] = socketOptions[key];
                });
            }

            let connection = new SMTPConnection(options);
            let returned = false;

            connection.once('error', err => {
                if (returned) {
                    return;
                }
                returned = true;
                connection.close();
                return callback(err);
            });

            connection.once('end', () => {
                if (returned) {
                    return;
                }
                returned = true;
                return callback(new Error('Connection closed'));
            });

            let finalize = () => {
                if (returned) {
                    return;
                }
                returned = true;
                connection.quit();
                return callback(null, true);
            };

            connection.connect(() => {
                if (returned) {
                    return;
                }

                if (auth && (connection.allowsAuth || options.forceAuth)) {
                    connection.login(auth, err => {
                        if (returned) {
                            return;
                        }

                        if (err) {
                            returned = true;
                            connection.close();
                            return callback(err);
                        }

                        finalize();
                    });
                } else {
                    finalize();
                }
            });
        });

        return promise;
    }
}

// expose to the world
module.exports = SMTPPool;


/***/ }),

/***/ 5378:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const SMTPConnection = __nccwpck_require__(4615);
const assign = (__nccwpck_require__(2974).assign);
const XOAuth2 = __nccwpck_require__(6054);
const EventEmitter = __nccwpck_require__(2361);

/**
 * Creates an element for the pool
 *
 * @constructor
 * @param {Object} options SMTPPool instance
 */
class PoolResource extends EventEmitter {
    constructor(pool) {
        super();

        this.pool = pool;
        this.options = pool.options;
        this.logger = this.pool.logger;

        if (this.options.auth) {
            switch ((this.options.auth.type || '').toString().toUpperCase()) {
                case 'OAUTH2': {
                    let oauth2 = new XOAuth2(this.options.auth, this.logger);
                    oauth2.provisionCallback = (this.pool.mailer && this.pool.mailer.get('oauth2_provision_cb')) || oauth2.provisionCallback;
                    this.auth = {
                        type: 'OAUTH2',
                        user: this.options.auth.user,
                        oauth2,
                        method: 'XOAUTH2'
                    };
                    oauth2.on('token', token => this.pool.mailer.emit('token', token));
                    oauth2.on('error', err => this.emit('error', err));
                    break;
                }
                default:
                    if (!this.options.auth.user && !this.options.auth.pass) {
                        break;
                    }
                    this.auth = {
                        type: (this.options.auth.type || '').toString().toUpperCase() || 'LOGIN',
                        user: this.options.auth.user,
                        credentials: {
                            user: this.options.auth.user || '',
                            pass: this.options.auth.pass,
                            options: this.options.auth.options
                        },
                        method: (this.options.auth.method || '').trim().toUpperCase() || this.options.authMethod || false
                    };
            }
        }

        this._connection = false;
        this._connected = false;

        this.messages = 0;
        this.available = true;
    }

    /**
     * Initiates a connection to the SMTP server
     *
     * @param {Function} callback Callback function to run once the connection is established or failed
     */
    connect(callback) {
        this.pool.getSocket(this.options, (err, socketOptions) => {
            if (err) {
                return callback(err);
            }

            let returned = false;
            let options = this.options;
            if (socketOptions && socketOptions.connection) {
                this.logger.info(
                    {
                        tnx: 'proxy',
                        remoteAddress: socketOptions.connection.remoteAddress,
                        remotePort: socketOptions.connection.remotePort,
                        destHost: options.host || '',
                        destPort: options.port || '',
                        action: 'connected'
                    },
                    'Using proxied socket from %s:%s to %s:%s',
                    socketOptions.connection.remoteAddress,
                    socketOptions.connection.remotePort,
                    options.host || '',
                    options.port || ''
                );

                options = assign(false, options);
                Object.keys(socketOptions).forEach(key => {
                    options[key] = socketOptions[key];
                });
            }

            this.connection = new SMTPConnection(options);

            this.connection.once('error', err => {
                this.emit('error', err);
                if (returned) {
                    return;
                }
                returned = true;
                return callback(err);
            });

            this.connection.once('end', () => {
                this.close();
                if (returned) {
                    return;
                }
                returned = true;

                let timer = setTimeout(() => {
                    if (returned) {
                        return;
                    }
                    // still have not returned, this means we have an unexpected connection close
                    let err = new Error('Unexpected socket close');
                    if (this.connection && this.connection._socket && this.connection._socket.upgrading) {
                        // starttls connection errors
                        err.code = 'ETLS';
                    }
                    callback(err);
                }, 1000);

                try {
                    timer.unref();
                } catch (E) {
                    // Ignore. Happens on envs with non-node timer implementation
                }
            });

            this.connection.connect(() => {
                if (returned) {
                    return;
                }

                if (this.auth && (this.connection.allowsAuth || options.forceAuth)) {
                    this.connection.login(this.auth, err => {
                        if (returned) {
                            return;
                        }
                        returned = true;

                        if (err) {
                            this.connection.close();
                            this.emit('error', err);
                            return callback(err);
                        }

                        this._connected = true;
                        callback(null, true);
                    });
                } else {
                    returned = true;
                    this._connected = true;
                    return callback(null, true);
                }
            });
        });
    }

    /**
     * Sends an e-mail to be sent using the selected settings
     *
     * @param {Object} mail Mail object
     * @param {Function} callback Callback function
     */
    send(mail, callback) {
        if (!this._connected) {
            return this.connect(err => {
                if (err) {
                    return callback(err);
                }
                return this.send(mail, callback);
            });
        }

        let envelope = mail.message.getEnvelope();
        let messageId = mail.message.messageId();

        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
            recipients.push('...and ' + recipients.splice(2).length + ' more');
        }
        this.logger.info(
            {
                tnx: 'send',
                messageId,
                cid: this.id
            },
            'Sending message %s using #%s to <%s>',
            messageId,
            this.id,
            recipients.join(', ')
        );

        if (mail.data.dsn) {
            envelope.dsn = mail.data.dsn;
        }

        this.connection.send(envelope, mail.message.createReadStream(), (err, info) => {
            this.messages++;

            if (err) {
                this.connection.close();
                this.emit('error', err);
                return callback(err);
            }

            info.envelope = {
                from: envelope.from,
                to: envelope.to
            };
            info.messageId = messageId;

            setImmediate(() => {
                let err;
                if (this.messages >= this.options.maxMessages) {
                    err = new Error('Resource exhausted');
                    err.code = 'EMAXLIMIT';
                    this.connection.close();
                    this.emit('error', err);
                } else {
                    this.pool._checkRateLimit(() => {
                        this.available = true;
                        this.emit('available');
                    });
                }
            });

            callback(null, info);
        });
    }

    /**
     * Closes the connection
     */
    close() {
        this._connected = false;
        if (this.auth && this.auth.oauth2) {
            this.auth.oauth2.removeAllListeners();
        }
        if (this.connection) {
            this.connection.close();
        }
        this.emit('close');
    }
}

module.exports = PoolResource;


/***/ }),

/***/ 4975:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const EventEmitter = __nccwpck_require__(2361);
const SMTPConnection = __nccwpck_require__(4615);
const wellKnown = __nccwpck_require__(4285);
const shared = __nccwpck_require__(2974);
const XOAuth2 = __nccwpck_require__(6054);
const packageData = __nccwpck_require__(4129);

/**
 * Creates a SMTP transport object for Nodemailer
 *
 * @constructor
 * @param {Object} options Connection options
 */
class SMTPTransport extends EventEmitter {
    constructor(options) {
        super();

        options = options || {};
        if (typeof options === 'string') {
            options = {
                url: options
            };
        }

        let urlData;
        let service = options.service;

        if (typeof options.getSocket === 'function') {
            this.getSocket = options.getSocket;
        }

        if (options.url) {
            urlData = shared.parseConnectionUrl(options.url);
            service = service || urlData.service;
        }

        this.options = shared.assign(
            false, // create new object
            options, // regular options
            urlData, // url options
            service && wellKnown(service) // wellknown options
        );

        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'smtp-transport'
        });

        // temporary object
        let connection = new SMTPConnection(this.options);

        this.name = 'SMTP';
        this.version = packageData.version + '[client:' + connection.version + ']';

        if (this.options.auth) {
            this.auth = this.getAuth({});
        }
    }

    /**
     * Placeholder function for creating proxy sockets. This method immediatelly returns
     * without a socket
     *
     * @param {Object} options Connection options
     * @param {Function} callback Callback function to run with the socket keys
     */
    getSocket(options, callback) {
        // return immediatelly
        return setImmediate(() => callback(null, false));
    }

    getAuth(authOpts) {
        if (!authOpts) {
            return this.auth;
        }

        let hasAuth = false;
        let authData = {};

        if (this.options.auth && typeof this.options.auth === 'object') {
            Object.keys(this.options.auth).forEach(key => {
                hasAuth = true;
                authData[key] = this.options.auth[key];
            });
        }

        if (authOpts && typeof authOpts === 'object') {
            Object.keys(authOpts).forEach(key => {
                hasAuth = true;
                authData[key] = authOpts[key];
            });
        }

        if (!hasAuth) {
            return false;
        }

        switch ((authData.type || '').toString().toUpperCase()) {
            case 'OAUTH2': {
                if (!authData.service && !authData.user) {
                    return false;
                }
                let oauth2 = new XOAuth2(authData, this.logger);
                oauth2.provisionCallback = (this.mailer && this.mailer.get('oauth2_provision_cb')) || oauth2.provisionCallback;
                oauth2.on('token', token => this.mailer.emit('token', token));
                oauth2.on('error', err => this.emit('error', err));
                return {
                    type: 'OAUTH2',
                    user: authData.user,
                    oauth2,
                    method: 'XOAUTH2'
                };
            }
            default:
                return {
                    type: (authData.type || '').toString().toUpperCase() || 'LOGIN',
                    user: authData.user,
                    credentials: {
                        user: authData.user || '',
                        pass: authData.pass,
                        options: authData.options
                    },
                    method: (authData.method || '').trim().toUpperCase() || this.options.authMethod || false
                };
        }
    }

    /**
     * Sends an e-mail using the selected settings
     *
     * @param {Object} mail Mail object
     * @param {Function} callback Callback function
     */
    send(mail, callback) {
        this.getSocket(this.options, (err, socketOptions) => {
            if (err) {
                return callback(err);
            }

            let returned = false;
            let options = this.options;
            if (socketOptions && socketOptions.connection) {
                this.logger.info(
                    {
                        tnx: 'proxy',
                        remoteAddress: socketOptions.connection.remoteAddress,
                        remotePort: socketOptions.connection.remotePort,
                        destHost: options.host || '',
                        destPort: options.port || '',
                        action: 'connected'
                    },
                    'Using proxied socket from %s:%s to %s:%s',
                    socketOptions.connection.remoteAddress,
                    socketOptions.connection.remotePort,
                    options.host || '',
                    options.port || ''
                );

                // only copy options if we need to modify it
                options = shared.assign(false, options);
                Object.keys(socketOptions).forEach(key => {
                    options[key] = socketOptions[key];
                });
            }

            let connection = new SMTPConnection(options);

            connection.once('error', err => {
                if (returned) {
                    return;
                }
                returned = true;
                connection.close();
                return callback(err);
            });

            connection.once('end', () => {
                if (returned) {
                    return;
                }

                let timer = setTimeout(() => {
                    if (returned) {
                        return;
                    }
                    returned = true;
                    // still have not returned, this means we have an unexpected connection close
                    let err = new Error('Unexpected socket close');
                    if (connection && connection._socket && connection._socket.upgrading) {
                        // starttls connection errors
                        err.code = 'ETLS';
                    }
                    callback(err);
                }, 1000);

                try {
                    timer.unref();
                } catch (E) {
                    // Ignore. Happens on envs with non-node timer implementation
                }
            });

            let sendMessage = () => {
                let envelope = mail.message.getEnvelope();
                let messageId = mail.message.messageId();

                let recipients = [].concat(envelope.to || []);
                if (recipients.length > 3) {
                    recipients.push('...and ' + recipients.splice(2).length + ' more');
                }

                if (mail.data.dsn) {
                    envelope.dsn = mail.data.dsn;
                }

                this.logger.info(
                    {
                        tnx: 'send',
                        messageId
                    },
                    'Sending message %s to <%s>',
                    messageId,
                    recipients.join(', ')
                );

                connection.send(envelope, mail.message.createReadStream(), (err, info) => {
                    returned = true;
                    connection.close();
                    if (err) {
                        this.logger.error(
                            {
                                err,
                                tnx: 'send'
                            },
                            'Send error for %s: %s',
                            messageId,
                            err.message
                        );
                        return callback(err);
                    }
                    info.envelope = {
                        from: envelope.from,
                        to: envelope.to
                    };
                    info.messageId = messageId;
                    try {
                        return callback(null, info);
                    } catch (E) {
                        this.logger.error(
                            {
                                err: E,
                                tnx: 'callback'
                            },
                            'Callback error for %s: %s',
                            messageId,
                            E.message
                        );
                    }
                });
            };

            connection.connect(() => {
                if (returned) {
                    return;
                }

                let auth = this.getAuth(mail.data.auth);

                if (auth && (connection.allowsAuth || options.forceAuth)) {
                    connection.login(auth, err => {
                        if (auth && auth !== this.auth && auth.oauth2) {
                            auth.oauth2.removeAllListeners();
                        }
                        if (returned) {
                            return;
                        }

                        if (err) {
                            returned = true;
                            connection.close();
                            return callback(err);
                        }

                        sendMessage();
                    });
                } else {
                    sendMessage();
                }
            });
        });
    }

    /**
     * Verifies SMTP configuration
     *
     * @param {Function} callback Callback function
     */
    verify(callback) {
        let promise;

        if (!callback) {
            promise = new Promise((resolve, reject) => {
                callback = shared.callbackPromise(resolve, reject);
            });
        }

        this.getSocket(this.options, (err, socketOptions) => {
            if (err) {
                return callback(err);
            }

            let options = this.options;
            if (socketOptions && socketOptions.connection) {
                this.logger.info(
                    {
                        tnx: 'proxy',
                        remoteAddress: socketOptions.connection.remoteAddress,
                        remotePort: socketOptions.connection.remotePort,
                        destHost: options.host || '',
                        destPort: options.port || '',
                        action: 'connected'
                    },
                    'Using proxied socket from %s:%s to %s:%s',
                    socketOptions.connection.remoteAddress,
                    socketOptions.connection.remotePort,
                    options.host || '',
                    options.port || ''
                );

                options = shared.assign(false, options);
                Object.keys(socketOptions).forEach(key => {
                    options[key] = socketOptions[key];
                });
            }

            let connection = new SMTPConnection(options);
            let returned = false;

            connection.once('error', err => {
                if (returned) {
                    return;
                }
                returned = true;
                connection.close();
                return callback(err);
            });

            connection.once('end', () => {
                if (returned) {
                    return;
                }
                returned = true;
                return callback(new Error('Connection closed'));
            });

            let finalize = () => {
                if (returned) {
                    return;
                }
                returned = true;
                connection.quit();
                return callback(null, true);
            };

            connection.connect(() => {
                if (returned) {
                    return;
                }

                let authData = this.getAuth({});

                if (authData && (connection.allowsAuth || options.forceAuth)) {
                    connection.login(authData, err => {
                        if (returned) {
                            return;
                        }

                        if (err) {
                            returned = true;
                            connection.close();
                            return callback(err);
                        }

                        finalize();
                    });
                } else {
                    finalize();
                }
            });
        });

        return promise;
    }

    /**
     * Releases resources
     */
    close() {
        if (this.auth && this.auth.oauth2) {
            this.auth.oauth2.removeAllListeners();
        }
        this.emit('close');
    }
}

// expose to the world
module.exports = SMTPTransport;


/***/ }),

/***/ 1878:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const packageData = __nccwpck_require__(4129);
const shared = __nccwpck_require__(2974);

/**
 * Generates a Transport object for streaming
 *
 * Possible options can be the following:
 *
 *  * **buffer** if true, then returns the message as a Buffer object instead of a stream
 *  * **newline** either 'windows' or 'unix'
 *
 * @constructor
 * @param {Object} optional config parameter
 */
class StreamTransport {
    constructor(options) {
        options = options || {};

        this.options = options || {};

        this.name = 'StreamTransport';
        this.version = packageData.version;

        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'stream-transport'
        });

        this.winbreak = ['win', 'windows', 'dos', '\r\n'].includes((options.newline || '').toString().toLowerCase());
    }

    /**
     * Compiles a mailcomposer message and forwards it to handler that sends it
     *
     * @param {Object} emailMessage MailComposer object
     * @param {Function} callback Callback function to run when the sending is completed
     */
    send(mail, done) {
        // We probably need this in the output
        mail.message.keepBcc = true;

        let envelope = mail.data.envelope || mail.message.getEnvelope();
        let messageId = mail.message.messageId();

        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
            recipients.push('...and ' + recipients.splice(2).length + ' more');
        }
        this.logger.info(
            {
                tnx: 'send',
                messageId
            },
            'Sending message %s to <%s> using %s line breaks',
            messageId,
            recipients.join(', '),
            this.winbreak ? '<CR><LF>' : '<LF>'
        );

        setImmediate(() => {
            let stream;

            try {
                stream = mail.message.createReadStream();
            } catch (E) {
                this.logger.error(
                    {
                        err: E,
                        tnx: 'send',
                        messageId
                    },
                    'Creating send stream failed for %s. %s',
                    messageId,
                    E.message
                );
                return done(E);
            }

            if (!this.options.buffer) {
                stream.once('error', err => {
                    this.logger.error(
                        {
                            err,
                            tnx: 'send',
                            messageId
                        },
                        'Failed creating message for %s. %s',
                        messageId,
                        err.message
                    );
                });
                return done(null, {
                    envelope: mail.data.envelope || mail.message.getEnvelope(),
                    messageId,
                    message: stream
                });
            }

            let chunks = [];
            let chunklen = 0;
            stream.on('readable', () => {
                let chunk;
                while ((chunk = stream.read()) !== null) {
                    chunks.push(chunk);
                    chunklen += chunk.length;
                }
            });

            stream.once('error', err => {
                this.logger.error(
                    {
                        err,
                        tnx: 'send',
                        messageId
                    },
                    'Failed creating message for %s. %s',
                    messageId,
                    err.message
                );
                return done(err);
            });

            stream.on('end', () =>
                done(null, {
                    envelope: mail.data.envelope || mail.message.getEnvelope(),
                    messageId,
                    message: Buffer.concat(chunks, chunklen)
                })
            );
        });
    }
}

module.exports = StreamTransport;


/***/ }),

/***/ 4285:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const services = __nccwpck_require__(8249);
const normalized = {};

Object.keys(services).forEach(key => {
    let service = services[key];

    normalized[normalizeKey(key)] = normalizeService(service);

    [].concat(service.aliases || []).forEach(alias => {
        normalized[normalizeKey(alias)] = normalizeService(service);
    });

    [].concat(service.domains || []).forEach(domain => {
        normalized[normalizeKey(domain)] = normalizeService(service);
    });
});

function normalizeKey(key) {
    return key.replace(/[^a-zA-Z0-9.-]/g, '').toLowerCase();
}

function normalizeService(service) {
    let filter = ['domains', 'aliases'];
    let response = {};

    Object.keys(service).forEach(key => {
        if (filter.indexOf(key) < 0) {
            response[key] = service[key];
        }
    });

    return response;
}

/**
 * Resolves SMTP config for given key. Key can be a name (like 'Gmail'), alias (like 'Google Mail') or
 * an email address (like 'test@googlemail.com').
 *
 * @param {String} key [description]
 * @returns {Object} SMTP config or false if not found
 */
module.exports = function (key) {
    key = normalizeKey(key.split('@').pop());
    return normalized[key] || false;
};


/***/ }),

/***/ 6054:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const Stream = (__nccwpck_require__(2781).Stream);
const fetch = __nccwpck_require__(6665);
const crypto = __nccwpck_require__(6113);
const shared = __nccwpck_require__(2974);

/**
 * XOAUTH2 access_token generator for Gmail.
 * Create client ID for web applications in Google API console to use it.
 * See Offline Access for receiving the needed refreshToken for an user
 * https://developers.google.com/accounts/docs/OAuth2WebServer#offline
 *
 * Usage for generating access tokens with a custom method using provisionCallback:
 * provisionCallback(user, renew, callback)
 *   * user is the username to get the token for
 *   * renew is a boolean that if true indicates that existing token failed and needs to be renewed
 *   * callback is the callback to run with (error, accessToken [, expires])
 *     * accessToken is a string
 *     * expires is an optional expire time in milliseconds
 * If provisionCallback is used, then Nodemailer does not try to attempt generating the token by itself
 *
 * @constructor
 * @param {Object} options Client information for token generation
 * @param {String} options.user User e-mail address
 * @param {String} options.clientId Client ID value
 * @param {String} options.clientSecret Client secret value
 * @param {String} options.refreshToken Refresh token for an user
 * @param {String} options.accessUrl Endpoint for token generation, defaults to 'https://accounts.google.com/o/oauth2/token'
 * @param {String} options.accessToken An existing valid accessToken
 * @param {String} options.privateKey Private key for JSW
 * @param {Number} options.expires Optional Access Token expire time in ms
 * @param {Number} options.timeout Optional TTL for Access Token in seconds
 * @param {Function} options.provisionCallback Function to run when a new access token is required
 */
class XOAuth2 extends Stream {
    constructor(options, logger) {
        super();

        this.options = options || {};

        if (options && options.serviceClient) {
            if (!options.privateKey || !options.user) {
                setImmediate(() => this.emit('error', new Error('Options "privateKey" and "user" are required for service account!')));
                return;
            }

            let serviceRequestTimeout = Math.min(Math.max(Number(this.options.serviceRequestTimeout) || 0, 0), 3600);
            this.options.serviceRequestTimeout = serviceRequestTimeout || 5 * 60;
        }

        this.logger = shared.getLogger(
            {
                logger
            },
            {
                component: this.options.component || 'OAuth2'
            }
        );

        this.provisionCallback = typeof this.options.provisionCallback === 'function' ? this.options.provisionCallback : false;

        this.options.accessUrl = this.options.accessUrl || 'https://accounts.google.com/o/oauth2/token';
        this.options.customHeaders = this.options.customHeaders || {};
        this.options.customParams = this.options.customParams || {};

        this.accessToken = this.options.accessToken || false;

        if (this.options.expires && Number(this.options.expires)) {
            this.expires = this.options.expires;
        } else {
            let timeout = Math.max(Number(this.options.timeout) || 0, 0);
            this.expires = (timeout && Date.now() + timeout * 1000) || 0;
        }
    }

    /**
     * Returns or generates (if previous has expired) a XOAuth2 token
     *
     * @param {Boolean} renew If false then use cached access token (if available)
     * @param {Function} callback Callback function with error object and token string
     */
    getToken(renew, callback) {
        if (!renew && this.accessToken && (!this.expires || this.expires > Date.now())) {
            return callback(null, this.accessToken);
        }

        let generateCallback = (...args) => {
            if (args[0]) {
                this.logger.error(
                    {
                        err: args[0],
                        tnx: 'OAUTH2',
                        user: this.options.user,
                        action: 'renew'
                    },
                    'Failed generating new Access Token for %s',
                    this.options.user
                );
            } else {
                this.logger.info(
                    {
                        tnx: 'OAUTH2',
                        user: this.options.user,
                        action: 'renew'
                    },
                    'Generated new Access Token for %s',
                    this.options.user
                );
            }
            callback(...args);
        };

        if (this.provisionCallback) {
            this.provisionCallback(this.options.user, !!renew, (err, accessToken, expires) => {
                if (!err && accessToken) {
                    this.accessToken = accessToken;
                    this.expires = expires || 0;
                }
                generateCallback(err, accessToken);
            });
        } else {
            this.generateToken(generateCallback);
        }
    }

    /**
     * Updates token values
     *
     * @param {String} accessToken New access token
     * @param {Number} timeout Access token lifetime in seconds
     *
     * Emits 'token': { user: User email-address, accessToken: the new accessToken, timeout: TTL in seconds}
     */
    updateToken(accessToken, timeout) {
        this.accessToken = accessToken;
        timeout = Math.max(Number(timeout) || 0, 0);
        this.expires = (timeout && Date.now() + timeout * 1000) || 0;

        this.emit('token', {
            user: this.options.user,
            accessToken: accessToken || '',
            expires: this.expires
        });
    }

    /**
     * Generates a new XOAuth2 token with the credentials provided at initialization
     *
     * @param {Function} callback Callback function with error object and token string
     */
    generateToken(callback) {
        let urlOptions;
        let loggedUrlOptions;
        if (this.options.serviceClient) {
            // service account - https://developers.google.com/identity/protocols/OAuth2ServiceAccount
            let iat = Math.floor(Date.now() / 1000); // unix time
            let tokenData = {
                iss: this.options.serviceClient,
                scope: this.options.scope || 'https://mail.google.com/',
                sub: this.options.user,
                aud: this.options.accessUrl,
                iat,
                exp: iat + this.options.serviceRequestTimeout
            };
            let token;
            try {
                token = this.jwtSignRS256(tokenData);
            } catch (err) {
                return callback(new Error('Can\x27t generate token. Check your auth options'));
            }

            urlOptions = {
                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                assertion: token
            };

            loggedUrlOptions = {
                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                assertion: tokenData
            };
        } else {
            if (!this.options.refreshToken) {
                return callback(new Error('Can\x27t create new access token for user'));
            }

            // web app - https://developers.google.com/identity/protocols/OAuth2WebServer
            urlOptions = {
                client_id: this.options.clientId || '',
                client_secret: this.options.clientSecret || '',
                refresh_token: this.options.refreshToken,
                grant_type: 'refresh_token'
            };

            loggedUrlOptions = {
                client_id: this.options.clientId || '',
                client_secret: (this.options.clientSecret || '').substr(0, 6) + '...',
                refresh_token: (this.options.refreshToken || '').substr(0, 6) + '...',
                grant_type: 'refresh_token'
            };
        }

        Object.keys(this.options.customParams).forEach(key => {
            urlOptions[key] = this.options.customParams[key];
            loggedUrlOptions[key] = this.options.customParams[key];
        });

        this.logger.debug(
            {
                tnx: 'OAUTH2',
                user: this.options.user,
                action: 'generate'
            },
            'Requesting token using: %s',
            JSON.stringify(loggedUrlOptions)
        );

        this.postRequest(this.options.accessUrl, urlOptions, this.options, (error, body) => {
            let data;

            if (error) {
                return callback(error);
            }

            try {
                data = JSON.parse(body.toString());
            } catch (E) {
                return callback(E);
            }

            if (!data || typeof data !== 'object') {
                this.logger.debug(
                    {
                        tnx: 'OAUTH2',
                        user: this.options.user,
                        action: 'post'
                    },
                    'Response: %s',
                    (body || '').toString()
                );
                return callback(new Error('Invalid authentication response'));
            }

            let logData = {};
            Object.keys(data).forEach(key => {
                if (key !== 'access_token') {
                    logData[key] = data[key];
                } else {
                    logData[key] = (data[key] || '').toString().substr(0, 6) + '...';
                }
            });

            this.logger.debug(
                {
                    tnx: 'OAUTH2',
                    user: this.options.user,
                    action: 'post'
                },
                'Response: %s',
                JSON.stringify(logData)
            );

            if (data.error) {
                // Error Response : https://tools.ietf.org/html/rfc6749#section-5.2
                let errorMessage = data.error;
                if (data.error_description) {
                    errorMessage += ': ' + data.error_description;
                }
                if (data.error_uri) {
                    errorMessage += ' (' + data.error_uri + ')';
                }
                return callback(new Error(errorMessage));
            }

            if (data.access_token) {
                this.updateToken(data.access_token, data.expires_in);
                return callback(null, this.accessToken);
            }

            return callback(new Error('No access token'));
        });
    }

    /**
     * Converts an access_token and user id into a base64 encoded XOAuth2 token
     *
     * @param {String} [accessToken] Access token string
     * @return {String} Base64 encoded token for IMAP or SMTP login
     */
    buildXOAuth2Token(accessToken) {
        let authData = ['user=' + (this.options.user || ''), 'auth=Bearer ' + (accessToken || this.accessToken), '', ''];
        return Buffer.from(authData.join('\x01'), 'utf-8').toString('base64');
    }

    /**
     * Custom POST request handler.
     * This is only needed to keep paths short in Windows – usually this module
     * is a dependency of a dependency and if it tries to require something
     * like the request module the paths get way too long to handle for Windows.
     * As we do only a simple POST request we do not actually require complicated
     * logic support (no redirects, no nothing) anyway.
     *
     * @param {String} url Url to POST to
     * @param {String|Buffer} payload Payload to POST
     * @param {Function} callback Callback function with (err, buff)
     */
    postRequest(url, payload, params, callback) {
        let returned = false;

        let chunks = [];
        let chunklen = 0;

        let req = fetch(url, {
            method: 'post',
            headers: params.customHeaders,
            body: payload,
            allowErrorResponse: true
        });

        req.on('readable', () => {
            let chunk;
            while ((chunk = req.read()) !== null) {
                chunks.push(chunk);
                chunklen += chunk.length;
            }
        });

        req.once('error', err => {
            if (returned) {
                return;
            }
            returned = true;
            return callback(err);
        });

        req.once('end', () => {
            if (returned) {
                return;
            }
            returned = true;
            return callback(null, Buffer.concat(chunks, chunklen));
        });
    }

    /**
     * Encodes a buffer or a string into Base64url format
     *
     * @param {Buffer|String} data The data to convert
     * @return {String} The encoded string
     */
    toBase64URL(data) {
        if (typeof data === 'string') {
            data = Buffer.from(data);
        }

        return data
            .toString('base64')
            .replace(/[=]+/g, '') // remove '='s
            .replace(/\+/g, '-') // '+' → '-'
            .replace(/\//g, '_'); // '/' → '_'
    }

    /**
     * Creates a JSON Web Token signed with RS256 (SHA256 + RSA)
     *
     * @param {Object} payload The payload to include in the generated token
     * @return {String} The generated and signed token
     */
    jwtSignRS256(payload) {
        payload = ['{"alg":"RS256","typ":"JWT"}', JSON.stringify(payload)].map(val => this.toBase64URL(val)).join('.');
        let signature = crypto.createSign('RSA-SHA256').update(payload).sign(this.options.privateKey);
        return payload + '.' + this.toBase64URL(signature);
    }
}

module.exports = XOAuth2;


/***/ }),

/***/ 1258:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

/**
* upath http://github.com/anodynos/upath/
*
* A proxy to `path`, replacing `\` with `/` for all results (supports UNC paths) & new methods to normalize & join keeping leading `./` and add, change, default, trim file extensions.
* Version 2.0.1 - Compiled on 2020-11-07 16:59:47
* Repository git://github.com/anodynos/upath
* Copyright(c) 2020 Angelos Pikoulas <agelos.pikoulas@gmail.com>
* License MIT
*/

// Generated by uRequire v0.7.0-beta.33 target: 'lib' template: 'nodejs'


var VERSION = '2.0.1'; // injected by urequire-rc-inject-version

var extraFn, extraFunctions, isFunction, isString, isValidExt, name, path, propName, propValue, toUnix, upath, slice = [].slice, indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item)
        return i;
    }
    return -1;
  }, hasProp = {}.hasOwnProperty;
path = __nccwpck_require__(1017);
isFunction = function (val) {
  return typeof val === "function";
};
isString = function (val) {
  return typeof val === "string" || !!val && typeof val === "object" && Object.prototype.toString.call(val) === "[object String]";
};
upath = exports;
upath.VERSION = typeof VERSION !== "undefined" && VERSION !== null ? VERSION : "NO-VERSION";
toUnix = function (p) {
  p = p.replace(/\\/g, "/");
  p = p.replace(/(?<!^)\/+/g, "/");
  return p;
};
for (propName in path) {
  propValue = path[propName];
  if (isFunction(propValue)) {
    upath[propName] = function (propName) {
      return function () {
        var args, result;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        args = args.map(function (p) {
          if (isString(p)) {
            return toUnix(p);
          } else {
            return p;
          }
        });
        result = path[propName].apply(path, args);
        if (isString(result)) {
          return toUnix(result);
        } else {
          return result;
        }
      };
    }(propName);
  } else {
    upath[propName] = propValue;
  }
}
upath.sep = "/";
extraFunctions = {
  toUnix: toUnix,
  normalizeSafe: function (p) {
    var result;
    p = toUnix(p);
    result = upath.normalize(p);
    if (p.startsWith("./") && !result.startsWith("./") && !result.startsWith("..")) {
      result = "./" + result;
    } else if (p.startsWith("//") && !result.startsWith("//")) {
      if (p.startsWith("//./")) {
        result = "//." + result;
      } else {
        result = "/" + result;
      }
    }
    return result;
  },
  normalizeTrim: function (p) {
    p = upath.normalizeSafe(p);
    if (p.endsWith("/")) {
      return p.slice(0, +(p.length - 2) + 1 || 9000000000);
    } else {
      return p;
    }
  },
  joinSafe: function () {
    var p, p0, result;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    result = upath.join.apply(null, p);
    if (p.length > 0) {
      p0 = toUnix(p[0]);
      if (p0.startsWith("./") && !result.startsWith("./") && !result.startsWith("..")) {
        result = "./" + result;
      } else if (p0.startsWith("//") && !result.startsWith("//")) {
        if (p0.startsWith("//./")) {
          result = "//." + result;
        } else {
          result = "/" + result;
        }
      }
    }
    return result;
  },
  addExt: function (file, ext) {
    if (!ext) {
      return file;
    } else {
      if (ext[0] !== ".") {
        ext = "." + ext;
      }
      return file + (file.endsWith(ext) ? "" : ext);
    }
  },
  trimExt: function (filename, ignoreExts, maxSize) {
    var oldExt;
    if (maxSize == null) {
      maxSize = 7;
    }
    oldExt = upath.extname(filename);
    if (isValidExt(oldExt, ignoreExts, maxSize)) {
      return filename.slice(0, +(filename.length - oldExt.length - 1) + 1 || 9000000000);
    } else {
      return filename;
    }
  },
  removeExt: function (filename, ext) {
    if (!ext) {
      return filename;
    } else {
      ext = ext[0] === "." ? ext : "." + ext;
      if (upath.extname(filename) === ext) {
        return upath.trimExt(filename, [], ext.length);
      } else {
        return filename;
      }
    }
  },
  changeExt: function (filename, ext, ignoreExts, maxSize) {
    if (maxSize == null) {
      maxSize = 7;
    }
    return upath.trimExt(filename, ignoreExts, maxSize) + (!ext ? "" : ext[0] === "." ? ext : "." + ext);
  },
  defaultExt: function (filename, ext, ignoreExts, maxSize) {
    var oldExt;
    if (maxSize == null) {
      maxSize = 7;
    }
    oldExt = upath.extname(filename);
    if (isValidExt(oldExt, ignoreExts, maxSize)) {
      return filename;
    } else {
      return upath.addExt(filename, ext);
    }
  }
};
isValidExt = function (ext, ignoreExts, maxSize) {
  if (ignoreExts == null) {
    ignoreExts = [];
  }
  return ext && ext.length <= maxSize && indexOf.call(ignoreExts.map(function (e) {
    return (e && e[0] !== "." ? "." : "") + e;
  }), ext) < 0;
};
for (name in extraFunctions) {
  if (!hasProp.call(extraFunctions, name))
    continue;
  extraFn = extraFunctions[name];
  if (upath[name] !== void 0) {
    throw new Error("path." + name + " already exists.");
  } else {
    upath[name] = extraFn;
  }
}

;

/***/ }),

/***/ 2081:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 6113:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 9523:
/***/ ((module) => {

"use strict";
module.exports = require("dns");

/***/ }),

/***/ 2361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 7147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 3685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 5687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 1808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 2037:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 1017:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 5477:
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ 2781:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 4404:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 7310:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 3837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 9796:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ 3765:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"application/1d-interleaved-parityfec":{"source":"iana"},"application/3gpdash-qoe-report+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/3gpp-ims+xml":{"source":"iana","compressible":true},"application/3gpphal+json":{"source":"iana","compressible":true},"application/3gpphalforms+json":{"source":"iana","compressible":true},"application/a2l":{"source":"iana"},"application/ace+cbor":{"source":"iana"},"application/activemessage":{"source":"iana"},"application/activity+json":{"source":"iana","compressible":true},"application/alto-costmap+json":{"source":"iana","compressible":true},"application/alto-costmapfilter+json":{"source":"iana","compressible":true},"application/alto-directory+json":{"source":"iana","compressible":true},"application/alto-endpointcost+json":{"source":"iana","compressible":true},"application/alto-endpointcostparams+json":{"source":"iana","compressible":true},"application/alto-endpointprop+json":{"source":"iana","compressible":true},"application/alto-endpointpropparams+json":{"source":"iana","compressible":true},"application/alto-error+json":{"source":"iana","compressible":true},"application/alto-networkmap+json":{"source":"iana","compressible":true},"application/alto-networkmapfilter+json":{"source":"iana","compressible":true},"application/alto-updatestreamcontrol+json":{"source":"iana","compressible":true},"application/alto-updatestreamparams+json":{"source":"iana","compressible":true},"application/aml":{"source":"iana"},"application/andrew-inset":{"source":"iana","extensions":["ez"]},"application/applefile":{"source":"iana"},"application/applixware":{"source":"apache","extensions":["aw"]},"application/at+jwt":{"source":"iana"},"application/atf":{"source":"iana"},"application/atfx":{"source":"iana"},"application/atom+xml":{"source":"iana","compressible":true,"extensions":["atom"]},"application/atomcat+xml":{"source":"iana","compressible":true,"extensions":["atomcat"]},"application/atomdeleted+xml":{"source":"iana","compressible":true,"extensions":["atomdeleted"]},"application/atomicmail":{"source":"iana"},"application/atomsvc+xml":{"source":"iana","compressible":true,"extensions":["atomsvc"]},"application/atsc-dwd+xml":{"source":"iana","compressible":true,"extensions":["dwd"]},"application/atsc-dynamic-event-message":{"source":"iana"},"application/atsc-held+xml":{"source":"iana","compressible":true,"extensions":["held"]},"application/atsc-rdt+json":{"source":"iana","compressible":true},"application/atsc-rsat+xml":{"source":"iana","compressible":true,"extensions":["rsat"]},"application/atxml":{"source":"iana"},"application/auth-policy+xml":{"source":"iana","compressible":true},"application/bacnet-xdd+zip":{"source":"iana","compressible":false},"application/batch-smtp":{"source":"iana"},"application/bdoc":{"compressible":false,"extensions":["bdoc"]},"application/beep+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/calendar+json":{"source":"iana","compressible":true},"application/calendar+xml":{"source":"iana","compressible":true,"extensions":["xcs"]},"application/call-completion":{"source":"iana"},"application/cals-1840":{"source":"iana"},"application/captive+json":{"source":"iana","compressible":true},"application/cbor":{"source":"iana"},"application/cbor-seq":{"source":"iana"},"application/cccex":{"source":"iana"},"application/ccmp+xml":{"source":"iana","compressible":true},"application/ccxml+xml":{"source":"iana","compressible":true,"extensions":["ccxml"]},"application/cdfx+xml":{"source":"iana","compressible":true,"extensions":["cdfx"]},"application/cdmi-capability":{"source":"iana","extensions":["cdmia"]},"application/cdmi-container":{"source":"iana","extensions":["cdmic"]},"application/cdmi-domain":{"source":"iana","extensions":["cdmid"]},"application/cdmi-object":{"source":"iana","extensions":["cdmio"]},"application/cdmi-queue":{"source":"iana","extensions":["cdmiq"]},"application/cdni":{"source":"iana"},"application/cea":{"source":"iana"},"application/cea-2018+xml":{"source":"iana","compressible":true},"application/cellml+xml":{"source":"iana","compressible":true},"application/cfw":{"source":"iana"},"application/clr":{"source":"iana"},"application/clue+xml":{"source":"iana","compressible":true},"application/clue_info+xml":{"source":"iana","compressible":true},"application/cms":{"source":"iana"},"application/cnrp+xml":{"source":"iana","compressible":true},"application/coap-group+json":{"source":"iana","compressible":true},"application/coap-payload":{"source":"iana"},"application/commonground":{"source":"iana"},"application/conference-info+xml":{"source":"iana","compressible":true},"application/cose":{"source":"iana"},"application/cose-key":{"source":"iana"},"application/cose-key-set":{"source":"iana"},"application/cpl+xml":{"source":"iana","compressible":true},"application/csrattrs":{"source":"iana"},"application/csta+xml":{"source":"iana","compressible":true},"application/cstadata+xml":{"source":"iana","compressible":true},"application/csvm+json":{"source":"iana","compressible":true},"application/cu-seeme":{"source":"apache","extensions":["cu"]},"application/cwt":{"source":"iana"},"application/cybercash":{"source":"iana"},"application/dart":{"compressible":true},"application/dash+xml":{"source":"iana","compressible":true,"extensions":["mpd"]},"application/dashdelta":{"source":"iana"},"application/davmount+xml":{"source":"iana","compressible":true,"extensions":["davmount"]},"application/dca-rft":{"source":"iana"},"application/dcd":{"source":"iana"},"application/dec-dx":{"source":"iana"},"application/dialog-info+xml":{"source":"iana","compressible":true},"application/dicom":{"source":"iana"},"application/dicom+json":{"source":"iana","compressible":true},"application/dicom+xml":{"source":"iana","compressible":true},"application/dii":{"source":"iana"},"application/dit":{"source":"iana"},"application/dns":{"source":"iana"},"application/dns+json":{"source":"iana","compressible":true},"application/dns-message":{"source":"iana"},"application/docbook+xml":{"source":"apache","compressible":true,"extensions":["dbk"]},"application/dots+cbor":{"source":"iana"},"application/dskpp+xml":{"source":"iana","compressible":true},"application/dssc+der":{"source":"iana","extensions":["dssc"]},"application/dssc+xml":{"source":"iana","compressible":true,"extensions":["xdssc"]},"application/dvcs":{"source":"iana"},"application/ecmascript":{"source":"iana","compressible":true,"extensions":["es","ecma"]},"application/edi-consent":{"source":"iana"},"application/edi-x12":{"source":"iana","compressible":false},"application/edifact":{"source":"iana","compressible":false},"application/efi":{"source":"iana"},"application/elm+json":{"source":"iana","charset":"UTF-8","compressible":true},"application/elm+xml":{"source":"iana","compressible":true},"application/emergencycalldata.cap+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/emergencycalldata.comment+xml":{"source":"iana","compressible":true},"application/emergencycalldata.control+xml":{"source":"iana","compressible":true},"application/emergencycalldata.deviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.ecall.msd":{"source":"iana"},"application/emergencycalldata.providerinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.serviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.subscriberinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.veds+xml":{"source":"iana","compressible":true},"application/emma+xml":{"source":"iana","compressible":true,"extensions":["emma"]},"application/emotionml+xml":{"source":"iana","compressible":true,"extensions":["emotionml"]},"application/encaprtp":{"source":"iana"},"application/epp+xml":{"source":"iana","compressible":true},"application/epub+zip":{"source":"iana","compressible":false,"extensions":["epub"]},"application/eshop":{"source":"iana"},"application/exi":{"source":"iana","extensions":["exi"]},"application/expect-ct-report+json":{"source":"iana","compressible":true},"application/express":{"source":"iana","extensions":["exp"]},"application/fastinfoset":{"source":"iana"},"application/fastsoap":{"source":"iana"},"application/fdt+xml":{"source":"iana","compressible":true,"extensions":["fdt"]},"application/fhir+json":{"source":"iana","charset":"UTF-8","compressible":true},"application/fhir+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/fido.trusted-apps+json":{"compressible":true},"application/fits":{"source":"iana"},"application/flexfec":{"source":"iana"},"application/font-sfnt":{"source":"iana"},"application/font-tdpfr":{"source":"iana","extensions":["pfr"]},"application/font-woff":{"source":"iana","compressible":false},"application/framework-attributes+xml":{"source":"iana","compressible":true},"application/geo+json":{"source":"iana","compressible":true,"extensions":["geojson"]},"application/geo+json-seq":{"source":"iana"},"application/geopackage+sqlite3":{"source":"iana"},"application/geoxacml+xml":{"source":"iana","compressible":true},"application/gltf-buffer":{"source":"iana"},"application/gml+xml":{"source":"iana","compressible":true,"extensions":["gml"]},"application/gpx+xml":{"source":"apache","compressible":true,"extensions":["gpx"]},"application/gxf":{"source":"apache","extensions":["gxf"]},"application/gzip":{"source":"iana","compressible":false,"extensions":["gz"]},"application/h224":{"source":"iana"},"application/held+xml":{"source":"iana","compressible":true},"application/hjson":{"extensions":["hjson"]},"application/http":{"source":"iana"},"application/hyperstudio":{"source":"iana","extensions":["stk"]},"application/ibe-key-request+xml":{"source":"iana","compressible":true},"application/ibe-pkg-reply+xml":{"source":"iana","compressible":true},"application/ibe-pp-data":{"source":"iana"},"application/iges":{"source":"iana"},"application/im-iscomposing+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/index":{"source":"iana"},"application/index.cmd":{"source":"iana"},"application/index.obj":{"source":"iana"},"application/index.response":{"source":"iana"},"application/index.vnd":{"source":"iana"},"application/inkml+xml":{"source":"iana","compressible":true,"extensions":["ink","inkml"]},"application/iotp":{"source":"iana"},"application/ipfix":{"source":"iana","extensions":["ipfix"]},"application/ipp":{"source":"iana"},"application/isup":{"source":"iana"},"application/its+xml":{"source":"iana","compressible":true,"extensions":["its"]},"application/java-archive":{"source":"apache","compressible":false,"extensions":["jar","war","ear"]},"application/java-serialized-object":{"source":"apache","compressible":false,"extensions":["ser"]},"application/java-vm":{"source":"apache","compressible":false,"extensions":["class"]},"application/javascript":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["js","mjs"]},"application/jf2feed+json":{"source":"iana","compressible":true},"application/jose":{"source":"iana"},"application/jose+json":{"source":"iana","compressible":true},"application/jrd+json":{"source":"iana","compressible":true},"application/jscalendar+json":{"source":"iana","compressible":true},"application/json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["json","map"]},"application/json-patch+json":{"source":"iana","compressible":true},"application/json-seq":{"source":"iana"},"application/json5":{"extensions":["json5"]},"application/jsonml+json":{"source":"apache","compressible":true,"extensions":["jsonml"]},"application/jwk+json":{"source":"iana","compressible":true},"application/jwk-set+json":{"source":"iana","compressible":true},"application/jwt":{"source":"iana"},"application/kpml-request+xml":{"source":"iana","compressible":true},"application/kpml-response+xml":{"source":"iana","compressible":true},"application/ld+json":{"source":"iana","compressible":true,"extensions":["jsonld"]},"application/lgr+xml":{"source":"iana","compressible":true,"extensions":["lgr"]},"application/link-format":{"source":"iana"},"application/load-control+xml":{"source":"iana","compressible":true},"application/lost+xml":{"source":"iana","compressible":true,"extensions":["lostxml"]},"application/lostsync+xml":{"source":"iana","compressible":true},"application/lpf+zip":{"source":"iana","compressible":false},"application/lxf":{"source":"iana"},"application/mac-binhex40":{"source":"iana","extensions":["hqx"]},"application/mac-compactpro":{"source":"apache","extensions":["cpt"]},"application/macwriteii":{"source":"iana"},"application/mads+xml":{"source":"iana","compressible":true,"extensions":["mads"]},"application/manifest+json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["webmanifest"]},"application/marc":{"source":"iana","extensions":["mrc"]},"application/marcxml+xml":{"source":"iana","compressible":true,"extensions":["mrcx"]},"application/mathematica":{"source":"iana","extensions":["ma","nb","mb"]},"application/mathml+xml":{"source":"iana","compressible":true,"extensions":["mathml"]},"application/mathml-content+xml":{"source":"iana","compressible":true},"application/mathml-presentation+xml":{"source":"iana","compressible":true},"application/mbms-associated-procedure-description+xml":{"source":"iana","compressible":true},"application/mbms-deregister+xml":{"source":"iana","compressible":true},"application/mbms-envelope+xml":{"source":"iana","compressible":true},"application/mbms-msk+xml":{"source":"iana","compressible":true},"application/mbms-msk-response+xml":{"source":"iana","compressible":true},"application/mbms-protection-description+xml":{"source":"iana","compressible":true},"application/mbms-reception-report+xml":{"source":"iana","compressible":true},"application/mbms-register+xml":{"source":"iana","compressible":true},"application/mbms-register-response+xml":{"source":"iana","compressible":true},"application/mbms-schedule+xml":{"source":"iana","compressible":true},"application/mbms-user-service-description+xml":{"source":"iana","compressible":true},"application/mbox":{"source":"iana","extensions":["mbox"]},"application/media-policy-dataset+xml":{"source":"iana","compressible":true},"application/media_control+xml":{"source":"iana","compressible":true},"application/mediaservercontrol+xml":{"source":"iana","compressible":true,"extensions":["mscml"]},"application/merge-patch+json":{"source":"iana","compressible":true},"application/metalink+xml":{"source":"apache","compressible":true,"extensions":["metalink"]},"application/metalink4+xml":{"source":"iana","compressible":true,"extensions":["meta4"]},"application/mets+xml":{"source":"iana","compressible":true,"extensions":["mets"]},"application/mf4":{"source":"iana"},"application/mikey":{"source":"iana"},"application/mipc":{"source":"iana"},"application/missing-blocks+cbor-seq":{"source":"iana"},"application/mmt-aei+xml":{"source":"iana","compressible":true,"extensions":["maei"]},"application/mmt-usd+xml":{"source":"iana","compressible":true,"extensions":["musd"]},"application/mods+xml":{"source":"iana","compressible":true,"extensions":["mods"]},"application/moss-keys":{"source":"iana"},"application/moss-signature":{"source":"iana"},"application/mosskey-data":{"source":"iana"},"application/mosskey-request":{"source":"iana"},"application/mp21":{"source":"iana","extensions":["m21","mp21"]},"application/mp4":{"source":"iana","extensions":["mp4s","m4p"]},"application/mpeg4-generic":{"source":"iana"},"application/mpeg4-iod":{"source":"iana"},"application/mpeg4-iod-xmt":{"source":"iana"},"application/mrb-consumer+xml":{"source":"iana","compressible":true},"application/mrb-publish+xml":{"source":"iana","compressible":true},"application/msc-ivr+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/msc-mixer+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/msword":{"source":"iana","compressible":false,"extensions":["doc","dot"]},"application/mud+json":{"source":"iana","compressible":true},"application/multipart-core":{"source":"iana"},"application/mxf":{"source":"iana","extensions":["mxf"]},"application/n-quads":{"source":"iana","extensions":["nq"]},"application/n-triples":{"source":"iana","extensions":["nt"]},"application/nasdata":{"source":"iana"},"application/news-checkgroups":{"source":"iana","charset":"US-ASCII"},"application/news-groupinfo":{"source":"iana","charset":"US-ASCII"},"application/news-transmission":{"source":"iana"},"application/nlsml+xml":{"source":"iana","compressible":true},"application/node":{"source":"iana","extensions":["cjs"]},"application/nss":{"source":"iana"},"application/oauth-authz-req+jwt":{"source":"iana"},"application/ocsp-request":{"source":"iana"},"application/ocsp-response":{"source":"iana"},"application/octet-stream":{"source":"iana","compressible":false,"extensions":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"]},"application/oda":{"source":"iana","extensions":["oda"]},"application/odm+xml":{"source":"iana","compressible":true},"application/odx":{"source":"iana"},"application/oebps-package+xml":{"source":"iana","compressible":true,"extensions":["opf"]},"application/ogg":{"source":"iana","compressible":false,"extensions":["ogx"]},"application/omdoc+xml":{"source":"apache","compressible":true,"extensions":["omdoc"]},"application/onenote":{"source":"apache","extensions":["onetoc","onetoc2","onetmp","onepkg"]},"application/opc-nodeset+xml":{"source":"iana","compressible":true},"application/oscore":{"source":"iana"},"application/oxps":{"source":"iana","extensions":["oxps"]},"application/p21":{"source":"iana"},"application/p21+zip":{"source":"iana","compressible":false},"application/p2p-overlay+xml":{"source":"iana","compressible":true,"extensions":["relo"]},"application/parityfec":{"source":"iana"},"application/passport":{"source":"iana"},"application/patch-ops-error+xml":{"source":"iana","compressible":true,"extensions":["xer"]},"application/pdf":{"source":"iana","compressible":false,"extensions":["pdf"]},"application/pdx":{"source":"iana"},"application/pem-certificate-chain":{"source":"iana"},"application/pgp-encrypted":{"source":"iana","compressible":false,"extensions":["pgp"]},"application/pgp-keys":{"source":"iana"},"application/pgp-signature":{"source":"iana","extensions":["asc","sig"]},"application/pics-rules":{"source":"apache","extensions":["prf"]},"application/pidf+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/pidf-diff+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/pkcs10":{"source":"iana","extensions":["p10"]},"application/pkcs12":{"source":"iana"},"application/pkcs7-mime":{"source":"iana","extensions":["p7m","p7c"]},"application/pkcs7-signature":{"source":"iana","extensions":["p7s"]},"application/pkcs8":{"source":"iana","extensions":["p8"]},"application/pkcs8-encrypted":{"source":"iana"},"application/pkix-attr-cert":{"source":"iana","extensions":["ac"]},"application/pkix-cert":{"source":"iana","extensions":["cer"]},"application/pkix-crl":{"source":"iana","extensions":["crl"]},"application/pkix-pkipath":{"source":"iana","extensions":["pkipath"]},"application/pkixcmp":{"source":"iana","extensions":["pki"]},"application/pls+xml":{"source":"iana","compressible":true,"extensions":["pls"]},"application/poc-settings+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/postscript":{"source":"iana","compressible":true,"extensions":["ai","eps","ps"]},"application/ppsp-tracker+json":{"source":"iana","compressible":true},"application/problem+json":{"source":"iana","compressible":true},"application/problem+xml":{"source":"iana","compressible":true},"application/provenance+xml":{"source":"iana","compressible":true,"extensions":["provx"]},"application/prs.alvestrand.titrax-sheet":{"source":"iana"},"application/prs.cww":{"source":"iana","extensions":["cww"]},"application/prs.cyn":{"source":"iana","charset":"7-BIT"},"application/prs.hpub+zip":{"source":"iana","compressible":false},"application/prs.nprend":{"source":"iana"},"application/prs.plucker":{"source":"iana"},"application/prs.rdf-xml-crypt":{"source":"iana"},"application/prs.xsf+xml":{"source":"iana","compressible":true},"application/pskc+xml":{"source":"iana","compressible":true,"extensions":["pskcxml"]},"application/pvd+json":{"source":"iana","compressible":true},"application/qsig":{"source":"iana"},"application/raml+yaml":{"compressible":true,"extensions":["raml"]},"application/raptorfec":{"source":"iana"},"application/rdap+json":{"source":"iana","compressible":true},"application/rdf+xml":{"source":"iana","compressible":true,"extensions":["rdf","owl"]},"application/reginfo+xml":{"source":"iana","compressible":true,"extensions":["rif"]},"application/relax-ng-compact-syntax":{"source":"iana","extensions":["rnc"]},"application/remote-printing":{"source":"iana"},"application/reputon+json":{"source":"iana","compressible":true},"application/resource-lists+xml":{"source":"iana","compressible":true,"extensions":["rl"]},"application/resource-lists-diff+xml":{"source":"iana","compressible":true,"extensions":["rld"]},"application/rfc+xml":{"source":"iana","compressible":true},"application/riscos":{"source":"iana"},"application/rlmi+xml":{"source":"iana","compressible":true},"application/rls-services+xml":{"source":"iana","compressible":true,"extensions":["rs"]},"application/route-apd+xml":{"source":"iana","compressible":true,"extensions":["rapd"]},"application/route-s-tsid+xml":{"source":"iana","compressible":true,"extensions":["sls"]},"application/route-usd+xml":{"source":"iana","compressible":true,"extensions":["rusd"]},"application/rpki-ghostbusters":{"source":"iana","extensions":["gbr"]},"application/rpki-manifest":{"source":"iana","extensions":["mft"]},"application/rpki-publication":{"source":"iana"},"application/rpki-roa":{"source":"iana","extensions":["roa"]},"application/rpki-updown":{"source":"iana"},"application/rsd+xml":{"source":"apache","compressible":true,"extensions":["rsd"]},"application/rss+xml":{"source":"apache","compressible":true,"extensions":["rss"]},"application/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"application/rtploopback":{"source":"iana"},"application/rtx":{"source":"iana"},"application/samlassertion+xml":{"source":"iana","compressible":true},"application/samlmetadata+xml":{"source":"iana","compressible":true},"application/sarif+json":{"source":"iana","compressible":true},"application/sarif-external-properties+json":{"source":"iana","compressible":true},"application/sbe":{"source":"iana"},"application/sbml+xml":{"source":"iana","compressible":true,"extensions":["sbml"]},"application/scaip+xml":{"source":"iana","compressible":true},"application/scim+json":{"source":"iana","compressible":true},"application/scvp-cv-request":{"source":"iana","extensions":["scq"]},"application/scvp-cv-response":{"source":"iana","extensions":["scs"]},"application/scvp-vp-request":{"source":"iana","extensions":["spq"]},"application/scvp-vp-response":{"source":"iana","extensions":["spp"]},"application/sdp":{"source":"iana","extensions":["sdp"]},"application/secevent+jwt":{"source":"iana"},"application/senml+cbor":{"source":"iana"},"application/senml+json":{"source":"iana","compressible":true},"application/senml+xml":{"source":"iana","compressible":true,"extensions":["senmlx"]},"application/senml-etch+cbor":{"source":"iana"},"application/senml-etch+json":{"source":"iana","compressible":true},"application/senml-exi":{"source":"iana"},"application/sensml+cbor":{"source":"iana"},"application/sensml+json":{"source":"iana","compressible":true},"application/sensml+xml":{"source":"iana","compressible":true,"extensions":["sensmlx"]},"application/sensml-exi":{"source":"iana"},"application/sep+xml":{"source":"iana","compressible":true},"application/sep-exi":{"source":"iana"},"application/session-info":{"source":"iana"},"application/set-payment":{"source":"iana"},"application/set-payment-initiation":{"source":"iana","extensions":["setpay"]},"application/set-registration":{"source":"iana"},"application/set-registration-initiation":{"source":"iana","extensions":["setreg"]},"application/sgml":{"source":"iana"},"application/sgml-open-catalog":{"source":"iana"},"application/shf+xml":{"source":"iana","compressible":true,"extensions":["shf"]},"application/sieve":{"source":"iana","extensions":["siv","sieve"]},"application/simple-filter+xml":{"source":"iana","compressible":true},"application/simple-message-summary":{"source":"iana"},"application/simplesymbolcontainer":{"source":"iana"},"application/sipc":{"source":"iana"},"application/slate":{"source":"iana"},"application/smil":{"source":"iana"},"application/smil+xml":{"source":"iana","compressible":true,"extensions":["smi","smil"]},"application/smpte336m":{"source":"iana"},"application/soap+fastinfoset":{"source":"iana"},"application/soap+xml":{"source":"iana","compressible":true},"application/sparql-query":{"source":"iana","extensions":["rq"]},"application/sparql-results+xml":{"source":"iana","compressible":true,"extensions":["srx"]},"application/spirits-event+xml":{"source":"iana","compressible":true},"application/sql":{"source":"iana"},"application/srgs":{"source":"iana","extensions":["gram"]},"application/srgs+xml":{"source":"iana","compressible":true,"extensions":["grxml"]},"application/sru+xml":{"source":"iana","compressible":true,"extensions":["sru"]},"application/ssdl+xml":{"source":"apache","compressible":true,"extensions":["ssdl"]},"application/ssml+xml":{"source":"iana","compressible":true,"extensions":["ssml"]},"application/stix+json":{"source":"iana","compressible":true},"application/swid+xml":{"source":"iana","compressible":true,"extensions":["swidtag"]},"application/tamp-apex-update":{"source":"iana"},"application/tamp-apex-update-confirm":{"source":"iana"},"application/tamp-community-update":{"source":"iana"},"application/tamp-community-update-confirm":{"source":"iana"},"application/tamp-error":{"source":"iana"},"application/tamp-sequence-adjust":{"source":"iana"},"application/tamp-sequence-adjust-confirm":{"source":"iana"},"application/tamp-status-query":{"source":"iana"},"application/tamp-status-response":{"source":"iana"},"application/tamp-update":{"source":"iana"},"application/tamp-update-confirm":{"source":"iana"},"application/tar":{"compressible":true},"application/taxii+json":{"source":"iana","compressible":true},"application/td+json":{"source":"iana","compressible":true},"application/tei+xml":{"source":"iana","compressible":true,"extensions":["tei","teicorpus"]},"application/tetra_isi":{"source":"iana"},"application/thraud+xml":{"source":"iana","compressible":true,"extensions":["tfi"]},"application/timestamp-query":{"source":"iana"},"application/timestamp-reply":{"source":"iana"},"application/timestamped-data":{"source":"iana","extensions":["tsd"]},"application/tlsrpt+gzip":{"source":"iana"},"application/tlsrpt+json":{"source":"iana","compressible":true},"application/tnauthlist":{"source":"iana"},"application/token-introspection+jwt":{"source":"iana"},"application/toml":{"compressible":true,"extensions":["toml"]},"application/trickle-ice-sdpfrag":{"source":"iana"},"application/trig":{"source":"iana","extensions":["trig"]},"application/ttml+xml":{"source":"iana","compressible":true,"extensions":["ttml"]},"application/tve-trigger":{"source":"iana"},"application/tzif":{"source":"iana"},"application/tzif-leap":{"source":"iana"},"application/ubjson":{"compressible":false,"extensions":["ubj"]},"application/ulpfec":{"source":"iana"},"application/urc-grpsheet+xml":{"source":"iana","compressible":true},"application/urc-ressheet+xml":{"source":"iana","compressible":true,"extensions":["rsheet"]},"application/urc-targetdesc+xml":{"source":"iana","compressible":true,"extensions":["td"]},"application/urc-uisocketdesc+xml":{"source":"iana","compressible":true},"application/vcard+json":{"source":"iana","compressible":true},"application/vcard+xml":{"source":"iana","compressible":true},"application/vemmi":{"source":"iana"},"application/vividence.scriptfile":{"source":"apache"},"application/vnd.1000minds.decision-model+xml":{"source":"iana","compressible":true,"extensions":["1km"]},"application/vnd.3gpp-prose+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-prose-pc3ch+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-v2x-local-service-information":{"source":"iana"},"application/vnd.3gpp.5gnas":{"source":"iana"},"application/vnd.3gpp.access-transfer-events+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.bsf+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.gmop+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.gtpc":{"source":"iana"},"application/vnd.3gpp.interworking-data":{"source":"iana"},"application/vnd.3gpp.lpp":{"source":"iana"},"application/vnd.3gpp.mc-signalling-ear":{"source":"iana"},"application/vnd.3gpp.mcdata-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-payload":{"source":"iana"},"application/vnd.3gpp.mcdata-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-signalling":{"source":"iana"},"application/vnd.3gpp.mcdata-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-floor-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-signed+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-init-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-transmission-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mid-call+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.ngap":{"source":"iana"},"application/vnd.3gpp.pfcp":{"source":"iana"},"application/vnd.3gpp.pic-bw-large":{"source":"iana","extensions":["plb"]},"application/vnd.3gpp.pic-bw-small":{"source":"iana","extensions":["psb"]},"application/vnd.3gpp.pic-bw-var":{"source":"iana","extensions":["pvb"]},"application/vnd.3gpp.s1ap":{"source":"iana"},"application/vnd.3gpp.sms":{"source":"iana"},"application/vnd.3gpp.sms+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-ext+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.state-and-event-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.ussd+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.bcmcsinfo+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.sms":{"source":"iana"},"application/vnd.3gpp2.tcap":{"source":"iana","extensions":["tcap"]},"application/vnd.3lightssoftware.imagescal":{"source":"iana"},"application/vnd.3m.post-it-notes":{"source":"iana","extensions":["pwn"]},"application/vnd.accpac.simply.aso":{"source":"iana","extensions":["aso"]},"application/vnd.accpac.simply.imp":{"source":"iana","extensions":["imp"]},"application/vnd.acucobol":{"source":"iana","extensions":["acu"]},"application/vnd.acucorp":{"source":"iana","extensions":["atc","acutc"]},"application/vnd.adobe.air-application-installer-package+zip":{"source":"apache","compressible":false,"extensions":["air"]},"application/vnd.adobe.flash.movie":{"source":"iana"},"application/vnd.adobe.formscentral.fcdt":{"source":"iana","extensions":["fcdt"]},"application/vnd.adobe.fxp":{"source":"iana","extensions":["fxp","fxpl"]},"application/vnd.adobe.partial-upload":{"source":"iana"},"application/vnd.adobe.xdp+xml":{"source":"iana","compressible":true,"extensions":["xdp"]},"application/vnd.adobe.xfdf":{"source":"iana","extensions":["xfdf"]},"application/vnd.aether.imp":{"source":"iana"},"application/vnd.afpc.afplinedata":{"source":"iana"},"application/vnd.afpc.afplinedata-pagedef":{"source":"iana"},"application/vnd.afpc.cmoca-cmresource":{"source":"iana"},"application/vnd.afpc.foca-charset":{"source":"iana"},"application/vnd.afpc.foca-codedfont":{"source":"iana"},"application/vnd.afpc.foca-codepage":{"source":"iana"},"application/vnd.afpc.modca":{"source":"iana"},"application/vnd.afpc.modca-cmtable":{"source":"iana"},"application/vnd.afpc.modca-formdef":{"source":"iana"},"application/vnd.afpc.modca-mediummap":{"source":"iana"},"application/vnd.afpc.modca-objectcontainer":{"source":"iana"},"application/vnd.afpc.modca-overlay":{"source":"iana"},"application/vnd.afpc.modca-pagesegment":{"source":"iana"},"application/vnd.ah-barcode":{"source":"iana"},"application/vnd.ahead.space":{"source":"iana","extensions":["ahead"]},"application/vnd.airzip.filesecure.azf":{"source":"iana","extensions":["azf"]},"application/vnd.airzip.filesecure.azs":{"source":"iana","extensions":["azs"]},"application/vnd.amadeus+json":{"source":"iana","compressible":true},"application/vnd.amazon.ebook":{"source":"apache","extensions":["azw"]},"application/vnd.amazon.mobi8-ebook":{"source":"iana"},"application/vnd.americandynamics.acc":{"source":"iana","extensions":["acc"]},"application/vnd.amiga.ami":{"source":"iana","extensions":["ami"]},"application/vnd.amundsen.maze+xml":{"source":"iana","compressible":true},"application/vnd.android.ota":{"source":"iana"},"application/vnd.android.package-archive":{"source":"apache","compressible":false,"extensions":["apk"]},"application/vnd.anki":{"source":"iana"},"application/vnd.anser-web-certificate-issue-initiation":{"source":"iana","extensions":["cii"]},"application/vnd.anser-web-funds-transfer-initiation":{"source":"apache","extensions":["fti"]},"application/vnd.antix.game-component":{"source":"iana","extensions":["atx"]},"application/vnd.apache.arrow.file":{"source":"iana"},"application/vnd.apache.arrow.stream":{"source":"iana"},"application/vnd.apache.thrift.binary":{"source":"iana"},"application/vnd.apache.thrift.compact":{"source":"iana"},"application/vnd.apache.thrift.json":{"source":"iana"},"application/vnd.api+json":{"source":"iana","compressible":true},"application/vnd.aplextor.warrp+json":{"source":"iana","compressible":true},"application/vnd.apothekende.reservation+json":{"source":"iana","compressible":true},"application/vnd.apple.installer+xml":{"source":"iana","compressible":true,"extensions":["mpkg"]},"application/vnd.apple.keynote":{"source":"iana","extensions":["key"]},"application/vnd.apple.mpegurl":{"source":"iana","extensions":["m3u8"]},"application/vnd.apple.numbers":{"source":"iana","extensions":["numbers"]},"application/vnd.apple.pages":{"source":"iana","extensions":["pages"]},"application/vnd.apple.pkpass":{"compressible":false,"extensions":["pkpass"]},"application/vnd.arastra.swi":{"source":"iana"},"application/vnd.aristanetworks.swi":{"source":"iana","extensions":["swi"]},"application/vnd.artisan+json":{"source":"iana","compressible":true},"application/vnd.artsquare":{"source":"iana"},"application/vnd.astraea-software.iota":{"source":"iana","extensions":["iota"]},"application/vnd.audiograph":{"source":"iana","extensions":["aep"]},"application/vnd.autopackage":{"source":"iana"},"application/vnd.avalon+json":{"source":"iana","compressible":true},"application/vnd.avistar+xml":{"source":"iana","compressible":true},"application/vnd.balsamiq.bmml+xml":{"source":"iana","compressible":true,"extensions":["bmml"]},"application/vnd.balsamiq.bmpr":{"source":"iana"},"application/vnd.banana-accounting":{"source":"iana"},"application/vnd.bbf.usp.error":{"source":"iana"},"application/vnd.bbf.usp.msg":{"source":"iana"},"application/vnd.bbf.usp.msg+json":{"source":"iana","compressible":true},"application/vnd.bekitzur-stech+json":{"source":"iana","compressible":true},"application/vnd.bint.med-content":{"source":"iana"},"application/vnd.biopax.rdf+xml":{"source":"iana","compressible":true},"application/vnd.blink-idb-value-wrapper":{"source":"iana"},"application/vnd.blueice.multipass":{"source":"iana","extensions":["mpm"]},"application/vnd.bluetooth.ep.oob":{"source":"iana"},"application/vnd.bluetooth.le.oob":{"source":"iana"},"application/vnd.bmi":{"source":"iana","extensions":["bmi"]},"application/vnd.bpf":{"source":"iana"},"application/vnd.bpf3":{"source":"iana"},"application/vnd.businessobjects":{"source":"iana","extensions":["rep"]},"application/vnd.byu.uapi+json":{"source":"iana","compressible":true},"application/vnd.cab-jscript":{"source":"iana"},"application/vnd.canon-cpdl":{"source":"iana"},"application/vnd.canon-lips":{"source":"iana"},"application/vnd.capasystems-pg+json":{"source":"iana","compressible":true},"application/vnd.cendio.thinlinc.clientconf":{"source":"iana"},"application/vnd.century-systems.tcp_stream":{"source":"iana"},"application/vnd.chemdraw+xml":{"source":"iana","compressible":true,"extensions":["cdxml"]},"application/vnd.chess-pgn":{"source":"iana"},"application/vnd.chipnuts.karaoke-mmd":{"source":"iana","extensions":["mmd"]},"application/vnd.ciedi":{"source":"iana"},"application/vnd.cinderella":{"source":"iana","extensions":["cdy"]},"application/vnd.cirpack.isdn-ext":{"source":"iana"},"application/vnd.citationstyles.style+xml":{"source":"iana","compressible":true,"extensions":["csl"]},"application/vnd.claymore":{"source":"iana","extensions":["cla"]},"application/vnd.cloanto.rp9":{"source":"iana","extensions":["rp9"]},"application/vnd.clonk.c4group":{"source":"iana","extensions":["c4g","c4d","c4f","c4p","c4u"]},"application/vnd.cluetrust.cartomobile-config":{"source":"iana","extensions":["c11amc"]},"application/vnd.cluetrust.cartomobile-config-pkg":{"source":"iana","extensions":["c11amz"]},"application/vnd.coffeescript":{"source":"iana"},"application/vnd.collabio.xodocuments.document":{"source":"iana"},"application/vnd.collabio.xodocuments.document-template":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation-template":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet-template":{"source":"iana"},"application/vnd.collection+json":{"source":"iana","compressible":true},"application/vnd.collection.doc+json":{"source":"iana","compressible":true},"application/vnd.collection.next+json":{"source":"iana","compressible":true},"application/vnd.comicbook+zip":{"source":"iana","compressible":false},"application/vnd.comicbook-rar":{"source":"iana"},"application/vnd.commerce-battelle":{"source":"iana"},"application/vnd.commonspace":{"source":"iana","extensions":["csp"]},"application/vnd.contact.cmsg":{"source":"iana","extensions":["cdbcmsg"]},"application/vnd.coreos.ignition+json":{"source":"iana","compressible":true},"application/vnd.cosmocaller":{"source":"iana","extensions":["cmc"]},"application/vnd.crick.clicker":{"source":"iana","extensions":["clkx"]},"application/vnd.crick.clicker.keyboard":{"source":"iana","extensions":["clkk"]},"application/vnd.crick.clicker.palette":{"source":"iana","extensions":["clkp"]},"application/vnd.crick.clicker.template":{"source":"iana","extensions":["clkt"]},"application/vnd.crick.clicker.wordbank":{"source":"iana","extensions":["clkw"]},"application/vnd.criticaltools.wbs+xml":{"source":"iana","compressible":true,"extensions":["wbs"]},"application/vnd.cryptii.pipe+json":{"source":"iana","compressible":true},"application/vnd.crypto-shade-file":{"source":"iana"},"application/vnd.cryptomator.encrypted":{"source":"iana"},"application/vnd.cryptomator.vault":{"source":"iana"},"application/vnd.ctc-posml":{"source":"iana","extensions":["pml"]},"application/vnd.ctct.ws+xml":{"source":"iana","compressible":true},"application/vnd.cups-pdf":{"source":"iana"},"application/vnd.cups-postscript":{"source":"iana"},"application/vnd.cups-ppd":{"source":"iana","extensions":["ppd"]},"application/vnd.cups-raster":{"source":"iana"},"application/vnd.cups-raw":{"source":"iana"},"application/vnd.curl":{"source":"iana"},"application/vnd.curl.car":{"source":"apache","extensions":["car"]},"application/vnd.curl.pcurl":{"source":"apache","extensions":["pcurl"]},"application/vnd.cyan.dean.root+xml":{"source":"iana","compressible":true},"application/vnd.cybank":{"source":"iana"},"application/vnd.cyclonedx+json":{"source":"iana","compressible":true},"application/vnd.cyclonedx+xml":{"source":"iana","compressible":true},"application/vnd.d2l.coursepackage1p0+zip":{"source":"iana","compressible":false},"application/vnd.d3m-dataset":{"source":"iana"},"application/vnd.d3m-problem":{"source":"iana"},"application/vnd.dart":{"source":"iana","compressible":true,"extensions":["dart"]},"application/vnd.data-vision.rdz":{"source":"iana","extensions":["rdz"]},"application/vnd.datapackage+json":{"source":"iana","compressible":true},"application/vnd.dataresource+json":{"source":"iana","compressible":true},"application/vnd.dbf":{"source":"iana","extensions":["dbf"]},"application/vnd.debian.binary-package":{"source":"iana"},"application/vnd.dece.data":{"source":"iana","extensions":["uvf","uvvf","uvd","uvvd"]},"application/vnd.dece.ttml+xml":{"source":"iana","compressible":true,"extensions":["uvt","uvvt"]},"application/vnd.dece.unspecified":{"source":"iana","extensions":["uvx","uvvx"]},"application/vnd.dece.zip":{"source":"iana","extensions":["uvz","uvvz"]},"application/vnd.denovo.fcselayout-link":{"source":"iana","extensions":["fe_launch"]},"application/vnd.desmume.movie":{"source":"iana"},"application/vnd.dir-bi.plate-dl-nosuffix":{"source":"iana"},"application/vnd.dm.delegation+xml":{"source":"iana","compressible":true},"application/vnd.dna":{"source":"iana","extensions":["dna"]},"application/vnd.document+json":{"source":"iana","compressible":true},"application/vnd.dolby.mlp":{"source":"apache","extensions":["mlp"]},"application/vnd.dolby.mobile.1":{"source":"iana"},"application/vnd.dolby.mobile.2":{"source":"iana"},"application/vnd.doremir.scorecloud-binary-document":{"source":"iana"},"application/vnd.dpgraph":{"source":"iana","extensions":["dpg"]},"application/vnd.dreamfactory":{"source":"iana","extensions":["dfac"]},"application/vnd.drive+json":{"source":"iana","compressible":true},"application/vnd.ds-keypoint":{"source":"apache","extensions":["kpxx"]},"application/vnd.dtg.local":{"source":"iana"},"application/vnd.dtg.local.flash":{"source":"iana"},"application/vnd.dtg.local.html":{"source":"iana"},"application/vnd.dvb.ait":{"source":"iana","extensions":["ait"]},"application/vnd.dvb.dvbisl+xml":{"source":"iana","compressible":true},"application/vnd.dvb.dvbj":{"source":"iana"},"application/vnd.dvb.esgcontainer":{"source":"iana"},"application/vnd.dvb.ipdcdftnotifaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess2":{"source":"iana"},"application/vnd.dvb.ipdcesgpdd":{"source":"iana"},"application/vnd.dvb.ipdcroaming":{"source":"iana"},"application/vnd.dvb.iptv.alfec-base":{"source":"iana"},"application/vnd.dvb.iptv.alfec-enhancement":{"source":"iana"},"application/vnd.dvb.notif-aggregate-root+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-container+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-generic+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-msglist+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-request+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-response+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-init+xml":{"source":"iana","compressible":true},"application/vnd.dvb.pfr":{"source":"iana"},"application/vnd.dvb.service":{"source":"iana","extensions":["svc"]},"application/vnd.dxr":{"source":"iana"},"application/vnd.dynageo":{"source":"iana","extensions":["geo"]},"application/vnd.dzr":{"source":"iana"},"application/vnd.easykaraoke.cdgdownload":{"source":"iana"},"application/vnd.ecdis-update":{"source":"iana"},"application/vnd.ecip.rlp":{"source":"iana"},"application/vnd.ecowin.chart":{"source":"iana","extensions":["mag"]},"application/vnd.ecowin.filerequest":{"source":"iana"},"application/vnd.ecowin.fileupdate":{"source":"iana"},"application/vnd.ecowin.series":{"source":"iana"},"application/vnd.ecowin.seriesrequest":{"source":"iana"},"application/vnd.ecowin.seriesupdate":{"source":"iana"},"application/vnd.efi.img":{"source":"iana"},"application/vnd.efi.iso":{"source":"iana"},"application/vnd.emclient.accessrequest+xml":{"source":"iana","compressible":true},"application/vnd.enliven":{"source":"iana","extensions":["nml"]},"application/vnd.enphase.envoy":{"source":"iana"},"application/vnd.eprints.data+xml":{"source":"iana","compressible":true},"application/vnd.epson.esf":{"source":"iana","extensions":["esf"]},"application/vnd.epson.msf":{"source":"iana","extensions":["msf"]},"application/vnd.epson.quickanime":{"source":"iana","extensions":["qam"]},"application/vnd.epson.salt":{"source":"iana","extensions":["slt"]},"application/vnd.epson.ssf":{"source":"iana","extensions":["ssf"]},"application/vnd.ericsson.quickcall":{"source":"iana"},"application/vnd.espass-espass+zip":{"source":"iana","compressible":false},"application/vnd.eszigno3+xml":{"source":"iana","compressible":true,"extensions":["es3","et3"]},"application/vnd.etsi.aoc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.asic-e+zip":{"source":"iana","compressible":false},"application/vnd.etsi.asic-s+zip":{"source":"iana","compressible":false},"application/vnd.etsi.cug+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvcommand+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-bc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-cod+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-npvr+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvservice+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsync+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvueprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mcid+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mheg5":{"source":"iana"},"application/vnd.etsi.overload-control-policy-dataset+xml":{"source":"iana","compressible":true},"application/vnd.etsi.pstn+xml":{"source":"iana","compressible":true},"application/vnd.etsi.sci+xml":{"source":"iana","compressible":true},"application/vnd.etsi.simservs+xml":{"source":"iana","compressible":true},"application/vnd.etsi.timestamp-token":{"source":"iana"},"application/vnd.etsi.tsl+xml":{"source":"iana","compressible":true},"application/vnd.etsi.tsl.der":{"source":"iana"},"application/vnd.eudora.data":{"source":"iana"},"application/vnd.evolv.ecig.profile":{"source":"iana"},"application/vnd.evolv.ecig.settings":{"source":"iana"},"application/vnd.evolv.ecig.theme":{"source":"iana"},"application/vnd.exstream-empower+zip":{"source":"iana","compressible":false},"application/vnd.exstream-package":{"source":"iana"},"application/vnd.ezpix-album":{"source":"iana","extensions":["ez2"]},"application/vnd.ezpix-package":{"source":"iana","extensions":["ez3"]},"application/vnd.f-secure.mobile":{"source":"iana"},"application/vnd.fastcopy-disk-image":{"source":"iana"},"application/vnd.fdf":{"source":"iana","extensions":["fdf"]},"application/vnd.fdsn.mseed":{"source":"iana","extensions":["mseed"]},"application/vnd.fdsn.seed":{"source":"iana","extensions":["seed","dataless"]},"application/vnd.ffsns":{"source":"iana"},"application/vnd.ficlab.flb+zip":{"source":"iana","compressible":false},"application/vnd.filmit.zfc":{"source":"iana"},"application/vnd.fints":{"source":"iana"},"application/vnd.firemonkeys.cloudcell":{"source":"iana"},"application/vnd.flographit":{"source":"iana","extensions":["gph"]},"application/vnd.fluxtime.clip":{"source":"iana","extensions":["ftc"]},"application/vnd.font-fontforge-sfd":{"source":"iana"},"application/vnd.framemaker":{"source":"iana","extensions":["fm","frame","maker","book"]},"application/vnd.frogans.fnc":{"source":"iana","extensions":["fnc"]},"application/vnd.frogans.ltf":{"source":"iana","extensions":["ltf"]},"application/vnd.fsc.weblaunch":{"source":"iana","extensions":["fsc"]},"application/vnd.fujifilm.fb.docuworks":{"source":"iana"},"application/vnd.fujifilm.fb.docuworks.binder":{"source":"iana"},"application/vnd.fujifilm.fb.docuworks.container":{"source":"iana"},"application/vnd.fujifilm.fb.jfi+xml":{"source":"iana","compressible":true},"application/vnd.fujitsu.oasys":{"source":"iana","extensions":["oas"]},"application/vnd.fujitsu.oasys2":{"source":"iana","extensions":["oa2"]},"application/vnd.fujitsu.oasys3":{"source":"iana","extensions":["oa3"]},"application/vnd.fujitsu.oasysgp":{"source":"iana","extensions":["fg5"]},"application/vnd.fujitsu.oasysprs":{"source":"iana","extensions":["bh2"]},"application/vnd.fujixerox.art-ex":{"source":"iana"},"application/vnd.fujixerox.art4":{"source":"iana"},"application/vnd.fujixerox.ddd":{"source":"iana","extensions":["ddd"]},"application/vnd.fujixerox.docuworks":{"source":"iana","extensions":["xdw"]},"application/vnd.fujixerox.docuworks.binder":{"source":"iana","extensions":["xbd"]},"application/vnd.fujixerox.docuworks.container":{"source":"iana"},"application/vnd.fujixerox.hbpl":{"source":"iana"},"application/vnd.fut-misnet":{"source":"iana"},"application/vnd.futoin+cbor":{"source":"iana"},"application/vnd.futoin+json":{"source":"iana","compressible":true},"application/vnd.fuzzysheet":{"source":"iana","extensions":["fzs"]},"application/vnd.genomatix.tuxedo":{"source":"iana","extensions":["txd"]},"application/vnd.gentics.grd+json":{"source":"iana","compressible":true},"application/vnd.geo+json":{"source":"iana","compressible":true},"application/vnd.geocube+xml":{"source":"iana","compressible":true},"application/vnd.geogebra.file":{"source":"iana","extensions":["ggb"]},"application/vnd.geogebra.slides":{"source":"iana"},"application/vnd.geogebra.tool":{"source":"iana","extensions":["ggt"]},"application/vnd.geometry-explorer":{"source":"iana","extensions":["gex","gre"]},"application/vnd.geonext":{"source":"iana","extensions":["gxt"]},"application/vnd.geoplan":{"source":"iana","extensions":["g2w"]},"application/vnd.geospace":{"source":"iana","extensions":["g3w"]},"application/vnd.gerber":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt-response":{"source":"iana"},"application/vnd.gmx":{"source":"iana","extensions":["gmx"]},"application/vnd.google-apps.document":{"compressible":false,"extensions":["gdoc"]},"application/vnd.google-apps.presentation":{"compressible":false,"extensions":["gslides"]},"application/vnd.google-apps.spreadsheet":{"compressible":false,"extensions":["gsheet"]},"application/vnd.google-earth.kml+xml":{"source":"iana","compressible":true,"extensions":["kml"]},"application/vnd.google-earth.kmz":{"source":"iana","compressible":false,"extensions":["kmz"]},"application/vnd.gov.sk.e-form+xml":{"source":"iana","compressible":true},"application/vnd.gov.sk.e-form+zip":{"source":"iana","compressible":false},"application/vnd.gov.sk.xmldatacontainer+xml":{"source":"iana","compressible":true},"application/vnd.grafeq":{"source":"iana","extensions":["gqf","gqs"]},"application/vnd.gridmp":{"source":"iana"},"application/vnd.groove-account":{"source":"iana","extensions":["gac"]},"application/vnd.groove-help":{"source":"iana","extensions":["ghf"]},"application/vnd.groove-identity-message":{"source":"iana","extensions":["gim"]},"application/vnd.groove-injector":{"source":"iana","extensions":["grv"]},"application/vnd.groove-tool-message":{"source":"iana","extensions":["gtm"]},"application/vnd.groove-tool-template":{"source":"iana","extensions":["tpl"]},"application/vnd.groove-vcard":{"source":"iana","extensions":["vcg"]},"application/vnd.hal+json":{"source":"iana","compressible":true},"application/vnd.hal+xml":{"source":"iana","compressible":true,"extensions":["hal"]},"application/vnd.handheld-entertainment+xml":{"source":"iana","compressible":true,"extensions":["zmm"]},"application/vnd.hbci":{"source":"iana","extensions":["hbci"]},"application/vnd.hc+json":{"source":"iana","compressible":true},"application/vnd.hcl-bireports":{"source":"iana"},"application/vnd.hdt":{"source":"iana"},"application/vnd.heroku+json":{"source":"iana","compressible":true},"application/vnd.hhe.lesson-player":{"source":"iana","extensions":["les"]},"application/vnd.hp-hpgl":{"source":"iana","extensions":["hpgl"]},"application/vnd.hp-hpid":{"source":"iana","extensions":["hpid"]},"application/vnd.hp-hps":{"source":"iana","extensions":["hps"]},"application/vnd.hp-jlyt":{"source":"iana","extensions":["jlt"]},"application/vnd.hp-pcl":{"source":"iana","extensions":["pcl"]},"application/vnd.hp-pclxl":{"source":"iana","extensions":["pclxl"]},"application/vnd.httphone":{"source":"iana"},"application/vnd.hydrostatix.sof-data":{"source":"iana","extensions":["sfd-hdstx"]},"application/vnd.hyper+json":{"source":"iana","compressible":true},"application/vnd.hyper-item+json":{"source":"iana","compressible":true},"application/vnd.hyperdrive+json":{"source":"iana","compressible":true},"application/vnd.hzn-3d-crossword":{"source":"iana"},"application/vnd.ibm.afplinedata":{"source":"iana"},"application/vnd.ibm.electronic-media":{"source":"iana"},"application/vnd.ibm.minipay":{"source":"iana","extensions":["mpy"]},"application/vnd.ibm.modcap":{"source":"iana","extensions":["afp","listafp","list3820"]},"application/vnd.ibm.rights-management":{"source":"iana","extensions":["irm"]},"application/vnd.ibm.secure-container":{"source":"iana","extensions":["sc"]},"application/vnd.iccprofile":{"source":"iana","extensions":["icc","icm"]},"application/vnd.ieee.1905":{"source":"iana"},"application/vnd.igloader":{"source":"iana","extensions":["igl"]},"application/vnd.imagemeter.folder+zip":{"source":"iana","compressible":false},"application/vnd.imagemeter.image+zip":{"source":"iana","compressible":false},"application/vnd.immervision-ivp":{"source":"iana","extensions":["ivp"]},"application/vnd.immervision-ivu":{"source":"iana","extensions":["ivu"]},"application/vnd.ims.imsccv1p1":{"source":"iana"},"application/vnd.ims.imsccv1p2":{"source":"iana"},"application/vnd.ims.imsccv1p3":{"source":"iana"},"application/vnd.ims.lis.v2.result+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolconsumerprofile+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy.id+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings.simple+json":{"source":"iana","compressible":true},"application/vnd.informedcontrol.rms+xml":{"source":"iana","compressible":true},"application/vnd.informix-visionary":{"source":"iana"},"application/vnd.infotech.project":{"source":"iana"},"application/vnd.infotech.project+xml":{"source":"iana","compressible":true},"application/vnd.innopath.wamp.notification":{"source":"iana"},"application/vnd.insors.igm":{"source":"iana","extensions":["igm"]},"application/vnd.intercon.formnet":{"source":"iana","extensions":["xpw","xpx"]},"application/vnd.intergeo":{"source":"iana","extensions":["i2g"]},"application/vnd.intertrust.digibox":{"source":"iana"},"application/vnd.intertrust.nncp":{"source":"iana"},"application/vnd.intu.qbo":{"source":"iana","extensions":["qbo"]},"application/vnd.intu.qfx":{"source":"iana","extensions":["qfx"]},"application/vnd.iptc.g2.catalogitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.conceptitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.knowledgeitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsmessage+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.packageitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.planningitem+xml":{"source":"iana","compressible":true},"application/vnd.ipunplugged.rcprofile":{"source":"iana","extensions":["rcprofile"]},"application/vnd.irepository.package+xml":{"source":"iana","compressible":true,"extensions":["irp"]},"application/vnd.is-xpr":{"source":"iana","extensions":["xpr"]},"application/vnd.isac.fcs":{"source":"iana","extensions":["fcs"]},"application/vnd.iso11783-10+zip":{"source":"iana","compressible":false},"application/vnd.jam":{"source":"iana","extensions":["jam"]},"application/vnd.japannet-directory-service":{"source":"iana"},"application/vnd.japannet-jpnstore-wakeup":{"source":"iana"},"application/vnd.japannet-payment-wakeup":{"source":"iana"},"application/vnd.japannet-registration":{"source":"iana"},"application/vnd.japannet-registration-wakeup":{"source":"iana"},"application/vnd.japannet-setstore-wakeup":{"source":"iana"},"application/vnd.japannet-verification":{"source":"iana"},"application/vnd.japannet-verification-wakeup":{"source":"iana"},"application/vnd.jcp.javame.midlet-rms":{"source":"iana","extensions":["rms"]},"application/vnd.jisp":{"source":"iana","extensions":["jisp"]},"application/vnd.joost.joda-archive":{"source":"iana","extensions":["joda"]},"application/vnd.jsk.isdn-ngn":{"source":"iana"},"application/vnd.kahootz":{"source":"iana","extensions":["ktz","ktr"]},"application/vnd.kde.karbon":{"source":"iana","extensions":["karbon"]},"application/vnd.kde.kchart":{"source":"iana","extensions":["chrt"]},"application/vnd.kde.kformula":{"source":"iana","extensions":["kfo"]},"application/vnd.kde.kivio":{"source":"iana","extensions":["flw"]},"application/vnd.kde.kontour":{"source":"iana","extensions":["kon"]},"application/vnd.kde.kpresenter":{"source":"iana","extensions":["kpr","kpt"]},"application/vnd.kde.kspread":{"source":"iana","extensions":["ksp"]},"application/vnd.kde.kword":{"source":"iana","extensions":["kwd","kwt"]},"application/vnd.kenameaapp":{"source":"iana","extensions":["htke"]},"application/vnd.kidspiration":{"source":"iana","extensions":["kia"]},"application/vnd.kinar":{"source":"iana","extensions":["kne","knp"]},"application/vnd.koan":{"source":"iana","extensions":["skp","skd","skt","skm"]},"application/vnd.kodak-descriptor":{"source":"iana","extensions":["sse"]},"application/vnd.las":{"source":"iana"},"application/vnd.las.las+json":{"source":"iana","compressible":true},"application/vnd.las.las+xml":{"source":"iana","compressible":true,"extensions":["lasxml"]},"application/vnd.laszip":{"source":"iana"},"application/vnd.leap+json":{"source":"iana","compressible":true},"application/vnd.liberty-request+xml":{"source":"iana","compressible":true},"application/vnd.llamagraphics.life-balance.desktop":{"source":"iana","extensions":["lbd"]},"application/vnd.llamagraphics.life-balance.exchange+xml":{"source":"iana","compressible":true,"extensions":["lbe"]},"application/vnd.logipipe.circuit+zip":{"source":"iana","compressible":false},"application/vnd.loom":{"source":"iana"},"application/vnd.lotus-1-2-3":{"source":"iana","extensions":["123"]},"application/vnd.lotus-approach":{"source":"iana","extensions":["apr"]},"application/vnd.lotus-freelance":{"source":"iana","extensions":["pre"]},"application/vnd.lotus-notes":{"source":"iana","extensions":["nsf"]},"application/vnd.lotus-organizer":{"source":"iana","extensions":["org"]},"application/vnd.lotus-screencam":{"source":"iana","extensions":["scm"]},"application/vnd.lotus-wordpro":{"source":"iana","extensions":["lwp"]},"application/vnd.macports.portpkg":{"source":"iana","extensions":["portpkg"]},"application/vnd.mapbox-vector-tile":{"source":"iana","extensions":["mvt"]},"application/vnd.marlin.drm.actiontoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.conftoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.license+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.mdcf":{"source":"iana"},"application/vnd.mason+json":{"source":"iana","compressible":true},"application/vnd.maxmind.maxmind-db":{"source":"iana"},"application/vnd.mcd":{"source":"iana","extensions":["mcd"]},"application/vnd.medcalcdata":{"source":"iana","extensions":["mc1"]},"application/vnd.mediastation.cdkey":{"source":"iana","extensions":["cdkey"]},"application/vnd.meridian-slingshot":{"source":"iana"},"application/vnd.mfer":{"source":"iana","extensions":["mwf"]},"application/vnd.mfmp":{"source":"iana","extensions":["mfm"]},"application/vnd.micro+json":{"source":"iana","compressible":true},"application/vnd.micrografx.flo":{"source":"iana","extensions":["flo"]},"application/vnd.micrografx.igx":{"source":"iana","extensions":["igx"]},"application/vnd.microsoft.portable-executable":{"source":"iana"},"application/vnd.microsoft.windows.thumbnail-cache":{"source":"iana"},"application/vnd.miele+json":{"source":"iana","compressible":true},"application/vnd.mif":{"source":"iana","extensions":["mif"]},"application/vnd.minisoft-hp3000-save":{"source":"iana"},"application/vnd.mitsubishi.misty-guard.trustweb":{"source":"iana"},"application/vnd.mobius.daf":{"source":"iana","extensions":["daf"]},"application/vnd.mobius.dis":{"source":"iana","extensions":["dis"]},"application/vnd.mobius.mbk":{"source":"iana","extensions":["mbk"]},"application/vnd.mobius.mqy":{"source":"iana","extensions":["mqy"]},"application/vnd.mobius.msl":{"source":"iana","extensions":["msl"]},"application/vnd.mobius.plc":{"source":"iana","extensions":["plc"]},"application/vnd.mobius.txf":{"source":"iana","extensions":["txf"]},"application/vnd.mophun.application":{"source":"iana","extensions":["mpn"]},"application/vnd.mophun.certificate":{"source":"iana","extensions":["mpc"]},"application/vnd.motorola.flexsuite":{"source":"iana"},"application/vnd.motorola.flexsuite.adsi":{"source":"iana"},"application/vnd.motorola.flexsuite.fis":{"source":"iana"},"application/vnd.motorola.flexsuite.gotap":{"source":"iana"},"application/vnd.motorola.flexsuite.kmr":{"source":"iana"},"application/vnd.motorola.flexsuite.ttc":{"source":"iana"},"application/vnd.motorola.flexsuite.wem":{"source":"iana"},"application/vnd.motorola.iprm":{"source":"iana"},"application/vnd.mozilla.xul+xml":{"source":"iana","compressible":true,"extensions":["xul"]},"application/vnd.ms-3mfdocument":{"source":"iana"},"application/vnd.ms-artgalry":{"source":"iana","extensions":["cil"]},"application/vnd.ms-asf":{"source":"iana"},"application/vnd.ms-cab-compressed":{"source":"iana","extensions":["cab"]},"application/vnd.ms-color.iccprofile":{"source":"apache"},"application/vnd.ms-excel":{"source":"iana","compressible":false,"extensions":["xls","xlm","xla","xlc","xlt","xlw"]},"application/vnd.ms-excel.addin.macroenabled.12":{"source":"iana","extensions":["xlam"]},"application/vnd.ms-excel.sheet.binary.macroenabled.12":{"source":"iana","extensions":["xlsb"]},"application/vnd.ms-excel.sheet.macroenabled.12":{"source":"iana","extensions":["xlsm"]},"application/vnd.ms-excel.template.macroenabled.12":{"source":"iana","extensions":["xltm"]},"application/vnd.ms-fontobject":{"source":"iana","compressible":true,"extensions":["eot"]},"application/vnd.ms-htmlhelp":{"source":"iana","extensions":["chm"]},"application/vnd.ms-ims":{"source":"iana","extensions":["ims"]},"application/vnd.ms-lrm":{"source":"iana","extensions":["lrm"]},"application/vnd.ms-office.activex+xml":{"source":"iana","compressible":true},"application/vnd.ms-officetheme":{"source":"iana","extensions":["thmx"]},"application/vnd.ms-opentype":{"source":"apache","compressible":true},"application/vnd.ms-outlook":{"compressible":false,"extensions":["msg"]},"application/vnd.ms-package.obfuscated-opentype":{"source":"apache"},"application/vnd.ms-pki.seccat":{"source":"apache","extensions":["cat"]},"application/vnd.ms-pki.stl":{"source":"apache","extensions":["stl"]},"application/vnd.ms-playready.initiator+xml":{"source":"iana","compressible":true},"application/vnd.ms-powerpoint":{"source":"iana","compressible":false,"extensions":["ppt","pps","pot"]},"application/vnd.ms-powerpoint.addin.macroenabled.12":{"source":"iana","extensions":["ppam"]},"application/vnd.ms-powerpoint.presentation.macroenabled.12":{"source":"iana","extensions":["pptm"]},"application/vnd.ms-powerpoint.slide.macroenabled.12":{"source":"iana","extensions":["sldm"]},"application/vnd.ms-powerpoint.slideshow.macroenabled.12":{"source":"iana","extensions":["ppsm"]},"application/vnd.ms-powerpoint.template.macroenabled.12":{"source":"iana","extensions":["potm"]},"application/vnd.ms-printdevicecapabilities+xml":{"source":"iana","compressible":true},"application/vnd.ms-printing.printticket+xml":{"source":"apache","compressible":true},"application/vnd.ms-printschematicket+xml":{"source":"iana","compressible":true},"application/vnd.ms-project":{"source":"iana","extensions":["mpp","mpt"]},"application/vnd.ms-tnef":{"source":"iana"},"application/vnd.ms-windows.devicepairing":{"source":"iana"},"application/vnd.ms-windows.nwprinting.oob":{"source":"iana"},"application/vnd.ms-windows.printerpairing":{"source":"iana"},"application/vnd.ms-windows.wsd.oob":{"source":"iana"},"application/vnd.ms-wmdrm.lic-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.lic-resp":{"source":"iana"},"application/vnd.ms-wmdrm.meter-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.meter-resp":{"source":"iana"},"application/vnd.ms-word.document.macroenabled.12":{"source":"iana","extensions":["docm"]},"application/vnd.ms-word.template.macroenabled.12":{"source":"iana","extensions":["dotm"]},"application/vnd.ms-works":{"source":"iana","extensions":["wps","wks","wcm","wdb"]},"application/vnd.ms-wpl":{"source":"iana","extensions":["wpl"]},"application/vnd.ms-xpsdocument":{"source":"iana","compressible":false,"extensions":["xps"]},"application/vnd.msa-disk-image":{"source":"iana"},"application/vnd.mseq":{"source":"iana","extensions":["mseq"]},"application/vnd.msign":{"source":"iana"},"application/vnd.multiad.creator":{"source":"iana"},"application/vnd.multiad.creator.cif":{"source":"iana"},"application/vnd.music-niff":{"source":"iana"},"application/vnd.musician":{"source":"iana","extensions":["mus"]},"application/vnd.muvee.style":{"source":"iana","extensions":["msty"]},"application/vnd.mynfc":{"source":"iana","extensions":["taglet"]},"application/vnd.ncd.control":{"source":"iana"},"application/vnd.ncd.reference":{"source":"iana"},"application/vnd.nearst.inv+json":{"source":"iana","compressible":true},"application/vnd.nebumind.line":{"source":"iana"},"application/vnd.nervana":{"source":"iana"},"application/vnd.netfpx":{"source":"iana"},"application/vnd.neurolanguage.nlu":{"source":"iana","extensions":["nlu"]},"application/vnd.nimn":{"source":"iana"},"application/vnd.nintendo.nitro.rom":{"source":"iana"},"application/vnd.nintendo.snes.rom":{"source":"iana"},"application/vnd.nitf":{"source":"iana","extensions":["ntf","nitf"]},"application/vnd.noblenet-directory":{"source":"iana","extensions":["nnd"]},"application/vnd.noblenet-sealer":{"source":"iana","extensions":["nns"]},"application/vnd.noblenet-web":{"source":"iana","extensions":["nnw"]},"application/vnd.nokia.catalogs":{"source":"iana"},"application/vnd.nokia.conml+wbxml":{"source":"iana"},"application/vnd.nokia.conml+xml":{"source":"iana","compressible":true},"application/vnd.nokia.iptv.config+xml":{"source":"iana","compressible":true},"application/vnd.nokia.isds-radio-presets":{"source":"iana"},"application/vnd.nokia.landmark+wbxml":{"source":"iana"},"application/vnd.nokia.landmark+xml":{"source":"iana","compressible":true},"application/vnd.nokia.landmarkcollection+xml":{"source":"iana","compressible":true},"application/vnd.nokia.n-gage.ac+xml":{"source":"iana","compressible":true,"extensions":["ac"]},"application/vnd.nokia.n-gage.data":{"source":"iana","extensions":["ngdat"]},"application/vnd.nokia.n-gage.symbian.install":{"source":"iana","extensions":["n-gage"]},"application/vnd.nokia.ncd":{"source":"iana"},"application/vnd.nokia.pcd+wbxml":{"source":"iana"},"application/vnd.nokia.pcd+xml":{"source":"iana","compressible":true},"application/vnd.nokia.radio-preset":{"source":"iana","extensions":["rpst"]},"application/vnd.nokia.radio-presets":{"source":"iana","extensions":["rpss"]},"application/vnd.novadigm.edm":{"source":"iana","extensions":["edm"]},"application/vnd.novadigm.edx":{"source":"iana","extensions":["edx"]},"application/vnd.novadigm.ext":{"source":"iana","extensions":["ext"]},"application/vnd.ntt-local.content-share":{"source":"iana"},"application/vnd.ntt-local.file-transfer":{"source":"iana"},"application/vnd.ntt-local.ogw_remote-access":{"source":"iana"},"application/vnd.ntt-local.sip-ta_remote":{"source":"iana"},"application/vnd.ntt-local.sip-ta_tcp_stream":{"source":"iana"},"application/vnd.oasis.opendocument.chart":{"source":"iana","extensions":["odc"]},"application/vnd.oasis.opendocument.chart-template":{"source":"iana","extensions":["otc"]},"application/vnd.oasis.opendocument.database":{"source":"iana","extensions":["odb"]},"application/vnd.oasis.opendocument.formula":{"source":"iana","extensions":["odf"]},"application/vnd.oasis.opendocument.formula-template":{"source":"iana","extensions":["odft"]},"application/vnd.oasis.opendocument.graphics":{"source":"iana","compressible":false,"extensions":["odg"]},"application/vnd.oasis.opendocument.graphics-template":{"source":"iana","extensions":["otg"]},"application/vnd.oasis.opendocument.image":{"source":"iana","extensions":["odi"]},"application/vnd.oasis.opendocument.image-template":{"source":"iana","extensions":["oti"]},"application/vnd.oasis.opendocument.presentation":{"source":"iana","compressible":false,"extensions":["odp"]},"application/vnd.oasis.opendocument.presentation-template":{"source":"iana","extensions":["otp"]},"application/vnd.oasis.opendocument.spreadsheet":{"source":"iana","compressible":false,"extensions":["ods"]},"application/vnd.oasis.opendocument.spreadsheet-template":{"source":"iana","extensions":["ots"]},"application/vnd.oasis.opendocument.text":{"source":"iana","compressible":false,"extensions":["odt"]},"application/vnd.oasis.opendocument.text-master":{"source":"iana","extensions":["odm"]},"application/vnd.oasis.opendocument.text-template":{"source":"iana","extensions":["ott"]},"application/vnd.oasis.opendocument.text-web":{"source":"iana","extensions":["oth"]},"application/vnd.obn":{"source":"iana"},"application/vnd.ocf+cbor":{"source":"iana"},"application/vnd.oci.image.manifest.v1+json":{"source":"iana","compressible":true},"application/vnd.oftn.l10n+json":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessdownload+xml":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessstreaming+xml":{"source":"iana","compressible":true},"application/vnd.oipf.cspg-hexbinary":{"source":"iana"},"application/vnd.oipf.dae.svg+xml":{"source":"iana","compressible":true},"application/vnd.oipf.dae.xhtml+xml":{"source":"iana","compressible":true},"application/vnd.oipf.mippvcontrolmessage+xml":{"source":"iana","compressible":true},"application/vnd.oipf.pae.gem":{"source":"iana"},"application/vnd.oipf.spdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.oipf.spdlist+xml":{"source":"iana","compressible":true},"application/vnd.oipf.ueprofile+xml":{"source":"iana","compressible":true},"application/vnd.oipf.userprofile+xml":{"source":"iana","compressible":true},"application/vnd.olpc-sugar":{"source":"iana","extensions":["xo"]},"application/vnd.oma-scws-config":{"source":"iana"},"application/vnd.oma-scws-http-request":{"source":"iana"},"application/vnd.oma-scws-http-response":{"source":"iana"},"application/vnd.oma.bcast.associated-procedure-parameter+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.drm-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.imd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.ltkm":{"source":"iana"},"application/vnd.oma.bcast.notification+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.provisioningtrigger":{"source":"iana"},"application/vnd.oma.bcast.sgboot":{"source":"iana"},"application/vnd.oma.bcast.sgdd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sgdu":{"source":"iana"},"application/vnd.oma.bcast.simple-symbol-container":{"source":"iana"},"application/vnd.oma.bcast.smartcard-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sprov+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.stkm":{"source":"iana"},"application/vnd.oma.cab-address-book+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-feature-handler+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-pcc+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-subs-invite+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-user-prefs+xml":{"source":"iana","compressible":true},"application/vnd.oma.dcd":{"source":"iana"},"application/vnd.oma.dcdc":{"source":"iana"},"application/vnd.oma.dd2+xml":{"source":"iana","compressible":true,"extensions":["dd2"]},"application/vnd.oma.drm.risd+xml":{"source":"iana","compressible":true},"application/vnd.oma.group-usage-list+xml":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+cbor":{"source":"iana"},"application/vnd.oma.lwm2m+json":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+tlv":{"source":"iana"},"application/vnd.oma.pal+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.detailed-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.final-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.groups+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.invocation-descriptor+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.optimized-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.push":{"source":"iana"},"application/vnd.oma.scidm.messages+xml":{"source":"iana","compressible":true},"application/vnd.oma.xcap-directory+xml":{"source":"iana","compressible":true},"application/vnd.omads-email+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omads-file+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omads-folder+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omaloc-supl-init":{"source":"iana"},"application/vnd.onepager":{"source":"iana"},"application/vnd.onepagertamp":{"source":"iana"},"application/vnd.onepagertamx":{"source":"iana"},"application/vnd.onepagertat":{"source":"iana"},"application/vnd.onepagertatp":{"source":"iana"},"application/vnd.onepagertatx":{"source":"iana"},"application/vnd.openblox.game+xml":{"source":"iana","compressible":true,"extensions":["obgx"]},"application/vnd.openblox.game-binary":{"source":"iana"},"application/vnd.openeye.oeb":{"source":"iana"},"application/vnd.openofficeorg.extension":{"source":"apache","extensions":["oxt"]},"application/vnd.openstreetmap.data+xml":{"source":"iana","compressible":true,"extensions":["osm"]},"application/vnd.opentimestamps.ots":{"source":"iana"},"application/vnd.openxmlformats-officedocument.custom-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.customxmlproperties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawing+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chart+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.extended-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presentation":{"source":"iana","compressible":false,"extensions":["pptx"]},"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slide":{"source":"iana","extensions":["sldx"]},"application/vnd.openxmlformats-officedocument.presentationml.slide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideshow":{"source":"iana","extensions":["ppsx"]},"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tags+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.template":{"source":"iana","extensions":["potx"]},"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{"source":"iana","compressible":false,"extensions":["xlsx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.template":{"source":"iana","extensions":["xltx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.theme+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.themeoverride+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.vmldrawing":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document":{"source":"iana","compressible":false,"extensions":["docx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.template":{"source":"iana","extensions":["dotx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.core-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.relationships+xml":{"source":"iana","compressible":true},"application/vnd.oracle.resource+json":{"source":"iana","compressible":true},"application/vnd.orange.indata":{"source":"iana"},"application/vnd.osa.netdeploy":{"source":"iana"},"application/vnd.osgeo.mapguide.package":{"source":"iana","extensions":["mgp"]},"application/vnd.osgi.bundle":{"source":"iana"},"application/vnd.osgi.dp":{"source":"iana","extensions":["dp"]},"application/vnd.osgi.subsystem":{"source":"iana","extensions":["esa"]},"application/vnd.otps.ct-kip+xml":{"source":"iana","compressible":true},"application/vnd.oxli.countgraph":{"source":"iana"},"application/vnd.pagerduty+json":{"source":"iana","compressible":true},"application/vnd.palm":{"source":"iana","extensions":["pdb","pqa","oprc"]},"application/vnd.panoply":{"source":"iana"},"application/vnd.paos.xml":{"source":"iana"},"application/vnd.patentdive":{"source":"iana"},"application/vnd.patientecommsdoc":{"source":"iana"},"application/vnd.pawaafile":{"source":"iana","extensions":["paw"]},"application/vnd.pcos":{"source":"iana"},"application/vnd.pg.format":{"source":"iana","extensions":["str"]},"application/vnd.pg.osasli":{"source":"iana","extensions":["ei6"]},"application/vnd.piaccess.application-licence":{"source":"iana"},"application/vnd.picsel":{"source":"iana","extensions":["efif"]},"application/vnd.pmi.widget":{"source":"iana","extensions":["wg"]},"application/vnd.poc.group-advertisement+xml":{"source":"iana","compressible":true},"application/vnd.pocketlearn":{"source":"iana","extensions":["plf"]},"application/vnd.powerbuilder6":{"source":"iana","extensions":["pbd"]},"application/vnd.powerbuilder6-s":{"source":"iana"},"application/vnd.powerbuilder7":{"source":"iana"},"application/vnd.powerbuilder7-s":{"source":"iana"},"application/vnd.powerbuilder75":{"source":"iana"},"application/vnd.powerbuilder75-s":{"source":"iana"},"application/vnd.preminet":{"source":"iana"},"application/vnd.previewsystems.box":{"source":"iana","extensions":["box"]},"application/vnd.proteus.magazine":{"source":"iana","extensions":["mgz"]},"application/vnd.psfs":{"source":"iana"},"application/vnd.publishare-delta-tree":{"source":"iana","extensions":["qps"]},"application/vnd.pvi.ptid1":{"source":"iana","extensions":["ptid"]},"application/vnd.pwg-multiplexed":{"source":"iana"},"application/vnd.pwg-xhtml-print+xml":{"source":"iana","compressible":true},"application/vnd.qualcomm.brew-app-res":{"source":"iana"},"application/vnd.quarantainenet":{"source":"iana"},"application/vnd.quark.quarkxpress":{"source":"iana","extensions":["qxd","qxt","qwd","qwt","qxl","qxb"]},"application/vnd.quobject-quoxdocument":{"source":"iana"},"application/vnd.radisys.moml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conn+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-stream+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-base+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-detect+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-sendrecv+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-group+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-speech+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-transform+xml":{"source":"iana","compressible":true},"application/vnd.rainstor.data":{"source":"iana"},"application/vnd.rapid":{"source":"iana"},"application/vnd.rar":{"source":"iana","extensions":["rar"]},"application/vnd.realvnc.bed":{"source":"iana","extensions":["bed"]},"application/vnd.recordare.musicxml":{"source":"iana","extensions":["mxl"]},"application/vnd.recordare.musicxml+xml":{"source":"iana","compressible":true,"extensions":["musicxml"]},"application/vnd.renlearn.rlprint":{"source":"iana"},"application/vnd.resilient.logic":{"source":"iana"},"application/vnd.restful+json":{"source":"iana","compressible":true},"application/vnd.rig.cryptonote":{"source":"iana","extensions":["cryptonote"]},"application/vnd.rim.cod":{"source":"apache","extensions":["cod"]},"application/vnd.rn-realmedia":{"source":"apache","extensions":["rm"]},"application/vnd.rn-realmedia-vbr":{"source":"apache","extensions":["rmvb"]},"application/vnd.route66.link66+xml":{"source":"iana","compressible":true,"extensions":["link66"]},"application/vnd.rs-274x":{"source":"iana"},"application/vnd.ruckus.download":{"source":"iana"},"application/vnd.s3sms":{"source":"iana"},"application/vnd.sailingtracker.track":{"source":"iana","extensions":["st"]},"application/vnd.sar":{"source":"iana"},"application/vnd.sbm.cid":{"source":"iana"},"application/vnd.sbm.mid2":{"source":"iana"},"application/vnd.scribus":{"source":"iana"},"application/vnd.sealed.3df":{"source":"iana"},"application/vnd.sealed.csf":{"source":"iana"},"application/vnd.sealed.doc":{"source":"iana"},"application/vnd.sealed.eml":{"source":"iana"},"application/vnd.sealed.mht":{"source":"iana"},"application/vnd.sealed.net":{"source":"iana"},"application/vnd.sealed.ppt":{"source":"iana"},"application/vnd.sealed.tiff":{"source":"iana"},"application/vnd.sealed.xls":{"source":"iana"},"application/vnd.sealedmedia.softseal.html":{"source":"iana"},"application/vnd.sealedmedia.softseal.pdf":{"source":"iana"},"application/vnd.seemail":{"source":"iana","extensions":["see"]},"application/vnd.seis+json":{"source":"iana","compressible":true},"application/vnd.sema":{"source":"iana","extensions":["sema"]},"application/vnd.semd":{"source":"iana","extensions":["semd"]},"application/vnd.semf":{"source":"iana","extensions":["semf"]},"application/vnd.shade-save-file":{"source":"iana"},"application/vnd.shana.informed.formdata":{"source":"iana","extensions":["ifm"]},"application/vnd.shana.informed.formtemplate":{"source":"iana","extensions":["itp"]},"application/vnd.shana.informed.interchange":{"source":"iana","extensions":["iif"]},"application/vnd.shana.informed.package":{"source":"iana","extensions":["ipk"]},"application/vnd.shootproof+json":{"source":"iana","compressible":true},"application/vnd.shopkick+json":{"source":"iana","compressible":true},"application/vnd.shp":{"source":"iana"},"application/vnd.shx":{"source":"iana"},"application/vnd.sigrok.session":{"source":"iana"},"application/vnd.simtech-mindmapper":{"source":"iana","extensions":["twd","twds"]},"application/vnd.siren+json":{"source":"iana","compressible":true},"application/vnd.smaf":{"source":"iana","extensions":["mmf"]},"application/vnd.smart.notebook":{"source":"iana"},"application/vnd.smart.teacher":{"source":"iana","extensions":["teacher"]},"application/vnd.snesdev-page-table":{"source":"iana"},"application/vnd.software602.filler.form+xml":{"source":"iana","compressible":true,"extensions":["fo"]},"application/vnd.software602.filler.form-xml-zip":{"source":"iana"},"application/vnd.solent.sdkm+xml":{"source":"iana","compressible":true,"extensions":["sdkm","sdkd"]},"application/vnd.spotfire.dxp":{"source":"iana","extensions":["dxp"]},"application/vnd.spotfire.sfs":{"source":"iana","extensions":["sfs"]},"application/vnd.sqlite3":{"source":"iana"},"application/vnd.sss-cod":{"source":"iana"},"application/vnd.sss-dtf":{"source":"iana"},"application/vnd.sss-ntf":{"source":"iana"},"application/vnd.stardivision.calc":{"source":"apache","extensions":["sdc"]},"application/vnd.stardivision.draw":{"source":"apache","extensions":["sda"]},"application/vnd.stardivision.impress":{"source":"apache","extensions":["sdd"]},"application/vnd.stardivision.math":{"source":"apache","extensions":["smf"]},"application/vnd.stardivision.writer":{"source":"apache","extensions":["sdw","vor"]},"application/vnd.stardivision.writer-global":{"source":"apache","extensions":["sgl"]},"application/vnd.stepmania.package":{"source":"iana","extensions":["smzip"]},"application/vnd.stepmania.stepchart":{"source":"iana","extensions":["sm"]},"application/vnd.street-stream":{"source":"iana"},"application/vnd.sun.wadl+xml":{"source":"iana","compressible":true,"extensions":["wadl"]},"application/vnd.sun.xml.calc":{"source":"apache","extensions":["sxc"]},"application/vnd.sun.xml.calc.template":{"source":"apache","extensions":["stc"]},"application/vnd.sun.xml.draw":{"source":"apache","extensions":["sxd"]},"application/vnd.sun.xml.draw.template":{"source":"apache","extensions":["std"]},"application/vnd.sun.xml.impress":{"source":"apache","extensions":["sxi"]},"application/vnd.sun.xml.impress.template":{"source":"apache","extensions":["sti"]},"application/vnd.sun.xml.math":{"source":"apache","extensions":["sxm"]},"application/vnd.sun.xml.writer":{"source":"apache","extensions":["sxw"]},"application/vnd.sun.xml.writer.global":{"source":"apache","extensions":["sxg"]},"application/vnd.sun.xml.writer.template":{"source":"apache","extensions":["stw"]},"application/vnd.sus-calendar":{"source":"iana","extensions":["sus","susp"]},"application/vnd.svd":{"source":"iana","extensions":["svd"]},"application/vnd.swiftview-ics":{"source":"iana"},"application/vnd.sycle+xml":{"source":"iana","compressible":true},"application/vnd.symbian.install":{"source":"apache","extensions":["sis","sisx"]},"application/vnd.syncml+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xsm"]},"application/vnd.syncml.dm+wbxml":{"source":"iana","charset":"UTF-8","extensions":["bdm"]},"application/vnd.syncml.dm+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xdm"]},"application/vnd.syncml.dm.notification":{"source":"iana"},"application/vnd.syncml.dmddf+wbxml":{"source":"iana"},"application/vnd.syncml.dmddf+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["ddf"]},"application/vnd.syncml.dmtnds+wbxml":{"source":"iana"},"application/vnd.syncml.dmtnds+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.syncml.ds.notification":{"source":"iana"},"application/vnd.tableschema+json":{"source":"iana","compressible":true},"application/vnd.tao.intent-module-archive":{"source":"iana","extensions":["tao"]},"application/vnd.tcpdump.pcap":{"source":"iana","extensions":["pcap","cap","dmp"]},"application/vnd.think-cell.ppttc+json":{"source":"iana","compressible":true},"application/vnd.tmd.mediaflex.api+xml":{"source":"iana","compressible":true},"application/vnd.tml":{"source":"iana"},"application/vnd.tmobile-livetv":{"source":"iana","extensions":["tmo"]},"application/vnd.tri.onesource":{"source":"iana"},"application/vnd.trid.tpt":{"source":"iana","extensions":["tpt"]},"application/vnd.triscape.mxs":{"source":"iana","extensions":["mxs"]},"application/vnd.trueapp":{"source":"iana","extensions":["tra"]},"application/vnd.truedoc":{"source":"iana"},"application/vnd.ubisoft.webplayer":{"source":"iana"},"application/vnd.ufdl":{"source":"iana","extensions":["ufd","ufdl"]},"application/vnd.uiq.theme":{"source":"iana","extensions":["utz"]},"application/vnd.umajin":{"source":"iana","extensions":["umj"]},"application/vnd.unity":{"source":"iana","extensions":["unityweb"]},"application/vnd.uoml+xml":{"source":"iana","compressible":true,"extensions":["uoml"]},"application/vnd.uplanet.alert":{"source":"iana"},"application/vnd.uplanet.alert-wbxml":{"source":"iana"},"application/vnd.uplanet.bearer-choice":{"source":"iana"},"application/vnd.uplanet.bearer-choice-wbxml":{"source":"iana"},"application/vnd.uplanet.cacheop":{"source":"iana"},"application/vnd.uplanet.cacheop-wbxml":{"source":"iana"},"application/vnd.uplanet.channel":{"source":"iana"},"application/vnd.uplanet.channel-wbxml":{"source":"iana"},"application/vnd.uplanet.list":{"source":"iana"},"application/vnd.uplanet.list-wbxml":{"source":"iana"},"application/vnd.uplanet.listcmd":{"source":"iana"},"application/vnd.uplanet.listcmd-wbxml":{"source":"iana"},"application/vnd.uplanet.signal":{"source":"iana"},"application/vnd.uri-map":{"source":"iana"},"application/vnd.valve.source.material":{"source":"iana"},"application/vnd.vcx":{"source":"iana","extensions":["vcx"]},"application/vnd.vd-study":{"source":"iana"},"application/vnd.vectorworks":{"source":"iana"},"application/vnd.vel+json":{"source":"iana","compressible":true},"application/vnd.verimatrix.vcas":{"source":"iana"},"application/vnd.veritone.aion+json":{"source":"iana","compressible":true},"application/vnd.veryant.thin":{"source":"iana"},"application/vnd.ves.encrypted":{"source":"iana"},"application/vnd.vidsoft.vidconference":{"source":"iana"},"application/vnd.visio":{"source":"iana","extensions":["vsd","vst","vss","vsw"]},"application/vnd.visionary":{"source":"iana","extensions":["vis"]},"application/vnd.vividence.scriptfile":{"source":"iana"},"application/vnd.vsf":{"source":"iana","extensions":["vsf"]},"application/vnd.wap.sic":{"source":"iana"},"application/vnd.wap.slc":{"source":"iana"},"application/vnd.wap.wbxml":{"source":"iana","charset":"UTF-8","extensions":["wbxml"]},"application/vnd.wap.wmlc":{"source":"iana","extensions":["wmlc"]},"application/vnd.wap.wmlscriptc":{"source":"iana","extensions":["wmlsc"]},"application/vnd.webturbo":{"source":"iana","extensions":["wtb"]},"application/vnd.wfa.dpp":{"source":"iana"},"application/vnd.wfa.p2p":{"source":"iana"},"application/vnd.wfa.wsc":{"source":"iana"},"application/vnd.windows.devicepairing":{"source":"iana"},"application/vnd.wmc":{"source":"iana"},"application/vnd.wmf.bootstrap":{"source":"iana"},"application/vnd.wolfram.mathematica":{"source":"iana"},"application/vnd.wolfram.mathematica.package":{"source":"iana"},"application/vnd.wolfram.player":{"source":"iana","extensions":["nbp"]},"application/vnd.wordperfect":{"source":"iana","extensions":["wpd"]},"application/vnd.wqd":{"source":"iana","extensions":["wqd"]},"application/vnd.wrq-hp3000-labelled":{"source":"iana"},"application/vnd.wt.stf":{"source":"iana","extensions":["stf"]},"application/vnd.wv.csp+wbxml":{"source":"iana"},"application/vnd.wv.csp+xml":{"source":"iana","compressible":true},"application/vnd.wv.ssp+xml":{"source":"iana","compressible":true},"application/vnd.xacml+json":{"source":"iana","compressible":true},"application/vnd.xara":{"source":"iana","extensions":["xar"]},"application/vnd.xfdl":{"source":"iana","extensions":["xfdl"]},"application/vnd.xfdl.webform":{"source":"iana"},"application/vnd.xmi+xml":{"source":"iana","compressible":true},"application/vnd.xmpie.cpkg":{"source":"iana"},"application/vnd.xmpie.dpkg":{"source":"iana"},"application/vnd.xmpie.plan":{"source":"iana"},"application/vnd.xmpie.ppkg":{"source":"iana"},"application/vnd.xmpie.xlim":{"source":"iana"},"application/vnd.yamaha.hv-dic":{"source":"iana","extensions":["hvd"]},"application/vnd.yamaha.hv-script":{"source":"iana","extensions":["hvs"]},"application/vnd.yamaha.hv-voice":{"source":"iana","extensions":["hvp"]},"application/vnd.yamaha.openscoreformat":{"source":"iana","extensions":["osf"]},"application/vnd.yamaha.openscoreformat.osfpvg+xml":{"source":"iana","compressible":true,"extensions":["osfpvg"]},"application/vnd.yamaha.remote-setup":{"source":"iana"},"application/vnd.yamaha.smaf-audio":{"source":"iana","extensions":["saf"]},"application/vnd.yamaha.smaf-phrase":{"source":"iana","extensions":["spf"]},"application/vnd.yamaha.through-ngn":{"source":"iana"},"application/vnd.yamaha.tunnel-udpencap":{"source":"iana"},"application/vnd.yaoweme":{"source":"iana"},"application/vnd.yellowriver-custom-menu":{"source":"iana","extensions":["cmp"]},"application/vnd.youtube.yt":{"source":"iana"},"application/vnd.zul":{"source":"iana","extensions":["zir","zirz"]},"application/vnd.zzazz.deck+xml":{"source":"iana","compressible":true,"extensions":["zaz"]},"application/voicexml+xml":{"source":"iana","compressible":true,"extensions":["vxml"]},"application/voucher-cms+json":{"source":"iana","compressible":true},"application/vq-rtcpxr":{"source":"iana"},"application/wasm":{"source":"iana","compressible":true,"extensions":["wasm"]},"application/watcherinfo+xml":{"source":"iana","compressible":true},"application/webpush-options+json":{"source":"iana","compressible":true},"application/whoispp-query":{"source":"iana"},"application/whoispp-response":{"source":"iana"},"application/widget":{"source":"iana","extensions":["wgt"]},"application/winhlp":{"source":"apache","extensions":["hlp"]},"application/wita":{"source":"iana"},"application/wordperfect5.1":{"source":"iana"},"application/wsdl+xml":{"source":"iana","compressible":true,"extensions":["wsdl"]},"application/wspolicy+xml":{"source":"iana","compressible":true,"extensions":["wspolicy"]},"application/x-7z-compressed":{"source":"apache","compressible":false,"extensions":["7z"]},"application/x-abiword":{"source":"apache","extensions":["abw"]},"application/x-ace-compressed":{"source":"apache","extensions":["ace"]},"application/x-amf":{"source":"apache"},"application/x-apple-diskimage":{"source":"apache","extensions":["dmg"]},"application/x-arj":{"compressible":false,"extensions":["arj"]},"application/x-authorware-bin":{"source":"apache","extensions":["aab","x32","u32","vox"]},"application/x-authorware-map":{"source":"apache","extensions":["aam"]},"application/x-authorware-seg":{"source":"apache","extensions":["aas"]},"application/x-bcpio":{"source":"apache","extensions":["bcpio"]},"application/x-bdoc":{"compressible":false,"extensions":["bdoc"]},"application/x-bittorrent":{"source":"apache","extensions":["torrent"]},"application/x-blorb":{"source":"apache","extensions":["blb","blorb"]},"application/x-bzip":{"source":"apache","compressible":false,"extensions":["bz"]},"application/x-bzip2":{"source":"apache","compressible":false,"extensions":["bz2","boz"]},"application/x-cbr":{"source":"apache","extensions":["cbr","cba","cbt","cbz","cb7"]},"application/x-cdlink":{"source":"apache","extensions":["vcd"]},"application/x-cfs-compressed":{"source":"apache","extensions":["cfs"]},"application/x-chat":{"source":"apache","extensions":["chat"]},"application/x-chess-pgn":{"source":"apache","extensions":["pgn"]},"application/x-chrome-extension":{"extensions":["crx"]},"application/x-cocoa":{"source":"nginx","extensions":["cco"]},"application/x-compress":{"source":"apache"},"application/x-conference":{"source":"apache","extensions":["nsc"]},"application/x-cpio":{"source":"apache","extensions":["cpio"]},"application/x-csh":{"source":"apache","extensions":["csh"]},"application/x-deb":{"compressible":false},"application/x-debian-package":{"source":"apache","extensions":["deb","udeb"]},"application/x-dgc-compressed":{"source":"apache","extensions":["dgc"]},"application/x-director":{"source":"apache","extensions":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]},"application/x-doom":{"source":"apache","extensions":["wad"]},"application/x-dtbncx+xml":{"source":"apache","compressible":true,"extensions":["ncx"]},"application/x-dtbook+xml":{"source":"apache","compressible":true,"extensions":["dtb"]},"application/x-dtbresource+xml":{"source":"apache","compressible":true,"extensions":["res"]},"application/x-dvi":{"source":"apache","compressible":false,"extensions":["dvi"]},"application/x-envoy":{"source":"apache","extensions":["evy"]},"application/x-eva":{"source":"apache","extensions":["eva"]},"application/x-font-bdf":{"source":"apache","extensions":["bdf"]},"application/x-font-dos":{"source":"apache"},"application/x-font-framemaker":{"source":"apache"},"application/x-font-ghostscript":{"source":"apache","extensions":["gsf"]},"application/x-font-libgrx":{"source":"apache"},"application/x-font-linux-psf":{"source":"apache","extensions":["psf"]},"application/x-font-pcf":{"source":"apache","extensions":["pcf"]},"application/x-font-snf":{"source":"apache","extensions":["snf"]},"application/x-font-speedo":{"source":"apache"},"application/x-font-sunos-news":{"source":"apache"},"application/x-font-type1":{"source":"apache","extensions":["pfa","pfb","pfm","afm"]},"application/x-font-vfont":{"source":"apache"},"application/x-freearc":{"source":"apache","extensions":["arc"]},"application/x-futuresplash":{"source":"apache","extensions":["spl"]},"application/x-gca-compressed":{"source":"apache","extensions":["gca"]},"application/x-glulx":{"source":"apache","extensions":["ulx"]},"application/x-gnumeric":{"source":"apache","extensions":["gnumeric"]},"application/x-gramps-xml":{"source":"apache","extensions":["gramps"]},"application/x-gtar":{"source":"apache","extensions":["gtar"]},"application/x-gzip":{"source":"apache"},"application/x-hdf":{"source":"apache","extensions":["hdf"]},"application/x-httpd-php":{"compressible":true,"extensions":["php"]},"application/x-install-instructions":{"source":"apache","extensions":["install"]},"application/x-iso9660-image":{"source":"apache","extensions":["iso"]},"application/x-iwork-keynote-sffkey":{"extensions":["key"]},"application/x-iwork-numbers-sffnumbers":{"extensions":["numbers"]},"application/x-iwork-pages-sffpages":{"extensions":["pages"]},"application/x-java-archive-diff":{"source":"nginx","extensions":["jardiff"]},"application/x-java-jnlp-file":{"source":"apache","compressible":false,"extensions":["jnlp"]},"application/x-javascript":{"compressible":true},"application/x-keepass2":{"extensions":["kdbx"]},"application/x-latex":{"source":"apache","compressible":false,"extensions":["latex"]},"application/x-lua-bytecode":{"extensions":["luac"]},"application/x-lzh-compressed":{"source":"apache","extensions":["lzh","lha"]},"application/x-makeself":{"source":"nginx","extensions":["run"]},"application/x-mie":{"source":"apache","extensions":["mie"]},"application/x-mobipocket-ebook":{"source":"apache","extensions":["prc","mobi"]},"application/x-mpegurl":{"compressible":false},"application/x-ms-application":{"source":"apache","extensions":["application"]},"application/x-ms-shortcut":{"source":"apache","extensions":["lnk"]},"application/x-ms-wmd":{"source":"apache","extensions":["wmd"]},"application/x-ms-wmz":{"source":"apache","extensions":["wmz"]},"application/x-ms-xbap":{"source":"apache","extensions":["xbap"]},"application/x-msaccess":{"source":"apache","extensions":["mdb"]},"application/x-msbinder":{"source":"apache","extensions":["obd"]},"application/x-mscardfile":{"source":"apache","extensions":["crd"]},"application/x-msclip":{"source":"apache","extensions":["clp"]},"application/x-msdos-program":{"extensions":["exe"]},"application/x-msdownload":{"source":"apache","extensions":["exe","dll","com","bat","msi"]},"application/x-msmediaview":{"source":"apache","extensions":["mvb","m13","m14"]},"application/x-msmetafile":{"source":"apache","extensions":["wmf","wmz","emf","emz"]},"application/x-msmoney":{"source":"apache","extensions":["mny"]},"application/x-mspublisher":{"source":"apache","extensions":["pub"]},"application/x-msschedule":{"source":"apache","extensions":["scd"]},"application/x-msterminal":{"source":"apache","extensions":["trm"]},"application/x-mswrite":{"source":"apache","extensions":["wri"]},"application/x-netcdf":{"source":"apache","extensions":["nc","cdf"]},"application/x-ns-proxy-autoconfig":{"compressible":true,"extensions":["pac"]},"application/x-nzb":{"source":"apache","extensions":["nzb"]},"application/x-perl":{"source":"nginx","extensions":["pl","pm"]},"application/x-pilot":{"source":"nginx","extensions":["prc","pdb"]},"application/x-pkcs12":{"source":"apache","compressible":false,"extensions":["p12","pfx"]},"application/x-pkcs7-certificates":{"source":"apache","extensions":["p7b","spc"]},"application/x-pkcs7-certreqresp":{"source":"apache","extensions":["p7r"]},"application/x-pki-message":{"source":"iana"},"application/x-rar-compressed":{"source":"apache","compressible":false,"extensions":["rar"]},"application/x-redhat-package-manager":{"source":"nginx","extensions":["rpm"]},"application/x-research-info-systems":{"source":"apache","extensions":["ris"]},"application/x-sea":{"source":"nginx","extensions":["sea"]},"application/x-sh":{"source":"apache","compressible":true,"extensions":["sh"]},"application/x-shar":{"source":"apache","extensions":["shar"]},"application/x-shockwave-flash":{"source":"apache","compressible":false,"extensions":["swf"]},"application/x-silverlight-app":{"source":"apache","extensions":["xap"]},"application/x-sql":{"source":"apache","extensions":["sql"]},"application/x-stuffit":{"source":"apache","compressible":false,"extensions":["sit"]},"application/x-stuffitx":{"source":"apache","extensions":["sitx"]},"application/x-subrip":{"source":"apache","extensions":["srt"]},"application/x-sv4cpio":{"source":"apache","extensions":["sv4cpio"]},"application/x-sv4crc":{"source":"apache","extensions":["sv4crc"]},"application/x-t3vm-image":{"source":"apache","extensions":["t3"]},"application/x-tads":{"source":"apache","extensions":["gam"]},"application/x-tar":{"source":"apache","compressible":true,"extensions":["tar"]},"application/x-tcl":{"source":"apache","extensions":["tcl","tk"]},"application/x-tex":{"source":"apache","extensions":["tex"]},"application/x-tex-tfm":{"source":"apache","extensions":["tfm"]},"application/x-texinfo":{"source":"apache","extensions":["texinfo","texi"]},"application/x-tgif":{"source":"apache","extensions":["obj"]},"application/x-ustar":{"source":"apache","extensions":["ustar"]},"application/x-virtualbox-hdd":{"compressible":true,"extensions":["hdd"]},"application/x-virtualbox-ova":{"compressible":true,"extensions":["ova"]},"application/x-virtualbox-ovf":{"compressible":true,"extensions":["ovf"]},"application/x-virtualbox-vbox":{"compressible":true,"extensions":["vbox"]},"application/x-virtualbox-vbox-extpack":{"compressible":false,"extensions":["vbox-extpack"]},"application/x-virtualbox-vdi":{"compressible":true,"extensions":["vdi"]},"application/x-virtualbox-vhd":{"compressible":true,"extensions":["vhd"]},"application/x-virtualbox-vmdk":{"compressible":true,"extensions":["vmdk"]},"application/x-wais-source":{"source":"apache","extensions":["src"]},"application/x-web-app-manifest+json":{"compressible":true,"extensions":["webapp"]},"application/x-www-form-urlencoded":{"source":"iana","compressible":true},"application/x-x509-ca-cert":{"source":"iana","extensions":["der","crt","pem"]},"application/x-x509-ca-ra-cert":{"source":"iana"},"application/x-x509-next-ca-cert":{"source":"iana"},"application/x-xfig":{"source":"apache","extensions":["fig"]},"application/x-xliff+xml":{"source":"apache","compressible":true,"extensions":["xlf"]},"application/x-xpinstall":{"source":"apache","compressible":false,"extensions":["xpi"]},"application/x-xz":{"source":"apache","extensions":["xz"]},"application/x-zmachine":{"source":"apache","extensions":["z1","z2","z3","z4","z5","z6","z7","z8"]},"application/x400-bp":{"source":"iana"},"application/xacml+xml":{"source":"iana","compressible":true},"application/xaml+xml":{"source":"apache","compressible":true,"extensions":["xaml"]},"application/xcap-att+xml":{"source":"iana","compressible":true,"extensions":["xav"]},"application/xcap-caps+xml":{"source":"iana","compressible":true,"extensions":["xca"]},"application/xcap-diff+xml":{"source":"iana","compressible":true,"extensions":["xdf"]},"application/xcap-el+xml":{"source":"iana","compressible":true,"extensions":["xel"]},"application/xcap-error+xml":{"source":"iana","compressible":true},"application/xcap-ns+xml":{"source":"iana","compressible":true,"extensions":["xns"]},"application/xcon-conference-info+xml":{"source":"iana","compressible":true},"application/xcon-conference-info-diff+xml":{"source":"iana","compressible":true},"application/xenc+xml":{"source":"iana","compressible":true,"extensions":["xenc"]},"application/xhtml+xml":{"source":"iana","compressible":true,"extensions":["xhtml","xht"]},"application/xhtml-voice+xml":{"source":"apache","compressible":true},"application/xliff+xml":{"source":"iana","compressible":true,"extensions":["xlf"]},"application/xml":{"source":"iana","compressible":true,"extensions":["xml","xsl","xsd","rng"]},"application/xml-dtd":{"source":"iana","compressible":true,"extensions":["dtd"]},"application/xml-external-parsed-entity":{"source":"iana"},"application/xml-patch+xml":{"source":"iana","compressible":true},"application/xmpp+xml":{"source":"iana","compressible":true},"application/xop+xml":{"source":"iana","compressible":true,"extensions":["xop"]},"application/xproc+xml":{"source":"apache","compressible":true,"extensions":["xpl"]},"application/xslt+xml":{"source":"iana","compressible":true,"extensions":["xsl","xslt"]},"application/xspf+xml":{"source":"apache","compressible":true,"extensions":["xspf"]},"application/xv+xml":{"source":"iana","compressible":true,"extensions":["mxml","xhvml","xvml","xvm"]},"application/yang":{"source":"iana","extensions":["yang"]},"application/yang-data+json":{"source":"iana","compressible":true},"application/yang-data+xml":{"source":"iana","compressible":true},"application/yang-patch+json":{"source":"iana","compressible":true},"application/yang-patch+xml":{"source":"iana","compressible":true},"application/yin+xml":{"source":"iana","compressible":true,"extensions":["yin"]},"application/zip":{"source":"iana","compressible":false,"extensions":["zip"]},"application/zlib":{"source":"iana"},"application/zstd":{"source":"iana"},"audio/1d-interleaved-parityfec":{"source":"iana"},"audio/32kadpcm":{"source":"iana"},"audio/3gpp":{"source":"iana","compressible":false,"extensions":["3gpp"]},"audio/3gpp2":{"source":"iana"},"audio/aac":{"source":"iana"},"audio/ac3":{"source":"iana"},"audio/adpcm":{"source":"apache","extensions":["adp"]},"audio/amr":{"source":"iana","extensions":["amr"]},"audio/amr-wb":{"source":"iana"},"audio/amr-wb+":{"source":"iana"},"audio/aptx":{"source":"iana"},"audio/asc":{"source":"iana"},"audio/atrac-advanced-lossless":{"source":"iana"},"audio/atrac-x":{"source":"iana"},"audio/atrac3":{"source":"iana"},"audio/basic":{"source":"iana","compressible":false,"extensions":["au","snd"]},"audio/bv16":{"source":"iana"},"audio/bv32":{"source":"iana"},"audio/clearmode":{"source":"iana"},"audio/cn":{"source":"iana"},"audio/dat12":{"source":"iana"},"audio/dls":{"source":"iana"},"audio/dsr-es201108":{"source":"iana"},"audio/dsr-es202050":{"source":"iana"},"audio/dsr-es202211":{"source":"iana"},"audio/dsr-es202212":{"source":"iana"},"audio/dv":{"source":"iana"},"audio/dvi4":{"source":"iana"},"audio/eac3":{"source":"iana"},"audio/encaprtp":{"source":"iana"},"audio/evrc":{"source":"iana"},"audio/evrc-qcp":{"source":"iana"},"audio/evrc0":{"source":"iana"},"audio/evrc1":{"source":"iana"},"audio/evrcb":{"source":"iana"},"audio/evrcb0":{"source":"iana"},"audio/evrcb1":{"source":"iana"},"audio/evrcnw":{"source":"iana"},"audio/evrcnw0":{"source":"iana"},"audio/evrcnw1":{"source":"iana"},"audio/evrcwb":{"source":"iana"},"audio/evrcwb0":{"source":"iana"},"audio/evrcwb1":{"source":"iana"},"audio/evs":{"source":"iana"},"audio/flexfec":{"source":"iana"},"audio/fwdred":{"source":"iana"},"audio/g711-0":{"source":"iana"},"audio/g719":{"source":"iana"},"audio/g722":{"source":"iana"},"audio/g7221":{"source":"iana"},"audio/g723":{"source":"iana"},"audio/g726-16":{"source":"iana"},"audio/g726-24":{"source":"iana"},"audio/g726-32":{"source":"iana"},"audio/g726-40":{"source":"iana"},"audio/g728":{"source":"iana"},"audio/g729":{"source":"iana"},"audio/g7291":{"source":"iana"},"audio/g729d":{"source":"iana"},"audio/g729e":{"source":"iana"},"audio/gsm":{"source":"iana"},"audio/gsm-efr":{"source":"iana"},"audio/gsm-hr-08":{"source":"iana"},"audio/ilbc":{"source":"iana"},"audio/ip-mr_v2.5":{"source":"iana"},"audio/isac":{"source":"apache"},"audio/l16":{"source":"iana"},"audio/l20":{"source":"iana"},"audio/l24":{"source":"iana","compressible":false},"audio/l8":{"source":"iana"},"audio/lpc":{"source":"iana"},"audio/melp":{"source":"iana"},"audio/melp1200":{"source":"iana"},"audio/melp2400":{"source":"iana"},"audio/melp600":{"source":"iana"},"audio/mhas":{"source":"iana"},"audio/midi":{"source":"apache","extensions":["mid","midi","kar","rmi"]},"audio/mobile-xmf":{"source":"iana","extensions":["mxmf"]},"audio/mp3":{"compressible":false,"extensions":["mp3"]},"audio/mp4":{"source":"iana","compressible":false,"extensions":["m4a","mp4a"]},"audio/mp4a-latm":{"source":"iana"},"audio/mpa":{"source":"iana"},"audio/mpa-robust":{"source":"iana"},"audio/mpeg":{"source":"iana","compressible":false,"extensions":["mpga","mp2","mp2a","mp3","m2a","m3a"]},"audio/mpeg4-generic":{"source":"iana"},"audio/musepack":{"source":"apache"},"audio/ogg":{"source":"iana","compressible":false,"extensions":["oga","ogg","spx","opus"]},"audio/opus":{"source":"iana"},"audio/parityfec":{"source":"iana"},"audio/pcma":{"source":"iana"},"audio/pcma-wb":{"source":"iana"},"audio/pcmu":{"source":"iana"},"audio/pcmu-wb":{"source":"iana"},"audio/prs.sid":{"source":"iana"},"audio/qcelp":{"source":"iana"},"audio/raptorfec":{"source":"iana"},"audio/red":{"source":"iana"},"audio/rtp-enc-aescm128":{"source":"iana"},"audio/rtp-midi":{"source":"iana"},"audio/rtploopback":{"source":"iana"},"audio/rtx":{"source":"iana"},"audio/s3m":{"source":"apache","extensions":["s3m"]},"audio/scip":{"source":"iana"},"audio/silk":{"source":"apache","extensions":["sil"]},"audio/smv":{"source":"iana"},"audio/smv-qcp":{"source":"iana"},"audio/smv0":{"source":"iana"},"audio/sofa":{"source":"iana"},"audio/sp-midi":{"source":"iana"},"audio/speex":{"source":"iana"},"audio/t140c":{"source":"iana"},"audio/t38":{"source":"iana"},"audio/telephone-event":{"source":"iana"},"audio/tetra_acelp":{"source":"iana"},"audio/tetra_acelp_bb":{"source":"iana"},"audio/tone":{"source":"iana"},"audio/tsvcis":{"source":"iana"},"audio/uemclip":{"source":"iana"},"audio/ulpfec":{"source":"iana"},"audio/usac":{"source":"iana"},"audio/vdvi":{"source":"iana"},"audio/vmr-wb":{"source":"iana"},"audio/vnd.3gpp.iufp":{"source":"iana"},"audio/vnd.4sb":{"source":"iana"},"audio/vnd.audiokoz":{"source":"iana"},"audio/vnd.celp":{"source":"iana"},"audio/vnd.cisco.nse":{"source":"iana"},"audio/vnd.cmles.radio-events":{"source":"iana"},"audio/vnd.cns.anp1":{"source":"iana"},"audio/vnd.cns.inf1":{"source":"iana"},"audio/vnd.dece.audio":{"source":"iana","extensions":["uva","uvva"]},"audio/vnd.digital-winds":{"source":"iana","extensions":["eol"]},"audio/vnd.dlna.adts":{"source":"iana"},"audio/vnd.dolby.heaac.1":{"source":"iana"},"audio/vnd.dolby.heaac.2":{"source":"iana"},"audio/vnd.dolby.mlp":{"source":"iana"},"audio/vnd.dolby.mps":{"source":"iana"},"audio/vnd.dolby.pl2":{"source":"iana"},"audio/vnd.dolby.pl2x":{"source":"iana"},"audio/vnd.dolby.pl2z":{"source":"iana"},"audio/vnd.dolby.pulse.1":{"source":"iana"},"audio/vnd.dra":{"source":"iana","extensions":["dra"]},"audio/vnd.dts":{"source":"iana","extensions":["dts"]},"audio/vnd.dts.hd":{"source":"iana","extensions":["dtshd"]},"audio/vnd.dts.uhd":{"source":"iana"},"audio/vnd.dvb.file":{"source":"iana"},"audio/vnd.everad.plj":{"source":"iana"},"audio/vnd.hns.audio":{"source":"iana"},"audio/vnd.lucent.voice":{"source":"iana","extensions":["lvp"]},"audio/vnd.ms-playready.media.pya":{"source":"iana","extensions":["pya"]},"audio/vnd.nokia.mobile-xmf":{"source":"iana"},"audio/vnd.nortel.vbk":{"source":"iana"},"audio/vnd.nuera.ecelp4800":{"source":"iana","extensions":["ecelp4800"]},"audio/vnd.nuera.ecelp7470":{"source":"iana","extensions":["ecelp7470"]},"audio/vnd.nuera.ecelp9600":{"source":"iana","extensions":["ecelp9600"]},"audio/vnd.octel.sbc":{"source":"iana"},"audio/vnd.presonus.multitrack":{"source":"iana"},"audio/vnd.qcelp":{"source":"iana"},"audio/vnd.rhetorex.32kadpcm":{"source":"iana"},"audio/vnd.rip":{"source":"iana","extensions":["rip"]},"audio/vnd.rn-realaudio":{"compressible":false},"audio/vnd.sealedmedia.softseal.mpeg":{"source":"iana"},"audio/vnd.vmx.cvsd":{"source":"iana"},"audio/vnd.wave":{"compressible":false},"audio/vorbis":{"source":"iana","compressible":false},"audio/vorbis-config":{"source":"iana"},"audio/wav":{"compressible":false,"extensions":["wav"]},"audio/wave":{"compressible":false,"extensions":["wav"]},"audio/webm":{"source":"apache","compressible":false,"extensions":["weba"]},"audio/x-aac":{"source":"apache","compressible":false,"extensions":["aac"]},"audio/x-aiff":{"source":"apache","extensions":["aif","aiff","aifc"]},"audio/x-caf":{"source":"apache","compressible":false,"extensions":["caf"]},"audio/x-flac":{"source":"apache","extensions":["flac"]},"audio/x-m4a":{"source":"nginx","extensions":["m4a"]},"audio/x-matroska":{"source":"apache","extensions":["mka"]},"audio/x-mpegurl":{"source":"apache","extensions":["m3u"]},"audio/x-ms-wax":{"source":"apache","extensions":["wax"]},"audio/x-ms-wma":{"source":"apache","extensions":["wma"]},"audio/x-pn-realaudio":{"source":"apache","extensions":["ram","ra"]},"audio/x-pn-realaudio-plugin":{"source":"apache","extensions":["rmp"]},"audio/x-realaudio":{"source":"nginx","extensions":["ra"]},"audio/x-tta":{"source":"apache"},"audio/x-wav":{"source":"apache","extensions":["wav"]},"audio/xm":{"source":"apache","extensions":["xm"]},"chemical/x-cdx":{"source":"apache","extensions":["cdx"]},"chemical/x-cif":{"source":"apache","extensions":["cif"]},"chemical/x-cmdf":{"source":"apache","extensions":["cmdf"]},"chemical/x-cml":{"source":"apache","extensions":["cml"]},"chemical/x-csml":{"source":"apache","extensions":["csml"]},"chemical/x-pdb":{"source":"apache"},"chemical/x-xyz":{"source":"apache","extensions":["xyz"]},"font/collection":{"source":"iana","extensions":["ttc"]},"font/otf":{"source":"iana","compressible":true,"extensions":["otf"]},"font/sfnt":{"source":"iana"},"font/ttf":{"source":"iana","compressible":true,"extensions":["ttf"]},"font/woff":{"source":"iana","extensions":["woff"]},"font/woff2":{"source":"iana","extensions":["woff2"]},"image/aces":{"source":"iana","extensions":["exr"]},"image/apng":{"compressible":false,"extensions":["apng"]},"image/avci":{"source":"iana"},"image/avcs":{"source":"iana"},"image/avif":{"source":"iana","compressible":false,"extensions":["avif"]},"image/bmp":{"source":"iana","compressible":true,"extensions":["bmp"]},"image/cgm":{"source":"iana","extensions":["cgm"]},"image/dicom-rle":{"source":"iana","extensions":["drle"]},"image/emf":{"source":"iana","extensions":["emf"]},"image/fits":{"source":"iana","extensions":["fits"]},"image/g3fax":{"source":"iana","extensions":["g3"]},"image/gif":{"source":"iana","compressible":false,"extensions":["gif"]},"image/heic":{"source":"iana","extensions":["heic"]},"image/heic-sequence":{"source":"iana","extensions":["heics"]},"image/heif":{"source":"iana","extensions":["heif"]},"image/heif-sequence":{"source":"iana","extensions":["heifs"]},"image/hej2k":{"source":"iana","extensions":["hej2"]},"image/hsj2":{"source":"iana","extensions":["hsj2"]},"image/ief":{"source":"iana","extensions":["ief"]},"image/jls":{"source":"iana","extensions":["jls"]},"image/jp2":{"source":"iana","compressible":false,"extensions":["jp2","jpg2"]},"image/jpeg":{"source":"iana","compressible":false,"extensions":["jpeg","jpg","jpe"]},"image/jph":{"source":"iana","extensions":["jph"]},"image/jphc":{"source":"iana","extensions":["jhc"]},"image/jpm":{"source":"iana","compressible":false,"extensions":["jpm"]},"image/jpx":{"source":"iana","compressible":false,"extensions":["jpx","jpf"]},"image/jxr":{"source":"iana","extensions":["jxr"]},"image/jxra":{"source":"iana","extensions":["jxra"]},"image/jxrs":{"source":"iana","extensions":["jxrs"]},"image/jxs":{"source":"iana","extensions":["jxs"]},"image/jxsc":{"source":"iana","extensions":["jxsc"]},"image/jxsi":{"source":"iana","extensions":["jxsi"]},"image/jxss":{"source":"iana","extensions":["jxss"]},"image/ktx":{"source":"iana","extensions":["ktx"]},"image/ktx2":{"source":"iana","extensions":["ktx2"]},"image/naplps":{"source":"iana"},"image/pjpeg":{"compressible":false},"image/png":{"source":"iana","compressible":false,"extensions":["png"]},"image/prs.btif":{"source":"iana","extensions":["btif"]},"image/prs.pti":{"source":"iana","extensions":["pti"]},"image/pwg-raster":{"source":"iana"},"image/sgi":{"source":"apache","extensions":["sgi"]},"image/svg+xml":{"source":"iana","compressible":true,"extensions":["svg","svgz"]},"image/t38":{"source":"iana","extensions":["t38"]},"image/tiff":{"source":"iana","compressible":false,"extensions":["tif","tiff"]},"image/tiff-fx":{"source":"iana","extensions":["tfx"]},"image/vnd.adobe.photoshop":{"source":"iana","compressible":true,"extensions":["psd"]},"image/vnd.airzip.accelerator.azv":{"source":"iana","extensions":["azv"]},"image/vnd.cns.inf2":{"source":"iana"},"image/vnd.dece.graphic":{"source":"iana","extensions":["uvi","uvvi","uvg","uvvg"]},"image/vnd.djvu":{"source":"iana","extensions":["djvu","djv"]},"image/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"image/vnd.dwg":{"source":"iana","extensions":["dwg"]},"image/vnd.dxf":{"source":"iana","extensions":["dxf"]},"image/vnd.fastbidsheet":{"source":"iana","extensions":["fbs"]},"image/vnd.fpx":{"source":"iana","extensions":["fpx"]},"image/vnd.fst":{"source":"iana","extensions":["fst"]},"image/vnd.fujixerox.edmics-mmr":{"source":"iana","extensions":["mmr"]},"image/vnd.fujixerox.edmics-rlc":{"source":"iana","extensions":["rlc"]},"image/vnd.globalgraphics.pgb":{"source":"iana"},"image/vnd.microsoft.icon":{"source":"iana","extensions":["ico"]},"image/vnd.mix":{"source":"iana"},"image/vnd.mozilla.apng":{"source":"iana"},"image/vnd.ms-dds":{"extensions":["dds"]},"image/vnd.ms-modi":{"source":"iana","extensions":["mdi"]},"image/vnd.ms-photo":{"source":"apache","extensions":["wdp"]},"image/vnd.net-fpx":{"source":"iana","extensions":["npx"]},"image/vnd.pco.b16":{"source":"iana","extensions":["b16"]},"image/vnd.radiance":{"source":"iana"},"image/vnd.sealed.png":{"source":"iana"},"image/vnd.sealedmedia.softseal.gif":{"source":"iana"},"image/vnd.sealedmedia.softseal.jpg":{"source":"iana"},"image/vnd.svf":{"source":"iana"},"image/vnd.tencent.tap":{"source":"iana","extensions":["tap"]},"image/vnd.valve.source.texture":{"source":"iana","extensions":["vtf"]},"image/vnd.wap.wbmp":{"source":"iana","extensions":["wbmp"]},"image/vnd.xiff":{"source":"iana","extensions":["xif"]},"image/vnd.zbrush.pcx":{"source":"iana","extensions":["pcx"]},"image/webp":{"source":"apache","extensions":["webp"]},"image/wmf":{"source":"iana","extensions":["wmf"]},"image/x-3ds":{"source":"apache","extensions":["3ds"]},"image/x-cmu-raster":{"source":"apache","extensions":["ras"]},"image/x-cmx":{"source":"apache","extensions":["cmx"]},"image/x-freehand":{"source":"apache","extensions":["fh","fhc","fh4","fh5","fh7"]},"image/x-icon":{"source":"apache","compressible":true,"extensions":["ico"]},"image/x-jng":{"source":"nginx","extensions":["jng"]},"image/x-mrsid-image":{"source":"apache","extensions":["sid"]},"image/x-ms-bmp":{"source":"nginx","compressible":true,"extensions":["bmp"]},"image/x-pcx":{"source":"apache","extensions":["pcx"]},"image/x-pict":{"source":"apache","extensions":["pic","pct"]},"image/x-portable-anymap":{"source":"apache","extensions":["pnm"]},"image/x-portable-bitmap":{"source":"apache","extensions":["pbm"]},"image/x-portable-graymap":{"source":"apache","extensions":["pgm"]},"image/x-portable-pixmap":{"source":"apache","extensions":["ppm"]},"image/x-rgb":{"source":"apache","extensions":["rgb"]},"image/x-tga":{"source":"apache","extensions":["tga"]},"image/x-xbitmap":{"source":"apache","extensions":["xbm"]},"image/x-xcf":{"compressible":false},"image/x-xpixmap":{"source":"apache","extensions":["xpm"]},"image/x-xwindowdump":{"source":"apache","extensions":["xwd"]},"message/cpim":{"source":"iana"},"message/delivery-status":{"source":"iana"},"message/disposition-notification":{"source":"iana","extensions":["disposition-notification"]},"message/external-body":{"source":"iana"},"message/feedback-report":{"source":"iana"},"message/global":{"source":"iana","extensions":["u8msg"]},"message/global-delivery-status":{"source":"iana","extensions":["u8dsn"]},"message/global-disposition-notification":{"source":"iana","extensions":["u8mdn"]},"message/global-headers":{"source":"iana","extensions":["u8hdr"]},"message/http":{"source":"iana","compressible":false},"message/imdn+xml":{"source":"iana","compressible":true},"message/news":{"source":"iana"},"message/partial":{"source":"iana","compressible":false},"message/rfc822":{"source":"iana","compressible":true,"extensions":["eml","mime"]},"message/s-http":{"source":"iana"},"message/sip":{"source":"iana"},"message/sipfrag":{"source":"iana"},"message/tracking-status":{"source":"iana"},"message/vnd.si.simp":{"source":"iana"},"message/vnd.wfa.wsc":{"source":"iana","extensions":["wsc"]},"model/3mf":{"source":"iana","extensions":["3mf"]},"model/e57":{"source":"iana"},"model/gltf+json":{"source":"iana","compressible":true,"extensions":["gltf"]},"model/gltf-binary":{"source":"iana","compressible":true,"extensions":["glb"]},"model/iges":{"source":"iana","compressible":false,"extensions":["igs","iges"]},"model/mesh":{"source":"iana","compressible":false,"extensions":["msh","mesh","silo"]},"model/mtl":{"source":"iana","extensions":["mtl"]},"model/obj":{"source":"iana","extensions":["obj"]},"model/step":{"source":"iana"},"model/step+xml":{"source":"iana","compressible":true,"extensions":["stpx"]},"model/step+zip":{"source":"iana","compressible":false,"extensions":["stpz"]},"model/step-xml+zip":{"source":"iana","compressible":false,"extensions":["stpxz"]},"model/stl":{"source":"iana","extensions":["stl"]},"model/vnd.collada+xml":{"source":"iana","compressible":true,"extensions":["dae"]},"model/vnd.dwf":{"source":"iana","extensions":["dwf"]},"model/vnd.flatland.3dml":{"source":"iana"},"model/vnd.gdl":{"source":"iana","extensions":["gdl"]},"model/vnd.gs-gdl":{"source":"apache"},"model/vnd.gs.gdl":{"source":"iana"},"model/vnd.gtw":{"source":"iana","extensions":["gtw"]},"model/vnd.moml+xml":{"source":"iana","compressible":true},"model/vnd.mts":{"source":"iana","extensions":["mts"]},"model/vnd.opengex":{"source":"iana","extensions":["ogex"]},"model/vnd.parasolid.transmit.binary":{"source":"iana","extensions":["x_b"]},"model/vnd.parasolid.transmit.text":{"source":"iana","extensions":["x_t"]},"model/vnd.pytha.pyox":{"source":"iana"},"model/vnd.rosette.annotated-data-model":{"source":"iana"},"model/vnd.sap.vds":{"source":"iana","extensions":["vds"]},"model/vnd.usdz+zip":{"source":"iana","compressible":false,"extensions":["usdz"]},"model/vnd.valve.source.compiled-map":{"source":"iana","extensions":["bsp"]},"model/vnd.vtu":{"source":"iana","extensions":["vtu"]},"model/vrml":{"source":"iana","compressible":false,"extensions":["wrl","vrml"]},"model/x3d+binary":{"source":"apache","compressible":false,"extensions":["x3db","x3dbz"]},"model/x3d+fastinfoset":{"source":"iana","extensions":["x3db"]},"model/x3d+vrml":{"source":"apache","compressible":false,"extensions":["x3dv","x3dvz"]},"model/x3d+xml":{"source":"iana","compressible":true,"extensions":["x3d","x3dz"]},"model/x3d-vrml":{"source":"iana","extensions":["x3dv"]},"multipart/alternative":{"source":"iana","compressible":false},"multipart/appledouble":{"source":"iana"},"multipart/byteranges":{"source":"iana"},"multipart/digest":{"source":"iana"},"multipart/encrypted":{"source":"iana","compressible":false},"multipart/form-data":{"source":"iana","compressible":false},"multipart/header-set":{"source":"iana"},"multipart/mixed":{"source":"iana"},"multipart/multilingual":{"source":"iana"},"multipart/parallel":{"source":"iana"},"multipart/related":{"source":"iana","compressible":false},"multipart/report":{"source":"iana"},"multipart/signed":{"source":"iana","compressible":false},"multipart/vnd.bint.med-plus":{"source":"iana"},"multipart/voice-message":{"source":"iana"},"multipart/x-mixed-replace":{"source":"iana"},"text/1d-interleaved-parityfec":{"source":"iana"},"text/cache-manifest":{"source":"iana","compressible":true,"extensions":["appcache","manifest"]},"text/calendar":{"source":"iana","extensions":["ics","ifb"]},"text/calender":{"compressible":true},"text/cmd":{"compressible":true},"text/coffeescript":{"extensions":["coffee","litcoffee"]},"text/cql":{"source":"iana"},"text/cql-expression":{"source":"iana"},"text/cql-identifier":{"source":"iana"},"text/css":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["css"]},"text/csv":{"source":"iana","compressible":true,"extensions":["csv"]},"text/csv-schema":{"source":"iana"},"text/directory":{"source":"iana"},"text/dns":{"source":"iana"},"text/ecmascript":{"source":"iana"},"text/encaprtp":{"source":"iana"},"text/enriched":{"source":"iana"},"text/fhirpath":{"source":"iana"},"text/flexfec":{"source":"iana"},"text/fwdred":{"source":"iana"},"text/gff3":{"source":"iana"},"text/grammar-ref-list":{"source":"iana"},"text/html":{"source":"iana","compressible":true,"extensions":["html","htm","shtml"]},"text/jade":{"extensions":["jade"]},"text/javascript":{"source":"iana","compressible":true},"text/jcr-cnd":{"source":"iana"},"text/jsx":{"compressible":true,"extensions":["jsx"]},"text/less":{"compressible":true,"extensions":["less"]},"text/markdown":{"source":"iana","compressible":true,"extensions":["markdown","md"]},"text/mathml":{"source":"nginx","extensions":["mml"]},"text/mdx":{"compressible":true,"extensions":["mdx"]},"text/mizar":{"source":"iana"},"text/n3":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["n3"]},"text/parameters":{"source":"iana","charset":"UTF-8"},"text/parityfec":{"source":"iana"},"text/plain":{"source":"iana","compressible":true,"extensions":["txt","text","conf","def","list","log","in","ini"]},"text/provenance-notation":{"source":"iana","charset":"UTF-8"},"text/prs.fallenstein.rst":{"source":"iana"},"text/prs.lines.tag":{"source":"iana","extensions":["dsc"]},"text/prs.prop.logic":{"source":"iana"},"text/raptorfec":{"source":"iana"},"text/red":{"source":"iana"},"text/rfc822-headers":{"source":"iana"},"text/richtext":{"source":"iana","compressible":true,"extensions":["rtx"]},"text/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"text/rtp-enc-aescm128":{"source":"iana"},"text/rtploopback":{"source":"iana"},"text/rtx":{"source":"iana"},"text/sgml":{"source":"iana","extensions":["sgml","sgm"]},"text/shaclc":{"source":"iana"},"text/shex":{"source":"iana","extensions":["shex"]},"text/slim":{"extensions":["slim","slm"]},"text/spdx":{"source":"iana","extensions":["spdx"]},"text/strings":{"source":"iana"},"text/stylus":{"extensions":["stylus","styl"]},"text/t140":{"source":"iana"},"text/tab-separated-values":{"source":"iana","compressible":true,"extensions":["tsv"]},"text/troff":{"source":"iana","extensions":["t","tr","roff","man","me","ms"]},"text/turtle":{"source":"iana","charset":"UTF-8","extensions":["ttl"]},"text/ulpfec":{"source":"iana"},"text/uri-list":{"source":"iana","compressible":true,"extensions":["uri","uris","urls"]},"text/vcard":{"source":"iana","compressible":true,"extensions":["vcard"]},"text/vnd.a":{"source":"iana"},"text/vnd.abc":{"source":"iana"},"text/vnd.ascii-art":{"source":"iana"},"text/vnd.curl":{"source":"iana","extensions":["curl"]},"text/vnd.curl.dcurl":{"source":"apache","extensions":["dcurl"]},"text/vnd.curl.mcurl":{"source":"apache","extensions":["mcurl"]},"text/vnd.curl.scurl":{"source":"apache","extensions":["scurl"]},"text/vnd.debian.copyright":{"source":"iana","charset":"UTF-8"},"text/vnd.dmclientscript":{"source":"iana"},"text/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"text/vnd.esmertec.theme-descriptor":{"source":"iana","charset":"UTF-8"},"text/vnd.ficlab.flt":{"source":"iana"},"text/vnd.fly":{"source":"iana","extensions":["fly"]},"text/vnd.fmi.flexstor":{"source":"iana","extensions":["flx"]},"text/vnd.gml":{"source":"iana"},"text/vnd.graphviz":{"source":"iana","extensions":["gv"]},"text/vnd.hans":{"source":"iana"},"text/vnd.hgl":{"source":"iana"},"text/vnd.in3d.3dml":{"source":"iana","extensions":["3dml"]},"text/vnd.in3d.spot":{"source":"iana","extensions":["spot"]},"text/vnd.iptc.newsml":{"source":"iana"},"text/vnd.iptc.nitf":{"source":"iana"},"text/vnd.latex-z":{"source":"iana"},"text/vnd.motorola.reflex":{"source":"iana"},"text/vnd.ms-mediapackage":{"source":"iana"},"text/vnd.net2phone.commcenter.command":{"source":"iana"},"text/vnd.radisys.msml-basic-layout":{"source":"iana"},"text/vnd.senx.warpscript":{"source":"iana"},"text/vnd.si.uricatalogue":{"source":"iana"},"text/vnd.sosi":{"source":"iana"},"text/vnd.sun.j2me.app-descriptor":{"source":"iana","charset":"UTF-8","extensions":["jad"]},"text/vnd.trolltech.linguist":{"source":"iana","charset":"UTF-8"},"text/vnd.wap.si":{"source":"iana"},"text/vnd.wap.sl":{"source":"iana"},"text/vnd.wap.wml":{"source":"iana","extensions":["wml"]},"text/vnd.wap.wmlscript":{"source":"iana","extensions":["wmls"]},"text/vtt":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["vtt"]},"text/x-asm":{"source":"apache","extensions":["s","asm"]},"text/x-c":{"source":"apache","extensions":["c","cc","cxx","cpp","h","hh","dic"]},"text/x-component":{"source":"nginx","extensions":["htc"]},"text/x-fortran":{"source":"apache","extensions":["f","for","f77","f90"]},"text/x-gwt-rpc":{"compressible":true},"text/x-handlebars-template":{"extensions":["hbs"]},"text/x-java-source":{"source":"apache","extensions":["java"]},"text/x-jquery-tmpl":{"compressible":true},"text/x-lua":{"extensions":["lua"]},"text/x-markdown":{"compressible":true,"extensions":["mkd"]},"text/x-nfo":{"source":"apache","extensions":["nfo"]},"text/x-opml":{"source":"apache","extensions":["opml"]},"text/x-org":{"compressible":true,"extensions":["org"]},"text/x-pascal":{"source":"apache","extensions":["p","pas"]},"text/x-processing":{"compressible":true,"extensions":["pde"]},"text/x-sass":{"extensions":["sass"]},"text/x-scss":{"extensions":["scss"]},"text/x-setext":{"source":"apache","extensions":["etx"]},"text/x-sfv":{"source":"apache","extensions":["sfv"]},"text/x-suse-ymp":{"compressible":true,"extensions":["ymp"]},"text/x-uuencode":{"source":"apache","extensions":["uu"]},"text/x-vcalendar":{"source":"apache","extensions":["vcs"]},"text/x-vcard":{"source":"apache","extensions":["vcf"]},"text/xml":{"source":"iana","compressible":true,"extensions":["xml"]},"text/xml-external-parsed-entity":{"source":"iana"},"text/yaml":{"compressible":true,"extensions":["yaml","yml"]},"video/1d-interleaved-parityfec":{"source":"iana"},"video/3gpp":{"source":"iana","extensions":["3gp","3gpp"]},"video/3gpp-tt":{"source":"iana"},"video/3gpp2":{"source":"iana","extensions":["3g2"]},"video/av1":{"source":"iana"},"video/bmpeg":{"source":"iana"},"video/bt656":{"source":"iana"},"video/celb":{"source":"iana"},"video/dv":{"source":"iana"},"video/encaprtp":{"source":"iana"},"video/ffv1":{"source":"iana"},"video/flexfec":{"source":"iana"},"video/h261":{"source":"iana","extensions":["h261"]},"video/h263":{"source":"iana","extensions":["h263"]},"video/h263-1998":{"source":"iana"},"video/h263-2000":{"source":"iana"},"video/h264":{"source":"iana","extensions":["h264"]},"video/h264-rcdo":{"source":"iana"},"video/h264-svc":{"source":"iana"},"video/h265":{"source":"iana"},"video/iso.segment":{"source":"iana","extensions":["m4s"]},"video/jpeg":{"source":"iana","extensions":["jpgv"]},"video/jpeg2000":{"source":"iana"},"video/jpm":{"source":"apache","extensions":["jpm","jpgm"]},"video/jxsv":{"source":"iana"},"video/mj2":{"source":"iana","extensions":["mj2","mjp2"]},"video/mp1s":{"source":"iana"},"video/mp2p":{"source":"iana"},"video/mp2t":{"source":"iana","extensions":["ts"]},"video/mp4":{"source":"iana","compressible":false,"extensions":["mp4","mp4v","mpg4"]},"video/mp4v-es":{"source":"iana"},"video/mpeg":{"source":"iana","compressible":false,"extensions":["mpeg","mpg","mpe","m1v","m2v"]},"video/mpeg4-generic":{"source":"iana"},"video/mpv":{"source":"iana"},"video/nv":{"source":"iana"},"video/ogg":{"source":"iana","compressible":false,"extensions":["ogv"]},"video/parityfec":{"source":"iana"},"video/pointer":{"source":"iana"},"video/quicktime":{"source":"iana","compressible":false,"extensions":["qt","mov"]},"video/raptorfec":{"source":"iana"},"video/raw":{"source":"iana"},"video/rtp-enc-aescm128":{"source":"iana"},"video/rtploopback":{"source":"iana"},"video/rtx":{"source":"iana"},"video/scip":{"source":"iana"},"video/smpte291":{"source":"iana"},"video/smpte292m":{"source":"iana"},"video/ulpfec":{"source":"iana"},"video/vc1":{"source":"iana"},"video/vc2":{"source":"iana"},"video/vnd.cctv":{"source":"iana"},"video/vnd.dece.hd":{"source":"iana","extensions":["uvh","uvvh"]},"video/vnd.dece.mobile":{"source":"iana","extensions":["uvm","uvvm"]},"video/vnd.dece.mp4":{"source":"iana"},"video/vnd.dece.pd":{"source":"iana","extensions":["uvp","uvvp"]},"video/vnd.dece.sd":{"source":"iana","extensions":["uvs","uvvs"]},"video/vnd.dece.video":{"source":"iana","extensions":["uvv","uvvv"]},"video/vnd.directv.mpeg":{"source":"iana"},"video/vnd.directv.mpeg-tts":{"source":"iana"},"video/vnd.dlna.mpeg-tts":{"source":"iana"},"video/vnd.dvb.file":{"source":"iana","extensions":["dvb"]},"video/vnd.fvt":{"source":"iana","extensions":["fvt"]},"video/vnd.hns.video":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.ttsavc":{"source":"iana"},"video/vnd.iptvforum.ttsmpeg2":{"source":"iana"},"video/vnd.motorola.video":{"source":"iana"},"video/vnd.motorola.videop":{"source":"iana"},"video/vnd.mpegurl":{"source":"iana","extensions":["mxu","m4u"]},"video/vnd.ms-playready.media.pyv":{"source":"iana","extensions":["pyv"]},"video/vnd.nokia.interleaved-multimedia":{"source":"iana"},"video/vnd.nokia.mp4vr":{"source":"iana"},"video/vnd.nokia.videovoip":{"source":"iana"},"video/vnd.objectvideo":{"source":"iana"},"video/vnd.radgamettools.bink":{"source":"iana"},"video/vnd.radgamettools.smacker":{"source":"iana"},"video/vnd.sealed.mpeg1":{"source":"iana"},"video/vnd.sealed.mpeg4":{"source":"iana"},"video/vnd.sealed.swf":{"source":"iana"},"video/vnd.sealedmedia.softseal.mov":{"source":"iana"},"video/vnd.uvvu.mp4":{"source":"iana","extensions":["uvu","uvvu"]},"video/vnd.vivo":{"source":"iana","extensions":["viv"]},"video/vnd.youtube.yt":{"source":"iana"},"video/vp8":{"source":"iana"},"video/vp9":{"source":"iana"},"video/webm":{"source":"apache","compressible":false,"extensions":["webm"]},"video/x-f4v":{"source":"apache","extensions":["f4v"]},"video/x-fli":{"source":"apache","extensions":["fli"]},"video/x-flv":{"source":"apache","compressible":false,"extensions":["flv"]},"video/x-m4v":{"source":"apache","extensions":["m4v"]},"video/x-matroska":{"source":"apache","compressible":false,"extensions":["mkv","mk3d","mks"]},"video/x-mng":{"source":"apache","extensions":["mng"]},"video/x-ms-asf":{"source":"apache","extensions":["asf","asx"]},"video/x-ms-vob":{"source":"apache","extensions":["vob"]},"video/x-ms-wm":{"source":"apache","extensions":["wm"]},"video/x-ms-wmv":{"source":"apache","compressible":false,"extensions":["wmv"]},"video/x-ms-wmx":{"source":"apache","extensions":["wmx"]},"video/x-ms-wvx":{"source":"apache","extensions":["wvx"]},"video/x-msvideo":{"source":"apache","extensions":["avi"]},"video/x-sgi-movie":{"source":"apache","extensions":["movie"]},"video/x-smv":{"source":"apache","extensions":["smv"]},"x-conference/x-cooltalk":{"source":"apache","extensions":["ice"]},"x-shader/x-fragment":{"compressible":true},"x-shader/x-vertex":{"compressible":true}}');

/***/ }),

/***/ 8249:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"126":{"host":"smtp.126.com","port":465,"secure":true},"163":{"host":"smtp.163.com","port":465,"secure":true},"1und1":{"host":"smtp.1und1.de","port":465,"secure":true,"authMethod":"LOGIN"},"AOL":{"domains":["aol.com"],"host":"smtp.aol.com","port":587},"DebugMail":{"host":"debugmail.io","port":25},"DynectEmail":{"aliases":["Dynect"],"host":"smtp.dynect.net","port":25},"Ethereal":{"aliases":["ethereal.email"],"host":"smtp.ethereal.email","port":587},"FastMail":{"domains":["fastmail.fm"],"host":"smtp.fastmail.com","port":465,"secure":true},"GandiMail":{"aliases":["Gandi","Gandi Mail"],"host":"mail.gandi.net","port":587},"Gmail":{"aliases":["Google Mail"],"domains":["gmail.com","googlemail.com"],"host":"smtp.gmail.com","port":465,"secure":true},"Godaddy":{"host":"smtpout.secureserver.net","port":25},"GodaddyAsia":{"host":"smtp.asia.secureserver.net","port":25},"GodaddyEurope":{"host":"smtp.europe.secureserver.net","port":25},"hot.ee":{"host":"mail.hot.ee"},"Hotmail":{"aliases":["Outlook","Outlook.com","Hotmail.com"],"domains":["hotmail.com","outlook.com"],"host":"smtp-mail.outlook.com","port":587},"iCloud":{"aliases":["Me","Mac"],"domains":["me.com","mac.com"],"host":"smtp.mail.me.com","port":587},"Infomaniak":{"host":"mail.infomaniak.com","domains":["ik.me","ikmail.com","etik.com"],"port":587},"mail.ee":{"host":"smtp.mail.ee"},"Mail.ru":{"host":"smtp.mail.ru","port":465,"secure":true},"Maildev":{"port":1025,"ignoreTLS":true},"Mailgun":{"host":"smtp.mailgun.org","port":465,"secure":true},"Mailjet":{"host":"in.mailjet.com","port":587},"Mailosaur":{"host":"mailosaur.io","port":25},"Mailtrap":{"host":"smtp.mailtrap.io","port":2525},"Mandrill":{"host":"smtp.mandrillapp.com","port":587},"Naver":{"host":"smtp.naver.com","port":587},"One":{"host":"send.one.com","port":465,"secure":true},"OpenMailBox":{"aliases":["OMB","openmailbox.org"],"host":"smtp.openmailbox.org","port":465,"secure":true},"Outlook365":{"host":"smtp.office365.com","port":587,"secure":false},"OhMySMTP":{"host":"smtp.ohmysmtp.com","port":587,"secure":false},"Postmark":{"aliases":["PostmarkApp"],"host":"smtp.postmarkapp.com","port":2525},"qiye.aliyun":{"host":"smtp.mxhichina.com","port":"465","secure":true},"QQ":{"domains":["qq.com"],"host":"smtp.qq.com","port":465,"secure":true},"QQex":{"aliases":["QQ Enterprise"],"domains":["exmail.qq.com"],"host":"smtp.exmail.qq.com","port":465,"secure":true},"SendCloud":{"host":"smtpcloud.sohu.com","port":25},"SendGrid":{"host":"smtp.sendgrid.net","port":587},"SendinBlue":{"host":"smtp-relay.sendinblue.com","port":587},"SendPulse":{"host":"smtp-pulse.com","port":465,"secure":true},"SES":{"host":"email-smtp.us-east-1.amazonaws.com","port":465,"secure":true},"SES-US-EAST-1":{"host":"email-smtp.us-east-1.amazonaws.com","port":465,"secure":true},"SES-US-WEST-2":{"host":"email-smtp.us-west-2.amazonaws.com","port":465,"secure":true},"SES-EU-WEST-1":{"host":"email-smtp.eu-west-1.amazonaws.com","port":465,"secure":true},"Sparkpost":{"aliases":["SparkPost","SparkPost Mail"],"domains":["sparkpost.com"],"host":"smtp.sparkpostmail.com","port":587,"secure":false},"Tipimail":{"host":"smtp.tipimail.com","port":587},"Yahoo":{"domains":["yahoo.com"],"host":"smtp.mail.yahoo.com","port":465,"secure":true},"Yandex":{"domains":["yandex.ru"],"host":"smtp.yandex.ru","port":465,"secure":true},"Zoho":{"host":"smtp.zoho.com","port":465,"secure":true,"authMethod":"LOGIN"}}');

/***/ }),

/***/ 4129:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"nodemailer","version":"6.7.3","description":"Easy as cake e-mail sending from your Node.js applications","main":"lib/nodemailer.js","scripts":{"test":"grunt"},"repository":{"type":"git","url":"https://github.com/nodemailer/nodemailer.git"},"keywords":["Nodemailer"],"author":"Andris Reinman","license":"MIT","bugs":{"url":"https://github.com/nodemailer/nodemailer/issues"},"homepage":"https://nodemailer.com/","devDependencies":{"@aws-sdk/client-ses":"3.54.1","aws-sdk":"2.1096.0","bunyan":"1.8.15","chai":"4.3.6","eslint-config-nodemailer":"1.2.0","eslint-config-prettier":"8.5.0","grunt":"1.4.1","grunt-cli":"1.4.3","grunt-eslint":"24.0.0","grunt-mocha-test":"0.13.3","libbase64":"1.2.1","libmime":"5.0.0","libqp":"1.1.0","mocha":"9.2.2","nodemailer-ntlm-auth":"1.0.1","proxy":"1.0.2","proxy-test-server":"1.0.0","sinon":"13.0.1","smtp-server":"3.10.0"},"engines":{"node":">=6.0.0"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(7078);
const crypto = __nccwpck_require__(6113);
const fs = (__nccwpck_require__(7147).promises);
const https = __nccwpck_require__(5687);
const mime = __nccwpck_require__(6483);
const path = __nccwpck_require__(1017);
const upath = __nccwpck_require__(1258);
const nodemailer = __nccwpck_require__(9841);

const textEncoder = new TextEncoder();

// Defined at https://www.backblaze.com/b2/docs/string_encoding.html.
const SAFE_BYTES = new Set(
  [
    ".",
    "_",
    "-",
    "/",
    "~",
    "!",
    "$",
    "'",
    "(",
    ")",
    "*",
    ";",
    "=",
    ":",
    "@",
  ].map((c) => c.charCodeAt(0))
);

const isDigit = (b) => b >= 0x30 && b <= 0x39;
const isLcAlpha = (b) => b >= 0x61 && b <= 0x7a;
const isUcAlpha = (b) => b >= 0x41 && b <= 0x5a;

const encodeB2PathComponent = (raw) => {
  const bytes = textEncoder.encode(raw);
  return [...bytes]
    .map((b) =>
      SAFE_BYTES.has(b) || isDigit(b) || isLcAlpha(b) || isUcAlpha(b)
        ? String.fromCharCode(b)
        : `%${b.toString(16)}`
    )
    .join("");
};

const fetchOkJson = (url, { body, ...opts }, onFail = false) =>
  new Promise((resolve, reject) => {
    const req = https.request(url, opts);
    req.on("error", () => {
      if(onFail) return onFail();
      return reject
    });

    req.on("response", (res) => {
      if (res.statusCode < 200 || res.statusCode > 299) {
        if(((res.statusCode >= 500 && res.statusCode <= 599) || res.statusCode == 408) && onFail) return onFail();
        return reject(new Error(`Request to ${url} failed with status ${res.statusCode}`));
      }
      const chunks = [];
      res.on("error", reject);
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        try {
          console.log(chunks.join(""));
          resolve(JSON.parse(chunks.join("")));
        } catch (err) {
          reject(err);
        }
      });
    });
    req.end(body);
  });

const walkDir = async directory => {
  let fileList = [];
  const files = await fs.readdir(directory);
  for (const file of files) {
    const p = path.join(directory, file);
    if ((await fs.stat(p)).isDirectory()) {
      fileList = [...fileList, ...(await walkDir(p))];
    } else {
      fileList.push(p);
    }
  }

  return fileList;
}

const authorizeUpload = async (auth) => {
  const { accountId, apiUrl, authorizationToken } = await fetchOkJson(
    "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
    {
      headers: {
        Authorization: auth,
      },
    }
  );

  return {apiUrl, authorizationToken};
}

const getUploadPath = async (apiUrl, authorizationToken, bucketId) => {
  return { authorizationToken: uploadAuthorizationToken, uploadUrl } =
    await fetchOkJson(`${apiUrl}/b2api/v2/b2_get_upload_url`, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bucketId,
      }),
    });
}

const sendMessage = (fileOutput, token) => {
  const chatId = '-536245022';
  const text = `Build is uploaded to: https://f000.backblazeb2.com/file/lt-builds/${fileOutput}`;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const data = JSON.stringify({
    chat_id: chatId,
    text: text
  });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = https.request(url, options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(JSON.parse(data));
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });

  req.write(data);
  req.end();
}

const uploadFile = async (filePath, output, apiUrl, authorizationToken, bucketId, emailpass, retry = 0) => {
  const body = await fs.readFile(filePath);
  const sha1 = crypto.createHash("sha1").update(body).digest("hex");
  const options = await getUploadPath(apiUrl, authorizationToken, bucketId);

  let mimeType = mime.lookup(filePath);
  await fetchOkJson(options.uploadUrl, {
    method: "POST",
    body,
    headers: {
      Authorization: options.authorizationToken,
      "Content-Type": mimeType ? mimeType : "b2/x-auto",
      "X-Bz-Content-Sha1": sha1,
      "X-Bz-File-Name": encodeB2PathComponent(output),
    },
  }, () => {
    if(retry < 3) {
      uploadFile(filePath, output, apiUrl, authorizationToken, bucketId, retry + 1);
      console.log('Retry uploading...');
    }
  });

  console.log(`Uploaded "${filePath}" to "${output}"`);

  sendMessage(output, emailpass);
}

(async () => {
  const keyId = core.getInput('key_id');
  const applicationKey = core.getInput('application_key');
  const bucket = core.getInput('bucket');
  const fileInput = core.getInput('file_input');
  const emailPass = core.getInput('email_pass');

  const auth = `Basic ${Buffer.from([keyId, applicationKey].join(":")).toString("base64")}`;
  const {apiUrl, authorizationToken} = await authorizeUpload(auth);

  const today = new Date();

  const fileOutput = today.toISOString().substring(0, 16).replace(/T/g,"-") + '-' + path.basename(fileInput);

  uploadFile(fileInput, upath.toUnix(fileOutput), apiUrl, authorizationToken, bucket, emailPass);

  return true;
})().catch((err) => core.setFailed(err.message));

})();

module.exports = __webpack_exports__;
/******/ })()
;