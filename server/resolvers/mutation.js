const { GraphQLError } = require("graphql")
const Author = require("../models/author")
const Book = require("../models/book")
const User = require("../models/user")
const jwt = require('jsonwebtoken')

const checkAuthorization = (currentUser) => {
  if(!currentUser) {
    throw new GraphQLError('Unauthorized access. Please log in.', {
      extensions: {
        code: 'UNAUTHORIZED_ACCESS',
      }
    })
  }  
}

const mutation = {
  addBook: async (root, args, { currentUser }) => {
    checkAuthorization(currentUser)
    
    let author = await Author.findOne({ name: args.author })

    if(!author) {
      const authorBeforeSave = new Author({
        name: args.author,
        bookCount: 1,
      })
      
      try {
        author = await authorBeforeSave.save()
      } catch (error) {
        throw new GraphQLError('Create the author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          }
        })
      }
      
    } else {

      try {
        author.bookCount++;
        await author.save()
      } catch (error) {
        throw new GraphQLError('Change the auther failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          }
        })
      }
    }
    const bookBeforeSave = { ...args, author: author._id }
    let savedBook

    try {
      const bookRequest = new Book(bookBeforeSave)
      savedBook = await bookRequest.save()
    } catch (error) {
      throw new GraphQLError('Create the book failed', {
        extensions: {
          code: 'BAD_USER_INPUT',
          error,
        }
      })
    }
    return savedBook.populate('author')
  },
  editAuthor: async (root, args, { currentUser }) => {
    const author = await Author.findOne({ name: args.name })
    checkAuthorization(currentUser)

    if(!author) {
      return null
    }
    author.born = args.setBornTo

    try {
      return await author.save()
    } catch (error) {
      throw new GraphQLError('Change the book failed', {
        extensions: {
          code: 'BAD_USER_INPUT',
          error,
        }
      })
    }
  },
  createUser: (root, { username, favoriteGenre }) => {
    const user = new User({ username, favoriteGenre });
    
    return user.save()
      .catch(error => {
        throw new GraphQLError('Create the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      })
  },

  login: async (root, { username, password }) => {
    const user = await User.findOne({ username })

    if(!user || password !== 'secret') {
      throw new GraphQLError('wrong credentials', {
        extensions: {
          code: 'BAD_USER_INPUT'
        }
      })
    }

    const userForToken = {
      username,
      id: user._id,
    }
    return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
  }
}

module.exports = mutation