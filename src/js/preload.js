const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  setAppNameAndUrl: (name, url) =>
    ipcRenderer.send("set-app-name-url", { name, url }),
});
