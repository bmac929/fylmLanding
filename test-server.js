import express from 'express';

console.log('Starting test server...');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('*', (req, res) => {
  res.send('Catch-all route');
});

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Test server listening on port ${PORT}`);
}); 