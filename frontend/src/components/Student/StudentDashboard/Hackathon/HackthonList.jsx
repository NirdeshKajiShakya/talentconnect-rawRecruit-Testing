import React, { useState, useEffect } from 'react';
import HackathonCard from './HackathonCard';
import SearchBar from './SearchBar';
import { getHackathons } from '@/lib/User_AxiosInstance';
// import { hackathons } from '@/constants/hackthonData';

const HackathonList = () => {
  const [hackathons, setHackathons] = useState();
  const [filteredHackathons, setFilteredHackathons] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  const loadHackathons = async () => {
    try {
      const response = await getHackathons();
      // console.log("loaded", response);
      setHackathons(response.data.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  useEffect(() => {
    loadHackathons();
  }, []);

  useEffect(() => {
    // Filter hackathons based on search term
    let filtered = hackathons?.filter(hackathon =>
      hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hackathon.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort hackathons based on sort option
    if (sortBy === 'date') {
      filtered = [...filtered].sort((a, b) => new Date(a.dateTime.split(' - ')[0]) - new Date(b.dateTime.split(' - ')[0]));
    } else if (sortBy === 'popularity') {
      filtered = [...filtered].sort((a, b) => b.registeredUsers - a.registeredUsers);
    } else if (sortBy === 'prize') {
      // This is simplified; in a real app you'd need more complex logic for prize values
      filtered = [...filtered].sort((a, b) => (b.prizes?.length || 0) - (a.prizes?.length || 0));
    }

    setFilteredHackathons(filtered);
  }, [searchTerm, sortBy]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (option) => {
    setSortBy(option);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Hackathons</h1>
      <p className="text-gray-600 mb-6">Discover upcoming hackathons and innovation challenges.</p>

      <SearchBar onSearch={handleSearch} onSort={handleSort} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hackathons?.map(hackathon => (
          <HackathonCard key={hackathon._id} hackathon={hackathon} />
        ))}
      </div>
    </div>
  );
};

export default HackathonList;