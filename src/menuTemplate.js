const isMac = process.platform === "darwin";

exports.menuTemplate = [
	// { role: 'appMenu' }
	...(isMac
		? [
				{
					label: app.name,
					submenu: [
						{ role: "about" },
						{ type: "separator" },
						{ role: "services" },
						{ type: "separator" },
						{ role: "hide" },
						{ role: "hideOthers" },
						{ role: "unhide" },
						{ type: "separator" },
						{ role: "quit" },
					],
				},
		  ]
		: []),
	// { role: 'viewMenu' }
	{
		label: "View",
		submenu: [
			{ role: "reload" },
			{ role: "forceReload" },
			{ type: "separator" },
			{ role: "resetZoom" },
			{ role: "zoomIn" },
			{ role: "zoomOut" },
			{ type: "separator" },
			{ role: "togglefullscreen" },
		],
	},
	// { role: 'windowMenu' }
	{
		label: "Window",
		submenu: [
			{ role: "minimize" },
			{ role: "zoom" },
			...(isMac
				? [
						{ type: "separator" },
						{ role: "front" },
						{ type: "separator" },
						{ role: "window" },
				  ]
				: [{ role: "close" }]),
		],
	},

	{
		role: "help",
		submenu: [
			{
				label: "How to use",
				click: async () => {
					const { shell } = require("electron");
					await shell.openExternal("https://a1p1.short.gy/discord-acc-help");
				},
			},
			{
				label: "Please donate",
				click: async () => {
					const { shell } = require("electron");
					await shell.openExternal("https://a1p1.short.gy/discord-acc-donate");
				},
			},
		],
	},
];
