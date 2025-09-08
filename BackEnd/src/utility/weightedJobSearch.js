// job filter and scoring algo
const weights = {
    industryType: 1,
    skills: 4,
    location: 1
}

export const WeightedFilter = (PreferedJobs, skills, interestedIndustryType, preferedLocations) => {
    // console.log(PreferedJobs)
    
    const scoredJobs = PreferedJobs?.map(job => {
        let score = 0;

        if (interestedIndustryType.includes(job.industryType)) score += weights.industryType;
        if (preferedLocations.includes(job.location)) score += weights.location;

        const matchedSkills = job.skillsRequired.filter(skill => skills.includes(skill));
        if (matchedSkills.length > 0) {
            score += (matchedSkills.length / job.skillsRequired.length) * weights.skills;
        }

        return { ...job, matchedscore: score };
    })

    // sort jobs in decreasing order of matching preference
    return scoredJobs.sort((a, b) => b.matchedscore - a.matchedscore);
}