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
    .catch(error => console.log("Error: ", error));
}


export function getCollegeDetail(collegeId) {
  return axiosClient.get(`/api/student-dashboard/on-campus/company/${collegeId}`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

// accept
export function getAcceptedOffCampusCandidates(jobId) {
  return axiosClient.get(`/application/accept/${jobId}`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export function getProfileByResume(searchParams) {
  return axiosClient.get(`/company/dashboard/resume`, { params: searchParams })
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export function createCompanyProfile(formData) {
  return axiosClient.post(`/company`, formData)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export function getAcceptedCampus(companyId) {
  return axiosClient.get(`/college/application/${companyId}`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export function acceptCollegeRequest(companyId, collegeId) {
  return axiosClient.post(`/college/application`, { companyId, collegeId })
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

// internship
export function postInternship(payload) {
  return axiosClient.post(`/api/rawrecruit/createinternship`, payload)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

// jobmanagement
export function getPostedJobs(jobType) {
  return axiosClient.get(`/company/jobmanagement/${jobType}`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export function deleteJobById(jobId) {
  return axiosClient.delete(`/company/jobmanagement/${jobId}`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
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
    .catch(error => console.log("Error: ", error));
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
    .catch(error => console.log("Error: ", error));
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
    .catch(error => console.log("Error: ", error));
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
    .catch(error => console.log("Error: ", error));
}

// shortlist candidate
export function shortlistCandidate(applicationId) {
  return axiosClient.patch(`/application/manage/shortlist/${applicationId}`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}
// reject
export function rejectCandidate(applicationId) {
  return axiosClient.patch(`/application/manage/reject/${applicationId}`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}
// accept candidate
export function acceptCandidate(applicationId) {
  return axiosClient.patch(`/application/manage/accept/${applicationId}`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}