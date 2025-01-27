const db = require("../data/dbConfig")
const Friends = require("./friends/friends-model")
const server = require("./server")
const supertest = require("supertest")

beforeAll( async () => {
    await db.migrate.rollback()
    await db.migrate.latest
})

beforeEach(async () => {
    await db("friends").truncate()
    await db.seed.run()
})

afterAll( async () => {
    await db.destroy()
})

describe("testing friends model functions", () => {

    test("getAllFriends", async () => {
        const result = await Friends.getAllFriends()
        expect(result).toHaveLength(7)
        expect(result).toMatchObject([
            { first_name: "Haruhi", last_name: "Fujioka" },
            { first_name: "Tamaki", last_name: "Suoh" },
            { first_name: "Kyoya", last_name: "Ootori" },
            { first_name: "Kaoru", last_name: "Hitachiin" },
            { first_name: "Hikaru", last_name: "Hitachiin" },
            { first_name: "Mitsukuni", last_name: "Haninozuka" },
            { first_name: "Takashi", last_name: "Morinozuka" },
        ])
    })


    test("getById", async () => {
        let result
        result = await Friends.getById(1)
        // exists w/i database
        expect(result).toBeDefined()

        // returns object from id
        expect(result).toMatchObject({ first_name: "Haruhi", last_name: "Fujioka" })

        // calling a non-existent id doesn't work
        result = await Friends.getById(1000000)
        expect(result).not.toBeDefined()
    })

    test("addFriend", async () => {
        let result
        result = await Friends.addFriend({ first_name: "Renge", last_name: "Houshakuji" })
        //adding a friend returns the object you just added
        expect(result).toMatchObject({ friend_id: 8, first_name: "Renge", last_name: "Houshakuji" })
        
        // verify the db now has an additional item w/i it
        result = await Friends.getAllFriends()
        expect(result).toHaveLength(8)
    })

    test("updateFriend", async () => {
        let result 
        result = await Friends.updateFriend(1, {  first_name: "Renge", last_name: "Houshakuji"  })
        //it returns the proper obj
        expect(result).toMatchObject({ friend_id: 1, first_name: "Renge", last_name: "Houshakuji" })

        // that id was actually updated
        result = await Friends.getById(1)
        expect(result).toHaveProperty("first_name", "Renge")

        // cannot update a non-existent friend
        result = await Friends.updateFriend(9999999999, { first_name: "kim", last_name: "r" })
        expect(result).not.toBeDefined()
    })

    test("removeFriend", async () => {
        let result 
        result = await Friends.removeFriend(7)
        //returns the removed friend
        expect(result).toMatchObject({ friend_id: 7, first_name: "Takashi", last_name: "Morinozuka" })

        //friend by that ID to no longer be defined
        result = await Friends.getById(7)
        expect(result).not.toBeDefined()

        //friend db to have one less in db
        result = await Friends.getAllFriends()
        expect(result).toHaveLength(6)

        // cannot remove a non-existent friend
        result = await Friends.removeFriend(9999999999999)
        expect(result).not.toBeDefined()
    })
})

describe("successful HTTP requests", () => {

    test("server is connected", async () => {
        let response = await supertest(server).get("/")
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: "server connected" })
    })

    test("GET /friends", async () => {
        let response = await supertest(server).get("/friends")
        expect(response.status).toBe(200)
        expect(response.body).toMatchObject([
            { first_name: "Haruhi", last_name: "Fujioka" },
            { first_name: "Tamaki", last_name: "Suoh" },
            { first_name: "Kyoya", last_name: "Ootori" },
            { first_name: "Kaoru", last_name: "Hitachiin" },
            { first_name: "Hikaru", last_name: "Hitachiin" },
            { first_name: "Mitsukuni", last_name: "Haninozuka" },
            { first_name: "Takashi", last_name: "Morinozuka" },
        ])
    })

    test("GET '/friends/:friend_id", async () => {
        let response = await supertest(server).get("/friends/2")
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("first_name", "Tamaki")

        // cannot GET non-existent friend
        response = await supertest(server).get("/friends/9999999999")
        expect(response.status).toBe(404)
    })

    test("POST /friends", async () => {
        let response 
        response = await supertest(server)
            .post("/friends")
            .send({ first_name: "kim", last_name: "r" })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("first_name", "kim")
        response = await supertest(server).post('/friends').send({});
        expect(response.status).toBe(400)
    })

    test("DELETE /friends/:friend_id", async () => {
        
    })

    test("PUT /friends/:friend_id", async () => {
        
    })
})