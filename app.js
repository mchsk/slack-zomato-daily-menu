
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
  const slackChannel = '#mittag_essen'
  const slackEmoji = ':donald:'
  const slackUsername = 'Eating great again?'
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
      slackMessage = `\n ${slackIcon}  *${name}* _No daily menus available._\n\n ${url}`
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

    slack.webhook({
      channel: slackChannel,
      username: slackUsername,
      icon_emoji: slackEmoji,
      text: slackMessage,
    }, function(err, response) {
      console.log(`#slack: ${slackMessage}`)
    })
  }

  this.body = {
    success: true
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
  // console.log(restaurant)

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
  // console.log(dailyMenu)

  return {
    name: restaurant.name,
    url: restaurant.url,
    menus: dailyMenu.daily_menus[0].daily_menu.dishes
  }
}

app.listen(config.HTTP_PORT)
