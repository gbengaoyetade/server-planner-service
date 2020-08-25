const express = require('express');
const { computeServerCapacity } = require('./handlers');
const { validateServerCapacityRoute } = require('./helpers/routeValidator');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to server planner service' });
});

app.post('/api/server/capacity', validateServerCapacityRoute, computeServerCapacity);

app.all('*', (req, res) => {
  res.status(404).send({ error: 'Route not found' })
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
