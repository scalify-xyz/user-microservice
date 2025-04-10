const fs = require("fs");
const path = require("path");

const prettierConfigPath = path.resolve(
  __dirname,
  "node_modules/@scalify/shared-microservice/.prettierrc",
);

const prettierConfig = JSON.parse(fs.readFileSync(prettierConfigPath, "utf8"));

module.exports = prettierConfig;
