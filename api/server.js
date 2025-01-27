const express = require("express")
const server = express()

const Friends = require("./friends/friends-model")

server.use(express.json())

server.get("/", (req, res) => {
    res.status(200).json({ message: "server connected" })
})

server.get("/friends", (req, res, next) => {
    Friends.getAllFriends()
    .then(friends => {
        res.status(200).json(friends)
    })
})

server.get("/friends/:id", async (req, res, next) => {
    const friend = await Friends.getById(req.params.id)
    friend == null 
    ? res.status(404).json({ message: "friend not found" })
    : res.json(friend)
})

server.post("/friends", async (req, res) => {
    try{
        const result = await Friends.insert(req.body);
        req.body.name?.constructor !== String
        ? res.status(400).json({ message: 'missing name' })
        :  res.status(201).json(result)
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})

server.delete("/friends/:id", (req, res, next) => {
    res.json("deleting")
})

server.put("/friends/:id", (req, res, next) => {
    res.json("updating!")
})


server.get((error, req, res, next) => {
    res.status(error.status || 500).json({
        customMessage: "something went wrong :(",
        message: error.message,
        stack: error.stack
    })
})

module.exports = server

