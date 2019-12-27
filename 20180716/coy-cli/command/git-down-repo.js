const url = require('url');
const fs = require('fs');
const path = require('path');
const ProgressBar = require('progress');
const logSymbols = require('log-symbols');
const axios = require('axios');
const request = require('request');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const exportBaseUrl = path.join(process.cwd(), '');
let spinner = null; // loading animate
let bar = null; // loading bar
let protocol = null;
let argvs = [];
const defaultConfig = {
    coverRepo: true, // 命令行默认为true, node modules为false
    branch: 'master'
}
/**
 * @param {String} BaseUrl
 */
function parseUrl(BaseUrl) {
    try {
        const pathObj = url.parse(BaseUrl);
        const ghUrl = pathObj.path;
        protocol = pathObj.protocol;
        const infoList = ghUrl.split('/');
        let username = infoList[1];
        let repos = infoList[2];
        let branch = '';
        let download = '';
        const includeList = ['/tree/', '/blob/'];
        let includeSwitch = false;
        includeList.map(item => {
            if (ghUrl.indexOf(item) > -1 && !includeSwitch) {
                includeSwitch = true;
                branch = infoList[4];
                const list = ghUrl.split(item);
                download = list[1].split('/');
                download.shift();
                download = download.join('/');
            }
        })
        console.log(protocol)
        process.exit()
        if (!includeSwitch) {
            branch = defaultConfig.branch;
        }
        handleExistDir(username, repos, branch, download);
    } catch (e) {
        console.log(logSymbols.error, chalk.red('url error'));
    }
}

/**
 * @desc judge if local direstory has this repos
 * @param {String} username
 * @param {String} repos
 * @param {String} branch
 * @param {String} download
 */
function handleExistDir(username, repos, branch, download) {
    const currentRepos = path.join(process.cwd(), repos);
    if(fs.existsSync(currentRepos) && defaultConfig.coverRepo) {
        inquirer
            .prompt([
                {
                type: 'list',
                name: 'type',
                message: `Your current directory already has '${repos}'? Do you want to continue?`,
                choices: [
                    'continue',
                    'cancel'
                ]
                }
            ])
            .then(answers => {
                if(answers.type === 'continue') {
                    requestUrl(username, repos, branch, download);
                } else {
                    return;
                }
            });
    } else {
        requestUrl(username, repos, branch, download);
    }
}

/**
 * @desc request api
 * @param {String} username
 * @param {String} repos
 * @param {String} branch
 * @param {String} download
 */
function requestUrl(username, repos, branch, download) {

    // request start 
    spinner = ora('download start!').start();
    spinner.color = 'yellow';
	spinner.text = 'loading...';
    const url = `${protocol}//api.github.com/repos/${username}/${repos}/git/trees/${branch}?recursive=1`;
    axios.get(url).then(res => {
        const data = res.data;
        const trees = data.tree;
        handleTree(username, repos, branch, trees, download);
    }).catch(e => {
        console.log(e);
        spinner.stop();
        console.log(chalk.red(`network is error!`));
    })
}

/**
 * parse response 
 * @param {String} username
 * @param {String} repos
 * @param {String} branch
 * @param {String} tree
 * @param {String} download
 */
function handleTree(username, repos, branch, tree, download) {
    let filterList = tree.filter(item => {
        return item.type === 'blob';
    })
    if (download !== '') {
        filterList = filterList.filter(item => {
            // create reg
            const downRepl = download.replace(/\//g, '\\\/').replace(/\./g, '\\\.');
            const reg = new RegExp(`^${downRepl}`)
            return reg.test(item.path);
        })
    }
    // request list is ready
    spinner.stop();
    bar = new ProgressBar(':bar :current/:total', {
        total: filterList.length
    });

    filterList.map(item => {
        downloadFile(username, repos, branch, item.path)
    });
}

/**
 * @desc file or tree
 * @param {String} list
 * @param {String} file
 * @returns String
 */
function findDir(list, file) {
    let type = '';
    list.map(item => {
        if(item.path === file) {
            type = item.type;
        }
    })
    return type;
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
    mkdirsSync(dir);
    request(`${protocol}//github.com/${username}/${repos}/raw/${branch}/${url}`, (err, res, body) => {
        if(err) {
            console.log(logSymbols.error, chalk.red(`${url} is error`));
            return;
        }
        bar.tick();
        if (bar.complete) {
            console.log(logSymbols.success, chalk.green(`${repos} all files download!`));
            const BaseUrl = argvs.shift();
            if (!BaseUrl) {
                return;
            }
            parseUrl(BaseUrl);
        }
    }).pipe(fs.createWriteStream(exportUrl))
}

/**
 * @param {String} dirname
 * @returns
 */
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    }
    if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
    }
}

function urlQueueParse(urls) {
    argvs.push(...urls);
    const BaseUrl = decodeURI(argvs.shift());
    if (!BaseUrl) {
        console.log(chalk.red('url is required!'));
        return;
    }

    parseUrl(BaseUrl);
}

/**
 * @desc parse the way of Shell 
 */
function nodeShell() {
    const argv = process.argv;
    argv.splice(0, 2);
    let urls = argv;
    if(argv[1] && argv[1].indexOf('http') === -1) {
        urls = [argv[0]];
        defaultConfig.branch = argv[1];
    }
    urlQueueParse(urls);
}

/**
 * @desc parse the way of node modules 
 * @param {Object} config
 * @returns
 */
function nodeModules(config) {
    config = config || {};
    Object.assign(defaultConfig, {
        coverRepo: false, // 下载默认为覆盖
    }, config);
    return function(urls) {
        urlQueueParse(urls);
    }
}

module.exports = {
    nodeShell,
    nodeModules
};
