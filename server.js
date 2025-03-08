const express = require("express")
const { default: rateLimit } = require("express-rate-limit")
const app = express()

const PORT = 4000

const protectedLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many requests sir 😮! try again later!"
})

const adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Admin limit reached 😱! try again later!"
})

app.get("/", (req, res) => {
    res.send("Welcome to ze rate limiter project!")
})

//public: No rate limiting!
app.get("/public", (req, res) => {
    res.send("Welcome to ze public endpoint!! No limits here 🦅")
})

//protected: Rate-limited!
app.get("/protected", protectedLimiter, (req, res) => {
    res.send("Zis is protected endpoint. your good - for now!")
})

//admin: Strictest rate limits!
app.get("/admin", adminLimiter, (req, res) => {
    res.send("Zis is admin endpoint. you haven't hit the limit - yet!")
})


app.listen(PORT, () => {
    console.log(`server is indeed running on localhost(${PORT})`)
})