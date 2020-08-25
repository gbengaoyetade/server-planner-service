const express = require('express');
const { computeServerCapacity } = require('./handlers')

const app = express();
app.use(express.json());


const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send({message: 'Welcome to server planner service'});
})

app.post('/api/server', computeServerCapacity)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});