const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv-flow').config()

require('./routes/middlewares/mongo')

const app = express()
const port = 3080

app.use(morgan('dev'))
app.use(cors())
app.use((req, res, next) => {
  if (req.originalUrl === '/api/stripe/webhook') {
    next()
  } else {
    bodyParser.json()(req, res, next)
  }
})
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }))
//form-urlencoded
app.set('jwt', 'ebeb1a5ada5cf38bfc2b49ed5b3100e0')

app.use('/api', require('./routes/api'))

app.listen(port, () => {
  console.log(
    `Express server application is running at ${process.env.DOMAIN}:${port}`
  )
})
