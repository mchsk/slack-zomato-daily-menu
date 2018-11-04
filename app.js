
const config = require('./config')
const router = require('koa-router')()
const koaBody = require('koa-body')
const thenRequest = require('then-request')
const Slack = require('slack-node')
const Koa = require('koa')

// app
const app = module.exports = new Koa()

// routes
router.get('/', infoResponse)
router.post(config.URL_LISTENING_SEND, processSending)

app.use(koaBody())
app.use(router.routes())

// responsible methods
async function infoResponse(ctx) {
  ctx.body = config.HOME_MESSAGE
}

async function processSending(ctx) {
  const body = ctx.request.body

  const restaurants = body.restaurants
  const slackToken = body.slack_token

  // bot customization
  const slackChannel = body.slack_channel || '#mittag_essen' // haha ;)
  const slackUsername = body.slack_username || 'Eating great again?' // seriously.
  const slackEmoji = body.slack_emoji || ':donald:' // i mean. nobody else.
  

  slack = new Slack()
  slack.setWebhook(`https://hooks.slack.com/services/${slackToken}`)

  for (let i = 0; i < restaurants.length; i++) {
    const restaurant = restaurants[i]
    const zomatoId = restaurant.zomato_id
    const slackIcon = restaurant.slack_icon
    

    const restaurantData = await getRestaurantData(zomatoId)
    const name = restaurantData.name
    const menus = restaurantData.menus
    // the message to be sent
    let slackMessage = ''

    if (menus.length == 0) {
      slackMessage = `\n ${slackIcon}  *${name}* _Sorry, no daily menu today._\n${restaurantData.url}\n`
    } else {
      slackMessage = `\n ${slackIcon}  *${name}*\n\n`

      for (let j = 0; j < menus.length; j++) {
        const dish = menus[j]
        let priceString = '\n'
        if (dish.dish.price) {
            priceString = ` : ${dish.dish.price}\n`
        }

        slackMessage = `${slackMessage}${dish.dish.name}${priceString}`
      }
    }

    console.info(slackChannel)
    console.info(slackUsername)
    console.info(slackEmoji)
    
    slack.webhook({
      channel: slackChannel,
      username: slackUsername,
      icon_emoji: slackEmoji,
      text: slackMessage,
    }, function(err, response) {
      console.log(`#slack: ${slackMessage}`)
    })
  }

  ctx.body = {
    result: "ok"
  }

}

async function getRestaurantData(zomatoId) {
  const restaurantResponse = await thenRequest('GET',
    `https://developers.zomato.com/api/v2.1/restaurant?res_id=${zomatoId}`,
    {
      headers: {
        user_key: config.ZOMATO_TOKEN,
        Accept: 'application/json'
      }
    }
  )
  const restaurant = JSON.parse(restaurantResponse.getBody('UTF-8'))

  const dailyMenuResponse = await thenRequest('GET',
    `https://developers.zomato.com/api/v2.1/dailymenu?res_id=${zomatoId}`,
    {
      headers: {
        user_key: config.ZOMATO_TOKEN,
        Accept: 'application/json'
      }
    }
  )
  const dailyMenu = JSON.parse(dailyMenuResponse.getBody('UTF-8'))
  
  let menus = [] // empty menus in case there is nothing provided for today
  if (dailyMenu.daily_menus[0]) {
    menus = dailyMenu.daily_menus[0].daily_menu.dishes
  }
  return {
    name: restaurant.name,
    url: restaurant.url,
    menus
  }
}

app.listen(config.HTTP_PORT)
console.info(`Listening on port ${config.HTTP_PORT}. Call me 📞!`)
