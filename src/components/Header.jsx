import { useDashboard } from '../context/DashboardContext';
// import { Moon, Sun } from 'lucide-react';

export const Header = () => {
  const { role, setRole, darkMode, setDarkMode } = useDashboard();

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
      {/*Left Section: Title & Subtitle */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
          Finance Hub
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">
          Monitoring activity for Ravi Kiran
        </p>
      </div>

      {/*Right Section: Grouped Controls */}
      <div className="flex items-center gap-4">
        
        {/*RBAC Toggle Group */}
        <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          {['Admin', 'Viewer'].map(r => (
            <button 
              key={r} 
              onClick={() => setRole(r)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                role === r 
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-md' 
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/*Dark Mode Toggle*/}
        {/* <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-yellow-400 transition-all hover:scale-105 active:scale-95 shadow-sm"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button> */}
        
      </div>
    </header>
  );
};