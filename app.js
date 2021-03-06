require('dotenv').load()
var express    = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var db = require('monk')(process.env.MONGOLAB_URI + '/cluster-app')
var climbs = db.get('climbs')

var app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


app.post('/climbing-markers', function(req, res) {
  climbs.insert(req.body, function(err, doc) {
    if (err) console.log(err)
    res.json(doc)
  })
})

app.get('/climbing-markers', function(req, res) {
  climbs.find({}, function(err, docs) {
    res.json(docs)
  })
})

app.post('/climbing-markers/delete', function(req, res) {
  climbs.findOne({}, {id: req.body.id}, function(err, doc) {
    if (doc === null) {
    } else {
      climbs.remove(doc)
    }
  })
})

app.put('/climbing-markers', function(req, res) {
  climbs.update({id: req.body.id}, req.body, function(err, doc) {
    if (err) console.log(err)
    else {
      res.json(doc)
    }
  })
})

app.listen(process.env.PORT || 3000)
