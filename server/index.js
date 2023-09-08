const express = require("express");
const app = express();
const cors = require("cors");
const knex = require("knex")(require("./knexfile.js").development);
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/movies", async (req, res) => {
  try {
    const movies = await knex("movies").select("*");
    res.status(200).json(movies);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: `Movie not found` });
  }
});

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
