import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const BirthForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState(0)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{
      query: ALL_AUTHORS
    }]}
  )

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
          <label>
            name
            <input
              value={name}
              onChange={({ target }) => {setName(target.value)}}
            />
          </label>
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