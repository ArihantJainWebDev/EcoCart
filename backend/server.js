const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());

const ecoDataDB = {
  "Himalaya Neem Face Wash": {
    score: "A",
    description: "Made with organic ingredients and biodegradable packaging."
  },
  "Surf Excel Detergent": {
    score: "C",
    description: "Contains synthetic chemicals, moderate eco impact."
  },
  "Nestle Milk": {
    score: "B",
    description: "Packaged in partially recyclable materials."
  },
  "Number Super Buds Pro GT99": {
    score: "D",
    description: "Electronic product with plastic-heavy packaging."
  }
};

app.get("/api/ecoscore", (req, res) => {
  const title = req.query.title;
  const found = Object.entries(ecoDataDB).find(([key]) =>
    title.toLowerCase().includes(key.toLowerCase())
  );

  if (found) {
    res.json(found[1]);
  } else {
    // Send random mock data
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