import { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { TRANSACTIONS } from '../data/mockData';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [role, setRole] = useState('Admin');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Dashboard');
  //Initialize from LocalStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('zorvyn_theme') === 'dark';
  });

  const [allTransactions, setAllTransactions] = useState(() => {
    const saved = localStorage.getItem('zorvyn_data');
    return saved ? JSON.parse(saved) : TRANSACTIONS;
  });

  useEffect(() => {
    localStorage.setItem('zorvyn_data', JSON.stringify(allTransactions));
  }, [allTransactions]);

  useEffect(() => {
    localStorage.setItem('zorvyn_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const addTransaction = (newTx) => {
    setAllTransactions((prev) => [newTx, ...prev]);
  };

  const filteredData = useMemo(() => {
    return allTransactions.filter(t => 
      t.note.toLowerCase().includes(search.toLowerCase()) || 
      t.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, allTransactions]);

  const stats = useMemo(() => {
    const income = allTransactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
    const expense = allTransactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
    return { balance: income - expense, income, expense };
  }, [allTransactions]);

  return (
    <DashboardContext.Provider value={{ 
      darkMode, 
      setDarkMode,
      activeTab, 
      setActiveTab,
      role, 
      setRole, 
      transactions: filteredData, 
      stats, 
      search, 
      setSearch,
      addTransaction 
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);