import React, { useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
  ]);

  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('User');
  const [newUserStatus, setNewUserStatus] = useState('Active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const roles = ['Admin', 'User', 'Manager'];
  const statuses = ['Active', 'Inactive'];

  const openModal = (user) => {
    if (user) {
      setEditingUserId(user.id);
      setNewUserName(user.name);
      setNewUserEmail(user.email);
      setNewUserRole(user.role);
      setNewUserStatus(user.status);
    } else {
      setEditingUserId(null);
      setNewUserName('');
      setNewUserEmail('');
      setNewUserRole('User');
      setNewUserStatus('Active');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: newUserStatus,
    };
    setUsers([...users, newUser]);
    closeModal();
  };

  const handleEditUser = () => {
    const updatedUsers = users.map((user) =>
      user.id === editingUserId
        ? { ...user, name: newUserName, email: newUserEmail, role: newUserRole, status: newUserStatus }
        : user
    );
    setUsers(updatedUsers);
    closeModal();
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <div className="user-management bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen py-8 px-6">
      <h2 className="text-3xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
        Manage Users
      </h2>

      <button
        onClick={() => openModal()}
        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition transform duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600"
      >
        Add New User
      </button>

      {/* Users Table */}
      <table className="min-w-full table-auto mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-purple-400 to-indigo-400">
          <tr>
            <th className="py-3 px-6 text-left text-white font-semibold">Name</th>
            <th className="py-3 px-6 text-left text-white font-semibold">Email</th>
            <th className="py-3 px-6 text-left text-white font-semibold">Role</th>
            <th className="py-3 px-6 text-left text-white font-semibold">Status</th>
            <th className="py-3 px-6 text-left text-white font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6">{user.name}</td>
              <td className="py-3 px-6">{user.email}</td>
              <td className="py-3 px-6">{user.role}</td>
              <td className="py-3 px-6">{user.status}</td>
              <td className="py-3 px-6">
                <button
                  onClick={() => openModal(user)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500 ml-2 transition duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-96 max-w-full animate__animated animate__fadeIn">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">{editingUserId ? 'Edit User' : 'Add New User'}</h3>

            {/* User Name Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-700">User Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="Enter user name"
              />
            </div>

            {/* User Email Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>

            {/* User Role Dropdown */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-700">Role</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value)}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* User Status Dropdown */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-700">Status</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                value={newUserStatus}
                onChange={(e) => setNewUserStatus(e.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-between space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-400 text-white py-2 px-6 rounded-md hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={editingUserId ? handleEditUser : handleAddUser}
                className="bg-gradient-to-r from-green-400 to-teal-500 text-white py-2 px-6 rounded-md hover:scale-105 transition transform duration-300"
              >
                {editingUserId ? 'Update User' : 'Add User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
