const { BadRequestError } = require('./errors');

function handleError(res, error) {
    if (error instanceof BadRequestError) {
        res.status(400).json({ message: error.message });
    } else {
        res.status(500).json({ message: 'Unhandled error on server' });
    }
}

module.exports = { handleError };