import { useState, useMemo } from 'react'; // Added useMemo
import { useDashboard } from '../context/DashboardContext';
import { Search, Plus, Lock, X, ArrowUpDown } from 'lucide-react'; // Added ArrowUpDown icon
import { createPortal } from 'react-dom';

export const TransactionTable = () => {
  const { transactions, role, setSearch, addTransaction } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('newest'); // New state for sorting
  
  const [formData, setFormData] = useState({
    note: '',
    amount: '',
    category: '', 
    type: 'expense'
  });

  // --- Logic: Sorting the transactions ---
const sortedTransactions = useMemo(() => {
    const data = [...transactions]; 

    if (sortOrder === 'highToLow') return data.sort((a, b) => b.amount - a.amount);
    if (sortOrder === 'lowToHigh') return data.sort((a, b) => a.amount - b.amount);
    
    if (sortOrder === 'newest') {
      return data.sort((a, b) => {
        const dateDiff = new Date(b.date) - new Date(a.date);
        if (dateDiff === 0) {
          return b.id - a.id; 
        }
        return dateDiff;
      });
    }

    return data;
  }, [transactions, sortOrder]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTx = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...formData,
      amount: parseFloat(formData.amount)
    };
    addTransaction(newTx);
    setIsModalOpen(false);
    setFormData({ note: '', amount: '', category: '', type: 'expense' });
  };

  return (
    <div className="dashboard-card p-6 mt-8">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <h3 className="text-xl font-bold">Transaction History</h3>
        
        <div className="flex flex-wrap gap-4">
          {/* Search Input*/}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter..." 
              className="pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500/20"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/*Sort Dropdown*/}
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <select 
              className="pl-9 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500/20 bg-white dark:bg-slate-900 text-sm font-medium text-slate-600 appearance-none cursor-pointer"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="highToLow">High to Low</option>
              <option value="lowToHigh">Low to High</option>
            </select>
          </div>

          <button 
            className="btn-primary" 
            disabled={role === 'Viewer'}
            onClick={() => setIsModalOpen(true)}
          >
            {role === 'Admin' ? <Plus size={18}/> : <Lock size={18}/>} Add
          </button>
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left">
          <thead className="text-slate-400 text-sm uppercase tracking-wider">
            <tr>
              <th className="pb-4 px-2">Date</th>
              <th className="pb-4 px-2">Note</th>
              <th className="pb-4 px-2">Category</th>
              <th className="pb-4 px-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {/* Map over sortedTransactions instead of transactions */}
            {sortedTransactions.map(t => (
              <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-2 text-sm text-slate-500">{t.date}</td>
                <td className="py-4 px-2 font-semibold">{t.note}</td>
                <td className="py-4 px-2">
                  <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">
                    {t.category}
                  </span>
                </td>
                <td className={`py-4 px-2 text-right font-black ${t.type === 'income' ? 'text-teal-600' : 'text-slate-900'}`}>
                  {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && createPortal (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md shadow-xl border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-bold">New Transaction</h4>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Description</label>
                <input 
                  required
                  type="text" 
                  placeholder="What was this for?"
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500/20"
                  value={formData.note}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Amount</label>
                  <input 
                    required
                    type="number" 
                    placeholder="0.00"
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500/20"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Category</label>
                  <select 
                    required
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500/20 bg-white dark:bg-slate-900"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="" disabled>Choose...</option>
                    <option value="Food">Food</option>
                    <option value="Rent">Rent</option>
                    <option value="Travel">Travel</option>
                    <option value="Education">Education</option>
                    <option value="Salary">Salary</option>
                    <option value="Misc">Misc</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Transaction Type</label>
                <div className="flex gap-2">
                  {['expense', 'income'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData({...formData, type: t})}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        formData.type === t 
                        ? 'bg-slate-900 text-white border-slate-900' 
                        : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-primary w-full justify-center py-3 mt-2 shadow-lg shadow-teal-500/10">
                Confirm & Save
              </button>
            </form>
          </div>
        </div>
        ,document.body
      )}
    </div>
  );
};
