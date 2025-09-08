import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '@/context/AuthProvider'

const useApplicationForm = () => {
    const navigate = useNavigate();

    const[authUser , setAuthUser] = useAuth() ;
    const [formData, setFormData] = useState({
        employerDetails: {
            name: '',
            designation: '',
            workEmail: '',
            mobile: '',
            linkedIn: ''
        },
        companyDetails: {
            companyName: '',
            description: '',
            companyType: '',
            industryType: '',
            numberOfEmployees: '',
            establishedYear: '',
            websiteUrl: '',
            companyLinkedin: '',
            phoneNumber: '',
            alternatePhoneNumber: '',
            companyLocation: '',
            state: '',
            city: '',
            country: '',
            pincode: '',
            collegeWebsite: '',
            linkedinUrl: '',
        },
        hiringPreferences: {
            hiringPara: '',
            jobRoles: [],
            hiringLocations: [],
            lookingFor: '',
            employmentType: [],
        },
        kycDetails: {
            kycDocuments: [],
            documentType: '',
            TAN: '',
            GSTNumber: '',
            companyRegistrationNumber: '',
            kycStatus: 'pending',
            photoVerificationStatus: 'pending',
        },
        backgroundImage: null,
        profileImage: null,
        acceptedTerms: false,
    });

   const updateFormData = (sectionOrField, fieldOrValue, value) => {
    setFormData(prev => {
    
        if (fieldOrValue !== undefined && value !== undefined) {
            return {
                ...prev,
                [sectionOrField]: {
                    ...prev[sectionOrField],
                    [fieldOrValue]: value
                }
            };
        } 
       
        else {
            return {
                ...prev,
                [sectionOrField]: fieldOrValue
            };
        }
    });
};

    const handleSubmit = async () => {
        if (!formData.acceptedTerms) {
            alert("Please accept the Terms & Conditions to proceed.");
            return false;
        }

        try {
            const backendUrl = import.meta.env.VITE_Backend_URL;
            const dataToSend = new FormData();

            
            dataToSend.append('employerDetails', JSON.stringify(formData.employerDetails));
            
            dataToSend.append('companyDetails', JSON.stringify(formData.companyDetails));
            dataToSend.append('hiringPreferences', JSON.stringify(formData.hiringPreferences));
            
            const kycDetailsWithoutDocs = { ...formData.kycDetails };
            delete kycDetailsWithoutDocs.kycDocuments;
            dataToSend.append('kycDetails', JSON.stringify(kycDetailsWithoutDocs));

            if (formData.backgroundImage) {
                dataToSend.append('backgroundImage', formData.backgroundImage);
            }
            if (formData.profileImage) {
                dataToSend.append('profileImage', formData.profileImage);
            }
            formData.kycDetails.kycDocuments.forEach((file) => {
                dataToSend.append('kycDocuments', file);
            });
            console.log(backendUrl)

            const response = await axios.post(`${backendUrl}/api/companyDashboard/profiles`, dataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });

            if(response.data && response.data.user){
                const updatedUserFromServer = response.data.user ;

                const finalUser = {
                    ...authUser.user ,
                    ...updatedUserFromServer,
                }
                setAuthUser({user : finalUser})
            }
            alert('Company profile created successfully!');
            return true;
        } catch (error) {
            console.error('Failed to create company profile:', error);
             if (error.response) {
   
            console.error('Error Response Data:', error.response.data);
            console.error('Error Response Status:', error.response.status);
            console.error('Error Response Headers:', error.response.headers);
        } else if (error.request) {
            
            console.error('Error Request:', error.request);
        } else {
       
            console.error('Error Message:', error.message);
        }
            alert('Failed to create company profile. Please try again.');
            return false;
        }
    };

    return {
        formData,
        updateFormData,
        handleSubmit
    };
};

export default useApplicationForm;
