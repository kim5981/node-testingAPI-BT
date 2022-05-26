const express = require("express")
const server = express()

server.use(express.json())

server.get("/", (req, res) => {
    res.status(200).json({ message: "server connected" })
})


server.get((error, req, res, next) => {
    res.status(error.status || 500).json({
        customMessage: "something went wrong :(",
        message: error.message,
        stack: error.stack
    })
})

module.exports = server

