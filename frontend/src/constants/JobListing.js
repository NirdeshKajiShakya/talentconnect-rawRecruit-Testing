// Mock data for development
 const mockJobs = [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'TechCorp',
      jobId: 'JOB-FE-001',
      location: 'New York',
      employmentType: 'Full-time',
      workMode: 'Remote',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
      responsibilities: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
      postedDate: '2025-04-20',
      salaryMin: 80000,
      salaryMax: 120000,
      salaryRange: '$80,000 - $120,000',
      experience: '2 - 4 years',
      roleType: 'Any Graduate',
      industryType: 'IT Services & Consulting',
      department: 'Product, Manufacturing & Engineering',
      roleCategory: 'Engineering',
   
      education: {
        ug: 'Any Graduate',
        pg: 'Any Graduate'
      },
      skills: ['JavaScript', 'React', 'CSS', 'HTML', 'TypeScript'],
      aboutCompany: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
      companyAddress: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Suspendisse varius enim in eros elementum tristique.',
      isSaved: false
    },
    {
      id: '2',
      title: 'Backend Engineer',
      company: 'DataSystems',
      jobId: 'JOB-BE-002',
      location: 'San Francisco',
      employmentType: 'Full-time',
      workMode: 'Hybrid',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
      responsibilities: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
      postedDate: '2025-04-22',
      salaryMin: 90000,
      salaryMax: 140000,
      salaryRange: '$90,000 - $140,000',
      experience: '3 - 5 years',
      roleType: 'Any Graduate',
      industryType: 'IT Services & Consulting',
      department: 'Product, Manufacturing & Engineering',
      roleCategory: 'Engineering',
  
      education: {
        ug: 'Any Graduate',
        pg: 'Any Graduate'
      },
      skills: ['Java', 'Spring Boot', 'SQL', 'AWS', 'MongoDB'],
      aboutCompany: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
      companyAddress: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Suspendisse varius enim in eros elementum tristique.',
      isSaved: true
    },
    {
      id: '3',
      title: 'UX Designer',
      company: 'CreativeMinds',
      jobId: 'JOB-UX-003',
      location: 'Boston',
      employmentType: 'Full-time',
      workMode: 'Remote',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
      responsibilities: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
      postedDate: '2025-04-18',
      salaryMin: 75000,
      salaryMax: 110000,
      salaryRange: '$75,000 - $110,000',
      experience: '2 - 4 years',
      roleType: 'Any Graduate',
      industryType: 'IT Services & Consulting',
      department: 'Design',
      roleCategory: 'Design',
   
      education: {
        ug: 'Any Graduate',
        pg: 'Any Graduate'
      },
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'UI Design'],
      aboutCompany: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
      companyAddress: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Suspendisse varius enim in eros elementum tristique.',
      isSaved: false
    },
    {
      id: '4',
      title: 'Data Scientist',
      company: 'AnalyticsPro',
      jobId: 'JOB-DS-004',
      location: 'Chicago',
      employmentType: 'Full-time',
      workMode: 'On-site',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
      responsibilities: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
      postedDate: '2025-04-25',
      salaryMin: 95000,
      salaryMax: 150000,
      salaryRange: '$95,000 - $150,000',
      experience: '3 - 6 years',
      roleType: 'Any Graduate',
      industryType: 'IT Services & Consulting',
      department: 'Data Science',
      roleCategory: 'Analytics',
  
      education: {
        ug: 'Any Graduate',
        pg: 'Any Graduate'
      },
      skills: ['Python', 'R', 'Machine Learning', 'SQL', 'Data Visualization'],
      aboutCompany: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
      companyAddress: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Suspendisse varius enim in eros elementum tristique.',
      isSaved: false
    },
    {
      id: '5',
      title: 'DevOps Engineer',
      company: 'CloudNative',
      jobId: 'JOB-DO-005',
      location: 'Seattle',
      employmentType: 'Full-time',
      workMode: 'Hybrid',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
      responsibilities: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
      postedDate: '2025-04-19',
      salaryMin: 100000,
      salaryMax: 160000,
      salaryRange: '$100,000 - $160,000',
      experience: '4 - 7 years',
      roleType: 'Any Graduate',
      industryType: 'IT Services & Consulting',
      department: 'Infrastructure',
      roleCategory: 'Engineering',
 
      education: {
        ug: 'Any Graduate',
        pg: 'Any Graduate'
      },
      skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Terraform'],
      aboutCompany: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
      companyAddress: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Suspendisse varius enim in eros elementum tristique.',
      isSaved: false
    },
    {
      id: '6',
      title: 'Software Engineer',
      company: 'Capgemini',
      jobId: '078-J6GDKH',
      location: 'Bengaluru',
      employmentType: 'Full-time',
      workMode: 'On-site',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
      responsibilities: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
      postedDate: '2025-04-30',
      salaryMin: 117247,
      salaryMax: 500000,
      salaryRange: '$117,247 - $500,000',
      experience: '2 - 4 years',
      roleType: 'Any Graduate',
      industryType: 'IT Services & Consulting',
      department: 'Product, Manufacturing & Engineering',
      roleCategory: 'Engineering',
   
      education: {
        ug: 'Any Graduate',
        pg: 'Any Graduate'
      },
      skills: ['Noida', 'Delhi', 'Gurgaon', 'Bangalore', 'Pune', 'Mumbai', 'Hyderabad'],
      aboutCompany: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
      companyAddress: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Suspendisse varius enim in eros elementum tristique.',
      isSaved: false
    },
    {
      id: '7',
      title: 'Product Manager',
      company: 'InnovateX',
      jobId: 'JOB-PM-007',
      location: 'Austin',
      employmentType: 'Full-time',
      workMode: 'Hybrid',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
      responsibilities: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
      postedDate: '2025-04-24',
      salaryMin: 110000,
      salaryMax: 170000,
      salaryRange: '$110,000 - $170,000',
      experience: '5 - 8 years',
      roleType: 'Any Graduate',
      industryType: 'IT Products',
      department: 'Product Management',
      roleCategory: 'Product Management',
  
      education: {
        ug: 'Any Graduate',
        pg: 'Any Graduate'
      },
      skills: ['Product Strategy', 'Agile', 'User Research', 'Roadmapping', 'Analytics'],
      aboutCompany: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
      companyAddress: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Suspendisse varius enim in eros elementum tristique.',
      isSaved: true
    },
    {
      id: '8',
      title: 'QA Engineer',
      company: 'QualityTech',
      jobId: 'JOB-QA-008',
      location: 'Denver',
      employmentType: 'Full-time',
      workMode: 'Remote',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
      responsibilities: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
      postedDate: '2025-04-27',
      salaryMin: 70000,
      salaryMax: 110000,
      salaryRange: '$70,000 - $110,000',
      experience: '2 - 5 years',
      roleType: 'Any Graduate',
      industryType: 'IT Services & Consulting',
      department: 'Quality Assurance',
      roleCategory: 'Engineering',
    
      education: {
        ug: 'Any Graduate',
        pg: 'Any Graduate'
      },
      skills: ['Selenium', 'Cypress', 'JIRA', 'API Testing', 'Test Automation'],
      aboutCompany: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
      companyAddress: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Suspendisse varius enim in eros elementum tristique.',
      isSaved: false
    }
  ]
