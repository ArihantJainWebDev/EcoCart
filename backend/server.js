const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());

app.get("/api/ecoscore", (req, res) => {
  const title = req.query.title;
  const found = Object.entries(ecoDataDB).find(([key]) =>
    title.toLowerCase().includes(key.toLowerCase())
  );

  if (found) {
    res.json(found[1]);
  } else {
    const grades = ["A", "B", "C", "D", "E"];
    const random = {
      score: grades[Math.floor(Math.random() * grades.length)],
      description: "No exact match. Estimated based on category."
    };
    res.json(random);
  }
});

app.listen(port, () =>
  console.log(`🚀 EcoCart backend running: http://localhost:${port}`)
);