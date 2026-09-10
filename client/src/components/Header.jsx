import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="header">
      <Link to="/" className="brand">NodeOps UI</Link>
      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/upload">Upload CSV</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>
        <NavLink to="/debug">Debug</NavLink>
      </nav>
      <div className="auth-box">
        {isAuthenticated ? (
          <>
            <span>{user?.email || 'Logged in'}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
}
