const express = require('express')
const router = express.Router()
const knex = require('../db/knex.js')
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary')
const fs = require('fs')



router.get('/', (req, res) => {
  knex('sounds')
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
})

router.post('/', function(req, res) {
  var newSound = {}
  newSound['sound_title'] = req.body['sound_title']
  newSound['sound_type'] = req.body['sound_type']
  newSound['download_url'] = req.body['download_url']
  newSound['creator'] = req.body.creator
  console.log(req)
  knex('sounds')
    .insert(newSound)
    .then(() => {
      res.send("sound created")
    })
    .catch(err => {
      console.log("error posting sound: ", err);
      res.status(500).send(err)
    })
})

module.exports = router
