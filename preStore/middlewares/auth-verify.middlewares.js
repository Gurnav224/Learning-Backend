const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;



const authVerify = (req, res, next) => {
    console.log(req.headers)

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ errorMessage: 'Authorization token is not provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = { userId: decoded.userId };
        return next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ errorMessage: 'Unauthorized access, invalid token' });
    }
};

module.exports = { authVerify };
