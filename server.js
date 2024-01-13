const mongoose = require('mongoose');
const dotenv = require('dotenv')
const app = require('./app');


// Loadind environmental variables
dotenv.config({ path: './config.env' })


// Connect to mongoDB
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {}).then(() => console.log('DB connection succesful'));




// Server
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`App running on ${port}`);
})

