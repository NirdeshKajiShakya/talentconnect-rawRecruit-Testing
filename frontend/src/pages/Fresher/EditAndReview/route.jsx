import { Navigate } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import ResumeUpload from './ResumeUpload';
import BasicDetails from './BasicDetails';
import EducationAndBackground from './EducationAndBackground';
import CareerGoals from './CareerGoals';
import FinalDetails from './FinalDetails';
import ReviewDetails from './ReviewDetails';


const EditRoutes = [
  {
    index: true,
    element: <Navigate to="fresher-welcome" replace />
  },
  {
    path: 'fresher-welcome',
    element: <WelcomePage />
  },
  {
    path: 'fresher-resume-upload',
    element: <ResumeUpload />
  },
  {
    path: 'fresher-basic-details',
    element: <BasicDetails />
  },
  {
    path: 'fresher-education',
    element: <EducationAndBackground />
  },
  {
    path: 'fresher-career-goals',
    element: <CareerGoals />
  },
  {
    path: 'fresher-final-details',
    element: <FinalDetails />
  },
  {
    path: 'fresher-agreement',
    element: <ReviewDetails/>
  }
];

export default EditRoutes;
