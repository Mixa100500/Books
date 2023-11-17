import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Link, Route, Router, Routes } from 'react-router-dom'

const App = () => {

  return (
    <>
      <div>
        <div>
          <Link to={'/'} >books</Link>
          <Link to={'/authors'} >authors</Link>
          <Link to={'/newBook'} >add book</Link>
        </div>

        <Routes >
          <Route path='/' element={<Books />} />
          <Route path='/authors' element={<Authors />} />
          <Route path='/new/books' element={<NewBook />} />
        </Routes>
      </div>
    </>
  )
}

export default App
