const jwt = require('jsonwebtoken');

function validateToken(token, userType) {
    try {
        const JWT_SECRET = userType === 'admin' ? process.env.JWT_SECRET_ADMIN : process.env.JWT_SECRET_USER;
        
        const tokenData = jwt.verify(token, JWT_SECRET);

        return tokenData;
    } catch (err) {
        return false;
    }
}

module.exports = {
    validateToken
}