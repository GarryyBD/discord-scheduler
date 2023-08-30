const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
const { menuTemplate } = require("./menuTemplate");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	app.quit();
}

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
		//autoHideMenuBar: true,
	});

	// and load the index.html of the app.
	mainWindow.loadFile(path.join(__dirname, "index.html"));
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

const crons = [];

ipcMain.handle(
	"start",
	(event, token, activityType, activityName, scheduledMessages) => {
		const Eris = require("eris");
		const bot = new Eris(token);
		const CronJob = require("cron").CronJob;

		bot.connect();

		bot.editStatus("idle", [
			{
				type: activityType,
				name: activityName,
			},
		]);

		// create cron jobs to schedule messages
		for (const scheduledMsg of scheduledMessages) {
			const cron = new CronJob({
				cronTime: scheduledMsg.cronTime,
				onTick: function () {
					bot.createMessage(scheduledMsg.channelID, scheduledMsg.message);
				},
				start: true,
				runOnInit: true,
			});

			crons.push(cron);
		}
	}
);

ipcMain.handle("deleteCrons", () => {
	crons.forEach((cron) => {
		cron.stop();
		Object.keys(cron).forEach((key) => delete cron[key]);
	});
	crons.splice(0, crons.length);
});
