import { useEffect, useState } from 'react';
import API from '../api/axiosConfig';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
  const [data, setData] = useState({ totalUsers: 0, totalTasks: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await API.get('/dashboard/admin');
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div>
      <Navbar />
            <div className='p-4 m-50'>
              <h2>Admin Dashboard</h2>
        {loading ? <p>Loading...</p> : (
          <div>
            <p>Total Users: {data.totalUsers}</p>
            <p>Total Tasks: {data.totalTasks}</p>
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default AdminDashboard;
