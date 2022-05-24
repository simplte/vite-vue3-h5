const chalk = require('chalk');
//依次执行每个Promises
const runPromisesInSeries = (ps) => ps.reduce((p, next) => p.then(next), Promise.resolve());
const recursive = (dir, handler) => {
  return runPromisesInSeries(
    require('fs')
      .readdirSync(dir)
      .map((name) => async () => {
        const filename = require('path').join(dir, name);
        const stats = require('fs').statSync(filename);
        if (stats.isFile()) {
          await handler(filename);
        } else if (stats.isDirectory()) {
          await recursive(filename, handler);
        }
      })
  );
};

const log = (info) => {
  console.log(chalk.green(info));
};
const warn = (info) => {
  console.log(chalk.yellow(info));
};
const errLog = (info) => {
  console.log(chalk.red(info));
};
module.exports = {
  runPromisesInSeries,
  recursive,
  log,
  warn,
  errLog,
};
