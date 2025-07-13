import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/auth/login', form)
      .then(res => {
        login(res.data.user);
        navigate('/');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="block w-full mb-2 p-2 border" />
      <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="block w-full mb-2 p-2 border" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Login</button>
    </form>
  );
}

export default Login;