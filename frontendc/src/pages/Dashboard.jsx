import { useEffect, useState } from 'react';
import API from '../api/axiosConfig';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [data, setData] = useState({ totalTasks: 0, pendingTasks: 0, username: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await API.get('/dashboard/user');
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
      <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
        <h2>{ data.username } Dashboard</h2>
        {loading ? <p>Loading...</p> : (
          <div>
            <p>Total Tasks: {data.totalTasks}</p>
            <p>Pending Tasks: {data.pendingTasks}</p>
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Dashboard;
