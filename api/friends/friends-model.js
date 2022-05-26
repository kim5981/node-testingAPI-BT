const db = require("../../data/dbConfig")

function getAllFriends(){
    return db("friends")
}

function getById(id){
    return db("friends").where("friend_id", id).first()
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