const inputSearchbar = document.getElementById('search'); // selecteert de input met id search
const allBooks = document.querySelectorAll('.books-container'); // selecteert de boeken met class books-container

inputSearchbar.addEventListener('input', () => { //luistert naar de input als je iets typt
  const filter = inputSearchbar.value.toLowerCase(); //maakt van alle tekst die je invoert kleine letters
  allBooks.forEach(book => { //loop door alle boeken 
    const title = book.querySelector('.text-info.titel').textContent.toLowerCase(); //pakt de titel met de class text-info.titel in de boeken en wordt ook in kleine letters omgezet
    if (title.includes(filter)) { //als de zoekterm overeen komt met de titel laat het boek zien anders verberg het boek
      book.style.display = ''; //laat zien
    } else {
      book.style.display = 'none'; //verberg
    }
  });
});


window.addEventListener("mousemove", (e) => {  //luister naar de muisbeweging over de hele pagina en wordt uitgevoerd al je muisbeweegt
  gsap.to(".cursor", { // wordt gekeken waar de muis is zodat de .cursor daar ook is 
    x: e.clientX,  
    y: e.clientY
  });
  if (e.target.nodeName == "A" || e.target.closest('a')) { // als de muis over de een a gaat dan wordt de .cursor groter // check ook of de en ook een a in een ander element zit
    gsap.to(".cursor", {
      scale: 1
    });
  } else {
    gsap.to(".cursor", { // als de muis niet over een a gaat dan verdwijnt de .cursor 
      scale: 0
    });
  }
});
