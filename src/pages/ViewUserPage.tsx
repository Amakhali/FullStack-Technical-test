import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getUser } from '../features/users/userSlice';

const ViewUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentUser, loading, error } = useAppSelector((state) => state.users);
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const userId = id ? parseInt(id, 10) : NaN;
    if (!isNaN(userId)) {
      dispatch(getUser(userId));
    }
  }, [dispatch, id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading user details...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold text-red-600">Error: {(error as any).message}</div>;
  }

  if (!currentUser) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600">User not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden mt-10">
        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">User Profile</h1>

          {currentUser.userInfo ? (
            <div className="flex flex-col items-center mb-10 pb-8 border-b border-gray-200">
              {(() => {
                let profilePhotoSrc: string | undefined;
                if (currentUser.userInfo.profilePhoto instanceof File) {
                  profilePhotoSrc = URL.createObjectURL(currentUser.userInfo.profilePhoto);
                } else if (typeof currentUser.userInfo.profilePhoto === 'string') {
                  profilePhotoSrc = currentUser.userInfo.profilePhoto;
                }
                return profilePhotoSrc ? (
                  <img src={profilePhotoSrc} alt="Profile" className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg mb-6" />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-medium mb-6">No Photo</div>
                );
              })()}
              <h2 className="text-5xl font-bold text-gray-800 mb-2">{`${currentUser.userInfo.firstName} ${currentUser.userInfo.lastName}`}</h2>
              {/* <p className="text-2xl text-gray-600 font-light mb-6">{currentUser.userInfo.occupation}</p> */}
              <div className="mt-6 p-6 grid grid-cols-2 gap-x-8 gap-y-2 text-lg text-gray-700">
                <div className="font-semibold">Date of Birth:</div>
                <div>{formatDate(currentUser.userInfo.dob)}</div>
                <div className="font-semibold">Gender:</div>
                <div>{currentUser.userInfo.gender}</div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg mb-10">User info not available</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-10 pb-8 border-b border-gray-200">
            {currentUser.userContact ? (
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-2 border-blue-200">Contact Information</h3>
                <div className="grid grid-cols-2 gap-y-2 text-lg text-gray-700">
                  <p className="font-light">
                    OCCUPATION: {currentUser.userInfo.occupation}</p>
                  <div className="font-semibold">Email:</div>
                  <div><span className="text-blue-600 hover:underline cursor-pointer">{currentUser.userContact.email}</span></div>
                  <div className="font-semibold">Phone:</div>
                  <div>{currentUser.userContact.phoneNumber}</div>
                  {currentUser.userContact.linkedinUrl && (
                    <>
                      <div className="font-semibold">LinkedIn:</div>
                      <div><a href={currentUser.userContact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{currentUser.userContact.linkedinUrl}</a></div>
                    </>
                  )}
                  {currentUser.userContact.fax && (
                    <>
                      <div className="font-semibold">Fax:</div>
                      <div>{currentUser.userContact.fax}</div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-lg">User contact information not available</p>
            )}
            {currentUser.userAddress ? (
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-2 border-blue-200">Address</h3>
                <div className="grid grid-cols-2 gap-y-2 text-lg text-gray-700">
                  <div className="font-semibold">Street:</div>
                  <div>{currentUser.userAddress.address}</div>
                  <div className="font-semibold">City:</div>
                  <div>{currentUser.userAddress.city}</div>
                  <div className="font-semibold">State:</div>
                  <div>{currentUser.userAddress.state}</div>
                  <div className="font-semibold">Zip Code:</div>
                  <div>{currentUser.userAddress.zipCode}</div>
                  <div className="font-semibold">Country:</div>
                  <div>{currentUser.userAddress.country}</div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-lg">User address not available</p>
            )}
          </div>

          <div className="mb-10 pb-8 border-b border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-2 border-blue-200">Academic Background</h3>
            {currentUser.userAcademics && currentUser.userAcademics.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentUser.userAcademics.map((academic, index) => (
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

          <div className="flex justify-center gap-6 mt-10">
            <button
              onClick={() => navigate(`/user/${currentUser.id}/edit`)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Edit User
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );};

  export default ViewUserPage;
