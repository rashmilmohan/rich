
const MongoClient = require("mongodb").MongoClient;
const dbUrl = "mongodb://localhost:27017";
const dbName = "mydb";
const collectionName = "users";
const Login = async (req, res) => {
 
    const { username, password } = req.body;
 
    try {
      const client = await MongoClient.connect(dbUrl, {
        useUnifiedTopology: true,
      });
      const db = client.db(dbName);
  
      const collection = db.collection(collectionName);

      const user = await collection.findOne({ email:username });
      if (user) {
        const passwordMatch = req.body.password;
        console.log('passwordMatch :>> ', passwordMatch);
        if (passwordMatch) {
          res.json({ success: true });
        }
         else {
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

}

module.exports = { Login }