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

})