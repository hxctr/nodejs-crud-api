const express = require('express');
const routes = express.Router();
//--------------------------------
routes.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err)
        } else {
            conn.query('SELECT * FROM books', (err, rows) => {
                if (err) {
                    return res.send(err)
                } else {
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
        } else {
            conn.query('INSERT INTO books set ?', [req.body], (err, rows) => {
                if (err) {
                    return res.send(err)
                } else {
                    res.status(200).json({ message: 'Successful request', data: [req.body] });

                    // res.send('book inserted')
                }
            })
        }
    })

})

routes.delete('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err);
        } else {
            conn.query('DELETE FROM books WHERE id = ?', [req.params.id], (err, results, fields) => {
                if (err) {
                    console.error('An error occurred while executing the query:', err);
                    res.sendStatus(500); // Error interno del servidor
                } else {
                    if (results.affectedRows === 0) {
                        res.sendStatus(404); // Recurso no encontrado
                    } else {
                        console.log('DELETE query was executed successfully');
                        console.log('Affected rows:', results.affectedRows);
                        res.sendStatus(204);//204 is when you do a successfull request of delete
                        //sendStatus, when you make a succesfull request of delete, This code is without body
                        //and with responses without body you use sendStatus
                    }
                }
            });
        }
    });
});



routes.put('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err);
        }else {
            conn.query('UPDATE books SET ? WHERE id = ?', [req.body, req.params.id], (err, results, fields) => {
                if (err) {
                    res.sendStatus(500);
                }else{
                    if (results.affectedRows === 0) {
                        res.sendStatus(404);    
                    }else {
                        
                        res.sendStatus(204)
                    }
                }
            })
        }
    })
})



//--------------------------------
module.exports = routes;