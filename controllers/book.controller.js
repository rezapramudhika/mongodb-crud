const models = require('../models/book.model');

module.exports = {
    getBooks: (req, res) => {
        models.getBooks
            .then(resolve => {
                res.status(resolve.status).json({
                    message: resolve.message,
                    data: resolve.data
                })
            })
            .catch(reject => {
                return res.status(reject.status).json({
                    message: reject.message,
                })
            })
    },
    insertBook: (req, res) => {
        let requestData = {
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            stock: req.body.stock
        }
        models.insertBook(requestData)
            .then(resolve => {
                res.status(resolve.status).json({
                    message: resolve.message,
                })
            })
            .catch(reject => {
                return res.status(reject.status).json({
                    message: reject.message,
                })
            })
    },
    deleteBook: (req, res) => {
        let requestData = {
            isbn: req.params.isbn,
        }
        models.deleteBook(requestData)
            .then(resolve => {
                res.status(resolve.status).json({
                    message: resolve.message,
                })
            })
            .catch(reject => {
                return res.status(reject.status).json({
                    message: reject.message,
                })
            })
    },
    updateBook: (req, res) => {
        let requestData = {
            isbn: req.params.isbn,
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            stock: req.body.stock
        }
        models.updateBook(requestData)
            .then(resolve => {
                res.status(resolve.status).json({
                    message: resolve.message,
                })
            })
            .catch(reject => {
                return res.status(reject.status).json({
                    message: reject.message,
                })
            })
    }
}