require('dotenv').config()
let express = require('express')
let app = express()
let port = 3000
let router = require('./routes/index')
let errorhandler = require('./middleware/errorhandler')
let cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)
app.use(errorhandler)
app.listen(port, () =>{
    console.log(port, `listen to ${port}`)
})