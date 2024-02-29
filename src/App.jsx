// App.js
import React, { useState } from 'react';
import PersonForm from './Components/PersonForm';
import FinanceDashboard from './Components/FinanceDashboard';

function App() {
  const [dashboardData, setDashboardData] = useState(null);

  const handleDashboardCreate = (data) => {
    setDashboardData(data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className=" text-white text-center text-2xl font-semibold mb-4">Bem-vindo ao Dashboard Financeiro Familiar</h1>

      {!dashboardData ? (
        <PersonForm onSubmit={handleDashboardCreate} />
      ) : (
        <FinanceDashboard {...dashboardData} />
      )}
    </div>
  );
}

export default App;
