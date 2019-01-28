exports.pool = (user, host, database, password, port) => {
  const cb = {
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
    ssl: true
  };
  let pool = require("pg-promise")();
  return pool(cb);
};
