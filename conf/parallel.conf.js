username= process.env.LT_USERNAME || "<your username>",
accessKey=  process.env.LT_ACCESS_KEY || "<your accessKey>",

exports.config = {
  'specs': [ '../specs/single.js','../specs/GoogleSearch.js' ],

  seleniumAddress: 'https://'+username+':'+accessKey+'@hub.lambdatest.com/wd/hub',

  'commonCapabilities': {
    'build': 'protractor-parallel-specs-',
    'tunnel': false
  },

  'multiCapabilities': [{
    'browserName': 'Chrome',
    'version':'latest',
    'platform': 'Windows 10',
     shardTestFiles: true,      //required to run each spec file as individual test session on LT

  },{
    'browserName': 'Safari',
    'version':'latest',
    'platform': 'macOS Mojave',
     shardTestFiles: true,     //required to run each spec file as individual test session on LT

  }],

  onPrepare: () => {

    myReporter = {
      specStarted: function(result) {
        specStr= result.id
        spec_id = parseInt(specStr[specStr.length -1])
        browser.getProcessedConfig().then(function (config) {
          var fullName = config.specs[spec_id];
          browser.executeScript("lambda-name="+fullName.split(/(\\|\/)/g).pop())      //naming each spec as a test Name
        });
      },
      specDone: function(result) {
        browser.executeScript("lambda-status="+result.status);                      //setting the status of the test on LT
      }
    };
    jasmine.getEnv().addReporter(myReporter);
},
  onComplete: () => {
    browser.quit();
  }

};

// Code to support common capabilities
exports.config.multiCapabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