//   API base URL - replace with your actual API endpoint
//   const API_BASE_URL = process.env.NODE_ENV === 'production' 
//     ? 'https://api.yourjobboard.com/api'
//     : '/api'; // This will be proxied in developmen
//   /**
//    * Fetch jobs with optional filters
//    * @param {Object} options - Filter options
//    * @returns {Promise<Array>} - Array of job objects
//    */
  export const fetchJobs = async (options = {}) => {
    try {
      // In a real app, this would be an API call with the options as query params
      // For example:
      // const response = await fetch(`${API_BASE_URL}/jobs?${new URLSearchParams(options)}`);
      // const data = await response.json();
      // return data.jobs   
      // For demo purposes, we'll just use the mock data
      // with artificial delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 500))   
      // Simulate filtering based on 'type' option
      if (options.type === 'profile') {
        return mockJobs.slice(0, 6); // First 6 jobs for profile-based
      } else if (options.type === 'preferences') {
        return mockJobs.slice(2, 8); // Different set for preference-based
      } else if (options.type === 'similar') {
        // Return a subset for similar jobs, excluding the one with provided id
        return mockJobs
          .filter(job => job.id !== options.excludeId)
          .slice(0, 6);
        }  
      return mockJobs;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw new Error('Failed to fetch jobs');
    }
  }
  /**
   * Fetch a specific job by ID
   * @param {string} jobId - The ID of the job to fetch
   * @returns {Promise<Object>} - Job details object
   */
  export const fetchJobDetails = async (jobId) => {
    try {
      // In a real app:
      // const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`);
      // const data = await response.json();
      // return data   
      // For demo purposes:
      await new Promise(resolve => setTimeout(resolve, 300))   
      const job = mockJobs.find(job => job.id === jobId)   
      if (!job) {
        throw new Error('Job not found');
      } 
      return job;
    } catch (error) {
      console.error(`Error fetching job ${jobId}:`, error);
      throw new Error('Failed to fetch job details');
    }
  }
  /**
   * Fetch similar jobs based on a job ID
   * @param {string} jobId - The ID of the reference job
   * @returns {Promise<Array>} - Array of similar job objects
   */
  export const fetchSimilarJobs = async (jobId) => {
    try {
      // In a real app, you'd make an API call:
      // const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/similar`);
      // const data = await response.json();
      // return data.jobs   
      // For demo purposes:
      return fetchJobs({ type: 'similar', excludeId: jobId });
    } catch (error) {
      console.error(`Error fetching similar jobs for ${jobId}:`, error);
      throw new Error('Failed to fetch similar jobs');
    }
  }
  /**
   * Save or unsave a job
   * @param {string} jobId - The ID of the job to save/unsave
   * @param {boolean} saved - Whether to save (true) or unsave (false)
   * @returns {Promise<Object>} - Result object
   */
  export const toggleSaveJob = async (jobId, saved) => {
    try {
      // In a real app:
      // const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/save`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ saved }),
      // });
      // const data = await response.json();
      // return data   
      // For demo purposes:
      await new Promise(resolve => setTimeout(resolve, 200))   
      return { success: true, jobId, saved };
    } catch (error) {
      console.error(`Error ${saved ? 'saving' : 'unsaving'} job ${jobId}:`, error);
      throw new Error(`Failed to ${saved ? 'save' : 'unsave'} job`);
    }
  }
  /**
   * Apply for a job
   * @param {string} jobId - The ID of the job to apply for
   * @param {Object} applicationData - Application details
   * @returns {Promise<Object>} - Result object
   */
  export const applyForJob = async (jobId, applicationData) => {
    try {
      // In a real app:
      // const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/apply`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(applicationData),
      // });
      // const data = await response.json();
      // return data   
      // For demo purposes:
      await new Promise(resolve => setTimeout(resolve, 500))   
      return { success: true, jobId, applicationId: `APP-${Date.now()}` };
    } catch (error) {
      console.error(`Error applying for job ${jobId}:`, error);
      throw new Error('Failed to submit application') 
    }
}