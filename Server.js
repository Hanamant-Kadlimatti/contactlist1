var express=require("express");
var app=express();
var mongojs=require("mongojs"); //requires the mongojs 
var db=mongojs("contactlist", ["contactlist"]);// which mongodb database & collection we are going to be using
var bodyParser=require("body-parser");


app.use(express.static(__dirname + "/public")); //static is basically html javascript in css file& public tells the server where to look find the static file
app.use(bodyParser.json()); //our server can first the body of the input receives
app.get('/contactlist', function(req, res) {
console.log("I Received Get Request")

db.contactlist.find(function (err, docs ) {
 console.log(docs); //test make sure the we receive the data from database
res.json(docs);     // sends the data back to the controller
});
});

app.post('/contactlist', function(req, res) {
 console.log(req.body); //this code is going to work get //app.post is listen for the first request from the controller //console.log print tha data  receive to the commandprompt// req.body means requesting the data from the body in the inputdata
 db.contactlist.insert(req.body, function(err, doc) {
 res.json(doc);//res.jsonmeans send back to this data to our controller, doc represents the item we first & received
 });
});

app.delete('/contactlist/:id', function(req, res) {
  var id=req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
  res.json(doc);
  });
});

app.get('/contactlist/:id', function (req, res) {
var id =req.params.id;
console.log(id);
db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
res.json(doc);//this code will test code & aswell as send back all data for the contact we requested back to the controller
 });
});
app.put('/contactlist/:id', function (req, res) {
var id =req.params.id;
console.log(req.body.name);
db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
  update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
  new :true},  function(err, doc) {
  res.json(doc);
  });
});

app.listen(3000);
console.log("server running on port 3000 ");

