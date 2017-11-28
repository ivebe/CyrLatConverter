require('exit-code')
var browserstackRunner = require('browserstack-runner');
var config = require('./browserstack.json');

browserstackRunner.run(config, function(error, report) {
    for (var i = 0; i < report.length; i++) {
      var err = report[i].suites.status;
      if (err === 'failed') {
        process.exitCode = 1;
        return
      }
    }
});