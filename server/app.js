require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/index')
const errorhandler = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)
app.use(errorhandler)


app.listen(port, () => console.log(`Server running in  at http://localhost:${port}`));
