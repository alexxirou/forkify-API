const { redisEndpoint, username, password, databaseId, accountKey, secretKey } = require('./env.js');
const express = require("express");
const redis = require("redis");
const cors = require('cors'); // Import the 'cors' package
const app = express();
const port = 49999;


const corsOptions = {
  origin: 'http://localhost:1234', // Replace with the origin you want to allow
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Middleware to parse JSON
app.use(express.json());


app.use(cors(corsOptions));

// Redis client setup
const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
  password: password,
  //db: databaseId,
});

client.connect();

client.on("connect", () => {
  console.log("Connected to Redis");
  client.ping().then((response) => {
    console.log("Redis ping response:", response);
  });
  client.FLUSHALL();
});

client.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});



// Set key-value pair in Redis
app.post("/set/:db/:key", cors(), async (req, res) => {
  const { db, key } = req.params;
  const data = JSON.stringify(req.body);
 
  console.log(typeof data);
  //console.log(req);
  //console.log(data);
  
  try {
    client.set(`recipe:${db}:${key}`, data, 'EX', 120,).then((reply, err) => {
      if (err) {
        console.error("Error setting data:", err);
        res.status(500).send("Internal Server Error");
      } else if (reply === 'OK') {
        console.log("Data set successfully");
        res.status(200).send("Data set successfully");
      } else if (reply === null) {
        console.log("Recipe data already exists in Redis");
        res.status(205).send("Recipe data already exists in Redis");
      }
    });
  } catch (err) {
    console.error("Error setting data:", err);
    res.status(500).send("Internal Server Error");
  }
});



app.get("/get/:db/:key", (req, res) => {
  const { db, key } = req.params;
  //console.log(db, key);

  client.get(`recipe:${db}:${key}`)
    .then(data => {
      if (data) {
       //console.log("Retrieved data:", data);
        try {
          const parsedData = JSON.parse(data);
          //console.log("Parsed data:", parsedData);
          res.status(200).json(parsedData);
        } catch (error) {
          console.error("Error parsing data:", error);
          res.status(500).send("Error parsing data");
        }
      } else {
        res.status(404).send("Data not found");
      }
    })
    .catch(err => {
      console.error("Error getting data:", err);
      res.status(500).send("Internal Server Error");
    });
});




// Update data in the cache (if key exists)
app.put("/update/:key", async (req, res) => {
  const { db, key } = req.params;
  const data = JSON.stringify(req.body);


  try {
    client.set(`recipe:${db}:${key}`, data, "XX", "EX", 120).then((reply, err) => {
      if (err) {
        console.error("Error setting data:", err);
        res.status(500).send("Internal Server Error");
      }     
      else if (reply === 'OK') {
        console.log("Data updated successfully");
        res.status(200).send("Data updated successfully");
      } else if(reply === null) {
        console.log("Recipe data does not exist in Redis");
        res.status(204).send("Recipe data does not exist in Redis");
      }
    });
  } catch (err) {
    console.error("Error updating data:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Get objects associated with query key from Redis
app.get("/smembers/:db/:key", async (req, res) => {
  const { db, key } = req.params;
 
  try {
    const queryObjects = await client.sMembers(`recipe:${db}:${key}`);
    const parsedData = queryObjects.map((item) => JSON.parse(item)); 
    res.status(200).json(parsedData);
  } catch (err) {
    console.error("Error getting objects associated with query:", err);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/sadd/:db/:key", async (req, res) => {
  const { db, key } = req.params;
  const values = req.body;
  const serializedObjects = values.map((obj) => JSON.stringify(obj));
  
  try {
    await Promise.all(serializedObjects.map((item) => client.sAdd(`recipe:${db}:${key}`, item, 'EX', 120)));
    
    res.status(200).send("Objects added to query set in Redis successfully");
  } catch (err) {
    console.error("Error adding objects to query set in Redis:", err);
    res.status(500).send("Internal Server Error");
  }
});



app.get("/exists/:db/:key", async (req, res) => {
  try {
    const { db, key } = req.params;

    client.exists(`recipe:${db}:${key}`).then((exists) => {
      console.log(`Key '${key}' exists: ${exists}`);
      
      if (exists === 1) {
        res.status(200).json({ exists: true }); // Key exists
      } else {
        res.status(200).json({ exists: false }); // Key does not exist
      }
    });
  } catch (err) {
    console.error('Error checking key existence:', err);
    res.status(500).send('Internal Server Error');
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
