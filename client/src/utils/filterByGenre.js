export const filterByGenre = (result, genre, setFiltredBooks) => {
  if (result.data && genre) {
    const books = result.data.allBooks.filter((book) => 
      book.genres.includes(genre)
    )
    setFiltredBooks(books)
    return
  }
  setFiltredBooks(result.data?.allBooks)
}