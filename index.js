
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(require('./middleware/headers'));

app.use('/api', require('./controllers/yelp_controller'));

app.listen(3003, () => console.log('*** server app listening on 3003 ***'));