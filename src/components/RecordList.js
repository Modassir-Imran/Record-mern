// src/components/RecordList.js
import React, { useEffect, useState } from 'react';
import { getAllRecords, deleteRecord } from '../api/records';

const RecordList = ({ refresh }) => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);

  const fetchRecords = async () => {
    try {
      const data = await getAllRecords();
      setRecords(data);
    } catch (err) {
      setError('Failed to fetch records');
      console.error('Error fetching records:', err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await deleteRecord(id);
      fetchRecords();
    } catch (err) {
      setError('Failed to delete record');
      console.error('Error deleting record:', err);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Records</h2>
      {records.length === 0 ? (
        <p className="text-gray-500 text-center">No records found</p>
      ) : (
        <div className="space-y-4">
          {records.map((record) => (
            <div key={record._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-800">{record.title}</h3>
              <p className="text-gray-600 mt-1">{record.description}</p>
              <button
                onClick={() => handleDelete(record._id)}
                className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecordList;
