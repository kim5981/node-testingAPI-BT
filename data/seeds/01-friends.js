exports.seed = function(knex, Promise){
    return knex("friends")
    .truncate()
    .then(function(){
        return knex("friends").insert([
            { first_name: "Haruhi", last_name: "Fujioka" },
            { first_name: "Tamaki", last_name: "Suoh" },
            { first_name: "Kyoya", last_name: "Ootori" },
            { first_name: "Kaoru", last_name: "Hitachiin" },
            { first_name: "Hikaru", last_name: "Hitachiin" },
            { first_name: "Mitsukuni", last_name: "Haninozuka" },
            { first_name: "Takashi", last_name: "Morinozuka" },
        ])
    })
}