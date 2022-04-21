const path = require('path');

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
let dirList = [];
let dir = recursive('./src', (res) => {
  dirList.push(res);
});
console.log(dirList);
dir.then((res) => {
  // console.log(dirList);
  console.log(replaceExt(dirList[0], '.jss'));
});
const root = path.resolve(__dirname, './src');
console.log(root);
// console.log(path.join(root, 'views'));
/**
 * path.relative(from, to)
 * from: 该文件路径将用作基本路径。
 * to:该文件路径将用于查找相对路径
 * 一句话总结 基于from路径去找 to路径
 */
console.log(path.relative(root, `G:/项目/mine/vue3-vite-移动端项目/vite-vue3-h5/server`));

function replaceExt(filePath, ext = '') {
  const dirName = path.dirname(filePath);
  const extName = path.extname(filePath);
  const fileName = path.basename(filePath, extName);
  console.log(dirName, extName, fileName);
  return path.join(dirName, fileName + ext);
}
