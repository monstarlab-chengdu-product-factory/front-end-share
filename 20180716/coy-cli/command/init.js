'use strict'
const fs = require('fs-extra')
const co = require('co')
const path = require('path');
const downFile = require('download-git-repo')
const inquirer = require('inquirer')
const ora = require('ora')
const util = require('./util')
const chalk = require('chalk')


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
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../templates.json'), 'utf-8'))
  const proType = data.proTypeArr

  prompts.push({
    type: 'list',
    name: 'projectType',
    message: '请选择新项目类型',
    choices: proType
  })
}
function askTemplate(proType) {
  return {
    type: 'list',
    name: 'templateType',
    message: '请选择项目模板',
    choices: proType
  }
}

module.exports = () => {
  util.printPkgVersion()
  console.log(
    chalk.grey(
      `************* ${util.getPkgName()} 即将创建一个新项目! *******************`
    )
  )
  console.log()
  co(function*() {
    // 开始选择
    var prompts = []
    askProjectName(prompts)
    askDescription(prompts)
    // 询问用户选择哪一个模板类型
    askProjectType(prompts)
    const result1 = yield inquirer.prompt(prompts)
    // 询问用户选择哪一个模板
    const promptsPro = askTemplate(result1.projectType)
    const result2 = yield inquirer.prompt(promptsPro)

    if (!result2.templateType) {
      console.log(chalk.red('该模板地址无效，请完善模板地址'))
      process.exit()
    }

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
