import { useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Lightbulb, TrendingDown } from 'lucide-react';

export const Insights = () => {
  const { transactions, stats } = useDashboard();

  const analysis = useMemo(() => {
    //Category Totals
    const categoryTotals = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
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

    // Dynamic Suggestion Logic
    const suggestionMap = {
      Rent: "Housing is your fixed cost and it is currently your highest expense.",
      Food: "Dining out is peaking. Switching to a weekly meal plan could save you some amount.",
      Travel: "Commute costs are high. Look into a monthly pass or carpooling for better rates.",
      Education: "Great investment! Remember to keep receipts for potential student tax credits.",
      Misc: "Uncategorized spending is high. Try to label these to see where the leak is.",
      Salary: "Income is steady, but consider moving 20% to a high-yield savings account.",
      None: "No expense data found. Start logging transactions to see insights."
    };

    const suggestion = suggestionMap[topCat] || `Review your ${topCat} costs to optimize monthly flow.`;
    const burnRate = stats.income > 0 ? ((stats.expense / stats.income) * 100).toFixed(0) : 0;

    return { topCat, maxVal, burnRate, suggestion };
  }, [transactions, stats]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {/*Top Spending Card */}
      <div className="dashboard-card p-6 border-teal-100 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-teal-50 rounded-lg text-teal-600 border border-teal-100">
            <Lightbulb size={20} />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white">Top Spending Insight</h3>
        </div>
        <p className="text-slate-600 leading-relaxed text-sm">
          Your highest expenditure this period is in the <span className="text-teal-600 font-bold px-1 bg-teal-50 rounded">{analysis.topCat}</span> category, totaling <span className="text-slate-900 dark:text-white font-bold">₹{analysis.maxVal.toLocaleString()}</span>. 
        </p>
        <div className="mt-4 pt-4 border-t border-slate-100 text-[10px] text-teal-600 font-black tracking-widest uppercase flex items-center gap-2">
          Suggestion: {analysis.suggestion}
        </div>
      </div>

      {/* Efficiency Score Card */}
      <div className="dashboard-card p-6 border-rose-100 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-rose-50 rounded-lg text-rose-600 border border-rose-100">
            <TrendingDown size={20} />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white">Efficiency Score</h3>
        </div>
        <div className="flex items-end gap-3">
            <span className="text-4xl font-black text-slate-900 dark:text-white">{analysis.burnRate}%</span>
            <span className="text-slate-400 mb-1 text-[10px] font-black uppercase tracking-wider">Budget Burned</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
            <div 
                className="bg-rose-500 h-full transition-all duration-1000 ease-out" 
                style={{ width: `${Math.max(5, Math.min(analysis.burnRate, 100))}%` }}
            ></div>
        </div>
      </div>
    </div>
  );
};
