var path =require('path');
var program = require('commander');

// Current working directory, default to process.cwd()
var cwd = process.cwd();

program
  .option('-d, --debug', 'output extra information for debugging')
  .option('-e, --env [env]', 'specify an environment', 'dev')
  .option('-n, --name [name]', 'output directories name', "restackx-prototype")
  .option('-p, --path [path]', 'output directory\'s parent\'s path')
  .action(function(project){
    // change cwd if argument provided
    cwd = project
  })
  .parse(process.argv);

program.cwd = path.resolve(cwd);

module.exports = {
  program,
  cwd: path.resolve(cwd),
  debug: program.debug,
  env: program.env,
  name: program.name,
  path: program.path
}
