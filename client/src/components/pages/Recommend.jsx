import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS, ME } from '../../queries';
import { filterByGenre } from '../../utils/filterByGenre';
import { TableBooks } from '../TableBooks';

const Recommend = (props) => {
  const queryBooks = useQuery(ALL_BOOKS)
  const queryMe = useQuery(ME)
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState([])

  useEffect(() => {
    
    if(!favoriteGenre && queryMe.data) {
      const genre = queryMe.data.me.favoriteGenre
      setFavoriteGenre(genre)
      filterByGenre(queryBooks, genre, setFilteredBooks)
    }
  }, [queryBooks.data])

  if (queryBooks.loading || queryMe.loading) {
    return <div>loading...</div>;
  }

  if (queryBooks.error || queryMe.error) {
    return <div>error</div>;
  }
  const genre = queryMe.data.me.favoriteGenre

  if (filteredBooks.length === 0) {
    return <div>No books in your favorite <strong>genre</strong></div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>books your favorite genre <strong>{genre}</strong></div>
      <TableBooks books={filteredBooks} />
    </div>
  )
}

export default Recommend;
