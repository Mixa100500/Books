import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS, ME } from '../../queries'
import { TableBooks } from '../TableBooks'

const Recommend = (props) => {
  const queryMe = useQuery(ME)
  const [favoriteGenre, setFavoriteGenre] = useState(null)

  const queryBooks = useQuery(ALL_BOOKS, {
    variables: {
      genreToSearch: favoriteGenre,
    },
  })

  useEffect(() => {
    
    if(!favoriteGenre && queryMe.data) {
      const genre = queryMe.data.me.favoriteGenre
      setFavoriteGenre(genre)
    }
  }, [queryBooks.data])

  if (queryBooks.loading || queryMe.loading) {
    return <div>loading...</div>;
  }

  if (queryBooks.error || queryMe.error) {
    return <div>error</div>;
  }
  const genre = queryMe.data.me.favoriteGenre
  const allBooks = queryBooks.data.allBooks
  
  if (allBooks.length === 0) {
    return <div>No books in your favorite <strong>genre</strong></div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>books your favorite genre <strong>{genre}</strong></div>
      <TableBooks books={allBooks} />
    </div>
  )
}

export default Recommend;
