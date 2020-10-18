const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('../validation')



// localhost:3000/api/user/login
router.post('/register', async (req, res) => {

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
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
module.exports = router;

