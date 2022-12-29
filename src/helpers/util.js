const jsonfile = require("jsonfile");
const data = jsonfile.readFileSync(".config.json");

const ENTRYFILE = "index.html";
const APPDESCRIPTION =
  "This application is a desktop wrapper for any web application built with ElectronJS.";

const APPNAME = data.appName;
const ID = data.id;
module.exports = {
    ENTRYFILE,
    APPDESCRIPTION,
    APPNAME,
    ID
};