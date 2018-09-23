/**
 * Global Chrome Driver Configuration for nightwatch.js
 * **/

var chromedriver = require('chromedriver');
var path = require('path');
var driverInstanceCI;

function isRunningInCI() {
    /**
     * Detect test running with CI mode
     * **/
    return this.test_settings.globals.integration;
}

function startChromeDriver() {
    /**
     * Function to start chrome driver
     * **/
    if (isRunningInCI.call(this)) {
        //If test run with CI mode
        // Run chrome driver with driver from bin directory in our project
        var location = path.join(__dirname, '../bin/2.41-x64-chromedriver');
        //Create driver instance CI from chrome driver and execute it.
        driverInstanceCI = require('child_process').execFile(location, []);
        return;
    }
    //Else Run chrome driver with module from npm
    chromedriver.start();
}

function stopChromeDriver() {
    /**
     * Function to Stop chrome driver
     * **/
    if (isRunningInCI.call(this)) {
        //If test run in CI mode, Kill process chrome driver
        driverInstanceCI && driverInstanceCI.kill();
        return;
    }

    // ELse, Stop chrome driver from node module
    chromedriver.stop();
}

module.exports = {
    'ci-server': {
        integration: true
    },

    before: function (done) {
        // Before run the test, start chrome driver
        startChromeDriver.call(this);
        done();
    },

    after: function (done) {
        // After run the test, stop or kill chrome driver
        stopChromeDriver.call(this);
        done();
    }
};