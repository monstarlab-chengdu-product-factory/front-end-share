'use strict'
const fs = require('fs-extra')
const co = require('co')
const path = require('path');
const downFile = require('download-git-repo')
const inquirer = require('inquirer')
const request = require('request')
const ora = require('ora')
const util = require('./util')
const chalk = require('chalk')
const exportBaseUrl = path.join(process.cwd(), '');


function askProjectName(prompts) {
  prompts.push({
    type: 'input',
    name: 'projectName',
    message: '请输入项目名称!',
    validate(input) {
      if (!input) {
        return '项目名不能为空'
      }
      if (fs.existsSync(input)) {
        return '项目名依然重复'
      }
      return true
    }
  })
}
function askDescription(prompts) {
  prompts.push({
    type: 'input',
    name: 'description',
    message: '请输入项目介绍'
  })
}
function askProjectType(prompts) {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../08-template.json'), 'utf-8'))
  const proType = data.proTypeArr

  prompts.push({
    type: 'list',
    name: 'projectType',
    message: '请选择新项目类型',
    choices: proType
  })
}
function askTemplate(proType) {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../08-template.json'), 'utf-8'))
  const proTemplate = data.proTemplate

  return {
    type: 'list',
    name: 'templateType',
    message: '请选择项目模板',
    choices: proTemplate[proType]
  }
}

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
    request(`https://github.com/${username}/${repos}/raw/${branch}/${url}`, (err, res, body) => {
      if(err) {
        return reject(err)
      }
      return resolve();
    })
  })
}

function updateTemplateJson() {
  const spinner = ora(`正在从 远端 拉取模板JSON 跟新本地JSON库...`).start()

    return new Promise(async (resolve, reject) => {
      await downloadFile('monstarlab-chengdu-product-factory', 'front-end-wiki', 'master', '08-template.json').catch(err => {
        console.log()
        spinner.fail(`${chalk.red('更新模板JSON失败,你可以等几分钟再试几次！')}`)
        console.error(`错误原因：${err}`)
        process.exit()
      })
      spinner.succeed(`${chalk.grey('更新模板JSON成功！')}`)
      resolve()
    })
}

module.exports = () => {
  util.printPkgVersion()
  console.log(
    chalk.green(
      `************* ${util.getPkgName()} 即将创建一个新项目! *******************`
    )
  )
  console.log()
  co(function*() {
    // 判断是否拉取远程模板
    const isLoad = yield inquirer.prompt([{
      type: 'confirm',
      name: 'isLoad',
      default: false,
      message: '是否拉取远程JSON文件？'
    }])
    // 拉取远程模板json
    if (isLoad.isLoad) {
      yield updateTemplateJson()
    }
    // 开始选择
    var prompts = []
    askProjectName(prompts)
    askDescription(prompts)
    askProjectType(prompts)
    const result1 = yield inquirer.prompt(prompts)
    const promptsPro = askTemplate(result1.projectType)
    const result2 = yield inquirer.prompt(promptsPro)
    // console.log({ ...result1, ...result2 })

    const spinner = ora(`正在从 ${result2.templateType} 拉取远程模板...`).start()

    yield new Promise((resolve, reject) => {
      downFile(`direct:${result2.templateType}`, result1.projectName, { clone: true }, function(error) {
        if (error) {
          console.log(error)
          spinner.color = 'red'
          spinner.fail(chalk.red('拉取远程模板仓库失败！'))
          console.log(`错误信息：${error.statusMessage}`)
          return resolve()
        }
        spinner.color = 'green'
        spinner.succeed(`${chalk.grey('新项目创建成功！')}`)
        resolve()
      })
    })

    process.exit()
  })
}
