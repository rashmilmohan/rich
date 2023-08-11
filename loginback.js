const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection URL
const dbUrl = "mongodb://localhost:27017";
const dbName = "mydb";
const collectionName = "users";

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Connect to MongoDB
  try {
    const client = await MongoClient.connect(dbUrl, {
      useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Check if the user exists
    const user = await collection.findOne({ username });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.passwordHash);
      if (passwordMatch) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    } else {
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
