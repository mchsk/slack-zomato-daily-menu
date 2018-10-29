module.exports = {
  HTTP_PORT: Number(process.env.PORT) || 3000,
  URL_LISTENING_SEND: process.env.URL_LISTENING_SEND || '/api/send',
  ZOMATO_TOKEN: process.env.ZOMATO_TOKEN || 'THe-api-key',
  HOME_MESSAGE: process.env.HOME_MESSAGE || 'Your daily menu angel is here! <3 Brno'
}
