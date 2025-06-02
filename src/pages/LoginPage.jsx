import { useNavigate, Link } from 'react-router-dom';
import { useAuthController } from '../controllers/AuthController';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleLogin, loading, error } = useAuthController();

  const onLoginSubmit = async (email, password) => {
    const result = await handleLogin(email, password);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="page">
      <LoginForm onSubmit={onLoginSubmit} loading={loading} error={error} />
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;