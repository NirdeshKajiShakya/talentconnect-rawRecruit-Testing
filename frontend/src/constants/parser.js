export const parseResume = async (file) => {
    // In a real application, you would send the file to an API or use a library
    // to extract information from the resume
    
    // Simulate parsing delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate some mock candidate data based on the filename
        const fileName = file.name;
        const id = Math.random().toString(36).substring(2, 10);
        
        // Generate a realistic-looking candidate
        const skills = [
          'JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'TypeScript',
          'MongoDB', 'GraphQL', 'Redux', 'Express', 'Tailwind CSS', 'AWS',
          'Docker', 'Kubernetes', 'CI/CD', 'Jest', 'Python', 'Django',
          'PostgreSQL', 'Redis', 'Project Management', 'Agile', 'Scrum'
        ];
        
        // Shuffle and take a random subset of skills
        const shuffled = [...skills].sort(() => 0.5 - Math.random());
        const selectedSkills = shuffled.slice(0, 5 + Math.floor(Math.random() * 7));
        
        const candidate = {
          id,
          name: fileName.replace(/\.(pdf|doc|docx)$/, '').replace(/_/g, ' '),
          email: `${fileName.toLowerCase().replace(/\.(pdf|doc|docx)$/, '').replace(/\s+/g, '.')}@gmail.com`,
          phone: `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
          location: 'Bangalore, India',
          currentSalary: (Math.floor(Math.random() * 50) + 60) * 1000,
          expectedSalary: (Math.floor(Math.random() * 60) + 80) * 1000,
          linkedin: 'https://linkedin.com/in/username',
          github: 'https://github.com/username',
          portfolio: '#',
          cv: '#',
          education: 'B-Tech (Mechanical)',
          experience: Math.floor(Math.random() * 10) + 1,
          languages: ['English', 'Hindi'],
          gender: Math.random() > 0.5 ? 'Male' : 'Female',
          age: Math.floor(Math.random() * 15) + 25,
          designation: 'Backend Developer at TalentConnects',
          industry: 'IT',
          skills: selectedSkills,
          status: Math.random() > 0.3 ? 'active' : 'expired',
          postedBy: Math.random() > 0.5 ? 'me' : `user${Math.floor(Math.random() * 4) + 2}`,
          appliedDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
          shortlisted: false
        };
        
        resolve(candidate);
      }, 500);
    });
  };