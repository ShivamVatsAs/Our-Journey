import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// We will create these Page components in the upcoming steps.
// Don't worry if your editor shows an error for now.
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AdventuresPage from './pages/AdventuresPage';

// We will also create the Navbar component soon.
import Navbar from './components/layout/Navbar';

// This is a small helper component. It checks if a user is logged in.
// If they are, it shows the protected page. If not, it sends them to the login page.
// We also render the Navbar here so it only appears on protected pages.
const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      {/* The <Outlet> component renders the actual page component (e.g., HomePage) */}
      <div className="p-4 sm:p-6 md:p-8">
        <Outlet />
      </div>
    </>
  );
};

function App() {
  const { isAuthenticated } = useAuth();

  return (
      <Routes>
        {/* The login page is a public route */}
        <Route path="/login" element={<LoginPage />} />

        {/* All routes inside here are protected */}
        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/adventures" element={<AdventuresPage />} />
          {/* You can add more protected pages here later, like a calendar page */}
        </Route>

        {/* This is a "catch-all" route.
            It redirects the user to the correct starting page. */}
        <Route 
          path="*" 
          element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} 
        />
      </Routes>
  );
}

export default App;