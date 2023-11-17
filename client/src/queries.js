import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
    allBooks {
      published
      author
      title
      genres
      id
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      bookCount
      born
    }
  }
`