const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';

module.exports = {
    getBooks: new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, client) {
            if (err) {
                let obj = {
                    status: 500,
                    message: 'Failed to connect to the database'
                }
                reject(obj);
            }
            const db = client.db('library');
            const col = db.collection('books');
            col.find({}).toArray(function (err, docs) {
                if (err) {
                    let obj = {
                        status: 500,
                        message: 'Failed to fetch data from database'
                    }
                    reject(obj);
                }
                let obj = {
                    status: 200,
                    message: 'Get books success',
                    data: docs
                }
                resolve(obj);
                client.close();
            });
        });
    }),
    insertBook: (requestData) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, function (err, client) {
                if (err) {
                    let obj = {
                        status: 500,
                        message: 'Failed to connect to the database'
                    }
                    reject(obj);
                }
                const db = client.db('library');
                db.collection('books').insertOne({
                    isbn: requestData.isbn,
                    title: requestData.title,
                    author: requestData.author,
                    category: requestData.category,
                    stock: requestData.stock
                }, function (err, r) {
                    if (err) {
                        let obj = {
                            status: 500,
                            message: 'Failed to insert data'
                        }
                        reject(obj);
                    }
                    let obj = {
                        status: 201,
                        message: 'Book inserted',
                    }
                    resolve(obj);
                    client.close();
                });
            });
        })
    },
    deleteBook: (requestData) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, function (err, client) {
                if (err) {
                    let obj = {
                        status: 500,
                        message: 'Failed to connect to the database'
                    }
                    reject(obj);
                }
                const db = client.db('library');
                const myquery = { isbn: requestData.isbn };
    
                db.collection("books").deleteOne(myquery, function (err, r) {
                    if (err) {
                        let obj = {
                            status: 500,
                            message: 'Failed to delete data'
                        }
                        reject(obj);
                    }
                    let obj = {
                        status: 200,
                        message: 'Book deleted',
                    }
                    resolve(obj);
                    client.close();
                });
            });
        });
    },
    updateBook: (requestData) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, function (err, client) {
                if (err) {
                    let obj = {
                        status: 500,
                        message: 'Failed to connect to the database'
                    }
                    reject(obj);
                }
                const db = client.db('library');
                var myquery = { isbn: requestData.isbn };
                var newvalues = {
                    $set: {
                        isbn: requestData.isbn,
                        title: requestData.title,
                        author: requestData.author,
                        category: requestData.category,
                        stock: requestData.stock
                    }
                };
                db.collection("books").updateOne(myquery, newvalues, function (err, r) {
                    if (err) {
                        let obj = {
                            status: 500,
                            message: 'Failed to update data'
                        }
                        reject(obj);
                    }
                    let obj = {
                        status: 200,
                        message: 'Book updated',
                    }
                    resolve(obj);
                    client.close();
                });
            });
        });
    }
}