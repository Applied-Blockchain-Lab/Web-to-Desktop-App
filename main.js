const { app, BrowserWindow, ipcMain } = require("electron");
const { createMainWindow } = require("./src/mainWindow");

const file = "index.html";

ipcMain.on('set-url', function(event, url) {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    createMainWindow(url, null);
 });

app.whenReady().then(() => {
    createMainWindow(null, file);
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow(null, file);
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
