import React, { useState } from "react";
import {
  Stethoscope,
  Users,
  UserPlus,
  Activity,
  Calendar,
  CheckCircle,
  XCircle,
  Search,
  Eye,
  Trash2,
  AlertCircle,
  UserCheck,
  Ban,
  LogOut,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const HospitalAdminPanel = () => {
  const { logout } = useAuth();

  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Dummy data (replace later with API)
  const [nurses, setNurses] = useState([
    {
      id: 1,
      name: "Nurse Emma Stone",
      email: "emma@nurse.com",
      status: "active",
      patients: 24,
      lastLogin: "2024-11-29",
    },
    {
      id: 2,
      name: "Nurse David Miller",
      email: "david@nurse.com",
      status: "active",
      patients: 18,
      lastLogin: "2024-11-28",
    },
    {
      id: 3,
      name: "Nurse Priya Singh",
      email: "priya@nurse.com",
      status: "suspended",
      patients: 0,
      lastLogin: "2024-10-20",
    },
  ]);

  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 32,
      illness: "Fever",
      admitted: "2024-11-28",
      status: "active",
    },
    {
      id: 2,
      name: "Lisa Harper",
      age: 45,
      illness: "Diabetes",
      admitted: "2024-11-25",
      status: "active",
    },
    {
      id: 3,
      name: "Michael Lee",
      age: 60,
      illness: "Heart Issue",
      admitted: "2024-11-20",
      status: "discharged",
    },
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 101,
      patient: "John Doe",
      nurse: "Nurse Emma Stone",
      date: "2024-11-29",
      status: "scheduled",
    },
    {
      id: 102,
      patient: "Lisa Harper",
      nurse: "Nurse David Miller",
      date: "2024-11-28",
      status: "completed",
    },
    {
      id: 103,
      patient: "Michael Lee",
      nurse: "Nurse Priya Singh",
      date: "2024-11-20",
      status: "cancelled",
    },
  ]);

  const [newNurse, setNewNurse] = useState({
    name: "",
    email: "",
  });

  // Badge Component
  const StatusBadge = ({ status }) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      scheduled: "bg-blue-100 text-blue-800",
      completed: "bg-gray-200 text-gray-700",
      cancelled: "bg-red-100 text-red-800",
      suspended: "bg-red-100 text-red-800",
      discharged: "bg-yellow-100 text-yellow-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
      >
        {status.toUpperCase()}
      </span>
    );
  };

  // Add Nurse
  const handleAddNurse = () => {
    if (!newNurse.name || !newNurse.email) {
      alert("Please fill in all fields.");
      return;
    }

    const nurse = {
      id: nurses.length + 1,
      name: newNurse.name,
      email: newNurse.email,
      status: "active",
      patients: 0,
      lastLogin: "Never",
    };

    setNurses([...nurses, nurse]);
    setNewNurse({ name: "", email: "" });
    setShowAddModal(false);
    alert("Nurse added successfully!");
  };

  // Suspend Nurse
  const suspendNurse = (id) => {
    setNurses(
      nurses.map((n) => (n.id === id ? { ...n, status: "suspended" } : n))
    );
  };

  // Activate Nurse
  const activateNurse = (id) => {
    setNurses(
      nurses.map((n) => (n.id === id ? { ...n, status: "active" } : n))
    );
  };

  // Delete Nurse
  const deleteNurse = (id) => {
    if (confirm("Are you sure you want to delete this nurse?")) {
      setNurses(nurses.filter((n) => n.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* HEADER */}
      <div className="bg-white shadow-md border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Hospital Admin Dashboard
              </h1>
              <p className="text-sm text-blue-600">
                Manage nurses, patients & appointments
              </p>
            </div>
          </div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={logout}
            className="flex items-center space-x-2 bg-red-100 px-4 py-2 rounded-lg text-red-700 hover:bg-red-200 transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-7xl mx-auto px-6 pt-4">
        <div className="flex space-x-1 bg-white rounded-lg p-1 border border-blue-200 shadow-sm">
          {["overview", "nurses", "patients", "appointments"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              {tab[0].toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* -------------------------------------- */}
      {/* 1️⃣ OVERVIEW */}
      {/* -------------------------------------- */}
      {activeTab === "overview" && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              title="Total Nurses"
              icon={<Users />}
              value={nurses.length}
              color="blue"
            />
            <Card
              title="Total Patients"
              icon={<Activity />}
              value={patients.length}
              color="green"
            />
            <Card
              title="Active Appointments"
              icon={<Calendar />}
              value={
                appointments.filter((a) => a.status === "scheduled").length
              }
              color="yellow"
            />
            <Card
              title="Completed"
              icon={<CheckCircle />}
              value={
                appointments.filter((a) => a.status === "completed").length
              }
              color="purple"
            />
          </div>
        </div>
      )}

      {/* -------------------------------------- */}
      {/* 2️⃣ NURSE MANAGEMENT */}
      {/* -------------------------------------- */}
      {activeTab === "nurses" && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Nurses</h2>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search nurses..."
                  className="pl-10 pr-4 py-2 border border-blue-300 rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Add Nurse */}
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm"
              >
                <UserPlus className="w-5 h-5" />
                <span>Add Nurse</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nurses
              .filter((n) =>
                n.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((nurse) => (
                <div
                  key={nurse.id}
                  className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm hover:border-blue-400 transition-all"
                >
                  <div className="flex justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {nurse.name}
                      </h3>
                      <p className="text-sm text-gray-500">{nurse.email}</p>
                    </div>
                    <StatusBadge status={nurse.status} />
                  </div>

                  <div className="text-sm space-y-1">
                    <p>
                      <span className="font-medium">Patients:</span>{" "}
                      {nurse.patients}
                    </p>
                    <p>
                      <span className="font-medium">Last Login:</span>{" "}
                      {nurse.lastLogin}
                    </p>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    {nurse.status === "active" && (
                      <button
                        onClick={() => suspendNurse(nurse.id)}
                        className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg hover:bg-red-200"
                      >
                        Suspend
                      </button>
                    )}

                    {nurse.status === "suspended" && (
                      <button
                        onClick={() => activateNurse(nurse.id)}
                        className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg hover:bg-green-200"
                      >
                        Activate
                      </button>
                    )}

                    <button
                      onClick={() => deleteNurse(nurse.id)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* -------------------------------------- */}
      {/* 3️⃣ PATIENT MANAGEMENT */}
      {/* -------------------------------------- */}
      {activeTab === "patients" && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Patients</h2>

          <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-50">
                <tr>
                  <Th text="Name" />
                  <Th text="Age" />
                  <Th text="Illness" />
                  <Th text="Admitted" />
                  <Th text="Status" />
                  <Th text="Actions" />
                </tr>
              </thead>

              <tbody className="divide-y divide-blue-100">
                {patients
                  .filter((p) =>
                    p.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((p) => (
                    <tr key={p.id} className="hover:bg-blue-50 transition">
                      <Td text={p.name} />
                      <Td text={p.age} />
                      <Td text={p.illness} />
                      <Td text={p.admitted} />
                      <td className="px-6 py-4">
                        <StatusBadge status={p.status} />
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* -------------------------------------- */}
      {/* 4️⃣ APPOINTMENTS */}
      {/* -------------------------------------- */}
      {activeTab === "appointments" && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Appointments
          </h2>

          <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-50">
                <tr>
                  <Th text="ID" />
                  <Th text="Patient" />
                  <Th text="Nurse" />
                  <Th text="Date" />
                  <Th text="Status" />
                </tr>
              </thead>

              <tbody className="divide-y divide-blue-100">
                {appointments
                  .filter((a) =>
                    a.patient.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((a) => (
                    <tr key={a.id} className="hover:bg-blue-50 transition">
                      <Td text={a.id} />
                      <Td text={a.patient} />
                      <Td text={a.nurse} />
                      <Td text={a.date} />
                      <td className="px-6 py-4">
                        <StatusBadge status={a.status} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* -------------------------------------- */}
      {/* Add Nurse Modal */}
      {/* -------------------------------------- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 border border-blue-300 shadow-xl">
            <div className="flex justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Add New Nurse
              </h3>
              <button onClick={() => setShowAddModal(false)}>
                <XCircle className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <div className="space-y-4">
              <InputField
                label="Nurse Name"
                value={newNurse.name}
                onChange={(e) =>
                  setNewNurse({ ...newNurse, name: e.target.value })
                }
              />

              <InputField
                label="Email"
                value={newNurse.email}
                onChange={(e) =>
                  setNewNurse({ ...newNurse, email: e.target.value })
                }
              />

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleAddNurse}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-sm"
                >
                  Add Nurse
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
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

/* ----------------------------- */
/* Reusable Components           */
/* ----------------------------- */

const Card = ({ title, icon, value, color }) => {
  const bg = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    yellow: "from-yellow-500 to-yellow-600",
    purple: "from-purple-500 to-purple-600",
  };

  return (
    <div className={`bg-gradient-to-br ${bg[color]} rounded-xl p-6 shadow-lg`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-white/90">{icon}</div>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-white text-sm">{title}</div>
    </div>
  );
};

const Th = ({ text }) => (
  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
    {text}
  </th>
);

const Td = ({ text }) => <td className="px-6 py-4 text-gray-700">{text}</td>;

const InputField = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default HospitalAdminPanel;
