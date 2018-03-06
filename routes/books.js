const express = require('express');
const router = express.Router();
const { getBooks, insertBook, deleteBook, updateBook } = require('../controllers/book.controller');

/* GET users listing. */
router.get('/', getBooks);
router.post('/', insertBook);
router.delete('/:isbn', deleteBook);
router.put('/:isbn', updateBook);

module.exports = router;
