// main.js
const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");

const fpoData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "fpo.json"), "utf8"),
);
const mpoData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "mpo.json"), "utf8"),
);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "render.js"), // Preload script
    },
  });

  win.loadFile("src/index.html");

  // When the renderer asks for data, send it back
  ipcMain.handle("get-player-data", () => {
    return { fpo: fpoData, mpo: mpoData };
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
