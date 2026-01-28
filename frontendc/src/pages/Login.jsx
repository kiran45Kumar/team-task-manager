import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);

      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center">
     <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-white mb-4">Team Task Manager</h1>
      <h2 className="text-xl font-semibold text-white mb-4">Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
          <div class="sm:col-span-4">
            <label for="email" class="block text-sm/6 font-medium text-white">Email address</label>
            <div class="mt-2">
              <input id="email" type="email"   value={form.email}
              onChange={handleChange}name="email" autocomplete="email" placeholder='username@domain.com' className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
            </div>
          </div>
          <div class="sm:col-span-4">
          <label for="password" class="block text-sm/6 font-medium text-white">Password</label>
          <div class="mt-2">
            <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
          style={{ width: '100%', margin: '0.5rem 0' }}
        />
          </div>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Don’t have an account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/register')}>Register</span>
      </p>
    </div>
    </div>
    </>
   
  );
};

export default Login;
