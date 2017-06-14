const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cloudUpload = require('./routes/cloudUpload.js')

require('dotenv').config()
const PORT = process.env.PORT || 5280
const path = require('path')

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')))

app.use('/cloudUpload', cloudUpload)


app.listen(PORT, function() {
  console.log("Server listening on port "+PORT+".")
})
