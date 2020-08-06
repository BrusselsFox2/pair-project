require('dotenv').config()
const express = require("express")
const routers = require("./routers")
const errorHandler = require("./middlewares/errorHandler")
const cors = require("cors")

const app = express()
const port = 3000

app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(routers)

app.use(errorHandler)

app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} at http://localhost:${process.env.PORT}`));
