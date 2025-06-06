
import express from 'express'
import { Liquid } from 'liquidjs';
// import fetch from 'node-fetch'
// import Fuse from 'fuse.js'

const app = express()
app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express());

app.set('views', './views')
app.use(express.urlencoded({ extended: true }))


app.get('/', async function (request, response) {
    
    response.render('index.liquid')
  })



app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
  })