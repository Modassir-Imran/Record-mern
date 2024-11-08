// src/components/RecordForm.js
import React, { useState } from 'react';
import { createRecord } from '../api/records';

const RecordForm = ({ onRecordCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const newRecord = await createRecord(formData);
      console.log('Record created successfully:', newRecord);
      onRecordCreated(newRecord);
      setFormData({
        title: '',
        description: '',
      });
    } catch (err) {
      console.error('Detailed error:', err);
      setError(
        err.response?.data?.message || 
        'Network error - please check if the server is running on port 5000'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="text-red-700">{error}</div>
          </div>
        )}
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {isSubmitting ? 'Creating...' : 'Create Record'}
        </button>
      </form>
    </div>
  );
};

export default RecordForm;
