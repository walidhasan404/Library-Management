import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { API_ENDPOINTS } from "../../config/api";
import axios from "axios";

const AdminCheck = () => {
    const { user } = useContext(AuthContext);
    const [adminStatus, setAdminStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkStatus = async () => {
            if (user?.email) {
                const token = localStorage.getItem('access-token');
                try {
                    const response = await axios.get(
                        API_ENDPOINTS.CHECK_ADMIN(user.email),
                        {
                            headers: { Authorization: `Bearer ${token}` }
                        }
                    );
                    setAdminStatus(response.data);
                } catch (err) {
                    setError(err.response?.data || err.message);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        checkStatus();
    }, [user?.email]);

    const handleClearData = () => {
        localStorage.clear();
        sessionStorage.clear();
        alert('All data cleared! Please reload and login again.');
        window.location.reload();
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Admin Status Checker</h1>

                {!user ? (
                    <div className="text-center p-8 bg-yellow-50 rounded-lg">
                        <p className="text-lg">❌ You are not logged in</p>
                        <p className="text-sm text-gray-600 mt-2">Please log in first</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                            <h3 className="font-semibold mb-2">User Information:</h3>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Name:</strong> {user.displayName || 'Not set'}</p>
                        </div>

                        {loading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="mt-4">Checking admin status...</p>
                            </div>
                        ) : error ? (
                            <div className="p-4 bg-red-50 rounded-lg">
                                <h3 className="font-semibold text-red-800 mb-2">❌ Error:</h3>
                                <pre className="text-sm text-red-600 overflow-auto">
                                    {JSON.stringify(error, null, 2)}
                                </pre>
                            </div>
                        ) : (
                            <div className={`p-4 rounded-lg ${adminStatus?.data?.admin ? 'bg-green-50' : 'bg-orange-50'}`}>
                                <h3 className="font-semibold mb-2">
                                    {adminStatus?.data?.admin ? '✅ Admin Status: YES' : '❌ Admin Status: NO'}
                                </h3>
                                <pre className="text-sm overflow-auto mt-2">
                                    {JSON.stringify(adminStatus, null, 2)}
                                </pre>
                            </div>
                        )}

                        <div className="mt-6 space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold mb-2">Token Status:</h3>
                                <p className="text-sm">
                                    Token exists: {localStorage.getItem('access-token') ? '✅ Yes' : '❌ No'}
                                </p>
                            </div>

                            {!adminStatus?.data?.admin && (
                                <div className="p-4 bg-yellow-50 rounded-lg">
                                    <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Not Admin?</h3>
                                    <p className="text-sm mb-3">If you logged in before the admin feature was added, you need to:</p>
                                    <ol className="list-decimal list-inside text-sm space-y-1 mb-4">
                                        <li>Clear your browser data</li>
                                        <li>Log in again</li>
                                        <li>Your account will be auto-promoted to admin</li>
                                    </ol>
                                    <button
                                        onClick={handleClearData}
                                        className="btn bg-orange-500 hover:bg-orange-600 text-white"
                                    >
                                        Clear Data & Reload
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}

                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                    <h3 className="font-semibold mb-2">Expected Email for Auto-Admin:</h3>
                    <p className="text-sm font-mono">olidehasan444@gmail.com</p>
                    {user?.email === 'olidehasan444@gmail.com' ? (
                        <p className="text-sm text-green-600 mt-2">✅ Your email matches!</p>
                    ) : (
                        <p className="text-sm text-red-600 mt-2">❌ Your email doesn't match</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminCheck;

