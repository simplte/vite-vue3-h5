const path = require('path');
const utils = require('./utils');
const fs = require('fs-extra');

class readDirs {
  constructor() {
    this.dirList = [];
    this.root = path.resolve(__dirname, '../src');
    this.getDirsList();
  }
  async getDirsList() {
    await utils.recursive(this.root, (res) => {
      this.dirList.push(res);
    });
    console.log(this.dirList);
    this.outputDirList();
  }
  // 替换扩展名
  replaceExt(filePath, ext = '') {
    const dirName = path.dirname(filePath);
    console.log(dirName);
    const extName = path.extname(filePath);
    const fileName = path.basename(filePath, extName);
    console.log(dirName, extName, fileName);
    return path.join(dirName, fileName + ext);
  }
  outputDirList() {
    const outPath = path.resolve(__dirname, './out');
    console.log(outPath);
    if (!fs.existsSync(outPath)) fs.mkdirSync(outPath);

    // 输出文件树
    fs.writeJSONSync(outPath + '/dirList.json', this.dirList, { spaces: 2 });
  }
}

// console.log(path.join(root, 'views'));
const cases = new readDirs();
