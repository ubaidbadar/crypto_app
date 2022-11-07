const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const auth = require('./routes/auth');
const wallet = require('./routes/wallet');
const { errorHandler } = require('./controllers/errorHandler');

app.use(cors(), express.json(), express.urlencoded({ extended: true }));

app.use('/wallet', wallet)
app.use('/', auth);

app.use(errorHandler);


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        const port = process.env.PORT || 5000;
        const server = app.listen(port, () => console.log(`Server is running on ${port}`));
    })
    .catch(err => console.log(err))