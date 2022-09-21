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
/**异步 */

exports.pipeAsyncFunctions =
  (...fns) =>
  (arg) =>
    fns.reduce((p, f) => p.then(f), Promise.resolve(arg));


exports.sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

exports.chainAsync = (fns) => {
  let curr = 0;
  const last = fns[fns.length - 1];
  const next = () => {
    const fn = fns[curr++];
    fn === last ? fn() : fn(next);
  };
  return next;
};

exports.promisify =
  (func) =>
  (...args) =>
    new Promise((resolve, reject) => func(...args, (err, result) => (err ? reject(err) : resolve(result))));

exports.runAsync = (fn) => {
  const blob = `var fn = ${fn.toString()}; postMessage(fn());`;
  const worker = new Worker(
    URL.createObjectURL(new Blob([blob]), {
      type: "application/javascript; charset=utf-8",
    })
  );
  return new Promise((res, rej) => {
    worker.onmessage = ({ data }) => {
      res(data), worker.terminate();
    };
    worker.onerror = (err) => {
      rej(err), worker.terminate();
    };
  });
};
/** 函数 */

exports.compose = (...fns) =>
  fns.reduce(
    (f, g) =>
      (...args) =>
        f(g(...args))
  );

exports.curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);

exports.debounce = (fn, ms = 0) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

// eslint-disable-next-line @typescript-eslint/ban-types
exports.throttle = (fn, threshHold = 250, scope) => {
  let last, deferTimer;
  return function () {
    const context = scope || this;
    const now = +new Date(),
      args = arguments;
    if (last && now < last + threshHold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshHold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
};

exports.once = (fn) => {
  let called = false;
  return function (...args) {
    if (called) return;
    called = true;
    return fn.apply(this, args);
  };
};

exports.defer = (fn, ...args) => setTimeout(fn, 1, ...args);

exports.memoize = (fn) => {
  const cache = new Map();
  const cached = function (val) {
    return cache.has(val) ? cache.get(val) : cache.set(val, fn.call(this, val)) && cache.get(val);
  };
  cached.cache = cache;
  return cached;
};

exports.remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
        arr.splice(arr.indexOf(val), 1);
        return acc.concat(val);
      }, [])
    : [];

exports.difference = (a, b) => {
  const s = new Set(b);
  return a.filter((x) => !s.has(x));
};
/** Type */
exports.isNil = (val) => val === undefined || val === null;

/** 对象 */

exports.isEmpty = (val) => val == null || !(Object.keys(val) || val).length;

exports.is = (type, val) => ![undefined, null].includes(val) && val.constructor === type;

const equals = (a, b) => {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== "object" && typeof b !== "object")) return a === b;
  if (a.prototype !== b.prototype) return false;
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every((k) => equals(a[k], b[k]));
};

exports.equals = equals;

exports.deepClone = (obj) => {
  if (obj === null) return null;
  const clone = Object.assign({}, obj);
  Object.keys(clone).forEach((key) => (clone[key] = typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key]));
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};

exports.uniqueBy = (arr, fn) =>
  arr.reduce((acc, v) => {
    if (!acc.some((x) => fn(v, x))) acc.push(v);
    return acc;
  }, []);

exports.omit = (obj, arr) =>
  Object.keys(obj)
    .filter((k) => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

exports.omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter((k) => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

exports.pick = (obj, arr) => arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

exports.pickBy = (obj, fn) =>
  Object.keys(obj)
    .filter((k) => fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});


exports.getIpAddress = () => {
  var interfaces = require("os").networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
        return alias.address;
      }
    }
  }
};

const execAsync = async (cmd) => {
  return new Promise((resolve, reject) => {
    require("shelljs").exec(cmd, (code, stdout, stderr) => {
      if (code !== 0) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};
exports.execAsync = execAsync;

exports.getDiffList = async (cur, pre) => {
  const diffData = await execAsync(`git diff --name-only ${cur} ${pre}`);
  const diffArr = diffData
    .toString()
    .split("\n")
    .map((v) => v.trim());
  return diffArr;
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
