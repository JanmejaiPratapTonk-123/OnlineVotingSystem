const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  party: { type: String, default: "Independent" },
  votes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Candidate", CandidateSchema);
