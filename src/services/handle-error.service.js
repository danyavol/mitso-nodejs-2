const { RequestError } = require('./errors');

function handleError(res, error) {
    if (error instanceof RequestError) {
        res.status(error.status).json({ message: error.message });
    } else {
        res.status(500).json({ message: 'Unhandled error on server' });
    }
}

module.exports = { handleError };