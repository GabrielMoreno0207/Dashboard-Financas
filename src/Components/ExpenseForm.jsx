import React, { useState } from 'react';

const ExpenseForm = ({ onSubmit, persons }) => {
  const [person, setPerson] = useState(0);
  const [amount, setAmount] = useState(0);
  const [day, setDay] = useState(1);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ person, amount, day, description });
    setPerson(0);
    setAmount(0);
    setDay(1);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
      <label className="block mb-4">
        <span className="text-gray-700">Pessoa:</span>
        <select
          value={person}
          onChange={(e) => setPerson(parseInt(e.target.value, 10))}
          className="form-select mt-1 block w-full"
        >
          {persons.map((person, index) => (
            <option key={index} value={index}>{person.name}</option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Valor da Despesa:</span>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          min="0"
          className="form-input mt-1 block w-full"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Dia do Mês:</span>
        <input
          type="number"
          value={day}
          onChange={(e) => setDay(parseInt(e.target.value, 10))}
          min="1"
          max="30"
          className="form-input mt-1 block w-full"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Descrição da Despesa:</span>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input mt-1 block w-full"
        />
      </label>

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Adicionar Despesa
      </button>
    </form>
  );
};

export default ExpenseForm;
