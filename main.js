const fs = require("fs");
const { app, BrowserWindow } = require("electron"); // ✅ include app
const path = require("path");

// Read and parse the JSON files
const fpoData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "fpo.json"), "utf8"),
);

const mpoData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "mpo.json"), "utf8"),
);

console.log(fpoData);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "renderer.js"), // ✅ this runs in preload
    },
  });

  win.loadFile("index.html");
}

// Electron app lifecycle
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
