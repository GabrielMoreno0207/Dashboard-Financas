// DashboardCards.js
import React from 'react';

const DashboardCards = ({ handleExport, handleSelectMonth }) => {
  return (
    <div className="flex justify-between mt-8">
      {/* Card para Histórico */}
      <div className="bg-white p-4 rounded-md shadow-md flex-grow mr-4">
        <h3 className="text-lg font-semibold mb-4">Histórico</h3>
        <p>Escolha o mês para visualizar o histórico.</p>
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => handleSelectMonth()}
        >
          Selecionar Mês
        </button>
      </div>
      

      {/* Card para Exportar */}
      <div className="bg-white p-4 rounded-md shadow-md flex-grow">
        <h3 className="text-lg font-semibold mb-4">Exportar</h3>
        <p>Escolha o formato para exportar os dados.</p>
        <div className="mt-2 flex space-x-2">
          <button
            className="flex-grow bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => handleExport('pdf')}
          >
            Exportar como PDF
          </button>
          <button
            className="flex-grow bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
            onClick={() => handleExport('planilha')}
          >
            Exportar como Planilha
          </button>
        </div>
      </div>
    </div>
    
  );
  
};

export default DashboardCards;
