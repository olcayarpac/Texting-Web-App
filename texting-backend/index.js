const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
var cors = require('cors');
var multer = require('multer');
var upload = multer();


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(
  express.urlencoded({
    extended: true
  }),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  cors({origin: '*'}),
  upload.array()
)

//connection to local db
const MongoClient = require('mongodb').MongoClient;
var urlToDB = "mongodb://localhost:27017";
const mongoClient = new MongoClient(urlToDB, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.json({ res: "res" });
})

app.post('/login', (req, res) => {

  MongoClient.connect(urlToDB, { useNewUrlParser: true, useUnifiedTopology: true },(err,db) => {
    var dbo = db.db("textingdb");

    dbo.collection("users", (err, coll) => {
      coll.findOne({
        $and: [
          { username: req.body.username },
          { password: req.body.password }
        ]
      }, (err, result) => {

        if (isEmptyObject(result)) {
          res.json({
            auth: 'NOT',
            info: 'Incorrect username or password'
          })
        }
    
        else {
          res.json({
            auth: "OK",
            userid: result.userid
          });
        }
    
        return db.close();
      });
    });
  });
  // TODO get just one field from mongodb
})


app.post('/getConversations', (req, res) => {
  

  MongoClient.connect(urlToDB, { useNewUrlParser: true, useUnifiedTopology: true },(err,db) => {
    var dbo = db.db("textingdb");
    dbo.collection("users", (err, coll) => {
      coll.findOne({
        userid: parseInt(req.body.userid),
        
      }, (err, result) => {

        res.json(result.messages);
        return db.close();

      });
    });
  });
})

app.post('/getMessages', (req, res) => {
  MongoClient.connect(urlToDB, { useNewUrlParser: true, useUnifiedTopology: true },(err,db) => {
    var dbo = db.db("textingdb");
    dbo.collection("conversations", (err, coll) => {
      coll.findOne({
        conversationid: parseInt(req.body.id),
      }, (err, result) => {
        res.json(result);
        return db.close();
      });
    });
  });
})

app.post('/sendMessage', (req, res) => {
  MongoClient.connect(urlToDB, { useNewUrlParser: true, useUnifiedTopology: true },(err,db) => {
    var dbo = db.db("textingdb");
    dbo.collection("conversations", (err, coll) => {
      coll.updateOne(
        {conversationid: parseInt(req.body.conversationid)},
        {
          $push: {
            messages: {
              $each: [ {
                senderid: parseInt(req.body.senderid),
                msg: req.body.message
              }]
            }
          }
      }, (err, result) => {
        res.json({response: 'sended'});
        return db.close();
      });
    });
  });
})

function isEmptyObject(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}