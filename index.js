const express = require("express")
const app = express()
const consign = require("consign")
require('dotenv').config()

PORT = 5000 || process.env.PORT

consign()
    .include("./config/middleware.js")
    .then("./api")
    .then("./config/validateTokenAdmin.js")
    .then("./config")
    .into(app)

app.listen(PORT, () => console.log(`Backend executando na porta ${PORT} d=====(￣▽￣*)b`))