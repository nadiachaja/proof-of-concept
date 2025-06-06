
import express from 'express'
import { Liquid } from 'liquidjs';

const app = express()
app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express());

app.set('views', './views') 
app.use(express.urlencoded({ extended: true }))


app.get('/', async function (request, response) {

    const apiOverviewBooks = await fetch(`https://efm-student-case-proxy-api.vercel.app/overview`)
    const apiOverviewBooksJSON = await apiOverviewBooks.json()

    // const Fuse = require('fuse.js');
    // const fuseOptions = {
    //     keys: [
    //         "title",
    //         "author",
    //         "titel",
    //         "jaar",
    //         "plaats van uitgave"
    //     ]
    // };
    // const Fuse = new Fuse(list, fuseOptions);

    response.render('index.liquid', { books: apiOverviewBooksJSON.data })
  })



app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
  })