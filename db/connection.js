const Pool = require("pg").Pool;
exports.pool = (user, host, database,password,port) => {
    let pool = new Pool({
        user: user,
        host: host,
        database: database,
        password: password,
        port: port
    });

    pool.on("connect", () => {
        console.log("connected to the db");
    });

    return pool;
};





