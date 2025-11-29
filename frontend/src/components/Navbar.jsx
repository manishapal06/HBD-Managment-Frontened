import React, { useState } from 'react';
import { Menu, X, Home, Users, Calendar, FileText, Activity, Settings, Bell, User } from 'lucide-react';

export default function HospitalNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'records', label: 'Records', icon: FileText },
    { id: 'lab', label: 'Lab Results', icon: Activity },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-800">
                HealthCare HMS
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-10 md:flex md:space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveItem(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors ${
                      activeItem === item.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
              <Settings className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 pl-3 border-l border-gray-300">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-800">Dr. Smith</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    activeItem === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-base font-medium text-gray-800">Dr. Smith</p>
                <p className="text-sm text-gray-500">Administrator</p>
              </div>
              <button className="ml-auto p-2 text-gray-600 hover:text-gray-800">
                <Bell className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}   