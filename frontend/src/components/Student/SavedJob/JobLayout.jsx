// src/layouts/JobLayout.jsx
import React from "react";
import useJobs from "./useJobs";

const JobLayout = ({ children }) => {
  const { jobs, loading, error } = useJobs();

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

  return React.cloneElement(children, { jobs });
};

export default JobLayout;
