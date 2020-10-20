const jwt = require('jsonwebtoken')

module.exports = function auth(req, res, next) {
    console.log(req.headers)
    //const token = req.headers['auth-token'];
    const token = req.header('auth-token')
    if (!token) return res.status(401).send('Access denied');

    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send(err)
    }

};

//https://stackoverflow.com/questions/60855411/req-header-vs-req-headers-in-express
// req.header('xx') is recommended way