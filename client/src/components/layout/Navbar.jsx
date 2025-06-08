import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Heart, BookOpen, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/home', icon: Heart },
    { name: 'Our Adventures', path: '/adventures', icon: BookOpen },
    // { name: 'Calendar', path: '/calendar', icon: Calendar }, // For later
  ];

  const activeLinkStyle = {
    color: '#E57373', // primary color
    fontWeight: 'bold',
  };

  return (
    <nav className="bg-white/70 backdrop-blur-lg shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left side: App Title */}
          <div className="flex-shrink-0">
            <NavLink to="/home" className="font-display text-3xl text-primary">
              Our Journey
            </NavLink>
          </div>

          {/* Center: Navigation Links (hidden on small screens) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                  className="text-text-main hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          
          {/* Right side: Welcome message and Logout */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-text-light">Welcome, {user}!</span>
            <button
              onClick={logout}
              className="flex items-center bg-rose-100 hover:bg-primary hover:text-white text-primary font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="h-6 w-6 text-primary" />
              ) : (
                <Menu className="h-6 w-6 text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                className="text-text-main hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </NavLink>
            ))}
            <div className="border-t border-gray-200 mt-2 pt-2">
                 <span className="text-text-light block px-3 py-2">Welcome, {user}!</span>
                 <button
                    onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center text-text-main hover:text-primary px-3 py-2 rounded-md text-base font-medium"
                 >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                 </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;