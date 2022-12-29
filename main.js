const { app, BrowserWindow, ipcMain } = require("electron");
const cp = require("child_process");
require("dotenv").config();
const jsonfile = require("jsonfile");
const path = require("path");
const { randomUUID } = require("crypto");

const { createMainWindow } = require("./src/js/mainWindow");
const store = require("./src/helpers/store");
const { ENTRYFILE, ID } = require("./src/helpers/util");



if (process.env.ORIGIN === "CORE") {
  ipcMain.on("set-app-name-url", async function (event, data) {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);

    let id = randomUUID();
    let storeData = {
      appUrl: data.url,
      appName: data.name,
    };
    store.set(id, storeData);

    //Save id and appName in config.json
    jsonfile.writeFileSync(path.join(__dirname, ".config.json"), {
      id: id,
      appName: data.name,
    });

    // Run install script
    cp.exec("./app-install.sh", (error, stdout, stderr) => {
      // catch err, stdout, stderr
      if (error) {
        console.log("Error in removing files");
        console.log(error);
        return;
      }
      if (stderr) {
        console.log("an error with file system");
        return;
      }
      console.log("Result of shell script execution", stdout);
    });
    app.quit();
  });

  app.whenReady().then(() => {
    createMainWindow(null, ENTRYFILE);
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0)
        createMainWindow(null, ENTRYFILE);
    });
  });
}
if (process.env.ORIGIN === "INSTANCE") {
  let storeData = store.get(ID);
  let appUrl = storeData.appUrl;
  app.whenReady().then(() => {
    createMainWindow(appUrl, null);
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0)
        createMainWindow(appUrl, null);
    });
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
