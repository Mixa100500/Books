import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../../queries"
import { useEffect, useState } from "react";
import { TableBooks } from "../TableBooks";

const Books = () => {
  const [chosenGenre, setChosenGenre] = useState(null);
  const [genres, setGenres] = useState([])
  let books;

  const result = useQuery(ALL_BOOKS, {
    variables: {
      genreToSearch: chosenGenre,
    },
  })

  useEffect(() => {
    if(books && genres.length === 0) {
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

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (result.error) {
    return <div>error</div>;
  }

  books = result.data.allBooks;
  console.log(books)
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
