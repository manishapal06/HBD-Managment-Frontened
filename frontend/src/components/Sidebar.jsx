import React, { useState } from "react";
import {
  Home,
  Users,
  Calendar,
  FileText,
  Activity,
  Stethoscope,
  Pill,
  Bed,
  DollarSign,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCog,
  Clock,
  FileCheck,
} from "lucide-react";

export default function HospitalSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuSections = [
    {
      title: "Main",
      items: [
        { id: "dashboard", label: "Dashboard", icon: Home },
        { id: "appointments", label: "Appointments", icon: Calendar },
        { id: "patients", label: "Patients", icon: Users },
      ],
    },
    {
      title: "Medical",
      items: [
        { id: "doctors", label: "Doctors", icon: Stethoscope },
        { id: "departments", label: "Departments", icon: Bed },
        { id: "lab", label: "Lab Results", icon: Activity },
        { id: "pharmacy", label: "Pharmacy", icon: Pill },
        { id: "records", label: "Medical Records", icon: FileText },
      ],
    },
    {
      title: "Management",
      items: [
        { id: "staff", label: "Staff", icon: UserCog },
        { id: "billing", label: "Billing", icon: DollarSign },
        { id: "reports", label: "Reports", icon: BarChart3 },
        { id: "schedule", label: "Schedules", icon: Clock },
      ],
    },
  ];

  const bottomItems = [
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help & Support", icon: HelpCircle },
    { id: "logout", label: "Logout", icon: LogOut },
  ];

  return (
    <div
      className={`bg-gray-900 text-gray-100 h-screen flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">HMS</h2>
              <p className="text-xs text-gray-400">v2.0</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors ml-auto"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Main Menu */}
      <div className="flex-1 overflow-y-auto py-4 px-2">
        {menuSections.map((section, idx) => (
          <div key={idx} className="mb-6">
            {!isCollapsed && (
              <h3 className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {section.title}
              </h3>
            )}
            <nav className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveItem(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    } ${isCollapsed ? "justify-center" : ""}`}
                    title={isCollapsed ? item.label : ""}
                  >
                    <Icon
                      className={`${
                        isCollapsed ? "w-6 h-6" : "w-5 h-5"
                      } flex-shrink-0`}
                    />
                    {!isCollapsed && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom Menu */}
      <div className="border-t border-gray-800 p-2">
        {bottomItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-300 hover:bg-gray-800 hover:text-white ${
                isCollapsed ? "justify-center" : ""
              }`}
              title={isCollapsed ? item.label : ""}
            >
              <Icon
                className={`${
                  isCollapsed ? "w-6 h-6" : "w-5 h-5"
                } flex-shrink-0`}
              />
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">DS</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Dr. Smith</p>
              <p className="text-xs text-gray-400 truncate">Administrator</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
