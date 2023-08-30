let app = new App();

app.init();

// handle bot start/stop button
document.getElementById("botform").onsubmit = async (e) => {
	e.preventDefault();

	await app.toggle();
	app.saveData();
};

// handle add schedule message button
document.getElementById("schedule").onclick = (e) => {
	e.preventDefault();

	const channelID = document.getElementById("channelID")?.value;
	const cronTime = document.getElementById("cronTime")?.value;
	const message = document.getElementById("msg")?.value;

	const scheduleMessage = new ScheduledMessage(channelID, cronTime, message);
	app.account.addScheduleMessage(scheduleMessage);
	app.displayScheduledMessages();
	app.saveData();

	document.getElementById("channelID").value = "";
	document.getElementById("cronTime").value = "";
	document.getElementById("msg").value = "";
};

function removeScheduledMessage(id) {
	app.account.removeScheduledMessage(id);
	app.displayScheduledMessages();
	app.saveData();
}
