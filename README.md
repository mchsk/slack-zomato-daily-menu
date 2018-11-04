# Slack/Zomato Daily menu
Daily menu for Slack.<br>
![❤️](https://raw.githubusercontent.com/mchsk/slack-zomato-daily-menu/assets/images/slack-zomato-heroku.png)
Disclaimer: Not officially affiliated with Slack/Zomato in any way. Provided as is.


![❤️](https://raw.githubusercontent.com/mchsk/slack-zomato-daily-menu/assets/images/sample.png)




### Long story short
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
	"slack_token": "TOKEN",
	"slack_channel": "@marek",
	"slack_username": "LunchBot",
	"slack_emoji": ":slack:"
}
```
