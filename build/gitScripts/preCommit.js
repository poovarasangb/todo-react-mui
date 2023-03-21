/* eslint-env node */

const { execSync } = require("child_process");
const path = require("path");
const log = require("terminal-kit").terminal;

const basePath = path.resolve(__dirname, "../../");

const ESLINT_CMD = `node --max-old-space-size=8192 ./node_modules/eslint/bin/eslint.js -c .eslintrc.js -f stylish --quiet`;

// #1 - Run eslint for modified JS files
// Get modified files list
const output = execSync("git diff --cached --name-only --diff-filter=ACM", {
    cwd: basePath
}).toString();
const modifiedFiles = output.split("\n");

const jsFiles = modifiedFiles.filter((filePath) => {
    const fileName = path.basename(filePath);
    return fileName.endsWith(".js") || fileName.endsWith(".tsx") ||
    fileName.endsWith(".jsx") || fileName.endsWith(".ts");
});

if (jsFiles.length) {
    const commandToRun = `${ESLINT_CMD} ${jsFiles.join(" ")}`;
    try {
        execSync(commandToRun, {
            cwd: basePath
        });
    } catch (lintError) {
        log.red.bold(`\nError in eslint pre-commit hook !\n`);
        if (lintError.output) {
            log.yellow(`\n\n${lintError.output.toString()}`);
        }
        process.exit(-1);
    }
    process.exit(0);
} else {
    process.exit(0);
}