// src/App.js
import React, { useState } from 'react';
import RecordForm from './components/RecordForm';
import RecordList from './components/RecordList';

function App() {
  const [refresh, setRefresh] = useState(0);

  const handleRecordCreated = () => {
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">MERN CRUD App</h1>
              <RecordForm onRecordCreated={handleRecordCreated} />
              <RecordList refresh={refresh} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
