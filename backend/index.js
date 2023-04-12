const ConnectToMongo=require('./db');
const express = require('express');
const app = express();
const port = 5000;
var cors = require('cors')


app.use(cors())


ConnectToMongo();
app.use(express.json())
app.use('/api/auth' ,require('./routers/auth'))
app.use('/api/notes', require('./routers/notes'))
app.get('/', (req, res) => {

  console.log(req.body); 
  res.send(req.body)
})

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})