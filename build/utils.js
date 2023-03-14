
const { resolve } = require("path");

const ENTRY_FILE_NAME = "main";

module.exports = {
    srcJsPath: resolve(__dirname, '../src/js'),
    outputPath: resolve(__dirname, "../output"),
    entryFile: ENTRY_FILE_NAME,
    portToListen: process.env.npm_config_devserverport ?? 1234
};