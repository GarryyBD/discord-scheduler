class ScheduledMessage {
	constructor(channelID, cronTime, message) {
		this.id = uuidv4();
		this.channelID = channelID;
		this.cronTime = cronTime;
		this.message = message;
	}
}
