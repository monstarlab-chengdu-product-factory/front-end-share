'use strict'
const fs = require('fs-extra');
const chalk = require('chalk');
const co = require('co');
const path = require('path');
const ora = require('ora');
const inquirer = require('inquirer');
const request = require('request');

function askTemplate(prompts) {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../templates.json'), 'utf-8'))
  const tempArr = data.textTempArr

  prompts.push({
    type: 'list',
    name: 'templateText',
    message: '请选择要生成的模板文件',
    choices: tempArr
  })
}

/*
* url 网络文件地址
* filename 文件名
* callback 回调函数
*/
function downloadFile(uri,filename,callback,callbackError){
  var stream = fs.createWriteStream(filename);
  request(uri).pipe(stream).on('close', callback).on('error', callbackError); 
}

module.exports = () => {
  console.log(
    chalk.grey(
      `************* 正在创建模板文件 *******************`
    )
  );
  console.log();
  co(function*() {
    var prompts = [];
    askTemplate(prompts);
    const tempUrl = yield inquirer.prompt(prompts);
    const tempName = yield inquirer.prompt({
      type: 'input',
      name: 'name',
      message: '输入文件名称（需要加上文件后缀）',
      validate(input) {
        if (!input) {
          return '文件名不能为空'
        }
        return true
      }
    });
    
    const spinner = ora(`正在生成模板文件...`).start();
    downloadFile(tempUrl.templateText, tempName.name, function() {
      spinner.succeed(`${chalk.green('创建文件成功！Yeeeee')}`)
      process.exit()
    }, function(err) {
      console.log()
      spinner.fail(`${chalk.red('创建文件失败！我也很恼火！')}`)
      console.error(`错误原因：${err}`)
      process.exit()
    })
    // console.log(tempUrl)
    // request.get(tempUrl.templateText, (err, res, body) => {
    //   if(err) {
    //     console.log()
    //     spinner.fail(`${chalk.red('创建文件失败！我也很恼火！')}`)
    //     console.error(`错误原因：${err}`)
    //     process.exit()
    //   }
    //   spinner.succeed(`${chalk.green('创建文件成功！Yeeeee')}`)
    //   process.exit()
    // })
    // .pipe(fs.createWriteStream(`./${tempName}`))

  });
}