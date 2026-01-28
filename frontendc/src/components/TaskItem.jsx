import { useState } from 'react';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [editable, setEditable] = useState(false);
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    status: task.status
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    onUpdate(task._id, form);
    setEditable(false);
  };

  return (
    <div style={{ border: '1px solid gray', padding: '0.5rem', marginBottom: '0.5rem' }}>
      {editable ? (
        <>
          <input name="title" value={form.title} onChange={handleChange} />
          <input name="description" value={form.description} onChange={handleChange} />
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="todo">Todo</option>
            <option value="in-progress">In-progress</option>
            <option value="done">Done</option>
          </select>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditable(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{task.title} ({task.status})</h4>
          <p>{task.description}</p>
          <button onClick={() => setEditable(true)}>Edit</button>
          <button onClick={() => onDelete(task._id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
