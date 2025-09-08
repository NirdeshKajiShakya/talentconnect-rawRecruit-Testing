import JobPreference from "../models/Onboarding_jobinterests.js";

export const createJobPreference = async (req, res) => {
  try {
    const data = req.body;
    const jobPref = await JobPreference.create(data);
    res.status(201).json(jobPref);
  } catch (error) {
    console.error("Error creating job preference:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getAllJobPreferences = async (req, res) => {
  try {
    const allPrefs = await JobPreference.find();
    res.status(200).json(allPrefs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
