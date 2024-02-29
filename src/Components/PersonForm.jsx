import React, { useState } from 'react';

const PersonForm = ({ onSubmit }) => {
  const [numPeople, setNumPeople] = useState(1);
  const [persons, setPersons] = useState(Array.from({ length: 1 }, (_, index) => ({ name: `Pessoa ${index + 1}`, salary: '' })));

  const handleNumPeopleChange = (e) => {
    const newNumPeople = parseInt(e.target.value, 10);
    setNumPeople(newNumPeople);
    setPersons(Array.from({ length: newNumPeople }, (_, index) => ({ name: `Pessoa ${index + 1}`, salary: '' })));
  };

  const handleNameChange = (index, value) => {
    const newPersons = [...persons];
    newPersons[index].name = value;
    setPersons(newPersons);
  };

  const handleSalaryChange = (index, value) => {
    const newPersons = [...persons];
    newPersons[index].salary = value;
    setPersons(newPersons);
  };

  const handleNameClick = (index) => {
    const newPersons = [...persons];
    newPersons[index].name = '';
    setPersons(newPersons);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ numPeople, persons });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
      <label className="block mb-4">
        <span className="text-gray-700">Número de Pessoas:</span>
        <input type="number" value={numPeople} onChange={handleNumPeopleChange} min="1" className="form-input mt-1 block w-full" />
      </label>

      {persons.map((person, index) => (
        <div key={index} className="mb-4">
          <label className="block">
            <span className="text-gray-700">{`Nome da Pessoa ${index + 1}:`}</span>
            <input
              type="text"
              value={person.name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              onClick={() => handleNameClick(index)}
              className="form-input mt-1 block w-full"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">{`Salário da Pessoa ${index + 1}:`}</span>
            <input
              type="number"
              value={person.salary}
              onChange={(e) => handleSalaryChange(index, e.target.value)}
              className="form-input mt-1 block w-full"
            />
          </label>
        </div>
      ))}

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Criar Dashboard
      </button>
    </form>
  );
};

export default PersonForm;
