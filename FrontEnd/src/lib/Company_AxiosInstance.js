import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = import.meta.env.VITE_Backend_URL;

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

// default 10sec
axiosClient.defaults.timeout = 10000;
axiosClient.defaults.withCredentials = true;

export function getRegisteredColleges() {
  return axiosClient.get(`/api/student-dashboard/on-campus`)
    .then(response => response)
    .catch(error => error);
}


export function getCollegeDetail(collegeId) {
  return axiosClient.get(`/api/student-dashboard/on-campus/company/${collegeId}`)
    .then(response => response)
    .catch(error => error);
}

// accept
export function getAcceptedOffCampusCandidates(jobId) {
  return axiosClient.get(`/application/accept/${jobId}`)
    .then(response => response)
    .catch(error => error);
}

export function getProfileByResume(searchParams) {
  return axiosClient.get(`/company/dashboard/resume`, { params: searchParams })
    .then(response => response)
    .catch(error => error);
}

export function createCompanyProfile(formData) {
  return axiosClient.post(`/company`, formData)
    .then(response => response)
    .catch(error => error);
}

export function getAcceptedCampus(companyId) {
  return axiosClient.get(`/college/application/${companyId}`)
    .then(response => response)
    .catch(error => error);
}

export function acceptCollegeRequest(companyId, collegeId) {
  return axiosClient.post(`/college/application`, { companyId, collegeId })
    .then(response => response)
    .catch(error => error);
}

// internship
export function postInternship(payload) {
  return axiosClient.post(`/api/rawrecruit/createinternship`, payload)
    .then(response => response)
    .catch(error => error);
}

// jobmanagement
export function getPostedJobs(jobType) {
  return axiosClient.get(`/company/jobmanagement/${jobType}`)
    .then(response => response)
    .catch(error => error);
}

export function deleteJobById(jobId) {
  return axiosClient.delete(`/company/jobmanagement/${jobId}`)
    .then(response => response)
    .catch(error => error);
}

export function getApplicationsForJob(jobId, jobType) {
  return axiosClient.get(`application/manage`,
    {
      params: {
        jobId: jobId,
        jobType: jobType
      }
    }
  )
    .then(response => response)
    .catch(error => error);
}

export function getCollegeApplicationsForJob(jobId, jobType) {
  return axiosClient.get(`application/manage/college`,
    {
      params: {
        jobId: jobId,
        jobType: jobType
      }
    }
  )
    .then(response => response)
    .catch(error => error);
}

// get shortlisted applicant
export function getShorlistedCandidateByCompany(applicantType, jobType) {
  return axiosClient.get(`/application/manage/shortlist/`, {
    params: {
      applicantType: applicantType,
      jobType: jobType
    }
  })
    .then(response => response)
    .catch(error => error);
}

// get accepted applicant
export function getAcceptedCandidateByCompany(applicantType, jobType) {
  return axiosClient.get(`/application/manage/accept/`, {
    params: {
      applicantType: applicantType,
      jobType: jobType
    }
  })
    .then(response => response)
    .catch(error => error);
}

// shortlist candidate
export function shortlistCandidate(applicationId) {
  return axiosClient.patch(`/application/manage/shortlist/${applicationId}`)
    .then(response => response)
    .catch(error => error);
}
// reject
export function rejectCandidate(applicationId) {
  return axiosClient.patch(`/application/manage/reject/${applicationId}`)
    .then(response => response)
    .catch(error => error);
}
// accept candidate
export function acceptCandidate(applicationId) {
  return axiosClient.patch(`/application/manage/accept/${applicationId}`)
    .then(response => response)
    .catch(error => error);
}

// company dashboard
// save opportunity
export function SaveOppurtunity(jobId, jobType) {
  return axiosClient.post(`/application/saveopportunity`, { jobId: jobId, jobType: jobType })
    .then(response => response)
    .catch(error => error);
}

// get save opportunity
export function fetchSavedJobs() {
  return axiosClient.get(`/application/saveopportunity`)
    .then(response => response)
    .catch(error => error);
}

// application
export function ApplyForOncampusOppurtunity(jobId) {
  return axiosClient.post(`/application/oncampus`, { jobId: jobId })
    .then(response => response)
    .catch(error => error);
}

export function ApplyForPoolcampusOppurtunity(jobId) {
  return axiosClient.post(`/application/poolcampus`, { jobId: jobId })
    .then(response => response)
    .catch(error => error);
}