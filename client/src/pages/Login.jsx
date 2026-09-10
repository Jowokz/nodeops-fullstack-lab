import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await loginUser(form);
      login({ accessToken: data.accessToken || data.token || 'demo-token', user: data.user || { email: form.email } });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="panel">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} placeholder="jo@example.com" />
        <label>Password</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} />
        <button disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      {error && <p className="error">{error}</p>}
    </section>
  );
}



interface demoProps {}

export default function Demo({} : DemProps){
  return (
    <div className='tutorial'>
      <h1>UseState Expalin in easy mode!</h1>

    </div>
  );
}

A COMPLETE DEV ->
REACT JSX 
--> EXPRESS / JS 
--> NEST / TS 