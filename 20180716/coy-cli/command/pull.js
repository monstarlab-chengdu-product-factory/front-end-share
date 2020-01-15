'use strict'
const fs = require('fs-extra');
const co = require('co');
const path = require('path');
const request = require('request');
const ora = require('ora');
const chalk = require('chalk');
const exportBaseUrl = path.join(process.cwd(), '');

/**
 * @param {String} username
 * @param {String} repos
 * @param {String} branch
 * @param {String} url
 */
function downloadFile(username, repos, branch, url) {
  // download file
  const exportUrl = path.join(exportBaseUrl, url);
  const dir = path.dirname(exportUrl);
  // mkdir
  // mkdirsSync(dir);
  return new Promise((resolve, reject) => {
    request.get(`https://github.com/${username}/${repos}/raw/${branch}/${url}`, (err, res, body) => {
      if(err) {
        return reject(err);
      }
      return resolve();
    })
    .pipe(fs.createWriteStream(exportUrl))
  })
}

function updateTemplateJson() {
  const spinner = ora(`正在从远端拉取模板JSON并更新本地JSON库...`).start()

    return new Promise(async (resolve, reject) => {
      await downloadFile('monstarlab-chengdu-product-factory', 'front-end-wiki', 'master', '08-template.json').catch(err => {
        console.log()
        spinner.fail(`${chalk.red('更新模板JSON失败,你可以等几分钟再试几次！')}`)
        console.error(`错误原因：${err}`)
        process.exit()
      })
      fs.copySync(path.join(__dirname, '../08-template.json'), path.join(__dirname, '../templates.json'))
      spinner.succeed(`${chalk.green('更新模板JSON成功！')}`)
      resolve()
    })
}
module.exports = () => {
  co(function*() {
    yield updateTemplateJson()
  });
}