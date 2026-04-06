import { useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { exportToExcel } from '../utils/exportUtils';

export const Footer = () => {
  const { role, transactions, stats } = useDashboard();

  const dynamicInsight = useMemo(() => {
    if (!transactions || transactions.length === 0 || stats.expense === 0) {
      return { category: 'None', percentage: 0 };
    }

    const categoryTotals = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
      });

    let topCat = "None";
    let maxVal = 0;
    Object.entries(categoryTotals).forEach(([cat, val]) => {
      if (val > maxVal) {
        maxVal = val;
        topCat = cat;
      }
    });

    //Calculate percentage of total expenses
    const percentage = ((maxVal / stats.expense) * 100).toFixed(0);

    return { category: topCat, percentage };
  }, [transactions, stats.expense]);

  return (
    <footer className="dashboard-card p-6 mt-12 mb-12 border-l-4 border-slate-300 bg-white dark:bg-slate-900">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
          <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-slate-400">
            System Insight
          </h4>
        </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="text-slate-600 text-sm font-medium leading-relaxed max-w-3xl">
          {role === 'Admin' ? (
            <p>
              <span className="text-slate-600 text-sm font-medium leading-relaxed max-w-3xl">Critical Spending Alert:</span> Your 
              <span className="text-slate-900 dark:text-white font-bold"> '{dynamicInsight.category}' </span> 
              category accounts for <span className="text-slate-900 dark:text-white font-bold">{dynamicInsight.percentage}%</span> of total outgoings. 
              Manual entry and data export permissions are currently active.
            </p>
          ) : (
            <p>
              <span className="text-slate-600 text-sm font-medium leading-relaxed max-w-3xl">Read-Only Mode:</span> You are currently viewing data in restricted mode. 
              Contact your administrator to enable transaction modifications.
            </p>
          )}
        </div>
        
        {role === 'Admin' && (
           <button 
                 onClick={() => exportToExcel(transactions)}
                 className="px-4 py-2 bg-white dark:bg-slate-900 text-teal-700 text-xs font-bold rounded-lg border border-slate-200 hover:bg-teal-600 hover:text-white transition-all shadow-sm active:scale-95"
            >
                 Export Report
            </button>
        )}
      </div>
    </footer>
  );
};
