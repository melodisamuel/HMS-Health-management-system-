const AppError = require('../utils/appError')

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new AppError(message, 400)
}

const handleDupFieldsDB = err => {
    const value = err.err.msg.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value);

    const message = `Duplicate field value: ${value} Please use another value!`;
    return new AppError(message, 400)
}

const handleValidationErrorDb = err => {
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Inavlid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
}
const sendErroDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

const sendErroProd = (err, res) => {
    // trusted isOpearational error
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        }) 

        // programming dont want to leak details to client
    } else {
        // log the error
        console.error('ERROR ', err);
        res.status(500).json({
            status: 'error',
            messsage: 'Something went very wrong!'
        })
    }
   
}



module.exports = (err, req, res, next) => {
    
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'

    if (process.env.NODE_ENV == 'development') {
        sendErroDev(err, res)
  
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err }

        if (error.name === 'CastError') error = handleCastErrorDB(error)
        if (error.code === 11000) error = handleDupFieldsDB(error);
        if(error.name === 'ValidationError') error = handleValidationErrorDb

    
        sendErroProd(err, res)
    } 
}