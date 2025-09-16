import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fileComplaint } from '../services/api'; // Import from our service file

export default function NewReportPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title || !formData.description || !formData.category) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await fileComplaint(formData.title, formData.description, formData.category);
      setSuccess(`Report filed successfully! Your report ID is: ${response.data.id}`);
      // Clear form after submission
      setFormData({ title: '', description: '', category: '' });
      // Optionally redirect after a few seconds
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to file report. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-8 border rounded-lg shadow-lg bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">File a New Report</h2>

      {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
      {success && <p className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Report Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>-- Select a category --</option>
            <option value="CYBER_CRIME">Cyber Crime</option>
            <option value="CIVIC_ISSUE">Civic Issue</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title / Subject
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., UPI Scam Call or Pothole on Main Street"
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Detailed Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="6"
            placeholder="Please provide all relevant details, such as date, time, scammer's number, location of the issue, etc."
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* You can add a file upload input here later and adjust the api.js to handle multipart/form-data */}
        
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
}