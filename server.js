const express = require("express");
const dbConnect = require("./db-connect");
const routes = require("./routes")

         
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => res.send('Welcome'))
app.use('/api', routes);


app.listen(PORT ,()=>{
       console.log(`Server is started successfully`)
})