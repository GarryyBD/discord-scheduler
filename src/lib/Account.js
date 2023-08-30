class Account {
	constructor(token, activityType, status, scheduledMessages = []) {
		this.token = token;
		this.activityType = activityType;
		this.status = status;
		this.scheduledMessages = scheduledMessages;
	}

	/**
	 * Schedule message
	 * @param {ScheduledMessage} scheduledMessage
	 */
	addScheduleMessage(scheduledMessage) {
		this.scheduledMessages.push(scheduledMessage);
	}

	/**
	 * Remove scheduled message
	 * @param {string} id of the message
	 */
	removeScheduledMessage(id) {
		this.scheduledMessages = this.scheduledMessages.filter(
			(msg) => msg.id !== id
		);
	}

	/**
	 * Save account in localstorage for later reuse
	 * @param {Account} account to save
	 */
	static saveData(account) {
		this.token = document.getElementById("token")?.value;
		this.activityType = document.getElementById("activity")?.value;
		this.status = document.getElementById("status")?.value;

		const data = JSON.stringify(account);
		localStorage.setItem("data", data);
	}

	/**
	 * Retrieved old session account
	 * Returns empty account if no data found
	 *
	 * @returns Account
	 */
	static restore() {
		const dataCookie = localStorage.getItem("data");

		if (dataCookie) {
			const savedData = JSON.parse(dataCookie);

			return new Account(
				savedData?.token,
				savedData?.activityType,
				savedData?.status,
				savedData?.scheduledMessages
			);
		} else {
			return new Account();
		}
	}
}
