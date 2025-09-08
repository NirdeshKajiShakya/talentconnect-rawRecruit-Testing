import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = import.meta.env.VITE_Backend_URL;

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

// default 10sec
axiosClient.defaults.timeout = 10000;
// in case of tokens
axiosClient.defaults.withCredentials = true;

export function getCompanyPostingForOncampus() {
  return axiosClient.get(`/api/student-dashboard/on-campus/college`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export function getCompanyPostingForOncampusDetail(jobId) {
  return axiosClient.get(`/api/student-dashboard/oncampus/college/${jobId}`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

// save opportunity
export function SaveOppurtunity(jobId, jobType) {
  return axiosClient.post(`/application/saveopportunity`, { jobId: jobId, jobType: jobType })
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

// application
export function ApplyForPoolCampus(jobId) {
  return axiosClient.post(`/application/college/poolcampus`, { jobId: jobId })
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export function ApplyForOnCampus(jobId) {
  return axiosClient.post(`/application/college/oncampus`, { jobId: jobId })
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export function ApplyForCampusInternship(jobId) {
  return axiosClient.post(`/application/college/internship`, { jobId: jobId })
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export function getOncampusJobs() {
  return axiosClient.post(`/api/rawrecruit/college/oncampus`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export function getPoolCampusForCompany() {
  return axiosClient.get(`/api/student-dashboard/pool-campus/company`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}

export function getPoolCampusJobByIdForCompany(jobId) {
  return axiosClient.get(`/api/student-dashboard/pool-campus/company/${jobId}`)
    .then(response => response)
    .catch(error => console.log("Error: ", error));
}