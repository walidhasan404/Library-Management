import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { API_ENDPOINTS } from '../../config/api';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (user?.email) {
                try {
                    const token = localStorage.getItem('access-token');
                    const response = await axios.get(
                        API_ENDPOINTS.CHECK_ADMIN(user.email),
                        {
                            headers: { Authorization: `Bearer ${token}` },
                            withCredentials: true
                        }
                    );
                    
                    const adminStatus = response.data.data?.admin || false;
                    setIsAdmin(adminStatus);
                } catch (error) {
                    console.error('Error checking admin status:', error);
                    setIsAdmin(false);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        checkAdminStatus();
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-primary"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return isAdmin ? <AdminDashboard /> : <UserDashboard />;
};

export default Dashboard;

