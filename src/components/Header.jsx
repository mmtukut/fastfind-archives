import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Search, Bell, User, 
  Building, Calculator, Heart, 
  MessageSquare, Settings, LogOut,
  Home, DollarSign, Map, Briefcase,
  ChevronDown, Globe, Sun, Moon,
  Building2, Crown, TrendingUp, Calendar
} from 'lucide-react';
import Logo from '../assets/images/logo.png';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Enhanced navigation with categories
  const mainNavLinks = [
    {
      name: 'Discover',
      path: '/',
      icon: Home,
      submenu: [
        { name: 'Featured Properties', path: '/featured', icon: Crown },
        { name: 'New Listings', path: '/new-listings', icon: Building2 },
        { name: 'Map View', path: '/map', icon: Map }
      ]
    },
    {
      name: 'Properties',
      path: '/properties',
      icon: Building,
      submenu: [
        { name: 'Buy', path: '/properties/buy', icon: Home },
        { name: 'Rent', path: '/properties/rent', icon: Building2 },
        { name: 'Commercial', path: '/properties/commercial', icon: Briefcase }
      ]
    },
    {
      name: 'BuildFund',
      path: '/buildfund',
      icon: DollarSign,
      submenu: [
        { name: 'Investment Plans', path: '/buildfund/invest', icon: Crown },
        { name: 'Development Projects', path: '/buildfund/projects', icon: Building },
        { name: 'Funding Options', path: '/buildfund/funding', icon: DollarSign }
      ]
    },
    {
      name: 'Smart Finance',
      path: '/smart-finance',
      icon: Calculator,
      submenu: [
        { name: 'Mortgage Calculator', path: '/smart-finance/mortgage', icon: Calculator },
        { name: 'Investment ROI', path: '/smart-finance/roi', icon: TrendingUp },
        { name: 'Payment Plans', path: '/smart-finance/plans', icon: Calendar }
      ]
    }
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Submenu component
  const NavSubmenu = ({ items }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-lg border py-2 mt-1"
    >
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <item.icon className="h-4 w-4 text-[#1c5bde]" />
          <span>{item.name}</span>
        </Link>
      ))}
    </motion.div>
  );

  // Update the Right Section with enhanced profile/auth buttons
  const ProfileSection = () => {
    if (!isAuthenticated) {
      return (
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-gray-700 hover:text-[#1c5bde] px-4 py-2 text-sm font-medium transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-[#1c5bde] hover:bg-[#0c0d8a] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-sm hover:shadow-md"
          >
            Sign Up
          </Link>
        </div>
      );
    }

    return (
      <div className="relative">
        <button 
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-2 px-3 py-2 hover:bg-[#1c5bde]/5 rounded-full transition-colors"
        >
          <div className="relative">
            <img 
              src="https://ui-avatars.com/api/?name=John+Doe&background=1c5bde&color=fff" 
              alt="Profile" 
              className="w-8 h-8 rounded-full border-2 border-[#1c5bde]"
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <span className="hidden md:block text-sm font-medium text-gray-700">John Doe</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>

        <AnimatePresence>
          {isProfileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border py-2"
            >
              <div className="px-4 py-3 border-b">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://ui-avatars.com/api/?name=John+Doe&background=1c5bde&color=fff" 
                    alt="Profile" 
                    className="w-12 h-12 rounded-full border-2 border-[#1c5bde]"
                  />
                  <div>
                    <p className="font-medium text-gray-900">John Doe</p>
                    <p className="text-sm text-gray-500">john@example.com</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <span className="px-2 py-1 bg-[#1c5bde]/10 text-[#1c5bde] text-xs rounded-full">
                    Premium Member
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Verified Agent
                  </span>
                </div>
              </div>

              <div className="py-2">
                <div className="px-4 py-2">
                  <p className="text-xs font-medium text-gray-500 uppercase">Account</p>
                </div>
                <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-[#1c5bde]/5">
                  <User className="h-4 w-4 text-[#1c5bde]" />
                  <div>
                    <p className="text-sm font-medium">Profile</p>
                    <p className="text-xs text-gray-500">Manage your account</p>
                  </div>
                </Link>
                <Link to="/favorites" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-[#1c5bde]/5">
                  <Heart className="h-4 w-4 text-[#1c5bde]" />
                  <div>
                    <p className="text-sm font-medium">Favorites</p>
                    <p className="text-xs text-gray-500">Saved properties</p>
                  </div>
                </Link>
                <Link to="/messages" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-[#1c5bde]/5">
                  <MessageSquare className="h-4 w-4 text-[#1c5bde]" />
                  <div>
                    <p className="text-sm font-medium">Messages</p>
                    <p className="text-xs text-gray-500">View your conversations</p>
                  </div>
                </Link>
              </div>

              <div className="py-2 border-t">
                <div className="px-4 py-2">
                  <p className="text-xs font-medium text-gray-500 uppercase">Settings</p>
                </div>
                <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-[#1c5bde]/5">
                  <Settings className="h-4 w-4 text-[#1c5bde]" />
                  <div>
                    <p className="text-sm font-medium">Settings</p>
                    <p className="text-xs text-gray-500">Preferences & security</p>
                  </div>
                </Link>
                <button 
                  onClick={() => {/* Add logout logic */}}
                  className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 w-full"
                >
                  <LogOut className="h-4 w-4" />
                  <div>
                    <p className="text-sm font-medium">Sign Out</p>
                    <p className="text-xs text-red-500">End your session</p>
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-sm' 
          : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="FastFind" className="h-8" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {mainNavLinks.map((link) => (
              <div key={link.path} className="relative group">
                <Link
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-gray-600 hover:text-[#1c5bde] transition-colors group-hover:bg-gray-50 ${
                    location.pathname === link.path ? 'text-[#1c5bde] font-medium' : ''
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                  {link.submenu && (
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>
                {link.submenu && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <NavSubmenu items={link.submenu} />
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center bg-[#1c5bde]/5 rounded-full pl-4 pr-2 py-2">
              <Search className="h-4 w-4 text-[#1c5bde]" />
              <input
                type="text"
                placeholder="Search properties..."
                className="bg-transparent border-none outline-none px-3 text-sm w-40 focus:w-60 transition-all placeholder-gray-500"
              />
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 hover:bg-[#1c5bde]/5 rounded-full transition-colors"
            >
              {isDarkMode ? (
                <Moon className="h-5 w-5 text-[#1c5bde]" />
              ) : (
                <Sun className="h-5 w-5 text-[#1c5bde]" />
              )}
            </button>

            {/* Language */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Globe className="h-5 w-5 text-gray-600" />
            </button>

            {/* Notifications */}
            <button className="p-2 hover:bg-[#1c5bde]/5 rounded-full transition-colors relative">
              <Bell className="h-5 w-5 text-[#1c5bde]" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Section */}
            <ProfileSection />

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {mainNavLinks.map((link) => (
                  <div key={link.path}>
                    <Link
                      to={link.path}
                      className={`flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 ${
                        location.pathname === link.path ? 'text-[#1c5bde] bg-[#1c5bde]/5' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.name}
                    </Link>
                    {link.submenu && (
                      <div className="pl-12 space-y-1">
                        {link.submenu.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className="flex items-center gap-3 py-2 text-sm text-gray-600 hover:text-[#1c5bde]"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <subItem.icon className="h-4 w-4" />
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header; 