const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/cms", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Page = mongoose.model("Page", {
  title: String,
  url: String,
  body: String,
});

app.get("/api/pages", async (req, res) => {
  const pages = await Page.find();
  res.json(pages);
});

app.post("/api/pages", async (req, res) => {
  const page = new Page(req.body);
  await page.save();
  res.json(page);
});

app.put("/api/pages/:id", async (req, res) => {
  const { id } = req.params;
  const page = await Page.findByIdAndUpdate(id, req.body, { new: true });
  res.json(page);
});

app.delete("/api/pages/:id", async (req, res) => {
  const { id } = req.params;
  await Page.findByIdAndDelete(id);
  res.sendStatus(204);
});

app.listen(5000, () => {
  console.log("Server listening on port 5000.");
});
