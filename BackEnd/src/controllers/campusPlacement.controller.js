import { campusPlacementRegistrationService, getCollegeDetailService, getCollegesService } from "../services/CampusPlacement.service.js";

export const registerCampusPlacement = async (req, res) => {
    try {
        const formData = req.body;
        const newRegistration = await campusPlacementRegistrationService(formData);

        res.status(201).json({ msg: newRegistration.message });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ Error: "Internal server error" });
    }
};

// get colleges that registered for oncampus placement
export const getRegisteredCampus = async (req, res) => {
    try {
        const response = await getCollegesService();
        // console.log("response", response);
        if (response.success === true) return res.status(200).json(response.data);
        return res.status(404).json({ msg: "No Colleges" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ Error: "Internal server error" });
    }
}

// get college detail that is registered for oncampus placement
export const getRegisteredCampusDetails = async (req, res) => {
    try {
        const response = await getCollegeDetailService(req.params.id);
        // console.log("response", response);
        if (response.success === true) return res.status(200).json(response.data);
        return res.status(404).json({ msg: "No Colleges" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ Error: "Internal server error" });
    }
}