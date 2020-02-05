'use strict'
const fs = require('fs-extra')
const co = require('co')
const path = require('path')
const request = require('request')
const ora = require('ora')
const chalk = require('chalk')
const exportBaseUrl = path.join(process.cwd(), '')

/**
 * @param {String} username
 * @param {String} repos
 * @param {String} branch
 * @param {String} url
 */
function downloadFile(username, repos, branch, url) {
  // download file
  const exportUrl = path.join(exportBaseUrl, url)
  const dir = path.dirname(exportUrl)
  // mkdir
  // mkdirsSync(dir);
  return new Promise((resolve, reject) => {
    request(
      {
        url: `https://github.com/${username}/${repos}/raw/${branch}/${url}`,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36',
          'X-Requested-With': 'XMLHttpRequest',
          Referer: 'https://github.com/monstarlab-chengdu-product-factory/front-end-wiki'
        }
      },
      (err, res, body) => {
        if (err) {
          return reject(err)
        }
        return resolve()
      }
    ).pipe(fs.createWriteStream(exportUrl))
  })
}

function updateTemplateJson() {
  const spinner = ora(`正在从远端拉取模板JSON并更新本地JSON库...`).start()

  return new Promise(async (resolve, reject) => {
    await downloadFile(
      'monstarlab-chengdu-product-factory',
      'front-end-wiki',
      'master',
      '08-template.json'
    ).catch(err => {
      console.log()
      spinner.fail(`${chalk.red('更新模板JSON失败,你可以等几分钟再试几次！')}`)
      console.error(`错误原因：${err}`)
      process.exit()
    })
    try {
      fs.copySync(
        path.join(exportBaseUrl, '08-template.json'),
        path.join(exportBaseUrl, 'templates.json')
      )
    } catch {
      console.error('拷贝失败')
    }
    spinner.succeed(`${chalk.green('更新模板JSON成功！')}`)
    resolve()
  })
}
module.exports = () => {
  co(function*() {
    yield updateTemplateJson()
  })
}
