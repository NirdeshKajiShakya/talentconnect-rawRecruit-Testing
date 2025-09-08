import ResumeSearch from './ResumeSearch';
import ApplicationStatus from './ApplicationStatus';
import useResumeAppLogic from './useResumeAppLogic';

const ResumeApp = () => {
  const {
    view,
    candidates,
    filters,
    handleFileUpload,
    handleSearch,
    updateFilters,
    shortlistCandidate,
    setView,
  } = useResumeAppLogic();

  return (
    <div className="min-h-screen bg-gray-50">
      {view === 'search' ? (
        <ResumeSearch onSearch={handleSearch} onFileUpload={handleFileUpload} />
      ) : (
        <ApplicationStatus
          candidates={candidates}
          filters={filters}
          updateFilters={updateFilters}
          shortlistCandidate={shortlistCandidate}
          onBackToSearch={() => setView('search')}
        />
      )}
    </div>
  );
};

export default ResumeApp;
