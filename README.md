# Slack/Zomato Daily menu
Daily menu for Slack.<br>
![❤️](https://raw.githubusercontent.com/mchsk/slack-zomato-daily-menu/assets/images/slack-zomato-heroku.png)
This is an effort to make use of combination of:
- zomato data
- slack collaboration tool
- heroku platform as a service

### How to use it
Just fire your curl command that represents the following pattern. It is pretty self-explanatory.
```
POST http://slack-zomato-daily-menu.herokuapp.com/api/send

{
	"restaurants": [
		{
			"zomato_id": "16506717",
			"slack_icon": ":dno:"
		},
		{
			"zomato_id": "16506578",
			"slack_icon": ":jeba:"
		}
		],
	"slack_token": "TOKEN",       // the ending of Webhook URL - looks like XXXXX/YYYYY/ZZZZZZ
	"slack_channel": "@marek",    // optional: channel/username where to send to
	"slack_username": "LunchBot", // optional: name of the bot
	"slack_emoji": ":slack:"      // optional: represents the slack emoji of the bot
}
```

### Screenshot
![❤️](https://raw.githubusercontent.com/mchsk/slack-zomato-daily-menu/assets/images/sample.png)

⚠️Disclaimer: Not officially affiliated with Slack/Zomato in any way. Provided as is.

### Enjoy!
