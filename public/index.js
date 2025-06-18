const inputSearchbar = document.getElementById('search');
const allBooks = document.querySelectorAll('.books-container');

inputSearchbar.addEventListener('input', () => {
  const filter = inputSearchbar.value.toLowerCase();
  allBooks.forEach(book => {
    const title = book.querySelector('.text-info.titel').textContent.toLowerCase();
    if (title.includes(filter)) {
      book.style.display = '';
    } else {
      book.style.display = 'none';
    }
  });
});
