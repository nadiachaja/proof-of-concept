
import express from 'express'
import { Liquid } from 'liquidjs';

const app = express()
app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express());

app.set('views', './views') 
app.use(express.urlencoded({ extended: true }))

app.get('/', async function (request, response) {
  try {
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
          // clean up data
          let yearClean = metadata.value.replace(/[\[\]]/g, '');
          if (!years.includes(yearClean)) {
            years.push(yearClean);
          }
        }
        if (metadata.field == 'auteur') {
          metadata.value.forEach(function(author) {
            // clean up data
            let authorClean = author.replace(/[\[\]]/g, '');
            if (!authors.includes(authorClean)) {
              authors.push(authorClean)
            }
          }
        )}

        if (metadata.field == 'plaats_van_uitgave') {
          metadata.value.forEach(function(plaatsVanUitgave) {
             // clean up data
             let plaatsClean = plaatsVanUitgave.replace(/[\[\]]/g, '');
            if (!plaatsVanUitgaves.includes(plaatsClean)){
              plaatsVanUitgaves.push(plaatsClean)
            }
          })
        }
      })
    })
    
    // Sorteer daarna eventueel de years array
    years.sort()
    authors.sort()
    plaatsVanUitgaves.sort()

    response.render('index.liquid', { booksOverview: apiOverviewBooksJSON, years: years, authors: authors, plaatsVanUitgaves: plaatsVanUitgaves })
  } catch (error) {
    console.error('Fout bij ophalen of verwerken van data:', error)
    response.status(500).send('Er is een fout opgetreden bij het laden van de pagina.')
  }
})


app.get('/detail/:id', async function (request, response) {
  const id = request.params.id;

  try {
    const apiDetailBooks = await fetch(`https://efm-student-case-proxy-api.vercel.app/detail/${id}`);

    if (!apiDetailBooks.ok) {
      return response.status(404).render('404');
    }

    const apiDetailBooksJSON = await apiDetailBooks.json();

    response.render('detail.liquid', { booksDetail: apiDetailBooksJSON });

  } catch (error) {
    console.error("Fout bij ophalen detaildata:", error);
    response.status(404).render('404');
  }
});

  app.use((req, res) => {
    res.status(404).send('Pagina niet gevonden');
  });


app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
  })