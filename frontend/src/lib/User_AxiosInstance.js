import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = import.meta.env.VITE_Backend_URL;

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',

};

// default 10sec
axiosClient.defaults.timeout = 10000;
axiosClient.defaults.withCredentials = true;


// student dashboard
export function getJobDetails(jobId) {
  return axiosClient.get(`/jobs/jobDetails/${jobId}`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export function getJobLisingJobDetails(jobId) {
  return axiosClient.get(`/jobs/jobDetails/joblisting/${jobId}`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}


export function getRelaventOffcampusOpportunity() {
  return axiosClient.get(`/api/student-dashboard/off-campus`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export function getRelaventJobListingOpportunity() {
  return axiosClient.get(`/api/student-dashboard/job-postings`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export function getAllInternship() {
  return axiosClient.get(`/api/student-dashboard/internship-postings`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

// export function getInternshipDetail(Id) {
//   return axiosClient.get(`/internship/getInternshipDetail/${Id}`)
//     .then(response => response)
//     .catch(error => console.log("Error: ", error));
// }

export function getInternshipDetail(Id) {
  return axiosClient.get(`/api/student-dashboard/getPoolCampusJob/${Id}`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export function getInternshipById(internshipId) {
  return axiosClient.get(`/api/student-dashboard/getInternshipDetail/${internshipId}`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}



export function getHackathons() {
  return axiosClient.get(`/hackathon`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export function getHackathonDetail(hackathonId) {
  return axiosClient.get(`/hackathon/${hackathonId}`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

// save opportunity
export function SaveOppurtunity(jobId, jobType) {
  return axiosClient.post(`/application/saveopportunity`, { jobId: jobId, jobType: jobType })
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}
// get save opportunity
export function fetchSavedJobs(applicantType) {
  return axiosClient.get(`/application/saveopportunity`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

// application
export function ApplyForOppurtunity(jobId) {
  return axiosClient.post(`/application/candidate/offcampus`, { jobId: jobId })
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export function ApplyForJobListingOppurtunity(jobId) {
  return axiosClient.post(`/application/candidate/joblisting`, { jobId: jobId })
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export function ApplyForInternship(internshipId) {
  return axiosClient.post(`/application/candidate/internship`, { internshipId: internshipId })
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export function getJobListingApplicationStatus() {
  return axiosClient.get(`/application/candidate/joblisting`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export function getOffCampusApplicationStatus() {
  return axiosClient.get(`/application/candidate/offCampus`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export function getInternshipApplicationStatus() {
  return axiosClient.get(`/application/candidate/internship`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export const postReferralJob = (jobData) => {
  return axiosClient.post('/api/hiring-channels/referral-posting', jobData)
    .then(response => response.data)
    .catch(error => {
      console.error("Error posting referral job:", error);
      throw error;
    });
}

export function getReferralJobListing() {
  return axiosClient.get(`/api/student-dashboard/referral-jobs`)
    .then(response => response)
    .catch(error => console.log("Error:", error));
}

export function getReferralJobById(referralJob) {
  return axiosClient.get(`api/student-dashboard/referral-jobs/${referralJob}`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

