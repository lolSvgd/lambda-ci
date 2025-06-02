const Dashboard = ({ username, onLogout }) => {
  return (
    <div className="dashboard" data-cy="dashboard">
      <h1>Welcome, {username}!</h1>
      <p>This is a protected page only visible to authenticated users.</p>
      <button data-cy="logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;