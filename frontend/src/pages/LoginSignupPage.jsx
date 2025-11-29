import React, { useState } from 'react';
import { Building2, Mail, Lock, User, Phone, Eye, EyeOff, AlertCircle, CheckCircle, UserCircle, Shield, Stethoscope, Users } from 'lucide-react';

const LoginSignupPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    hospitalName: '',
    age: '',
    gender: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const roles = [
    {
      id: 'SUPER_ADMIN',
      title: 'Super Admin',
      description: 'Platform-wide management & control',
      icon: Shield,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-300',
      hoverBorder: 'hover:border-purple-500'
    },
    {
      id: 'HOSPITAL_ADMIN',
      title: 'Hospital Admin',
      description: 'Manage hospital operations & staff',
      icon: Building2,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-300',
      hoverBorder: 'hover:border-blue-500'
    },
    {
      id: 'NURSE',
      title: 'Nurse',
      description: 'Patient care & medical records',
      icon: Stethoscope,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-300',
      hoverBorder: 'hover:border-green-500'
    },
    {
      id: 'PATIENT',
      title: 'Patient',
      description: 'Access medical records & appointments',
      icon: UserCircle,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      borderColor: 'border-orange-300',
      hoverBorder: 'hover:border-orange-500'
    }
  ];

  const getCurrentRole = () => roles.find(r => r.id === selectedRole);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      
      if (selectedRole === 'HOSPITAL_ADMIN' && !formData.hospitalName) {
        newErrors.hospitalName = 'Hospital name is required';
      }
      
      if (selectedRole === 'PATIENT') {
        if (!formData.age) {
          newErrors.age = 'Age is required';
        }
        if (!formData.gender) {
          newErrors.gender = 'Gender is required';
        }
      }
      
      if (selectedRole !== 'SUPER_ADMIN' && !formData.phone) {
        newErrors.phone = 'Phone number is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const roleTitle = getCurrentRole()?.title;
      if (isLogin) {
        console.log('Login:', { ...formData, role: selectedRole });
        setSuccess(true);
        setTimeout(() => {
          alert(${roleTitle} login successful! Redirecting to dashboard...);
          setSuccess(false);
        }, 1500);
      } else {
        console.log('Signup:', { ...formData, role: selectedRole });
        setSuccess(true);
        setTimeout(() => {
          alert(${roleTitle} account created successfully!);
          setSuccess(false);
          setIsLogin(true);
        }, 1500);
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: '',
      hospitalName: '',
      age: '',
      gender: '',
      address: ''
    });
    setErrors({});
    setSuccess(false);
  };

  const handleBack = () => {
    setSelectedRole(null);
    setIsLogin(true);
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: '',
      hospitalName: '',
      age: '',
      gender: '',
      address: ''
    });
    setErrors({});
    setSuccess(false);
  };

  // Role Selection Screen
  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">HealthCare</h1>
                <p className="text-blue-600 font-medium">Management System</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome! Select Your Role</h2>
            <p className="text-gray-600">Choose your role to continue to login or sign up</p>
          </div>

          {/* Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={bg-white rounded-xl p-6 border-2 ${role.borderColor} ${role.hoverBorder} hover:shadow-lg transition-all group}
                >
                  <div className={w-16 h-16 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{role.title}</h3>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </button>
              );
            })}
          </div>

          { Info Section }
          <div className="mt-12 bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Multi-Tenant Healthcare Platform</h3>
                <p className="text-sm text-gray-600">
                  Our platform provides role-based access control with isolated data for each hospital. 
                  Super Admins manage the entire platform, Hospital Admins manage their facilities, 
                  Nurses handle patient care, and Patients access their medical records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Login/Signup Form
  const currentRole = getCurrentRole();
  const Icon = currentRole.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-8">
          
          {/* Back Button & Header */}
          <button
            onClick={handleBack}
            className="text-sm text-blue-600 hover:text-blue-700 mb-4 flex items-center"
          >
            ← Back to role selection
          </button>

          {/* Role Badge */}
          <div className={${currentRole.bgColor} rounded-lg p-4 mb-6 border ${currentRole.borderColor}}>
            <div className="flex items-center space-x-3">
              <div className={w-12 h-12 bg-gradient-to-br ${currentRole.color} rounded-lg flex items-center justify-center}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{currentRole.title}</h3>
                <p className="text-sm text-gray-600">{currentRole.description}</p>
              </div>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex space-x-1 bg-blue-50 rounded-lg p-1 mb-6">
            <button
              onClick={() => {
                setIsLogin(true);
                setErrors({});
                setSuccess(false);
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                isLogin
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setErrors({});
                setSuccess(false);
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                !isLogin
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-800 font-medium">
                {isLogin ? 'Login successful!' : 'Account created successfully!'}
              </p>
            </div>
          )}

          {/* Form Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {isLogin 
                ? 'Enter your credentials to continue' 
                : Register as ${currentRole.title}}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            
            {/* Name (Signup only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={w-full pl-10 pr-4 py-2 border ${errors.name ? 'border-red-300' : 'border-blue-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" /> {errors.name}
                  </p>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={w-full pl-10 pr-4 py-2 border ${errors.email ? 'border-red-300' : 'border-blue-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" /> {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={w-full pl-10 pr-12 py-2 border ${errors.password ? 'border-red-300' : 'border-blue-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" /> {errors.password}
                </p>
              )}
            </div>

            {/* Hospital Name (Hospital Admin Signup only) */}
            {!isLogin && selectedRole === 'HOSPITAL_ADMIN' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    placeholder="Enter hospital name"
                    className={w-full pl-10 pr-4 py-2 border ${errors.hospitalName ? 'border-red-300' : 'border-blue-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500}
                  />
                </div>
                {errors.hospitalName && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" /> {errors.hospitalName}
                  </p>
                )}
              </div>
            )}

            {/* Phone (Signup only, except Super Admin) */}
            {!isLogin && selectedRole !== 'SUPER_ADMIN' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className={w-full pl-10 pr-4 py-2 border ${errors.phone ? 'border-red-300' : 'border-blue-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" /> {errors.phone}
                  </p>
                )}
              </div>
            )}

            {/* Patient Specific Fields */}
            {!isLogin && selectedRole === 'PATIENT' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Age"
                      className={w-full px-4 py-2 border ${errors.age ? 'border-red-300' : 'border-blue-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500}
                    />
                    {errors.age && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" /> {errors.age}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={w-full px-4 py-2 border ${errors.gender ? 'border-red-300' : 'border-blue-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" /> {errors.gender}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    rows="2"
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {/* Forgot Password (Login only) */}
            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className={w-full bg-gradient-to-r ${currentRole.color} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all}
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </div>

          {/* Additional Info */}
          {selectedRole === 'SUPER_ADMIN' && !isLogin && (
            <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-purple-800">
                  Super Admin accounts require special approval. Contact the platform administrator for access.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;