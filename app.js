const express = require('express')
const morgan = require('morgan');
const rateLimit = require('express-rate-limit')
const helmet = require('helmet');
// const mongoSanitize = require('express-mongo-santize')
const xss = require('xss-clean')
const hpp = require('hpp');

const AppError = require('./utils/appError')
const ErrorHandler = require('./controllers/errorController');
// const Endpoints = require('./utils/endpoints')
const userRouter = require('./routes/userRoutes')
const patientRouter = require('./routes/patientRoutes');
const registrationRouter = require('./routes/registrationRoutes');
const adminRouter = require('./routes/adminRoutes');
const medicineRouter = require('./routes/medicineRoutes')
const doctorRouter = require('./routes/doctorRoutes');
const receptionistRouter = require('./routes/receptionistRoutes')

const app = express();

// MIDLLWARES
app.use(helmet())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, Please try again in an hour'
})
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NOSQL query injection
// app.use(mongoSanitize());

// Data sanitization XSS
app.use(xss())

// prevent parameter pollution
app.use(hpp())

// Serving static files
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

// Routes 
app.use("/api/v1/user", userRouter);
app.use("/api/v1/patient", patientRouter);
app.use('/api/v1/registration', registrationRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/medicine', medicineRouter);
app.use('/api/v1/doctor', doctorRouter);
app.use('/api/v1/receptionist', receptionistRouter);



// Handling unhandled routes 
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`))
});

app.use(ErrorHandler);
// app.use(Endpoints)

module.exports = app;