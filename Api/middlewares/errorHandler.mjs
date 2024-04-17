function errorHandlerMiddleware(err, req, res, next) {
    console.error(err.stack); 
  
    let statusCode = 500; 
    let errorMessage = 'Server Error'; 
  
    if (err.name === 'ValidationError') {
      statusCode = 400;
      errorMessage = 'Validation failed .';
    } else if (err.name === 'UnauthorizedError') {
      statusCode = 401;
      errorMessage = 'Invalid or missing authorization check the auth midlleware.';
    } else if (err.name === 'NotFoundError') {
      statusCode = 404;
      errorMessage = 'the ressource unable to be found';
    } else if (err.name === 'ToomanyRequestsError') {
        statusCode = 429;
        errorMessage = 'Too many requests try to change the rate limit wl the user origin';
      }
    else if (err.code) { 
      statusCode = err.code;
    }
  
    const errorResponse = {
      status: statusCode,
      message: errorMessage || err.message, 
    };
  
    if (process.env.NODE_ENV !== 'production') {
      errorResponse.error = err; 
    }
  
    res.status(statusCode).json(errorResponse);
  }
  
  export default errorHandlerMiddleware;
  