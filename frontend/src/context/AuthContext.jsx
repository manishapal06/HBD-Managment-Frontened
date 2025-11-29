
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // Simulate API call - Replace with actual API call
      // Example: const response = await fetch('/api/auth/login', {...})
      
      const mockUsers = [
        { 
          id: 1, 
          email: 'superadmin@hospital.com', 
          password: 'admin123',
          role: 'superadmin',
          name: 'Super Administrator',
          avatar: null
        },
        { 
          id: 2, 
          email: 'hospitaladmin@hospital.com', 
          password: 'admin123',
          role: 'hospitaladmin',
          name: 'Hospital Admin',
          hospitalId: 'H001',
          hospitalName: 'City General Hospital',
          avatar: null
        },
        { 
          id: 3, 
          email: 'nurse@hospital.com', 
          password: 'nurse123',
          role: 'nurse',
          name: 'Sarah Johnson',
          hospitalId: 'H001',
          department: 'Emergency',
          nurseId: 'N001',
          avatar: null
        },
        { 
          id: 4, 
          email: 'patient@hospital.com', 
          password: 'patient123',
          role: 'patient',
          name: 'John Doe',
          patientId: 'P001',
          dateOfBirth: '1990-05-15',
          bloodGroup: 'O+',
          avatar: null
        }
      ];

      const foundUser = mockUsers.find(
        u => u.email === email && u.password === password
      );

      if (foundUser) {
        // Remove password before storing
        const { password, ...userWithoutPassword } = foundUser;
        
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        
        return { 
          success: true, 
          user: userWithoutPassword 
        };
      } else {
        return { 
          success: false, 
          message: 'Invalid email or password' 
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: 'An error occurred during login. Please try again.' 
      };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Update user profile
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  // Get user's full name
  const getUserName = () => {
    return user?.name || 'User';
  };

  // Get user's role display name
  const getRoleDisplayName = () => {
    const roleMap = {
      superadmin: 'Super Administrator',
      hospitaladmin: 'Hospital Administrator',
      nurse: 'Nurse',
      patient: 'Patient'
    };
    return roleMap[user?.role] || 'User';
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
    hasRole,
    hasAnyRole,
    getUserName,
    getRoleDisplayName
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 