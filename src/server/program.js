var path =require('path');
var program = require('commander');

// Current working directory, default to process.cwd()
var cwd = process.cwd();

program
  .option('-d, --debug', 'output extra information for debugging')
  .option('-e, --env [env]', 'specify an environment', 'dev')
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
  env: program.env
}
