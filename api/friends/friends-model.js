const db = require("../../data/dbConfig")

function getAllFriends(){
    return db("friends")
}

function getById(id){
    return
}

function addFriend(friend){
    return
}

function updateFriend(id, changes){
    return
}

function removeFriend(id){
    return
}

module.exports = {
    getAllFriends,
    getById,
    addFriend,
    updateFriend,
    removeFriend
}