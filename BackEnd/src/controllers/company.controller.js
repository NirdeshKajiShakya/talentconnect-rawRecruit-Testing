import { createProfileService } from "../services/Company.service.js";

export async function createCompanyProfile(req, res) {
    try {
        const response = await createProfileService(req.body);
        res.status(201).json({ msg: "Profile Created!" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }

}