
const path = require('path')

function getRootPath () {
  return path.resolve(__dirname, '../')
}

function getPkgVersion () {
  return require(path.join(getRootPath(), 'package.json')).version
}

function getPkgName () {
  return require(path.join(getRootPath(), 'package.json')).name
}

function printPkgVersion () {
  const version = getPkgVersion()
  const name = getPkgName()
  console.log()
  console.log(`✨ ${name} v${version}`)
  console.log()
}

module.exports = {
  printPkgVersion,
  getPkgName,
  getPkgVersion,
  getRootPath
}