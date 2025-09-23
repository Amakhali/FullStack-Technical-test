import React from 'react';
import { useAppDispatch } from '../hooks/redux';
import { createUser } from '../features/users/userSlice';
import { User } from '../types/user';
import { useNavigate } from 'react-router-dom';

interface Props {
  nextStep?: () => void;
  previousStep?: () => void;
  formData: Partial<User>;
}

const ResumePreview: React.FC<Props> = ({ nextStep, previousStep, formData }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!formData.userInfo || !formData.userContact || !formData.userAddress || !formData.userAcademics) {
      alert('Please fill out all the form sections.');
      return;
    }
    try {
      await dispatch(createUser(formData as Omit<User, 'id'>)).unwrap();
      alert('User created successfully!');
      navigate('/users'); // Redirect to user list after successful creation
    } catch (error: any) {
      alert(`Failed to create user: ${error.message}`);
    }
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Resume Preview</h2>
      <div className="bg-gray-50 p-10 rounded-xl shadow-inner">
        {formData.userInfo ? (
          <div className="flex flex-col items-center mb-10 pb-8 border-b border-gray-200">
            {(() => {
              let profilePhotoSrc: string | undefined;
              if (formData.userInfo?.profilePhoto instanceof File) {
                profilePhotoSrc = URL.createObjectURL(formData.userInfo.profilePhoto);
              } else if (typeof formData.userInfo?.profilePhoto === 'string') {
                profilePhotoSrc = formData.userInfo.profilePhoto;
              }
              return profilePhotoSrc ? (
                <img src={profilePhotoSrc} alt="Profile" className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg mb-6" />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-medium mb-6">No Photo</div>
              );
            })()}
            <h1 className="text-5xl font-bold text-gray-800 mb-2">{`${formData.userInfo.firstName} ${formData.userInfo.lastName}`}</h1>
            <p className="text-2xl text-gray-600 font-light">{formData.userInfo.occupation}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mb-10">User info not available</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-10 pb-8 border-b border-gray-200">
          {formData.userContact ? (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-2 border-blue-200">Contact Information</h3>
              <p className="mb-3 text-lg"><strong className="font-medium text-gray-700">Email:</strong> <span className="text-blue-600">{formData.userContact.email}</span></p>
              <p className="mb-3 text-lg"><strong className="font-medium text-gray-700">Phone:</strong> {formData.userContact.phoneNumber}</p>
              {formData.userContact.linkedinUrl && <p className="mb-3 text-lg"><strong className="font-medium text-gray-700">LinkedIn:</strong> <a href={formData.userContact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{formData.userContact.linkedinUrl}</a></p>}
              {formData.userContact.fax && <p className="mb-3 text-lg"><strong className="font-medium text-gray-700">Fax:</strong> {formData.userContact.fax}</p>}
            </div>
          ) : (
            <p className="text-gray-500 text-lg">User contact information not available</p>
          )}
          {formData.userAddress ? (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-2 border-blue-200">Address</h3>
              <p className="mb-2 text-lg">{formData.userAddress.address}</p>
              <p className="mb-2 text-lg">{`${formData.userAddress.city}, ${formData.userAddress.state} ${formData.userAddress.zipCode}`}</p>
              <p className="mb-2 text-lg">{formData.userAddress.country}</p>
            </div>
          ) : (
            <p className="text-gray-500 text-lg">User address not available</p>
          )}
        </div>

        <div className="mb-10 pb-8 border-b border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-2 border-blue-200">Academic Background</h3>
          {formData.userAcademics && formData.userAcademics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.userAcademics.map((academic, index) => (
                <div key={index} className="p-5 bg-blue-50 rounded-lg shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-200">
                  <p className="font-bold text-blue-800 text-xl mb-1">{academic.schoolName}</p>
                  {/* Add more academic details here if available */}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-lg">No academic records available</p>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-10">
        <button type="button" onClick={previousStep} className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-lg font-medium rounded-full text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out transform hover:-translate-y-0.5">
          Previous
        </button>
        <button onClick={handleSubmit} className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-lg font-medium rounded-full text-gray-700 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out transform hover:-translate-y-0.5">
          Create User
        </button>
      </div>
    </div>
  );
};

export default ResumePreview;
