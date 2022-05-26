const db = require("../../data/dbConfig")

function getAllFriends(){
    return db("friends")
}

function getById(id){
    return db("friends").where("friend_id", id).first()
}

async function addFriend(friend){
    return db("friends").insert(friend).then(([id]) => getById(id)) 
    // returns the added friend
}

async function updateFriend(id, changes){
    return db("friends").update(changes).where("friend_id", id).then(() => getById(id)) 
}

async function removeFriend(id){
    let result = await getById(id)
    await db("friends").delete().where("friend_id", id)
    return result
}

module.exports = {
    getAllFriends,
    getById,
    addFriend,
    updateFriend,
    removeFriend
}