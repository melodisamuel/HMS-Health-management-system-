const express = require('express')
const morgan = require('morgan');
const rateLimit = require('express-rate-limit')

const AppError = require('./utils/appError')
const ErrorHandler = require('./controllers/errorController');
const Endpoints = require('./utils/endpoints')
const userRouter = require('./routes/userRoutes')
const patientRouter = require('./routes/patientRoutes');
const doctorRouter = require('./routes/doctorRoutes');

const app = express();

// MIDLLWARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, Please try again in an hour'
})
app.use('/api', limiter);

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.headers);
    next();
})

// Routes 
app.use("/api/v1/user", userRouter);
app.use("/api/v1/patient", patientRouter)
app.use('/api/v1/doctor', doctorRouter)



// Handling unhandled routes 
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`))
});

app.use(ErrorHandler);
// app.use(Endpoints)

module.exports = app;