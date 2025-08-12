// render.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getPlayerData: () => ipcRenderer.invoke("get-player-data"),
});
