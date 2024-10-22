const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

var methodOverride = require("method-override");
app.use(methodOverride("_method"));
const allRoutes = require("./routes/allRoutes");
const addUserRoute = require("./routes/addUser");
const fs = require('fs');

// Auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

mongoose
.connect('mongodb+srv://yahyaalfakir29:7fAFuqbFcC4titLG@cluster0.3aq7q.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0')

  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });






























  function readData() {
    try {
        const data = fs.readFileSync('./data.json', 'utf8');
        if (!data) return { items: [], lastId: 0 }; // إذا كان الملف فارغًا
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading data:", error);
        return { items: [], lastId: 0 }; // في حال حدوث خطأ
    }
  }
  
  app.get("/user/listjons.html", (req, res) => {
    const { items } = readData();
    res.render('user/listjons', { items : items });   
  });

  function writeData(data) {
    fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
  }
   
  app.post('/items', (req, res) => {
    console.log('Received a POST request to /items');
    const data = readData();
    
    const newItem = { id: data.lastId + 1, name: req.body.name, age: req.body.age };
    data.items.push(newItem);
    data.lastId = newItem.id; // تحديث الـ lastId
    writeData(data);
    res.redirect('/');
});



































app.use(allRoutes);
app.use( "/user/add.html",addUserRoute);
