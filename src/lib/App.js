class App {
	constructor() {
		this.isStarted = false;
		this.controller = null;
		this.account = null;
	}

	/**
	 * Initialize the app
	 */
	init() {
		// restore previous session
		this.account = Account.restore();

		// set start btn style to "Stop bot"
		this.setStyleStartBtn(false);

		// set input values with previous session data
		document.getElementById("token").value = this.account?.token;
		document.getElementById("activityType").value = this.account?.activityType;
		document.getElementById("status").value = this.account?.status;

		this.displayScheduledMessages();
	}

	displayScheduledMessages() {
		const scheduledMsgContainer = document.getElementById("scheduled-messages");

		scheduledMsgContainer.innerHTML = "";

		this.account?.scheduledMessages.map((scheduledMessage) => {
			scheduledMsgContainer.innerHTML += `
			<div class="msg-container">
				<img src="./assets/trash-icon.svg" class="trash-icon" onclick="removeScheduledMessage('${scheduledMessage.id}')" />

				<div class="msg-info">
					Channel ID: <span class="color-blue">${scheduledMessage.channelID}</span>
				</div>
				<div class="msg-info">
					Cron time: <span class="color-yellow">${scheduledMessage.cronTime}</span>
				</div>
				<div class="msg-info">
					Message: <span class="color-purple">${scheduledMessage.message}</span>
				</div>
			</div>
			`;
		});
	}

	/**
	 * Saves app's data in localstorage
	 */
	saveData() {
		Account.saveData(this.account);
	}

	/**
	 * Toggle application (Start/Stop)
	 */
	async toggle() {
		app.isStarted ? app.stop() : await app.start();
		app.isStarted = !app.isStarted;
	}

	/**
	 * Start the discord account bot
	 */
	async start() {
		this.account.token = document.getElementById("token").value;
		this.account.activityType = document.getElementById("activityType").value;
		this.account.status = document.getElementById("status").value;

		// save process' controller to stop it later
		this.controller = new AbortController();

		// start bot
		await window.versions.start(
			this.account.token,
			parseInt(this.account.activityType),
			this.account.status,
			this.account.scheduledMessages
		);

		this.setStyleStartBtn(true);
	}

	/**
	 * Stop the discord account bot
	 */
	async stop() {
		if (this.controller) this.controller.abort();
		await window.versions.deleteCrons();
		this.setStyleStartBtn(false);
	}

	setStyleStartBtn(bool) {
		const startBtn = document.getElementById("start");

		if (bool) {
			startBtn.value = "Stop bot";
			startBtn.style.backgroundColor = "#630a0a";
		} else {
			startBtn.value = "Start bot";
			startBtn.style.backgroundColor = "#047828";
		}
	}
}
