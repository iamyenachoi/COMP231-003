const Admin = () => {
  return (
    <>
      <div>Admin</div>
      <button onClick={() => (window.location.href = "/restManagement")}>
        Go to Rest Management
      </button>
      <button onClick={() => (window.location.href = "/RestaurantSignup")}>
        Go to Restaurant Signup
      </button>
    </>
  );
};

export default Admin;
