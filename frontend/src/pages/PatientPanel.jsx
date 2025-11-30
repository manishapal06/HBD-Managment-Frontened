import React, { useState } from "react";
import {
  UserCircle,
  Calendar,
  FileText,
  Activity,
  Heart,
  Pill,
  ClipboardList,
  Clock,
  Plus,
  Search,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Phone,
  Mail,
  MapPin,
  Stethoscope,
  Building2,
} from "lucide-react";

const PatientPanel = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showBookAppointment, setShowBookAppointment] = useState(false);

  const [patientInfo] = useState({
    name: "John Smith",
    age: 45,
    gender: "Male",
    bloodType: "O+",
    phone: "+1 (555) 123-4567",
    email: "john.smith@email.com",
    address: "123 Main Street, New York, NY 10001",
    allergies: ["Penicillin", "Latex"],
    chronicConditions: ["Hypertension", "Type 2 Diabetes"],
  });

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "2024-12-05",
      time: "10:00 AM",
      status: "confirmed",
      department: "Cardiology",
      reason: "Regular checkup",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "General Physician",
      date: "2024-11-25",
      time: "02:30 PM",
      status: "completed",
      department: "General Medicine",
      reason: "Follow-up",
    },
    {
      id: 3,
      doctor: "Dr. Emily Davis",
      specialty: "Endocrinologist",
      date: "2024-12-10",
      time: "11:30 AM",
      status: "pending",
      department: "Endocrinology",
      reason: "Diabetes management",
    },
  ]);

  const [medicalRecords] = useState([
    {
      id: 1,
      type: "Lab Report",
      title: "Blood Test Results",
      date: "2024-11-20",
      doctor: "Dr. Sarah Johnson",
      department: "Laboratory",
      summary: "Complete blood count and metabolic panel",
      status: "Normal",
    },
    {
      id: 2,
      type: "Prescription",
      title: "Medication Prescription",
      date: "2024-11-15",
      doctor: "Dr. Michael Chen",
      department: "General Medicine",
      summary: "Blood pressure medications",
      status: "Active",
    },
    {
      id: 3,
      type: "Imaging",
      title: "X-Ray Report",
      date: "2024-11-10",
      doctor: "Dr. Robert Williams",
      department: "Radiology",
      summary: "Chest X-ray examination",
      status: "Normal",
    },
    {
      id: 4,
      type: "Consultation",
      title: "Cardiology Consultation",
      date: "2024-11-05",
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      summary: "Routine cardiac assessment",
      status: "Completed",
    },
  ]);

  const [prescriptions] = useState([
    {
      id: 1,
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribedBy: "Dr. Michael Chen",
      instructions: "Take in the morning",
    },
    {
      id: 2,
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      prescribedBy: "Dr. Emily Davis",
      instructions: "Take with meals",
    },
    {
      id: 3,
      medication: "Aspirin",
      dosage: "81mg",
      frequency: "Once daily",
      prescribedBy: "Dr. Sarah Johnson",
      instructions: "Take after breakfast",
    },
  ]);

  const [newAppointment, setNewAppointment] = useState({
    department: "",
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });

  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      department: "Cardiology",
    },
    {
      name: "Dr. Michael Chen",
      specialty: "General Physician",
      department: "General Medicine",
    },
    {
      name: "Dr. Emily Davis",
      specialty: "Endocrinologist",
      department: "Endocrinology",
    },
    {
      name: "Dr. Robert Williams",
      specialty: "Orthopedic Surgeon",
      department: "Orthopedics",
    },
  ];

  const departments = [...new Set(doctors.map((d) => d.department))];

  const handleBookAppointment = () => {
    if (
      !newAppointment.department ||
      !newAppointment.doctor ||
      !newAppointment.date ||
      !newAppointment.time ||
      !newAppointment.reason
    ) {
      alert("Please fill in all fields!");
      return;
    }
    const doctor = doctors.find((d) => d.name === newAppointment.doctor);
    const appointment = {
      id: appointments.length + 1,
      ...newAppointment,
      specialty: doctor.specialty,
      status: "pending",
    };
    setAppointments([...appointments, appointment]);
    setNewAppointment({
      department: "",
      doctor: "",
      date: "",
      time: "",
      reason: "",
    });
    setShowBookAppointment(false);
    alert("Appointment booked successfully!");
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      confirmed: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      completed: "bg-blue-100 text-blue-700",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
      >
        {status.toUpperCase()}
      </span>
    );
  };

  const RecordTypeBadge = ({ type }) => {
    const styles = {
      "Lab Report": "bg-purple-100 text-purple-700",
      Prescription: "bg-green-100 text-green-700",
      Imaging: "bg-blue-100 text-blue-700",
      Consultation: "bg-orange-100 text-orange-700",
    };
    return (
      <span
        className={`px-3 py-1 rounded-lg text-xs font-semibold ${styles[type]}`}
      >
        {type}
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
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <UserCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Patient Portal
                </h1>
                <p className="text-sm text-orange-600">
                  Medical Records & Appointments
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-lg border border-orange-300">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-orange-700 font-medium">
                {patientInfo.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex space-x-1 bg-white rounded-lg p-1 border border-blue-200 shadow-sm">
          {["overview", "appointments", "records", "prescriptions"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  activeTab === tab
                    ? "bg-orange-600 text-white shadow-md"
                    : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="max-w-7xl mx-auto px-6 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Personal Information
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Full Name</label>
                    <p className="font-medium text-gray-800">
                      {patientInfo.name}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-gray-500">Age</label>
                      <p className="font-medium text-gray-800">
                        {patientInfo.age} years
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">
                        Blood Type
                      </label>
                      <p className="font-medium text-gray-800">
                        {patientInfo.bloodType}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-blue-200">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <Phone className="w-4 h-4" />
                      <span>{patientInfo.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{patientInfo.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Health Summary
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Allergies</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {patientInfo.allergies.map((a, i) => (
                        <span
                          key={i}
                          className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Chronic Conditions
                    </label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {patientInfo.chronicConditions.map((c, i) => (
                        <span
                          key={i}
                          className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setShowBookAppointment(true)}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all"
                >
                  <Calendar className="w-8 h-8 mb-2" />
                  <h3 className="text-lg font-bold mb-1">Book Appointment</h3>
                  <p className="text-sm text-orange-100">Schedule a visit</p>
                </button>
                <button
                  onClick={() => setActiveTab("records")}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all"
                >
                  <FileText className="w-8 h-8 mb-2" />
                  <h3 className="text-lg font-bold mb-1">Medical Records</h3>
                  <p className="text-sm text-blue-100">View records</p>
                </button>
              </div>

              <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Upcoming Appointments
                </h2>
                <div className="space-y-3">
                  {appointments
                    .filter((a) => a.status !== "completed")
                    .map((a) => (
                      <div
                        key={a.id}
                        className="bg-blue-50 rounded-lg p-4 border border-blue-200"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {a.doctor}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {a.specialty}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              <span>{a.date}</span>
                              <span>{a.time}</span>
                            </div>
                          </div>
                          <StatusBadge status={a.status} />
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Active Prescriptions
                </h2>
                <div className="space-y-3">
                  {prescriptions.map((p) => (
                    <div
                      key={p.id}
                      className="bg-green-50 rounded-lg p-4 border border-green-200 flex items-start space-x-3"
                    >
                      <Pill className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {p.medication}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {p.dosage} • {p.frequency}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Appointments Tab */}
      {activeTab === "appointments" && (
        <div className="max-w-7xl mx-auto px-6 pb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              My Appointments
            </h2>
            <button
              onClick={() => setShowBookAppointment(true)}
              className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Book Appointment</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((a) => (
              <div
                key={a.id}
                className="bg-white rounded-xl border border-blue-200 shadow-sm p-6"
              >
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{a.doctor}</h3>
                    <p className="text-sm text-gray-600">{a.specialty}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4" />
                    <span>{a.department}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{a.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{a.time}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-blue-200">
                  <StatusBadge status={a.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Medical Records Tab */}
      {activeTab === "records" && (
        <div className="max-w-7xl mx-auto px-6 pb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Medical Records
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {medicalRecords.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-xl border border-blue-200 shadow-sm p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <RecordTypeBadge type={r.type} />
                  <span className="text-xs text-gray-500">{r.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {r.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{r.summary}</p>
                <div className="flex items-center justify-between pt-4 border-t border-blue-200">
                  <span className="text-sm font-medium text-gray-600">
                    Status: <span className="text-green-600">{r.status}</span>
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prescriptions Tab */}
      {activeTab === "prescriptions" && (
        <div className="max-w-7xl mx-auto px-6 pb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Active Prescriptions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prescriptions.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl border border-blue-200 shadow-sm p-6"
              >
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <Pill className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {p.medication}
                    </h3>
                    <p className="text-sm text-gray-600">{p.dosage}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <label className="text-gray-500">Frequency</label>
                    <p className="font-medium text-gray-800">{p.frequency}</p>
                  </div>
                  <div>
                    <label className="text-gray-500">Instructions</label>
                    <p className="font-medium text-gray-800">
                      {p.instructions}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-blue-200 text-xs text-gray-600">
                    Prescribed by {p.prescribedBy}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Book Appointment Modal */}
      {showBookAppointment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 border border-blue-300 shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Book Appointment
              </h3>
              <button
                onClick={() => setShowBookAppointment(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <select
                  value={newAppointment.department}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      department: e.target.value,
                      doctor: "",
                    })
                  }
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doctor
                </label>
                <select
                  value={newAppointment.doctor}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      doctor: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={!newAppointment.department}
                >
                  <option value="">Select Doctor</option>
                  {doctors
                    .filter((d) => d.department === newAppointment.department)
                    .map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name} - {d.specialty}
                      </option>
                    ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        date: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        time: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason
                </label>
                <textarea
                  value={newAppointment.reason}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      reason: e.target.value,
                    })
                  }
                  placeholder="Brief description..."
                  rows="3"
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleBookAppointment}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Book Appointment
                </button>
                <button
                  onClick={() => setShowBookAppointment(false)}
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

export default PatientPanel;
