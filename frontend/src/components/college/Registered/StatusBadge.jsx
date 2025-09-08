const StatusBadge = ({ status, className = '' }) => {
    let badgeClass = '';
    
    switch (status) {
      case 'Registered':
        badgeClass = 'badge-registered';
        break;
      case 'Shortlisted':
        badgeClass = 'badge-shortlisted';
        break;
      case 'Rejected':
        badgeClass = 'badge-rejected';
        break;
      default:
        badgeClass = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`badge p-1 rounded ${badgeClass} ${className}`}>
        {status}
      </span>
    );
  };
  
  export default StatusBadge;