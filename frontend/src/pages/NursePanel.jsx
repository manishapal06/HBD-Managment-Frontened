import React, { useState } from 'react';
import { Stethoscope, Users, FileText, Activity, Heart, Thermometer, Droplet, Calendar, Clock, Plus, Search, Eye, Edit, AlertCircle, CheckCircle, XCircle, Pill, Syringe, ClipboardList, TrendingUp, User, Phone, Mail } from 'lucide-react';

const NursePanel = () => {
  const [activeTab, setActiveTab] = useState('patients');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddVitals, setShowAddVitals] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Smith',
      age: 45,
      gender: 'Male',
      room: '201A',
      status: 'stable',
      admissionDate: '2024-11-20',
      condition: 'Post-surgery recovery',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@email.com',
      bloodType: 'O+',
      allergies: ['Penicillin', 'Latex'],
      vitals: {
        temperature: '98.6°F',
        bloodPressure: '120/80',
        heartRate: '72 bpm',
        oxygenLevel: '98%',
        lastUpdated: '2 hours ago'
      },
      medications: [
        { name: 'Ibuprofen', dosage: '400mg', frequency: 'Every 6 hours', time: '08:00 AM' },
        { name: 'Antibiotics', dosage: '500mg', frequency: 'Twice daily', time: '09:00 AM' }
      ],
      notes: [
        { date: '2024-11-28 10:30', nurse: 'Sarah Johnson', note: 'Patient responding well to treatment. Pain level decreased to 3/10.' },
        { date: '2024-11-28 06:00', nurse: 'Sarah Johnson', note: 'Morning vitals taken. Patient rested well overnight.' }
      ]
    },
    {
      id: 2,
      name: 'Mary Johnson',
      age: 62,
      gender: 'Female',
      room: '203B',
      status: 'critical',
      admissionDate: '2024-11-25',
      condition: 'Cardiac monitoring',
      phone: '+1 (555) 234-5678',
      email: 'mary.j@email.com',
      bloodType: 'A+',
      allergies: ['Aspirin'],
      vitals: {
        temperature: '99.2°F',
        bloodPressure: '140/95',
        heartRate: '88 bpm',
        oxygenLevel: '94%',
        lastUpdated: '30 minutes ago'
      },
      medications: [
        { name: 'Beta Blockers', dosage: '25mg', frequency: 'Once daily', time: '08:00 AM' },
        { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily', time: '08:00 AM' }
      ],
      notes: [
        { date: '2024-11-28 11:00', nurse: 'Sarah Johnson', note: 'Blood pressure elevated. Doctor notified.' }
      ]
    },
    {
      id: 3,
      name: 'Robert Williams',
      age: 38,
      gender: 'Male',
      room: '205A',
      status: 'stable',
      admissionDate: '2024-11-27',
      condition: 'Pneumonia treatment',
      phone: '+1 (555) 345-6789',
      email: 'rob.w@email.com',
      bloodType: 'B+',
      allergies: ['None'],
      vitals: {
        temperature: '100.4°F',
        bloodPressure: '118/75',
        heartRate: '76 bpm',
        oxygenLevel: '96%',
        lastUpdated: '1 hour ago'
      },
      medications: [
        { name: 'Antibiotics', dosage: '750mg', frequency: 'Three times daily', time: '08:00 AM' }
      ],
      notes: [
        { date: '2024-11-28 09:00', nurse: 'Sarah Johnson', note: 'Temperature slightly elevated. Continue monitoring.' }
      ]
    },
    {
      id: 4,
      name: 'Linda Davis',
      age: 55,
      gender: 'Female',
      room: '202B',
      status: 'recovering',
      admissionDate: '2024-11-22',
      condition: 'Diabetes management',
      phone: '+1 (555) 456-7890',
      email: 'linda.d@email.com',
      bloodType: 'AB+',
      allergies: ['Sulfa drugs'],
      vitals: {
        temperature: '98.4°F',
        bloodPressure: '125/82',
        heartRate: '70 bpm',
        oxygenLevel: '99%',
        lastUpdated: '3 hours ago'
      },
      medications: [
        { name: 'Insulin', dosage: '10 units', frequency: 'Before meals', time: '07:30 AM' },
        { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', time: '08:00 AM' }
      ],
      notes: [
        { date: '2024-11-28 08:00', nurse: 'Sarah Johnson', note: 'Blood sugar levels stable. Patient feeling better.' }
      ]
    }
  ]);

  const [newVitals, setNewVitals] = useState({
    temperature: '',
    bloodPressure: '',
    heartRate: '',
    oxygenLevel: ''
  });

  const [newNote, setNewNote] = useState('');

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddVitals = () => {
    if (!selectedPatient) return;
    
    const updatedPatients = patients.map(p => {
      if (p.id === selectedPatient.id) {
        return {
          ...p,
          vitals: {
            temperature: newVitals.temperature || p.vitals.temperature,
            bloodPressure: newVitals.bloodPressure || p.vitals.bloodPressure,
            heartRate: newVitals.heartRate || p.vitals.heartRate,
            oxygenLevel: newVitals.oxygenLevel || p.vitals.oxygenLevel,
            lastUpdated: 'Just now'
          }
        };
      }
      return p;
    });
    
    setPatients(updatedPatients);
    setSelectedPatient(updatedPatients.find(p => p.id === selectedPatient.id));
    setNewVitals({ temperature: '', bloodPressure: '', heartRate: '', oxygenLevel: '' });
    setShowAddVitals(false);
    alert('Vitals updated successfully!');
  };

   const handleAddNote = () => {
    if (!selectedPatient || !newNote.trim()) return;
    
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const updatedPatients = patients.map(p => {
      if (p.id === selectedPatient.id) {
        return {
          ...p,
          notes: [
            { date: dateStr, nurse: 'Sarah Johnson', note: newNote },
            ...p.notes
          ]
        };
      }
      return p;
    });
    
    setPatients(updatedPatients);
    setSelectedPatient(updatedPatients.find(p => p.id === selectedPatient.id));
    setNewNote('');
    setShowAddNote(false);
    alert('Note added successfully!');
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      stable: 'bg-green-100 text-green-700 border-green-300',
      critical: 'bg-red-100 text-red-700 border-red-300',
      recovering: 'bg-blue-100 text-blue-700 border-blue-300'
    };
    
    const icons = {
      stable: <CheckCircle className="w-3 h-3" />,
      critical: <AlertCircle className="w-3 h-3" />,
      recovering: <Activity className="w-3 h-3" />
    };
    
     return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center space-x-1 ${styles[status]}`}>
        {icons[status]}
        <span>{status.toUpperCase()}</span>
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
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Nurse Dashboard</h1>
                <p className="text-sm text-green-600">Patient Care & Medical Records</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg border border-green-300">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-700 font-medium">Nurse Sarah Johnson</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800">{patients.length}</div>
            <div className="text-sm text-gray-600">Total Patients</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-green-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {patients.filter(p => p.status === 'stable').length}
            </div>
            <div className="text-sm text-gray-600">Stable Patients</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-red-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {patients.filter(p => p.status === 'critical').length}
            </div>
            <div className="text-sm text-gray-600">Critical Patients</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-orange-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {patients.filter(p => p.status === 'recovering').length}
            </div>
            <div className="text-sm text-gray-600">Recovering</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Patient List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Patients</h2>
                <Users className="w-5 h-5 text-blue-600" />
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Patient Cards */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredPatients.map(patient => (
                  <button
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedPatient?.id === patient.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-blue-200 hover:border-green-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">{patient.name}</h3>
                        <p className="text-sm text-gray-600">Room {patient.room}</p>
                      </div>
                      <StatusBadge status={patient.status} />
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>{patient.condition}</p>
                      <p className="text-xs text-gray-500 mt-1">{patient.age} years • {patient.gender}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="lg:col-span-2">
            {selectedPatient ? (
              <div className="space-y-6">
                
                {/* Patient Info */}
                <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selectedPatient.name}</h2>
                      <p className="text-gray-600">{selectedPatient.condition}</p>
                    </div>
                    <StatusBadge status={selectedPatient.status} />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    <div>
                      <label className="text-sm text-gray-500">Age</label>
                      <p className="font-medium text-gray-800">{selectedPatient.age} years</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Gender</label>
                      <p className="font-medium text-gray-800">{selectedPatient.gender}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Room</label>
                      <p className="font-medium text-gray-800">{selectedPatient.room}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Blood Type</label>
                      <p className="font-medium text-gray-800">{selectedPatient.bloodType}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Admitted</label>
                      <p className="font-medium text-gray-800">{selectedPatient.admissionDate}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Allergies</label>
                      <p className="font-medium text-gray-800">{selectedPatient.allergies.join(', ')}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{selectedPatient.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{selectedPatient.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vital Signs */}
                <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Vital Signs</h3>
                    <button
                      onClick={() => setShowAddVitals(true)}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Update Vitals</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                      <Thermometer className="w-6 h-6 text-red-600 mb-2" />
                      <div className="text-sm text-gray-600">Temperature</div>
                      <div className="text-xl font-bold text-gray-800">{selectedPatient.vitals.temperature}</div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <Activity className="w-6 h-6 text-purple-600 mb-2" />
                      <div className="text-sm text-gray-600">Blood Pressure</div>
                      <div className="text-xl font-bold text-gray-800">{selectedPatient.vitals.bloodPressure}</div>
                    </div>

                    <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                      <Heart className="w-6 h-6 text-pink-600 mb-2" />
                      <div className="text-sm text-gray-600">Heart Rate</div>
                      <div className="text-xl font-bold text-gray-800">{selectedPatient.vitals.heartRate}</div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <Droplet className="w-6 h-6 text-blue-600 mb-2" />
                      <div className="text-sm text-gray-600">Oxygen Level</div>
                      <div className="text-xl font-bold text-gray-800">{selectedPatient.vitals.oxygenLevel}</div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-4">Last updated: {selectedPatient.vitals.lastUpdated}</p>
                </div>

                {/* Medications */}
                <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Medications</h3>
                    <Pill className="w-5 h-5 text-blue-600" />
                  </div>

                  <div className="space-y-3">
                    {selectedPatient.medications.map((med, index) => (
                      <div key={index} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-800">{med.name}</h4>
                            <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
                          </div>
                          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                            {med.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nursing Notes */}
                <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Nursing Notes</h3>
                    <button
                      onClick={() => setShowAddNote(true)}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Note</span>
                    </button>
                  </div>

                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {selectedPatient.notes.map((note, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-800">{note.nurse}</span>
                          </div>
                          <span className="text-xs text-gray-500">{note.date}</span>
                        </div>
                        <p className="text-sm text-gray-700">{note.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-12 text-center">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Patient Selected</h3>
                <p className="text-gray-500">Select a patient from the list to view their details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Vitals Modal */}
      {showAddVitals && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 border border-blue-300 shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Update Vital Signs</h3>
              <button
                onClick={() => setShowAddVitals(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Temperature (°F)</label>
                <input
                  type="text"
                  value={newVitals.temperature}
                  onChange={(e) => setNewVitals({...newVitals, temperature: e.target.value})}
                  placeholder="98.6"
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Pressure</label>
                <input
                  type="text"
                  value={newVitals.bloodPressure}
                  onChange={(e) => setNewVitals({...newVitals, bloodPressure: e.target.value})}
                  placeholder="120/80"
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Heart Rate (bpm)</label>
                <input
                  type="text"
                  value={newVitals.heartRate}
                  onChange={(e) => setNewVitals({...newVitals, heartRate: e.target.value})}
                  placeholder="72"
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Oxygen Level (%)</label>
                <input
                  type="text"
                  value={newVitals.oxygenLevel}
                  onChange={(e) => setNewVitals({...newVitals, oxygenLevel: e.target.value})}
                  placeholder="98"
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleAddVitals}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Update Vitals
                </button>
                <button
                  onClick={() => setShowAddVitals(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showAddNote && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 border border-blue-300 shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Add Nursing Note</h3>
              <button
                onClick={() => setShowAddNote(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Enter your observation or note..."
                  rows="6"
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleAddNote}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Add Note
                </button>
                <button
                  onClick={() => setShowAddNote(false)}
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

export default NursePanel;