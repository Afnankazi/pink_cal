const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Todo API server running on port ${PORT}`);
  console.log(`Access API at http://localhost:${PORT}/api/todos`);
});
