import { fetchAllResumeService, saveParsedResumeService } from "../services/Resume.service.js";
import { calculateMatchScore } from "../utility/weightedResumeSearch.js";

// export const saveParsedResume = async (req, res) => {
//     const resumeData = req.body;
//     if (!resumeData) return res.status(404).json({ msg: "No data" });

//     try {
//         // call ml model api

//         // returns parsedData

//         // save in resume collection
//         await saveParsedResumeService(resumeData);
//         res.status(201).json({ msg: "Created!" });
//     } catch (error) {
//         console.log("error ", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// }

export async function resumeSearch(req, res) {
    // reqbody jobdesc. 
    // if(!req.body) return res.status(404).json({msg:"No job description"});
    const { query, location, experience, salary } = req.query;
    try {
        // resume
        const response = await fetchAllResumeService(experience);
        // console.log(response);
        // perform weighted search 
        let preferedResume;
        if (response.success) {
            preferedResume = calculateMatchScore(response.data, query, location, experience, salary);
            return res.status(200).json(preferedResume);
        }

        // res.status(200).json(response.data);
        res.status(204).json({ msg: "No matching resume" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}