const Author = require("../models/author");
const Book = require("../models/book");

const query = {
  bookCount: async () => Book.collection.countDocuments(),
  authorCount: async () => Author.collection.countDocuments(),

  allBooks: async (root, { author, genre }) => {
    let result 

    if(genre) {
      result = Book.find({ genres: genre })
    } else {
      result = Book.find({});
    }
    result = await result.populate('author');

    if(author) {
      // result = result.
      // result = result.filter(b => b.author === author)
    }
    return result;
  },
  allAuthors: async () => {
    return Author.find({})
  },
  me: async (root, args, context) => {
    return context.currentUser
  }
}

module.exports = query