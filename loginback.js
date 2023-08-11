const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcrypt");

const app = express();
const port = 3001;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection URL
const dbUrl = "mongodb://localhost:27017";
const dbName = "mydb";
const collectionName = "users";

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log('username :>> ', username);
  // Connect to MongoDB
  try {
    const client = await MongoClient.connect(dbUrl, {
      useUnifiedTopology: true,
    });
    const db = client.db(dbName);

    const collection = db.collection(collectionName);
    // Check if the user exists
    const user = await collection.findOne({ email:username });
    console.log('user :>> ', user);
    if (user) {
      const passwordMatch = req.body.password;
      console.log('passwordMatch :>> ', passwordMatch);
      if (passwordMatch) {
        console.log('37');
        res.json({ success: true });
      }
       else {
        console.log('41');
        res.json({ success: false });
      }
    } else {
      console.log('45');
      res.json({ success: false });
    }

    client.close();
  } catch (err) {
    console.error("Error:", err);
    res.json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
