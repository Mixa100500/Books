import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('Practical Object-Oriented Design, An Agile Primer Using Ruby')
  const [author, setAuthor] = useState('Sandi Metz')
  const [published, setPublished] = useState(2012)
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState(['refactoring', 'design'])

  const [ createBook ] = useMutation(ADD_BOOK, {
    onError: (error) => {
      const message = error.graphQLErrors.map(e => e.message).join('/n')
      props.setError(message)
    },
    refetchQueries: [
      {
        query: ALL_BOOKS,
        variables: {
          genreToSearch: null,
        }
      }, {
        query: ALL_AUTHORS
      }]
  })

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables:
      {
        title,
        author,
        published: +published,
        genres 
      }
    })
    
    setTitle('')
    setPublished(0)
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook