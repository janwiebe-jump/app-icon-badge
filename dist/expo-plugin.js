"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// expo-plugin.ts
var expo_plugin_exports = {};
__export(expo_plugin_exports, {
  withIconBadge: () => withIconBadge
});
module.exports = __toCommonJS(expo_plugin_exports);

// index.ts
var import_jimp3 = __toESM(require("jimp"));

// get-env-badge.ts
var import_jimp = __toESM(require("jimp"));
function getEnvBadge(_0) {
  return __async(this, arguments, function* ({
    environment
  }) {
    if (!environment)
      return null;
    const bannerHeight = 180;
    const bgColor = "transparent";
    const font = yield import_jimp.default.loadFont(import_jimp.default.FONT_SANS_128_WHITE);
    const envBadgePath = "./assets/env-badge.png";
    const envBadgeOverlay = yield import_jimp.default.read(envBadgePath);
    const width = envBadgeOverlay.bitmap.width;
    const height = envBadgeOverlay.bitmap.height;
    const environmentBadge = new import_jimp.default(width, bannerHeight, bgColor);
    yield environmentBadge.print(
      font,
      0,
      0,
      {
        text: environment.toUpperCase(),
        alignmentX: import_jimp.default.HORIZONTAL_ALIGN_CENTER,
        alignmentY: import_jimp.default.VERTICAL_ALIGN_MIDDLE
      },
      width,
      bannerHeight
    );
    const envResultImage = envBadgeOverlay.composite(
      environmentBadge,
      0,
      height - bannerHeight + 2
    );
    return envResultImage;
  });
}

// get-version-badge.ts
var import_jimp2 = __toESM(require("jimp"));
function getVersionBadge(_0) {
  return __async(this, arguments, function* ({
    version
  }) {
    if (!version)
      return null;
    const bannerHeight = 180;
    const bgColor = "transparent";
    const versionBadgePath = "./assets/version-badge.png";
    const font = yield import_jimp2.default.loadFont(import_jimp2.default.FONT_SANS_128_WHITE);
    const versionBadgeOverlay = yield import_jimp2.default.read(versionBadgePath);
    const width = versionBadgeOverlay.bitmap.width;
    const versionBadge = new import_jimp2.default(width, bannerHeight, bgColor);
    yield versionBadge.print(
      font,
      0,
      0,
      {
        text: version,
        alignmentX: import_jimp2.default.HORIZONTAL_ALIGN_CENTER,
        alignmentY: import_jimp2.default.VERTICAL_ALIGN_MIDDLE
      },
      width,
      bannerHeight
    );
    versionBadge.rotate(-45);
    const translateX = 270;
    const versionResultImage = versionBadgeOverlay.composite(
      versionBadge,
      width - versionBadge.bitmap.width + translateX,
      -translateX
    );
    return versionResultImage;
  });
}

// get-result-path.ts
function getResultPath({ iconPath, environment = "result" }) {
  const iconPathArray = iconPath.split(".");
  iconPathArray.splice(iconPathArray.length - 1, 0, environment);
  const resultFilename = iconPathArray.join(".");
  return resultFilename;
}

// index.ts
function addIconBadge(_0) {
  return __async(this, arguments, function* ({ iconPath, environment, version }) {
    let resultImage = yield import_jimp3.default.read(iconPath);
    const environmentBadge = yield getEnvBadge({ environment });
    if (environmentBadge) {
      resultImage.composite(environmentBadge, 0, 0);
    }
    const versionBadge = yield getVersionBadge({ version });
    if (versionBadge) {
      resultImage.composite(versionBadge, 0, 0);
    }
    const resultFilename = getResultPath({
      iconPath,
      environment
    });
    resultImage.writeAsync(resultFilename);
  });
}

// expo-plugin.ts
function withIconBadge(config, { environment, iconPath }) {
  addIconBadge({
    iconPath,
    environment,
    version: config.version
  });
  return config;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  withIconBadge
});
