/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 885:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 138:
/***/ ((module) => {

module.exports = eval("require")("mime-types");


/***/ }),

/***/ 103:
/***/ ((module) => {

module.exports = eval("require")("upath");


/***/ }),

/***/ 417:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 211:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 622:
/***/ ((module) => {

"use strict";
module.exports = require("path");

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
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
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
const core = __nccwpck_require__(885);
const crypto = __nccwpck_require__(417);
const fs = __nccwpck_require__(747).promises;
const https = __nccwpck_require__(211);
const mime = __nccwpck_require__(138);
const path = __nccwpck_require__(622);
const upath = __nccwpck_require__(103);

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

const fetchOkJson = (url, { body, ...opts }) =>
  new Promise((resolve, reject) => {
    const req = https.request(url, opts);
    req.on("error", reject);
    req.on("response", (res) => {
      if (res.statusCode < 200 || res.statusCode > 299) {
        return reject(
          new Error(
            `Request to ${url} failed with status ${res.statusCode}`
          )
        );
      }
      const chunks = [];
      res.on("error", reject);
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        try {
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

const getUploadPath = async (bucket, auth) => {
  const { accountId, apiUrl, authorizationToken } = await fetchOkJson(
    "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
    {
      headers: {
        Authorization: auth,
      },
    }
  );

  const {
    buckets: [{ bucketId }],
  } = await fetchOkJson(`${apiUrl}/b2api/v2/b2_list_buckets`, {
    method: "POST",
    headers: {
      Authorization: authorizationToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accountId,
      bucketName: bucket,
    }),
  });

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

const uploadFile = async (filePath, output, authorizationToken, uploadUrl) => {
  const body = await fs.readFile(filePath);
  const sha1 = crypto.createHash("sha1").update(body).digest("hex");

  let mimeType = mime.lookup(filePath);
  const uploadResult = await fetchOkJson(uploadUrl, {
    method: "POST",
    body,
    headers: {
      Authorization: authorizationToken,
      "Content-Type": mimeType ? mimeType : "b2/x-auto",
      "X-Bz-Content-Sha1": sha1,
      "X-Bz-File-Name": encodeB2PathComponent(output),
    },
  });

  for (const prop of [
    "bucketId",
    "contentLength",
    "contentSha1",
    "contentMd5",
    "contentType",
    "fileId",
    "fileInfo",
    "fileName",
    "fileRetention",
    "legalHold",
    "serverSideEncryption",
  ]) {
    core.setOutput(prop, uploadResult[prop]);
  }
}

(async () => {
  const keyId = core.getInput('key_id');
  const applicationKey = core.getInput('application_key');
  const bucket = core.getInput('bucket');
  const fileInput = core.getInput('file_input');
  const fileOutput = core.getInput('file_output');

  const auth = `Basic ${Buffer.from([keyId, applicationKey].join(":")).toString("base64")}`;

  const options = await getUploadPath(bucket, auth);

  const pathStat = await fs.lstat(fileInput);
  if(pathStat.isDirectory()){
    const files = await walkDir(fileInput);
    for(let file of files){
      output = path.relative(fileInput, file);
      output = path.join(fileOutput, output);
      output = upath.toUnix(output);

      await uploadFile(file, output, options.authorizationToken, options.uploadUrl);
    }
    return;
  }

  await uploadFile(fileInput, output, options.authorizationToken, options.uploadUrl);
})().catch((err) => core.setFailed(err.message));

})();

module.exports = __webpack_exports__;
/******/ })()
;