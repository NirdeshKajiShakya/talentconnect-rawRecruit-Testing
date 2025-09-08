import { AcceptCampusRequestService, getAcceptedCampusRequestService } from "../services/CollegeApplication.service.js";

export async function AcceptCampusRequest(req, res) {
    const { companyId, collegeId } = req.body;
    if (!companyId || !collegeId) return res.status(404).json({ msg: "Company or College not found!" });

    try {
        const response = await AcceptCampusRequestService(companyId, collegeId);
        res.status(201).json(response);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ Error: "Internal server error" });
    }
}

export async function getAcceptedCampusRequest(req, res) {
    const { companyId } = req.params;
    if (!companyId) return res.status(404).json({ msg: "Company not found!" });

    try {
        const response = await getAcceptedCampusRequestService(companyId);
        res.status(201).json(response);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ Error: "Internal server error" });
    }
}