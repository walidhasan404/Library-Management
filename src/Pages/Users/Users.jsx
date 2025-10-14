import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';
import Swal from 'sweetalert2';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('access-token');
            
            if (!token) {
                setError('Please log in to view users.');
                setLoading(false);
                return;
            }

            const response = await axios.get(API_ENDPOINTS.USERS, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            
            const usersData = response.data.data || response.data;
            setUsers(usersData);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching users:', err);
            
            if (err.response?.status === 401) {
                setError('Authentication failed. Please log in again.');
            } else {
                setError(err.response?.data?.message || 'Failed to fetch users. Please try again.');
            }
            setLoading(false);
        }
    };

    const handleMakeAdmin = async (userId, userName) => {
        const result = await Swal.fire({
            title: 'Make Admin?',
            text: `Are you sure you want to make ${userName} an admin?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, make admin!'
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('access-token');
                await axios.patch(
                    `${API_ENDPOINTS.USERS}/${userId}/admin`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true
                    }
                );
                
                Swal.fire('Success!', `${userName} is now an admin.`, 'success');
                fetchUsers(); // Refresh the list
            } catch (err) {
                console.error('Error making admin:', err);
                Swal.fire('Error!', err.response?.data?.message || 'Failed to update user role.', 'error');
            }
        }
    };

    const handleRemoveAdmin = async (userId, userName) => {
        const result = await Swal.fire({
            title: 'Remove Admin?',
            text: `Are you sure you want to remove admin privileges from ${userName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove admin!'
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('access-token');
                await axios.patch(
                    `${API_ENDPOINTS.USERS}/${userId}/remove-admin`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true
                    }
                );
                
                Swal.fire('Success!', `Admin privileges removed from ${userName}.`, 'success');
                fetchUsers(); // Refresh the list
            } catch (err) {
                console.error('Error removing admin:', err);
                Swal.fire('Error!', err.response?.data?.message || 'Failed to update user role.', 'error');
            }
        }
    };

    const handleDeleteUser = async (userId, userName) => {
        const result = await Swal.fire({
            title: 'Delete User?',
            text: `Are you sure you want to delete ${userName}? This action cannot be undone!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete user!'
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('access-token');
                await axios.delete(
                    `${API_ENDPOINTS.USERS}/${userId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true
                    }
                );
                
                Swal.fire('Deleted!', `${userName} has been deleted.`, 'success');
                fetchUsers(); // Refresh the list
            } catch (err) {
                console.error('Error deleting user:', err);
                Swal.fire('Error!', err.response?.data?.message || 'Failed to delete user.', 'error');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-primary"></div>
                    <p className="mt-4 text-gray-600">Loading users...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <div className="mb-4">
                        <svg className="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Users</h2>
                    <p className="text-red-600 text-lg mb-6">{error}</p>
                    <button 
                        onClick={fetchUsers}
                        className="btn btn-primary"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">Users Management</h1>
                <p className="text-center text-gray-600">Manage all registered users</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="text-center">#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th className="text-center">Role</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={user._id} className="hover">
                                        <td className="text-center font-semibold">{index + 1}</td>
                                        <td className="font-medium">{user.name}</td>
                                        <td>{user.email}</td>
                                        <td className="text-center">
                                            <span className={`badge ${user.role === 'admin' ? 'badge-success' : 'badge-info'}`}>
                                                {user.role === 'admin' ? 'Admin' : 'User'}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <div className="flex gap-2 justify-center">
                                                {user.role === 'admin' ? (
                                                    <button
                                                        onClick={() => handleRemoveAdmin(user._id, user.name)}
                                                        className="btn btn-sm btn-warning"
                                                        title="Remove Admin"
                                                    >
                                                        Remove Admin
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleMakeAdmin(user._id, user.name)}
                                                        className="btn btn-sm btn-success"
                                                        title="Make Admin"
                                                    >
                                                        Make Admin
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDeleteUser(user._id, user.name)}
                                                    className="btn btn-sm btn-error"
                                                    title="Delete User"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-8 text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    Total Users: <span className="font-bold text-blue-600">{users.length}</span>
                </p>
            </div>
        </div>
    );
};

export default Users;

