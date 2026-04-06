// import { DashboardProvider,useDashboard} from './context/DashboardContext';
// import { Sidebar } from './components/Sidebar';
// import { Header } from './components/Header';
// import { StatCards } from './components/StatCards';
// import { DashboardCharts } from './components/Charts';
// import { Insights } from './components/Insights';
// import { TransactionTable } from './components/Transactions';
// import { Footer } from './components/Footer';
// import './styles/Dashboard.css';

// const DashboardLayout = () => {
//   const { activeTab, darkMode } = useDashboard();

//   return (
//     <div className={darkMode ? 'dark' : ''}>
//     <div className="min-h-screen flex bg-slate-50">
//       <Sidebar />
      
//       <main className="flex-1 p-6 lg:p-12 max-w-7xl mx-auto w-full">
//         <Header />
        
//         {activeTab === 'Dashboard' && (
//           <div className="space-y-8 animate-in fade-in duration-500">
//             <StatCards />
//             <DashboardCharts />
//             <Insights />
//             <TransactionTable />
//             <Footer />
//           </div>
//         )}

//         {activeTab === 'Accounts' && (
//           <div className="dashboard-card p-12 text-center animate-in slide-in-from-bottom-4 duration-500">
//             <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Connected Accounts</h2>
//             <p className="text-slate-500">This feature is part of the Premium tier.</p>
//           </div>
//         )}

//         {activeTab === 'Reports' && (
//           <div className="dashboard-card p-12 text-center animate-in slide-in-from-bottom-4 duration-500">
//             <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Advanced Analytics</h2>
//             <p className="text-slate-500">Analytics such as Trend Analysis, Anomaly Detection, Goal Tracking are part of premium tier.</p>
//           </div>
//         )}
//       </main>
//     </div>
//     </div>
//   );
// };

// export default function App() {
//   return (
//     <DashboardProvider>
//       <DashboardLayout />
//     </DashboardProvider>
//   );
// }

import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StatCards } from './components/StatCards';
import { DashboardCharts } from './components/Charts';
import { Insights } from './components/Insights';
import { TransactionTable } from './components/Transactions';
import { Footer } from './components/Footer';
import './styles/Dashboard.css';

const DashboardLayout = () => {
  const { activeTab, darkMode } = useDashboard();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        <Sidebar />
        
        <main className="flex-1 p-6 lg:p-12 max-w-7xl mx-auto w-full">
          <Header />
          
          {activeTab === 'Dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <StatCards />
              <DashboardCharts />
              <Insights />
              <TransactionTable />
              <Footer />
            </div>
          )}

          {activeTab === 'Accounts' && (
            <div className="dashboard-card p-12 text-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 animate-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Connected Accounts</h2>
              <p className="text-slate-500 dark:text-slate-400">This feature is part of the Premium tier.</p>
            </div>
          )}

          {activeTab === 'Reports' && (
            <div className="dashboard-card p-12 text-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 animate-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Advanced Analytics</h2>
              <p className="text-slate-500 dark:text-slate-400">Analytics such as Trend Analysis, Anomaly Detection, and Goal Tracking are part of the premium tier.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <DashboardProvider>
      <DashboardLayout />
    </DashboardProvider>
  );
}