import { useEffect, useState } from 'react';
import API from '../api/axiosConfig';
import TaskItem from '../components/TaskItem';
import Navbar from '../components/Navbar';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'todo' });

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/tasks', newTask);
      setTasks([...tasks, res.data]);
      setNewTask({ title: '', description: '', status: 'todo' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdate = async (id, updatedTask) => {
    try {
      const res = await API.put(`/tasks/${id}`, updatedTask);
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  return (
    <>
        <div className="min-h-screen flex items-center justify-center">
    <div className='bg-gray-800 p-25 rounded-lg shadow-lg' >
      <Navbar />  
      <h2>Tasks</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleCreate} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newTask.title}
          onChange={handleChange}
          required
          className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
          style={{ width: '100%', margin: '0.5rem 0' }}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newTask.description}
          onChange={handleChange}
          className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
          style={{ width: '100%', margin: '0.5rem 0' }}
        />
        <select name="status" value={newTask.status} onChange={handleChange}>
          <option value="todo">Todo</option>
          <option value="in-progress">In-progress</option>
          <option value="done">Done</option>
        </select>
        <button type="submit" style={{ marginLeft: '1rem' }}>Add Task</button>
      </form>

      {loading ? <p>Loading tasks...</p> : tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
    </div>
    </>

  );
};

export default Tasks;
