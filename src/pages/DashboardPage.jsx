import { useNavigate } from 'react-router-dom';
import { useAuthController } from '../controllers/AuthController';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuthController();

  const onLogout = () => {
    handleLogout();
    navigate('/login');
  };

  return <Dashboard username="User" onLogout={onLogout} />;
};

export default DashboardPage;