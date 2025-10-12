import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { API_ENDPOINTS } from "../../config/api";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

const AdminUsers = () => {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [checkingAdmin, setCheckingAdmin] = useState(true);

    // Check if current user is admin
    useEffect(() => {
        const checkAdminStatus = async () => {
            if (user?.email) {
                const token = localStorage.getItem('access-token');
                try {
                    const response = await axios.get(
                        API_ENDPOINTS.CHECK_ADMIN(user.email),
                        {
                            headers: { Authorization: `Bearer ${token}` }
                        }
                    );
                    setIsAdmin(response.data.data.admin);
                } catch (error) {
                    console.error('Error checking admin status:', error);
                    setIsAdmin(false);
                } finally {
                    setCheckingAdmin(false);
                }
            }
        };

        checkAdminStatus();
    }, [user?.email]);

    // Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            if (isAdmin) {
                const token = localStorage.getItem('access-token');
                try {
                    const response = await axios.get(API_ENDPOINTS.USERS, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUsers(response.data.data || []);
                } catch (error) {
                    console.error('Error fetching users:', error);
                    Swal.fire('Error', 'Failed to fetch users', 'error');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUsers();
    }, [isAdmin]);

    // Make user admin
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
            const token = localStorage.getItem('access-token');
            try {
                await axios.patch(
                    `${API_ENDPOINTS.USERS}/${userId}/admin`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                // Update local state
                setUsers(users.map(u =>
                    u._id === userId ? { ...u, role: 'admin' } : u
                ));

                Swal.fire('Success!', `${userName} is now an admin`, 'success');
            } catch (error) {
                console.error('Error making admin:', error);
                Swal.fire('Error', 'Failed to make user admin', 'error');
            }
        }
    };

    // Remove admin privileges
    const handleRemoveAdmin = async (userId, userName) => {
        const result = await Swal.fire({
            title: 'Remove Admin?',
            text: `Are you sure you want to remove admin privileges from ${userName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, remove admin!'
        });

        if (result.isConfirmed) {
            const token = localStorage.getItem('access-token');
            try {
                await axios.patch(
                    `${API_ENDPOINTS.USERS}/${userId}/remove-admin`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                // Update local state
                setUsers(users.map(u =>
                    u._id === userId ? { ...u, role: 'user' } : u
                ));

                Swal.fire('Success!', `Admin privileges removed from ${userName}`, 'success');
            } catch (error) {
                console.error('Error removing admin:', error);
                Swal.fire('Error', 'Failed to remove admin privileges', 'error');
            }
        }
    };

    // Loading states
    if (checkingAdmin) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Checking permissions...</p>
                </div>
            </div>
        );
    }

    // Redirect if not admin
    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management</h1>
                    <p className="text-gray-600">Manage user roles and permissions</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((u, index) => (
                                <tr key={u._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 text-sm text-gray-700">{index + 1}</td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                                {u.name?.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">{u.name}</p>
                                                {u.email === user.email && (
                                                    <span className="text-xs text-blue-600 font-medium">(You)</span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-700">{u.email}</td>
                                    <td className="px-4 py-4">
                                        {u.role === 'admin' ? (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                Admin
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                User
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        {u.email === user.email ? (
                                            <span className="text-xs text-gray-500 italic">Current User</span>
                                        ) : (
                                            <div className="flex justify-center gap-2">
                                                {u.role === 'admin' ? (
                                                    <button
                                                        onClick={() => handleRemoveAdmin(u._id, u.name)}
                                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                                                    >
                                                        Remove Admin
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleMakeAdmin(u._id, u.name)}
                                                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                                                    >
                                                        Make Admin
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No users found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminUsers;

