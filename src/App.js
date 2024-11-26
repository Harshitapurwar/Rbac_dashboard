import React from 'react';
import RoleManagement from './componenets/pages/RoleManagement';
import UserManagement from './componenets/pages/UserManagement';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Role-Based Access Control (RBAC) Admin Dashboard</h1>
        <UserManagement />
        <RoleManagement />
        
      </div>
    </div>
  );
}

export default App;
