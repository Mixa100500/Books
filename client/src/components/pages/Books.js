import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../../queries"
import { useEffect, useMemo, useState } from "react";
import { filterByGenre } from "../../utils/filterByGenre";
import { TableBooks } from "../TableBooks";

const Books = () => {
  const result = useQuery(ALL_BOOKS);
  const [chosenGenre, setChosenGenre] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState(null);
  const [genres, setGenres] = useState([])
  let books;

  useEffect(() => {
    if(books) {
      let allGenres = new Set();

      books.forEach((book) => {
        for (let genre of book.genres) {
          allGenres.add(genre);
        }
      });
      allGenres = Array.from(allGenres.keys());
      setGenres(allGenres)
    }
  }, [result.data])

  useMemo(() => {
    filterByGenre(result, chosenGenre, setFilteredBooks)
  }, [chosenGenre, result.data]);

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (result.error) {
    return <div>error</div>;
  }

  books = filteredBooks || result.data.allBooks;
  
  return (
    <div>
      <h2>books</h2>
      <TableBooks books={books} />
      <div>
        {genres.map(genre => <button key={genre} onClick={() => setChosenGenre(genre)}>
          {genre}
        </button>)}
        <button onClick={() => setChosenGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
