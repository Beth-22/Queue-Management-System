// Log requests to the console
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
};

export default logger;
