const { screen, BrowserWindow } = require("electron");
const windowState = require("electron-window-state");
const path = require("path");

const createMainWindow = (url, file) => {
  // Get information about the screen size.
  const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
  // Load the previous state with fall-back to defaults
  const mainWindowState = windowState({
    defaultWidth: workAreaSize.width - 200,
    defaultHeight: workAreaSize.height - 100,
  });

  const win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 300,
    minHeight: 300,
    backgroundColor: "#FFF",
    titleBarStyle: "hidden",
    center: true,
    scrollBounce: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.webContents.setWindowOpenHandler(() => {
    return {
      action: "allow",
      overrideBrowserWindowOptions: {
        frame: true,
        fullscreenable: false,
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        minWidth: 300,
        minHeight: 300,
        backgroundColor: "#FFF",
        titleBarStyle: "hidden",
        center: true,
        scrollBounce: false,
        backgroundColor: "black",
      },
    };
  });

  win.webContents.openDevTools();

  if (url) {
    win.loadURL(url, { userAgent: "Chrome" });
  } else if (file) {
    win.loadFile(file);
  }
  win.once("ready-to-show", () => {
    win.show();
  });
};

module.exports = { createMainWindow };
