const express = require("express");
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");

app.use("/app", userRoutes);

// app.get('/api/users', (req, res) => {
//  res.send('hello world!');
//})

app.listen(port, () => {
  console.log("servidor rodando em http://localhost:" + port);
});
 