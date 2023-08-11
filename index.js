var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const { Login } = require('./login.js')
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://127.0.0.1:27017/mydb ", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;

db.on("error", () => console.log("Error in Connecting to Database"));
db.once("open", () => console.log("Connected to Database"));
app.get('/health',(req,res,next)=>{
  console.log('object :>> ')
  return next();

})
app.post("/register", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var data = {
    name: name,
    email: email,

    password: password,
  };

  db.collection("users").insertOne(data, (err, collection) => {
    if (err) throw err;
    console.log("Record Inserted Successfully");
  });
  return res.redirect("login.html");
  // hellllllllloooooooooooooooo
});

app.post("/login",Login)

app.get('/login', (req, res)=> {
  res.redirect()
})

app
  .get("/", (req, res) => {
    res.set({
      "Allow-access-Allow-Origin": "*",
    });
    return res.redirect("index.html");
  })
  .listen(3000);

console.log("Listening on Port 3000");
