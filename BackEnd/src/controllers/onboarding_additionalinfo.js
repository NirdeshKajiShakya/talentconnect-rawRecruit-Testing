import AdditionalInfo from "../models/Onboarding_additionalinfo.js";

export const submitAdditionalInfo = async (req, res) => {
  try {
    const data = req.body;
    const info = await AdditionalInfo.create(data);
    res.status(201).json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
