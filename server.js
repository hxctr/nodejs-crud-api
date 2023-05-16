const express = require('express');
const app = express();
const port = 9000;

app.set('port', process.env.PORT || 9000)


app.get('/', (req, res) => {
    res.send('Hello world')
})












app.listen(9000, () => {
    console.log(`Server running on ${port} port`)
})