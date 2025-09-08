import Preferences from "../models/Onboarding_preferences.js";

export const submitPreferences = async (req, res) => {
  try {
    const data = req.body;
    const preferences = await Preferences.create(data);
    res.status(201).json(preferences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
