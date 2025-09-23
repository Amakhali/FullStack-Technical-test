import React, { useState } from 'react';
import StepWizard from 'react-step-wizard';
import UserInfoForm from '../components/forms/UserInfoForm';
import UserAddressForm from '../components/forms/UserAddressForm';
import UserAcademicsForm from '../components/forms/UserAcademicsForm';
import UserContactForm from '../components/forms/UserContactForm';
import ResumePreview from '../components/ResumePreview';
import { User } from '../types/user';

const CreateUserPage: React.FC = () => {
  const [formData, setFormData] = useState<Partial<User>>({});

  const updateForm = (data: Partial<User>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-white p-10 rounded-3xl shadow-2xl">
        <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-12 tracking-tight">Create New User</h1>
        <div className="p-8 border border-gray-200 rounded-2xl bg-gray-50">
          <StepWizard transitions={{
            enterRight: 'animate__animated animate__fadeInRight',
            enterLeft: 'animate__animated animate__fadeInLeft',
            exitRight: 'animate__animated animate__fadeOutRight',
            exitLeft: 'animate__animated animate__fadeOutLeft'
          }}>
            <UserInfoForm updateForm={updateForm} />
            <UserAddressForm updateForm={updateForm} />
            <UserAcademicsForm updateForm={updateForm} />
            <UserContactForm updateForm={updateForm} />
            <ResumePreview formData={formData} />
          </StepWizard>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPage;
