module.exports = {
  e : {
    99 : "Server is too busy to process your request",
    100 : "Invalid token",
    101 : "Bad method",
    102 : "Malformed token",
    103 : "You do not have the right to do this",
  },
  db : {
    host : "localhost",
    logging : false,
    pool : {
      max: 25,
      min: 0,
      idle: 10000
    }
  }
};
