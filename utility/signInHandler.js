const jwt = require('jsonwebtoken');

const signInHandler = (userDOC, res) => {
    const user = getUser(userDOC);
    const expiresIn = new Date(new Date().getTime() + 3600000).toISOString();
    const token = jwt.sign(user, process.env.JWT_SECRETE_KEY, { expiresIn: "1h" });
    res.status(200).json({ ...user, expiresIn, token });
}

module.exports = signInHandler;