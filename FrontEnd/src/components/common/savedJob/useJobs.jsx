// src/hooks/useJobs.js
import { useState, useEffect } from "react";
import { fetchSavedJobs } from "@/lib/User_AxiosInstance";
// import  fetchJobs from "../../../constants/jobServices.js"

const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchSavedJobs();
        // console.log("data: ", data.data);
        setJobs(data.data);
      } catch (err) {
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  return { jobs, loading, error };
};

export default useJobs;
