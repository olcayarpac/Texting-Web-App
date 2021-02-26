const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.subscribe(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

app.use( function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
})

//connection to local db
const MongoClient = require('mongodb').MongoClient;
var urlToDB = "mongodb://localhost:27017";
const mongoClient = new MongoClient(urlToDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoClient.connect();
var db = mongoClient.db("textingdb");
var messagesCollection = db.collection("messages");


app.get('/getmessages', async (req, res) => {
    //var msgs = await messagesCollection.find({ "conversationid": 1 } );
    var msgs = await messagesCollection.distinct("messagesarray", { "conversationid": 1 });
    console.log("get message request");
    res.json(msgs);
})


app.post('/sendmessage', (req, res) => {
    messagesCollection.updateOne({ "conversationid": 1 }, {
        $push: {
            messagesarray:
                { "sender": req.query.userid, "message": req.query.message }
        }
    });
    res.send("sended");
})

// GET on ./
app.get('/', (req, res) => {
    console.log('get req');
    res.send('texting app api');
})
