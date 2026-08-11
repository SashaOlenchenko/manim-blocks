const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Manim Blocks backend is running!');
});

app.post('/render', (req, res) => {
  const code = req.body.code;
  console.log('Received code:');
  console.log(code);
  res.json({ status: 'received' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});