import { useDashboard } from '../context/DashboardContext';
export const Sidebar = () => {
  const { activeTab, setActiveTab } = useDashboard();

  const navItems = [
    { id: 'Dashboard', label: 'Dashboard' },
    { id: 'Accounts', label: 'Accounts' },
    { id: 'Reports', label: 'Reports' }
  ];
  return (
 
    <aside className="sticky top-0 h-screen w-64 bg-white dark:bg-slate-900 p-8 hidden lg:flex flex-col border-r border-slate-200">
      <div className="flex items-center gap-2 mb-12">
        <div className="w-8 h-8 bg-teal-600 rounded-lg rotate-3 shadow-sm"></div>
        <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white underline decoration-teal-500 decoration-4 underline-offset-4">ZORVYN</span>
      </div>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === item.id 
                ? 'text-teal-600 bg-teal-50 border border-teal-100/50' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            {activeTab === item.id && <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>}
            {item.label}
          </button>
        ))}
      </nav>
    
      <div className="pt-8 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 border border-slate-200">
            RK
          </div>
          <div>
            <p className="text-slate-900 dark:text-white text-sm font-bold">Ravi Kiran</p>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-tighter">Go Member</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
