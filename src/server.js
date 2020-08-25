const express = require('express');
const { computeServerCapacity } = require('./routeHandler');
const { validateServerCapacityRoute } = require('./helpers/routeValidator');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.post('/api/server/capacity', validateServerCapacityRoute, computeServerCapacity);

app.all('*', (req, res) => {
  res.status(404).send({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
