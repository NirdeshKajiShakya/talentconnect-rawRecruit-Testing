// shortlist.js - Service for handling shortlisted drives

const API_BASE_URL = import.meta.env.VITE_Backend_URL || '';

/**
 * Fetch shortlisted drives from the API or fallback to mock data if failed or empty.
 */
export const fetchShortlistedDrives = async ({
  page = 1,
  batchYear = '',
  location = '',
  search = '',
  itemsPerPage = 8
}) => {
  try {
    const queryParams = new URLSearchParams({
      page: String(page),
      batchYear,
      location: location === 'All Locations' ? '' : location,
      search,
      itemsPerPage: String(itemsPerPage)
    });

    const response = await fetch(`${API_BASE_URL}/api/shortlisted-drives?${queryParams}`);

    if (!response.ok) {
      console.warn('API call failed, using mock data instead.');
      return getMockDrives({ page, batchYear, location, search, itemsPerPage });
    }

    const data = await response.json();

    if (!data || !data.drives || data.drives.length === 0) {
      console.warn('API returned empty drives, using mock data.');
      return getMockDrives({ page, batchYear, location, search, itemsPerPage });
    }

    return data;
  } catch (error) {
    console.error('Error fetching shortlisted drives:', error);
    return getMockDrives({ page, batchYear, location, search, itemsPerPage });
  }
};

/**
 * Fetch detailed drive information
 */
export const fetchDriveDetails = async (driveId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/oncampus-drives/${driveId}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching drive details for ID ${driveId}:`, error);
    throw error;
  }
};

/**
 * Generate mock drive data for development or fallback
 */
export const getMockDrives = ({ page = 1, batchYear = '', location = '', search = '', itemsPerPage = 8 }) => {
  const fullMockData = Array.from({ length: 30 }, (_, index) => {
    const id = index + 1;
    const mockLocation = index % 2 === 0 ? 'Mumbai, India' : 'Delhi, India';
    const status = index % 3 === 0 ? 'Completed' : (index % 2 === 0 ? 'Upcoming' : 'On-Going');
    const instituteName = `ABC Institute Of Technology ${id}`;

    return {
      id,
      institute: instituteName,
      date: `April ${23 + (index % 3)}, 2025`,
      location: mockLocation,
      proposedDates: 'May 13-14, 2025',
      status,
      batchYear: '2025'
    };
  });

  const filtered = fullMockData.filter(drive => {
    const matchLocation = location === '' || location === 'All Locations' || drive.location === location;
    const matchYear = batchYear === '' || drive.batchYear === batchYear;
    const matchSearch = search === '' || drive.institute.toLowerCase().includes(search.toLowerCase());
    return matchLocation && matchYear && matchSearch;
  });

  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return {
    drives: paginated,
    totalItems: filtered.length,
    page,
    itemsPerPage
  };
};
