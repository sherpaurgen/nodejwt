const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('../validation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// localhost:3000/api/user/login
router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    const { error } = registerValidation(req.body)
    console.log("error->" + error)
    if (error) {
        return res.status(400).send(error);
    }
    //checking user already exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) { return res.status(400).send("Email already exist") }

    try {
        const savedUser = await user.save();
        res.send(savedUser)
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    //checking user in db
    console.log("inside login route")
    const user = await User.findOne({ email: req.body.email });
    if (!user) { return res.status(400).send("Email doesnt exist") }
    //check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) { return res.status(400).send("Invalid password") }

    //create-assign token
    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);

    res.header('auth-token', token).send(token);

});

module.exports = router;

