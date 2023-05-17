const express = require('express');
const app = express();
const port = 9000;
const mysql = require('mysql');
const myconn = require('express-myconnection');
const routes = require('./routes')


app.set('port', process.env.PORT || 9000);
//npm init -y -> node modules
//npm install express

//npm install mysql express-myconnection
//npm install nodemon --save-dev ->npm run start






//---------------- middlewares -----------------
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',//
    database: 'library'
}
app.use(myconn(mysql, dbOptions, 'single'));
app.use(express.json()) //not show indefined when doing a request
//-------------- routes ------------------------- 


app.get('/', (req, res) => {
    res.send('Hello world')
})

app.use('/api', routes);


//----------------- server running ---------------

app.listen(9000, () => {
    console.log(`Server running on ${port} port`)
})