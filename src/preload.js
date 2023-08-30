const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
	start: (...args) => ipcRenderer.invoke("start", ...args),
	deleteCrons: () => ipcRenderer.invoke("deleteCrons"),
});
