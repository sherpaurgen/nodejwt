const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const app = express()
app.use(express.json())

const posts = [
    { username: 'kyle', title: 'post1' },
    { username: 'mystic', title: 'post2' },
]
app.listen(3000)

app.get('/posts', (req, res) => {
    res.json(posts)
})

app.get('/login', (req, res) => {
    //Authenticate user
    console.log(req.body.username)
    const username = req.body.username
    const user = { name: username }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
})