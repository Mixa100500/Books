import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState(null)
  const client = useApolloClient()
  const navigate = useNavigate()

  const notify = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/login')
  }

  return (
    <>
      <div>
        <Notification message={message}/>
        <div>
          <Link to={'/'} >books</Link>{' '}
          <Link to={'/authors'} >authors</Link>{' '}
          {token ? <>
            <Link to={'/new/book'} >add book</Link>
            <button onClick={logout}>logout</button>
          </> :
          <Link to={'/login'} >login</Link>
          }
        </div>

        <Routes >
          <Route path='/' element={<Books />} />
          <Route path='/authors' element={<Authors />} />
          <Route path='/new/book' element={<NewBook />} />
          <Route path='/login' element={
            <LoginForm setError={notify} setToken={setToken}/>
          } />
        </Routes>
      </div>
    </>
  )
}

export default App
