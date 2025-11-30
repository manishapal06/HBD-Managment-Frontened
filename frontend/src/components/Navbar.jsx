import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Users,
  Calendar,
  FileText,
  Activity,
  Settings,
  Bell,
  User,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function DashboardNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "." },
    { id: "patients", label: "Patients", icon: Users, path: "patients" },
    {
      id: "appointments",
      label: "Appointments",
      icon: Calendar,
      path: "appointments",
    },
    { id: "records", label: "Records", icon: FileText, path: "records" },
    { id: "lab", label: "Lab Results", icon: Activity, path: "lab" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-bold text-gray-800 text-lg">Healthcare HMS</h1>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-2 ml-10">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname.includes(item.path);

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg flex items-center space-x-2 transition
                    ${
                      active
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side user */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Settings className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 pl-3 border-l border-gray-300">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>

              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-800">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
