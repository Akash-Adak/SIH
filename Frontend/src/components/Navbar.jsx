import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotifications } from '../contexts/NotificationContext.jsx';

// Bell Icon component
const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

// Hamburger Icon component
const HamburgerIcon = ({ open }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    {open ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    )}
  </svg>
);

export default function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('authToken'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            CitizenConnect
          </Link>

          <div className="flex items-center space-x-2">
            {token && (
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative text-gray-600 hover:text-blue-600"
                >
                  <BellIcon />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-20">
                    <div className="p-3 border-b">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map(n => (
                          <div key={n.id} onClick={() => markAsRead(n.id)} className={`p-3 text-sm border-b hover:bg-gray-100 cursor-pointer ${!n.read ? 'bg-blue-50' : ''}`}>
                            <p className={!n.read ? 'font-bold' : ''}>{n.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{new Date(n.date).toLocaleString()}</p>
                          </div>
                        ))
                      ) : (
                        <p className="p-4 text-sm text-gray-500">No new notifications.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                <HamburgerIcon open={menuOpen} />
              </button>
            </div>

            <div className={`hidden md:flex items-center space-x-4`}>
              {token ? (
                <>
                  <span className="text-gray-700">Welcome!</span>
                  <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">My Reports</Link>
                  <Link to="/heatmap" className="text-gray-600 hover:text-blue-600">Heatmap</Link>
                  <Link to="/awareness" className="text-gray-600 hover:text-blue-600">Awareness Hub</Link>
                  <Link to="/report/new" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">File a Report</Link>
                  <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Logout</button>
                </>
              ) : (
                <Link to="/login" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300">Login / Sign Up</Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-2">
            {token ? (
              <>
                <span className="block text-gray-700">Welcome!</span>
                <Link to="/dashboard" className="block text-gray-600 hover:text-blue-600">My Reports</Link>
                <Link to="/heatmap" className="block text-gray-600 hover:text-blue-600">Heatmap</Link>
                <Link to="/awareness" className="block text-gray-600 hover:text-blue-600">Awareness Hub</Link>
                <Link to="/report/new" className="block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">File a Report</Link>
                <button onClick={handleLogout} className="block w-full text-left bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Logout</button>
              </>
            ) : (
              <Link to="/login" className="block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Login / Sign Up</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
