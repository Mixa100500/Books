import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const BirthForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState(0)
  const result = useQuery(ALL_AUTHORS)
  
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          allAuthors(existingAuthors = []) {
            const newAuthors = existingAuthors.map(author => {
              if (author.name === data.editAuthor.name) {
                return {
                  ...author,
                  born: data.editAuthor.born
                }
              } else {
                return author
              }
            })
            return newAuthors
          },
          allBooks(existingBooks = []) {
            return existingBooks.map(book => {
              if (book.author.name === data.editAuthor.name) {
                return {
                  ...book,
                  author: {
                    ...book.author,
                    born: data.editAuthor.born
                  }
                }
              } else {
                return book
              }
            })
          }
        }
      })
    }
  })
  

  if(result.loading) {
    return <div>loading...</div>
  }

  if(result.error) {
    return <div>error</div>
  }

  const authors = result.data.allAuthors
  const submit = (e) => {
    e.preventDefault()

    editAuthor({ variables: {
      name,
      setBornTo: +born
    }})
    setName('')
    setBorn(0)
  }

  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
            {authors.map(a => 
              <option
                value={a.name}
                key={a.name}
              >
                {a.name}
              </option>
            )}
          </select>
        </div>
        <div>
          <label>
            born
            <input
              value={born}
              onChange={({ target }) => {setBorn(target.value)}}
            />
          </label>
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  )
}

export default BirthForm