import React, { useState, useEffect } from "react";
import {
  Building2,
  Users,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  Ban,
  Search,
  Plus,
} from "lucide-react";

const SuperAdminPanel = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: "City General Hospital",
      admin: "Dr. Sarah Johnson",
      status: "active",
      users: 145,
      created: "2024-01-15",
      revenue: 45000,
    },
    {
      id: 2,
      name: "Metro Medical Center",
      admin: "Dr. Michael Chen",
      status: "active",
      users: 89,
      created: "2024-02-20",
      revenue: 32000,
    },
    {
      id: 3,
      name: "Riverside Clinic",
      admin: "Dr. Emily Davis",
      status: "pending",
      users: 0,
      created: "2024-11-25",
      revenue: 0,
    },
    {
      id: 4,
      name: "Northside Health",
      admin: "Dr. James Wilson",
      status: "suspended",
      users: 67,
      created: "2023-12-10",
      revenue: 21000,
    },
  ]);

  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.j@citygeneral.com",
      hospital: "City General Hospital",
      status: "active",
      lastLogin: "2024-11-28",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      email: "michael.c@metromed.com",
      hospital: "Metro Medical Center",
      status: "active",
      lastLogin: "2024-11-27",
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      email: "emily.d@riverside.com",
      hospital: "Riverside Clinic",
      status: "pending",
      lastLogin: "Never",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      email: "james.w@northside.com",
      hospital: "Northside Health",
      status: "suspended",
      lastLogin: "2024-10-15",
    },
  ]);

  const [metrics, setMetrics] = useState({
    totalHospitals: 4,
    activeHospitals: 2,
    pendingApprovals: 1,
    suspendedHospitals: 1,
    totalUsers: 301,
    totalRevenue: 98000,
    monthlyGrowth: 12.5,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newHospital, setNewHospital] = useState({
    name: "",
    adminName: "",
    adminEmail: "",
    address: "",
    phone: "",
    type: "general",
  });

  const handleApproveHospital = (id) => {
    setHospitals(
      hospitals.map((h) => (h.id === id ? { ...h, status: "active" } : h))
    );
    setAdmins(
      admins.map((a) =>
        a.hospital === hospitals.find((h) => h.id === id)?.name
          ? { ...a, status: "active" }
          : a
      )
    );
    alert("Hospital approved successfully!");
  };

  const handleSuspendHospital = (id) => {
    setHospitals(
      hospitals.map((h) => (h.id === id ? { ...h, status: "suspended" } : h))
    );
    setAdmins(
      admins.map((a) =>
        a.hospital === hospitals.find((h) => h.id === id)?.name
          ? { ...a, status: "suspended" }
          : a
      )
    );
    alert("Hospital suspended!");
  };

  const handleDeleteHospital = (id) => {
    if (
      confirm(
        "Are you sure you want to delete this hospital? This action cannot be undone."
      )
    ) {
      setHospitals(hospitals.filter((h) => h.id !== id));
      alert("Hospital deleted successfully!");
    }
  };

  const handleAddHospital = () => {
    if (
      !newHospital.name ||
      !newHospital.adminName ||
      !newHospital.adminEmail
    ) {
      alert("Please fill in all required fields!");
      return;
    }

    const newId = Math.max(...hospitals.map((h) => h.id)) + 1;
    const hospital = {
      id: newId,
      name: newHospital.name,
      admin: newHospital.adminName,
      status: "pending",
      users: 0,
      created: new Date().toISOString().split("T")[0],
      revenue: 0,
    };

    const admin = {
      id: Math.max(...admins.map((a) => a.id)) + 1,
      name: newHospital.adminName,
      email: newHospital.adminEmail,
      hospital: newHospital.name,
      status: "pending",
      lastLogin: "Never",
    };

    setHospitals([...hospitals, hospital]);
    setAdmins([...admins, admin]);
    setMetrics({
      ...metrics,
      totalHospitals: metrics.totalHospitals + 1,
      pendingApprovals: metrics.pendingApprovals + 1,
    });

    setNewHospital({
      name: "",
      adminName: "",
      adminEmail: "",
      address: "",
      phone: "",
      type: "general",
    });
    setShowAddModal(false);
    alert("Hospital added successfully! Pending approval.");
  };

  const filteredHospitals = hospitals.filter(
    (h) =>
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.admin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAdmins = admins.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.hospital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StatusBadge = ({ status }) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      suspended: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
      >
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Super Admin Control Panel
                </h1>
                <p className="text-sm text-blue-600">
                  Platform-wide management & oversight
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-300">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-700 font-medium">
                SUPER_ADMIN
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Dashboard */}
      {activeTab === "overview" && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Platform Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Building2 className="w-8 h-8 text-white/90" />
                <TrendingUp className="w-5 h-5 text-white/70" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {metrics.totalHospitals}
              </div>
              <div className="text-blue-50 text-sm">Total Hospitals</div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-white/90" />
                <div className="text-xs text-green-50">Active</div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {metrics.activeHospitals}
              </div>
              <div className="text-green-50 text-sm">Active Hospitals</div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <AlertCircle className="w-8 h-8 text-white/90" />
                <div className="text-xs text-yellow-50">Pending</div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {metrics.pendingApprovals}
              </div>
              <div className="text-yellow-50 text-sm">Pending Approvals</div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-white/90" />
                <Activity className="w-5 h-5 text-white/70" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {metrics.totalUsers}
              </div>
              <div className="text-blue-50 text-sm">Total Platform Users</div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Revenue Overview
              </h3>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                ${metrics.totalRevenue.toLocaleString()}
              </div>
              <div className="flex items-center text-green-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />+{metrics.monthlyGrowth}%
                this month
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                System Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">API Status</span>
                  <span className="text-green-600 font-semibold">
                    Operational
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Database</span>
                  <span className="text-green-600 font-semibold">Healthy</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Suspended Accounts</span>
                  <span className="text-red-600 font-semibold">
                    {metrics.suspendedHospitals}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex space-x-1 bg-white rounded-lg p-1 border border-blue-200 shadow-sm">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              activeTab === "overview"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("hospitals")}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              activeTab === "hospitals"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            }`}
          >
            Hospitals
          </button>
          <button
            onClick={() => setActiveTab("admins")}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              activeTab === "admins"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            }`}
          >
            Hospital Admins
          </button>
        </div>
      </div>

      {/* Hospitals Management */}
      {activeTab === "hospitals" && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Hospital Management
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search hospitals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-blue-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
              >
                <Plus className="w-5 h-5" />
                <span>Add Hospital</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      Hospital
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      Admin
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      Users
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                  {filteredHospitals.map((hospital) => (
                    <tr
                      key={hospital.id}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-800">
                          {hospital.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {hospital.admin}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {hospital.users}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={hospital.status} />
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {hospital.created}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        ${hospital.revenue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          {hospital.status === "pending" && (
                            <button
                              onClick={() => handleApproveHospital(hospital.id)}
                              className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <UserCheck className="w-4 h-4" />
                            </button>
                          )}
                          {hospital.status === "active" && (
                            <button
                              onClick={() => handleSuspendHospital(hospital.id)}
                              className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                              title="Suspend"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setSelectedHospital(hospital);
                              setShowModal(true);
                            }}
                            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteHospital(hospital.id)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Hospital Admins Management */}
      {activeTab === "admins" && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Hospital Admins
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search admins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-blue-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAdmins.map((admin) => (
              <div
                key={admin.id}
                className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {admin.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {admin.name}
                      </h3>
                      <p className="text-sm text-gray-500">{admin.email}</p>
                    </div>
                  </div>
                  <StatusBadge status={admin.status} />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Hospital:</span>
                    <span className="text-gray-800 font-medium">
                      {admin.hospital}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Last Login:</span>
                    <span className="text-gray-800 font-medium">
                      {admin.lastLogin}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for Hospital Details */}
      {showModal && selectedHospital && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 border border-blue-300 shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {selectedHospital.name}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Admin</label>
                  <p className="text-gray-800 font-medium">
                    {selectedHospital.admin}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Status</label>
                  <div className="mt-1">
                    <StatusBadge status={selectedHospital.status} />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Total Users</label>
                  <p className="text-gray-800 font-medium">
                    {selectedHospital.users}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Created Date</label>
                  <p className="text-gray-800 font-medium">
                    {selectedHospital.created}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">
                    Monthly Revenue
                  </label>
                  <p className="text-gray-800 font-medium">
                    ${selectedHospital.revenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Hospital Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 border border-blue-300 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Add New Hospital
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Fill in the details to register a new hospital
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newHospital.name}
                  onChange={(e) =>
                    setNewHospital({ ...newHospital, name: e.target.value })
                  }
                  placeholder="Enter hospital name"
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newHospital.adminName}
                    onChange={(e) =>
                      setNewHospital({
                        ...newHospital,
                        adminName: e.target.value,
                      })
                    }
                    placeholder="Dr. John Doe"
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={newHospital.adminEmail}
                    onChange={(e) =>
                      setNewHospital({
                        ...newHospital,
                        adminEmail: e.target.value,
                      })
                    }
                    placeholder="admin@hospital.com"
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital Address
                </label>
                <input
                  type="text"
                  value={newHospital.address}
                  onChange={(e) =>
                    setNewHospital({ ...newHospital, address: e.target.value })
                  }
                  placeholder="123 Medical Center Drive"
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={newHospital.phone}
                    onChange={(e) =>
                      setNewHospital({ ...newHospital, phone: e.target.value })
                    }
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital Type
                  </label>
                  <select
                    value={newHospital.type}
                    onChange={(e) =>
                      setNewHospital({ ...newHospital, type: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="general">General Hospital</option>
                    <option value="specialty">Specialty Hospital</option>
                    <option value="clinic">Clinic</option>
                    <option value="research">Research Center</option>
                  </select>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Important Information:</p>
                    <ul className="list-disc list-inside space-y-1 text-blue-700">
                      <li>
                        The hospital will be created with "Pending" status
                      </li>
                      <li>Admin credentials will be sent via email</li>
                      <li>
                        You'll need to approve the hospital before it becomes
                        active
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleAddHospital}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
                >
                  Add Hospital
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminPanel;
