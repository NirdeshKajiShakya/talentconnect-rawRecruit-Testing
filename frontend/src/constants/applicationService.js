// Mock data service for job applications
const mockApplications = [
    {
      id: '1',
      company: 'TechCorp Solutions',
      position: 'Software Engineer',
      salary: '₹12,00,000 PA',
      status: 'Registered',
      appliedDate: 'Apr 15, 2025',
      logo: 'https://via.placeholder.com/50',
      ctcPackage: 'CTC Package',
      description: 'Software Engineer position with focus on frontend development using React and related technologies. This role requires 3+ years of experience in web development.',
      requirements: [
        'Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model',
        'Thorough understanding of React.js and its core principles',
        'Experience with popular React.js workflows (such as Flux or Redux)',
        'Familiarity with newer specifications of ECMAScript'
      ],
      responsibilities: [
        'Developing new user-facing features using React.js',
        'Building reusable components and front-end libraries for future use',
        'Translating designs and wireframes into high-quality code',
        'Optimizing components for maximum performance across a vast array of web-capable devices and browsers'
      ],
      location: 'Bangalore, India',
      employmentType: 'Full-time',
      experience: '3-5 years',
      education: 'Bachelor\'s degree in Computer Science or related field'
    },
    {
      id: '2',
      company: 'DataViz Analytics',
      position: 'Data Analyst',
      salary: '₹9,00,000 PA',
      status: 'Shortlisted',
      appliedDate: 'Apr 12, 2025',
      logo: 'https://via.placeholder.com/50',
      ctcPackage: 'CTC Package',
      description: 'Data Analyst role working with large datasets to extract actionable insights. You will be responsible for managing, analyzing, and interpreting data to drive business decisions.',
      requirements: [
        'Proficiency in SQL and experience with databases',
        'Experience with data visualization tools like Tableau or Power BI',
        'Strong analytical and problem-solving skills',
        'Knowledge of statistical analysis and data mining techniques'
      ],
      responsibilities: [
        'Develop and implement databases, data collection systems, and other strategies that optimize efficiency and quality',
        'Analyze and interpret data to identify trends and patterns',
        'Filter and clean data by reviewing reports and performance indicators',
        'Create comprehensive reports for management and stakeholders'
      ],
      location: 'Mumbai, India',
      employmentType: 'Full-time',
      experience: '2-4 years',
      education: 'Bachelor\'s degree in Statistics, Mathematics, Computer Science or related field'
    },
    {
      id: '3',
      company: 'Product Innovate',
      position: 'Product Manager',
      salary: '₹15,00,000 PA',
      status: 'Rejected',
      appliedDate: 'Apr 10, 2025',
      logo: 'https://via.placeholder.com/50',
      ctcPackage: 'CTC Package',
      description: 'Product Manager position responsible for the strategy, roadmap, and feature definition for our product line. You will work with cross-functional teams to deliver winning products.',
      requirements: [
        'Experience in product management or related field',
        'Proven ability to develop product and marketing strategies',
        'Strong problem-solving abilities and analytical skills',
        'Excellent communication and presentation abilities'
      ],
      responsibilities: [
        'Define the product vision, strategy, and roadmap',
        'Work closely with engineering, design, and marketing teams',
        'Gather and prioritize product requirements',
        'Define product KPIs and measure success'
      ],
      location: 'Hyderabad, India',
      employmentType: 'Full-time',
      experience: '4-6 years',
      education: 'Bachelor\'s degree in Business, Engineering, or related field'
    },
    {
      id: '4',
      company: 'TechCorp Solutions',
      position: 'DevOps Engineer',
      salary: '₹14,00,000 PA',
      status: 'Registered',
      appliedDate: 'Apr 8, 2025',
      logo: 'https://via.placeholder.com/50',
      ctcPackage: 'CTC Package',
      description: 'DevOps Engineer role to build and maintain the infrastructure and tools that allow for the software development lifecycle. You will work on automating and optimizing deployment workflows.',
      requirements: [
        'Experience with AWS, Azure, or GCP cloud platforms',
        'Knowledge of infrastructure as code tools like Terraform or CloudFormation',
        'Experience with CI/CD pipelines and tools like Jenkins, CircleCI, or GitHub Actions',
        'Understanding of containerization technologies like Docker and Kubernetes'
      ],
      responsibilities: [
        'Design and implement CI/CD pipelines',
        'Automate infrastructure provisioning and configuration',
        'Monitor systems performance and troubleshoot issues',
        'Collaborate with development teams to improve deployment processes'
      ],
      location: 'Pune, India',
      employmentType: 'Full-time',
      experience: '3-5 years',
      education: 'Bachelor\'s degree in Computer Science or related field'
    },
    {
      id: '5',
      company: 'DataViz Analytics',
      position: 'Data Scientist',
      salary: '₹16,00,000 PA',
      status: 'Shortlisted',
      appliedDate: 'Apr 7, 2025',
      logo: 'https://via.placeholder.com/50',
      ctcPackage: 'CTC Package',
      description: 'Data Scientist position focusing on developing advanced analytics models to extract insights from complex datasets. You will be responsible for implementing machine learning algorithms.',
      requirements: [
        'Proficiency in Python or R for data analysis',
        'Experience with machine learning frameworks like TensorFlow or PyTorch',
        'Strong knowledge of statistical modeling and data mining',
        'Experience with big data technologies like Hadoop or Spark'
      ],
      responsibilities: [
        'Develop predictive models and machine learning algorithms',
        'Process, cleanse, and verify the integrity of data',
        'Conduct data analysis and interpretation',
        'Present findings to stakeholders in a clear and compelling manner'
      ],
      location: 'Bangalore, India',
      employmentType: 'Full-time',
      experience: '3-6 years',
      education: 'Master\'s degree in Data Science, Statistics, Computer Science or related field'
    },
    {
      id: '6',
      company: 'Product Innovate',
      position: 'UX Designer',
      salary: '₹10,00,000 PA',
      status: 'Rejected',
      appliedDate: 'Apr 5, 2025',
      logo: 'https://via.placeholder.com/50',
      ctcPackage: 'CTC Package',
      description: 'UX Designer role to create exceptional user experiences for our digital products. You will combine research, design thinking, and a deep understanding of user needs.',
      requirements: [
        'Portfolio demonstrating UX design skills',
        'Experience with design and prototyping tools like Figma or Sketch',
        'Understanding of user research methodologies',
        'Knowledge of information architecture and interaction design principles'
      ],
      responsibilities: [
        'Create user flows, wireframes, prototypes, and high-fidelity designs',
        'Conduct user research and usability testing',
        'Collaborate with product managers and developers',
        'Develop and maintain design systems'
      ],
      location: 'Delhi, India',
      employmentType: 'Full-time',
      experience: '2-4 years',
      education: 'Bachelor\'s degree in Design, HCI, or related field'
    },
    {
      id: '7',
      company: 'TechCorp Solutions',
      position: 'Software Engineer',
      salary: '₹13,00,000 PA',
      status: 'Registered',
      appliedDate: 'Apr 4, 2025',
      logo: 'https://via.placeholder.com/50',
      ctcPackage: 'CTC Package',
      description: 'Software Engineer position with focus on backend development using Node.js and related technologies. This role requires expertise in building scalable server-side applications.',
      requirements: [
        'Strong proficiency in JavaScript/TypeScript and Node.js',
        'Experience with server-side frameworks like Express or NestJS',
        'Knowledge of database technologies (SQL and NoSQL)',
        'Understanding of RESTful APIs and GraphQL'
      ],
      responsibilities: [
        'Design and develop scalable backend services and APIs',
        'Optimize application performance and responsiveness',
        'Implement security and data protection features',
        'Write clean, maintainable code with appropriate tests'
      ],
      location: 'Chennai, India',
      employmentType: 'Full-time',
      experience: '3-5 years',
      education: 'Bachelor\'s degree in Computer Science or related field'
    },
    {
      id: '8',
      company: 'DataViz Analytics',
      position: 'Data Engineer',
      salary: '₹14,00,000 PA',
      status: 'Shortlisted',
      appliedDate: 'Apr 3, 2025',
      logo: 'https://via.placeholder.com/50',
      ctcPackage: 'CTC Package',
      description: 'Data Engineer role focusing on building and maintaining data pipelines and infrastructure. You will be responsible for ensuring data quality and accessibility.',
      requirements: [
        'Experience with data pipeline tools like Airflow or Luigi',
        'Proficiency in Python, Scala, or Java',
        'Knowledge of big data technologies like Hadoop, Spark, and Kafka',
        'Experience with cloud platforms (AWS, GCP, or Azure)'
      ],
      responsibilities: [
        'Design and implement data models, pipelines, and ETL processes',
        'Build and optimize data systems for reliability and performance',
        'Collaborate with data scientists and analysts to make data accessible',
        'Ensure data governance and compliance with regulations'
      ],
      location: 'Bangalore, India',
      employmentType: 'Full-time',
      experience: '3-5 years',
      education: 'Bachelor\'s degree in Computer Science, Engineering, or related field'
    },
    {
      id: '9',
      company: 'Product Innovate',
      position: 'Product Manager',
      salary: '₹16,00,000 PA',
      status: 'Rejected',
      appliedDate: 'Apr 2, 2025',
      logo: 'https://via.placeholder.com/50',
      ctcPackage: 'CTC Package',
      description: 'Senior Product Manager position responsible for developing product strategies and roadmaps. You will lead cross-functional teams and drive product innovation.',
      requirements: [
        '5+ years of product management experience',
        'Track record of successful product launches',
        'Experience with agile methodologies',
        'Strong leadership and communication skills'
      ],
      responsibilities: [
        'Lead the development of product vision and strategy',
        'Manage the product lifecycle from conception to launch',
        'Work with stakeholders to align product goals with business objectives',
        'Analyze market trends and competitive landscape'
      ],
      location: 'Mumbai, India',
      employmentType: 'Full-time',
      experience: '5-8 years',
      education: 'Bachelor\'s or Master\'s degree in Business, Engineering, or related field'
    }
  ];
  
  // Get all applications
  export const getApplications = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockApplications);
      }, 500); // Simulate network delay
    });
  };
  
  // Get application by ID
  export const getApplicationById = (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const application = mockApplications.find(app => app.id === id);
        if (application) {
          resolve(application);
        } else {
          reject(new Error('Application not found'));
        }
      }, 300);
    });
  };