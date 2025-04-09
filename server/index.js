const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const jobSchema = new mongoose.Schema({
  company: String,
  role: String,
  status: {
    type: String,
    enum: ["Applied", "Interview", "Offer", "Rejected"],
    default: "Applied"
  },
  date: Date,
  link: String,
});

const Job = mongoose.model("Job", jobSchema);

app.get("/jobs", async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const jobs = await Job.find(filter).sort({ date: -1 });
  res.json(jobs);
});

app.post("/jobs", async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.status(201).json(job);
});

app.put("/jobs/:id", async (req, res) => {
  const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete("/jobs/:id", async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
