const crypto = require("crypto");

const primarykey = crypto.randomBytes(32).toString("hex")
const secondarykey = crypto.randomBytes(32).toString("hex")

console.table({primarykey,secondarykey});