import React, { useState } from 'react';

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'User', permissions: ['Read'] },
  ]);

  const [newRoleName, setNewRoleName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null); // State to track the role being edited

  const permissions = ['Read', 'Write', 'Delete']; // Example permissions

  const openModal = (role) => {
    if (role) {
      setEditingRoleId(role.id);
      setNewRoleName(role.name);
      setSelectedPermissions(role.permissions);
    } else {
      setEditingRoleId(null);
      setNewRoleName('');
      setSelectedPermissions([]);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePermissionChange = (permission) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== permission));
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  const handleAddRole = () => {
    const newRole = {
      id: roles.length + 1,
      name: newRoleName,
      permissions: selectedPermissions,
    };
    setRoles([...roles, newRole]);
    setNewRoleName('');
    setSelectedPermissions([]);
    closeModal();
  };

  const handleEditRole = () => {
    const updatedRoles = roles.map((role) =>
      role.id === editingRoleId
        ? { ...role, name: newRoleName, permissions: selectedPermissions }
        : role
    );
    setRoles(updatedRoles);
    closeModal();
  };

  const handleDeleteRole = (roleId) => {
    const updatedRoles = roles.filter((role) => role.id !== roleId);
    setRoles(updatedRoles);
  };

  return (
    <div className="role-management bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen py-8 px-6">
      <h2 className="text-3xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
        Manage Roles
      </h2>

      <button
        onClick={() => openModal()}
        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition transform duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600"
      >
        Add New Role
      </button>

      {/* Roles Table */}
      <table className="min-w-full table-auto mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-purple-400 to-indigo-400">
          <tr>
            <th className="py-3 px-6 text-left text-white font-semibold">Role Name</th>
            <th className="py-3 px-6 text-left text-white font-semibold">Permissions</th>
            <th className="py-3 px-6 text-left text-white font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="border-t border-gray-200">
              <td className="py-3 px-6">{role.name}</td>
              <td className="py-3 px-6">{role.permissions.join(', ')}</td>
              <td className="py-3 px-6">
                <button
                  onClick={() => openModal(role)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500 ml-2 transition duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Role Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-96 max-w-full animate__animated animate__fadeIn">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              {editingRoleId ? 'Edit Role' : 'Add New Role'}
            </h3>

            {/* Role Name Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-700">Role Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                placeholder="Enter role name"
              />
            </div>

            {/* Permissions Checkbox List */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-700">Permissions</label>
              <div className="space-y-3">
                {permissions.map((permission) => (
                  <div key={permission} className="flex items-center">
                    <input
                      type="checkbox"
                      id={permission}
                      className="mr-2 rounded focus:ring-2 focus:ring-indigo-500"
                      checked={selectedPermissions.includes(permission)}
                      onChange={() => handlePermissionChange(permission)}
                    />
                    <label htmlFor={permission} className="text-sm text-gray-700">{permission}</label>
                  </div>
                ))}
              </div>
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
                onClick={editingRoleId ? handleEditRole : handleAddRole}
                className="bg-gradient-to-r from-green-400 to-teal-500 text-white py-2 px-6 rounded-md hover:scale-105 transition transform duration-300"
              >
                {editingRoleId ? 'Update Role' : 'Add Role'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;
