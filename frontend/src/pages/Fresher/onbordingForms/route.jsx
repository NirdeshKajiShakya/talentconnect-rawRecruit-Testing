import { Navigate } from 'react-router-dom';
import WelcomePage from './Welcome';
import ResumeUpload from './ResumeUpload';
import BasicDetails from './BasicDetails';
import Education from './Education';
import CareerGoals from './CareerGoals';
import FinalDetails from './FinalDetails';
import AgreementPage from './AgreementPage';

const formRoutes = [
  {
    index: true,
    element: <Navigate to="welcome" replace />
  },
  {
    path: 'welcome',
    element: <WelcomePage />
  },
  {
    path: 'upload-resume',
    element: <ResumeUpload />
  },
  {
    path: 'basic-details',
    element: <BasicDetails />
  },
  {
    path: 'education',
    element: <Education />
  },
  {
    path: 'career-goals',
    element: <CareerGoals />
  },
  {
    path: 'final-details',
    element: <FinalDetails />
  },
  {
    path: 'agreement',
    element: <AgreementPage />
  }
];

export default formRoutes;
