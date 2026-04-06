import { useDashboard } from '../context/DashboardContext';
import { Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCards = () => {
  const { stats } = useDashboard();
  const data = [
    { label: 'Net Balance', val: stats.balance, icon: <Wallet size={20}/>, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Income', val: stats.income, icon: <ArrowUpRight size={20}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Expenses', val: stats.expense, icon: <ArrowDownRight size={20}/>, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.map((item, i) => (
        <div key={i} className="dashboard-card p-6 flex justify-between items-center">
          <div>
            <p className="text-slate-500 text-sm font-medium">{item.label}</p>
            <p className="text-3xl font-bold mt-1">₹{item.val.toLocaleString()}</p>
          </div>
          <div className={`p-4 rounded-2xl ${item.bg} ${item.color}`}>{item.icon}</div>
        </div>
      ))}
    </div>
  );
};
