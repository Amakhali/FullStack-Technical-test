import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getUser, updateUser } from '../features/users/userSlice';
import { User } from '../types/user';
import UserInfoForm from '../components/forms/UserInfoForm';
import UserAddressForm from '../components/forms/UserAddressForm';
import UserAcademicsForm from '../components/forms/UserAcademicsForm';
import UserContactForm from '../components/forms/UserContactForm';
import StepWizard from 'react-step-wizard';

const EditUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser, loading, error } = useAppSelector((state) => state.users);
  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    const userId = id ? parseInt(id, 10) : NaN;
    if (!isNaN(userId)) {
      dispatch(getUser(userId));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentUser) {
      setFormData(currentUser);
    }
  }, [currentUser]);

  const updateForm = (data: Partial<User>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    if (id) {
      try {
        await dispatch(updateUser({ ...formData, id: Number(id) } as User)).unwrap();
        alert('User updated successfully!');
        navigate(`/user/${id}`);
      } catch (error: any) {
        alert(`Failed to update user: ${error.message}`);
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading user data for editing...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold text-red-600">Error: {error as string}</div>;
  }

  if (!currentUser) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600">User not found for editing.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-white p-10 rounded-3xl shadow-2xl">
        <h1 className="text-5xl font-extrabold text-black-900 text-center mb-12 tracking-tight">Edit User</h1>
        <div className="p-8 border border-gray-200 rounded-2xl bg-gray-50">
          <StepWizard transitions={{
            enterRight: 'animate__animated animate__fadeInRight',
            enterLeft: 'animate__animated animate__fadeInLeft',
            exitRight: 'animate__animated animate__fadeOutRight',
            exitLeft: 'animate__animated animate__fadeOutLeft'
          }}>
            <UserInfoForm updateForm={updateForm} defaultValue={currentUser.userInfo} />
            <UserAddressForm updateForm={updateForm} defaultValue={currentUser.userAddress} />
            <UserAcademicsForm updateForm={updateForm} defaultValue={currentUser.userAcademics} />
            <UserContactForm updateForm={updateForm} defaultValue={currentUser.userContact} onSubmit={handleSubmit} />
          </StepWizard>
        </div>
    </div>
    </div>
  );
};

export default EditUserPage;
