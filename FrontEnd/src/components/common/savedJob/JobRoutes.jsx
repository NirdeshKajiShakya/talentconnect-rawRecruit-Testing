// src/routes/JobRoutes.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import JobList from "./JobList";
import JobDetail from "./JobDetail";
import JobLayout from "./JobLayout";

const JobRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <JobLayout>
          <JobList />
        </JobLayout>
      }
    />
    <Route
      path="/:id"
      element={
        <JobLayout>
          <JobDetail />
        </JobLayout>
      }
    />
  </Routes>
);

export default JobRoutes;
