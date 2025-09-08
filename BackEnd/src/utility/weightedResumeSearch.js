const weights = {
    skills: 5,
    jobRole: 4,
    // industry: 2,
    location: 2,
    experience: 3
};

export function calculateMatchScore(resumes, query, location, experience, salary) {
    // jobdesc -> jobtitle , skills, preferedloc, experience, 

    const relevantresume = resumes.map((resume) => {
        let score = 0;

        if (experience && resume.yearsOfExperience >= experience) score += weights.experience;

        const matchedLocations = resume.preferredJobLocations.filter(loc => location.includes(loc));
        // console.log("matchedlocation: ",matchedLocations);
        if (matchedLocations.length > 0) {
            score += (matchedLocations.length / resume.preferredJobLocations.length) * weights.location;
        }

        const matchedSkills = resume.skills.filter(skill => query.includes(skill));
        // console.log("matchedskills: ",matchedSkills);
        if (matchedSkills.length > 0) {
            score += (matchedSkills.length / query.length) * weights.skills;
        }

        // if (resume.interestedJobRoles.includes( jobTitle)) score += weights.jobRole;

        return { ...resume._doc, matchedscore: score };
    })

    return relevantresume.sort((a, b) => b.matchedscore - a.matchedscore);
}