const path = require('path');
const fs = require('fs-extra');
const { parse } = require('@babel/parser');
const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const mkdirp = require('mkdirp');
const { log, errLog, warn, runPromisesInSeries } = require('./utils');

class traverseSrc {
  constructor() {
    this.output = path.join(__dirname, 'out');
    this.dirJson = null;
  }
  transformFile(file) {
    const ext = path.extname(file);
    if (ext === '.js') return this.jsTransfer(file);
  }
  jsTransfer(file) {
    console.log(file);
    if (file.includes(`src\\assets\\js\\index.js`)) {
      log('exclude');
      return;
    }
    const content = fs.readFileSync(file, 'utf8');
    const ast = parse(content, {
      sourceType: 'module',
      plugins: ['exportDefaultFrom'],
    });
    traverse(ast, {
      ImportDeclaration: (res) => {
        // console.log(res);
      },
      ExportNamedDeclaration: ({ node }) => {
        // 获取 export from 地址
        if (!node.source) {
          return;
        }
        const { value } = node.source;
        const newVal = this.refactorJsDeps(file, value);
        if (newVal) node.source.value = newVal;
      },
      CallExpression: ({ node }) => {
        if (node.callee.name && node.callee.name === 'require' && node.arguments.length >= 1) {
          // 获取 require 地址
          const value = node.arguments[0].value;
          if (!value) return;
          const newVal = this.refactorJsDeps(file, value);
          if (newVal) node.arguments[0].value = newVal;
        }
      },
      // 修改方法名
      FunctionDeclaration({ node }) {
        // 修改
        console.log(node.id.name);
        console.log('-----------');
        // const updateParamNameVisitor = {
        //   Identifier(path) {
        //     path.node.name = 'x';
        //   },
        // };
        node.id.name = 'bqc';
      },
    });
    const transformedCode = generate(ast).code;
    console.log(transformedCode);
    return {
      source: transformedCode,
    };
  }
}

async function transformFn() {
  const dirPath = path.join(__dirname, 'out/dirList.json');
  if (!fs.existsSync(dirPath)) {
    errLog(dirPath + ' does not exist');
    return;
  }
  const to = path.join(dirPath, 'copySrc');
  const dirJson = fs.readJsonSync(dirPath);
  const traverseCase = new traverseSrc();
  await runPromisesInSeries(
    dirJson.map((x) => {
      return traverseCase.transformFile(x);
    })
  );
}
transformFn();
