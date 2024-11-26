import React, { useState } from 'react';

const AddUserForm = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user'); // Default to 'user' role
  const [status, setStatus] = useState('active'); // Default to 'active' status
  const [action, setAction] = useState('create'); // Default to 'create' action
  const [userStatus, setUserStatus] = useState('active'); // Default to 'active' status for the user

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { name, email, role, status: userStatus, action };
    onSubmit(newUser);
    setName('');
    setEmail('');
    setRole('user');
    setStatus('active');
    setAction('create');
    setUserStatus('active');
    onClose(); // Close the modal after submitting
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-lg shadow-xl space-y-4 max-w-md mx-auto animate__animated animate__fadeIn"
    >
      <h2 className="text-2xl text-white font-semibold mb-6 text-center">Add New User</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-white">Name</label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 ease-in-out"
          placeholder="Enter user name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-white">Email</label>
        <input
          type="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 ease-in-out"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-white">Role</label>
        <select
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 ease-in-out"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-white">Status</label>
        <select
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 ease-in-out"
          value={userStatus}
          onChange={(e) => setUserStatus(e.target.value)}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Actions Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-white">Actions</label>
        <select
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 ease-in-out"
          value={action}
          onChange={(e) => setAction(e.target.value)}
        >
          <option value="create">Create</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </select>
      </div>

      {/* Modal Action Buttons */}
      <div className="flex justify-between space-x-4">
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300 ease-in-out"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-4 py-2 rounded-md hover:scale-105 transform transition duration-300 ease-in-out"
        >
          Add User
        </button>
      </div>
    </form>
  );
};

export default AddUserForm;
