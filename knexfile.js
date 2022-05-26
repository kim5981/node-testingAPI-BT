const common={
    client: "sqlite3",
    useNullAsDefault: true,
    migrations: {

    },
    seeds: {

    }
}

module.exports = {
    development: {

    },
    testing: {
        ...common,
        connection: {
            filename: ,
        },
    },
    production: {

    }
}