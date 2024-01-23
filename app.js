const express = require('express')
const morgan = require('morgan');

const AppError = require('./utils/appError')
const ErrorHandler = require('./controllers/errorController');
const Endpoints = require('./utils/endpoints')
const userRouter = require('./routes/userRoutes')

const app = express();

// MIDLLWARES
if (process.env.NODE_ENV === 'develpment') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.headers);
    next();
})

// Routes 
app.use("/api/v1/user", userRouter);



// Handling unhandled routes 
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`))
});

app.use(ErrorHandler);
// app.use(Endpoints)

module.exports = app;