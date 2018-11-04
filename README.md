# Slack/Zomato Daily menu
Daily menu for Slack.<br>
![❤️](https://raw.githubusercontent.com/mchsk/slack-zomato-daily-menu/assets/images/slack-zomato-heroku.png)
This is an effort to make use of the following:
- zomato data
- slack collaboration tool
- heroku platform as a service

### How to use it
Just fire your [curl](https://tecadmin.net/post-json-data-with-curl-command/) command that represents the following pattern. It is pretty self-explanatory.
```
POST http://slack-zomato-daily-menu.herokuapp.com/api/send

{
	"restaurants": [
		{
			"zomato_id": "16506717",  // zomato restaurant id
			"slack_icon": ":dno:"     // slack emoji representation of the restaurant
		},
		{
			"zomato_id": "16506578",
			"slack_icon": ":jeba:"
		}
		],
	"slack_token": "TOKEN",          // the ending of Webhook URL - looks like XXXXX/YYYYY/ZZZZZZ
	"slack_channel": "#lunchtime",   // optional: channel/username where to send to
	"slack_username": "Fooood!",     // optional: name of the bot
	"slack_emoji": ":slack:"         // optional: represents the slack emoji of the bot
}
```

### Screenshot
![❤️](https://raw.githubusercontent.com/mchsk/slack-zomato-daily-menu/assets/images/sample.png)

⚠️Disclaimer: Not officially affiliated with Slack/Zomato in any way. Provided as is.

### Enjoy!
