import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getUsers, deleteUser } from '../features/users/userSlice';

const UserListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await dispatch(deleteUser(id)).unwrap();
        alert('User deleted successfully!');
      } catch (error) {
        alert(`Failed to delete user: ${(error as Error).message}`);
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading users...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold text-red-600">Error: {error as string}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden mt-10">
        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">User Management</h1>
          <div className="flex justify-end mb-6">
            <Link to="/user/create" className="inline-flex items-center px-6 py-3 border border-transparent
             text-base font-medium rounded-full shadow-sm text-black bg-blue-600 hover:bg-blue-700 
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150
              ease-in-out transform hover:-translate-y-0.5">
              <h3 className="text-lg font-semibold p-4 m-6">Add New User</h3>
            </Link>
          </div>

          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-6 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user.userInfo?.profilePhoto ? (
                            <img className="h-10 w-10 rounded-full" src={typeof user.userInfo.profilePhoto === 'string' ? user.userInfo.profilePhoto : URL.createObjectURL(user.userInfo.profilePhoto)} alt="" />
                          ) : (
                            <span className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-500">{user.userInfo?.firstName[0]}{user.userInfo?.lastName[0]}</span>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.userInfo?.firstName} {user.userInfo?.lastName}</div>
                          <div className="text-sm text-gray-500">{user.userInfo?.occupation}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.userContact?.email}</div>
                      <div className="text-sm text-gray-500">{user.userContact?.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4 m-6 whitespace-nowrap text-sm font-medium">
                      <Link to={`/user/${user.id}`} className="text-blue-600 hover:text-blue-900 mr-4 p-4 border
                      rounded-full shadow-lg">View</Link>
                      <Link to={`/user/${user.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4 p-4 
                      border rounded-full shadow-lg">Edit</Link>
                      <button onClick={() => handleDelete(user.id as number)} className="text-red-600 hover:text-red-900 border
                      rounded-full shadow-lg p-4">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListPage;