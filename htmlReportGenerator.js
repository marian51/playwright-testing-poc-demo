// import reporter from "cucumber-html-reporter";
const reporter = require("cucumber-html-reporter");
const date = new Date();
const currentDate =
    date.getDate() +
    "_" +
    (date.getMonth() + 1) +
    "_" +
    date.getFullYear() +
    "_" +
    date.getHours() +
    "_" +
    date.getMinutes() +
    "_" +
    date.getSeconds();

const options = {
    brandTitle: "Test report",
    theme: "bootstrap",
    jsonFile: `reports/cucumber_report_json.json`,
    output: `reports/cucumber_report_${currentDate}.html`,
    screenshotsDirectory: "./screenshots",
    storeScreenshots: true,
    reportSuiteAsScenarios: true,
    launchReport: true,
    scenarioTimestamp: true,
    metadata: {
        option: "value",
    },
};

reporter.generate(options);
