require('dotenv').load()
var express    = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var db = require('monk')(process.env.MONGOLAB_URI + '/cluster-app')
var climbs = db.get('climbingLocations')
var climbInfo = db.get('climbInfo')


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
    console.log('docs', docs)
    res.json(docs)
  })
})

app.put('/climbing-markers', function(req, res) {
  console.log('req', req.body._id)
  climbs.update({_id: req.body._id}, req.body, function(err, doc) {
    if (err) console.log(err)
    else {
      console.log('doc', doc)
      res.json(doc)
    }
  })
})

app.delete('/climbing-markers', function(req, res) {
  climbs.find({}, function(err, docs) {
    console.log('docs', docs)
    res.json(docs)
  })
})


app.put('/articles', function(req, res) {
  console.log(req.body)
  articles.findOne({id: req.body.id}, function(err, doc) {
    console.log(doc)
    if (req.body.upvote) {
      doc.votes ++
    } else {
      doc.votes --
    }
    articles.findAndModify({_id: doc._id}, doc, function(err, docs) {
      console.log('docs', doc)
      res.json(doc)
    })
  })
})

// app.get('/climbing-info', function(req, res) {
//   console.log('get', req.body)
//   climbs.find({}, function(err, docs) {
//     var info = docs.map(function(el) {
//       var obj = {}
//       obj.properties = el.properties
//       obj._id = el._id
//       return obj
//     })
//     console.log('info', info)
//     console.log(docs)
//     res.json(info)
//   })
// })

// app.post('/climbing-info', function(req, res) {
//   climbInfo.findOne(req.body, function(err, doc) {
//     console.log('doc', doc)
//     res.json(doc)
//   })
// })


//
// app.post('/articles', function(req, res) {
//   console.log(req.body)
//   articles.insert(req.body, function(err, doc){
//     articles.find({}, function(err, docs) {
//       if (err) res.end('404')
//       res.json(docs)
//     })
//   })
// })
//
// app.put('/articles', function(req, res) {
//   console.log(req.body)
//   articles.findOne({id: req.body.id}, function(err, doc) {
//     console.log(doc)
//     if (req.body.upvote) {
//       doc.votes ++
//     } else {
//       doc.votes --
//     }
//     articles.findAndModify({_id: doc._id}, doc, function(err, docs) {
//       console.log('docs', doc)
//       res.json(doc)
//     })
//   })
// })
//
// app.put('/comments', function(req, res) {
//   console.log(req.body)
//   articles.findOne({id: req.body.id}, function(err, doc) {
//     doc.comments.push(req.body.comments)
//     articles.findAndModify({_id: doc._id}, doc, function(err, docs) {
//       console.log('docs', doc)
//       res.json(doc)
//     })
//   })
// })

app.listen(process.env.PORT || 3000)
