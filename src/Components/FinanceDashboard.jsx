import React, { useState } from 'react';
import { PieChart, Pie, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import ExpenseForm from './ExpenseForm';

const COLORS = ['#8a4baf', '#26c6da', '#ffb22b', '#ff7043', '#00e676', '#ff5252'];

const FinanceDashboard = ({ persons }) => {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const getMonthlyExpenses = () => {
    const monthlyExpenses = Array.from({ length: 30 }, (_, day) => ({
      day: day + 1,
      ...expenses.reduce((acc, exp) => {
        acc[`person${exp.person}`] = acc[`person${exp.person}`] || 0;
        if (exp.day === day + 1) {
          acc[`person${exp.person}`] += exp.amount;
        }
        return acc;
      }, {}),
    }));

    return monthlyExpenses;
  };

  const getAccumulatedPersonExpenses = () => {
    const accumulatedExpenses = expenses.reduce((acc, exp) => {
      acc[`person${exp.person}`] = acc[`person${exp.person}`] || 0;
      acc[`person${exp.person}`] += exp.amount;
      return acc;
    }, {});

    return Object.keys(accumulatedExpenses).map((personKey) => ({
      name: persons[parseInt(personKey.replace('person', ''), 10)].name,
      value: accumulatedExpenses[personKey],
    }));
  };

  const getSalaryPercentageData = () => {
    const salaryPercentageData = Array.from({ length: 30 }, (_, day) => {
      const dataEntry = { day: day + 1 };
      persons.forEach((person, index) => {
        const totalExpense = expenses
          .filter((exp) => exp.person === index && exp.day <= day + 1)
          .reduce((total, exp) => total + exp.amount, 0);
        const salaryPercentage = (totalExpense / person.salary) * 100;
        dataEntry[`person${index}`] = salaryPercentage;
      });
      return dataEntry;
    });

    return salaryPercentageData;
  };

  return (
    <div className="container mx-auto p-4 bg-blue-300 font-poppins animate__animated animate__fadeIn">
      <h2 className="text-3xl font-bold mb-6 text-center">Dashboard Financeiro Familiar</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Gráfico de Pizza - Gastos Mensais por Pessoa */}
        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-center">Gastos Mensais por Pessoa</h3>
          <PieChart width={250} height={250}>
            <Pie
              data={getAccumulatedPersonExpenses()}
              cx={125}
              cy={125}
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {getAccumulatedPersonExpenses().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ right: '-150px' }} />
          </PieChart>
        </div>

        {/* Gráfico de Linha - Gastos Diários por Pessoa */}
        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-center">Gastos Diários por Pessoa</h3>
          <LineChart width={300} height={250} data={getMonthlyExpenses()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            {persons.map((person, index) => (
              <Line
                key={`person${index}`}
                type="monotone"
                dataKey={`person${index}`}
                stroke={COLORS[index % COLORS.length]}
                name={person.name}
              />
            ))}
          </LineChart>
        </div>

        {/* Gráfico de Área Empilhada - Porcentagem do Salário ao Longo do Tempo */}
        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-center">Porcentagem do Salário ao Longo do Tempo</h3>
          <AreaChart width={300} height={250} data={getSalaryPercentageData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            {persons.map((person, index) => (
              <Area
                key={`person${index}`}
                type="monotone"
                dataKey={`person${index}`}
                stroke={COLORS[index % COLORS.length]}
                fill={COLORS[index % COLORS.length]}
                name={person.name}
              />
            ))}
          </AreaChart>
        </div>
      </div>
      <br />

      <div className="mt-6 bg-white p-4 rounded-md shadow-md w-"> {/* Ajuste na largura */}
        <ExpenseForm onSubmit={handleAddExpense} persons={persons} />
      </div>

      {/* Tabela de Despesas */}
      <div className="mt-6 bg-white">
        <h3 className="text-lg font-semibold mb-4">Despesas</h3>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Dia</th>
              <th className="p-2">Pessoa</th>
              <th className="p-2">Valor</th>
              <th className="p-2">Descrição</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border p-2">{expense.day}</td>
                <td className="border p-2">{persons[expense.person].name}</td>
                <td className="border p-2">R${expense.amount}</td>
                <td className="border p-2">{expense.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

export default FinanceDashboard;
