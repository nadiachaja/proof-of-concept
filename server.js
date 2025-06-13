
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
 
    // Maak een years array aan
    let years = []
    let authors = []
    let plaatsVanUitgaves = []
    // Loop door alle books (apiOverviewBooksJSON)
    apiOverviewBooksJSON.forEach(function(book) {
      // Stop elk jaartal, autheur of plaats van uitgave van zo'n boek in die years array, als die nog niet in die array zit
      book.metadata.forEach(function(metadata) {
        if (metadata.field == 'jaar') {
          if (!years.includes(metadata.value)) {
            years.push(metadata.value)
          }
        }
        if (metadata.field == 'auteur') {
          metadata.value.forEach(function(author) {
            // clean up data
            if (!authors.includes(author)) {
              authors.push(author)
            }
          }
        )}

        if (metadata.field == 'plaats_van_uitgave') {
          if (!plaatsVanUitgaves.includes(metadata.value)) {
            plaatsVanUitgaves.push(metadata.value)
          }
        }
      })
      
    })
    
    // Sorteer daarna eventueel de years array
    years.sort()
    authors.sort()
    plaatsVanUitgaves.sort()

    response.render('index.liquid', { booksOverview: apiOverviewBooksJSON, years: years, authors: authors, plaatsVanUitgaves: plaatsVanUitgaves })
  })

  app.get('/detail/:id', async function (request, response) {
    const id = request.params.id;
    const apiDetailBooks = await fetch(`https://efm-student-case-proxy-api.vercel.app/detail/${id}`);
    const apiDetailBooksJSON = await apiDetailBooks.json();
  
    response.render('detail.liquid', { booksDetail: apiDetailBooksJSON.data });
  });



app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
  })