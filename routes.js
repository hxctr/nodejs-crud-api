const express = require('express');
const routes = express.Router();
//--------------------------------
routes.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err)
        }else {
            conn.query('SELECT * FROM books', (err, rows) => {
                if (err) {
                    return res.send(err)
                }else {
                    res.json(rows)
                }
            })
        }
    })
});


routes.post('/', (req, res) => {

    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err)
        }else {
            conn.query('INSERT INTO books set ?', [req.body], (err, rows) => {
                if (err) {
                    return res.send(err)
                }else {
                    res.send('book inserted')
                }
            })
        }   
    })
   
})




//--------------------------------
module.exports = routes;