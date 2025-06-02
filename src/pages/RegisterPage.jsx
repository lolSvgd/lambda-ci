import { useNavigate, Link } from 'react-router-dom';
import { useAuthController } from '../controllers/AuthController';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { handleRegister, loading, error } = useAuthController();

  const onRegisterSubmit = async (username, email, password) => {
    const result = await handleRegister(username, email, password);
    if (result.success) {
      alert('Registration successful! Please login.');
      navigate('/login');
    }
  };

  return (
    <div className="page">
      <RegisterForm onSubmit={onRegisterSubmit} loading={loading} error={error} />
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;